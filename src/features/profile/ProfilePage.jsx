import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    FaUser, FaPhone, FaEnvelope, FaLock, FaMapMarkerAlt, FaCity,
    FaCamera, FaPencilAlt, FaCheck, FaTimes, FaShieldAlt,
    FaStar, FaCalendarCheck, FaClock, FaHeart, FaCrosshairs
} from "react-icons/fa";
import "../../styleSheets/profilePage.css";
import { toast } from "react-toastify";
import { IMAGE_URLS } from "../../api/baseUrl";
import { fetchCustomerProfile, saveCustomerProfile } from "../../features/profile/customerProfileSlice";

const QUICK_STATS = [
    { icon: FaCalendarCheck, label: "Bookings", value: "14", color: "#4A6CF7" },
    { icon: FaStar, label: "Avg Rating", value: "4.8", color: "#c49000" },
    { icon: FaClock, label: "Hours of Care", value: "68", color: "#5e35b1" },
    { icon: FaHeart, label: "Saved", value: "3", color: "#e00950" },
];

const FIELDS = [
    { key: "name", label: "Full Name", icon: FaUser, type: "text", placeholder: "e.g. Priya Sharma" },
    { key: "phone", label: "Phone", icon: FaPhone, type: "tel", placeholder: "e.g. +91 98765 43210" },
    { key: "email", label: "Email", icon: FaEnvelope, type: "email", placeholder: "e.g. priya@email.com" },
    { key: "password", label: "Password", icon: FaLock, type: "password", placeholder: "••••••••" },
    { key: "address", label: "Address", icon: FaMapMarkerAlt, type: "text", placeholder: "e.g. 12, MG Road" },
    { key: "city", label: "City", icon: FaCity, type: "text", placeholder: "e.g. Hyderabad" },
];

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { data: profileData, loading } = useSelector((state) => state.customerProfile);

    const [editMode, setEditMode] = useState(false);
    const [draft, setDraft] = useState({});
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [saved, setSaved] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [locStatus, setLocStatus] = useState("idle"); // idle | loading | success | error

    const fileRef = useRef(null);

    useEffect(() => {
        if (user?.user_id) {
            dispatch(fetchCustomerProfile(Number(user.user_id)));
        }
    }, [user?.user_id]);

    useEffect(() => {
        if (profileData?.profile_image) {
            setAvatarUrl(`${IMAGE_URLS.AUTH}${profileData.profile_image}`);
        }
    }, [profileData]);

    const getLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }
        setLocStatus("loading");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setDraft((prev) => ({ ...prev, latitude, longitude }));
                setLocStatus("success");
                toast.success("Location captured!");
            },
            (error) => {
                console.error(error);
                setLocStatus("error");
                toast.error("Failed to get location");
            }
        );
    };

    const handleEdit = () => {
        setDraft({ ...profileData });
        setEditMode(true);
        setSaved(false);
        setLocStatus("idle");
    };

    const handleCancel = () => {
        setDraft({ ...profileData });
        setEditMode(false);
        setLocStatus("idle");
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", draft.name || "");
        formData.append("phone", draft.phone || "");
        formData.append("email", draft.email || "");
        formData.append("address", draft.address || "");
        formData.append("city", draft.city || "");

        // Only send coordinates if they were captured in this session
        if (draft.latitude && draft.longitude) {
            formData.append("latitude", draft.latitude);
            formData.append("longitude", draft.longitude);
        }

        if (draft.password) formData.append("password", draft.password);
        if (selectedFile) formData.append("profile_image", selectedFile);

        const result = await dispatch(saveCustomerProfile({
            customerId: Number(user.user_id),
            formData,
        }));

        if (saveCustomerProfile.fulfilled.match(result)) {
            toast.success("Profile updated successfully!");
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            toast.error("Failed to update profile. Please try again.");
        }

        setEditMode(false);
        setLocStatus("idle");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setAvatarUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const initials = profileData?.name
        ? profileData.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : "U";

    const hasLocation = draft.latitude && draft.longitude;
    const existingLocation = profileData?.latitude && profileData?.longitude;

    if (loading && !profileData) {
        return (
            <div className="pp-page">
                <div className="pp-loading">
                    <div className="pp-spinner" />
                    <p>Loading profile…</p>
                </div>
            </div>
        );
    }

    console.log("Profile Data:", profileData);

    return (
        <div className="pp-page">
            <div className="pp-blob pp-blob--1" aria-hidden="true" />
            <div className="pp-blob pp-blob--2" aria-hidden="true" />

            <div className="pp-container">

                {/* HERO CARD */}
                <div className="pp-hero-card">
                    <div className="pp-avatar-wrap">
                        <div className="pp-avatar">
                            {avatarUrl
                                ? <img src={avatarUrl} alt="Profile" className="pp-avatar-img" />
                                : <span className="pp-avatar-initials">{initials}</span>
                            }
                        </div>
                        <button className="pp-avatar-btn" onClick={() => fileRef.current.click()} title="Change photo">
                            <FaCamera />
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="pp-file-input" onChange={handleAvatarChange} />
                    </div>

                    <div className="pp-hero-info">
                        <div className="pp-hero-badge"><FaShieldAlt /> Verified Member</div>
                        <h1 className="pp-hero-name">{profileData?.name || "Your Name"}</h1>
                        <p className="pp-hero-sub">
                            {profileData?.city && <span><FaMapMarkerAlt /> {profileData.city}</span>}
                            {profileData?.email && <span><FaEnvelope /> {profileData.email}</span>}
                        </p>
                    </div>

                    <div className="pp-hero-actions">
                        {!editMode ? (
                            <button className="pp-edit-btn" onClick={handleEdit}>
                                <FaPencilAlt /> Edit Profile
                            </button>
                        ) : (
                            <div className="pp-edit-action-row">
                                <button className="pp-save-btn" onClick={handleSave}><FaCheck /> Save Changes</button>
                                <button className="pp-cancel-btn" onClick={handleCancel}><FaTimes /></button>
                            </div>
                        )}
                        {saved && <div className="pp-saved-toast"><FaCheck /> Profile updated!</div>}
                    </div>
                </div>

                {/* QUICK STATS */}
                <div className="pp-stats-strip">
                    {QUICK_STATS.map((s, i) => (
                        <div className="pp-stat-card" key={i} style={{ "--pp-sc": s.color }}>
                            <s.icon className="pp-stat-icon" />
                            <span className="pp-stat-value">{s.value}</span>
                            <span className="pp-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* DETAILS CARD */}
                <div className="pp-details-card">
                    <div className="pp-details-header">
                        <h2 className="pp-details-title">Personal Information</h2>
                        <p className="pp-details-sub">
                            {editMode ? "Make your changes below and hit Save." : "Click Edit Profile to update your details."}
                        </p>
                    </div>

                    <div className="pp-fields-grid">
                        {FIELDS.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div className="pp-field" key={f.key}>
                                    <label className="pp-label">
                                        <Icon className="pp-label-icon" />
                                        {f.label}
                                    </label>
                                    {editMode ? (
                                        <input
                                            className="pp-input pp-input--edit"
                                            type={f.type}
                                            placeholder={f.placeholder}
                                            value={draft[f.key] || ""}
                                            readOnly={f.key === "phone"}
                                            onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                                        />
                                    ) : (
                                        <div className="pp-value">
                                            {f.key === "password"
                                                ? "••••••••"
                                                : profileData?.[f.key] || <span className="pp-value--empty">Not set</span>
                                            }
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* LOCATION SECTION */}
                    <div className="pp-location-section">
                        <div className="pp-location-header">
                            <div className="pp-location-title">
                                <FaMapMarkerAlt className="pp-location-title-icon" />
                                <span>Live Location</span>
                            </div>
                            {(existingLocation || hasLocation) && (
                                <span className="pp-location-tag">
                                    {hasLocation ? "📍 New location ready" : "✓ Location saved"}
                                </span>
                            )}
                        </div>

                        {/* Coordinate display */}
                        <div className="pp-location-coords">
                            <div className="pp-coord-box">
                                <span className="pp-coord-label">Latitude</span>
                                <span className="pp-coord-value">
                                    {hasLocation
                                        ? draft.latitude.toFixed(6)
                                        : profileData?.latitude
                                            ? Number(profileData.latitude).toFixed(6)
                                            : <span className="pp-value--empty">Not set</span>
                                    }
                                </span>
                            </div>
                            <div className="pp-coord-divider" />
                            <div className="pp-coord-box">
                                <span className="pp-coord-label">Longitude</span>
                                <span className="pp-coord-value">
                                    {hasLocation
                                        ? draft.longitude.toFixed(6)
                                        : profileData?.longitude
                                            ? Number(profileData.longitude).toFixed(6)
                                            : <span className="pp-value--empty">Not set</span>
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Get location button — only in edit mode */}
                        {editMode && (
                            <button
                                onClick={getLocation}
                                className={`pp-location-btn pp-location-btn--${locStatus}`}
                                disabled={locStatus === "loading"}
                            >
                                <FaCrosshairs className="pp-location-btn-icon" />
                                {locStatus === "loading" && "Detecting…"}
                                {locStatus === "success" && "Location Updated ✓"}
                                {locStatus === "error" && "Retry Location"}
                                {locStatus === "idle" && "Get Current Location"}
                            </button>
                        )}
                    </div>

                    {/* Save bar */}
                    {editMode && (
                        <div className="pp-save-bar">
                            <button className="pp-save-btn pp-save-btn--bar" onClick={handleSave}>
                                <FaCheck /> Save Changes
                            </button>
                            <button className="pp-cancel-btn pp-cancel-btn--bar" onClick={handleCancel}>
                                Discard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;