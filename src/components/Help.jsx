import { useState } from "react";
import {
    FaHeadset, FaEnvelope, FaPhoneAlt, FaWhatsapp,
    FaCheckCircle, FaPaperPlane, FaChevronDown, FaChevronUp,
    FaExclamationCircle, FaClock, FaShieldAlt, FaCommentDots
} from "react-icons/fa";
import "../styleSheets/help.css";

/* ── FAQ data ── */
const FAQS = [
    {
        q: "How do I book a caregiver?",
        a: "Go to the Dashboard, choose your service type (Baby Care, Pet Care, etc.), select the services you need, fill in your booking details, and proceed to checkout. It takes less than 3 minutes."
    },
    {
        q: "Can I reschedule or cancel a booking?",
        a: "Yes. Go to Booking History, find your upcoming booking, expand it, and click 'Cancel Booking'. For rescheduling, cancel and create a new booking. Cancellations made 12+ hours in advance are free of charge."
    },
    {
        q: "How are caregivers verified?",
        a: "Every caregiver on our platform undergoes identity verification, document checks, background screening, and a personal interview before being listed. You'll see a 'Verified' badge on their profiles."
    },
    {
        q: "What payment methods are accepted?",
        a: "We accept UPI, credit/debit cards, net banking, and cash on delivery (pay after service). All online payments are encrypted and processed securely."
    },
    {
        q: "Is there a minimum booking duration?",
        a: "The minimum booking duration is 2 hours. You can also book for 4 hours or a full day depending on your needs."
    },
    {
        q: "What if I'm unhappy with the service?",
        a: "Your satisfaction is our priority. If you're unhappy, contact our support team within 24 hours of the session. We will investigate and offer a resolution — including a refund if warranted."
    },
];

/* ── Issue categories ── */
const CATEGORIES = [
    "Select a category",
    "Booking Issue",
    "Payment Problem",
    "Caregiver Concern",
    "Account / Login",
    "Refund Request",
    "Technical Bug",
    "Other",
];

/* ── Support channels ── */
const CHANNELS = [
    {
        icon: FaPhoneAlt,
        title: "Call Us",
        detail: "+91 1800-XXX-XXXX",
        sub: "Mon–Sat, 8 AM – 8 PM",
        color: "#4A6CF7",
        bg: "#E4EAFF",
    },
    {
        icon: FaWhatsapp,
        title: "WhatsApp",
        detail: "+91 98765 43210",
        sub: "Quick replies in minutes",
        color: "#25D366",
        bg: "#E6F9EE",
    },
    {
        icon: FaEnvelope,
        title: "Email Support",
        detail: "support@careapp.in",
        sub: "Response within 24 hours",
        color: "#e00950",
        bg: "#ffdce8",
    },
];

