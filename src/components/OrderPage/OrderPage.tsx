import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import { getProducts } from "../../services/productService";
import DefaultImage from "../../assets/default-product.png"; // fallback image

interface Product {
    id?: number;
    name: string;
    imageUrls?: string[];
    price: number;
    category?: string;
}

const OrderPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const [selectedImage, setSelectedImage] = useState<string>("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [product, setProduct] = useState<Product | null>(null);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProducts();
                const found = res.data.find(p => p.id === Number(productId));

                if (found) {
                    setProduct(found);

                    if (found.imageUrls && found.imageUrls.length > 0) {
                        setSelectedImage(found.imageUrls[0]); // ✅ auto select
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [productId]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createOrder({
                productId: Number(productId),
                firstName,
                lastName,
                phone,
                email,
                address,
                quantity,
                selectedImage,
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Error while placing order");
        }
    };

    if (!product) return <p>Loading product...</p>;

    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={{ color: "green" }}>✅ Order Placed Successfully!</h2>
                    <Link to="/listproducts" style={styles.link}>
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Product Image */}
                <img
                    src={selectedImage || DefaultImage}
                    alt={product.name}
                    style={styles.productImage}
                />
                {/* Image / Color Selection */}
                <div style={styles.thumbnailRow}>
                    {product.imageUrls?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`variant-${index}`}
                            onClick={() => setSelectedImage(img)}
                            style={{
                                ...styles.thumbnail,
                                border:
                                    selectedImage === img
                                        ? "2px solid #4f46e5"
                                        : "1px solid #ccc",
                            }}
                        />
                    ))}
                </div>
                <h1 style={styles.title}>{product.name}</h1>
                <p style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
                    ${product.price.toFixed(2)}
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>

                    <label style={styles.label}>
                        First Name
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Last Name
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Phone Number
                        <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Email Address
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Delivery Address
                        <textarea
                            placeholder="Delivery address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                            style={{ ...styles.input, height: "80px", resize: "none" }}
                        />
                    </label>

                    <label style={styles.label}>
                        Quantity
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            style={styles.input}
                        />
                    </label>

                    <button type="submit" style={styles.button}>
                        Confirm Order
                    </button>

                </form>

            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    thumbnailRow: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "15px",
    },

    thumbnail: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
    },

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
        padding: "20px",
    },
    card: {
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    productImage: {
        width: "100%",
        height: "250px",
        objectFit: "contain",
        borderRadius: "10px",
        marginBottom: "15px",
    },
    title: {
        marginBottom: "10px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    label: {
        display: "flex",
        flexDirection: "column",
        fontWeight: 500,
        fontSize: "14px",
        color: "#555",
        textAlign: "left",
    },
    input: {
        marginTop: "5px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
    },
    button: {
        marginTop: "10px",
        padding: "12px",
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    link: {
        display: "inline-block",
        marginTop: "15px",
        color: "#4f46e5",
        textDecoration: "none",
        fontWeight: 500,
    },
    
};

export default OrderPage;
