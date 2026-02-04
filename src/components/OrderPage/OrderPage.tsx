import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createOrder } from "../../services/orderService";
import { getProducts } from "../../services/productService";
import DefaultImage from "../../assets/default-product.png";
import "./OrderPage.css";

interface Product {
    id?: number;
    name: string;
    imageUrls?: string[];
    price: number;
    category: string;
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
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProducts();
                const found = res.data.find((p: any) => p.id === Number(productId));

                if (found) {
                    setProduct(found);
                    if (found.imageUrls && found.imageUrls.length > 0) {
                        setSelectedImage(found.imageUrls[0]);
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
            setSubmitting(true);
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
        } finally {
            setSubmitting(false);
        }
    };

    if (!product) {
        return (
            <div className="op-page">
                <div className="op-shell">
                    <div className="op-loading">
                        <div className="op-spinner" />
                        <p>Loading product…</p>
                    </div>
                </div>
            </div>
        );
    }

    const total = product.price * quantity;

    const backUrl = product.category
        ? `/products/${product.category}`
        : "/listproducts";


    if (success) {
        return (
            <div className="op-page">
                <div className="op-shell">
                    <div className="op-success">
                        <div className="op-successIcon">✅</div>
                        <h2>Order placed!</h2>
                        <p>We received your order request and will contact you shortly.</p>

                        <div className="op-successActions">
                            <Link to="/listproducts" className="op-btn op-btnPrimary">
                                Back to Products
                            </Link>
                            <Link to="/" className="op-btn op-btnGhost">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="op-page">
            <div className="op-shell">
                <div className="op-card">
                    {/* Header */}
                    <div className="op-header">
                        <div>
                            <h1 className="op-title">{product.name}</h1>
                            <p className="op-sub">
                                <span className="op-price">${product.price.toFixed(2)}</span>
                                <span className="op-dot">•</span>
                                <span className="op-muted">Secure checkout</span>
                            </p>
                        </div>

                        <Link to={backUrl} className="op-back">
                            ← Back
                        </Link>
                    </div>

                    <div className="op-grid">
                        {/* Left: image */}
                        <div className="op-media">
                            <div className="op-imageWrap">
                                <img
                                    src={selectedImage || DefaultImage}
                                    alt={product.name}
                                    className="op-productImage"
                                />
                            </div>

                            <div className="op-thumbs" aria-label="Choose a variant image">
                                {product.imageUrls?.map((img, index) => {
                                    const active = selectedImage === img;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={`op-thumbBtn ${active ? "active" : ""}`}
                                            onClick={() => setSelectedImage(img)}
                                            aria-pressed={active}
                                        >
                                            <img src={img} alt={`variant-${index}`} />
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="op-summary">
                                <div className="op-summaryRow">
                                    <span className="op-muted">Quantity</span>
                                    <span className="op-strong">{quantity}</span>
                                </div>
                                <div className="op-summaryRow">
                                    <span className="op-muted">Total</span>
                                    <span className="op-strong">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: form */}
                        <form onSubmit={handleSubmit} className="op-form">
                            <div className="op-fieldRow">
                                <label className="op-label">
                                    First name
                                    <input
                                        className="op-input"
                                        type="text"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </label>

                                <label className="op-label">
                                    Last name
                                    <input
                                        className="op-input"
                                        type="text"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <label className="op-label">
                                Phone number
                                <input
                                    className="op-input"
                                    type="tel"
                                    placeholder="+216 …"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </label>

                            <label className="op-label">
                                Email address
                                <input
                                    className="op-input"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>

                            <label className="op-label">
                                Delivery address
                                <textarea
                                    className="op-input op-textarea"
                                    placeholder="Street, city, zip…"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </label>

                            <label className="op-label">
                                Quantity
                                <div className="op-qty">
                                    <button
                                        type="button"
                                        className="op-qtyBtn"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>

                                    <input
                                        className="op-qtyInput"
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(Math.max(1, Number(e.target.value || 1)))
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="op-qtyBtn"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </label>

                            <button
                                type="submit"
                                className="op-btn op-btnPrimary op-submit"
                                disabled={submitting}
                            >
                                {submitting ? "Placing order…" : "Confirm Order"}
                            </button>

                            <p className="op-footnote">
                                By confirming, you agree to be contacted about your order.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
