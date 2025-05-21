import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import { environment } from "../environments/environment"

export interface TagDto {
  id: number
  name: string
  count: number
}

@Injectable({
  providedIn: "root",
})
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<TagDto[]> {
    return this.http.get<TagDto[]>(`${environment.apiUrl}/api/tags`)
  }

  createTag(name: string): Observable<TagDto> {
    return this.http.post<TagDto>(`${environment.apiUrl}/api/tags`, { name })
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/tags/${id}`)
  }

  addTagToPhoto(photoId: number, tagId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/photos/${photoId}/tags/${tagId}`, {})
  }

  removeTagFromPhoto(photoId: number, tagId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/photos/${photoId}/tags/${tagId}`)
  }
}
