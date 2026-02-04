export const StockStatus = {
    IN_STOCK : "IN_STOCK",
    OUT_OF_STOCK : "OUT_OF_STOCK"
}as const;

export type StockStatus =
    typeof StockStatus[keyof typeof StockStatus];
