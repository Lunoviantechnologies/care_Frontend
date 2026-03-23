import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../stylesheet/adminWorkers.module.css";

const AdminWorkers = () => {

  const { serviceType } = useParams();
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {

    const fakeData = [
      {
        id: 1, name: "Ravi Kumar", service: "baby",
        address: "Hyderabad", handicap: "No",
        lat: 17.385, lng: 78.4867,
        temperature: "36.6°C", healthIssue: "No",
        locationReached: true, disabled: false,
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        startPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        endPhoto: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2, name: "Anjali Sharma", service: "pet",
        address: "Vijayawada",
        lat: 16.5062, lng: 80.648,
        temperature: "37°C", healthIssue: "Cold",
        locationReached: true, disabled: false,
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        startPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        endPhoto: "https://randomuser.me/api/portraits/women/45.jpg"
      }
    ];

    const filtered = fakeData.filter(
      w =>
        w.service === serviceType &&
        w.name.toLowerCase().includes(search.toLowerCase())
    );

    setWorkers(filtered);

  }, [serviceType, search]);

  const toggleDisable = (id) => {
    setWorkers(prev =>
      prev.map(w =>
        w.id === id ? { ...w, disabled: !w.disabled } : w
      )
    );
  };

  const checkFace = (start, end) => {
    return start === end ? "Matched" : "Mismatch";
  };

  return (

    <div className={styles.container}>

      <h2 className={styles.title}>
        {serviceType?.toUpperCase()} Workers
      </h2>

      <input
        className={styles.search}
        placeholder="Search worker"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>

          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Address</th>
              <th>Handicap</th>
              <th>Start</th>
              <th>End</th>
              <th>Face Check</th>
              <th>Temperature</th>
              <th>Health</th>
              <th>Location</th>
              <th>Map</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {workers.map(w => (

              <tr key={w.id}>

                <td>
                  <img src={w.photo} className={styles.workerPhoto} />
                </td>

                <td
                  className={styles.name}
                  onClick={() => setSelectedWorker(w)}
                >
                  {w.name}
                </td>

                <td>{w.address}</td>
                <td>{w.handicap || "No"}</td>

                <td>
                  <img src={w.startPhoto} className={styles.workPhoto} />
                </td>

                <td>
                  <img src={w.endPhoto} className={styles.workPhoto} />
                </td>

                <td>{checkFace(w.startPhoto, w.endPhoto)}</td>
                <td>{w.temperature}</td>
                <td>{w.healthIssue}</td>
                <td>{w.locationReached ? "Yes" : "No"}</td>

                <td>
                  <a
                    href={`https://www.google.com/maps?q=${w.lat},${w.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Map
                  </a>
                </td>

                <td>
                  <button
                    className={styles.statusBtn}
                    onClick={() => toggleDisable(w.id)}
                  >
                    {w.disabled ? "Disabled" : "Active"}
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {/* MODAL */}

      {selectedWorker && (

        <div className={styles.modalOverlay}>

          <div className={styles.modalBox}>

            <h3>{selectedWorker.name}</h3>

            <img src={selectedWorker.photo} className={styles.modalImage} />

            <p><b>Address:</b> {selectedWorker.address}</p>
            <p><b>Temperature:</b> {selectedWorker.temperature}</p>
            <p><b>Health:</b> {selectedWorker.healthIssue}</p>

            <button
              className={styles.closeBtn}
              onClick={() => setSelectedWorker(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminWorkers;