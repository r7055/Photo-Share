import { Component } from "@angular/core"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route)
  }

  isAdmin(): boolean {
    return this.authService.isAdmin()
  }
}
