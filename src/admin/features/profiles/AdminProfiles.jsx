import { useParams } from "react-router-dom";
import { serviceConfig } from "../../config/serviceConfig";
import styles from "../../stylesheet/adminProfiles.module.css";

const AdminProfiles = () => {
  const { serviceType } = useParams();
  const config = serviceConfig[serviceType];

  return (
    <div className={`${styles.page} ${styles[config.theme]}`}>

      <div className={styles.card}>

        <h2 className={styles.title}>
          {config.name} - Admin Profile
        </h2>

        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input type="text" defaultValue="Admin User" />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" defaultValue="admin@care.com" />
        </div>

        {serviceType === "baby" && (
          <div className={styles.formGroup}>
            <label>Child Safety Certification</label>
            <input type="text" placeholder="Enter certificate ID" />
          </div>
        )}

        {serviceType === "pet" && (
          <div className={styles.formGroup}>
            <label>Pet Handling License</label>
            <input type="text" placeholder="Enter license number" />
          </div>
        )}

        {serviceType === "elder" && (
          <div className={styles.formGroup}>
            <label>Medical Care Authorization</label>
            <input type="text" placeholder="Enter authorization ID" />
          </div>
        )}

        <button className={styles.saveBtn}>
          Update Profile
        </button>

      </div>
    </div>
  );
};

export default AdminProfiles;