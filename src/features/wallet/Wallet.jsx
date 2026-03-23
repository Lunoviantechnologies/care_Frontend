import { useState } from "react";
import {
    FaWallet, FaPlus, FaArrowUp, FaArrowDown,
    FaCheckCircle, FaTimesCircle, FaClock,
    FaUniversity, FaMobileAlt, FaCreditCard,
    FaShieldAlt, FaBolt, FaGift,
} from "react-icons/fa";
import "../../styleSheets/wallet.css";

/* ── Mock transaction history ── */
const TRANSACTIONS = [
    { id: "TXN-1041", type: "debit", label: "Baby Care Session", amount: 1200, date: "2025-03-18", status: "success", method: "Wallet" },
    { id: "TXN-1040", type: "credit", label: "Wallet Top-up", amount: 2000, date: "2025-03-15", status: "success", method: "UPI" },
    { id: "TXN-1039", type: "debit", label: "Pet Care Session", amount: 600, date: "2025-03-14", status: "success", method: "Wallet" },
    { id: "TXN-1038", type: "credit", label: "Wallet Top-up", amount: 1000, date: "2025-03-10", status: "success", method: "Card" },
    { id: "TXN-1037", type: "debit", label: "Elder Care Session", amount: 2200, date: "2025-03-08", status: "failed", method: "Wallet" },
    { id: "TXN-1036", type: "credit", label: "Referral Bonus", amount: 150, date: "2025-03-05", status: "success", method: "Bonus" },
    { id: "TXN-1035", type: "debit", label: "Home Assistance", amount: 900, date: "2025-02-28", status: "success", method: "Wallet" },
    { id: "TXN-1034", type: "credit", label: "Wallet Top-up", amount: 3000, date: "2025-02-20", status: "pending", method: "Net Banking" },
];

/* ── Quick top-up amounts ── */
const QUICK_AMOUNTS = [200, 500, 1000, 2000, 5000];

/* ── Payment methods ── */
const PAY_METHODS = [
    { key: "upi", label: "UPI", icon: FaMobileAlt },
    { key: "card", label: "Card", icon: FaCreditCard },
    { key: "netbank", label: "Net Banking", icon: FaUniversity },
];

const STATUS_CONFIG = {
    success: { icon: FaCheckCircle, color: "#1a8c56", bg: "#e6f9f0", label: "Success" },
    failed: { icon: FaTimesCircle, color: "#dc3545", bg: "#fdecea", label: "Failed" },
    pending: { icon: FaClock, color: "#c49000", bg: "#fff8e1", label: "Pending" },
};

const Wallet = () => {
    const [balance, setBalance] = useState(3450);
    const [customAmount, setCustomAmount] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState("upi");
    const [topupSuccess, setTopupSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [transactions, setTransactions] = useState(TRANSACTIONS);

    /* ── Effective top-up amount ── */
    const effectiveAmount = customAmount
        ? parseInt(customAmount, 10)
        : selectedAmount;

    const handleQuickSelect = (amt) => {
        setSelectedAmount(amt);
        setCustomAmount("");
    };

    const handleCustomChange = (e) => {
        setCustomAmount(e.target.value.replace(/\D/g, ""));
        setSelectedAmount(null);
    };

    const handleTopUp = () => {
        if (!effectiveAmount || effectiveAmount < 10) return;
        setLoading(true);
        setTimeout(() => {
            const newTxn = {
                id: `TXN-${Date.now()}`,
                type: "credit",
                label: "Wallet Top-up",
                amount: effectiveAmount,
                date: new Date().toISOString().split("T")[0],
                status: "success",
                method: PAY_METHODS.find(m => m.key === selectedMethod)?.label || "UPI",
            };
            setBalance((b) => b + effectiveAmount);
            setTransactions((t) => [newTxn, ...t]);
            setLoading(false);
            setTopupSuccess(true);
            setCustomAmount("");
            setSelectedAmount(null);
            setTimeout(() => setTopupSuccess(false), 3500);
        }, 1600);
    };

    /* ── Filtered transactions ── */
    const filtered = transactions.filter((t) => {
        if (filter === "all") return true;
        return t.type === filter;
    });

    const totalCredit = transactions.filter(t => t.type === "credit" && t.status === "success").reduce((s, t) => s + t.amount, 0);
    const totalDebit = transactions.filter(t => t.type === "debit" && t.status === "success").reduce((s, t) => s + t.amount, 0);

    return (
        <div className="wl-page">
            <div className="wl-blob wl-blob--1" aria-hidden="true" />
            <div className="wl-blob wl-blob--2" aria-hidden="true" />

            <div className="wl-container">

                {/* ══ HERO BALANCE CARD ══ */}
                <div className="wl-balance-card">
                    {/* decorative rings */}
                    <div className="wl-ring wl-ring--1" aria-hidden="true" />
                    <div className="wl-ring wl-ring--2" aria-hidden="true" />

                    <div className="wl-balance-left">
                        <p className="wl-balance-eyebrow">
                            <FaWallet /> Care Wallet
                        </p>
                        <div className="wl-balance-amount">
                            <span className="wl-balance-currency">₹</span>
                            <span className="wl-balance-number">
                                {balance.toLocaleString("en-IN")}
                            </span>
                        </div>
                        <p className="wl-balance-sub">Available Balance</p>
                    </div>

                    <div className="wl-balance-right">
                        <div className="wl-mini-stat">
                            <FaArrowDown className="wl-mini-icon wl-mini-icon--credit" />
                            <div>
                                <span className="wl-mini-val">₹{totalCredit.toLocaleString("en-IN")}</span>
                                <span className="wl-mini-label">Total Added</span>
                            </div>
                        </div>
                        <div className="wl-mini-stat">
                            <FaArrowUp className="wl-mini-icon wl-mini-icon--debit" />
                            <div>
                                <span className="wl-mini-val">₹{totalDebit.toLocaleString("en-IN")}</span>
                                <span className="wl-mini-label">Total Spent</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══ BODY GRID ══ */}
                <div className="wl-body">

                    {/* ── LEFT: Top-up panel ── */}
                    <div className="wl-topup-col">
                        <div className="wl-card">

                            <div className="wl-card-head">
                                <FaPlus className="wl-card-head-icon" />
                                <div>
                                    <h2 className="wl-card-title">Add Money</h2>
                                    <p className="wl-card-sub">Top up your wallet instantly</p>
                                </div>
                            </div>

                            {/* Quick amount pills */}
                            <div className="wl-section-label">Select Amount</div>
                            <div className="wl-quick-grid">
                                {QUICK_AMOUNTS.map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        className={`wl-quick-btn ${selectedAmount === amt && !customAmount ? "wl-quick-btn--active" : ""}`}
                                        onClick={() => handleQuickSelect(amt)}
                                    >
                                        ₹{amt.toLocaleString("en-IN")}
                                    </button>
                                ))}
                            </div>

                            {/* Custom amount input */}
                            <div className="wl-section-label" style={{ marginTop: 18 }}>Or Enter Custom Amount</div>
                            <div className="wl-input-wrap">
                                <span className="wl-input-prefix">₹</span>
                                <input
                                    className="wl-input"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="e.g. 750"
                                    value={customAmount}
                                    onChange={handleCustomChange}
                                    maxLength={6}
                                />
                            </div>

                            {/* Perks */}
                            <div className="wl-perks">
                                <div className="wl-perk">
                                    <FaBolt className="wl-perk-icon" style={{ color: "#c49000" }} />
                                    <span>Instant credit to wallet</span>
                                </div>
                                <div className="wl-perk">
                                    <FaShieldAlt className="wl-perk-icon" style={{ color: "#4A6CF7" }} />
                                    <span>100% secure payments</span>
                                </div>
                                <div className="wl-perk">
                                    <FaGift className="wl-perk-icon" style={{ color: "#e00950" }} />
                                    <span>No transaction fees</span>
                                </div>
                            </div>

                            {/* Payment method selector */}
                            <div className="wl-section-label" style={{ marginTop: 18 }}>Payment Method</div>
                            <div className="wl-methods">
                                {PAY_METHODS.map(({ key, label, icon: Icon }) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`wl-method-btn ${selectedMethod === key ? "wl-method-btn--active" : ""}`}
                                        onClick={() => setSelectedMethod(key)}
                                    >
                                        <Icon />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Top-up button */}
                            <button
                                type="button"
                                className={`wl-topup-btn ${loading ? "wl-topup-btn--loading" : ""} ${!effectiveAmount || effectiveAmount < 10 ? "wl-topup-btn--disabled" : ""}`}
                                onClick={handleTopUp}
                                disabled={loading || !effectiveAmount || effectiveAmount < 10}
                            >
                                {loading ? (
                                    <span className="wl-spinner" />
                                ) : (
                                    <>
                                        <FaPlus />
                                        Add {effectiveAmount ? `₹${Number(effectiveAmount).toLocaleString("en-IN")}` : "Money"}
                                    </>
                                )}
                            </button>

                            {/* Success toast */}
                            {topupSuccess && (
                                <div className="wl-success-toast">
                                    <FaCheckCircle />
                                    Wallet topped up successfully!
                                </div>
                            )}

                        </div>
                    </div>

                    {/* ── RIGHT: Transaction history ── */}
                    <div className="wl-txn-col">
                        <div className="wl-card">

                            <div className="wl-card-head">
                                <div className="wl-txn-head-icon">📋</div>
                                <div>
                                    <h2 className="wl-card-title">Transaction History</h2>
                                    <p className="wl-card-sub">{transactions.length} transactions</p>
                                </div>
                            </div>

                            {/* Filter tabs */}
                            <div className="wl-filter-tabs">
                                {["all", "credit", "debit"].map((f) => (
                                    <button
                                        key={f}
                                        type="button"
                                        className={`wl-filter-tab ${filter === f ? "wl-filter-tab--active" : ""}`}
                                        onClick={() => setFilter(f)}
                                    >
                                        {f === "all" ? "All" : f === "credit" ? "Added" : "Spent"}
                                        <span className="wl-filter-count">
                                            {f === "all"
                                                ? transactions.length
                                                : transactions.filter(t => t.type === f).length}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Transaction list */}
                            <div className="wl-txn-list">
                                {filtered.length === 0 ? (
                                    <div className="wl-txn-empty">
                                        <span>🔍</span>
                                        <p>No transactions found.</p>
                                    </div>
                                ) : (
                                    filtered.map((txn, idx) => {
                                        const s = STATUS_CONFIG[txn.status];
                                        const SIcon = s.icon;
                                        return (
                                            <div
                                                className="wl-txn-row"
                                                key={txn.id}
                                                style={{ animationDelay: `${idx * 0.04}s` }}
                                            >
                                                {/* Direction icon */}
                                                <div
                                                    className={`wl-txn-dir ${txn.type === "credit" ? "wl-txn-dir--credit" : "wl-txn-dir--debit"}`}
                                                >
                                                    {txn.type === "credit" ? <FaArrowDown /> : <FaArrowUp />}
                                                </div>

                                                {/* Info */}
                                                <div className="wl-txn-info">
                                                    <span className="wl-txn-label">{txn.label}</span>
                                                    <div className="wl-txn-meta">
                                                        <span>{txn.date}</span>
                                                        <span className="wl-txn-dot">·</span>
                                                        <span>{txn.method}</span>
                                                        <span className="wl-txn-dot">·</span>
                                                        <span>{txn.id}</span>
                                                    </div>
                                                </div>

                                                {/* Amount + status */}
                                                <div className="wl-txn-right">
                                                    <span
                                                        className={`wl-txn-amount ${txn.type === "credit" ? "wl-txn-amount--credit" : "wl-txn-amount--debit"}`}
                                                    >
                                                        {txn.type === "credit" ? "+" : "−"}₹{txn.amount.toLocaleString("en-IN")}
                                                    </span>
                                                    <span
                                                        className="wl-txn-status"
                                                        style={{ backgroundColor: s.bg, color: s.color }}
                                                    >
                                                        <SIcon />
                                                        {s.label}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Wallet;