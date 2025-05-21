import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import { environment } from "../environments/environment"

export interface ShareDto {
  id: number
  type: "album" | "photo"
  itemId: number
  itemName: string
  sharedBy: number
  sharedWith: string
  accessLevel: "view" | "edit"
  expiresAt?: string
  createdAt: string
}

export interface CreateShareDto {
  type: "album" | "photo"
  itemId: number
  sharedWith: string
  accessLevel: "view" | "edit"
  expiresAt?: string
}

@Injectable({
  providedIn: "root",
})
export class ShareService {
  constructor(private http: HttpClient) {}

  getShares(): Observable<ShareDto[]> {
    return this.http.get<ShareDto[]>(`${environment.apiUrl}/api/shares`)
  }

  createShare(share: CreateShareDto): Observable<ShareDto> {
    return this.http.post<ShareDto>(`${environment.apiUrl}/api/shares`, share)
  }

  deleteShare(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/shares/${id}`)
  }
}
