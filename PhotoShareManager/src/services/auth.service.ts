import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { BehaviorSubject, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { environment } from "../environments/environment"

export interface User {
  id: number
  name: string
  email: string
  role: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: User | null

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser") || "null")
        : null,
      // JSON.parse(|| "null"),
    )
    this.currentUser = this.currentUserSubject.value
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

 register(firstName: string, lastName: string, email: string, password: string): Observable<User> {
    console.log("Registering user:", { firstName, lastName, email, password });
    return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, { 
        FirstName: firstName, 
        LastName: lastName, 
        Email: email, 
        Password: password 
    }).pipe(
        map((response) => {
            // Optionally handle the response here (e.g., store user details or token)
            return response.user; // Assuming the response contains the user data
        }),
    );
}


  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      map((response) => {
        // Store user details and jwt token in local storage to keep user logged in
        const user = response.user
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("token", response.token)
        this.currentUserSubject.next(user)
        this.currentUser = user
        return user
      }),
    )
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.currentUserSubject.next(null)
    this.currentUser = null
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === "admin"
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }
}
