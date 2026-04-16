import React, { useState } from "react";
import "../styleSheets/servicesDisplay/serviceHomeAssist.css";

// Import your actual images from assets
import kitchenCareHero from "../assets/kitchen3.jpg";
import kitchenOverlay from "../assets/kitchen6.png"; // Replace with your actual kitchen overlay/PNG image
import { useNavigate } from "react-router-dom";

const stats = [
    { value: "8,200+", label: "Homes Served" },
    { value: "1,500+", label: "Kitchen Assistants" },
    { value: "25,000+", label: "Service Visits" },
    { value: "4.8 ⭐", label: "Average Rating" },
];

const features = [
    {
        icon: "🍳",
        title: "Meal Preparation",
        description:
            "Skilled kitchen assistants prepare fresh, hygienic meals following your family's preferences and dietary requirements.",
    },
    {
        icon: "👨‍🍳",
        title: "Cooking Assistance",
        description:
            "Experienced helpers assist with daily cooking tasks, recipes, and kitchen workflows to make mealtime effortless.",
    },
    {
        icon: "🧹",
        title: "Kitchen Cleaning",
        description:
            "Thorough cleaning of countertops, appliances, utensils, and kitchen spaces after every cooking session.",
    },
    {
        icon: "🥦",
        title: "Ingredient Preparation",
        description:
            "Chopping, peeling, marinating, and prepping ingredients so your cooking is faster and more efficient.",
    },
    {
        icon: "🗄️",
        title: "Food Storage Support",
        description:
            "Proper storage of cooked food and groceries following hygiene standards to minimise waste and maintain freshness.",
    },
    {
        icon: "🏠",
        title: "Household Kitchen Management",
        description:
            "End-to-end kitchen management including inventory checks, organising pantry supplies, and maintaining kitchen order.",
    },
];

const benefits = [
    {
        icon: "🎓",
        title: "Trained Kitchen Assistants",
        description:
            "All kitchen helpers are trained in food hygiene, safe handling, and professional cooking support.",
    },
    {
        icon: "✅",
        title: "Reliable Home Services",
        description:
            "Verified and background-checked assistants who show up on time and deliver consistent quality service.",
    },
    {
        icon: "💰",
        title: "Affordable Kitchen Support",
        description:
            "Flexible and budget-friendly booking options for daily, weekly, or one-time kitchen assistance.",
    },
];

const testimonials = [
    { name: "Ramesh Patel", text: "Very helpful kitchen assistant. Made our daily cooking so much easier." },
    { name: "Kavita Mehta", text: "Professional and clean cooking help. Our kitchen has never been this organised." },
    { name: "Priya Shah", text: "Great support for busy households. I can now focus on work without worrying about meals." },
    { name: "Arjun Jain", text: "Reliable domestic kitchen service. The assistant is punctual and thorough." },
    { name: "Neha Gupta", text: "Makes daily cooking easier and the kitchen spotless. Highly recommend!" },
];

const faqs = [
    {
        question: "What does a kitchen assistant do at home?",
        answer:
            "A kitchen assistant helps with meal preparation, cooking support, ingredient chopping and prepping, kitchen cleaning, food storage, and general kitchen management based on your household's needs.",
    },
    {
        question: "Are kitchen assistants trained in food hygiene?",
        answer:
            "Yes. All our kitchen helpers are trained in food safety, hygiene practices, and proper handling and storage of food before being assigned to any household.",
    },
    {
        question: "Can I book a kitchen helper for just a few hours a day?",
        answer:
            "Absolutely. We offer flexible booking options including a few hours per day, full-day assistance, and regular weekly schedules. You can customise the timing to suit your household routine.",
    },
    {
        question: "Will the assistant follow our family's dietary preferences?",
        answer:
            "Yes. You can share your dietary requirements, preferred recipes, and any restrictions during booking. Our kitchen helpers follow your instructions carefully.",
    },
    {
        question: "How are kitchen assistants verified?",
        answer:
            "Every kitchen assistant undergoes background checks, ID verification, reference validation, and a food hygiene and safety assessment before joining our platform.",
    },
    {
        question: "Is this service available on weekends and holidays?",
        answer:
            "Yes, our kitchen assistance services are available seven days a week including weekends and public holidays. You can book based on your schedule during the booking process.",
    },
];

const ServiceHomeAssistCare = () => {

    const navigate = useNavigate(); 

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="shac-page" aria-label="Kitchen Assistance Service">

            {/* ── Hero Section ── */}
            <section className="shac-hero" aria-labelledby="shac-hero-heading">

                {/* Background decorative blobs */}
                <div className="shac-hero-bg-shapes" aria-hidden="true">
                    <span className="shac-shape shac-shape-1" />
                    <span className="shac-shape shac-shape-2" />
                    <span className="shac-shape shac-shape-3" />
                </div>

                {/* Two-column layout: text left, image right */}
                <div className="shac-hero-inner">

                    {/* ── Left: Content ── */}
                    <div className="shac-hero-content">
                        <span className="shac-eyebrow">Home Assistance Services</span>
                        <h1 id="shac-hero-heading">
                            Professional{" "}
                            <span className="shac-highlight">Kitchen Assistance</span>{" "}
                            Services at Home in India
                        </h1>
                        <p className="shac-hero-desc">
                            Hire experienced kitchen helpers for meal preparation, cooking
                            assistance, and household kitchen support. Let our trained
                            professionals keep your kitchen running smoothly every day.
                        </p>
                        <div className="shac-hero-btns">
                            <button className="shac-btn-primary" type="button" onClick={() => navigate("/login")}>
                                Book Kitchen Helper
                            </button>
                            <button className="shac-btn-secondary" type="button" onClick={() => navigate("/login")}>
                                Hire Home Assistant
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Kitchen PNG ── */}
                    <div className="shac-hero-visual" aria-hidden="true">
                        <img
                            src={kitchenOverlay}
                            alt="kitchen assistance illustration"
                            className="shac-hero-kitchen-img"
                        />
                    </div>

                </div>
            </section>

            {/* ── Stats / Trust Bar ── */}
            <section className="shac-stats" aria-label="Trust statistics">
                <div className="shac-container">
                    <ul className="shac-stats-grid" role="list">
                        {stats.map((stat) => (
                            <li key={stat.label} className="shac-stat-item">
                                <span className="shac-stat-value">{stat.value}</span>
                                <span className="shac-stat-label">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="shac-stats-note">
                        Households across India trust our professional kitchen assistance
                        services for reliable, hygienic, and affordable home support.
                    </p>
                </div>
            </section>

            {/* ── Service Description ── */}
            <section className="shac-about" aria-labelledby="shac-about-heading">
                <div className="shac-container shac-about-grid">
                    <div className="shac-about-text">
                        <span className="shac-section-eyebrow">What We Offer</span>
                        <h2 id="shac-about-heading">
                            Expert Kitchen Help at Your Doorstep
                        </h2>
                        <p>
                            Our <strong>professional kitchen assistance services</strong> are
                            designed for busy households that need reliable, hygienic, and
                            skilled help in the kitchen. Whether you need daily cooking
                            support or a one-time kitchen clean-up, our verified assistants
                            are ready.
                        </p>
                        <p>
                            From <strong>home cooking assistance</strong> to full kitchen
                            management, every assistant on our platform is trained,
                            background-checked, and committed to keeping your kitchen in
                            perfect order.
                        </p>
                        <ul className="shac-about-checklist">
                            <li>✔ Meal prep, cooking &amp; cleaning support</li>
                            <li>✔ Hourly, daily &amp; regular bookings</li>
                            <li>✔ Available across 50+ cities in India</li>
                            <li>✔ 24/7 booking &amp; support</li>
                        </ul>
                    </div>
                    <div className="shac-about-visual" aria-hidden="true">
                        <img src={kitchenCareHero} alt="Kitchen assistance at home" className="shac-about-img" />
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="shac-features" aria-labelledby="shac-features-heading">
                <div className="shac-container">
                    <span className="shac-section-eyebrow">What's Included</span>
                    <h2 id="shac-features-heading">Kitchen Assistance Service Features</h2>
                    <p className="shac-section-sub">
                        Complete kitchen support tailored to every household's daily needs.
                    </p>
                    <ul className="shac-features-grid" role="list">
                        {features.map((feature) => (
                            <li key={feature.title} className="shac-feature-card">
                                <span className="shac-feature-icon" aria-hidden="true">
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
            <section className="shac-benefits" aria-labelledby="shac-benefits-heading">
                <div className="shac-container">
                    <span className="shac-section-eyebrow">Why Choose Us</span>
                    <h2 id="shac-benefits-heading">
                        Why Choose Our Kitchen Assistance Services?
                    </h2>
                    <p className="shac-section-sub">
                        Trained, trustworthy, and affordable kitchen help for every home.
                    </p>
                    <ul className="shac-benefits-grid" role="list">
                        {benefits.map((benefit) => (
                            <li key={benefit.title} className="shac-benefit-card">
                                <span className="shac-benefit-icon" aria-hidden="true">
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
            <section className="shac-testimonials" aria-labelledby="shac-testimonials-heading">
                <div className="shac-container">
                    <span className="shac-section-eyebrow">What Households Say</span>
                    <h2 id="shac-testimonials-heading">Customer Testimonials</h2>
                    <p className="shac-section-sub">
                        Real feedback from households who rely on our kitchen assistants.
                    </p>
                    <ul className="shac-testimonials-grid" role="list">
                        {testimonials.map((t) => (
                            <li key={t.name} className="shac-testimonial-card">
                                <span className="shac-testimonial-stars" aria-hidden="true">
                                    ⭐⭐⭐⭐⭐
                                </span>
                                <p className="shac-testimonial-text">"{t.text}"</p>
                                <span className="shac-testimonial-name">— {t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="shac-cta" aria-labelledby="shac-cta-heading">
                <div className="shac-container shac-cta-inner">
                    <h2 id="shac-cta-heading">
                        Book a Trusted Kitchen Assistant Today
                    </h2>
                    <p>
                        Join 8,200+ households across India who trust our kitchen
                        assistance services for reliable, hygienic, and affordable home support.
                    </p>
                    <div className="shac-cta-btns">
                        <button className="shac-btn-primary" type="button" onClick={() => navigate("/login")}>
                            Book Kitchen Helper
                        </button>
                        <button className="shac-btn-outline" type="button" onClick={() => navigate("/login")}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="shac-faqs" aria-labelledby="shac-faqs-heading">
                <div className="shac-container">
                    <span className="shac-section-eyebrow">FAQs</span>
                    <h2 id="shac-faqs-heading">Frequently Asked Questions</h2>
                    <p className="shac-section-sub">
                        Everything you need to know about our kitchen assistance services.
                    </p>
                    <ul className="shac-faqs-list" role="list">
                        {faqs.map((faq, index) => (
                            <li key={index} className="shac-faq-item">
                                <button
                                    className={`shac-faq-question ${openFaq === index ? "shac-faq-open" : ""}`}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                    type="button"
                                >
                                    <span>{faq.question}</span>
                                    <span className="shac-faq-icon" aria-hidden="true">
                                        {openFaq === index ? "−" : "+"}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="shac-faq-answer">
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

export default ServiceHomeAssistCare;