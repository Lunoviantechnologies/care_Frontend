import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../stylesheet/adminReviews.module.css";

const AdminReviews = () => {

  const { serviceType } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    const fakeReviews = [
      {
        id: 1,
        customer: "Rahul",
        worker: "Ravi",
        rating: 4.5,
        review: "Very good babysitter",
        sentiment: "positive",
        service: "baby",
      },
      {
        id: 2,
        customer: "Priya",
        worker: "Anjali",
        rating: 2,
        review: "Pet walker came late",
        sentiment: "negative",
        service: "pet",
      },
      {
        id: 3,
        customer: "Suresh",
        worker: "Kiran",
        rating: 5,
        review: "Excellent elder care support",
        sentiment: "positive",
        service: "elder",
      },
    ];

    const filtered = fakeReviews.filter(
      (r) => r.service === serviceType
    );

    setReviews(filtered);

  }, [serviceType]);

  return (

    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>
          {serviceType.toUpperCase()} Order Reviews
        </h2>
      </div>

      <div className={styles.tableCard}>

        {reviews.length === 0 ? (

          <div className={styles.emptyState}>
            No reviews available
          </div>

        ) : (

          <div className={styles.tableWrapper}>
            <table className={styles.table}>

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Worker</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {reviews.map((r) => (

                  <tr key={r.id}>

                    <td>{r.customer}</td>
                    <td>{r.worker}</td>
                    <td>⭐ {r.rating}</td>

                    <td>
                      <span
                        className={
                          r.sentiment === "positive"
                            ? styles.positive
                            : styles.negative
                        }
                      >
                        {r.review}
                      </span>
                    </td>

                    <td>
                      {r.sentiment === "negative" && (
                        <button className={styles.dangerBtn}>
                          Take Action
                        </button>
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

        )}

      </div>

    </div>
  );
};

export default AdminReviews;