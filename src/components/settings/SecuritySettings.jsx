import { useState } from "react";
import {
    FaShieldAlt, FaBell, FaMobileAlt,
    FaSignOutAlt, FaTrashAlt, FaExclamationTriangle,
} from "react-icons/fa";
import { Toggle, SectionHead, SettingRow } from "./SettingsShared";

const SecuritySettings = () => {
    const [security, setSecurity] = useState({
        twoFactor: false,
        loginAlerts: true,
        biometric: false,
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const set = (key, val) => setSecurity((prev) => ({ ...prev, [key]: val }));

    return (
        <>
            <div className="st-panel">
                <SectionHead
                    title="Account Security"
                    sub="Keep your account safe with these security controls."
                />

                {/* ── Authentication ── */}
                <div className="st-group">
                    <div className="st-group-label">Authentication</div>

                    <SettingRow
                        icon={FaShieldAlt}
                        title="Two-Factor Authentication"
                        sub="Require a code from your phone when signing in"
                    >
                        <Toggle checked={security.twoFactor} onChange={(v) => set("twoFactor", v)} />
                    </SettingRow>

                    <SettingRow
                        icon={FaBell}
                        title="Login Alerts"
                        sub="Get notified of new sign-ins to your account"
                    >
                        <Toggle checked={security.loginAlerts} onChange={(v) => set("loginAlerts", v)} />
                    </SettingRow>

                    <SettingRow
                        icon={FaMobileAlt}
                        title="Biometric Login"
                        sub="Use fingerprint or Face ID to sign in"
                    >
                        <Toggle checked={security.biometric} onChange={(v) => set("biometric", v)} />
                    </SettingRow>
                </div>

                {/* ── Sessions ── */}
                <div className="st-group">
                    <div className="st-group-label">Sessions</div>

                    <SettingRow
                        icon={FaSignOutAlt}
                        title="Sign Out All Devices"
                        sub="Terminate all active sessions except this one"
                        danger
                    >
                        <button type="button" className="st-ghost-btn st-ghost-btn--warn">
                            Sign Out All
                        </button>
                    </SettingRow>
                </div>

                {/* ── Danger Zone ── */}
                <div className="st-group st-group--danger">
                    <div className="st-group-label st-group-label--danger">Danger Zone</div>

                    <SettingRow
                        icon={FaTrashAlt}
                        title="Delete Account"
                        sub="Permanently delete your account and all data"
                        danger
                    >
                        <button
                            type="button"
                            className="st-ghost-btn st-ghost-btn--danger"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Delete
                        </button>
                    </SettingRow>
                </div>
            </div>

            {/* ── Delete confirmation modal ── */}
            {showDeleteConfirm && (
                <div
                    className="st-modal-overlay"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <div
                        className="st-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="st-modal-icon">
                            <FaExclamationTriangle />
                        </div>
                        <h3 className="st-modal-title">Delete Account?</h3>
                        <p className="st-modal-text">
                            This will permanently erase all your bookings, data, and profile.
                            This action cannot be undone.
                        </p>
                        <div className="st-modal-actions">
                            <button
                                type="button"
                                className="st-modal-cancel"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button type="button" className="st-modal-confirm">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecuritySettings;