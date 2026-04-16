import React, { useState } from "react";
import "../styleSheets/servicesDisplay/serviceBaby.css";

// Import your actual images from assets
import babyCareHero from "../assets/baby2.jpg";
import babyCareBanner from "../assets/baby1.jpg";
import babyOverlay from "../assets/baby7.png";
import { useNavigate } from "react-router-dom";

const stats = [
    { value: "12,500+", label: "Happy Families" },
    { value: "3,200+", label: "Verified Babysitters" },
    { value: "50,000+", label: "Care Sessions" },
    { value: "4.8 ⭐", label: "Average Rating" },
];

const features = [
    {
        icon: "🍼",
        title: "Feeding & Nutrition Support",
        description:
            "Our trained babysitters assist with feeding schedules, bottle feeding, and baby nutrition routines.",
    },
    {
        icon: "🧸",
        title: "Diaper Change & Hygiene",
        description:
            "Professional caregivers ensure proper baby hygiene and diaper change routines.",
    },
    {
        icon: "😴",
        title: "Sleep & Nap Assistance",
        description:
            "Caregivers help babies follow healthy sleep routines and nap schedules.",
    },
    {
        icon: "👀",
        title: "Child Supervision",
        description:
            "Continuous child supervision and safety monitoring to ensure baby wellbeing.",
    },
    {
        icon: "💊",
        title: "Allergy & Medical Note Monitoring",
        description:
            "Caregivers follow child allergy instructions and medical notes for safe care.",
    },
    {
        icon: "🚨",
        title: "Emergency Support",
        description:
            "Quick assistance during emergencies with trained childcare professionals.",
    },
];

const benefits = [
    {
        icon: "✅",
        title: "Verified Babysitters",
        description: "All babysitters are identity verified and background checked.",
    },
    {
        icon: "🛡️",
        title: "Safe and Reliable Care",
        description: "Our platform ensures trusted childcare services at home.",
    },
    {
        icon: "📱",
        title: "Easy Online Booking",
        description: "Book babysitters instantly through our online caregiver booking platform.",
    },
];

const testimonials = [
    { name: "Priya Sharma", text: "The babysitter was extremely caring and professional. My baby felt comfortable instantly." },
    { name: "Neha Gupta", text: "Finally found a trusted babysitter near me through this platform." },
    { name: "Kavita Mehta", text: "Highly recommended baby care service in India." },
    { name: "Aditi Kapoor", text: "Professional caregivers and smooth booking experience." },
    { name: "Sneha Verma", text: "Perfect childcare support for working parents." },
    { name: "Ritu Jain", text: "The caregiver handled my newborn with so much care." },
    { name: "Pooja Shah", text: "Reliable babysitting services at home." },
];

const faqs = [
    {
        question: "How are babysitters verified on your platform?",
        answer:
            "Every babysitter on our platform undergoes thorough background checks, government ID verification, and reference validation. We also conduct in-person interviews and training assessments before onboarding.",
    },
    {
        question: "Can I book a babysitter for a newborn?",
        answer:
            "Yes! We have caregivers specifically trained in newborn care, including feeding support, sleep routines, hygiene, and safety monitoring for infants.",
    },
    {
        question: "How do I book a babysitter?",
        answer:
            "Simply click 'Book a Babysitter', fill in your requirements, location, and preferred schedule. Our system will match you with the best available caregiver near you.",
    },
    {
        question: "Are babysitters available for part-time and full-time care?",
        answer:
            "Yes, we offer flexible booking options — hourly, part-time, full-time, and live-in baby care depending on your family's needs.",
    },
    {
        question: "What if I'm not satisfied with the caregiver?",
        answer:
            "We offer a satisfaction guarantee. If you're not happy with the assigned caregiver, we'll find you a replacement promptly at no extra cost.",
    },
    {
        question: "Do caregivers handle medical emergencies?",
        answer:
            "All our caregivers are trained in first aid and emergency response. They follow your child's medical notes and allergy instructions strictly.",
    },
];

