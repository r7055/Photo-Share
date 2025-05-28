import { Component,  OnInit } from "@angular/core"
import  { UserService } from "../../services/user.service"
import  { AlbumDto, AlbumService } from "../../services/album.service"
import  { PhotoDto, PhotoService } from "../../services/photo.service"
import  { TagService } from "../../services/tag.service"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from "@angular/material/button"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatGridListModule } from "@angular/material/grid-list"

@Component({
  selector: "app-dashboard",
  imports: [
     CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
],
  standalone: true,
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})


export class DashboardComponent implements OnInit {
  stats = {
    users: 0,
    albums: 0,
    photos: 0,
    tags: 0,
    shares: 0,
    storage: 0,
  }

  recentAlbums: AlbumDto[] = []
  recentPhotos: PhotoDto[] = []

  loading = true
  error = ""

  constructor(
    private userService: UserService,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private tagService: TagService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    this.loading = true

    // In a real app, you would have a dedicated dashboard API endpoint
    // Here we're simulating by loading data from multiple endpoints

    // Load users count
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.stats.users = users.length
      },
      error: (error) => {
        this.error = "Failed to load dashboard data"
        this.loading = false
      },
    })

    // Load albums
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.stats.albums = albums.length
        console.log("recentalbum1",this.recentAlbums)
        this.recentAlbums = albums.sort((a1,a2)=>(new Date(a1.createdAt) > new Date(a2.createdAt) ? -1 : 1)).slice(0, 5)
        console.log("recentalbum2",this.recentAlbums)
      },
      error: (error) => {
        this.error = "Failed to load dashboard data"
        this.loading = false
      },
    })

    // Load photos
    this.photoService.getPhotos().subscribe({
      next: (photos) => {
        this.stats.photos = photos.length
        console.log("recentphotos1",this.recentPhotos)
        this.recentPhotos = photos.sort((p1,p2)=>(new Date(p1.createdAt) > new Date(p2.createdAt) ? -1 : 1)).slice(0, 5)
        console.log("recentphotos2",this.recentPhotos)


        // Calculate storage
        this.stats.storage = photos.reduce((total, photo) => total + photo.size, 0) / (1024 * 1024 * 1024) // Convert to GB
        this.loading = false
      },
      error: (error) => {
        this.error = "Failed to load dashboard data"
        this.loading = false
      },
    })

    // Load tags
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.stats.tags = tags.length
      },
      error: (error) => {
        this.error = "Failed to load dashboard data"
        this.loading = false
      },
    })
  }

  formatDate(dateString: string): string {
    console.log("dateString",dateString)
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }
}
// export const dashboardAnimations = [
//   trigger('fadeIn', [
//     transition(':enter', [
//       style({ opacity: 0 }),
//       animate('300ms ease-in', style({ opacity: 1 }))
//     ])
//   ]),
  
//   trigger('slideInFromTop', [
//     transition(':enter', [
//       style({ transform: 'translateY(-100%)', opacity: 0 }),
//       animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
//         style({ transform: 'translateY(0)', opacity: 1 }))
//     ])
//   ]),
  
//   trigger('slideInFromLeft', [
//     transition(':enter', [
//       style({ transform: 'translateX(-100%)', opacity: 0 }),
//       animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', 
//         style({ transform: 'translateX(0)', opacity: 1 }))
//     ])
//   ]),
  
//   trigger('slideInFromRight', [
//     transition(':enter', [
//       style({ transform: 'translateX(100%)', opacity: 0 }),
//       animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', 
//         style({ transform: 'translateX(0)', opacity: 1 }))
//     ])
//   ]),
  
//   trigger('staggerIn', [
//     transition(':enter', [
//       query('.stat-card', [
//         style({ opacity: 0, transform: 'translateY(50px)' }),
//         stagger(100, [
//           animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
//             style({ opacity: 1, transform: 'translateY(0)' }))
//         ])
//       ], { optional: true })
//     ])
//   ]),
  
//   trigger('cardHover', [
//     transition(':enter', [
//       style({ opacity: 0, transform: 'scale(0.8)' }),
//       animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
//         style({ opacity: 1, transform: 'scale(1)' }))
//     ])
//   ]),
  
//   trigger('listItemSlide', [
//     transition(':enter', [
//       style({ opacity: 0, transform: 'translateX(-20px)' }),
//       animate('250ms ease-out', 
//         style({ opacity: 1, transform: 'translateX(0)' }))
//     ])
//   ])
// ];