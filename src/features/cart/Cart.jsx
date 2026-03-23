import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "./cartSlice";
import {
    FaArrowLeft, FaTrashAlt, FaShoppingCart,
    FaBaby, FaPaw, FaUserNurse, FaHeartbeat, FaUtensils,
    FaCalendarAlt, FaClock, FaArrowRight
} from "react-icons/fa";
import "../../styleSheets/cart.css";

const serviceTheme = {
    baby: { accent: "#e00950", light: "#ffdce8", mid: "#fff5f8", icon: FaBaby, label: "Baby Care" },
    pet: { accent: "#c49000", light: "#fff4a3", mid: "#fffde7", icon: FaPaw, label: "Pet Care" },
    elder: { accent: "#5e35b1", light: "#e2d9ff", mid: "#f6f2ff", icon: FaUserNurse, label: "Elder Care" },
    pregnancy: { accent: "#1565c0", light: "#bbdefb", mid: "#f5fbff", icon: FaHeartbeat, label: "Pregnancy Care" },
    kitchen: { accent: "#33691e", light: "#dcedc8", mid: "#f1f8e9", icon: FaUtensils, label: "Home Assistance" },
};

const Cart = () => {
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Derive page theme from first item
    const serviceType = cartItems[0]?.serviceType;
    const theme = serviceTheme[serviceType] || serviceTheme.baby;

    return (
        <div
            className="ct-page"
            style={{ backgroundColor: cartItems.length ? theme.mid : "#f4f6fb" }}
        >
            <div className="ct-container">

                {/* ── Header ── */}
                <div className="ct-header">
                    <button className="ct-back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                        <span>Back</span>
                    </button>
                    <div className="ct-header-title">
                        <div
                            className="ct-header-icon"
                            style={{
                                backgroundColor: cartItems.length ? theme.light : "#e8eaf6",
                                color: cartItems.length ? theme.accent : "#5c6bc0",
                            }}
                        >
                            <FaShoppingCart />
                        </div>
                        <div>
                            <p className="ct-eyebrow">Review &amp; Confirm</p>
                            <h1 className="ct-title">Your Cart</h1>
                        </div>
                    </div>
                </div>

                {/* ══ EMPTY STATE ══ */}
                {cartItems.length === 0 ? (
                    <div className="ct-empty">
                        <div className="ct-empty-icon">🛒</div>
                        <h2 className="ct-empty-heading">Your cart is empty</h2>
                        <p className="ct-empty-sub">
                            You haven't added any services yet. Browse our care categories to get started.
                        </p>
                        <button
                            className="ct-browse-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Browse Services <FaArrowRight />
                        </button>
                    </div>
                ) : (

                    /* ══ FILLED STATE ══ */
                    <div className="ct-body">

                        {/* ── Left: cart items ── */}
                        <div className="ct-items-col">
                            <div className="ct-count-label">
                                {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
                            </div>

                            {cartItems.map((item, index) => {
                                const t = serviceTheme[item.serviceType] || serviceTheme.baby;
                                const Icon = t.icon;
                                return (
                                    <div
                                        className="ct-item-card"
                                        key={index}
                                        style={{ "--ct-accent": t.accent, "--ct-light": t.light }}
                                    >
                                        {/* Icon badge */}
                                        <div
                                            className="ct-item-icon"
                                            style={{ backgroundColor: t.light, color: t.accent }}
                                        >
                                            <Icon />
                                        </div>

                                        {/* Info */}
                                        <div className="ct-item-info">
                                            <span className="ct-item-type" style={{ color: t.accent }}>
                                                {t.label}
                                            </span>
                                            <h3 className="ct-item-name">{item.serviceName}</h3>

                                            <div className="ct-item-meta">
                                                {item.bookingDetails?.date && (
                                                    <span className="ct-meta-chip">
                                                        <FaCalendarAlt /> {item.bookingDetails.date}
                                                    </span>
                                                )}
                                                {item.bookingDetails?.time && (
                                                    <span className="ct-meta-chip">
                                                        <FaClock /> {item.bookingDetails.time}
                                                    </span>
                                                )}
                                                {item.bookingDetails?.duration && (
                                                    <span className="ct-meta-chip">
                                                        ⏱ {item.bookingDetails.duration}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price + remove */}
                                        <div className="ct-item-right">
                                            <span className="ct-item-price" style={{ color: t.accent }}>
                                                ₹{item.price}
                                            </span>
                                            <button
                                                className="ct-remove-btn"
                                                onClick={() => dispatch(removeFromCart(item.serviceId))}
                                                title="Remove"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Right: summary ── */}
                        <div className="ct-summary-col">
                            <div className="ct-summary-card">
                                <h2 className="ct-summary-title">Order Summary</h2>

                                <div className="ct-summary-rows">
                                    {cartItems.map((item, i) => (
                                        <div className="ct-summary-row" key={i}>
                                            <span className="ct-summary-row-name">{item.serviceName}</span>
                                            <span className="ct-summary-row-price">₹{item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="ct-summary-total"
                                    style={{ borderColor: theme.light }}
                                >
                                    <span className="ct-total-label">Total</span>
                                    <span className="ct-total-value" style={{ color: theme.accent }}>
                                        ₹{totalAmount}
                                    </span>
                                </div>

                                <button
                                    className="ct-checkout-btn"
                                    style={{ backgroundColor: theme.accent }}
                                    onClick={() => navigate("/dashboard/checkout")}
                                >
                                    Proceed to Checkout <FaArrowRight />
                                </button>

                                <div className="ct-trust" style={{ backgroundColor: theme.light }}>
                                    <span>🛡️</span>
                                    <span className="ct-trust-text">
                                        Verified caregiver. No hidden charges.
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;