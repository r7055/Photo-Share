import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AlbumService, AlbumDto, CreateAlbumDto, UpdateAlbumDto } from "../../services/album.service"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-albums",
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: "./albums.component.html",
  styleUrls: ["./albums.component.scss"],
})
export class AlbumsComponent implements OnInit {
  albums: AlbumDto[] = []
  selectedAlbum: AlbumDto | null = null

  albumForm: FormGroup
  isEditMode = false

  loading = false
  error = ""
  success = ""

  showModal = false

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.albumForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: [""],
    })
  }

  ngOnInit(): void {
    this.loadAlbums()
  }

  loadAlbums(): void {
    this.loading = true
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.albums = albums
        this.loading = false
      },
      error: (error) => {
        this.error = "Failed to load albums"
        this.loading = false
      },
    })
  }

  openAddAlbumModal(): void {
    this.isEditMode = false
    this.selectedAlbum = null
    // this.resetForm()
    this.showModal = true
  }

  openEditAlbumModal(album: AlbumDto): void {
    this.isEditMode = true
    this.selectedAlbum = album

    this.albumForm.patchValue({
      name: album.title,
      description: album.description,
    })

    this.showModal = true
  }

  closeModal(): void {
    this.showModal = false
    this.albumForm.reset()
  }

  // resetForm(): void {
  //   this.albumForm.reset({
  //     isPublic: false,
  //   })
  // }

  onSubmit(): void {
    if (this.albumForm.invalid) {
      return
    }

    this.loading = true
    this.error = ""
    this.success = ""

    if (this.isEditMode && this.selectedAlbum) {

      const updateData: UpdateAlbumDto = {
        title: this.albumForm.value.name,
        description: this.albumForm.value.description,
        parentId: this.selectedAlbum.parentId,
      }

      this.albumService.updateAlbum(this.selectedAlbum.id, updateData).subscribe({
        next: () => {
          this.success = "Album updated successfully"
          this.loadAlbums()
          this.closeModal()
          this.loading = false
        },
        error: (error) => {
          this.error = "Failed to update album"
          this.loading = false
        },
      })
    } else {
      const createData: CreateAlbumDto = {
        title: this.albumForm.value.name,
        description: this.albumForm.value.description,
      }

      this.albumService.createAlbum(createData).subscribe({
        next: () => {
          this.success = "Album created successfully"
          this.loadAlbums()
          this.closeModal()
          this.loading = false
        },
        error: (error) => {
          this.error = "Failed to create album"
          this.loading = false
        },
      })
    }
  }

  deleteAlbum(album: AlbumDto): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את האלבום ${album.title}?`)) {
      this.loading = true
      this.albumService.deleteAlbum(album.id).subscribe({
        next: () => {
          this.success = "Album deleted successfully"
          this.loadAlbums()
          this.loading = false
        },
        error: (error) => {
          this.error = "Failed to delete album"
          this.loading = false
        },
      })
    }
  }

  viewAlbumPhotos(album: AlbumDto): void {
    console.log("sending to photos", album.id)
    this.router.navigate(["/photos"], { queryParams: { albumId: album.id } })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }
}
