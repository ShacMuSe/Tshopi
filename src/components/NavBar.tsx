import { Link } from "react-router-dom";

const NavBar: React.FC = () => (
    <nav
        style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#f8f8f8"
        }}
    >
        {/* Logo */}
        <Link
            to="/"
            style={{
                display: "flex",
                alignItems: "center",
                marginRight: "30px"
            }}
        >
            <img
                src="https://res.cloudinary.com/dltjidaij/image/upload/v1767735652/samples/zoom.avif"
                alt="Tshopi Logo"
                style={{
                    height: "40px",
                    cursor: "pointer"
                }}
            />
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/listproducts">All Products</Link>
            <Link to="/products/hoodies">Hoodies</Link>
            <Link to="/products/pants">Pants</Link>
            <Link to="/products/shirts">Shirts</Link>
        </div>
    </nav>
);

export default NavBar;
