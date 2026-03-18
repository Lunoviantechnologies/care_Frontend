import React, { useState } from "react";
import "../styleSheets/servicesDisplay/servicePregnancy.css";

// Import your actual images from assets
import pregnancyCareHero from "../assets/pregnant2.jpg";
import pregnancyOverlay from "../assets/pregnant6.png";

const stats = [
    { value: "4,500+", label: "Mothers Supported" },
    { value: "900+", label: "Pregnancy Specialists" },
    { value: "12,000+", label: "Care Sessions" },
    { value: "4.9 ⭐", label: "Average Rating" },
];

const features = [
    {
        icon: "🏠",
        title: "Daily Assistance",
        description:
            "Trained caregivers help with everyday tasks, household chores, and personal care to keep expecting mothers comfortable.",
    },
    {
        icon: "🥗",
        title: "Nutrition Reminders",
        description:
            "Timely reminders for meals, supplements, and hydration routines tailored to the mother's prenatal dietary needs.",
    },
    {
        icon: "💛",
        title: "Emotional Support",
        description:
            "Compassionate companionship and emotional encouragement throughout every stage of pregnancy.",
    },
    {
        icon: "🛏️",
        title: "Rest & Comfort Assistance",
        description:
            "Support with positioning, rest routines, and comfort measures to ensure quality sleep and relaxation.",
    },
    {
        icon: "🏥",
        title: "Doctor Visit Support",
        description:
            "Caregivers assist with scheduling, travel support, and accompanying mothers to prenatal appointments.",
    },
    {
        icon: "👶",
        title: "Postpartum Preparation",
        description:
            "Guidance and preparation support to help families get ready for the arrival of their newborn.",
    },
];

const benefits = [
    {
        icon: "🎓",
        title: "Experienced Maternity Caregivers",
        description:
            "All caregivers are specially trained in prenatal and postnatal care with hands-on maternity experience.",
    },
    {
        icon: "🛡️",
        title: "Safe and Supportive Care",
        description:
            "We ensure a safe, nurturing environment for every expecting mother throughout their pregnancy journey.",
    },
    {
        icon: "✅",
        title: "Trusted Pregnancy Care Services",
        description:
            "Thousands of mothers across India trust our verified, professional pregnancy caregivers at home.",
    },
];

const testimonials = [
    { name: "Anjali Gupta", text: "Very supportive during my pregnancy. I felt cared for every single day." },
    { name: "Neha Sharma", text: "Professional and caring maternity support. Highly recommend to all mothers." },
    { name: "Pooja Jain", text: "Great help during my third trimester. The caregiver was warm and attentive." },
    { name: "Ritu Kapoor", text: "Reliable pregnancy caregiver service. Booking was smooth and hassle-free." },
    { name: "Sneha Shah", text: "Comforting support for expecting mothers. I never felt alone during my pregnancy." },
];

const faqs = [
    {
        question: "When should I book a pregnancy caregiver?",
        answer:
            "We recommend booking a pregnancy caregiver from the second trimester onward. However, caregivers are available from early pregnancy through postpartum recovery based on your needs.",
    },
    {
        question: "What does a pregnancy caregiver do at home?",
        answer:
            "A pregnancy caregiver assists with daily activities, nutrition and medication reminders, emotional support, rest assistance, and preparation for the baby's arrival. They also accompany mothers to doctor visits if needed.",
    },
    {
        question: "Are your pregnancy caregivers medically trained?",
        answer:
            "Our caregivers are trained in prenatal and postnatal care, basic first aid, nutrition guidance, and comfort care. For medical procedures, we coordinate with healthcare professionals as needed.",
    },
    {
        question: "Can I get postpartum care services after delivery?",
        answer:
            "Yes, we offer dedicated postpartum care services including newborn support, mother's recovery assistance, feeding guidance, and emotional support after childbirth.",
    },
    {
        question: "Is pregnancy care available for high-risk pregnancies?",
        answer:
            "We have caregivers experienced in supporting high-risk pregnancies under medical guidance. Please mention your condition during booking so we can assign the most suitable specialist.",
    },
    {
        question: "How are pregnancy caregivers verified?",
        answer:
            "Every caregiver undergoes background checks, ID verification, reference validation, and specialised maternity care training before being onboarded to our platform.",
    },
];

