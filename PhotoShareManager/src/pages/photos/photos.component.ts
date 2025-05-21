import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { ActivatedRoute, RouterModule } from "@angular/router"
import { PhotoService, PhotoDto, UpdatePhotoDto } from "../../services/photo.service"
import { AlbumService, AlbumDto } from "../../services/album.service"
import { TagService, TagDto } from "../../services/tag.service"
import { UploadService } from "../../services/upload.service"
import { HttpEventType } from "@angular/common/http"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-photos",
  imports: [CommonModule,  RouterModule,ReactiveFormsModule ],
  standalone: true,
  templateUrl: "./photos.component.html",
  styleUrls: ["./photos.component.scss"],
})
export class PhotosComponent implements OnInit {
  photos: PhotoDto[] = []
  albums: AlbumDto[] = []
  tags: TagDto[] = []
  selectedPhoto: PhotoDto | null = null
  currentAlbumId: number | null = null

  photoForm: FormGroup
  uploadForm: FormGroup

  loading = false
  uploading = false
  uploadProgress = 0
  error = ""
  success = ""

  showPhotoModal = false
  showUploadModal = false
  showViewModal = false

  constructor(
    private photoService: PhotoService,
    private albumService: AlbumService,
    private tagService: TagService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.photoForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
      albumId: [null, Validators.required],
    })

    this.uploadForm = this.formBuilder.group({
      albumId: [null, Validators.required],
      files: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentAlbumId = params["albumId"] ? Number(params["albumId"]) : null
      this.loadPhotos()
    })

    this.loadAlbums()
    this.loadTags()
  }

  loadPhotos(): void {
    this.loading = true
    this.photoService.getPhotos(this.currentAlbumId || undefined).subscribe({
      next: (photos) => {
        this.photos = photos
        this.loading = false
      },
      error: (error) => {
        this.error = "Failed to load photos"
        this.loading = false
      },
    })
  }

  loadAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.albums = albums

        // Set default album in upload form
        if (this.currentAlbumId) {
          this.uploadForm.patchValue({ albumId: this.currentAlbumId })
        } else if (albums.length > 0) {
          this.uploadForm.patchValue({ albumId: albums[0].id })
        }
      },
      error: (error) => {
        this.error = "Failed to load albums"
      },
    })
  }

  loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags
      },
      error: (error) => {
        this.error = "Failed to load tags"
      },
    })
  }

  openPhotoModal(photo: PhotoDto): void {
    this.selectedPhoto = photo

    this.photoForm.patchValue({
      name: photo.name,
      description: photo.description,
      albumId: photo.albumId,
    })

    this.showPhotoModal = true
  }

  openUploadModal(): void {
    if (this.currentAlbumId) {
      this.uploadForm.patchValue({ albumId: this.currentAlbumId })
    }
    this.showUploadModal = true
  }

  openViewModal(photo: PhotoDto): void {
    this.selectedPhoto = photo
    this.showViewModal = true
  }

  closePhotoModal(): void {
    this.showPhotoModal = false
  }

  closeUploadModal(): void {
    this.showUploadModal = false
    this.uploadProgress = 0
    this.uploadForm.get("files")?.reset()
  }

  closeViewModal(): void {
    this.showViewModal = false
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.uploadForm.patchValue({ files: event.target.files })
    }
  }

  uploadPhotos(): void {
    if (this.uploadForm.invalid) {
      return
    }

    const albumId = this.uploadForm.value.albumId
    const files = this.uploadForm.value.files

    this.uploading = true
    this.error = ""
    this.success = ""

    // In a real app, you would handle multiple files
    // Here we're just handling the first file for simplicity
    const file = files[0]

    this.uploadService.uploadPhoto(albumId, file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total)
        } else if (event.type === HttpEventType.Response) {
          this.success = "Photo uploaded successfully"
          this.loadPhotos()
          this.closeUploadModal()
          this.uploading = false
        }
      },
      error: (error) => {
        this.error = "Failed to upload photo"
        this.uploading = false
      },
    })
  }

  updatePhoto(): void {
    if (this.photoForm.invalid || !this.selectedPhoto) {
      return
    }

    this.loading = true
    this.error = ""
    this.success = ""

    const updateData: UpdatePhotoDto = {
      name: this.photoForm.value.name,
      description: this.photoForm.value.description,
      albumId: this.photoForm.value.albumId,
    }

    this.photoService.updatePhoto(this.selectedPhoto.id, updateData).subscribe({
      next: () => {
        this.success = "Photo updated successfully"
        this.loadPhotos()
        this.closePhotoModal()
        this.loading = false
      },
      error: (error) => {
        this.error = "Failed to update photo"
        this.loading = false
      },
    })
  }

  deletePhoto(photo: PhotoDto): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את התמונה ${photo.name}?`)) {
      this.loading = true
      this.photoService.deletePhoto(photo.id).subscribe({
        next: () => {
          this.success = "Photo deleted successfully"
          this.loadPhotos()
          this.loading = false
        },
        error: (error) => {
          this.error = "Failed to delete photo"
          this.loading = false
        },
      })
    }
  }

  addTagToPhoto(photoId: number, tagId: number): void {
    this.tagService.addTagToPhoto(photoId, tagId).subscribe({
      next: () => {
        this.success = "Tag added to photo"
        this.loadPhotos()
      },
      error: (error) => {
        this.error = "Failed to add tag to photo"
      },
    })
  }

  removeTagFromPhoto(photoId: number, tagId: number): void {
    this.tagService.removeTagFromPhoto(photoId, tagId).subscribe({
      next: () => {
        this.success = "Tag removed from photo"
        this.loadPhotos()
      },
      error: (error) => {
        this.error = "Failed to remove tag from photo"
      },
    })
  }

  formatDate(dateString: string): string {
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
  getAlbumName(currentAlbumId: number): string | undefined {
    const album = this.albums.find(a => a.id === currentAlbumId);
    console.log("currentAlbumId", currentAlbumId)
    console.log("album", album)
    return album ? album.title : "not found";
  }

}
