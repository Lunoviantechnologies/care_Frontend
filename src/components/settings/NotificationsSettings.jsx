import { useState } from "react";
import { FaBell, FaMobileAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Toggle, SectionHead, SettingRow } from "./SettingsShared";

const NotificationsSettings = () => {
    const [notif, setNotif] = useState({
        email: true,
        sms: true,
        whatsapp: false,
        pushBooking: true,
        pushPromos: false,
        pushReminder: true,
        newsletter: false,
    });

    const set = (key, val) => setNotif((prev) => ({ ...prev, [key]: val }));

    return (
        <div className="st-panel">
            <SectionHead
                title="Notification Preferences"
                sub="Choose how and when you want to be notified about bookings and updates."
            />

            {/* ── Channels ── */}
            <div className="st-group">
                <div className="st-group-label">Channels</div>

                <SettingRow
                    icon={FaEnvelope}
                    title="Email Notifications"
                    sub="Booking confirmations, receipts, updates"
                >
                    <Toggle checked={notif.email} onChange={(v) => set("email", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaMobileAlt}
                    title="SMS Alerts"
                    sub="OTP and urgent booking alerts"
                >
                    <Toggle checked={notif.sms} onChange={(v) => set("sms", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaWhatsapp}
                    title="WhatsApp Updates"
                    sub="Session reminders via WhatsApp"
                >
                    <Toggle checked={notif.whatsapp} onChange={(v) => set("whatsapp", v)} />
                </SettingRow>
            </div>

            {/* ── Push Notifications ── */}
            <div className="st-group">
                <div className="st-group-label">Push Notifications</div>

                <SettingRow
                    icon={FaBell}
                    title="Booking Updates"
                    sub="Status changes for your bookings"
                >
                    <Toggle checked={notif.pushBooking} onChange={(v) => set("pushBooking", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaBell}
                    title="Session Reminders"
                    sub="Alerts 1 hour before your session"
                >
                    <Toggle checked={notif.pushReminder} onChange={(v) => set("pushReminder", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaBell}
                    title="Offers & Promotions"
                    sub="Exclusive deals and new features"
                >
                    <Toggle checked={notif.pushPromos} onChange={(v) => set("pushPromos", v)} />
                </SettingRow>

                <SettingRow
                    icon={FaEnvelope}
                    title="Newsletter"
                    sub="Monthly updates and care tips"
                >
                    <Toggle checked={notif.newsletter} onChange={(v) => set("newsletter", v)} />
                </SettingRow>
            </div>
        </div>
    );
};

export default NotificationsSettings;