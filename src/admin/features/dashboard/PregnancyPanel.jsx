import styles from "../../stylesheet/pregnancyPanel.module.css";

const PregnancyPanel = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🤰 Pregnancy Support</h3>
      <ul className={styles.list}>
        <li>Daily rest schedule updated</li>
        <li>Nutrition plan created</li>
        <li>Doctor appointment reminder</li>
      </ul>
    </div>
  );
};

export default PregnancyPanel;