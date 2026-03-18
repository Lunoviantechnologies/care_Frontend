import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaSignInAlt, FaUserPlus, FaTimes, FaBars } from "react-icons/fa";
import careLogo from "../assets/careLogo.png";
import "../styleSheets/navbar.css";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about_us" },
    { label: "Contact Us", to: "/contact_us" },
];

const SERVICES = [
    { label: "Baby Care", to: "/services/baby_care" },
    { label: "Pet Care", to: "/services/pet_care" },
    { label: "Elder Care", to: "/services/elder_care" },
    { label: "Pregnancy Care", to: "/services/pregnancy_care" },
    { label: "Home Assistance", to: "/services/home_assistance_care" },
];

const Navbar = () => {
    const [location, setLocation] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [locating, setLocating] = useState(false);

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const routeLocation = useLocation();

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
        setServicesOpen(false);
    }, [routeLocation]);

    // Shadow on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setServicesOpen(false);
            }
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                setLocationInput(coords);
                setLocation(coords);
                setLocating(false);
            },
            () => {
                alert("Unable to retrieve location. Please check permissions.");
                setLocating(false);
            }
        );
    };

    const handleSaveLocation = () => {
        setLocation(locationInput);
        setModalOpen(false);
    };

    const isActive = (path) =>
        routeLocation.pathname === path ? "sc-nav__link--active" : "";

    return (
        <>
            {/* ── Navbar ─────────────────────────────────────── */}
            <header className={`sc-nav ${scrolled ? "sc-nav--scrolled" : ""}`}>
                <div className="sc-nav__container">

                    {/* Logo */}
                    <Link className="sc-nav__brand" to="/" aria-label="ServiceCare Home">
                        <img src={careLogo} alt="ServiceCare" className="sc-nav__logo" />
                        <span className="sc-nav__brand-name">ServiceCare</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="sc-nav__links" aria-label="Main navigation">
                        {NAV_LINKS.map(({ label, to }) => (
                            <Link key={to} className={`sc-nav__link ${isActive(to)}`} to={to}>
                                {label}
                            </Link>
                        ))}

                        {/* Services Dropdown */}
                        <div className="sc-nav__dropdown" ref={dropdownRef}>
                            <button
                                className={`sc-nav__link sc-nav__dropdown-trigger ${servicesOpen ? "sc-nav__dropdown-trigger--open" : ""}`}
                                onClick={() => setServicesOpen((v) => !v)}
                                aria-expanded={servicesOpen}
                                aria-haspopup="true"
                            >
                                Services
                                <svg className="sc-nav__chevron" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {servicesOpen && (
                                <ul className="sc-nav__dropdown-menu" role="menu">
                                    {SERVICES.map(({ label, to }) => (
                                        <li key={to} role="none">
                                            <Link
                                                className="sc-nav__dropdown-item"
                                                to={to}
                                                role="menuitem"
                                                onClick={() => setServicesOpen(false)}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="sc-nav__actions">
                        <button
                            className="sc-nav__btn sc-nav__btn--location"
                            onClick={() => setModalOpen(true)}
                            aria-label="Select location"
                            title={location || "Set your location"}
                        >
                            <FaMapMarkerAlt aria-hidden="true" />
                            <span className="sc-nav__btn-label">
                                {location ? location.split(",")[0] : "Location"}
                            </span>
                        </button>

                        <Link className="sc-nav__btn sc-nav__btn--login" to="/login">
                            <FaSignInAlt aria-hidden="true" />
                            <span>Login</span>
                        </Link>

                        <Link className="sc-nav__btn sc-nav__btn--signup" to="/register">
                            <FaUserPlus aria-hidden="true" />
                            <span>Sign Up</span>
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`sc-nav__hamburger ${menuOpen ? "sc-nav__hamburger--open" : ""}`}
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>

            {/* ── Mobile Drawer ───────────────────────────────── */}
            <div
                className={`sc-nav__overlay ${menuOpen ? "sc-nav__overlay--visible" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            <aside className={`sc-nav__drawer ${menuOpen ? "sc-nav__drawer--open" : ""}`} aria-label="Mobile menu">
                <div className="sc-nav__drawer-header">
                    <Link className="sc-nav__brand" to="/" onClick={() => setMenuOpen(false)}>
                        <img src={careLogo} alt="ServiceCare" className="sc-nav__logo" />
                        <span className="sc-nav__brand-name">ServiceCare</span>
                    </Link>
                    <button className="sc-nav__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <FaTimes />
                    </button>
                </div>

                <nav className="sc-nav__drawer-nav">
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            className={`sc-nav__drawer-link ${isActive(to)}`}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}

                    {/* Mobile Services Accordion */}
                    <div className="sc-nav__drawer-accordion">
                        <button
                            className="sc-nav__drawer-link sc-nav__drawer-accordion-trigger"
                            onClick={() => setServicesOpen((v) => !v)}
                            aria-expanded={servicesOpen}
                        >
                            Services
                            <svg className={`sc-nav__chevron ${servicesOpen ? "sc-nav__chevron--up" : ""}`} viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className={`sc-nav__drawer-submenu ${servicesOpen ? "sc-nav__drawer-submenu--open" : ""}`}>
                            {SERVICES.map(({ label, to }) => (
                                <Link
                                    key={to}
                                    className="sc-nav__drawer-sublink"
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="sc-nav__drawer-actions">
                    <button
                        className="sc-nav__btn sc-nav__btn--location sc-nav__btn--full"
                        onClick={() => { setModalOpen(true); setMenuOpen(false); }}
                    >
                        <FaMapMarkerAlt /> {location || "Set Location"}
                    </button>
                    <Link className="sc-nav__btn sc-nav__btn--login sc-nav__btn--full" to="/login" onClick={() => setMenuOpen(false)}>
                        <FaSignInAlt /> Login
                    </Link>
                    <Link className="sc-nav__btn sc-nav__btn--signup sc-nav__btn--full" to="/register" onClick={() => setMenuOpen(false)}>
                        <FaUserPlus /> Sign Up
                    </Link>
                </div>
            </aside>

            {/* ── Location Modal ──────────────────────────────── */}
            {modalOpen && (
                <div className="sc-modal-backdrop" role="dialog" aria-modal="true" aria-label="Select location">
                    <div className="sc-modal" ref={modalRef}>
                        <div className="sc-modal__header">
                            <h5 className="sc-modal__title">
                                <FaMapMarkerAlt className="sc-modal__title-icon" /> Select Your Location
                            </h5>
                            <button className="sc-modal__close" onClick={() => setModalOpen(false)} aria-label="Close modal">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="sc-modal__body">
                            <label htmlFor="sc-location-input" className="sc-modal__label">
                                Enter address or city
                            </label>
                            <input
                                id="sc-location-input"
                                type="text"
                                className="sc-modal__input"
                                placeholder="e.g. Hyderabad, Telangana"
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSaveLocation()}
                            />

                            <button
                                className="sc-modal__geo-btn"
                                onClick={handleCurrentLocation}
                                disabled={locating}
                            >
                                <FaMapMarkerAlt />
                                {locating ? "Detecting…" : "Use Current Location"}
                            </button>
                        </div>

                        <div className="sc-modal__footer">
                            <button className="sc-modal__cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                            <button className="sc-modal__save" onClick={handleSaveLocation}>Save Location</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;