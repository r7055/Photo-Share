export interface Album {
    id?: number;
    title: string;
    description: string;
    parentId: number|0;
}

export interface AlbumSharePostModel {
    albumId: number;
    UserEmailForSharing: string;
}

