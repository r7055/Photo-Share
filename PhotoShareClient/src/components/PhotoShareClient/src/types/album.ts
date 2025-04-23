// filepath: c:\Users\user1\Desktop\‏‏תיקיה חדשה\PhotoShare\PhotoShareClient\src\types\album.ts
export interface Album {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}