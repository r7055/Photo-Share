import { Tag } from "./tag";

export interface Photo {
    id?: number;
    url: string;
    size: number;
    albumId: number;
    name: string;
    deletedAt?: string;
    createdAt?: string;
    countViews:number;
    userId: number;
    tags?: Tag[];
}


