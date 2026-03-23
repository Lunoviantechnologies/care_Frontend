import React from "react";

import baby1 from "../assets/baby1.jpg";
import baby2 from "../assets/baby2.jpg";
import baby3 from "../assets/baby3.webp";
import baby4 from "../assets/baby4.jpg";
import baby5 from "../assets/baby5.jpg";

import pet1 from "../assets/pet1.jpg";
import pet2 from "../assets/pet2.jpg";
import pet3 from "../assets/pet3.jpg";
import pet5 from "../assets/pet5.jpg";
import pet6 from "../assets/pet6.jpg";

import elder1 from "../assets/elder1.jpg";
import elder2 from "../assets/elder2.jpg";
import elder3 from "../assets/elder3.jpg";
import elder4 from "../assets/elder4.jpg";
import elder5 from "../assets/elder5.jpg";

import pregnant1 from "../assets/pregnant1.jpeg";
import pregnant2 from "../assets/pregnant2.jpg";
import pregnant3 from "../assets/pregnant3.jpg";
import pregnant4 from "../assets/pregnant4.jpg";

import kitchen1 from "../assets/kitchen1.jpg";
import kitchen2 from "../assets/kitchen2.jpg";
import kitchen3 from "../assets/kitchen3.jpg";
import kitchen4 from "../assets/kitchen4.jpg";
import kitchen5 from "../assets/kitchen5.jpg";

import "../styleSheets/home.css";
import { useNavigate } from "react-router-dom";
import FAQ from "./FAQ";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

