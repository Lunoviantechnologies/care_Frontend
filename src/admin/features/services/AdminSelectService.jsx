import { useNavigate } from "react-router-dom";
import styles from "../../stylesheet/adminSelectService.module.css";

const services = [
  { name: "Baby Care", key: "baby", icon: "👶" },
  { name: "Pet Care", key: "pet", icon: "🐶" },
  { name: "Elder Care", key: "elder", icon: "👴" },
  { name: "Kitchen Help", key: "kitchen", icon: "🍳" },
  { name: "Pregnancy Support", key: "pregnancy", icon: "🤰" },
];

const AdminSelectService = () => {
  const navigate = useNavigate();

  const handleService = (service) => {
    navigate(`/admin/${service}/dashboard`);
  };

  return (
    <div className={styles.page}>

      <h2 className={styles.title}>Select Service</h2>

      <div className={styles.grid}>

        {services.map((service) => (

          <div
            key={service.key}
            className={styles.card}
            onClick={() => handleService(service.key)}
          >

            <div className={styles.icon}>
              {service.icon}
            </div>

            <h3>{service.name}</h3>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminSelectService;