import styles from "../../stylesheet/elderPanel.module.css";

const ElderPanel = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>👴 Elder Health Monitor</h3>
      <ul className={styles.list}>
        <li>Medicine reminder active</li>
        <li>Doctor visit scheduled</li>
        <li>Emergency contact verified</li>
      </ul>
    </div>
  );
};

export default ElderPanel;