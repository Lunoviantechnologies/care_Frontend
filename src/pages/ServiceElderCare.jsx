import React, { useState } from "react";
import "../styleSheets/servicesDisplay/serviceElder.css";

// Import your actual images from assets
// import elderCareHero from "../assets/elder-care-hero.jpg";

const stats = [
    { value: "9,800+", label: "Seniors Supported" },
    { value: "2,100+", label: "Certified Caregivers" },
    { value: "40,000+", label: "Care Sessions" },
    { value: "4.9 ⭐", label: "Average Rating" },
];

const features = [
    {
        icon: "🦯",
        title: "Mobility Assistance",
        description:
            "Support with walking, standing, and daily movements to ensure seniors stay active and safe.",
    },
    {
        icon: "💊",
        title: "Medication Reminder",
        description:
            "Timely reminders for medications and health routines to maintain consistent care.",
    },
    {
        icon: "🍽️",
        title: "Meal Supervision",
        description:
            "Caregivers assist with healthy meal routines tailored to the senior's dietary needs.",
    },
    {
        icon: "🤝",
        title: "Companionship",
        description:
            "Friendly caregivers provide emotional and social support for a better quality of life.",
    },
    {
        icon: "🛡️",
        title: "Safety Monitoring",
        description:
            "Continuous monitoring ensures safe senior care at home around the clock.",
    },
    {
        icon: "🚨",
        title: "Emergency Support",
        description:
            "Immediate response and caregiver assistance in emergencies for complete peace of mind.",
    },
];

const benefits = [
    {
        icon: "🎓",
        title: "Professional Caregivers",
        description: "Highly trained elder care specialists with certified expertise.",
    },
    {
        icon: "✅",
        title: "Safe & Trusted Platform",
        description: "Verified caregivers for home elderly care services you can rely on.",
    },
    {
        icon: "📅",
        title: "Flexible Booking",
        description: "Daily, weekly, or one-time caregiver services as per your schedule.",
    },
];

const testimonials = [
    { name: "Rajesh Kumar", text: "My father receives the best care from their caregivers." },
    { name: "Anita Sharma", text: "Reliable elder care services at home. Highly satisfied." },
    { name: "Vivek Shah", text: "Highly trained and professional caregivers. Truly impressed." },
    { name: "Pooja Mehta", text: "Excellent support for my elderly mother. Thank you so much." },
    { name: "Deepak Jain", text: "The caregiver was patient and compassionate throughout." },
    { name: "Suresh Gupta", text: "Best senior care platform I found online. Highly recommended." },
    { name: "Arjun Verma", text: "Highly recommend their home care services for seniors." },
];

const faqs = [
    {
        question: "What elder care services do you offer at home?",
        answer:
            "We offer a comprehensive range of elder care services including mobility assistance, medication reminders, meal supervision, companionship, safety monitoring, and emergency support — all delivered at home by trained and verified caregivers.",
    },
    {
        question: "How are elder caregivers verified?",
        answer:
            "Every caregiver undergoes strict background checks, government ID verification, reference validation, and in-person training assessments before being onboarded to our platform.",
    },
    {
        question: "Can I book a caregiver for a short-term or one-time visit?",
        answer:
            "Yes. We offer flexible booking options including one-time visits, part-time daily care, full-time attendance, and long-term live-in care based on your family's needs.",
    },
    {
        question: "Are caregivers trained for seniors with medical conditions?",
        answer:
            "Our caregivers are trained to assist seniors with various medical conditions including diabetes, arthritis, dementia, and post-surgery recovery. They follow prescribed care plans and doctor instructions.",
    },
    {
        question: "Is elder care available across all cities in India?",
        answer:
            "We are currently available across 50+ cities in India and are rapidly expanding. You can check availability in your city during the booking process.",
    },
    {
        question: "What if my elderly parent's condition changes and they need more care?",
        answer:
            "We offer flexible care plan upgrades. Simply contact our support team and we will reassign or adjust your caregiver's responsibilities to match the updated care requirements.",
    },
];