const Home = () => {

    const imageGroups = [
        [baby1, baby2, baby3, baby4, baby5],
        [pet1, pet2, pet3, pet5, pet6],
        [elder1, elder2, elder3, elder4, elder5],
        [kitchen1, kitchen2, kitchen3, kitchen4, kitchen5],
        [pregnant1, pregnant2, pregnant3, pregnant4],
    ];

    const navigate = useNavigate();

    const handleClickService = (serviceType) => {
        navigate(`/services/${serviceType}`);
    };

    return (
        <div className="home-background">
            <div className="container py-5">

                {/* ── HERO ── */}
                <div className="row align-items-center mb-5">

                    {/* LEFT SIDE */}
                    <div className="col-lg-5 mb-4">

                        <span className="hero-tagline">⭐ Trusted by 10,000+ families</span>

                        <h1 className="fw-bold mb-4">
                            Trusted Home Care Services, Delivered to Your Doorstep
                        </h1>

                        <p className="mb-4" style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "0.97rem" }}>
                            Professional, compassionate care for the ones who matter most — baby care, elder care, pet care, pregnancy care, and home assistance. Verified caregivers, zero hassle.
                        </p>

                        <div className="service-panel">

                            <h5 className="mb-4">What are you looking for?</h5>

                            <div className="service-grid">

                                <div
                                    className="service-card"
                                    style={{ backgroundImage: `url(${baby1})` }}
                                    onClick={() => handleClickService("baby_care")}
                                >
                                    <span>Baby Care</span>
                                </div>

                                <div
                                    className="service-card"
                                    style={{ backgroundImage: `url(${pet1})` }}
                                    onClick={() => handleClickService("pet_care")}
                                >
                                    <span>Pet Care</span>
                                </div>

                                <div
                                    className="service-card"
                                    style={{ backgroundImage: `url(${elder1})` }}
                                    onClick={() => handleClickService("elder_care")}
                                >
                                    <span>Elder Care</span>
                                </div>

                                <div
                                    className="service-card"
                                    style={{ backgroundImage: `url(${pregnant1})` }}
                                    onClick={() => handleClickService("pregnancy_care")}
                                >
                                    <span>Pregnancy Care</span>
                                </div>

                                <div
                                    className="service-card"
                                    style={{ backgroundImage: `url(${kitchen1})` }}
                                    onClick={() => handleClickService("kitchen_care")}
                                >
                                    <span>Home Assistance</span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE SLIDER */}
                    <div className="col-lg-7 ps-lg-3">

                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            autoplay={{ delay: 2800, disableOnInteraction: false }}
                            loop={true}
                        >
                            {imageGroups.map((group, index) => (
                                <SwiperSlide key={index}>
                                    <div className="slider-grid">
                                        {group.map((img, i) => (
                                            <div className="slider-item" key={i}>
                                                <img src={img} className="slider-img" alt="care" />
                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>

                </div>

                {/* ── STATS BAR ── */}
                <div className="stats-bar mb-5">
                    <div className="stat-item">
                        <div className="stat-number">10K+</div>
                        <div className="stat-label">Happy Families</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Verified Caregivers</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">4.9★</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support Available</div>
                    </div>
                </div>

                {/* ── FEATURES ── */}
                <div className="mb-5 text-center">
                    <span className="section-eyebrow">Why Choose Us</span>
                    <h2 className="section-heading">Care That Goes the Extra Mile</h2>
                    <p className="section-subheading mx-auto">We're not just a platform — we're your trusted partner in care, built on transparency and love.</p>
                </div>

                <div className="features-row mb-5">
                    {[
                        { icon: "🛡️", title: "Background Verified", desc: "All caregivers undergo identity verification, document verification, and background checks to ensure safety." },
                        { icon: "📍", title: "Real-Time Tracking", desc: "Monitor your caregiver's location and includes GPS tracking, emergency alerts, and real-time monitoring for complete security." },
                        { icon: "🔄", title: "Flexible Scheduling", desc: "Book once or set a recurring schedule — we adapt to your routine." },
                        { icon: "💬", title: "24/7 Support", desc: "Our team is always available to help resolve any concerns instantly." },
                    ].map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <h6>{f.title}</h6>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* ── TESTIMONIALS ── */}
                <div className="mb-2 text-center">
                    <span className="section-eyebrow">Testimonials</span>
                    <h2 className="section-heading">What Families Say</h2>
                </div>

                <div className="row g-4 mb-5">
                    {[
                        {
                            text: "The baby care service was exceptional. Our caregiver was so warm and attentive — we felt completely at ease leaving our little one.",
                            author: "Priya Nair",
                            role: "Mom of a 7-month-old",
                            stars: "★★★★★"
                        },
                        {
                            text: "My elderly mother needed daily assistance, and the elder care team has been a blessing. Professional, patient, and truly caring.",
                            author: "Rahul Mehta",
                            role: "Son & caregiver",
                            stars: "★★★★★"
                        },
                        {
                            text: "Booked a pet sitter for 3 days and our dog had the best time. The daily photo updates were such a sweet touch!",
                            author: "Ananya Sharma",
                            role: "Fur parent",
                            stars: "★★★★☆"
                        },
                    ].map((t, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="testimonial-card h-100">
                                <div className="stars">{t.stars}</div>
                                <div className="testimonial-quote">"</div>
                                <p className="testimonial-text">{t.text}</p>
                                <div className="testimonial-author">{t.author}</div>
                                <div className="testimonial-role">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── APP DOWNLOAD ── */}
                <div className="app-download-section">

                    <div className="row align-items-center">

                        <div className="col-md-6 mb-4 mb-md-0">
                            <span className="section-eyebrow" style={{ color: "rgba(200,148,74,0.8)" }}>Mobile App</span>
                            <h2 className="app-title">Manage Care From Anywhere</h2>
                            <p className="app-subtitle">
                                Book sessions, track progress in real time, and stay connected
                                with your caregiver — all from your pocket.
                            </p>
                        </div>

                        <div className="col-md-6 text-md-end text-center">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="store-btn me-3"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="store-btn"
                            />
                        </div>

                    </div>

                </div>

                {/* ── FAQ ── */}
                <div className="faq-body">
                    <FAQ />
                </div>

            </div>
        </div>
    );
};

export default Home;
