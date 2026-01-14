import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createOrder } from "../services/orderService";

const OrderPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createOrder({
                productId: Number(productId),
                phone,
                email,
                address,
                quantity
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Error while placing order");
        }
    };

    if (success) {
        return (
            <div>
                <h2>✅ Order placed successfully</h2>
                <Link to="/listproducts">Back to products</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            <h1>Order Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Delivery address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                />

                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                />

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default OrderPage;
