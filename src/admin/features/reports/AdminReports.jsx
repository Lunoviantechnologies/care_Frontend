import { useParams } from "react-router-dom";
import styles from "../../stylesheet/adminReports.module.css";

const AdminReports = () => {
  const { serviceType } = useParams();

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>
          {serviceType.toUpperCase()} Reports
        </h2>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.cardsContainer}>

          <div className={styles.card}>
            <h4>Monthly Revenue</h4>
            <p>₹ 2,40,000</p>
          </div>

          <div className={styles.card}>
            <h4>Service Growth</h4>
            <p>+12%</p>
          </div>

          <div className={styles.card}>
            <h4>Customer Satisfaction</h4>
            <p>4.8 ⭐</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminReports;