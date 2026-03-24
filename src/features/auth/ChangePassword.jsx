import React, { useState } from "react";
import "../../styleSheets/changePassword.css";

// ─── Icons ────────────────────────────────────────────────────
const EyeIcon = ({ open }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {open ? (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </>
        ) : (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        )}
    </svg>
);

const LockIcon = () => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6382FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

// ─── Helpers ──────────────────────────────────────────────────
function getStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return 1;
    if (score === 2) return 2;
    if (score === 3) return 3;
    return 4;
}

const STRENGTH_META = [
    { label: "Weak", cls: "cp-strength-weak", segCls: "cp-seg-weak" },
    { label: "Fair", cls: "cp-strength-fair", segCls: "cp-seg-fair" },
    { label: "Good", cls: "cp-strength-good", segCls: "cp-seg-good" },
    { label: "Strong", cls: "cp-strength-strong", segCls: "cp-seg-strong" },
];

const REQUIREMENTS = [
    { id: "len", label: "8+ characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "Uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { id: "num", label: "Number", test: (v) => /\d/.test(v) },
    { id: "sym", label: "Special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

// ─── Component ────────────────────────────────────────────────
const ChangePassword = () => {
    const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
    const [show, setShow] = useState({ current: false, newPw: false, confirm: false });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const strength = getStrength(form.newPw);

    // Validate all fields, return error map
    const validate = () => {
        const e = {};
        if (!form.current) {
            e.current = "Current password is required";
        }
        if (!form.newPw) {
            e.newPw = "New password is required";
        } else if (form.newPw.length < 8) {
            e.newPw = "Must be at least 8 characters";
        } else if (form.newPw === form.current) {
            e.newPw = "Must differ from your current password";
        }
        if (!form.confirm) {
            e.confirm = "Please confirm your new password";
        } else if (form.confirm !== form.newPw) {
            e.confirm = "Passwords do not match";
        }
        return e;
    };

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setSuccess(false);
        if (touched[field]) {
            // Re-validate the changed field live after first blur
            const updated = { ...form, [field]: e.target.value };
            const freshErrors = validateField(field, updated);
            setErrors((prev) => ({ ...prev, [field]: freshErrors }));
        }
    };

    const validateField = (field, values) => {
        const all = validate();
        // Merge current form with updated values to validate correctly
        return all[field];
    };

    const handleBlur = (field) => () => {
        setTouched((t) => ({ ...t, [field]: true }));
        const e = validate();
        setErrors((prev) => ({ ...prev, [field]: e[field] }));
    };

    const handleSubmit = async () => {
        // Mark all touched
        setTouched({ current: true, newPw: true, confirm: true });
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        setLoading(true);
        // Simulate API call
        await new Promise((res) => setTimeout(res, 1600));
        setLoading(false);
        setSuccess(true);
        setForm({ current: "", newPw: "", confirm: "" });
        setTouched({});
        setErrors({});
    };

    const toggleShow = (field) =>
        setShow((s) => ({ ...s, [field]: !s[field] }));

    const isDisabled = loading || !form.current || !form.newPw || !form.confirm;

    const inputClass = (field) => {
        let cls = "cp-input";
        if (errors[field] && touched[field]) cls += " cp-input-error";
        else if (!errors[field] && touched[field] && form[field]) cls += " cp-input-success";
        return cls;
    };

    return (
        <div className="cp-root">
            <div className="cp-card">

                {/* Header */}
                <div className="cp-header">
                    <div className="cp-icon-wrap">
                        <LockIcon />
                    </div>
                    <h1 className="cp-title">Change Password</h1>
                    <p className="cp-subtitle">Keep your account secure with a strong, unique password</p>
                </div>

                {/* Success Banner */}
                {success && (
                    <div className="cp-success-banner">
                        <CheckCircleIcon />
                        Password updated successfully!
                    </div>
                )}

                <div className="cp-form">

                    {/* Current Password */}
                    <div className="cp-field">
                        <label className="cp-label">Current Password</label>
                        <div className="cp-input-wrap">
                            <input
                                className={inputClass("current")}
                                type={show.current ? "text" : "password"}
                                placeholder="Enter your current password"
                                value={form.current}
                                onChange={handleChange("current")}
                                onBlur={handleBlur("current")}
                                autoComplete="current-password"
                            />
                            <button
                                className="cp-eye-btn"
                                type="button"
                                onClick={() => toggleShow("current")}
                                aria-label={show.current ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={show.current} />
                            </button>
                        </div>
                        {errors.current && touched.current && (
                            <span className="cp-field-error">⚠ {errors.current}</span>
                        )}
                    </div>

                    <div className="cp-divider" />

                    {/* New Password */}
                    <div className="cp-field">
                        <label className="cp-label">New Password</label>
                        <div className="cp-input-wrap">
                            <input
                                className={inputClass("newPw")}
                                type={show.newPw ? "text" : "password"}
                                placeholder="Create a strong new password"
                                value={form.newPw}
                                onChange={handleChange("newPw")}
                                onBlur={handleBlur("newPw")}
                                autoComplete="new-password"
                            />
                            <button
                                className="cp-eye-btn"
                                type="button"
                                onClick={() => toggleShow("newPw")}
                                aria-label={show.newPw ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={show.newPw} />
                            </button>
                        </div>

                        {/* Strength Meter */}
                        {form.newPw && (
                            <div className="cp-strength-bar">
                                <div className="cp-strength-segments">
                                    {[1, 2, 3, 4].map((lvl) => {
                                        const meta = STRENGTH_META[lvl - 1];
                                        const active = strength >= lvl;
                                        return (
                                            <div
                                                key={lvl}
                                                className={`cp-strength-seg ${active ? `${meta.segCls} cp-seg-active` : ""}`}
                                            />
                                        );
                                    })}
                                </div>
                                {strength > 0 && (
                                    <span className={`cp-strength-label ${STRENGTH_META[strength - 1].cls}`}>
                                        {STRENGTH_META[strength - 1].label}
                                    </span>
                                )}
                            </div>
                        )}

                        {errors.newPw && touched.newPw && (
                            <span className="cp-field-error">⚠ {errors.newPw}</span>
                        )}

                        {/* Requirements Checklist */}
                        {form.newPw && (
                            <div className="cp-requirements">
                                {REQUIREMENTS.map((r) => (
                                    <span
                                        key={r.id}
                                        className={`cp-req${r.test(form.newPw) ? " cp-req-met" : ""}`}
                                    >
                                        <span className="cp-req-dot" />
                                        {r.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="cp-field">
                        <label className="cp-label">Confirm New Password</label>
                        <div className="cp-input-wrap">
                            <input
                                className={inputClass("confirm")}
                                type={show.confirm ? "text" : "password"}
                                placeholder="Repeat your new password"
                                value={form.confirm}
                                onChange={handleChange("confirm")}
                                onBlur={handleBlur("confirm")}
                                autoComplete="new-password"
                            />
                            <button
                                className="cp-eye-btn"
                                type="button"
                                onClick={() => toggleShow("confirm")}
                                aria-label={show.confirm ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={show.confirm} />
                            </button>
                        </div>
                        {errors.confirm && touched.confirm && (
                            <span className="cp-field-error">⚠ {errors.confirm}</span>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        className={`cp-submit-btn${loading ? " cp-loading" : ""}`}
                        type="button"
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >
                        <span className="cp-btn-inner">
                            {loading ? (
                                <>
                                    <div className="cp-spinner" />
                                    Updating Password…
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
