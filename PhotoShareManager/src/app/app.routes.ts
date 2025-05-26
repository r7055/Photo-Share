import { Routes } from "@angular/router"
import { LoginComponent } from "../pages/login/login.component"
import { AuthGuard } from "../guards/auth.guard"
import { DashboardComponent } from "../pages/dashboard/dashboard.component"
import { UsersComponent } from "../pages/users/users.component"
import { AlbumsComponent } from "../pages/albums/albums.component"
import { PhotosComponent } from "../pages/photos/photos.component"
import { AnalyticsComponent } from "../pages/analytics/analytics.component"
import { TagsComponent } from "../pages/tags/tags.component"
import { MainComponent } from "../components/main/main.component"


export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "albums", component: AlbumsComponent },
      { path: "photos", component: PhotosComponent },
      { path: "tags", component: TagsComponent },
      { path: "shares", component: UsersComponent },
      { path: "analytics", component: AnalyticsComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];


