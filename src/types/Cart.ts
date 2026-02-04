export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Cart {
    phone: string; // primary key
    items: CartItem[];
}
