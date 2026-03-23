import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import styles from "../stylesheet/adminLayout.module.css";

const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`${styles.wrapper} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClose
        }`}
    >

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className={styles.main}>

        {/* Navbar */}
        <AdminNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <main className={`${styles.content} ${styles.pageTransition}`}>

          <div className={styles.innerContainer}>
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;