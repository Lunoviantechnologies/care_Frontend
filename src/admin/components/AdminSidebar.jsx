import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../stylesheet/adminSidebar.module.css";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: "📊" },
    { name: "Workers", path: "workers", icon: "👥" },
    { name: "Bookings", path: "bookings", icon: "📅" },
    { name: "Complaints", path: "complaints", icon: "⚠️" },
    { name: "Safety", path: "safety", icon: "🛡️" },
    { name: "Reports", path: "reports", icon: "📈" },
  ];

  const bottomMenu = [
    { name: "Reviews", path: "reviews", icon: "⭐" },
    { name: "Analytics", path: "analytics", icon: "📊" }
  ];

  const handleNavigation = (path) => {
    navigate(`/admin/${serviceType}/${path}`);
    setSidebarOpen(false);
  };

  const serviceNames = {
    baby: "Baby Care",
    pet: "Pet Care",
    elder: "Elder Care",
    kitchen: "Kitchen Service",
    pregnancy: "Pregnancy Care"
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          ${styles.sidebar}
          ${styles[`${serviceType}Theme`]}
          ${sidebarOpen ? styles.open : ""}
        `}
      >
        <div className={styles.title}>Care Admin</div>

        <div className={styles.service}>
          {serviceNames[serviceType]} Panel
        </div>

        {/* MAIN MENU */}
        <div className={styles.menu}>
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(`/${item.path}`);

            return (
              <div
                key={item.name}
                className={`${styles.menuItem} ${isActive ? styles.active : ""
                  }`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* BOTTOM MENU */}
        <div className={`${styles.menu} ${styles.bottomMenu}`}>
          {bottomMenu.map((item) => {
            const isActive = location.pathname.includes(`/${item.path}`);

            return (
              <div
                key={item.name}
                className={`${styles.menuItem} ${isActive ? styles.active : ""
                  }`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;