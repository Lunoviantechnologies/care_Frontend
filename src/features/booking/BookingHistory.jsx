import { useState } from "react";
import {
    FaBaby, FaPaw, FaUserNurse, FaHeartbeat, FaUtensils,
    FaCalendarAlt, FaClock, FaStar, FaRegStar, FaRedo,
    FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaFilter,
    FaSearch, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import "../../styleSheets/bookingHistory.css";

/* ── Static theme map ── */
const SERVICE_THEME = {
    baby: { accent: "#e00950", light: "#ffdce8", mid: "#fff5f8", icon: FaBaby, label: "Baby Care" },
    pet: { accent: "#c49000", light: "#fff4a3", mid: "#fffde7", icon: FaPaw, label: "Pet Care" },
    elder: { accent: "#5e35b1", light: "#e2d9ff", mid: "#f6f2ff", icon: FaUserNurse, label: "Elder Care" },
    pregnancy: { accent: "#1565c0", light: "#bbdefb", mid: "#f5fbff", icon: FaHeartbeat, label: "Pregnancy Care" },
    kitchen: { accent: "#33691e", light: "#dcedc8", mid: "#f1f8e9", icon: FaUtensils, label: "Home Assistance" },
};

/* ── Mock booking data ── */
const MOCK_BOOKINGS = [
    {
        id: "BK-1021",
        serviceType: "baby",
        serviceName: "Newborn Night Care",
        caregiver: "Sunita Devi",
        date: "2025-03-18",
        time: "08:00",
        duration: "4hr",
        price: 1200,
        status: "completed",
        rating: 5,
        notes: "Excellent care, very attentive.",
    },
    {
        id: "BK-1020",
        serviceType: "pet",
        serviceName: "Dog Walking & Feeding",
        caregiver: "Ramesh Kumar",
        date: "2025-03-14",
        time: "07:30",
        duration: "2hr",
        price: 600,
        status: "completed",
        rating: 4,
        notes: "",
    },
    {
        id: "BK-1019",
        serviceType: "elder",
        serviceName: "Daily Companion Care",
        caregiver: "Meera Pillai",
        date: "2025-03-10",
        time: "10:00",
        duration: "fullDay",
        price: 2200,
        status: "cancelled",
        rating: 0,
        notes: "Had to cancel due to travel.",
    },
    {
        id: "BK-1018",
        serviceType: "pregnancy",
        serviceName: "Prenatal Support",
        caregiver: "Anitha Rao",
        date: "2025-03-05",
        time: "11:00",
        duration: "4hr",
        price: 1500,
        status: "completed",
        rating: 5,
        notes: "Wonderful experience.",
    },
    {
        id: "BK-1017",
        serviceType: "kitchen",
        serviceName: "Meal Prep & Cleaning",
        caregiver: "Lakshmi Naik",
        date: "2025-02-28",
        time: "09:00",
        duration: "4hr",
        price: 900,
        status: "completed",
        rating: 4,
        notes: "",
    },
    {
        id: "BK-1016",
        serviceType: "baby",
        serviceName: "Daytime Baby Assist",
        caregiver: "Priya Venkat",
        date: "2025-02-20",
        time: "10:00",
        duration: "2hr",
        price: 700,
        status: "upcoming",
        rating: 0,
        notes: "",
    },
    {
        id: "BK-1015",
        serviceType: "elder",
        serviceName: "Physiotherapy Support",
        caregiver: "Suresh Bhat",
        date: "2025-02-15",
        time: "14:00",
        duration: "2hr",
        price: 1100,
        status: "completed",
        rating: 3,
        notes: "Decent but could improve.",
    },
];

/* ── Status config ── */
const STATUS_CONFIG = {
    completed: { label: "Completed", icon: FaCheckCircle, color: "#1a8c56", bg: "#e6f9f0" },
    cancelled: { label: "Cancelled", icon: FaTimesCircle, color: "#dc3545", bg: "#fdecea" },
    upcoming: { label: "Upcoming", icon: FaHourglassHalf, color: "#c49000", bg: "#fff8e1" },
};

/* ── Star rating display ── */
const StarRating = ({ rating, accent }) => (
    <div className="bh-stars">
        {[1, 2, 3, 4, 5].map((s) =>
            s <= rating
                ? <FaStar key={s} style={{ color: accent }} />
                : <FaRegStar key={s} style={{ color: "#ccc" }} />
        )}
    </div>
);

/* ── Duration label ── */
const durationLabel = (d) => ({ "2hr": "2 Hours", "4hr": "4 Hours", fullDay: "Full Day" }[d] || d);

/* ══════════════════════════════════════════════════════════ */
const BookingHistory = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState(null);

    const FILTERS = [
        { key: "all", label: "All" },
        { key: "completed", label: "Completed" },
        { key: "upcoming", label: "Upcoming" },
        { key: "cancelled", label: "Cancelled" },
    ];

    const filtered = MOCK_BOOKINGS.filter((b) => {
        const matchStatus = activeFilter === "all" || b.status === activeFilter;
        const matchSearch =
            b.serviceName.toLowerCase().includes(search.toLowerCase()) ||
            b.caregiver.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const stats = {
        total: MOCK_BOOKINGS.length,
        completed: MOCK_BOOKINGS.filter((b) => b.status === "completed").length,
        upcoming: MOCK_BOOKINGS.filter((b) => b.status === "upcoming").length,
        cancelled: MOCK_BOOKINGS.filter((b) => b.status === "cancelled").length,
    };

    const totalSpent = MOCK_BOOKINGS
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + b.price, 0);

    return (
        <div className="bh-page">
            <div className="bh-container">

                {/* ── Page Header ── */}
                <div className="bh-header">
                    <div className="bh-header-left">
                        <p className="bh-eyebrow">Your Activity</p>
                        <h1 className="bh-title">Booking History</h1>
                        <p className="bh-subtitle">Track all your past, upcoming, and cancelled care sessions.</p>
                    </div>
                </div>

                {/* ── Stats strip ── */}
                <div className="bh-stats-strip">
                    {[
                        { label: "Total Bookings", value: stats.total, color: "#4A6CF7" },
                        { label: "Completed", value: stats.completed, color: "#1a8c56" },
                        { label: "Upcoming", value: stats.upcoming, color: "#c49000" },
                        { label: "Total Spent", value: `₹${totalSpent}`, color: "#e00950" },
                    ].map((s, i) => (
                        <div className="bh-stat-card" key={i} style={{ "--bh-stat-color": s.color }}>
                            <span className="bh-stat-value">{s.value}</span>
                            <span className="bh-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Controls: filter tabs + search ── */}
                <div className="bh-controls">

                    {/* Filter pills */}
                    <div className="bh-filter-tabs">
                        <FaFilter className="bh-filter-icon" />
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                className={`bh-filter-tab ${activeFilter === f.key ? "bh-filter-tab--active" : ""}`}
                                onClick={() => setActiveFilter(f.key)}
                            >
                                {f.label}
                                <span className="bh-filter-count">
                                    {f.key === "all"
                                        ? MOCK_BOOKINGS.length
                                        : MOCK_BOOKINGS.filter((b) => b.status === f.key).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="bh-search-wrap">
                        <FaSearch className="bh-search-icon" />
                        <input
                            className="bh-search"
                            type="text"
                            placeholder="Search by service, caregiver, ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                </div>

                {/* ── Booking list ── */}
                {filtered.length === 0 ? (
                    <div className="bh-empty">
                        <div className="bh-empty-icon">📋</div>
                        <h3 className="bh-empty-heading">No bookings found</h3>
                        <p className="bh-empty-sub">Try adjusting the filter or search term.</p>
                    </div>
                ) : (
                    <div className="bh-list">
                        {filtered.map((booking, idx) => {
                            const t = SERVICE_THEME[booking.serviceType] || SERVICE_THEME.baby;
                            const status = STATUS_CONFIG[booking.status];
                            const Icon = t.icon;
                            const SIcon = status.icon;
                            const isOpen = expandedId === booking.id;

                            return (
                                <div
                                    className={`bh-card ${isOpen ? "bh-card--open" : ""}`}
                                    key={booking.id}
                                    style={{
                                        "--bh-accent": t.accent,
                                        "--bh-light": t.light,
                                        animationDelay: `${idx * 0.06}s`,
                                    }}
                                >
                                    {/* ── Card main row ── */}
                                    <div
                                        className="bh-card-main"
                                        onClick={() => setExpandedId(isOpen ? null : booking.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === "Enter" && setExpandedId(isOpen ? null : booking.id)}
                                    >
                                        {/* Timeline dot */}
                                        <div className="bh-timeline-dot" style={{ backgroundColor: t.accent }} />

                                        {/* Service icon */}
                                        <div className="bh-card-icon" style={{ backgroundColor: t.light, color: t.accent }}>
                                            <Icon />
                                        </div>

                                        {/* Core info */}
                                        <div className="bh-card-info">
                                            <div className="bh-card-top-row">
                                                <span className="bh-card-id">{booking.id}</span>
                                                <span
                                                    className="bh-status-badge"
                                                    style={{ backgroundColor: status.bg, color: status.color }}
                                                >
                                                    <SIcon />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <h3 className="bh-card-name">{booking.serviceName}</h3>
                                            <p className="bh-card-type" style={{ color: t.accent }}>{t.label}</p>
                                            <div className="bh-card-meta">
                                                <span className="bh-meta-chip">
                                                    <FaCalendarAlt /> {booking.date}
                                                </span>
                                                <span className="bh-meta-chip">
                                                    <FaClock /> {booking.time}
                                                </span>
                                                <span className="bh-meta-chip">
                                                    ⏱ {durationLabel(booking.duration)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price + expand */}
                                        <div className="bh-card-right">
                                            <span className="bh-card-price" style={{ color: t.accent }}>
                                                ₹{booking.price}
                                            </span>
                                            {booking.status === "completed" && (
                                                <StarRating rating={booking.rating} accent={t.accent} />
                                            )}
                                            <button className="bh-expand-btn" aria-label="toggle details">
                                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* ── Expanded detail panel ── */}
                                    {isOpen && (
                                        <div className="bh-card-detail" style={{ backgroundColor: t.light }}>
                                            <div className="bh-detail-grid">
                                                <div className="bh-detail-item">
                                                    <span className="bh-detail-key">Caregiver</span>
                                                    <span className="bh-detail-val">{booking.caregiver}</span>
                                                </div>
                                                <div className="bh-detail-item">
                                                    <span className="bh-detail-key">Booking ID</span>
                                                    <span className="bh-detail-val">{booking.id}</span>
                                                </div>
                                                <div className="bh-detail-item">
                                                    <span className="bh-detail-key">Duration</span>
                                                    <span className="bh-detail-val">{durationLabel(booking.duration)}</span>
                                                </div>
                                                <div className="bh-detail-item">
                                                    <span className="bh-detail-key">Amount Paid</span>
                                                    <span className="bh-detail-val" style={{ color: t.accent, fontWeight: 700 }}>₹{booking.price}</span>
                                                </div>
                                                {booking.notes && (
                                                    <div className="bh-detail-item bh-detail-item--full">
                                                        <span className="bh-detail-key">Notes</span>
                                                        <span className="bh-detail-val">{booking.notes}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="bh-detail-actions">
                                                {booking.status === "completed" && (
                                                    <button
                                                        className="bh-action-btn bh-action-btn--rebook"
                                                        style={{ backgroundColor: t.accent }}
                                                    >
                                                        <FaRedo /> Rebook
                                                    </button>
                                                )}
                                                {booking.status === "upcoming" && (
                                                    <button className="bh-action-btn bh-action-btn--cancel">
                                                        <FaTimesCircle /> Cancel Booking
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default BookingHistory;