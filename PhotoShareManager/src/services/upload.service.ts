import { Injectable } from "@angular/core"
import {  HttpClient,  HttpEvent, HttpRequest } from "@angular/common/http"
import  { Observable } from "rxjs"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadPhoto(albumId: number, file: File): Observable<HttpEvent<any>> {
    const formData = new FormData()
    formData.append("file", file)

    const request = new HttpRequest("POST", `${environment.apiUrl}/api/albums/${albumId}/photos`, formData, {
      reportProgress: true,
    })

    return this.http.request(request)
  }

  getUploadUrl(albumId: number, fileName: string): Observable<{ url: string; fields: any }> {
    return this.http.get<{ url: string; fields: any }>(`${environment.apiUrl}/api/uploads/url`, {
      params: { albumId: albumId.toString(), fileName },
    })
  }
}
