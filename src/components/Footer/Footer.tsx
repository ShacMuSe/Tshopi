import React from "react";
import "./Footer.css"; // optional for styling

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2026 Tshopi. All rights reserved.</p>
                <p>Contact us: contact@tshopi.com | +216 12 345 678</p>
                <p>Address: 123 Main Street, Tunis, Tunisia</p>
                <div className="footer-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
