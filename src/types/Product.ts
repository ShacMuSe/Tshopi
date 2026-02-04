import type { StockStatus } from "../components/enums/StockStatus";

export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number;
    stockStatus: StockStatus;
    imageUrls: string[];
    videoUrls?: string[];
}
