import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Layout: React.FC = () => {
    return (
        <div className="app-layout">
            <NavBar />

            <main className="app-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
