import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import styles from "../../stylesheet/adminAnalytics.module.css";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const AdminAnalytics = () => {

  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {

    const fakeOrders = [
      { id: 1, service: "baby", location: "Hyderabad", rating: 4.6, month: "Jan" },
      { id: 2, service: "pet", location: "Hyderabad", rating: 4.1, month: "Jan" },
      { id: 3, service: "elder", location: "Vizag", rating: 4.9, month: "Feb" },
      { id: 4, service: "baby", location: "Vijayawada", rating: 4.2, month: "Feb" },
      { id: 5, service: "pet", location: "Hyderabad", rating: 3.2, month: "Mar" },
      { id: 6, service: "elder", location: "Vizag", rating: 4.8, month: "Apr" },
      { id: 7, service: "baby", location: "Hyderabad", rating: 4.7, month: "Apr" },
    ];

    const fakeWorkers = [
      { name: "Ravi", rating: 4.8, orders: 32 },
      { name: "Anjali", rating: 3.4, orders: 18 },
      { name: "Kiran", rating: 4.9, orders: 41 },
      { name: "Suresh", rating: 2.9, orders: 9 }
    ];

    setOrders(fakeOrders);
    setWorkers(fakeWorkers);

  }, []);

  /* KPI */

  const totalOrders = orders.length;

  const avgRating =
    orders.length
      ? orders.reduce((a, b) => a + b.rating, 0) / orders.length
      : 0;

  const badReviews =
    orders.filter(o => o.rating < 3).length;

  const cities =
    [...new Set(orders.map(o => o.location))];

  /* LOCATION */

  const locationMap = {};
  orders.forEach(o => {
    locationMap[o.location] = (locationMap[o.location] || 0) + 1;
  });

  const locationData = Object.keys(locationMap).map(loc => ({
    location: loc,
    orders: locationMap[loc]
  }));

  /* SERVICE */

  const serviceMap = {};
  orders.forEach(o => {
    serviceMap[o.service] = (serviceMap[o.service] || 0) + 1;
  });

  const serviceData = Object.keys(serviceMap).map(s => ({
    name: s,
    value: serviceMap[s]
  }));

  /* MONTH */

  const monthMap = {};
  orders.forEach(o => {
    monthMap[o.month] = (monthMap[o.month] || 0) + 1;
  });

  const trendData = Object.keys(monthMap).map(m => ({
    month: m,
    orders: monthMap[m]
  }));

  /* WORKERS */

  const topWorkers =
    [...workers].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const lowWorkers =
    [...workers].sort((a, b) => a.rating - b.rating).slice(0, 2);

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Admin Intelligence Dashboard</h2>

      {/* KPI */}
      <div className={styles.analyticsContainer}>

        <div className={styles.analyticsCard}>
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>

        <div className={styles.analyticsCard}>
          <h4>Average Rating</h4>
          <p>{avgRating.toFixed(1)} ⭐</p>
        </div>

        <div className={styles.analyticsCard}>
          <h4>Bad Reviews</h4>
          <p>{badReviews}</p>
        </div>

        <div className={styles.analyticsCard}>
          <h4>Active Cities</h4>
          <p>{cities.length}</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className={styles.chartsContainer}>

        <div className={styles.chartCard}>
          <h4>Orders by Location</h4>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={locationData}>
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h4>Service Demand</h4>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={serviceData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* TREND */}
      <div className={styles.chartCard}>
        <h4>Monthly Booking Trend</h4>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* WORKERS */}
      <div className={styles.chartsContainer}>

        <div className={styles.chartCard}>
          <h4>Top Workers ⭐</h4>

          {topWorkers.map(w => (
            <p key={w.name}>
              {w.name} — {w.rating} ⭐ ({w.orders} orders)
            </p>
          ))}
        </div>

        <div className={styles.chartCard}>
          <h4>Workers Needing Attention ⚠</h4>

          {lowWorkers.map(w => (
            <p key={w.name}>
              {w.name} — {w.rating} ⭐
            </p>
          ))}
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;