const ServiceElderCare = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="sec-page" aria-label="Elder Care Service">

            {/* ── Hero Section ── */}
            <section className="sec-hero" aria-labelledby="sec-hero-heading">
                <div className="sec-hero-bg-shapes" aria-hidden="true">
                    <span className="sec-shape sec-shape-1" />
                    <span className="sec-shape sec-shape-2" />
                    <span className="sec-shape sec-shape-3" />
                </div>
                <div className="sec-container sec-hero-content">
                    <span className="sec-eyebrow">Elder Care Services</span>
                    <h1 id="sec-hero-heading">
                        Trusted <span className="sec-highlight">Elder Care</span>{" "}
                        Services at Home
                    </h1>
                    <p className="sec-hero-desc">
                        Provide your loved ones with compassionate elderly care services at
                        home. Our trained caregivers offer assistance with mobility support,
                        medication reminders, companionship, and daily activities to ensure
                        senior citizens live comfortably and safely.
                    </p>
                    <div className="sec-hero-btns">
                        <button className="sec-btn-primary" type="button">
                            Book Elder Caregiver
                        </button>
                        <button className="sec-btn-secondary" type="button">
                            Get Senior Care Assistance
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Stats / Trust Bar ── */}
            <section className="sec-stats" aria-label="Trust statistics">
                <div className="sec-container">
                    <ul className="sec-stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="sec-stat-item">
                                <span className="sec-stat-value">{stat.value}</span>
                                <span className="sec-stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="sec-stats-note">
                        Families across India trust our elder care services at home for
                        compassionate and professional senior support.
                    </p>
                </div>
            </section>

            {/* ── Service Description ── */}
            <section className="sec-about" aria-labelledby="sec-about-heading">
                <div className="sec-container sec-about-grid">
                    <div className="sec-about-text">
                        <span className="sec-section-eyebrow">What We Offer</span>
                        <h2 id="sec-about-heading">
                            Compassionate Elder Care at Your Doorstep
                        </h2>
                        <p>
                            Our <strong>home elder care services</strong> are designed to give
                            senior citizens the dignity, safety, and comfort they deserve —
                            right in their own homes. Whether your loved one needs part-time
                            assistance or a full-time live-in caregiver, we have certified
                            professionals ready to help.
                        </p>
                        <p>
                            From <strong>senior citizen care services</strong> to specialized
                            post-surgery recovery support, our caregivers are trained,
                            background-checked, and deeply committed to quality senior care.
                        </p>
                        <ul className="sec-about-checklist">
                            <li>✔ Care for seniors of all age groups</li>
                            <li>✔ Part-time, full-time &amp; live-in options</li>
                            <li>✔ Available across 50+ cities in India</li>
                            <li>✔ 24/7 booking &amp; support</li>
                        </ul>
                    </div>
                    <div className="sec-about-visual" aria-hidden="true">
                        {/* Replace with your actual image:
                        <img src={elderCareHero} alt="Elder care at home" className="sec-about-img" /> */}
                        <div className="sec-about-img-placeholder">
                            <span>🧓</span>
                            <p>Elder Care at Home</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="sec-features" aria-labelledby="sec-features-heading">
                <div className="sec-container">
                    <span className="sec-section-eyebrow">What's Included</span>
                    <h2 id="sec-features-heading">Elder Care Service Features</h2>
                    <p className="sec-section-sub">
                        Comprehensive elder care services tailored to every senior's daily needs.
                    </p>
                    <ul className="sec-features-grid" role="list">
                        {features.map((feature) => (
                            <li key={feature.title} className="sec-feature-card">
                                <span className="sec-feature-icon" aria-hidden="true">
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
            <section className="sec-benefits" aria-labelledby="sec-benefits-heading">
                <div className="sec-container">
                    <span className="sec-section-eyebrow">Why Choose Us</span>
                    <h2 id="sec-benefits-heading">Why Choose Our Elder Care Services?</h2>
                    <p className="sec-section-sub">
                        Trusted, professional, and flexible care for every senior.
                    </p>
                    <ul className="sec-benefits-grid" role="list">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="sec-benefit-card">
                                <span className="sec-benefit-icon" aria-hidden="true">
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
            <section className="sec-testimonials" aria-labelledby="sec-testimonials-heading">
                <div className="sec-container">
                    <span className="sec-section-eyebrow">What Families Say</span>
                    <h2 id="sec-testimonials-heading">Customer Testimonials</h2>
                    <p className="sec-section-sub">
                        Real experiences from families who trusted our senior care services.
                    </p>
                    <ul className="sec-testimonials-grid" role="list">
                        {testimonials.map((t) => (
                            <li key={t.name} className="sec-testimonial-card">
                                <span className="sec-testimonial-stars" aria-hidden="true">
                                    ⭐⭐⭐⭐⭐
                                </span>
                                <p className="sec-testimonial-text">"{t.text}"</p>
                                <span className="sec-testimonial-name">— {t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="sec-cta" aria-labelledby="sec-cta-heading">
                <div className="sec-container sec-cta-inner">
                    <h2 id="sec-cta-heading">Book a Verified Elder Caregiver Today</h2>
                    <p>
                        Join thousands of families across India who trust our compassionate
                        senior care services at home. Safe, verified, and available near you.
                    </p>
                    <div className="sec-cta-btns">
                        <button className="sec-btn-primary" type="button">
                            Book Elder Caregiver
                        </button>
                        <button className="sec-btn-outline" type="button">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="sec-faqs" aria-labelledby="sec-faqs-heading">
                <div className="sec-container">
                    <span className="sec-section-eyebrow">FAQs</span>
                    <h2 id="sec-faqs-heading">Frequently Asked Questions</h2>
                    <p className="sec-section-sub">
                        Everything you need to know about our elder care services.
                    </p>
                    <ul className="sec-faqs-list" role="list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="sec-faq-item">
                                <button
                                    className={`sec-faq-question ${openFaq === index ? "sec-faq-open" : ""}`}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                    type="button"
                                >
                                    <span>{faq.question}</span>
                                    <span className="sec-faq-icon" aria-hidden="true">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="sec-faq-answer">
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

export default ServiceElderCare;