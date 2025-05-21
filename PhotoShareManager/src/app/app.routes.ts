// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { NgModule } from "@angular/core"
import { RouterModule,   Routes } from "@angular/router"
import { LoginComponent } from "../pages/login/login.component"
import { AuthGuard } from "../guards/auth.guard"
import { DashboardComponent } from "../pages/dashboard/dashboard.component"
import { UsersComponent } from "../pages/users/users.component"
import { AdminGuard } from "../guards/admin.guard"
import { AlbumsComponent } from "../pages/albums/albums.component"
import { PhotosComponent } from "../pages/photos/photos.component"
// import { TagsComponent } from "../pages/tags/tags.component"
import { RecycleBinComponent } from "../pages/recycle-bin/recycle-bin.component"
import { AnalyticsComponent } from "../pages/analytics/analytics.component"


export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      // { path: "users", component: UsersComponent, canActivate: [AdminGuard] },------
      { path: "users", component: UsersComponent},
      { path: "albums", component: AlbumsComponent },
      { path: "photos", component: PhotosComponent },
      // { path: "tags", component: TagsComponent },
      { path: "shares", component: UsersComponent },
      { path: "recycle-bin", component: RecycleBinComponent },
      // { path: "settings", component: TagsComponent, canActivate: [AdminGuard] },
      // { path: "analytics", component: AnalyticsComponent, canActivate: [AdminGuard] },----
      { path: "analytics", component: AnalyticsComponent },
      { path: "reports", component: PhotosComponent, canActivate: [AdminGuard] },
    ],
  },
  { path: "**", redirectTo: "" },
];


