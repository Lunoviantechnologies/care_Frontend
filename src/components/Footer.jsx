import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import careLogo from "../assets/careLogo.png";

const Footer = () => {
    return (
        <footer className="bg-light pt-5 pb-4 border-top">
            <div className="container">

                {/* Top Section */}
                <div className="row gy-4">

                    {/* Brand Column */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img src={careLogo} alt="Service Care Logo" height="40" style={{ objectFit: "contain" }} />
                            <h5 className="fw-bold mb-0">ServiceCare</h5>
                        </div>

                        <p className="text-muted small">
                            Professional care for your baby, pets, and elderly — available on demand across India.
                        </p>
                    </div>

                    {/* Company */}
                    <div className="col-6 col-md-6 col-lg-3">
                        <h6 className="fw-bold mb-3">Company</h6>
                        <ul className="list-unstyled small">
                            <li><Link className="text-decoration-none text-muted" to="/about">About us</Link></li>
                            <li><Link className="text-decoration-none text-muted" to="/terms">Terms & Conditions</Link></li>
                            <li><Link className="text-decoration-none text-muted" to="/privacy">Privacy Policy</Link></li>
                            <li><Link className="text-decoration-none text-muted" to="/careers">Careers</Link></li>
                        </ul>
                    </div>

                    {/* For Customers */}
                    <div className="col-6 col-md-6 col-lg-3">
                        <h6 className="fw-bold mb-3">For Customers</h6>
                        <ul className="list-unstyled small">
                            <li><Link className="text-decoration-none text-muted" to="/services">Services near you</Link></li>
                            <li><Link className="text-decoration-none text-muted" to="/reviews">Reviews</Link></li>
                            <li><Link className="text-decoration-none text-muted" to="/contact">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Social + App Links */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h6 className="fw-bold mb-3">Social Links</h6>

                        <div className="d-flex gap-3 mb-3">
                            <a href="#" className="text-muted fs-5"><FaSquareXTwitter /></a>
                            <a href="#" className="text-muted fs-5"><FaFacebookF /></a>
                            <a href="#" className="text-muted fs-5"><FaInstagram /></a>
                            <a href="#" className="text-muted fs-5"><FaLinkedinIn /></a>
                        </div>

                        {/* App Buttons */}
                        <div className="d-flex flex-column gap-2">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                style={{ width: "120px" }}
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                style={{ width: "120px" }}
                            />
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <hr className="my-4" />

                {/* Bottom Section */}
                <div className="text-center small text-muted">
                    © {new Date().getFullYear()} ServiceCare. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;