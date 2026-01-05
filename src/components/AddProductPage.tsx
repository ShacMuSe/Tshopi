import { useState } from "react";
import type { Product } from "../types/Product";
import { createProduct } from "../services/productService";
import ProductForm from "./ProductForm";

const AddProductPage: React.FC = () => {
    const [message, setMessage] = useState("");

    const handleAdd = async (product: Product) => {
        try {
            await createProduct(product);
            setMessage("Product added successfully!");
        } catch (err) {
            setMessage("Error adding product.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Add Product</h1>
            {message && <p>{message}</p>}
            <ProductForm onAdd={handleAdd} />
        </div>
    );
};

export default AddProductPage;
