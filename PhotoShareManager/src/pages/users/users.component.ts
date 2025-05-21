import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { UserService, UserDto, CreateUserDto, UpdateUserDto, RoleDto } from "../../services/user.service"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-users",
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      roleId: [null, Validators.required],
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
      },
    })
  }

  loadRoles(): void {
    // אם יש לך endpoint לטעינת roles מהשרת, השתמש בו כאן
    // this.userService.getRoles().subscribe({ ... });
    // כרגע דוגמה סטטית:
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

    // Make password optional in edit mode
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

    // Reset password validation for create mode
    this.userForm.get("password")?.setValidators([Validators.required, Validators.minLength(6)])
    this.userForm.get("password")?.updateValueAndValidity()
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return
    }

    this.loading = true
    this.error = ""
    this.success = ""

    if (this.isEditMode && this.selectedUser) {
      const updateData: UpdateUserDto = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        roleId: this.userForm.value.roleId,
        status: this.userForm.value.status === "active",
      }

      // Only include password if provided
      if (this.userForm.value.password) {
        updateData.password = this.userForm.value.password
      }

      this.userService.updateUser(this.selectedUser.id, updateData).subscribe({
        next: () => {
          this.success = "User updated successfully"
          this.loadUsers()
          this.closeModal()
          this.loading = false
        },
        error: () => {
          this.error = "Failed to update user"
          this.loading = false
        },
      })
    } else {
      const createData: CreateUserDto = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        roleId: this.userForm.value.roleId,
      }

      this.userService.createUser(createData).subscribe({
        next: () => {
          this.success = "User created successfully"
          this.loadUsers()
          this.closeModal()
          this.loading = false
        },
        error: () => {
          this.error = "Failed to create user"
          this.loading = false
        },
      })
    }
  }

  deleteUser(user: UserDto): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.firstName} ${user.lastName}?`)) {
      this.loading = true
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.success = "User deleted successfully"
          this.loadUsers()
          this.loading = false
        },
        error: () => {
          this.error = "Failed to delete user"
          this.loading = false
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
}