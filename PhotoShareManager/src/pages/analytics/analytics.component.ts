import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Chart } from "chart.js/auto";
import { UserDto, UserService } from "../../services/user.service";
import { TagService, TagDto } from "../../services/tag.service"; 
import { AlbumDto, AlbumService } from "../../services/album.service";
import { PhotoDto, PhotoService } from "../../services/photo.service";
import { StatisticsService, StatisticsDto } from "../../services/statistics.service"; 

@Component({
  selector: "app-analytics",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  filterForm: FormGroup;
  users: UserDto[] = [];
  topTags: TagDto[] = []; 
  topAlbums: AlbumDto[] = []; 
  topPhotos: PhotoDto[] = []; 
  topUsers: UserDto[] = []; 
  stats: StatisticsDto | undefined; 

  // Error handling
  errorMessage: string = '';
  hasError: boolean = false;
  isLoading: boolean = false;

  private charts: { [key: string]: Chart } = {}

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private userService: UserService,
    private statisticsService: StatisticsService
  ) {
    this.filterForm = this.fb.group({
      dateRange: ["30"],
    });
  }

  ngOnInit(): void {
    // טוען את הנתונים הסטטיסטיים הכלליים
    this.loadStatistics(30);
    
    // טוען את הרשימות המובילות
    this.loadTopLists();

    // מאזין לשינויים בטווח התאריכים
    this.filterForm.get("dateRange")?.valueChanges.subscribe((value) => {
      const days = Number.parseInt(value, 10);
      this.loadStatistics(days);
      this.updateCharts(days);
    });
  }

  loadStatistics(days: number): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.statisticsService.getStatistics(days).subscribe({
      next: (statistics) => {
        this.stats = statistics;
        this.isLoading = false;
        console.log('Statistics:', this.stats);
        
        // אתחול התרשימים לאחר קבלת הנתונים
        setTimeout(() => {
          this.initCharts(days);
        }, 100);
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'שגיאה בטעינת הנתונים הסטטיסטיים. אנא נסה שוב מאוחר יותר.';
      }
    });
  }

  loadTopLists(): void {
    // טוען את הרשימות המובילות
    this.tagService.getTopTags().subscribe((tags) => {
      this.topTags = tags; 
    });

    this.albumService.getTopAlbums().subscribe((albums) => {
      this.topAlbums = albums; 
    });

    this.photoService.getTopPhotos().subscribe((photos) => {
      this.topPhotos = photos; 
    });

    this.userService.getTopUsers().subscribe((users) => { 
      this.topUsers = users; 
      console.log('Top Users:', this.topUsers); 
    });
  }

  initCharts(days: number): void {
    this.createUserActivityChart(days);
    this.createUploadsChart(days);
    this.createSharesChart(days);
    this.createStorageChart();
  }

  createUserActivityChart(days: number): void {
    const ctx = document.getElementById("userActivityChart") as HTMLCanvasElement;
    if (!ctx) return;

    // מחק תרשים קיים אם קיים
    if (this.charts['userActivity']) {
      this.charts['userActivity'].destroy();
    }

    // קבלת נתונים אמיתיים מהשרת
    this.statisticsService.getUserActivityData(days).subscribe({
      next: (data) => {
        this.charts['userActivity'] = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.generateDateLabels(days),
            datasets: [
              {
                label: "כניסות למערכת",
                data: data,
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
        });
      },
      error: (error) => {
        console.error('Error loading user activity data:', error);
        this.showChartError(ctx, 'שגיאה בטעינת נתוני פעילות משתמשים');
      }
    });
  }

  createUploadsChart(days: number): void {
    const ctx = document.getElementById("uploadsChart") as HTMLCanvasElement;
    if (!ctx) return;

    // מחק תרשים קיים אם קיים
    if (this.charts['uploads']) {
      this.charts['uploads'].destroy();
    }

    this.statisticsService.getUploadsData(days).subscribe({
      next: (data) => {
        this.charts['uploads'] = new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.generateDateLabels(days),
            datasets: [
              {
                label: "העלאות תמונות",
                data: data,
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
        });
      },
      error: (error) => {
        console.error('Error loading uploads data:', error);
        this.showChartError(ctx, 'שגיאה בטעינת נתוני העלאות');
      }
    });
  }

  createSharesChart(days: number): void {
    const ctx = document.getElementById("sharesChart") as HTMLCanvasElement;
    if (!ctx) return;

    // מחק תרשים קיים אם קיים
    if (this.charts['shares']) {
      this.charts['shares'].destroy();
    }

    this.statisticsService.getSharesData(days).subscribe({
      next: (data) => {
        this.charts['shares'] = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.generateDateLabels(days),
            datasets: [
              {
                label: "שיתופי אלבומים",
                data: data.sharesAlbums,
                borderColor: "#2ecc71",
                backgroundColor: "transparent",
                tension: 0.4,
              },
              {
                label: "שיתופי תמונות",
                data: data.sharesPhotos,
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
        });
      },
      error: (error) => {
        console.error('Error loading shares data:', error);
        this.showChartError(ctx, 'שגיאה בטעינת נתוני שיתופים');
      }
    });
  }

  createStorageChart(): void {
    const ctx = document.getElementById("storageChart") as HTMLCanvasElement;
    if (!ctx) return;

    // מחק תרשים קיים אם קיים
    if (this.charts['storage']) {
      this.charts['storage'].destroy();
    }

    this.statisticsService.getStorageData().subscribe({
      next: (data) => {
        this.charts['storage'] = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["בשימוש", "פנוי"],
            datasets: [
              {
                data: [data.storageUsedPercent, 100 - data.storageUsedPercent],
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
        });
      },
      error: (error) => {
        console.error('Error loading storage data:', error);
        this.showChartError(ctx, 'שגיאה בטעינת נתוני אחסון');
      }
    });
  }

  updateCharts(days: number): void {
    // עדכון תרשים פעילות משתמשים
    this.statisticsService.getUserActivityData(days).subscribe({
      next: (data) => {
        if (this.charts['userActivity']) {
          this.charts['userActivity'].data.labels = this.generateDateLabels(days);
          this.charts['userActivity'].data.datasets[0].data = data;
          this.charts['userActivity'].update();
        }
      },
      error: (error) => {
        console.error('Error updating user activity chart:', error);
        this.hasError = true;
        this.errorMessage = 'שגיאה בעדכון תרשים פעילות משתמשים';
      }
    });

    // עדכון תרשים העלאות
    this.statisticsService.getUploadsData(days).subscribe({
      next: (data) => {
        if (this.charts['uploads']) {
          this.charts['uploads'].data.labels = this.generateDateLabels(days);
          this.charts['uploads'].data.datasets[0].data = data;
          this.charts['uploads'].update();
        }
      },
      error: (error) => {
        console.error('Error updating uploads chart:', error);
        this.hasError = true;
        this.errorMessage = 'שגיאה בעדכון תרשים העלאות';
      }
    });

    // עדכון תרשים שיתופים
    this.statisticsService.getSharesData(days).subscribe({
      next: (data) => {
        if (this.charts['shares']) {
          this.charts['shares'].data.labels = this.generateDateLabels(days);
          this.charts['shares'].data.datasets[0].data = data.sharesAlbums;
          this.charts['shares'].data.datasets[1].data = data.sharesPhotos;
          this.charts['shares'].update();
        }
      },
      error: (error) => {
        console.error('Error updating shares chart:', error);
        this.hasError = true;
        this.errorMessage = 'שגיאה בעדכון תרשים שיתופים';
      }
    });
  }

  // פונקציה להצגת הודעת שגיאה במקום תרשים
  private showChartError(ctx: HTMLCanvasElement, errorMessage: string): void {
    const canvasContainer = ctx.parentElement;
    if (canvasContainer) {
      // מסתיר את הקנבס
      ctx.style.display = 'none';
      
      // יוצר הודעת שגיאה
      const errorDiv = document.createElement('div');
      errorDiv.className = 'chart-error';
      errorDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;
        background-color: #f8f9fa;
        border: 2px dashed #e9ecef;
        border-radius: 8px;
        color: #6c757d;
        font-size: 16px;
        text-align: center;
        padding: 20px;
      `;
      errorDiv.innerHTML = `
        <div>
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <div>${errorMessage}</div>
          <button onclick="window.location.reload()" 
                  style="margin-top: 16px; padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            נסה שוב
          </button>
        </div>
      `;
      
      // מוסיף את הודעת השגיאה
      canvasContainer.appendChild(errorDiv);
    }
  }

  // פונקציה לניקוי הודעות שגיאה
  clearChartErrors(): void {
    const errorElements = document.querySelectorAll('.chart-error');
    errorElements.forEach(element => element.remove());
    
    // מציג בחזרה את הקנבסים
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => canvas.style.display = 'block');
    
    this.hasError = false;
    this.errorMessage = '';
  }

  generateDateLabels(days: number): string[] {
    const labels: string[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit" }));
    }

    return labels;
  }

  generateRandomData(count: number, min: number, max: number): number[] {
    const data: number[] = [];

    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return data;
  }
}