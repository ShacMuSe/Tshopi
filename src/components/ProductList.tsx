import type { Product } from "../types/Product";
import DefaultImage from "../assets/default-product.png";

interface Props {
    products: Product[];
    onDelete: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onDelete }) => {

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px"
            }}
        >
            {products.map(p => (
                <div
                    key={p.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center"
                    }}
                >
                    <img
                        src={p.imageUrl ? p.imageUrl : DefaultImage}  // use local default image
                        alt={p.name}
                        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                    <button onClick={() => onDelete(p.id!)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
