import { useState } from "react";
import styles from "../stylesheet/adminNotifications.module.css";

const AdminNotifications = () => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New booking received",
      time: "2 min ago",
      type: "booking",
      read: false,
    },
    {
      id: 2,
      message: "Worker registered successfully",
      time: "10 min ago",
      type: "worker",
      read: false,
    },
    {
      id: 3,
      message: "Complaint submitted",
      time: "1 hour ago",
      type: "complaint",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllRead = () => {
    setNotifications(
      notifications.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <div className={styles.wrapper}>

      {/* Bell */}
      <div
        className={styles.icon}
        onClick={() => setOpen(!open)}
      >
        🔔

        {unreadCount > 0 && (
          <span className={styles.notificationBadge}>
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>

          <div className={styles.header}>
            <span>Notifications</span>

            {unreadCount > 0 && (
              <button onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`
                ${styles.item}
                ${!n.read ? styles.unread : ""}
                ${styles[n.type]}
              `}
              onClick={() => markAsRead(n.id)}
            >
              <div className={styles.message}>
                {n.message}
              </div>

              <div className={styles.time}>
                {n.time}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AdminNotifications;