import { useState } from "react";
import {
    FaBell, FaShieldAlt, FaPalette, FaLock,
    FaSlidersH, FaChevronRight, FaCheck, FaCog,
} from "react-icons/fa";

import NotificationsSettings from "./NotificationsSettings";
import PrivacySettings from "./PrivacySettings";
import AppearanceSettings from "./AppearanceSettings";
import SecuritySettings from "./SecuritySettings";
import PreferencesSettings from "./PreferencesSettings";

import "../../styleSheets/settings.css";

/* ── Nav config ── */
const NAV_ITEMS = [
    { key: "notifications", label: "Notifications", icon: FaBell, Panel: NotificationsSettings },
    { key: "privacy", label: "Privacy", icon: FaShieldAlt, Panel: PrivacySettings },
    { key: "appearance", label: "Appearance", icon: FaPalette, Panel: AppearanceSettings },
    { key: "security", label: "Security", icon: FaLock, Panel: SecuritySettings },
    { key: "preferences", label: "Preferences", icon: FaSlidersH, Panel: PreferencesSettings },
];

const Settings = () => {
    const [activeKey, setActiveKey] = useState("notifications");
    const [mobileNavOpen, setMobileOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    const activeItem = NAV_ITEMS.find((n) => n.key === activeKey);
    const ActivePanel = activeItem?.Panel;
    const ActiveIcon = activeItem?.icon;

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2800);
    };

    const handleNavClick = (key) => {
        setActiveKey(key);
        setMobileOpen(false);
    };

    return (
        <div className="st-page">
            {/* Background blobs */}
            <div className="st-blob st-blob--1" aria-hidden="true" />
            <div className="st-blob st-blob--2" aria-hidden="true" />

            <div className="st-container">

                {/* ══ PAGE HEADER ══ */}
                <div className="st-header">
                    <div className="st-header-icon"><FaCog /></div>
                    <div>
                        <p className="st-eyebrow">Manage Your Account</p>
                        <h1 className="st-title">Settings</h1>
                    </div>
                </div>

                <div className="st-layout">

                    {/* ══ SIDEBAR ══ */}
                    <aside className="st-sidebar">

                        {/* Mobile accordion toggle */}
                        <button
                            type="button"
                            className="st-mobile-nav-toggle"
                            onClick={() => setMobileOpen((o) => !o)}
                        >
                            <span className="st-mobile-nav-label">
                                {ActiveIcon && <ActiveIcon />}
                                {activeItem?.label}
                            </span>
                            <FaChevronRight
                                className={`st-mobile-chevron ${mobileNavOpen ? "st-mobile-chevron--open" : ""}`}
                            />
                        </button>

                        <nav className={`st-nav ${mobileNavOpen ? "st-nav--open" : ""}`}>
                            {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                                const isActive = activeKey === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`st-nav-item ${isActive ? "st-nav-item--active" : ""}`}
                                        onClick={() => handleNavClick(key)}
                                    >
                                        <div className="st-nav-icon"><Icon /></div>
                                        <span className="st-nav-label">{label}</span>
                                        <FaChevronRight className="st-nav-arrow" />
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* ══ CONTENT ══ */}
                    <main className="st-content">

                        {/* Render the active panel */}
                        {ActivePanel && <ActivePanel key={activeKey} />}

                        {/* ── Save bar ── */}
                        <div className="st-save-bar">
                            {saved && (
                                <span className="st-saved-badge">
                                    <FaCheck /> Changes saved!
                                </span>
                            )}
                            <button
                                type="button"
                                className="st-save-btn"
                                onClick={handleSave}
                            >
                                Save Preferences
                            </button>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Settings;