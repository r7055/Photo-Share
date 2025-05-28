import { Component, EventEmitter, Output } from "@angular/core"
import { AuthService } from "../../services/auth.service"
import { CommonModule } from "@angular/common"
// import { Output, EventEmitter } from "@angular/core"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"

@Component({
  selector: "app-header",
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout()
  }
}
