import styles from "../../stylesheet/babyPanel.module.css";

const BabyPanel = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>👶 Baby Care Alerts</h3>
      <ul className={styles.list}>
        <li>Feeding schedule updated</li>
        <li>Nanny shift started</li>
        <li>Child activity logged</li>
      </ul>
    </div>
  );
};

export default BabyPanel;