import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../environments/environment"

export interface RoleDto {
  id: number
  roleName: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface UserDto {
  id: number
  firstName: string
  lastName: string
  email: string
  password?: string
  role: RoleDto
  createAt: string
  lastLogin: string
  status: boolean
  countUpload: number
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  roleId?: number
  status?: boolean
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/api/users`)
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.apiUrl}/api/users/${id}`)
  }

  updateUser(id: number, user: UpdateUserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${environment.apiUrl}/api/users/${id}`, user)
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/users/${id}`)
  }

  getTopUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/api/users/top`);
  }
}