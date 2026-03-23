import { useParams } from "react-router-dom";
import AdminBabydashboard from "./AdminBabydashboard";
import AdminPetdashboard from "./AdminPetdashboard";
import AdminElderdashboard from "./AdminElderdashboard";
import AdminKitchendashboard from "./AdminKitchendashboard";
import AdminPregnancydashboard from "./AdminPregnancydashboard";
import styles from "../../stylesheet/AdminDashboard.module.css";

const AdminDashboard = () => {
  const { serviceType } = useParams();

  return (
    <div
      className={`${styles.dashboard} ${styles[`${serviceType}Dashboard`]
        }`}
    >
      <h2 className={styles.dashboardTitle}>
        {serviceType?.toUpperCase()} DASHBOARD
      </h2>

      {serviceType === "baby" && <AdminBabydashboard />}
      {serviceType === "pet" && <AdminPetdashboard />}
      {serviceType === "elder" && <AdminElderdashboard />}
      {serviceType === "kitchen" && <AdminKitchendashboard />}
      {serviceType === "pregnancy" && <AdminPregnancydashboard />}
    </div>
  );
};

export default AdminDashboard;