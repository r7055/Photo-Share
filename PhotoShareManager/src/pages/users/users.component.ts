import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { UserService, UserDto, RoleDto } from "../../services/user.service"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { AuthService } from "../../services/auth.service"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: "app-users",
  imports: [
    CommonModule,
    MatTableModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  standalone: true,
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: UserDto[] = []
  filteredUsers: UserDto[] = []
  roles: RoleDto[] = []
  selectedUser: UserDto | null = null

  userForm: FormGroup
  isEditMode = false

  loading = false
  error = ""
  success = ""

  showModal = false

  searchTerm: string = ""

  // שדות סינון
  filterStatus: string = ""
  filterRole: string = ""
  filterFromDate: string = ""
  filterToDate: string = ""
  filterSort: string = "newest"
  filterNoLastLogin: boolean = false
  quickFilter: string = "" // 'week' | 'month' | ''

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'status',
    'createAt',
    'lastLogin',
    'actions'
  ]

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      status: ["active"],
    })
  }

  ngOnInit(): void {
    this.loadUsers()
    this.loadRoles()
  }

  loadUsers(): void {
    this.loading = true
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
        this.applySearch()
        this.loading = false
      },
      error: () => {
        this.error = "Failed to load users"
        this.loading = false
        this.autoHideMessages();
      },
    })
  }

  loadRoles(): void {
    this.roles = [
      { id: 1, roleName: "admin", description: "מנהל" },
      { id: 2, roleName: "user", description: "משתמש" },
    ]
  }

  openAddUserModal(): void {
    this.isEditMode = false
    this.selectedUser = null
    this.resetForm()
    this.showModal = true
  }

  openEditUserModal(user: UserDto): void {
    this.isEditMode = true
    this.selectedUser = user

    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.role?.id,
      status: user.status ? "active" : "inactive",
      password: "",
    })

    this.userForm.get("password")?.setValidators(null)
    this.userForm.get("password")?.updateValueAndValidity()

    this.showModal = true
  }

  closeModal(): void {
    this.showModal = false
  }

  resetForm(): void {
    this.userForm.reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: null,
      status: "active",
    })

    this.userForm.get("password")?.setValidators([Validators.required, Validators.minLength(6)])
    this.userForm.get("password")?.updateValueAndValidity()
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = "";
    this.success = "";

    const registerData = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    this.authService.register(registerData.firstName, registerData.lastName, registerData.email, registerData.password).subscribe({
      next: () => {
        this.success = "User registered successfully";
        this.loadUsers();
        this.resetForm();
        this.closeModal();
        this.loading = false;
        this.autoHideMessages();
      },
      error: () => {
        this.error = "Failed to register user";
        this.loading = false;
        this.autoHideMessages();
      },
    });
  }

  deleteUser(user: UserDto): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.firstName} ${user.lastName}?`)) {
      this.loading = true
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.success = "User deleted successfully"
          this.loadUsers()
          this.loading = false
          this.autoHideMessages();
        },
        error: () => {
          this.error = "Failed to delete user"
          this.loading = false
          this.autoHideMessages();
        },
      })
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  applySearch(): void {
    let term = this.searchTerm.trim().toLowerCase()
    let filtered = this.users

    // סטטוס
    if (this.filterStatus) {
      filtered = filtered.filter(u =>
        this.filterStatus === "active" ? u.status : !u.status
      )
    }

    // תפקיד
    if (this.filterRole) {
      filtered = filtered.filter(u =>
        u.role?.roleName === this.filterRole
      )
    }

    // תאריכי הרשמה
    if (this.filterFromDate) {
      filtered = filtered.filter(u =>
        new Date(u.createAt) >= new Date(this.filterFromDate)
      )
    }
    if (this.filterToDate) {
      filtered = filtered.filter(u =>
        new Date(u.createAt) <= new Date(this.filterToDate)
      )
    }

    // חיפוש טקסט חכם
    if (term) {
      filtered = filtered.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(term)) ||
        (user.lastName && user.lastName.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.role?.roleName && user.role.roleName.toLowerCase().includes(term))
      )
    }

    // סינון לפי משתמשים ללא כניסה אחרונה
    if (this.filterNoLastLogin) {
      filtered = filtered.filter(u => !u.lastLogin)
    }

    // סינון מהיר: שבוע/חודש אחרון
    if (this.quickFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      filtered = filtered.filter(u => new Date(u.createAt) >= weekAgo)
    }
    if (this.quickFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      filtered = filtered.filter(u => new Date(u.createAt) >= monthAgo)
    }

    // מיון
    if (this.filterSort === "newest") {
      filtered = filtered.sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
    } else if (this.filterSort === "oldest") {
      filtered = filtered.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())
    } else if (this.filterSort === "lastLoginDesc") {
      filtered = filtered.sort((a, b) => new Date(b.lastLogin || 0).getTime() - new Date(a.lastLogin || 0).getTime())
    } else if (this.filterSort === "lastLoginAsc") {
      filtered = filtered.sort((a, b) => new Date(a.lastLogin || 0).getTime() - new Date(b.lastLogin || 0).getTime())
    }

    this.filteredUsers = filtered
  }

  filterLast(type: 'week' | 'month') {
    this.quickFilter = type
    this.applySearch()
  }

  clearQuickFilter() {
    this.quickFilter = ""
    this.applySearch()
  }

  onSearchChange(): void {
    this.applySearch()
  }

  // פונקציית הדפסה מעודכנת - מדפיסה רק את הטבלה
  printTable(): void {
    // יצירת HTML של הטבלה להדפסה
    let tableHTML = `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">שם פרטי</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">שם משפחה</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">אימייל</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">תפקיד</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">סטטוס</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">תאריך הרשמה</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">כניסה אחרונה</th>
          </tr>
        </thead>
        <tbody>
    `;

    // הוספת שורות הטבלה
    this.filteredUsers.forEach(user => {
      tableHTML += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.firstName || ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.lastName || ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.email || ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.role?.description || user.role?.roleName || ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.status ? 'פעיל' : 'לא פעיל'}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${this.formatDate(user.createAt)}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${user.lastLogin ? this.formatDate(user.lastLogin) : 'אף פעם'}</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
    `;

    // פתיחת חלון הדפסה
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <title>רשימת משתמשים</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px;
                direction: rtl;
                text-align: right;
              }
              h1 {
                text-align: center;
                color: #333;
                margin-bottom: 30px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px;
              }
              th { 
                background-color: #f5f5f5; 
                font-weight: bold;
                color: #333;
              }
              th, td { 
                border: 1px solid #ddd; 
                padding: 8px; 
                text-align: right; 
              }
              tr:nth-child(even) {
                background-color: #f9f9f9;
              }
              .print-info {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #666;
              }
              @media print {
                body { margin: 0; }
                .print-info { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>רשימת משתמשים</h1>
            ${tableHTML}
            <div class="print-info">
              <p>הודפס בתאריך: ${new Date().toLocaleDateString('he-IL')} | סה"כ משתמשים: ${this.filteredUsers.length}</p>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // המתנה קצרה לטעינת התוכן ואז הדפסה
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } else {
      alert('לא ניתן לפתוח חלון הדפסה. אנא בדוק את הגדרות החסימה בדפדפן.');
    }
  }

  // פונקציה לניקוי כל הסינונים
  clearAllFilters(): void {
    this.searchTerm = "";
    this.filterStatus = "";
    this.filterRole = "";
    this.filterFromDate = "";
    this.filterToDate = "";
    this.filterSort = "newest";
    this.filterNoLastLogin = false;
    this.quickFilter = "";
    this.applySearch();
  }

  // פונקציה לקבלת מספר התוצאות המסוננות
  getFilteredCount(): number {
    return this.filteredUsers.length;
  }

  // פונקציה לקבלת מספר כל המשתמשים
  getTotalCount(): number {
    return this.users.length;
  }

  // פונקציות לסגירת הודעות
  clearError(): void {
    this.error = "";
  }

  clearSuccess(): void {
    this.success = "";
  }

  // פונקציה לסגירה אוטומטית של הודעות לאחר זמן מסוים
  private autoHideMessages(): void {
    if (this.success) {
      setTimeout(() => {
        this.success = "";
      }, 5000); // 5 שניות
    }
    
    if (this.error) {
      setTimeout(() => {
        this.error = "";
      }, 8000); // 8 שניות - יותר זמן להודעות שגיאה
    }
  }
}