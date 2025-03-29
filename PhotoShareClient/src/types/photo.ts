export interface Photo {
    id?: number;
    url: string;
    size: number;
    albumId: string;
    name: string;
    tags?: string[];
}