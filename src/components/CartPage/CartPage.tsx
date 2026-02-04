import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../OrderPage/OrderPage.css";
import DefaultImage from "../../assets/default-product.png";
import { getCart, removeCartItem } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../../services/orderService";


type CartItem = {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        imageUrls?: string[];
    };
};

type Cart = {
    phone: string;
    items: CartItem[];
};

const CartPage: React.FC = () => {
    const { phone } = useParams<{ phone: string }>();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");


    useEffect(() => {
        if (!phone) return;

        const loadCart = async () => {
            try {
                const res = await getCart(phone);
                setCart(res.data);
            } catch (e) {
                setCart(null);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [phone]);

    const handleRemove = async (itemId: number) => {
        await removeCartItem(itemId);
        setCart((prev) =>
            prev
                ? { ...prev, items: prev.items.filter((i) => i.id !== itemId) }
                : prev
        );
    };

    const handleCheckout = async () => {
        if (!phone) return;

        await checkoutCart(phone, {
            firstName,
            lastName,
            email,
            address
        });

        navigate("/");
    };



    if (loading) {
        return (
            <div className="op-page">
                <div className="op-shell">
                    <div className="op-loading">
                        <div className="op-spinner" />
                        <p>Loading cart…</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="op-page">
                <div className="op-shell">
                    <div className="op-success">
                        <h2>Your cart is empty</h2>
                        <p>Add some products to continue.</p>

                        <div className="op-successActions">
                            <Link to="/listproducts" className="op-btn op-btnPrimary">
                                Browse products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="op-page">
            <div className="op-shell">
                <div className="op-card">
                    {/* Header */}
                    <div className="op-header">
                        <div>
                            <h1 className="op-title">Your Cart</h1>
                            <p className="op-sub">
                                <span className="op-muted">Phone:</span> {cart.phone}
                            </p>
                        </div>

                        <Link to="/listproducts" className="op-back">
                            ← Continue shopping
                        </Link>
                    </div>

                    <div className="op-grid">
                        {/* Items */}
                        <div className="op-media">
                            {cart.items.map((item) => (
                                <div key={item.id} className="op-imageWrap">
                                    <img
                                        src={item.product.imageUrls?.[0] || DefaultImage}
                                        className="op-productImage"
                                        style={{ height: 180 }}
                                    />

                                    <div className="op-summary">
                                        <div className="op-summaryRow">
                                            <strong>{item.product.name}</strong>
                                        </div>
                                        <div className="op-summaryRow">
                                            <span>Quantity</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                        <div className="op-summaryRow">
                                            <span>Subtotal</span>
                                            <span>
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            className="op-btn op-btnGhost"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="op-form">
                            <input
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>


                        {/* Summary */}
                        <div className="op-form">
                            <div className="op-summary">
                                <div className="op-summaryRow">
                                    <span>Total</span>
                                    <span className="op-strong">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className="op-btn op-btnPrimary op-submit"
                                onClick={handleCheckout}
                            >
                                Proceed to checkout
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
