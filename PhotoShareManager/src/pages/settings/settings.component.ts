import { Component,   OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {   FormBuilder,   FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

interface SystemSetting {
  key: string
  value: string | boolean | number
  description: string
  type : "text" | "number" | "boolean" | "select"
  options?: string[],
  category?: string;
}

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./settings.component.html",
  styleUrls: [ "./settings.component.scss" ],
})
export class SettingsComponent implements OnInit {
  settingsCategories: string[] = ["general", "uploads", "sharing", "notifications", "security"]
  activeCategory = "general"
  settingsForm: FormGroup
  saving = false

  systemSettings: SystemSetting[] = [
    // General Settings
    { key: "siteName", value: "PhotoShare", description: "שם האתר", type : "text", category: "general" },
    {
      key: "siteDescription",
      value: "מערכת לשיתוף תמונות",
      description: "תיאור האתר",
      type : "text",
      category: "general",
    },
    { key: "itemsPerPage", value: "20", description: "פריטים בעמוד", type : "number", category: "general" },
    {
      key: "defaultLanguage",
      value: "he",
      description: "שפת ברירת מחדל",
      type : "select",
      options: ["he", "en", "fr", "es"],
      category: "general",
    },

    // Upload Settings
    { key: "maxFileSize", value: "10", description: "גודל קובץ מקסימלי (MB)", type : "number", category: "uploads" },
    {
      key: "allowedFile s",
      value: "jpg,jpeg,png,gif",
      description: "סוגי קבצים מותרים",
      type : "text",
      category: "uploads",
    },
    { key: "enableCompression", value: "true", description: "הפעל דחיסת תמונות", type : "boolean", category: "uploads" },
    {
      key: "defaultAlbumPrivacy",
      value: "private",
      description: "פרטיות ברירת מחדל לאלבומים",
      type : "select",
      options: ["private", "public", "shared"],
      category: "uploads",
    },

    // Sharing Settings
    {
      key: "enablePublicSharing",
      value: "true",
      description: "אפשר שיתוף ציבורי",
      type : "boolean",
      category: "sharing",
    },
    { key: "requireApproval", value: "false", description: "דרוש אישור לשיתוף", type : "boolean", category: "sharing" },
    {
      key: "defaultShareExpiration",
      value: "30",
      description: "תוקף שיתוף ברירת מחדל (ימים)",
       type: "number",
      category: "sharing",
    },
    {
      key: "allowDownloads",
      value: "true",
      description: "אפשר הורדת תמונות משותפות",
       type: "boolean",
      category: "sharing",
    },

    // Notification Settings
    {
      key: "enableEmailNotifications",
      value: "true",
      description: 'הפעל התראות דוא"ל',
     type  : "boolean",
      category: "notifications",
    },
    {
      key: "notifyOnShare",
      value: "true",
      description: "שלח התראה בעת שיתוף",
     type  : "boolean",
      category: "notifications",
    },
    {
      key: "notifyOnComment",
      value: "true",
      description: "שלח התראה בעת תגובה",
      type : "boolean",
      category: "notifications",
    },
    {
      key: "adminEmail",
      value: "admin@photoshare.com",
      description: 'דוא"ל מנהל',
     type  : "text",
      category: "notifications",
    },

    // Security Settings
    { key: "sessionTimeout", value: "60", description: "זמן פקיעת הפעלה (דקות)", type : "number", category: "security" },
    {
      key: "maxLoginAttempts",
      value: "5",
      description: "מספר נסיונות התחברות מקסימלי",
     type  : "number",
      category: "security",
    },
    {
      key: "requireStrongPasswords",
      value: "true",
      description: "דרוש סיסמאות חזקות",
        type : "boolean",
      category: "security",
    },
    {
      key: "enableTwoFactorAuth",
      value: "false",
      description: "הפעל אימות דו-שלבי",
     type  : "boolean",
      category: "security",
    },
  ]

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    const formGroup: any = {}

    this.systemSettings.forEach((setting) => {
      let value = setting.value

      if (setting.type  === "boolean") {
       value = value === "true"
      } else if (setting.type  === "number") {
        value = Number.parseInt(String(value), 10)
      }

      formGroup[setting.key] = [value, Validators.required]
    })

    this.settingsForm = this.fb.group(formGroup)
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      general: "הגדרות כלליות",
      uploads: "העלאת קבצים",
      sharing: "שיתוף",
      notifications: "התראות",
      security: "אבטחה",
    }

    return labels[category] || category
  }

  getSettingsByCategory(category: string): SystemSetting[] {
    return this.systemSettings.filter((setting) => (setting as any).category === category)
  }

  saveSettings(): void {
    if (this.settingsForm.invalid) return

    this.saving = true

    // Simulate API call
    setTimeout(() => {
      // Update settings in our local array
      const formValues = this.settingsForm.value

      this.systemSettings.forEach((setting) => {
        if (formValues[setting.key] !== undefined) {
          setting.value = formValues[setting.key].toString()
        }
      })

      this.saving = false
      this.settingsForm.markAsPristine()

      // In a real app, you would save to the server here
      console.log("Settings saved:", formValues)
    }, 1000)
  }

  resetSettings(): void {
    // Reset to initial values
    this.initForm()
  }
}
