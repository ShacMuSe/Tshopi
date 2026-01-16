export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number;
    imageUrls: string[];
    videoUrls?: string[];
}
