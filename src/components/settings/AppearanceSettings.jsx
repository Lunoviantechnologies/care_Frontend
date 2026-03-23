import { useState } from "react";
import { FaSun, FaMoon, FaCog, FaCheck, FaSlidersH, FaPalette } from "react-icons/fa";
import { Toggle, SectionHead, SettingRow } from "./SettingsShared";

const THEME_OPTIONS = [
    { key: "light", icon: FaSun, label: "Light" },
    { key: "dark", icon: FaMoon, label: "Dark" },
    { key: "system", icon: FaCog, label: "System" },
];

const FONT_SIZES = ["small", "medium", "large"];

const AppearanceSettings = () => {
    const [appearance, setAppearance] = useState({
        theme: "light",
        fontSize: "medium",
        compact: false,
        animations: true,
    });

    const set = (key, val) => setAppearance((prev) => ({ ...prev, [key]: val }));

    return (
        <div className="st-panel">
            <SectionHead
                title="Appearance"
                sub="Customise the look and feel of the app to your preference."
            />

            {/* ── Theme picker ── */}
            <div className="st-group">
                <div className="st-group-label">Theme</div>
                <div className="st-theme-grid">
                    {THEME_OPTIONS.map(({ key, icon: Icon, label }) => (
                        <button
                            key={key}
                            type="button"
                            className={`st-theme-card ${appearance.theme === key ? "st-theme-card--active" : ""}`}
                            onClick={() => set("theme", key)}
                        >
                            <Icon className="st-theme-icon" />
                            <span>{label}</span>
                            {appearance.theme === key && (
                                <FaCheck className="st-theme-check" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Font size picker ── */}
            <div className="st-group">
                <div className="st-group-label">Font Size</div>
                <div className="st-font-grid">
                    {FONT_SIZES.map((size) => (
                        <button
                            key={size}
                            type="button"
                            className={`st-font-btn ${appearance.fontSize === size ? "st-font-btn--active" : ""}`}
                            onClick={() => set("fontSize", size)}
                        >
                            <span className={`st-font-sample st-font-sample--${size}`}>Aa</span>
                            <span className="st-font-label">
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Display toggles ── */}
            <div className="st-group">
                <div className="st-group-label">Display</div>

                <SettingRow
                    icon={FaSlidersH}
                    title="Compact Mode"
                    sub="Reduce spacing for a denser layout"
                >
                    <Toggle checked={appearance.compact} onChange={(v) => set("compact", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaPalette}
                    title="Animations"
                    sub="Enable transitions and micro-animations"
                >
                    <Toggle checked={appearance.animations} onChange={(v) => set("animations", v)} />
                </SettingRow>
            </div>
        </div>
    );
};

export default AppearanceSettings;