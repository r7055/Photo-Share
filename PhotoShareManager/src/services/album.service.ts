import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

export interface AlbumDto {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  parentId?: number;
  createdAt: string;
  updatedAt: string;
  photoCount: number;
  coverUrl?: string;
  countViews: number;
}

export interface CreateAlbumDto {
  title: string;
  description: string;
}

export interface UpdateAlbumDto {
  title?: string;
  description?: string;
  parentId?: number;
}

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<AlbumDto[]> {
    return this.http.get<AlbumDto[]>(`${environment.apiUrl}/api/albums`);
  }

  getAlbum(id: number): Observable<AlbumDto> {
    return this.http.get<AlbumDto>(`${environment.apiUrl}/api/albums/${id}`);
  }

  createAlbum(album: CreateAlbumDto): Observable<AlbumDto> {
    return this.http.post<AlbumDto>(`${environment.apiUrl}/api/albums`, album);
  }

  updateAlbum(id: number, album: UpdateAlbumDto): Observable<AlbumDto> {
    console.log("album update", album);
    return this.http.put<AlbumDto>(`${environment.apiUrl}/api/albums/${id}`, album);
  }

  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/albums/${id}`);
  }

  getRecycleAlbums(): Observable<AlbumDto[]> {
    return this.http.get<AlbumDto[]>(`${environment.apiUrl}/api/albums/recycle`);
  }

  restoreAlbum(id: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/albums/${id}/restore`, {});
  }

  getTopAlbums(): Observable<AlbumDto[]> {
    return this.http.get<AlbumDto[]>(`${environment.apiUrl}/api/albums/top`);
  }
}