const Help = () => {
    const [form, setForm] = useState({ name: "", email: "", category: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    /* ── Validation ── */
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
        if (!form.category || form.category === CATEGORIES[0]) e.category = "Please select a category.";
        if (!form.message.trim()) e.message = "Message is required.";
        else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
        return e;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setForm({ name: "", email: "", category: "", message: "" });
        }, 1400);
    };

    const handleReset = () => {
        setSubmitted(false);
        setErrors({});
    };

    return (
        <div className="hp-page">
            {/* Background blobs */}
            <div className="hp-blob hp-blob--1" aria-hidden="true" />
            <div className="hp-blob hp-blob--2" aria-hidden="true" />

            <div className="hp-container">

                {/* ══ HERO ══ */}
                <div className="hp-hero">
                    <div className="hp-hero-icon"><FaHeadset /></div>
                    <div>
                        <p className="hp-eyebrow">Support Centre</p>
                        <h1 className="hp-title">How can we help you?</h1>
                        <p className="hp-subtitle">
                            Browse FAQs, reach out via the form, or contact us directly. We're here for you.
                        </p>
                    </div>
                </div>

                {/* ══ SUPPORT CHANNELS ══ */}
                <div className="hp-channels">
                    {CHANNELS.map((ch, i) => {
                        const Icon = ch.icon;
                        return (
                            <div
                                className="hp-channel-card"
                                key={i}
                                style={{ "--hp-ch-color": ch.color, "--hp-ch-bg": ch.bg }}
                            >
                                <div className="hp-ch-icon-wrap">
                                    <Icon />
                                </div>
                                <div className="hp-ch-info">
                                    <span className="hp-ch-title">{ch.title}</span>
                                    <span className="hp-ch-detail">{ch.detail}</span>
                                    <span className="hp-ch-sub">
                                        <FaClock className="hp-ch-clock" /> {ch.sub}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ══ BODY: Form + FAQ ══ */}
                <div className="hp-body">

                    {/* ── LEFT: Contact form ── */}
                    <div className="hp-form-col">
                        <div className="hp-card">

                            <div className="hp-card-head">
                                <FaCommentDots className="hp-card-head-icon" />
                                <div>
                                    <h2 className="hp-card-title">Send us a Message</h2>
                                    <p className="hp-card-sub">Fill in the form and we'll get back to you shortly.</p>
                                </div>
                            </div>

                            {/* ── Success state ── */}
                            {submitted ? (
                                <div className="hp-success">
                                    <div className="hp-success-icon"><FaCheckCircle /></div>
                                    <h3 className="hp-success-heading">Message Sent!</h3>
                                    <p className="hp-success-text">
                                        Thanks for reaching out. Our team will respond to your email within 24 hours.
                                    </p>
                                    <button className="hp-reset-btn" onClick={handleReset}>
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Name + Email row */}
                                    <div className="hp-field-row">
                                        <div className="hp-field">
                                            <label className="hp-label">Full Name</label>
                                            <input
                                                className={`hp-input ${errors.name ? "hp-input--error" : ""}`}
                                                name="name"
                                                type="text"
                                                placeholder="e.g. Priya Sharma"
                                                value={form.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && (
                                                <span className="hp-error">
                                                    <FaExclamationCircle /> {errors.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="hp-field">
                                            <label className="hp-label">Email Address</label>
                                            <input
                                                className={`hp-input ${errors.email ? "hp-input--error" : ""}`}
                                                name="email"
                                                type="email"
                                                placeholder="e.g. priya@email.com"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && (
                                                <span className="hp-error">
                                                    <FaExclamationCircle /> {errors.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="hp-field">
                                        <label className="hp-label">Issue Category</label>
                                        <select
                                            className={`hp-input hp-select ${errors.category ? "hp-input--error" : ""}`}
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                        >
                                            {CATEGORIES.map((c, i) => (
                                                <option key={i} value={i === 0 ? "" : c} disabled={i === 0}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <span className="hp-error">
                                                <FaExclamationCircle /> {errors.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="hp-field">
                                        <label className="hp-label">
                                            Your Message
                                            <span className="hp-char-count">{form.message.length} / 500</span>
                                        </label>
                                        <textarea
                                            className={`hp-input hp-textarea ${errors.message ? "hp-input--error" : ""}`}
                                            name="message"
                                            placeholder="Describe your issue in detail..."
                                            value={form.message}
                                            onChange={handleChange}
                                            maxLength={500}
                                            rows={5}
                                        />
                                        {errors.message && (
                                            <span className="hp-error">
                                                <FaExclamationCircle /> {errors.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        className={`hp-submit-btn ${loading ? "hp-submit-btn--loading" : ""}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="hp-spinner" />
                                        ) : (
                                            <><FaPaperPlane /> Send Message</>
                                        )}
                                    </button>

                                    {/* Trust note */}
                                    <p className="hp-trust-note">
                                        <FaShieldAlt /> We never share your information with third parties.
                                    </p>

                                </form>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: FAQ accordion ── */}
                    <div className="hp-faq-col">
                        <div className="hp-card">

                            <div className="hp-card-head">
                                <div className="hp-faq-head-icon">💡</div>
                                <div>
                                    <h2 className="hp-card-title">Frequently Asked</h2>
                                    <p className="hp-card-sub">Quick answers to common questions.</p>
                                </div>
                            </div>

                            <div className="hp-faq-list">
                                {FAQS.map((faq, i) => {
                                    const isOpen = openFaq === i;
                                    return (
                                        <div
                                            className={`hp-faq-item ${isOpen ? "hp-faq-item--open" : ""}`}
                                            key={i}
                                        >
                                            <button
                                                className="hp-faq-q"
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                aria-expanded={isOpen}
                                            >
                                                <span>{faq.q}</span>
                                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                            {isOpen && (
                                                <div className="hp-faq-a">{faq.a}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Help;