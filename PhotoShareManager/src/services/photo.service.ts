import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../environments/environment"

export interface PhotoDto {
  id: number
  name: string
  description: string
  albumId: number
  userId: number
  url: string
  thumbnailUrl: string
  size: number
  width: number
  height: number
  createdAt: string
  updatedAt: string
}

export interface UpdatePhotoDto {
  name?: string
  description?: string
  albumId?: number
}

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  constructor(private http: HttpClient) { }

  // getPhotos(albumId?: number): Observable<PhotoDto[]> {
  //   const url = albumId ? `${environment.apiUrl}/api/albums/${albumId}/photos` : `${environment.apiUrl}/api/photos`
  //   const res= this.http.get<PhotoDto[]>(url)
  //   console.log(res)
  //   return res
  // }
  getPhotos(albumId?: number): Observable<PhotoDto[]> {
    const url = albumId ? `${environment.apiUrl}/api/albums/${albumId}/photos` : `${environment.apiUrl}/api/photos`;

    const res = this.http.get<PhotoDto[]>(url);

    // נרשמים ל-Observable כדי לראות את התגובה
    res.subscribe(
      (photos) => {
        console.log('Photos received!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1:', photos);
      },
      (error) => {
        console.error('Error fetching photos:', error);
      }
    );

    return res; // אם אתה רוצה להחזיר את ה-Observable גם
  }


  getPhoto(id: number): Observable<PhotoDto> {
    return this.http.get<PhotoDto>(`${environment.apiUrl}/api/photos/${id}`)
  }

  updatePhoto(id: number, photo: UpdatePhotoDto): Observable<PhotoDto> {
    return this.http.put<PhotoDto>(`${environment.apiUrl}/api/photos/${id}`, photo)
  }

  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/photos/${id}`)
  }

  getRecyclePhotos(): Observable<PhotoDto[]> {
    return this.http.get<PhotoDto[]>(`${environment.apiUrl}/api/photos/recycle`)
  }

  restorePhoto(id: number, albumId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/photos/${id}/restore`, { albumId })
  }
}
