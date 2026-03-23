import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../stylesheet/customerBookings.module.css";

const CustomerBookings = () => {
  const { serviceType } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        customer: "Ravi",
        date: "2026-03-20",
        time: "10:00 AM",
        status: "CONFIRMED",
        worker: "Anjali",
      },
      {
        id: 2,
        customer: "Kiran",
        date: "2026-03-21",
        time: "02:00 PM",
        status: "PENDING",
        worker: "Not Assigned",
      },
    ];
    setBookings(data);
  }, [serviceType]);

  return (
    <div className={`${styles.container} ${styles[serviceType]}`}>
      <h3 className={styles.title}>
        📅 {serviceType?.toUpperCase()} BOOKINGS
      </h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Worker</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={b.id}>
              <td>{i + 1}</td>
              <td>{b.customer}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>
                <span className={`${styles.badge} ${styles[b.status.toLowerCase()]}`}>
                  {b.status}
                </span>
              </td>
              <td>{b.worker}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerBookings;