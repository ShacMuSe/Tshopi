import { Link } from "react-router-dom";

const NavBar: React.FC = () => (
    <nav
        style={{
            display: "flex",
            gap: "20px",
            padding: "10px",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#f8f8f8"
        }}
    >
        <Link to="/listproducts">All Products</Link>
        <Link to="/products/hoodies">Hoodies</Link>
        <Link to="/products/pants">Pants</Link>
        <Link to="/products/shirts">Shirts</Link>
    </nav>
);

export default NavBar;
