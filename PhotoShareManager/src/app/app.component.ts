import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,HeaderComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   title = "PhotoShare Admin"

  // constructor(
  //   private router: Router,
  //   public authService: AuthService,
  // ) {}

  // isLoginPage(): boolean {
  //   return this.router.url === "/login"
  // }
}
