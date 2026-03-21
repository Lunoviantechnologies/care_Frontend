import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaChevronDown, FaTachometerAlt, FaQuestionCircle, FaUser, FaCog, FaGift, FaSignOutAlt,} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import careLogo from "../assets/careLogo.png";
import "../styleSheets/userNavbar.css";

const UserNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);
    const { totalQuantity = 0 } = useSelector((state) => state.cart || []);

    const notificationCount = 3;

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path ? "active" : "";

    // console.log("user redux: ", user);
    console.log("cart total: ", totalQuantity);

    return (
        <>
            <header className="uc-nav" role="banner">
                <div className="uc-nav__container">

                    {/* ── Logo ── */}
                    <Link to="/dashboard" className="uc-nav__brand" aria-label="ServiceCare home">
                        <img src={careLogo} alt="" aria-hidden="true" />
                        <span>ServiceCare</span>
                    </Link>

                    {/* ── Desktop Links ── */}
                    <nav className="uc-nav__links" aria-label="Main navigation">
                        <Link to="/dashboard" className={isActive("/dashboard")}>
                            Dashboard
                        </Link>
                        <Link to="/dashboard/my_bookings" className={isActive("/help")}>
                            My Bookings
                        </Link>
                        <Link to="/dashboard/help" className={isActive("/help")}>
                            Help
                        </Link>
                    </nav>

                    {/* ── Action Icons ── */}
                    <div className="uc-nav__actions" aria-label="User actions">

                        {/* 🔔 Notifications */}
                        <button
                            className="uc-nav__icon-btn"
                            aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ""}`}
                        >
                            <FaBell />
                            {notificationCount > 0 && (
                                <span className="uc-nav__badge" aria-hidden="true">
                                    {notificationCount}
                                </span>
                            )}
                        </button>

                        {/* 🛒 Cart */}
                        <Link
                            to="/dashboard/cart"
                            className="uc-nav__icon-btn"
                            aria-label={`Cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ""}`}
                        >
                            <FaShoppingCart />
                            {totalQuantity > 0 && (
                                <span className="uc-nav__badge" aria-hidden="true">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* ── Divider ── */}
                        <div className="uc-nav__divider" aria-hidden="true" />

                        {/* 👤 Profile */}
                        <div className="uc-nav__profile" ref={dropdownRef}>
                            <button
                                className="uc-nav__profile-trigger"
                                onClick={() => setProfileOpen((o) => !o)}
                                aria-haspopup="true"
                                aria-expanded={profileOpen}
                                aria-label="User profile menu"
                            >
                                <FaUserCircle />
                                <span>{user?.name || user?.user_id || "Account"}</span>
                                <FaChevronDown
                                    className={`uc-nav__chevron${profileOpen ? " uc-nav__chevron--open" : ""}`}
                                />
                            </button>

                            {profileOpen && (
                                <div
                                    className="uc-nav__dropdown"
                                    role="menu"
                                    aria-label="Profile menu"
                                >
                                    <Link
                                        to="/profile"
                                        className="uc-nav__dropdown-item"
                                        role="menuitem"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <FaUser aria-hidden="true" /> Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="uc-nav__dropdown-item"
                                        role="menuitem"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <FaCog aria-hidden="true" /> Settings
                                    </Link>
                                    <Link
                                        to="/rewards"
                                        className="uc-nav__dropdown-item"
                                        role="menuitem"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <FaGift aria-hidden="true" /> Rewards
                                    </Link>

                                    <hr className="uc-nav__dropdown-hr" />

                                    <button
                                        className="uc-nav__dropdown-item uc-nav__dropdown-item--logout"
                                        role="menuitem"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt aria-hidden="true" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Hamburger ── */}
                    <button
                        className="uc-nav__hamburger"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-expanded={menuOpen}
                        aria-controls="sc-mobile-drawer"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>

            {/* ── Mobile Drawer ── */}
            {menuOpen && (
                <nav
                    id="sc-mobile-drawer"
                    className="uc-nav__mobile-drawer"
                    aria-label="Mobile navigation"
                >
                    <Link
                        to="/dashboard"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaTachometerAlt aria-hidden="true" /> Dashboard
                    </Link>
                    <Link
                        to="/help"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaQuestionCircle aria-hidden="true" /> Help
                    </Link>
                    <Link
                        to="/cart"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaShoppingCart aria-hidden="true" /> Cart {totalQuantity > 0 && `(${totalQuantity})`}
                    </Link>

                    <hr className="uc-nav__mobile-hr" />

                    <Link
                        to="/profile"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaUser aria-hidden="true" /> Profile
                    </Link>
                    <Link
                        to="/settings"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaCog aria-hidden="true" /> Settings
                    </Link>
                    <Link
                        to="/rewards"
                        className="uc-nav__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaGift aria-hidden="true" /> Rewards
                    </Link>

                    <hr className="uc-nav__mobile-hr" />

                    <button
                        className="uc-nav__mobile-link uc-nav__mobile-logout"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt aria-hidden="true" /> Logout
                    </button>
                </nav>
            )}
        </>
    );
};

export default UserNavbar;