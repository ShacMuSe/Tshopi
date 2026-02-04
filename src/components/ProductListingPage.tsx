import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import DefaultImage from "../assets/default-product.png";
import { Link } from "react-router-dom";

const ProductListingPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await getProducts();
                let filteredProducts = res.data;

               /* // ✅ Show only IN_STOCK products
                filteredProducts = filteredProducts.filter(
                    (p) => p.stockStatus === "IN_STOCK"
                );*/

                // ✅ Filter by category if category exists in URL
                if (category) {
                    filteredProducts = filteredProducts.filter(
                        (p) => p.category.toLowerCase() === category.toLowerCase()
                    );
                }

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, [category]);


    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
                {category
                    ? category.charAt(0).toUpperCase() + category.slice(1)
                    : "All"}{" "}
                Products
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                }}
            >
                {products.map((p) => (
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
                                cursor: "pointer",
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
                                    marginBottom: "10px",
                                }}
                            />

                            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>
                                {p.name}
                            </h3>
                            <p style={{ fontWeight: "bold", color: "#333" }}>${p.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductListingPage;
