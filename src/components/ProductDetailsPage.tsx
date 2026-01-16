import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import DefaultImage from "../assets/default-product.png";

const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<string>(""); // can be image or video
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await getProducts();
                const found = res.data.find(p => p.id === Number(id));
                setProduct(found || null);

                // set first media as selected
                if (found?.imageUrls?.length) {
                    setSelectedMedia(found.imageUrls[0]);
                    setIsVideo(false);
                } else if (found?.videoUrls?.length) {
                    setSelectedMedia(found.videoUrls[0]);
                    setIsVideo(true);
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) return <p>Product not found.</p>;

    // combined media array for thumbnails
    const images = product.imageUrls ?? [];
    const videos = product.videoUrls ?? [];

    const allMedia = [
        ...images.map(url => ({ url, type: "image" as const })),
        ...videos.map(url => ({ url, type: "video" as const }))
    ];

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
            <Link to="/listproducts">&larr; Back to products</Link>

            {/* Main Media */}
            <div style={{ margin: "20px 0" }}>
                {isVideo ? (
                    <video
                        src={selectedMedia}
                        controls
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            backgroundColor: "#f5f5f5"
                        }}
                    />
                ) : (
                    <img
                        src={selectedMedia || DefaultImage}
                        alt={product.name}
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            backgroundColor: "#f5f5f5"
                        }}
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {allMedia.map((media, index) => (
                    <div key={index} onClick={() => {
                        setSelectedMedia(media.url);
                        setIsVideo(media.type === "video");
                    }}>
                        {media.type === "image" ? (
                            <img
                                src={media.url}
                                alt={`thumbnail-${index}`}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    border:
                                        selectedMedia === media.url
                                            ? "2px solid #007bff"
                                            : "1px solid #ccc"
                                }}
                            />
                        ) : (
                            <video
                                src={media.url}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    border:
                                        selectedMedia === media.url
                                            ? "2px solid #007bff"
                                            : "1px solid #ccc"
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <h1>{product.name}</h1>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>

            <Link to={`/order/${product.id}`}>
                <button
                    style={{
                        padding: "10px 20px",
                        marginTop: "20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Order this product
                </button>
            </Link>
        </div>
    );
};

export default ProductDetailsPage;
