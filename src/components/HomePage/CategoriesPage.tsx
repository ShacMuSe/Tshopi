import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import type { Category } from "../../types/Category";

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading categories...</p>;

    return (
        <div style={{ padding: "30px" }}>
            <h1>Shop by Category</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {categories.map(category => (
                    <Link
                        key={category.id}
                        to={`/products/${category.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "contain",
                                }}
                            />
                            <div style={{ padding: "15px", textAlign: "center" }}>
                                <h2>{category.name}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
