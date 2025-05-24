import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AlbumDto } from "./album.service";
import { PhotoDto } from "./photo.service";
import { UserDto } from "./user.service";

export interface StatisticsDto {
    totalUsers: number;
    totalAlbums: number;
    totalPhotos: number;
    totalShares: number;
    newAlbums: AlbumDto[];
    newPhotos: PhotoDto[];
    newUsers: UserDto[];
    storageUsed: number;
    totalStorage: number|5
}

@Injectable({
    providedIn: "root",
})
export class StatisticsService {
    constructor(private http: HttpClient) { }

    getStatistics(days: number): Observable<StatisticsDto> {
        const params = new HttpParams().set('days', days.toString()); // Changed numOfDays to days
        return this.http.get<StatisticsDto>(`${environment.apiUrl}/api/statistics`, { params });
    }

    getUserActivityData(days: number): Observable<number[]> {
        const params = new HttpParams().set('days', days.toString()); // Added params for consistency
        return this.http.get<number[]>(`${environment.apiUrl}/api/statistics/userActivity`, { params });
    }

    getUploadsData(days: number): Observable<number[]> {
        const params = new HttpParams().set('days', days.toString()); // Added params for consistency
        return this.http.get<number[]>(`${environment.apiUrl}/api/statistics/uploads`, { params });
    }

    getSharesData(days: number): Observable<{ sharesAlbums: number[], sharesPhotos: number[] }> {
        const params = new HttpParams().set('days', days.toString()); // Added params for consistency
        return this.http.get<{ sharesAlbums: number[], sharesPhotos: number[] }>(`${environment.apiUrl}/api/statistics/shares`, { params });
    }

    getStorageData(): Observable<{ storageUsedPercent: number }> {
        return this.http.get<{ storageUsedPercent: number }>(`${environment.apiUrl}/api/statistics/storage`); // Corrected endpoint
    }
}