const ServiceBabyCare = () => {

    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="sbc-page" aria-label="Baby Care Service">

            {/* ── Hero Section ── */}
            <section className="sbc-hero" aria-labelledby="sbc-hero-heading">

                {/* Background decorative blobs */}
                <div className="sbc-hero-bg-shapes" aria-hidden="true">
                    <span className="sbc-shape sbc-shape-1" />
                    <span className="sbc-shape sbc-shape-2" />
                    <span className="sbc-shape sbc-shape-3" />
                </div>

                {/* Two-column layout: text left, image right */}
                <div className="sbc-hero-inner">

                    {/* ── Left: Content ── */}
                    <div className="sbc-hero-content">
                        <span className="sbc-eyebrow">Baby Care Services</span>
                        <h1 id="sbc-hero-heading">
                            Professional <span className="sbc-highlight">Baby Care</span>{" "}
                            Services at Home in India
                        </h1>
                        <p className="sbc-hero-desc">
                            Find trusted babysitters near you. Connect with verified babysitters and professional childcare providers for safe, reliable care for newborns, infants, and toddlers. Book affordable in-home babysitting services for feeding, diaper changes, sleep routines, and child supervision.
                        </p>
                        <div className="sbc-hero-btns">
                            <button className="sbc-btn-primary" type="button" onClick={() => navigate("/login")}>
                                Book a Babysitter
                            </button>
                            <button className="sbc-btn-secondary" type="button" onClick={() => navigate("/login")}>
                                Find a Caregiver Near Me
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Baby PNG ── */}
                    <div className="sbc-hero-visual" aria-hidden="true">
                        <img
                            src={babyOverlay}
                            alt="baby care illustration"
                            className="sbc-hero-baby-img"
                        />
                    </div>

                </div>
            </section>

            {/* ── Stats / Trust Bar ── */}
            <section className="sbc-stats" aria-label="Trust statistics">
                <div className="sbc-container">
                    <ul className="sbc-stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="sbc-stat-item">
                                <span className="sbc-stat-value">{stat.value}</span>
                                <span className="sbc-stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="sbc-stats-note">
                        Families across India trust our professional baby care services at
                        home for reliable childcare support.
                    </p>
                </div>
            </section>

            {/* ── Service Description ── */}
            <section className="sbc-about" aria-labelledby="sbc-about-heading">
                <div className="sbc-container sbc-about-grid">
                    <div className="sbc-about-text">
                        <span className="sbc-section-eyebrow">What We Offer</span>
                        <h2 id="sbc-about-heading">
                            Trusted Baby Care Services at Your Doorstep
                        </h2>
                        <p>
                            Our <strong>professional baby care services</strong> are designed
                            for busy parents who want the best for their little ones. Whether
                            you need a babysitter for a few hours or a full-time newborn care
                            attendant, we have verified caregivers ready to help.
                        </p>
                        <p>
                            From <strong>newborn care at home</strong> to toddler supervision,
                            our caregivers are trained, certified, and background-checked —
                            giving you complete peace of mind.
                        </p>
                        <ul className="sbc-about-checklist">
                            <li>✔ Newborns, infants &amp; toddlers</li>
                            <li>✔ Part-time, full-time &amp; live-in options</li>
                            <li>✔ Available across 50+ cities in India</li>
                            <li>✔ 24/7 booking support</li>
                        </ul>
                    </div>
                    <div className="sbc-about-visual" aria-hidden="true">
                        <img src={babyCareHero} alt="Professional baby care at home" className="sbc-about-img" />
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="sbc-features" aria-labelledby="sbc-features-heading">
                <div className="sbc-container">
                    <span className="sbc-section-eyebrow">What's Included</span>
                    <h2 id="sbc-features-heading">Baby Care Service Features</h2>
                    <p className="sbc-section-sub">
                        Comprehensive care tailored for every stage of your baby's day.
                    </p>
                    <ul className="sbc-features-grid" role="list">
                        {features.map((feature) => (
                            <li key={feature.title} className="sbc-feature-card">
                                <span className="sbc-feature-icon" aria-hidden="true">
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
            <section className="sbc-benefits" aria-labelledby="sbc-benefits-heading">
                <div className="sbc-container">
                    <span className="sbc-section-eyebrow">Why Choose Us</span>
                    <h2 id="sbc-benefits-heading">Why Choose Our Baby Care Services?</h2>
                    <p className="sbc-section-sub">
                        Safety, trust, and convenience — every time.
                    </p>
                    <ul className="sbc-benefits-grid" role="list">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="sbc-benefit-card">
                                <span className="sbc-benefit-icon" aria-hidden="true">
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
            <section className="sbc-testimonials" aria-labelledby="sbc-testimonials-heading">
                <div className="sbc-container">
                    <span className="sbc-section-eyebrow">What Parents Say</span>
                    <h2 id="sbc-testimonials-heading">Customer Testimonials</h2>
                    <p className="sbc-section-sub">
                        Real stories from real families who trust our caregivers.
                    </p>
                    <ul className="sbc-testimonials-grid" role="list">
                        {testimonials.map((t) => (
                            <li key={t.name} className="sbc-testimonial-card">
                                <span className="sbc-testimonial-stars" aria-hidden="true">
                                    ⭐⭐⭐⭐⭐
                                </span>
                                <p className="sbc-testimonial-text">"{t.text}"</p>
                                <span className="sbc-testimonial-name">— {t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="sbc-cta" aria-labelledby="sbc-cta-heading">
                <div className="sbc-container sbc-cta-inner">
                    <h2 id="sbc-cta-heading">Book a Verified Babysitter Today</h2>
                    <p>
                        Join 12,500+ families across India who rely on our trusted baby care
                        services at home. Safe, verified, and available near you.
                    </p>
                    <div className="sbc-cta-btns">
                        <button className="sbc-btn-primary" type="button" onClick={() => navigate("/login")}>
                            Book a Babysitter
                        </button>
                        <button className="sbc-btn-outline" type="button" onClick={() => navigate("/login")}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="sbc-faqs" aria-labelledby="sbc-faqs-heading">
                <div className="sbc-container">
                    <span className="sbc-section-eyebrow">FAQs</span>
                    <h2 id="sbc-faqs-heading">Frequently Asked Questions</h2>
                    <p className="sbc-section-sub">
                        Everything you need to know about our baby care services.
                    </p>
                    <ul className="sbc-faqs-list" role="list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="sbc-faq-item">
                                <button
                                    className={`sbc-faq-question ${openFaq === index ? "sbc-faq-open" : ""}`}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                    type="button"
                                >
                                    <span>{faq.question}</span>
                                    <span className="sbc-faq-icon" aria-hidden="true">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="sbc-faq-answer">
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

export default ServiceBabyCare;