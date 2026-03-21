import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBaby, FaPaw, FaUserNurse, FaHeartbeat, FaUtensils,
  FaCalendarCheck, FaClipboardList, FaStar, FaArrowRight,
  FaBell, FaCheckCircle, FaClock,
} from "react-icons/fa";
import "../styleSheets/dashboard.css";
import FAQ from "./FAQ";

import baby1 from "../assets/baby1.jpg";
import baby2 from "../assets/baby2.jpg";
import baby3 from "../assets/baby3.webp";
import baby4 from "../assets/baby4.jpg";

import pet1 from "../assets/pet1.jpg";
import pet2 from "../assets/pet2.jpg";
import pet3 from "../assets/pet3.jpg";
import pet4 from "../assets/pet4.jpg";

import elder1 from "../assets/elder1.jpg";
import elder2 from "../assets/elder2.jpg";
import elder3 from "../assets/elder3.jpg";
import elder4 from "../assets/elder4.jpg";

import pregnant1 from "../assets/pregnant1.jpeg";
import pregnant2 from "../assets/pregnant2.jpg";
import pregnant3 from "../assets/pregnant3.jpg";
import pregnant4 from "../assets/pregnant4.jpg";

import kitchen1 from "../assets/kitchen1.jpg";
import kitchen2 from "../assets/kitchen2.jpg";
import kitchen3 from "../assets/kitchen3.jpg";
import kitchen4 from "../assets/kitchen4.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ── Service catalogue ── */
const SERVICES = [
  {
    key: "baby",
    label: "Baby Care",
    tagline: "Nurturing hands for your little one",
    icon: FaBaby,
    images: [baby1, baby2, baby3, baby4],
    color: "#f06292",
    bg: "linear-gradient(135deg,#fce4ec 0%,#f8bbd0 100%)",
    accent: "#e91e63",
    badge: "Most Booked",
  },
  {
    key: "pet",
    label: "Pet Care",
    tagline: "Tail-wagging love & expert attention",
    icon: FaPaw,
    images: [pet1, pet2, pet3, pet4],
    color: "#C8944A",
    bg: "linear-gradient(135deg,#fff8e1 0%,#ffecb3 100%)",
    accent: "#a87438",
    badge: null,
  },
  {
    key: "elder",
    label: "Elder Care",
    tagline: "Dignified care for your loved seniors",
    icon: FaUserNurse,
    images: [elder1, elder2, elder3, elder4],
    color: "#7986cb",
    bg: "linear-gradient(135deg,#ede7f6 0%,#d1c4e9 100%)",
    accent: "#5c6bc0",
    badge: null,
  },
  {
    key: "pregnancy",
    label: "Pregnancy Care",
    tagline: "Gentle support through every trimester",
    icon: FaHeartbeat,
    images: [pregnant1, pregnant2, pregnant3, pregnant4],
    color: "#f4a261",
    bg: "linear-gradient(135deg,#fff3e0 0%,#ffe0b2 100%)",
    accent: "#e07b39",
    badge: "New",
  },
  {
    key: "kitchen",
    label: "Home Assistance",
    tagline: "Cooking, cleaning & household help",
    icon: FaUtensils,
    images: [kitchen1, kitchen2, kitchen3, kitchen4],
    color: "#4caf82",
    bg: "linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%)",
    accent: "#388e3c",
    badge: null,
  },
];

/* ── Quick-stat cards ── */
const QUICK_STATS = [
  { icon: FaCalendarCheck, label: "Active Bookings", value: "2", accent: "#4caf82" },
  { icon: FaClipboardList, label: "Past Sessions", value: "14", accent: "#7986cb" },
  { icon: FaStar, label: "Your Rating Given", value: "4.8", accent: "#C8944A" },
  { icon: FaClock, label: "Hours of Care", value: "68", accent: "#f06292" },
];

/* ── Notifications ── */
const NOTIFICATIONS = [
  { icon: FaCheckCircle, color: "#4caf82", text: "Your Baby Care session is confirmed for tomorrow, 9 AM.", time: "2h ago" },
  { icon: FaBell, color: "#C8944A", text: "New caregiver profile available in your area — Elder Care.", time: "Yesterday" },
  { icon: FaStar, color: "#7986cb", text: "Please rate your last Pet Care session.", time: "2 days ago" },
];

