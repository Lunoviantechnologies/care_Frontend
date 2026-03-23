import styles from "../../stylesheet/kitchenPanel.module.css";

const KitchenPanel = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🍳 Kitchen Tasks</h3>
      <ul className={styles.list}>
        <li>Meal preparation scheduled</li>
        <li>Grocery restock needed</li>
        <li>Utensil cleaning completed</li>
      </ul>
    </div>
  );
};

export default KitchenPanel;