import React, { useState } from "react";
import "../styleSheets/contactus.css";

const contactInfo = [
    {
        icon: "📍",
        title: "Service Locations",
        detail: "Major Cities Across India",
        sub: "Delhi · Mumbai · Bangalore · Hyderabad · Chennai · Pune & more",
        href: null,
    },
    {
        icon: "📞",
        title: "Call Us",
        detail: "+91 XXXXX XXXXX",
        sub: "Mon – Sat, 8 AM to 8 PM IST",
        href: "tel:+91XXXXXXXXXX",
    },
    {
        icon: "📧",
        title: "Email Us",
        detail: "support@yourdomain.com",
        sub: "We respond within 24 hours",
        href: "mailto:support@yourdomain.com",
    },
];

const services = [
    "Baby Care",
    "Elder Care",
    "Pet Care",
    "Home Assistance",
    "Pregnancy Care",
    "Other",
];

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        city: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="contact-page" aria-label="Contact Us">
            {/* ── Hero ── */}
            <section className="contact-hero" aria-labelledby="contact-hero-heading">
                <div className="contact-hero-bg" aria-hidden="true">
                    <span className="ch-blob ch-blob-1" />
                    <span className="ch-blob ch-blob-2" />
                    <span className="ch-dots" />
                </div>
                <div className="container contact-hero-content">
                    <span className="contact-eyebrow">Get In Touch</span>
                    <h1 id="contact-hero-heading">
                        Contact Our{" "}
                        <span className="contact-highlight">Caregiver Services</span> Team
                    </h1>
                    <p className="contact-hero-sub">
                        Need help finding a caregiver? Our support team is here to assist
                        you with the best{" "}
                        <strong>home care support in India</strong>.
                    </p>
                </div>
            </section>

            {/* ── Info Cards ── */}
            <section className="contact-info-section" aria-label="Contact information">
                <div className="container">
                    <ul className="contact-info-grid" role="list">
                        {contactInfo.map((item) => (
                            <li key={item.title} className="contact-info-card">
                                <span className="ci-icon" aria-hidden="true">{item.icon}</span>
                                <div className="ci-body">
                                    <h3>{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="ci-detail">
                                            {item.detail}
                                        </a>
                                    ) : (
                                        <p className="ci-detail">{item.detail}</p>
                                    )}
                                    <p className="ci-sub">{item.sub}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Form + Side Panel ── */}
            <section className="contact-main-section" aria-labelledby="form-heading">
                <div className="container contact-main-grid">

                    {/* Side panel */}
                    <aside className="contact-side">
                        <div className="contact-side-inner">
                            <h2>Why Reach Out to Us?</h2>
                            <ul className="contact-side-list" role="list">
                                <li>
                                    <span aria-hidden="true">✅</span>
                                    <span>Get matched with a verified caregiver within 24 hours</span>
                                </li>
                                <li>
                                    <span aria-hidden="true">🔒</span>
                                    <span>All caregivers are background-checked and trained</span>
                                </li>
                                <li>
                                    <span aria-hidden="true">📍</span>
                                    <span>Available across 50+ cities in India</span>
                                </li>
                                <li>
                                    <span aria-hidden="true">🕐</span>
                                    <span>Flexible scheduling — part-time, full-time, or live-in</span>
                                </li>
                                <li>
                                    <span aria-hidden="true">💬</span>
                                    <span>Dedicated support team available 6 days a week</span>
                                </li>
                            </ul>

                            <div className="contact-side-badge">
                                <span className="badge-num">98%</span>
                                <span className="badge-label">Family Satisfaction Rate</span>
                            </div>
                        </div>
                    </aside>

                    {/* Contact Form */}
                    <div className="contact-form-wrap">
                        <h2 id="form-heading">Send Us a Message</h2>
                        <p className="form-sub">
                            Fill in your details and we'll get back to you as soon as possible.
                        </p>

                        {submitted ? (
                            <div className="form-success" role="alert">
                                <span className="success-icon">🎉</span>
                                <h3>Thank you, {formData.name}!</h3>
                                <p>
                                    We've received your request and our team will contact you
                                    within 24 hours to help you find the right caregiver.
                                </p>
                                <button
                                    className="btn-reset"
                                    type="button"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({
                                            name: "",
                                            phone: "",
                                            email: "",
                                            service: "",
                                            city: "",
                                            message: "",
                                        });
                                    }}
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form
                                className="contact-form"
                                onSubmit={handleSubmit}
                                noValidate
                                aria-label="Contact form"
                            >
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            autoComplete="tel"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">Your City *</label>
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            placeholder="e.g. Hyderabad"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="service">Service Required *</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>
                                        {services.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message / Special Requirements</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us more about your caregiving needs, timings, or any special requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn-submit" type="submit">
                                    📅 Book a Caregiver Today
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ── CTA Strip ── */}
            <section className="contact-cta" aria-labelledby="contact-cta-heading">
                <div className="container contact-cta-inner">
                    <div className="cta-text">
                        <h2 id="contact-cta-heading">Need Immediate Assistance?</h2>
                        <p>Call us directly and speak to our caregiver support team.</p>
                    </div>
                    <a href="tel:+91XXXXXXXXXX" className="btn-call">
                        📞 Call +91 XXXXX XXXXX
                    </a>
                </div>
            </section>
        </main>
    );
};

export default ContactUs;
