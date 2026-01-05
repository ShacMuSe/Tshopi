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
        <Link to="/listproducts">Product Listing</Link>
        <Link to="/addproducts">Add Product</Link>
    </nav>
);

export default NavBar;
