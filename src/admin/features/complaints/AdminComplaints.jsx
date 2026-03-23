import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../stylesheet/adminModulePro.module.css";

const AdminComplaints = () => {
  const { serviceType } = useParams();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fakeData = [
      { id: 1, issue: "Late arrival", service: "baby", status: "pending" },
      { id: 2, issue: "Pet injury", service: "pet", status: "completed" },
      { id: 3, issue: "Medication delay", service: "elder", status: "pending" },
    ];

    setComplaints(fakeData.filter(c => c.service === serviceType));
  }, [serviceType]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {serviceType.toUpperCase()} Complaints
        </h2>
      </div>

      <div className={styles.tableCard}>
        {complaints.length === 0 ? (
          <div className={styles.emptyState}>No complaints found.</div>
        ) : (
          complaints.map((c) => (
            <div key={c.id} className={styles.item}>
              <strong>{c.issue}</strong>
              <br />
              <span
                className={`${styles.badge} ${styles[c.status]}`}
              >
                {c.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;