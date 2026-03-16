import React, { useState } from "react";
import "../styleSheets/servicesDisplay/servicePet.css";

// Import your actual images from assets
// import petCareHero from "../assets/pet-care-hero.jpg";

const stats = [
    { value: "6,000+", label: "Happy Pet Owners" },
    { value: "1,200+", label: "Pet Care Specialists" },
    { value: "18,000+", label: "Pet Care Visits" },
    { value: "4.8 ⭐", label: "Service Rating" },
];

const features = [
    {
        icon: "🐾",
        title: "Pet Feeding Assistance",
        description:
            "Scheduled and nutritious feeding routines tailored to your pet's diet and health requirements.",
    },
    {
        icon: "🦮",
        title: "Pet Walking & Exercise",
        description:
            "Daily walks and exercise sessions to keep your pet active, healthy, and happy.",
    },
    {
        icon: "🐶",
        title: "Breed Monitoring",
        description:
            "Breed-specific care routines and monitoring to meet your pet's unique needs.",
    },
    {
        icon: "💉",
        title: "Vaccination Status Tracking",
        description:
            "Caregivers track and remind you about your pet's vaccination schedules and health records.",
    },
    {
        icon: "🔍",
        title: "Pet Behaviour Monitoring",
        description:
            "Careful observation of your pet's behaviour patterns to detect any changes or concerns early.",
    },
    {
        icon: "🛡️",
        title: "Pet Safety Supervision",
        description:
            "Round-the-clock supervision to ensure your pet's safety, comfort, and wellbeing at all times.",
    },
];

const benefits = [
    {
        icon: "✅",
        title: "Trusted Pet Sitters",
        description:
            "All pet sitters are verified, background-checked, and experienced with a wide range of animals.",
    },
    {
        icon: "🎓",
        title: "Experienced Pet Handlers",
        description:
            "Our caregivers are trained in animal behaviour, first aid, and breed-specific care.",
    },
    {
        icon: "📡",
        title: "Safe Pet Monitoring",
        description:
            "Real-time updates and activity logs so you always know your pet is safe and cared for.",
    },
];

const testimonials = [
    { name: "Rahul Mehta", text: "My dog loved the caregiver! Will definitely book again." },
    { name: "Sneha Kapoor", text: "Best pet care service near me. Absolutely reliable." },
    { name: "Riya Shah", text: "Reliable and caring pet sitters. My pets are always happy." },
    { name: "Vikram Singh", text: "Great experience for my cat. Very professional service." },
    { name: "Aditya Jain", text: "Professional pet handlers who genuinely love animals." },
    { name: "Pooja Gupta", text: "Highly recommend their pet sitting services to every pet owner." },
];

const faqs = [
    {
        question: "What types of pets do your caregivers handle?",
        answer:
            "Our caregivers are experienced with a wide variety of pets including dogs, cats, birds, rabbits, and small animals. You can specify your pet type during booking and we will match you with the right specialist.",
    },
    {
        question: "How are pet caregivers verified on your platform?",
        answer:
            "Every pet caregiver undergoes thorough background checks, ID verification, and hands-on assessment of their animal handling skills before being onboarded to our platform.",
    },
    {
        question: "Can I book a pet sitter for overnight care?",
        answer:
            "Yes, we offer flexible booking options including hourly visits, full-day care, overnight stays, and live-in pet sitting based on your requirements.",
    },
    {
        question: "Will the caregiver follow my pet's diet and routine?",
        answer:
            "Absolutely. Our caregivers follow the feeding schedule, dietary instructions, and daily routine you provide. You can share all details during the booking process.",
    },
    {
        question: "What if my pet has a medical condition or special needs?",
        answer:
            "We have caregivers trained in managing pets with special health needs. Please mention any medical conditions or special care requirements during booking so we can assign the most suitable caregiver.",
    },
    {
        question: "How do I receive updates about my pet during the care session?",
        answer:
            "Caregivers provide real-time updates, photos, and activity logs through our platform so you always stay informed about your pet's wellbeing.",
    },
];

const ServicePetCare = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="spc-page" aria-label="Pet Care Service">

            {/* ── Hero Section ── */}
            <section className="spc-hero" aria-labelledby="spc-hero-heading">
                <div className="spc-hero-bg-shapes" aria-hidden="true">
                    <span className="spc-shape spc-shape-1" />
                    <span className="spc-shape spc-shape-2" />
                    <span className="spc-shape spc-shape-3" />
                </div>
                <div className="spc-container spc-hero-content">
                    <span className="spc-eyebrow">Pet Care Services</span>
                    <h1 id="spc-hero-heading">
                        Professional <span className="spc-highlight">Pet Care</span>{" "}
                        Services Near You
                    </h1>
                    <p className="spc-hero-desc">
                        Need a reliable pet sitter? Our platform connects pet owners with
                        trusted pet caregivers who provide feeding, walking, supervision,
                        and pet safety monitoring for your beloved companions.
                    </p>
                    <div className="spc-hero-btns">
                        <button className="spc-btn-primary" type="button">
                            Book Pet Caregiver
                        </button>
                        <button className="spc-btn-secondary" type="button">
                            Find Pet Sitter
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Stats / Trust Bar ── */}
            <section className="spc-stats" aria-label="Trust statistics">
                <div className="spc-container">
                    <ul className="spc-stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="spc-stat-item">
                                <span className="spc-stat-value">{stat.value}</span>
                                <span className="spc-stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="spc-stats-note">
                        Pet owners across India trust our professional pet care services
                        for safe, reliable, and loving care for their companions.
                    </p>
                </div>
            </section>

            {/* ── Service Description ── */}
            <section className="spc-about" aria-labelledby="spc-about-heading">
                <div className="spc-container spc-about-grid">
                    <div className="spc-about-text">
                        <span className="spc-section-eyebrow">What We Offer</span>
                        <h2 id="spc-about-heading">
                            Caring for Your Pets Like Our Own
                        </h2>
                        <p>
                            Our <strong>professional pet care services</strong> are designed
                            for pet owners who want the best for their furry, feathered, or
                            scaled companions. Whether you need a quick visit, daily walks,
                            or a full-time pet sitter, our verified caregivers are ready.
                        </p>
                        <p>
                            From <strong>dog sitters near you</strong> to specialised small
                            animal care, every caregiver on our platform is trained,
                            background-checked, and genuinely passionate about animals.
                        </p>
                        <ul className="spc-about-checklist">
                            <li>✔ Dogs, cats, birds &amp; small animals</li>
                            <li>✔ Hourly, daily &amp; overnight options</li>
                            <li>✔ Available across 50+ cities in India</li>
                            <li>✔ Real-time updates &amp; activity logs</li>
                        </ul>
                    </div>
                    <div className="spc-about-visual" aria-hidden="true">
                        {/* Replace with your actual image:
                        <img src={petCareHero} alt="Professional pet care services" className="spc-about-img" /> */}
                        <div className="spc-about-img-placeholder">
                            <span>🐾</span>
                            <p>Pet Care Near You</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="spc-features" aria-labelledby="spc-features-heading">
                <div className="spc-container">
                    <span className="spc-section-eyebrow">What's Included</span>
                    <h2 id="spc-features-heading">Pet Care Service Features</h2>
                    <p className="spc-section-sub">
                        Everything your pet needs — covered by caring, trained professionals.
                    </p>
                    <ul className="spc-features-grid" role="list">
                        {features.map((feature) => (
                            <li key={feature.title} className="spc-feature-card">
                                <span className="spc-feature-icon" aria-hidden="true">
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
            <section className="spc-benefits" aria-labelledby="spc-benefits-heading">
                <div className="spc-container">
                    <span className="spc-section-eyebrow">Why Choose Us</span>
                    <h2 id="spc-benefits-heading">Why Choose Our Pet Care Services?</h2>
                    <p className="spc-section-sub">
                        Trusted, experienced, and safe care for every kind of pet.
                    </p>
                    <ul className="spc-benefits-grid" role="list">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="spc-benefit-card">
                                <span className="spc-benefit-icon" aria-hidden="true">
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
            <section className="spc-testimonials" aria-labelledby="spc-testimonials-heading">
                <div className="spc-container">
                    <span className="spc-section-eyebrow">What Pet Owners Say</span>
                    <h2 id="spc-testimonials-heading">Customer Testimonials</h2>
                    <p className="spc-section-sub">
                        Real stories from pet owners who trust our caregivers.
                    </p>
                    <ul className="spc-testimonials-grid" role="list">
                        {testimonials.map((t) => (
                            <li key={t.name} className="spc-testimonial-card">
                                <span className="spc-testimonial-stars" aria-hidden="true">
                                    ⭐⭐⭐⭐⭐
                                </span>
                                <p className="spc-testimonial-text">"{t.text}"</p>
                                <span className="spc-testimonial-name">— {t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="spc-cta" aria-labelledby="spc-cta-heading">
                <div className="spc-container spc-cta-inner">
                    <h2 id="spc-cta-heading">Book a Trusted Pet Caregiver Today</h2>
                    <p>
                        Join 6,000+ pet owners across India who trust our verified pet care
                        services. Safe, professional, and available near you.
                    </p>
                    <div className="spc-cta-btns">
                        <button className="spc-btn-primary" type="button">
                            Book Pet Caregiver
                        </button>
                        <button className="spc-btn-outline" type="button">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="spc-faqs" aria-labelledby="spc-faqs-heading">
                <div className="spc-container">
                    <span className="spc-section-eyebrow">FAQs</span>
                    <h2 id="spc-faqs-heading">Frequently Asked Questions</h2>
                    <p className="spc-section-sub">
                        Everything you need to know about our pet care services.
                    </p>
                    <ul className="spc-faqs-list" role="list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="spc-faq-item">
                                <button
                                    className={`spc-faq-question ${openFaq === index ? "spc-faq-open" : ""}`}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                    type="button"
                                >
                                    <span>{faq.question}</span>
                                    <span className="spc-faq-icon" aria-hidden="true">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="spc-faq-answer">
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

export default ServicePetCare;
