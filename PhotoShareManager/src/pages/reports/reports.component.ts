import { Component,   OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {   FormBuilder,   FormGroup, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="reports-page">
      <div class="page-header">
        <h1>דוחות מערכת</h1>
      </div>
      
      <div class="reports-container">
        <div class="reports-sidebar">
          <div class="reports-nav">
            @for (report of availableReports; track report.id) {
              <button 
                class="nav-item" 
                [class.active]="selectedReport?.id === report.id"
                (click)="selectReport(report)"
              >
                {{ report.name }}
              </button>
            }
          </div>
        </div>
        
        <div class="reports-content">
          @if (selectedReport) {
            <div class="report-header">
              <h2>{{ selectedReport.name }}</h2>
              <p class="report-description">{{ selectedReport.description }}</p>
            </div>
            
            <div class="report-filters">
              <form [formGroup]="filterForm" class="filter-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="startDate">מתאריך:</label>
                    <input  ="date" id="startDate" formControlName="startDate">
                  </div>
                  
                  <div class="form-group">
                    <label for="endDate">עד תאריך:</label>
                    <input  ="date" id="endDate" formControlName="endDate">
                  </div>
                  
                  @if (selectedReport.id === 'user-activity') {
                    <div class="form-group">
                      <label for="user ">סוג משתמש:</label>
                      <select id="user " formControlName="user ">
                        <option value="all">כל המשתמשים</option>
                        <option value="active">משתמשים פעילים</option>
                        <option value="inactive">משתמשים לא פעילים</option>
                      </select>
                    </div>
                  }
                  
                  @if (selectedReport.id === 'storage-usage') {
                    <div class="form-group">
                      <label for="storageThreshold">סף אחסון (GB):</label>
                      <input  ="number" id="storageThreshold" formControlName="storageThreshold">
                    </div>
                  }
                </div>
                
                <div class="form-actions">
                  <button  ="button" class="generate-btn" (click)="generateReport()">
                    <i class="material-icons">assessment</i> הפק דוח
                  </button>
                  <button  ="button" class="export-btn" [disabled]="!reportGenerated" (click)="exportReport()">
                    <i class="material-icons">file_download</i> ייצא ל-Excel
                  </button>
                </div>
              </form>
            </div>
            
            @if (loading) {
              <div class="loading">טוען נתונים...</div>
            } @else if (reportGenerated) {
              <div class="report-results">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        @for (column of reportColumns; track column) {
                          <th>{{ column }}</th>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      @for (row of reportData; track $index) {
                        <tr>
                          @for (key of getObjectKeys(row); track key) {
                            <td>{{ row[key] }}</td>
                          }
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                
                <div class="report-summary">
                  <h3>סיכום</h3>
                  <div class="summary-items">
                    @for (item of reportSummary; track item.label) {
                      <div class="summary-item">
                        <span class="summary-label">{{ item.label }}:</span>
                        <span class="summary-value">{{ item.value }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          } @else {
            <div class="no-report-selected">
              <i class="material-icons">assessment</i>
              <p>בחר דוח מהרשימה כדי להציג אותו</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .reports-page {
      padding: 20px;
    }
    .page-header {
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      color: #2c3e50;
    }
    .reports-container {
      display: flex;
      gap: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .reports-sidebar {
      width: 250px;
      background-color: #f9f9f9;
      border-right: 1px solid #eee;
    }
    .reports-nav {
      display: flex;
      flex-direction: column;
    }
    .nav-item {
      padding: 15px;
      text-align: right;
      background: none;
      border: none;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 14px;
    }
    .nav-item:hover {
      background-color: #f1f1f1;
    }
    .nav-item.active {
      background-color: #3498db;
      color: white;
    }
    .reports-content {
      flex: 1;
      padding: 20px;
    }
    .report-header {
      margin-bottom: 20px;
    }
    h2 {
      margin: 0 0 10px;
      color: #2c3e50;
      font-size: 20px;
    }
    .report-description {
      margin: 0;
      color: #7f8c8d;
    }
    .report-filters {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .filter-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    label {
      font-weight: 500;
      font-size: 14px;
    }
    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 150px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
    }
    .generate-btn, .export-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .generate-btn {
      background-color: #3498db;
      color: white;
    }
    .export-btn {
      background-color: #2ecc71;
      color: white;
    }
    .export-btn:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }
    .loading {
      padding: 20px;
      text-align: center;
      color: #7f8c8d;
    }
    .report-results {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px 15px;
      text-align: right;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f9f9f9;
      font-weight: 600;
      color: #2c3e50;
    }
    .report-summary {
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    h3 {
      margin: 0 0 15px;
      font-size: 16px;
      color: #2c3e50;
    }
    .summary-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .summary-label {
      font-weight: 500;
    }
    .summary-value {
      font-weight: 700;
      color: #2c3e50;
    }
    .no-report-selected {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      color: #bdc3c7;
    }
    .no-report-selected i {
      font-size: 48px;
      margin-bottom: 15px;
    }
    .no-report-selected p {
      margin: 0;
      font-size: 16px;
    }
  `,
  ],
})
export class ReportsComponent implements OnInit {
  filterForm: FormGroup
  availableReports = [
    {
      id: "user-activity",
      name: "פעילות משתמשים",
      description: "דוח המציג את פעילות המשתמשים במערכת לפי תאריכים",
    },
    {
      id: "storage-usage",
      name: "ניצול אחסון",
      description: "דוח המציג את ניצול האחסון של המשתמשים במערכת",
    },
    {
      id: "uploads-summary",
      name: "סיכום העלאות",
      description: "דוח המציג סיכום של העלאות תמונות לפי תאריכים",
    },
    {
      id: "shares-summary",
      name: "סיכום שיתופים",
      description: "דוח המציג סיכום של שיתופי אלבומים ותמונות",
    },
    {
      id: "deleted-items",
      name: "פריטים שנמחקו",
      description: "דוח המציג פריטים שנמחקו ולא שוחזרו",
    },
  ]

  selectedReport: any = null
  loading = false
  reportGenerated = false
  reportColumns: string[] = []
  reportData: any[] = []
  reportSummary: { label: string; value: string }[] = []

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [this.getDefaultStartDate()],
      endDate: [this.getDefaultEndDate()],
      user : ["all"],
      storageThreshold: [1],
    })
  }

  ngOnInit(): void {}

  selectReport(report: any): void {
    this.selectedReport = report
    this.reportGenerated = false
    this.resetForm()
  }

  resetForm(): void {
    this.filterForm.patchValue({
      startDate: this.getDefaultStartDate(),
      endDate: this.getDefaultEndDate(),
      user : "all",
      storageThreshold: 1,
    })
  }

  getDefaultStartDate(): string {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date.toISOString().split("T")[0]
  }

  getDefaultEndDate(): string {
    return new Date().toISOString().split("T")[0]
  }

  generateReport(): void {
    this.loading = true
    this.reportGenerated = false

    // Simulate API call
    setTimeout(() => {
      switch (this.selectedReport.id) {
        case "user-activity":
          this.generateUserActivityReport()
          break
        case "storage-usage":
          this.generateStorageUsageReport()
          break
        case "uploads-summary":
          this.generateUploadsSummaryReport()
          break
        case "shares-summary":
          this.generateSharesSummaryReport()
          break
        case "deleted-items":
          this.generateDeletedItemsReport()
          break
      }

      this.loading = false
      this.reportGenerated = true
    }, 1500)
  }

  generateUserActivityReport(): void {
    this.reportColumns = ["משתמש", 'דוא"ל', "כניסות אחרונות", "העלאות", "שיתופים", "סטטוס"]

    this.reportData = [
      { user: "יוסי כהן", email: "yossi@example.com", logins: 45, uploads: 120, shares: 35, status: "פעיל" },
      { user: "מיכל לוי", email: "michal@example.com", logins: 32, uploads: 87, shares: 12, status: "פעיל" },
      { user: "דוד אברהם", email: "david@example.com", logins: 28, uploads: 65, shares: 8, status: "פעיל" },
      { user: "רונית שמעוני", email: "ronit@example.com", logins: 15, uploads: 42, shares: 5, status: "פעיל" },
      { user: "אבי גולן", email: "avi@example.com", logins: 8, uploads: 23, shares: 0, status: "לא פעיל" },
    ]

    this.reportSummary = [
      { label: 'סה"כ משתמשים', value: "5" },
      { label: "משתמשים פעילים", value: "4" },
      { label: 'סה"כ כניסות', value: "128" },
      { label: 'סה"כ העלאות', value: "337" },
      { label: 'סה"כ שיתופים', value: "60" },
    ]
  }

  generateStorageUsageReport(): void {
    this.reportColumns = ["משתמש", 'דוא"ל', "אחסון (GB)", "אחוז ניצול", "מספר קבצים", "גודל ממוצע"]

    this.reportData = [
      {
        user: "יוסי כהן",
        email: "yossi@example.com",
        storage: "5.2",
        percentage: "52%",
        files: 120,
        average: "44.3 MB",
      },
      {
        user: "מיכל לוי",
        email: "michal@example.com",
        storage: "3.8",
        percentage: "38%",
        files: 87,
        average: "44.7 MB",
      },
      {
        user: "דוד אברהם",
        email: "david@example.com",
        storage: "2.5",
        percentage: "25%",
        files: 65,
        average: "39.4 MB",
      },
      {
        user: "רונית שמעוני",
        email: "ronit@example.com",
        storage: "1.8",
        percentage: "18%",
        files: 42,
        average: "43.8 MB",
      },
      { user: "אבי גולן", email: "avi@example.com", storage: "0.9", percentage: "9%", files: 23, average: "40.2 MB" },
    ]

    this.reportSummary = [
      { label: 'סה"כ אחסון', value: "14.2 GB" },
      { label: "ממוצע לכל משתמש", value: "2.84 GB" },
      { label: 'סה"כ קבצים', value: "337" },
      { label: "גודל ממוצע לקובץ", value: "42.1 MB" },
    ]
  }

  generateUploadsSummaryReport(): void {
    this.reportColumns = ["תאריך", "מספר העלאות", "גודל כולל", "משתמשים ייחודיים", "סוג קובץ נפוץ"]

    this.reportData = [
      { date: "01/05/2023", uploads: 45, size: "1.8 GB", users: 12,  type: "JPEG" },
      { date: "02/05/2023", uploads: 32, size: "1.2 GB", users: 8, type : "JPEG" },
      { date: "03/05/2023", uploads: 28, size: "1.1 GB", users: 7, type : "PNG" },
      { date: "04/05/2023", uploads: 36, size: "1.5 GB", users: 10,type  : "JPEG" },
      { date: "05/05/2023", uploads: 41, size: "1.7 GB", users: 11, type : "JPEG" },
    ]

    this.reportSummary = [
      { label: 'סה"כ העלאות', value: "182" },
      { label: "גודל כולל", value: "7.3 GB" },
      { label: "ממוצע יומי", value: "36.4" },
      { label: "משתמשים ייחודיים", value: "15" },
    ]
  }

  generateSharesSummaryReport(): void {
    this.reportColumns = ["תאריך", "שיתופי אלבומים", "שיתופי תמונות", "משתמשים ייחודיים", "נמענים ייחודיים"]

    this.reportData = [
      { date: "01/05/2023", albums: 8, photos: 23, users: 5, recipients: 12 },
      { date: "02/05/2023", albums: 5, photos: 18, users: 4, recipients: 9 },
      { date: "03/05/2023", albums: 7, photos: 15, users: 3, recipients: 8 },
      { date: "04/05/2023", albums: 6, photos: 20, users: 4, recipients: 11 },
      { date: "05/05/2023", albums: 9, photos: 25, users: 6, recipients: 14 },
    ]

    this.reportSummary = [
      { label: 'סה"כ שיתופי אלבומים', value: "35" },
      { label: 'סה"כ שיתופי תמונות', value: "101" },
      { label: "משתמשים ייחודיים", value: "8" },
      { label: "נמענים ייחודיים", value: "22" },
    ]
  }

  generateDeletedItemsReport(): void {
    this.reportColumns = ["סוג פריט", "שם", "נמחק על ידי", "תאריך מחיקה", "גודל"]

    this.reportData = [
      { type : "אלבום", name: "טיול בצפון", user: "יוסי כהן", date: "01/05/2023", size: "450 MB" },
      { type : "תמונה", name: "שקיעה בים.jpg", user: "מיכל לוי", date: "02/05/2023", size: "4.2 MB" },
      { type : "אלבום", name: "יום הולדת", user: "דוד אברהם", date: "03/05/2023", size: "320 MB" },
      { type : "תמונה", name: "משפחה.jpg", user: "רונית שמעוני", date: "04/05/2023", size: "3.8 MB" },
      { type : "תמונה", name: "חופשה.jpg", user: "אבי גולן", date: "05/05/2023", size: "5.1 MB" },
    ]

    this.reportSummary = [
      { label: 'סה"כ פריטים שנמחקו', value: "5" },
      { label: "אלבומים", value: "2" },
      { label: "תמונות", value: "3" },
      { label: "גודל כולל", value: "783.1 MB" },
    ]
  }

  exportReport(): void {
    // In a real application, this would generate and download an Excel file
    console.log("Exporting report:", this.selectedReport.name)
    alert("הדוח יוצא בהצלחה")
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj)
  }
}
