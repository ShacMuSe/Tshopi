import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";

const Layout: React.FC = () => {
    return (
        <div className="app-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavBar />

            <main style={{ flex: 1, padding: "20px" }}>
                <Outlet /> {/* Routed page content will appear here */}
            </main>

            <Footer /> {/* Footer appears on every page */}
        </div>
    );
};

export default Layout;
