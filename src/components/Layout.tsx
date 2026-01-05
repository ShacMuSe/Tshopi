import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div style={{ padding: "20px" }}>
                <Outlet /> {/* This is where routed page content will appear */}
            </div>
        </div>
    );
};

export default Layout;