const ServicePregnancyCare = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="sprc-page" aria-label="Pregnancy Care Service">

            {/* ── Hero Section ── */}
            <section className="sprc-hero" aria-labelledby="sprc-hero-heading">

                {/* Background decorative blobs */}
                <div className="sprc-hero-bg-shapes" aria-hidden="true">
                    <span className="sprc-shape sprc-shape-1" />
                    <span className="sprc-shape sprc-shape-2" />
                    <span className="sprc-shape sprc-shape-3" />
                </div>

                {/* Two-column layout: text left, image right */}
                <div className="sprc-hero-inner">

                    {/* ── Left: Content ── */}
                    <div className="sprc-hero-content">
                        <span className="sprc-eyebrow">Pregnancy Care Services</span>
                        <h1 id="sprc-hero-heading">
                            Professional{" "}
                            <span className="sprc-highlight">Pregnancy Care</span>{" "}
                            Services at Home in India
                        </h1>
                        <p className="sprc-hero-desc">
                            Receive dedicated support during pregnancy with our professional
                            maternity care services. Our trained caregivers assist with daily
                            activities, nutrition reminders, and emotional support for expecting
                            mothers throughout every stage of their journey.
                        </p>
                        <div className="sprc-hero-btns">
                            <button className="sprc-btn-primary" type="button">
                                Book Pregnancy Caregiver
                            </button>
                            <button className="sprc-btn-secondary" type="button">
                                Get Maternity Support
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Pregnancy PNG ── */}
                    <div className="sprc-hero-visual" aria-hidden="true">
                        <img
                            src={pregnancyOverlay}
                            alt="pregnancy care illustration"
                            className="sprc-hero-pregnancy-img"
                        />
                    </div>

                </div>
            </section>

            {/* ── Stats / Trust Bar ── */}
            <section className="sprc-stats" aria-label="Trust statistics">
                <div className="sprc-container">
                    <ul className="sprc-stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="sprc-stat-item">
                                <span className="sprc-stat-value">{stat.value}</span>
                                <span className="sprc-stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="sprc-stats-note">
                        Mothers across India trust our professional pregnancy care services
                        for safe, compassionate, and dedicated maternity support at home.
                    </p>
                </div>
            </section>

            {/* ── Service Description ── */}
            <section className="sprc-about" aria-labelledby="sprc-about-heading">
                <div className="sprc-container sprc-about-grid">
                    <div className="sprc-about-text">
                        <span className="sprc-section-eyebrow">What We Offer</span>
                        <h2 id="sprc-about-heading">
                            Compassionate Maternity Care at Your Doorstep
                        </h2>
                        <p>
                            Our <strong>professional pregnancy care services</strong> are
                            designed to support expecting mothers through every trimester —
                            from prenatal assistance to postpartum recovery. Our verified
                            caregivers provide the comfort, care, and companionship that
                            every mother deserves.
                        </p>
                        <p>
                            Whether you need part-time help or a full-time{" "}
                            <strong>maternity caregiver at home</strong>, our trained
                            specialists are ready to provide safe, nurturing support tailored
                            to your needs.
                        </p>
                        <ul className="sprc-about-checklist">
                            <li>✔ First trimester through postpartum care</li>
                            <li>✔ Part-time, full-time &amp; live-in options</li>
                            <li>✔ Available across 50+ cities in India</li>
                            <li>✔ 24/7 booking &amp; support</li>
                        </ul>
                    </div>
                    <div className="sprc-about-visual" aria-hidden="true">
                        <img src={pregnancyCareHero} alt="Pregnancy care at home" className="sprc-about-img" />
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="sprc-features" aria-labelledby="sprc-features-heading">
                <div className="sprc-container">
                    <span className="sprc-section-eyebrow">What's Included</span>
                    <h2 id="sprc-features-heading">Pregnancy Care Service Features</h2>
                    <p className="sprc-section-sub">
                        Comprehensive prenatal support tailored for every stage of your pregnancy.
                    </p>
                    <ul className="sprc-features-grid" role="list">
                        {features.map((feature) => (
                            <li key={feature.title} className="sprc-feature-card">
                                <span className="sprc-feature-icon" aria-hidden="true">
                                    {feature.icon}
                                </span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="sprc-benefits" aria-labelledby="sprc-benefits-heading">
                <div className="sprc-container">
                    <span className="sprc-section-eyebrow">Why Choose Us</span>
                    <h2 id="sprc-benefits-heading">
                        Why Choose Our Pregnancy Care Services?
                    </h2>
                    <p className="sprc-section-sub">
                        Trusted, experienced, and compassionate care for every expecting mother.
                    </p>
                    <ul className="sprc-benefits-grid" role="list">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="sprc-benefit-card">
                                <span className="sprc-benefit-icon" aria-hidden="true">
                                    {benefit.icon}
                                </span>
                                <div>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="sprc-testimonials" aria-labelledby="sprc-testimonials-heading">
                <div className="sprc-container">
                    <span className="sprc-section-eyebrow">What Mothers Say</span>
                    <h2 id="sprc-testimonials-heading">Customer Testimonials</h2>
                    <p className="sprc-section-sub">
                        Real stories from mothers who trusted our pregnancy care services.
                    </p>
                    <ul className="sprc-testimonials-grid" role="list">
                        {testimonials.map((t) => (
                            <li key={t.name} className="sprc-testimonial-card">
                                <span className="sprc-testimonial-stars" aria-hidden="true">
                                    ⭐⭐⭐⭐⭐
                                </span>
                                <p className="sprc-testimonial-text">"{t.text}"</p>
                                <span className="sprc-testimonial-name">— {t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="sprc-cta" aria-labelledby="sprc-cta-heading">
                <div className="sprc-container sprc-cta-inner">
                    <h2 id="sprc-cta-heading">
                        Book a Verified Pregnancy Caregiver Today
                    </h2>
                    <p>
                        Join 4,500+ mothers across India who trust our compassionate
                        maternity care services at home. Safe, verified, and available near you.
                    </p>
                    <div className="sprc-cta-btns">
                        <button className="sprc-btn-primary" type="button">
                            Book Pregnancy Caregiver
                        </button>
                        <button className="sprc-btn-outline" type="button">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="sprc-faqs" aria-labelledby="sprc-faqs-heading">
                <div className="sprc-container">
                    <span className="sprc-section-eyebrow">FAQs</span>
                    <h2 id="sprc-faqs-heading">Frequently Asked Questions</h2>
                    <p className="sprc-section-sub">
                        Everything you need to know about our pregnancy care services.
                    </p>
                    <ul className="sprc-faqs-list" role="list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="sprc-faq-item">
                                <button
                                    className={`sprc-faq-question ${openFaq === index ? "sprc-faq-open" : ""}`}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                    type="button"
                                >
                                    <span>{faq.question}</span>
                                    <span className="sprc-faq-icon" aria-hidden="true">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="sprc-faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        </main>
    );
};

export default ServicePregnancyCare;