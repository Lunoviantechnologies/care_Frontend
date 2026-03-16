import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import careLogo from "../assets/careLogo.png";

const Navbar = () => {
    const [location, setLocation] = useState("");

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(
                    `Lat: ${position.coords.latitude.toFixed(4)}, 
                    Lng: ${position.coords.longitude.toFixed(4)}`
                );
            });
        } else {
            alert("Geolocation not supported");
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
                <div className="container">

                    {/* Logo */}
                    <Link
                        className="navbar-brand d-flex align-items-center gap-2 fw-bold text-success"
                        to="/"
                    >
                        <img
                            src={careLogo}
                            alt="Service Care Logo"
                            height="40"
                            style={{ objectFit: "contain" }}
                        />
                        <span>ServiceCare</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/about_us">About Us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/contact_us">Contact Us</Link>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-success d-inline-flex align-items-center gap-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#locationModal"
                                >
                                    <FaMapMarkerAlt /> Location
                                </button>
                            </li>

                            <li className="nav-item mt-2 mt-lg-0">
                                <Link
                                    className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
                                    to="/login"
                                >
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>

                            <li className="nav-item mt-2 mt-lg-0">
                                <Link
                                    className="btn btn-success d-inline-flex align-items-center gap-2"
                                    to="/register"
                                >
                                    <FaUserPlus /> Signup
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            {/* Location Modal */}
            <div className="modal fade" id="locationModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Select Location</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <button
                                className="btn btn-outline-primary w-100"
                                onClick={handleCurrentLocation}
                            >
                                Use Current Location
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;