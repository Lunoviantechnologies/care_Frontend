import React from "react";
import "../styleSheets/aboutus.css";

const stats = [
    { value: "10,000+", label: "Families Served" },
    { value: "5,000+", label: "Verified Caregivers" },
    { value: "50+", label: "Cities Across India" },
    { value: "98%", label: "Satisfaction Rate" },
];

const services = [
    {
        icon: "🍼",
        title: "Baby Care",
        description:
            "Certified nannies and babysitters trained in infant care, early childhood development, and emergency response.",
    },
    {
        icon: "🧓",
        title: "Elder Care",
        description:
            "Compassionate companions and trained attendants for seniors — from daily assistance to specialized medical support.",
    },
    {
        icon: "🐾",
        title: "Pet Care",
        description:
            "Trusted pet sitters and dog walkers who treat your furry family members with love and professional care.",
    },
    {
        icon: "🍽️",
        title: "Home Assistance",
        description:
            "Reliable helpers for everyday kitchen and household tasks — including chopping, cooking prep, cleaning, and serving — so your home runs smoothly.",
    },
    {
        icon: "🤰",
        title: "Pregnancy Care",
        description:
            "Dedicated support for expectant mothers with trained attendants for prenatal assistance, comfort care, and postnatal recovery at home.",
    },
];

const values = [
    {
        icon: "✅",
        title: "Strict Verification",
        description:
            "Every caregiver undergoes thorough background checks, ID verification, and reference validation before joining our platform.",
    },
    {
        icon: "🎓",
        title: "Professional Training",
        description:
            "Our caregivers are trained in first aid, childcare, elderly support, and safety protocols.",
    },
    {
        icon: "📡",
        title: "Safety Monitoring",
        description:
            "Advanced technology enables real-time safety tracking, check-ins, and transparent caregiver activity logs.",
    },
    {
        icon: "🤝",
        title: "Trusted Matches",
        description:
            "Our smart matching system connects families with the right caregiver based on needs, location, and personality fit.",
    },
];

const AboutUs = () => {
    return (
        <main className="about-page" aria-label="About Us">
            {/* Hero Section */}
            <section className="about-hero" aria-labelledby="about-hero-heading">
                <div className="hero-bg-shapes" aria-hidden="true">
                    <span className="shape shape-1" />
                    <span className="shape shape-2" />
                    <span className="shape shape-3" />
                </div>
                <div className="container hero-content">
                    <span className="hero-eyebrow">Who We Are</span>
                    <h1 id="about-hero-heading">
                        About Our <span className="highlight">Caregiver Service</span>{" "}
                        Platform
                    </h1>
                    <p className="hero-tagline">
                        India's most trusted platform connecting families with verified,
                        professional caregivers — for every stage of life.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission" aria-labelledby="mission-heading">
                <div className="container mission-grid">
                    <div className="mission-text">
                        <h2 id="mission-heading">Our Mission</h2>
                        <p>
                            We are a <strong>trusted caregiver service platform in India</strong>{" "}
                            dedicated to connecting families with verified and professional
                            caregivers. Our mission is to provide safe and reliable{" "}
                            <strong>baby care</strong>, <strong>elder care</strong>, and{" "}
                            <strong>pet care services at home</strong>.
                        </p>
                        <p>
                            Through advanced technology, safety monitoring, and strict
                            verification processes, we ensure every caregiver is trusted,
                            trained, and reliable.
                        </p>
                        <p>
                            Our goal is to make <strong>home care services in India</strong>{" "}
                            accessible, safe, and convenient for families across the country.
                        </p>
                    </div>
                    <div className="mission-visual" aria-hidden="true">
                        <div className="mission-card">
                            <span className="mission-icon">🏡</span>
                            <p>Care that feels like family</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats" aria-label="Platform statistics">
                <div className="container">
                    <ul className="stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="stat-item">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Services Section */}
            <section className="about-services" aria-labelledby="services-heading">
                <div className="container">
                    <h2 id="services-heading">Our Care Services</h2>
                    <p className="section-sub">
                        Comprehensive, professional home care solutions tailored for every
                        family.
                    </p>
                    <ul className="services-grid" role="list">
                        {services.map((service) => (
                            <li key={service.title} className="service-card">
                                <span className="service-icon" aria-hidden="true">
                                    {service.icon}
                                </span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values" aria-labelledby="values-heading">
                <div className="container">
                    <h2 id="values-heading">Why Families Trust Us</h2>
                    <p className="section-sub">
                        Safety, reliability, and care are the pillars of everything we do.
                    </p>
                    <ul className="values-grid" role="list">
                        {values.map((val) => (
                            <li key={val.title} className="value-card">
                                <span className="value-icon" aria-hidden="true">
                                    {val.icon}
                                </span>
                                <div>
                                    <h3>{val.title}</h3>
                                    <p>{val.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta" aria-labelledby="cta-heading">
                <div className="container cta-inner">
                    <h2 id="cta-heading">Find the Right Caregiver Today</h2>
                    <p>
                        Join thousands of families across India who trust our platform for
                        safe, verified, and compassionate home care services.
                    </p>
                    <div className="cta-buttons">
                        <button className="btn-primary" type="button">
                            Find a Caregiver
                        </button>
                        <button className="btn-secondary" type="button">
                            Become a Caregiver
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