/* ─────────────────────────────────────────────── */

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("services");

  const firstName = user?.name?.split(" ")[0] || user?.user_id || "there";

  return (
    <div className="db">

      {/* ── Background layers ── */}
      <div className="db__bg-ring db__bg-ring--1" aria-hidden="true" />
      <div className="db__bg-ring db__bg-ring--2" aria-hidden="true" />
      <div className="db__bg-dots" aria-hidden="true" />

      <div className="db__inner">

        {/* ══ HERO GREETING ══ */}
        <section className="db__hero">
          <div className="db__hero-text">
            <p className="db__hello">Good to see you 👋</p>
            <h1 className="db__name">Hello, {firstName}!</h1>
            <p className="db__tagline">
              What kind of care can we arrange for you today?
            </p>
          </div>

          {/* Quick stats */}
          <div className="db__stats">
            {QUICK_STATS.map((s, i) => (
              <div className="db__stat-card" key={i} style={{ "--sa": s.accent }}>
                <s.icon className="db__stat-icon" />
                <span className="db__stat-value">{s.value}</span>
                <span className="db__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SERVICES TAB ══ */}
        {activeTab === "services" && (
          <section className="db__section" aria-label="Service types">
            <h2 className="db__section-title">Browse Services</h2>
            <p className="db__section-sub">
              Click a service to explore caregivers, packages & availability.
            </p>

            <div className="db__service-grid">
              {SERVICES.map((svc, i) => (
                <button
                  key={svc.key}
                  className="db__svc-card"
                  style={{
                    "--svc-bg": svc.bg,
                    "--svc-color": svc.color,
                    "--svc-accent": svc.accent,
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onClick={() => navigate(`/dashboard/services/${svc.key}`)}
                  aria-label={`Go to ${svc.label}`}
                >
                  {svc.badge && (
                    <span className="db__svc-badge">{svc.badge}</span>
                  )}

                  <div className="db__svc-icon-wrap">
                    <svc.icon className="db__svc-icon" />
                  </div>

                  <h3 className="db__svc-name">{svc.label}</h3>
                  <p className="db__svc-tagline">{svc.tagline}</p>

                  <span className="db__svc-cta">
                    Explore <FaArrowRight />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ══ SERVICE IMAGE SLIDER ══ */}
        <div className="db__gallery-wrap">
          <div className="db__gallery-header">
            <h2 className="db__section-title">Care in Action</h2>
            <p className="db__section-sub">Real moments from our verified caregivers</p>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.3}
            centeredSlides={false}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              480: { slidesPerView: 1.8, spaceBetween: 14 },
              640: { slidesPerView: 2.4, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 18 },
              1024: { slidesPerView: 4.2, spaceBetween: 20 },
            }}
          >
            {SERVICES.flatMap((svc) =>
              svc.images.map((imgSrc, i) => (
                <SwiperSlide key={`${svc.key}-${i}`}>
                  <div
                    className="db__svc-slide"
                    onClick={() => navigate(`/dashboard/services/${svc.key}`)}
                    style={{ "--slide-accent": svc.accent }}
                  >
                    <div className="db__svc-slide-img-wrap">
                      <img src={imgSrc} alt={svc.label} className="db__svc-slide-img" />
                      <div className="db__svc-slide-overlay" />
                    </div>
                    <div className="db__svc-slide-footer">
                      <span className="db__svc-slide-label">{svc.label}</span>
                      <svc.icon className="db__svc-slide-icon" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        {/* ── APP DOWNLOAD ── */}
        <div className="db-app-download-section">

          <div className="row align-items-center">

            <div className="col-md-6 mb-4 mb-md-0">
              <span className="db-section-eyebrow" style={{ color: "rgba(200,148,74,0.8)" }}>Mobile App</span>
              <h2 className="db-app-title">Manage Care From Anywhere</h2>
              <p className="db-app-subtitle">
                Book sessions, track progress in real time, and stay connected
                with your caregiver — all from your pocket.
              </p>
            </div>

            <div className="col-md-6 text-md-end text-center">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="db-store-btn me-3"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="db-store-btn"
              />
            </div>

          </div>

        </div>

        <div className="db-faq-body">
          <FAQ />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;