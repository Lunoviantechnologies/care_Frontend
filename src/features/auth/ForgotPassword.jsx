import React, { useState, useRef, useEffect } from "react";
import "../../styleSheets/forgotPassword.css";

const STEPS = {
    EMAIL: 0,
    OTP: 1,
    RESET: 2,
    SUCCESS: 3,
};

const ForgotPassword = () => {
    const [step, setStep] = useState(STEPS.EMAIL);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [animating, setAnimating] = useState(false);

    const otpRefs = useRef([]);
    const timerRef = useRef(null);

    // ── Timer for OTP resend ──
    useEffect(() => {
        if (step === STEPS.OTP) {
            setTimer(60);
            setCanResend(false);
            timerRef.current = setInterval(() => {
                setTimer((t) => {
                    if (t <= 1) {
                        clearInterval(timerRef.current);
                        setCanResend(true);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [step]);

    const goToStep = (next) => {
        setAnimating(true);
        setTimeout(() => {
            setStep(next);
            setErrors({});
            setAnimating(false);
        }, 300);
    };

    // ── Validations ──
    const validateEmail = () => {
        if (!email.trim()) return { email: "Email address is required." };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return { email: "Please enter a valid email address." };
        return {};
    };

    const validateOtp = () => {
        if (otp.some((d) => d === ""))
            return { otp: "Please enter all 6 digits of the OTP." };
        return {};
    };

    const validatePassword = () => {
        const errs = {};
        if (!newPassword) errs.newPassword = "New password is required.";
        else if (newPassword.length < 8)
            errs.newPassword = "Password must be at least 8 characters.";
        else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(newPassword))
            errs.newPassword = "Must include an uppercase letter and a number.";
        if (!confirmPassword) errs.confirmPassword = "Please confirm your password.";
        else if (newPassword !== confirmPassword)
            errs.confirmPassword = "Passwords do not match.";
        return errs;
    };

    // ── Handlers ──
    const handleSendOtp = async () => {
        const errs = validateEmail();
        if (Object.keys(errs).length) return setErrors(errs);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        goToStep(STEPS.OTP);
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        setErrors({});
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = [...otp];
        pasted.split("").forEach((d, i) => { next[i] = d; });
        setOtp(next);
        otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleVerifyOtp = async () => {
        const errs = validateOtp();
        if (Object.keys(errs).length) return setErrors(errs);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        goToStep(STEPS.RESET);
    };

    const handleResendOtp = async () => {
        if (!canResend) return;
        setOtp(["", "", "", "", "", ""]);
        setErrors({});
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        setTimer(60);
        setCanResend(false);
        timerRef.current = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0; }
                return t - 1;
            });
        }, 1000);
        otpRefs.current[0]?.focus();
    };

    const handleResetPassword = async () => {
        const errs = validatePassword();
        if (Object.keys(errs).length) return setErrors(errs);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        goToStep(STEPS.SUCCESS);
    };

    const getPasswordStrength = () => {
        if (!newPassword) return { level: 0, label: "", color: "" };
        let score = 0;
        if (newPassword.length >= 8) score++;
        if (newPassword.length >= 12) score++;
        if (/[A-Z]/.test(newPassword)) score++;
        if (/[0-9]/.test(newPassword)) score++;
        if (/[^A-Za-z0-9]/.test(newPassword)) score++;
        if (score <= 2) return { level: 1, label: "Weak", color: "#ef4444" };
        if (score <= 3) return { level: 2, label: "Fair", color: "#f97316" };
        if (score <= 4) return { level: 3, label: "Good", color: "#eab308" };
        return { level: 4, label: "Strong", color: "#22c55e" };
    };

    const strength = getPasswordStrength();

    const stepLabels = ["Email", "Verify OTP", "New Password"];

    return (
        <div className="fp-root">
            {/* ── Decorative background ── */}
            <div className="fp-bg" aria-hidden="true">
                <span className="fp-blob fp-blob-1" />
                <span className="fp-blob fp-blob-2" />
                <span className="fp-blob fp-blob-3" />
                <div className="fp-grid" />
            </div>

            <div className={`fp-card ${animating ? "fp-card--exit" : "fp-card--enter"}`}>

                {/* ── Brand ── */}
                <div className="fp-brand">
                    <div className="fp-brand-icon" aria-hidden="true">
                        <svg viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="20" fill="url(#brandGrad)" />
                            <path d="M13 20a7 7 0 1 1 14 0v2H13v-2Z" fill="white" fillOpacity=".9" />
                            <rect x="11" y="22" width="18" height="11" rx="3" fill="white" fillOpacity=".9" />
                            <circle cx="20" cy="27" r="2" fill="url(#brandGrad)" />
                            <defs>
                                <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="fp-brand-name">CareConnect</span>
                </div>

                {step !== STEPS.SUCCESS && (
                    <>
                        {/* ── Step indicator ── */}
                        <div className="fp-stepper" role="progressbar" aria-valuenow={step + 1} aria-valuemax={3}>
                            {stepLabels.map((label, i) => (
                                <React.Fragment key={label}>
                                    <div className={`fp-step ${i < step ? "fp-step--done" : i === step ? "fp-step--active" : ""}`}>
                                        <div className="fp-step-dot">
                                            {i < step ? (
                                                <svg viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                <span>{i + 1}</span>
                                            )}
                                        </div>
                                        <span className="fp-step-label">{label}</span>
                                    </div>
                                    {i < stepLabels.length - 1 && (
                                        <div className={`fp-step-line ${i < step ? "fp-step-line--done" : ""}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )}

                {/* ════════════════════════════
                    STEP 0 — Email
                ════════════════════════════ */}
                {step === STEPS.EMAIL && (
                    <div className="fp-section">
                        <div className="fp-heading">
                            <h1>Forgot Password?</h1>
                            <p>No worries. Enter your registered email and we'll send you a one-time verification code.</p>
                        </div>

                        <div className={`fp-field ${errors.email ? "fp-field--error" : ""}`}>
                            <label htmlFor="fp-email">Email Address</label>
                            <div className="fp-input-wrap">
                                <span className="fp-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none">
                                        <path d="M2.5 5.5h15l-7.5 6-7.5-6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                        <path d="M2.5 5.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <input
                                    id="fp-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                    autoComplete="email"
                                    autoFocus
                                />
                            </div>
                            {errors.email && <span className="fp-error-msg" role="alert">{errors.email}</span>}
                        </div>

                        <button
                            className="fp-btn fp-btn--primary"
                            onClick={handleSendOtp}
                            disabled={loading}
                            type="button"
                        >
                            {loading ? <span className="fp-spinner" /> : null}
                            {loading ? "Sending OTP…" : "Send OTP"}
                            {!loading && (
                                <svg viewBox="0 0 20 20" fill="none" className="fp-btn-arrow">
                                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>

                        <p className="fp-helper-text">
                            Remembered your password?{" "}
                            <a href="/login" className="fp-link">Sign in</a>
                        </p>
                    </div>
                )}

                {/* ════════════════════════════
                    STEP 1 — OTP
                ════════════════════════════ */}
                {step === STEPS.OTP && (
                    <div className="fp-section">
                        <div className="fp-heading">
                            <h1>Check Your Inbox</h1>
                            <p>
                                We sent a 6-digit code to{" "}
                                <strong className="fp-email-highlight">{email}</strong>.
                                Enter it below to continue.
                            </p>
                        </div>

                        <div className={`fp-otp-group ${errors.otp ? "fp-otp-group--error" : ""}`}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (otpRefs.current[i] = el)}
                                    className={`fp-otp-input ${digit ? "fp-otp-input--filled" : ""}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    onPaste={i === 0 ? handleOtpPaste : undefined}
                                    aria-label={`OTP digit ${i + 1}`}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>
                        {errors.otp && <span className="fp-error-msg fp-error-msg--center" role="alert">{errors.otp}</span>}

                        {/* Timer */}
                        <div className="fp-timer-row">
                            {canResend ? (
                                <button
                                    className="fp-resend-btn"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                    type="button"
                                >
                                    {loading ? "Resending…" : "Resend OTP"}
                                </button>
                            ) : (
                                <p className="fp-timer-text">
                                    Resend code in{" "}
                                    <span className="fp-timer-count">
                                        0:{timer.toString().padStart(2, "0")}
                                    </span>
                                </p>
                            )}
                        </div>

                        <button
                            className="fp-btn fp-btn--primary"
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            type="button"
                        >
                            {loading ? <span className="fp-spinner" /> : null}
                            {loading ? "Verifying…" : "Verify OTP"}
                            {!loading && (
                                <svg viewBox="0 0 20 20" fill="none" className="fp-btn-arrow">
                                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>

                        <button
                            className="fp-btn fp-btn--ghost"
                            onClick={() => goToStep(STEPS.EMAIL)}
                            type="button"
                        >
                            ← Change Email
                        </button>
                    </div>
                )}

                {/* ════════════════════════════
                    STEP 2 — New Password
                ════════════════════════════ */}
                {step === STEPS.RESET && (
                    <div className="fp-section">
                        <div className="fp-heading">
                            <h1>Set New Password</h1>
                            <p>Create a strong password to keep your account secure.</p>
                        </div>

                        {/* New password */}
                        <div className={`fp-field ${errors.newPassword ? "fp-field--error" : ""}`}>
                            <label htmlFor="fp-new-pass">New Password</label>
                            <div className="fp-input-wrap">
                                <span className="fp-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none">
                                        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
                                        <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        <circle cx="10" cy="13.5" r="1.5" fill="currentColor" />
                                    </svg>
                                </span>
                                <input
                                    id="fp-new-pass"
                                    type={showNew ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value); setErrors((prev) => ({ ...prev, newPassword: "" })); }}
                                    autoComplete="new-password"
                                />
                                <button
                                    className="fp-eye-btn"
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    aria-label={showNew ? "Hide password" : "Show password"}
                                >
                                    {showNew ? (
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z" stroke="currentColor" strokeWidth="1.4" />
                                            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                                            <path d="M3 3l14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z" stroke="currentColor" strokeWidth="1.4" />
                                            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.newPassword && <span className="fp-error-msg" role="alert">{errors.newPassword}</span>}

                            {/* Strength meter */}
                            {newPassword && (
                                <div className="fp-strength">
                                    <div className="fp-strength-bars">
                                        {[1, 2, 3, 4].map((lvl) => (
                                            <span
                                                key={lvl}
                                                className="fp-strength-bar"
                                                style={{ background: lvl <= strength.level ? strength.color : undefined }}
                                            />
                                        ))}
                                    </div>
                                    <span className="fp-strength-label" style={{ color: strength.color }}>
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div className={`fp-field ${errors.confirmPassword ? "fp-field--error" : ""}`}>
                            <label htmlFor="fp-confirm-pass">Confirm Password</label>
                            <div className="fp-input-wrap">
                                <span className="fp-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 20 20" fill="none">
                                        <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                                    </svg>
                                </span>
                                <input
                                    id="fp-confirm-pass"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((prev) => ({ ...prev, confirmPassword: "" })); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                                    autoComplete="new-password"
                                />
                                <button
                                    className="fp-eye-btn"
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? (
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z" stroke="currentColor" strokeWidth="1.4" />
                                            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                                            <path d="M3 3l14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 20 20" fill="none">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z" stroke="currentColor" strokeWidth="1.4" />
                                            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className="fp-error-msg" role="alert">{errors.confirmPassword}</span>
                            )}
                            {confirmPassword && newPassword === confirmPassword && !errors.confirmPassword && (
                                <span className="fp-match-msg">✓ Passwords match</span>
                            )}
                        </div>

                        {/* Password rules */}
                        <ul className="fp-rules">
                            {[
                                { label: "At least 8 characters", ok: newPassword.length >= 8 },
                                { label: "One uppercase letter", ok: /[A-Z]/.test(newPassword) },
                                { label: "One number", ok: /[0-9]/.test(newPassword) },
                            ].map(({ label, ok }) => (
                                <li key={label} className={ok ? "fp-rule fp-rule--ok" : "fp-rule"}>
                                    <span className="fp-rule-dot" />
                                    {label}
                                </li>
                            ))}
                        </ul>

                        <button
                            className="fp-btn fp-btn--primary"
                            onClick={handleResetPassword}
                            disabled={loading}
                            type="button"
                        >
                            {loading ? <span className="fp-spinner" /> : null}
                            {loading ? "Updating Password…" : "Reset Password"}
                            {!loading && (
                                <svg viewBox="0 0 20 20" fill="none" className="fp-btn-arrow">
                                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                {/* ════════════════════════════
                    STEP 3 — Success
                ════════════════════════════ */}
                {step === STEPS.SUCCESS && (
                    <div className="fp-section fp-section--success">
                        <div className="fp-success-icon" aria-hidden="true">
                            <svg viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="32" fill="url(#successGrad)" />
                                <path d="M18 32l10 10 18-18" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="successGrad" x1="0" y1="0" x2="64" y2="64">
                                        <stop stopColor="#6366f1" />
                                        <stop offset="1" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="fp-heading fp-heading--center">
                            <h1>Password Reset!</h1>
                            <p>Your password has been updated successfully. You can now sign in with your new credentials.</p>
                        </div>
                        <a href="/login" className="fp-btn fp-btn--primary fp-btn--full">
                            Back to Sign In
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ForgotPassword;