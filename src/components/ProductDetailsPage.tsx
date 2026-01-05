import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import DefaultImage from "../assets/default-product.png";

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await getProducts(); // get all products
                const found = res.data.find(p => p.id === Number(id));
                setProduct(found || null);
            } catch (err) {
                console.error(err);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) return <p>Product not found.</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <Link to="/listproducts">&larr; Back to products</Link>
            <img
                src={product.imageUrl || DefaultImage}
                alt={product.name}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    margin: "20px 0"
                }}
            />
            <h1>{product.name}</h1>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {/* Add more details if you want */}
        </div>
    );
};

export default ProductDetailsPage;
