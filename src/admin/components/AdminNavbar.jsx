import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminNotifications from "../components/AdminNotifications/";
import styles from "../stylesheet/adminNavbar.module.css";

const AdminNavbar = ({ setSidebarOpen }) => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const servicesMap = {
    baby: { name: "Baby Care", emoji: "👶" },
    pet: { name: "Pet Care", emoji: "🐶" },
    elder: { name: "Elder Care", emoji: "👵" },
    kitchen: { name: "Kitchen Service", emoji: "👨‍🍳" },
    pregnancy: { name: "Pregnancy Care", emoji: "🤰" },
  };

  const service = servicesMap[serviceType];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const switchService = (type) => {
    setServiceOpen(false);
    navigate(`/admin/${type}/dashboard`);
  };

  return (
    <div className={`${styles.navbar} ${styles[`${serviceType}Theme`]}`}>

      {/* LEFT */}
      <div className={styles.navLeft}>
        <button
          className={styles.menuToggle}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          ☰
        </button>

        <div
          className={styles.serviceSwitcher}
          onClick={() => setServiceOpen(!serviceOpen)}
        >
          {service?.emoji} {service?.name} ⬇
        </div>

        {serviceOpen && (
          <div className={styles.serviceDropdown}>
            <div onClick={() => switchService("baby")}>👶 Baby Care</div>
            <div onClick={() => switchService("pet")}>🐶 Pet Care</div>
            <div onClick={() => switchService("elder")}>👵 Elder Care</div>
            <div onClick={() => switchService("kitchen")}>👨‍🍳 Kitchen</div>
            <div onClick={() => switchService("pregnancy")}>🤰 Pregnancy</div>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className={styles.navRight}>
        <AdminNotifications />

        <div
          className={styles.profile}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          👤 Admin

          {profileOpen && (
            <div className={styles.profileDropdown}>
              <div onClick={() => navigate(`/admin/${serviceType}/profile`)}>
                Profile
              </div>
              <div onClick={() => navigate(`/admin/${serviceType}/settings`)}>
                Settings
              </div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;