import { useState } from "react";
import { useParams } from "react-router-dom";
import { serviceConfig } from "../../config/serviceConfig";
import styles from "../../stylesheet/adminSettings.module.css";

const AdminSettings = () => {
  const { serviceType } = useParams();
  const config = serviceConfig[serviceType];

  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className={`${styles.page} ${styles[config.theme]}`}>

      <div className={styles.card}>

        <h2 className={styles.title}>{config.name} Settings</h2>

        <div className={styles.item}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Enable Notifications
          </label>
        </div>

        {config.allowTwoFactor && (
          <div className={styles.item}>
            <label className={styles.label}>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
              />
              Enable Two-Factor Authentication
            </label>
          </div>
        )}

        {serviceType === "pet" && (
          <div className={styles.item}>
            <label className={styles.label}>
              <input type="checkbox" />
              Enable Pet Vaccination Tracking
            </label>
          </div>
        )}

        <button className={styles.saveBtn}>
          Save Settings
        </button>

      </div>

    </div>
  );
};

export default AdminSettings;