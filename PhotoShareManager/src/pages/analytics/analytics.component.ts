import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Chart } from "chart.js/auto"

@Component({
  selector: "app-analytics",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  filterForm: FormGroup

  stats = {
    totalUsers: 1245,
    newUsers: 87,
    totalPhotos: 24689,
    newPhotos: 342,
    totalAlbums: 1876,
    newAlbums: 53,
    totalStorage: 256.8,
    storageUsedPercent: 64,
  }

  topAlbums = [
    { id: 1, name: "טיול משפחתי 2023", views: 1245 },
    { id: 2, name: "חתונה של דני ורותי", views: 987 },
    { id: 3, name: "טיול בצפון", views: 876 },
    { id: 4, name: "מסיבת יום הולדת", views: 754 },
    { id: 5, name: "חופשה באילת", views: 621 },
  ]

  topPhotos = [
    { id: 1, name: "שקיעה בים", views: 2341 },
    { id: 2, name: "הנוף מהפסגה", views: 1876 },
    { id: 3, name: "משפחה על החוף", views: 1654 },
    { id: 4, name: "ארוחת ערב חגיגית", views: 1432 },
    { id: 5, name: "זריחה בהרים", views: 1298 },
  ]

  topUsers = [
    { id: 1, name: "יוסי כהן", uploads: 342 },
    { id: 2, name: "מיכל לוי", uploads: 287 },
    { id: 3, name: "דוד אברהם", uploads: 243 },
    { id: 4, name: "רונית שמעוני", uploads: 198 },
    { id: 5, name: "אבי גולן", uploads: 176 },
  ]

  topTags = [
    { id: 1, name: "משפחה", count: 876 },
    { id: 2, name: "טבע", count: 754 },
    { id: 3, name: "חופשה", count: 687 },
    { id: 4, name: "אוכל", count: 543 },
    { id: 5, name: "חיות", count: 432 },
  ]

  private charts: { [key: string]: Chart } = {}

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      dateRange: ["30"],
    })
  }

  ngOnInit(): void {
    this.initCharts()

    this.filterForm.get("dateRange")?.valueChanges.subscribe((value) => {
      this.updateCharts(Number.parseInt(value, 10))
    })
  }

  initCharts(): void {
    setTimeout(() => {
      this.createUserActivityChart()
      this.createUploadsChart()
      this.createSharesChart()
      this.createStorageChart()
    }, 100)
  }

  createUserActivityChart(): void {
    const ctx = document.getElementById("userActivityChart") as HTMLCanvasElement

    if (!ctx) return

    this.charts['userActivity'] = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.generateDateLabels(30),
        datasets: [
          {
            label: "כניסות למערכת",
            data: this.generateRandomData(30, 50, 200),
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  createUploadsChart(): void {
    const ctx = document.getElementById("uploadsChart") as HTMLCanvasElement

    if (!ctx) return

    this.charts['uploads'] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.generateDateLabels(30),
        datasets: [
          {
            label: "העלאות תמונות",
            data: this.generateRandomData(30, 5, 50),
            backgroundColor: "#e74c3c",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  createSharesChart(): void {
    const ctx = document.getElementById("sharesChart") as HTMLCanvasElement

    if (!ctx) return

    this.charts['shares'] = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.generateDateLabels(30),
        datasets: [
          {
            label: "שיתופי אלבומים",
            data: this.generateRandomData(30, 1, 20),
            borderColor: "#2ecc71",
            backgroundColor: "transparent",
            tension: 0.4,
          },
          {
            label: "שיתופי תמונות",
            data: this.generateRandomData(30, 5, 30),
            borderColor: "#f39c12",
            backgroundColor: "transparent",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  createStorageChart(): void {
    const ctx = document.getElementById("storageChart") as HTMLCanvasElement

    if (!ctx) return

    this.charts['storage'] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["בשימוש", "פנוי"],
        datasets: [
          {
            data: [this.stats.storageUsedPercent, 100 - this.stats.storageUsedPercent],
            backgroundColor: ["#3498db", "#ecf0f1"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        cutout: "70%",
      },
    })
  }

  updateCharts(days: number): void {
    // Update user activity chart
    if (this.charts['userActivity']) {
      this.charts['userActivity'].data.labels = this.generateDateLabels(days);
      this.charts['userActivity'].data.datasets[0].data = this.generateRandomData(days, 50, 200);
      this.charts['userActivity'].update();
    }


    // Update uploads chart
    if (this.charts['uploads']) {
      this.charts['uploads'].data.labels = this.generateDateLabels(days)
      this.charts['uploads'].data.datasets[0].data = this.generateRandomData(days, 5, 50)
      this.charts['uploads'].update()
    }

    // Update shares chart
    if (this.charts['shares']) {
      this.charts['shares'].data.labels = this.generateDateLabels(days)
      this.charts['shares'].data.datasets[0].data = this.generateRandomData(days, 1, 20)
      this.charts['shares'].data.datasets[1].data = this.generateRandomData(days, 5, 30)
      this.charts['shares'].update()
    }
  }

  generateDateLabels(days: number): string[] {
    const labels: string[] = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit" }))
    }

    return labels
  }

  generateRandomData(count: number, min: number, max: number): number[] {
    const data: number[] = []

    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }

    return data
  }
}
