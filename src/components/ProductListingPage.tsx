import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import DefaultImage from "../assets/default-product.png";
import { Link } from "react-router-dom";

const ProductListingPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await getProducts();
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();
    }, []);

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Products</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px"
                }}
            >
                {products.map(p => (
                    <Link
                        to={`/product/${p.id}`}
                        key={p.id}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "10px",
                                textAlign: "center",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                cursor: "pointer"
                            }}
                        >
                            <img
                                src={p.imageUrls?.[0] || DefaultImage}
                                alt={p.name}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    marginBottom: "10px"
                                }}
                            />

                            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>
                                {p.name}
                            </h3>
                            <p style={{ fontWeight: "bold", color: "#333" }}>
                                ${p.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;
