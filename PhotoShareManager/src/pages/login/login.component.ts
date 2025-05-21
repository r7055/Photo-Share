import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import  { Router, ActivatedRoute } from "@angular/router"
import { first } from "rxjs/operators"
import  { AuthService } from "../../services/auth.service"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-login",
  imports: [  CommonModule,
    FormsModule,
    ReactiveFormsModule],
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  submitted = false
  error = ""
  returnUrl: string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/"
  }

  ngOnInit(): void {}

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authService
      .login(this.f["email"].value, this.f["password"].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl])
        },
        error: (error) => {
          this.error = error
          this.loading = false
        },
      })
  }
}
