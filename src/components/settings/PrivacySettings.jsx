import { useState } from "react";
import { FaShieldAlt, FaGlobe, FaSlidersH } from "react-icons/fa";
import { Toggle, SectionHead, SettingRow } from "./SettingsShared";

const PrivacySettings = () => {
    const [privacy, setPrivacy] = useState({
        shareActivity: false,
        locationAccess: true,
        dataAnalytics: true,
        thirdParty: false,
    });

    const set = (key, val) => setPrivacy((prev) => ({ ...prev, [key]: val }));

    return (
        <div className="st-panel">
            <SectionHead
                title="Privacy Controls"
                sub="Control what data you share and how it's used on our platform."
            />

            <div className="st-group">
                <div className="st-group-label">Data Sharing</div>

                <SettingRow
                    icon={FaShieldAlt}
                    title="Share Activity Data"
                    sub="Help improve services by sharing anonymised usage"
                >
                    <Toggle checked={privacy.shareActivity} onChange={(v) => set("shareActivity", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaGlobe}
                    title="Location Access"
                    sub="Allow location to find nearby caregivers"
                >
                    <Toggle checked={privacy.locationAccess} onChange={(v) => set("locationAccess", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaSlidersH}
                    title="Analytics & Diagnostics"
                    sub="Send app performance data to improve stability"
                >
                    <Toggle checked={privacy.dataAnalytics} onChange={(v) => set("dataAnalytics", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaShieldAlt}
                    title="Third-Party Data Sharing"
                    sub="Allow trusted partners to use your data for personalisation"
                >
                    <Toggle checked={privacy.thirdParty} onChange={(v) => set("thirdParty", v)} />
                </SettingRow>
            </div>

            {/* Info banner */}
            <div className="st-info-box">
                <FaShieldAlt className="st-info-icon" />
                <p>We never sell your personal data. All data sharing is governed by our Privacy Policy.</p>
            </div>
        </div>
    );
};

export default PrivacySettings;