import { Component,   OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import   { AlbumService, AlbumDto } from "../../services/album.service"
import   { PhotoService, PhotoDto } from "../../services/photo.service"

@Component({
  selector: "app-recycle-bin",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recycle-bin-page">
      <div class="page-header">
        <h1>סל המיחזור</h1>
      </div>
      
      <div class="tabs">
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'albums'"
          (click)="setActiveTab('albums')"
        >
          אלבומים שנמחקו
        </button>
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'photos'"
          (click)="setActiveTab('photos')"
        >
          תמונות שנמחקו
        </button>
      </div>
      
      @if (activeTab === 'albums') {
        <div class="section">
          <div class="section-header">
            <h2>אלבומים שנמחקו</h2>
          </div>
          
          @if (loadingAlbums) {
            <div class="loading">טוען אלבומים שנמחקו...</div>
          } @else if (errorAlbums) {
            <div class="error">{{ errorAlbums }}</div>
          } @else {
            <div class="items-grid">
              @for (album of deletedAlbums; track album.id) {
                <div class="item-card">
                  <div class="item-header">
                    <h3 class="item-title">{{ album.title }}</h3>
                  </div>
                  <p class="item-description">{{ album.description }}</p>
                  <div class="item-meta">
                    <span>נוצר: {{ album.createdAt | date }}</span>
                    <span>בעלים: {{ album.ownerId }}</span>
                  </div>
                  <div class="item-actions">
                    <button class="action-btn restore" (click)="restoreAlbum(album.id)">
                      <i class="material-icons">restore</i> שחזר
                    </button>
                  </div>
                </div>
              }
              
              @if (deletedAlbums.length === 0) {
                <div class="empty-state">
                  <i class="material-icons">delete_outline</i>
                  <p>אין אלבומים שנמחקו</p>
                </div>
              }
            </div>
          }
        </div>
      }
      
      @if (activeTab === 'photos') {
        <div class="section">
          <div class="section-header">
            <h2>תמונות שנמחקו</h2>
          </div>
          
          @if (loadingPhotos) {
            <div class="loading">טוען תמונות שנמחקו...</div>
          } @else if (errorPhotos) {
            <div class="error">{{ errorPhotos }}</div>
          } @else {
            <div class="items-grid">
              @for (photo of deletedPhotos; track photo.id) {
                <div class="item-card">
                  <div class="item-image">
                    <img [src]="photo.url || '/assets/placeholder-image.jpg'" alt="{{ photo.name }}">
                  </div>
                  <div class="item-info">
                    <h3 class="item-title">{{ photo.name }}</h3>
                    <p class="item-description">{{ photo.description }}</p>
                    <div class="item-meta">
                      <span>אלבום: {{ photo.albumId }}</span>
                      <span>בעלים: {{ photo.userId }}</span>
                    </div>
                    <div class="item-actions">
                      <button class="action-btn restore" (click)="restorePhoto(photo.id, photo.albumId)">
                        <i class="material-icons">restore</i> שחזר
                      </button>
                    </div>
                  </div>
                </div>
              }
              
              @if (deletedPhotos.length === 0) {
                <div class="empty-state">
                  <i class="material-icons">photo_library</i>
                  <p>אין תמונות שנמחקו</p>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
    .recycle-bin-page {
      padding: 20px;
    }
    .page-header {
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      color: #2c3e50;
    }
    .tabs {
      display: flex;
      margin-bottom: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .tab-btn {
      flex: 1;
      padding: 12px;
      background: none;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .tab-btn.active {
      background-color: #3498db;
      color: white;
    }
    .section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      padding: 20px;
    }
    .section-header {
      margin-bottom: 20px;
    }
    h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 18px;
    }
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .item-card {
      background-color: #f9f9f9;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .item-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .item-header {
      padding: 15px;
    }
    .item-image {
      height: 200px;
      overflow: hidden;
    }
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .item-info {
      padding: 15px;
    }
    .item-title {
      margin: 0 0 10px;
      font-size: 16px;
      color: #2c3e50;
    }
    .item-description {
      margin: 0 0 10px;
      font-size: 14px;
      color: #7f8c8d;
      line-height: 1.4;
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .item-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #95a5a6;
      margin-bottom: 10px;
    }
    .item-actions {
      display: flex;
      justify-content: flex-end;
    }
    .action-btn {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    .action-btn i {
      margin-right: 5px;
    }
    .restore {
      background-color: #2ecc71;
      color: white;
    }
    .restore:hover {
      background-color: #27ae60;
    }
    .empty-state {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
    }
    .empty-state i {
      font-size: 48px;
      color: #bdc3c7;
      margin-bottom: 15px;
    }
    .empty-state p {
      margin: 0;
      color: #7f8c8d;
    }
    .loading, .error {
      padding: 20px;
      text-align: center;
    }
    .error {
      color: #e74c3c;
    }
  `,
  ],
})
export class RecycleBinComponent implements OnInit {
  activeTab = "albums"
  deletedAlbums: AlbumDto[] = []
  deletedPhotos: PhotoDto[] = []
  loadingAlbums = false
  loadingPhotos = false
  errorAlbums: string | null = null
  errorPhotos: string | null = null

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
  ) {}

  ngOnInit(): void {
    this.loadDeletedAlbums()
    this.loadDeletedPhotos()
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  loadDeletedAlbums(): void {
    this.loadingAlbums = true
    this.albumService.getRecycleAlbums().subscribe({
      next: (albums) => {
        this.deletedAlbums = albums
        this.loadingAlbums = false
      },
      error: (err) => {
        this.errorAlbums = "שגיאה בטעינת אלבומים שנמחקו. אנא נסה שוב."
        this.loadingAlbums = false
        console.error("Error loading deleted albums:", err)
      },
    })
  }

  loadDeletedPhotos(): void {
    this.loadingPhotos = true
    this.photoService.getRecyclePhotos().subscribe({
      next: (photos) => {
        this.deletedPhotos = photos
        this.loadingPhotos = false
      },
      error: (err) => {
        this.errorPhotos = "שגיאה בטעינת תמונות שנמחקו. אנא נסה שוב."
        this.loadingPhotos = false
        console.error("Error loading deleted photos:", err)
      },
    })
  }

  restoreAlbum(albumId: number): void {
    this.albumService.restoreAlbum(albumId).subscribe({
      next: () => {
        this.deletedAlbums = this.deletedAlbums.filter((album) => album.id !== albumId)
      },
      error: (err) => {
        console.error("Error restoring album:", err)
      },
    })
  }

  restorePhoto(photoId: number, albumId: number): void {
    this.photoService.restorePhoto(photoId, albumId).subscribe({
      next: () => {
        this.deletedPhotos = this.deletedPhotos.filter((photo) => photo.id !== photoId)
      },
      error: (err) => {
        console.error("Error restoring photo:", err)
      },
    })
  }
}
