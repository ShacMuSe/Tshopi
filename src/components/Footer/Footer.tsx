import React from "react";
import {
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt
} from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">

                <h3 className="footer-logo">Tshopi</h3>

                <div className="footer-info">
                    <p><FaEnvelope /> contact@tshopi.com</p>
                    <p><FaPhoneAlt /> +216 12 345 678</p>
                    <p><FaMapMarkerAlt /> 123 Main Street, Tunis, Tunisia</p>
                </div>

                <div className="footer-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                </div>

                <p className="footer-copy">
                    © 2026 Tshopi. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
