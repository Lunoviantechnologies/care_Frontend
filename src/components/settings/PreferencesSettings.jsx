import { useState } from "react";
import { FaGlobe, FaSlidersH } from "react-icons/fa";
import { Toggle, SectionHead, SettingRow } from "./SettingsShared";

const LOCALE_FIELDS = [
    {
        key: "language",
        label: "Language",
        options: ["English", "Hindi", "Telugu", "Tamil", "Kannada"],
    },
    {
        key: "currency",
        label: "Currency",
        options: ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"],
    },
    {
        key: "timezone",
        label: "Timezone",
        options: ["Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"],
    },
];

const PreferencesSettings = () => {
    const [prefs, setPrefs] = useState({
        language: "English",
        currency: "INR (₹)",
        timezone: "Asia/Kolkata",
        autoBook: false,
        savedAddr: true,
    });

    const set = (key, val) => setPrefs((prev) => ({ ...prev, [key]: val }));

    return (
        <div className="st-panel">
            <SectionHead
                title="App Preferences"
                sub="Set your language, currency, and general app behaviour."
            />

            {/* ── Localisation dropdowns ── */}
            <div className="st-group">
                <div className="st-group-label">Localisation</div>

                {LOCALE_FIELDS.map((field) => (
                    <div className="st-row" key={field.key}>
                        <div className="st-row-left">
                            <div className="st-row-icon"><FaGlobe /></div>
                            <div className="st-row-text">
                                <span className="st-row-title">{field.label}</span>
                            </div>
                        </div>
                        <div className="st-row-right">
                            <select
                                className="st-select"
                                value={prefs[field.key]}
                                onChange={(e) => set(field.key, e.target.value)}
                            >
                                {field.options.map((o) => (
                                    <option key={o}>{o}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Booking behaviour ── */}
            <div className="st-group">
                <div className="st-group-label">Booking Behaviour</div>

                <SettingRow
                    icon={FaSlidersH}
                    title="Auto-fill Booking Details"
                    sub="Pre-fill your name and address on new bookings"
                >
                    <Toggle checked={prefs.autoBook} onChange={(v) => set("autoBook", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaGlobe}
                    title="Save Default Address"
                    sub="Remember last-used address for faster checkout"
                >
                    <Toggle checked={prefs.savedAddr} onChange={(v) => set("savedAddr", v)} />
                </SettingRow>
            </div>
        </div>
    );
};

export default PreferencesSettings;