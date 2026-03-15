import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { getCategories } from "../../services/categoryService";
import { getCart } from "../../services/cartService";
import type { Category } from "../../types/Category";
import "./NavBar.css";

const NavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [phone, setPhone] = useState<string | null>(localStorage.getItem("phone"));
    const [inputPhone, setInputPhone] = useState<string>("");

    const isConnected = !!phone; // true if phone exists

    const handleCartClick = () => {
        let storedPhone = phone;

        if (!storedPhone) {
            const input = window.prompt("Enter your phone number to access your cart:");
            if (!input || input.trim() === "") return;

            storedPhone = input.trim();
            localStorage.setItem("phone", storedPhone);
            setPhone(storedPhone);
        }

        navigate(`/cart/${storedPhone}`);
    };

    const handleSignOut = () => {
        localStorage.removeItem("phone");
        setPhone(null);
        setCartCount(0); // optional: clear cart count when signing out
    };

    const loadCart = (phone: string) => {
        getCart(phone)
            .then(res => {
                const items = res.data.items || [];
                const total = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
                setCartCount(total);
            })
            .catch(() => setCartCount(0));
    };

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to load categories", err));

        if (phone) {
            loadCart(phone);
        }
    }, [phone]);

    return (
        <nav className="nav">
            <Link to="/" className="brand">
                <img
                    className="brand__logo"
                    src="https://res.cloudinary.com/dltjidaij/image/upload/v1773555125/tshopi_without_bg_from_chatgpt_pbyrtt.png"
                    alt="Tshopi Logo"
                />
                {/*<span className="brand__name">Tshopi</span>*/}
            </Link>

            <div className="nav__links">
                <Link
                    to="/listproducts"
                    className={`nav__link ${isActive("/listproducts") ? "is-active" : ""}`}
                >
                    All Products
                </Link>

                {categories.map(category => (
                    <Link
                        key={category.id}
                        to={`/products/${category.slug}`}
                        className={`nav__link ${isActive(`/products/${category.slug}`) ? "is-active" : ""}`}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* Right-side actions */}
            <div className="nav__right">
                {phone ? (
                    <div className="user-status">
                        <span className="connected">Connected as {phone}</span>
                        <button className="signout-btn" onClick={() => {
                            localStorage.removeItem("phone");
                            setPhone(null);
                            setCartCount(0);
                            setInputPhone("");
                        }}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="connect-form">
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                            className="connect-input"
                        />
                        <button
                            className="connect-btn"
                            onClick={() => {
                                const trimmed = inputPhone.trim();
                                if (!trimmed) return;
                                localStorage.setItem("phone", trimmed);
                                setPhone(trimmed); // now the user is connected
                                setInputPhone("");  // clear input field
                                loadCart(trimmed);
                            }}
                        >
                            Connect
                        </button>
                    </div>
                )}


                {/* Cart is always at the far right */}
                <div className="cart" onClick={handleCartClick} style={{ cursor: "pointer" }}>
                    <FaShoppingCart size={22} />
                    {cartCount > 0 && <span className="cart__badge">{cartCount}</span>}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;