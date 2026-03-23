import styles from "../../stylesheet/petPanel.module.css";

const PetPanel = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🐶 Pet Health Tracker</h3>
      <ul className={styles.list}>
        <li>Rabies vaccine due</li>
        <li>Pet walking scheduled</li>
        <li>Health check completed</li>
      </ul>
    </div>
  );
};

export default PetPanel;