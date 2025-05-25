import { User } from "./user";

export interface Album {
    id?: number;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    owner?:User;
    photoCount: number;
    parentId: number|0;
}

export interface AlbumSharePostModel {
    albumId: number;
    UserEmailForSharing: string;
}

