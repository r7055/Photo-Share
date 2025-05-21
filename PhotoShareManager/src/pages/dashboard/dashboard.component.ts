import { Component,  OnInit } from "@angular/core"
import  { UserService } from "../../services/user.service"
import  { AlbumDto, AlbumService } from "../../services/album.service"
import  { PhotoDto, PhotoService } from "../../services/photo.service"
import  { TagService } from "../../services/tag.service"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../components/header/header.component"
import { SidebarComponent } from "../../components/sidebar/sidebar.component"

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, RouterModule,MatIconModule,HeaderComponent,SidebarComponent],
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
