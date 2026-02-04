import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

type NavItem = { to: string; label: string };

const navItems: NavItem[] = [
    { to: "/listproducts", label: "All Products" },
    { to: "/products/hoodies", label: "Hoodies" },
    { to: "/products/pants", label: "Pants" },
    { to: "/products/shirts", label: "Shirts" }
];

const NavBar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    return (
        <nav className="nav">
            {/* Brand / Logo */}
            <Link to="/" className="brand" aria-label="Go to homepage">
                <img
                    className="brand__logo"
                    src="https://res.cloudinary.com/dltjidaij/image/upload/v1767735652/samples/zoom.avif"
                    alt="Tshopi Logo"
                />
                <span className="brand__name">Tshopi</span>
            </Link>

            {/* Links */}
            <div className="nav__links">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`nav__link ${isActive(item.to) ? "is-active" : ""}`}
                        aria-current={isActive(item.to) ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
