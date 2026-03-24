import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../cart/cartSlice";
import { useState } from "react";
import { FaArrowLeft, FaTrashAlt, FaBaby, FaPaw, FaUserNurse, FaHeartbeat, FaUtensils } from "react-icons/fa";
import "../../styleSheets/bookingForm.css";
import { setBookingDetails } from "./bookingSlice";
import { toast } from "react-toastify";

const BookingForm = () => {

    const themeMap = {
        baby: {
            pageBg: "#ffe4ec",
            accent: "#e00950",
            accentLight: "#ffdce8",
            accentMid: "#f9d7e2",
            icon: FaBaby,
            label: "Baby Care",
        },
        pet: {
            pageBg: "#fff9c4",
            accent: "#c49000",
            accentLight: "#fff4a3",
            accentMid: "#fff3a0",
            icon: FaPaw,
            label: "Pet Care",
        },
        elder: {
            pageBg: "#ede7f6",
            accent: "#5e35b1",
            accentLight: "#e2d9ff",
            accentMid: "#ddd2ff",
            icon: FaUserNurse,
            label: "Elder Care",
        },
        pregnancy: {
            pageBg: "#e3f2fd",
            accent: "#1565c0",
            accentLight: "#bbdefb",
            accentMid: "#e3f2fd",
            icon: FaHeartbeat,
            label: "Pregnancy Care",
        },
        kitchen: {
            pageBg: "#f1f8e9",
            accent: "#33691e",
            accentLight: "#dcedc8",
            accentMid: "#e8f5e9",
            icon: FaUtensils,
            label: "Home Assistance",
        },
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bookingDetails } = useSelector((state) => state.booking);
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { serviceType } = useSelector((state) => state.booking);
    const theme = themeMap[serviceType] || themeMap.baby;
    const ServiceIcon = theme.icon;

    const [formData, setFormData] = useState(bookingDetails);

    if (cartItems.length === 0) {
        navigate("/");
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckbox = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.acceptPolicy) {
            toast.error("Please accept the service policy before continuing.");
            return;
        }
        // cartItems.forEach((service) => {
        //     dispatch(updateBookingDetails({ serviceId: service.serviceId, bookingDetails: formData }));
        // });
        dispatch(setBookingDetails(formData));
        navigate("/dashboard/checkout");
    };

    return (
        <div className="bf-page" style={{ backgroundColor: theme.pageBg }}>
            <div className="bf-container">

                {/* ── Header ── */}
                <div className="bf-header">
                    <button className="bf-back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                        <span>Back</span>
                    </button>
                    <div className="bf-header-title">
                        <div className="bf-header-icon" style={{ backgroundColor: theme.accentLight, color: theme.accent }}>
                            <ServiceIcon />
                        </div>
                        <div>
                            <p className="bf-header-eyebrow">Book a Session</p>
                            <h1 className="bf-header-name">{theme.label}</h1>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="bf-body">

                    {/* ══ LEFT — Form ══ */}
                    <div className="bf-form-col">
                        <div className="bf-card">

                            <div className="bf-card-heading">
                                <h2 className="bf-card-title">Booking Details</h2>
                                <p className="bf-card-sub">Fill in the details below to confirm your booking.</p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>

                                {/* Name */}
                                <div className="bf-field">
                                    <label className="bf-label">Full Name</label>
                                    <input
                                        className="bf-input"
                                        name="name"
                                        value={formData.name}
                                        placeholder="e.g. Priya Sharma"
                                        onChange={handleChange}
                                        required
                                        style={{ "--bf-focus": theme.accent }}
                                    />
                                </div>

                                {/* Date + Time */}
                                <div className="bf-field-row">
                                    <div className="bf-field">
                                        <label className="bf-label">Date</label>
                                        <input
                                            type="date"
                                            className="bf-input"
                                            name="date"
                                            value={formData.date}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={handleChange}
                                            required
                                            style={{ "--bf-focus": theme.accent }}
                                        />
                                    </div>
                                    <div className="bf-field">
                                        <label className="bf-label">Time</label>
                                        <input
                                            type="time"
                                            className="bf-input"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            style={{ "--bf-focus": theme.accent }}
                                        />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="bf-field">
                                    <label className="bf-label">Service Duration</label>
                                    <select
                                        className="bf-input bf-select"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                        style={{ "--bf-focus": theme.accent }}
                                    >
                                        <option value="">Select Duration</option>
                                        <option value="2hr">2 Hours</option>
                                        <option value="4hr">4 Hours</option>
                                        <option value="6hr">6 Hours</option>
                                        <option value="8hr">8 Hours</option>
                                        <option value="fullDay">Full Day</option>
                                    </select>
                                </div>

                                {/* Service-specific fields */}
                                {serviceType === "baby" && (
                                    <div className="bf-service-fields" style={{ backgroundColor: theme.accentMid }}>
                                        <p className="bf-service-fields-title" style={{ color: theme.accent }}>🍼 Baby Care Details</p>
                                        <div className="bf-field">
                                            <label className="bf-label">Allergies / Special Instructions</label>
                                            <textarea
                                                className="bf-input bf-textarea"
                                                name="allergies"
                                                value={formData.allergies}
                                                rows="2"
                                                placeholder="Any known allergies or special care notes..."
                                                onChange={handleChange}
                                                style={{ "--bf-focus": theme.accent }}
                                            />
                                        </div>
                                        <label className="bf-check-item">
                                            <input type="checkbox" name="guardianPresent" checked={formData.guardianPresent} className="bf-check-input" onChange={handleCheckbox} required />
                                            <span className="bf-check-box" style={{ "--bf-chk": theme.accent }} />
                                            <span className="bf-check-text">Guardian will be present during the session</span>
                                        </label>
                                    </div>
                                )}

                                {serviceType === "elder" && (
                                    <div className="bf-service-fields" style={{ backgroundColor: theme.accentMid }}>
                                        <p className="bf-service-fields-title" style={{ color: theme.accent }}>🧓 Elder Care Details</p>
                                        <div className="bf-field">
                                            <label className="bf-label">Medical History</label>
                                            <textarea
                                                className="bf-input bf-textarea"
                                                name="medicalHistory"
                                                value={formData.medicalHistory}
                                                rows="2"
                                                placeholder="Relevant conditions, medications..."
                                                onChange={handleChange}
                                                style={{ "--bf-focus": theme.accent }}
                                            />
                                        </div>
                                        <label className="bf-check-item">
                                            <input type="checkbox" name="walkerAvailable" checked={formData.walkerAvailable} className="bf-check-input" onChange={handleCheckbox} />
                                            <span className="bf-check-box" style={{ "--bf-chk": theme.accent }} />
                                            <span className="bf-check-text">Walker / Wheelchair available at home</span>
                                        </label>
                                    </div>
                                )}

                                {serviceType === "pet" && (
                                    <div className="bf-service-fields" style={{ backgroundColor: theme.accentMid }}>
                                        <p className="bf-service-fields-title" style={{ color: theme.accent }}>🐾 Pet Details</p>
                                        <div className="bf-field">
                                            <label className="bf-label">Pet Behavior</label>
                                            <input
                                                className="bf-input"
                                                name="petBehavior"
                                                value={formData.petBehavior}
                                                placeholder="Friendly / Aggressive / Shy"
                                                onChange={handleChange}
                                                style={{ "--bf-focus": theme.accent }}
                                            />
                                        </div>
                                        <label className="bf-check-item">
                                            <input type="checkbox" name="vaccinationConfirmed" checked={formData.vaccinationConfirmed} className="bf-check-input" onChange={handleCheckbox} required />
                                            <span className="bf-check-box" style={{ "--bf-chk": theme.accent }} />
                                            <span className="bf-check-text">Pet vaccination is up to date</span>
                                        </label>
                                    </div>
                                )}

                                {/* Notes */}
                                <div className="bf-field">
                                    <label className="bf-label">Additional Notes <span className="bf-optional">(optional)</span></label>
                                    <textarea
                                        className="bf-input bf-textarea"
                                        name="notes"
                                        value={formData.notes}
                                        rows="3"
                                        placeholder="Any other instructions for the caregiver..."
                                        onChange={handleChange}
                                        style={{ "--bf-focus": theme.accent }}
                                    />
                                </div>

                                {/* Policy acceptance */}
                                <label className="bf-check-item bf-policy-check">
                                    <input type="checkbox" name="acceptPolicy" checked={formData.acceptPolicy} className="bf-check-input" onChange={handleCheckbox} required />
                                    <span className="bf-check-box" style={{ "--bf-chk": theme.accent }} />
                                    <span className="bf-check-text">I agree to the service limitations and responsibilities</span>
                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="bf-submit-btn"
                                    style={{ backgroundColor: theme.accent }}
                                >
                                    Continue to Checkout →
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* ══ RIGHT — Order Summary ══ */}
                    <div className="bf-summary-col">
                        <div className="bf-card bf-summary-card">

                            <div className="bf-card-heading">
                                <h2 className="bf-card-title">Order Summary</h2>
                                <p className="bf-card-sub">{cartItems.length} service{cartItems.length > 1 ? "s" : ""} selected</p>
                            </div>

                            <div className="bf-summary-list">
                                {cartItems.map((item) => (
                                    <div className="bf-summary-item" key={item.serviceId}>
                                        <div className="bf-summary-item-dot" style={{ backgroundColor: theme.accent }} />
                                        <div className="bf-summary-item-info">
                                            <span className="bf-summary-item-name">{item.serviceName}</span>
                                            <span className="bf-summary-item-qty">Qty: {item.quantity}</span>
                                        </div>
                                        <div className="bf-summary-item-right">
                                            <span className="bf-summary-item-price">₹{item.price}</span>
                                            <button
                                                className="bf-remove-btn"
                                                onClick={() => dispatch(removeFromCart(item.serviceId))}
                                                title="Remove"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bf-summary-total" style={{ borderColor: theme.accentLight }}>
                                <span className="bf-total-label">Total</span>
                                <span className="bf-total-value" style={{ color: theme.accent }}>₹{totalAmount}</span>
                            </div>

                            {/* Trust badge */}
                            <div className="bf-trust-badge" style={{ backgroundColor: theme.accentLight }}>
                                <span className="bf-trust-icon">🛡️</span>
                                <p className="bf-trust-text">Verified caregiver assigned within 2 hours of booking.</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingForm;