import { useState } from "react";
import type { Product } from "../types/Product";
import DefaultImage from "../assets/default-product.png"; // import your local default image

interface Props {
    onAdd: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);

    const submit = () => {
        if (!name) {
            alert("Please enter a product name");
            return;
        }
        // Automatically assign default image
        onAdd({ name, price, category: "Clothes", imageUrl: DefaultImage });
        setName("");
        setPrice(0);
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
            />
            <button onClick={submit}>Add Product</button>
        </div>
    );
};

export default ProductForm;
