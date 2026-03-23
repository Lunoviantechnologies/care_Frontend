import { useParams } from "react-router-dom";
import styles from "../../stylesheet/adminSafety.module.css";

const AdminSafety = () => {
  const { serviceType } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {serviceType.toUpperCase()} Safety
        </h2>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.cardsContainer}>

          <div className={styles.card}>
            Live Tracking Enabled
          </div>

          <div className={styles.card}>
            Emergency Alerts Active
          </div>

          <div className={styles.card}>
            Background Verification Complete
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSafety;