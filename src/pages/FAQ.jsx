import React from "react";

const faqData = [
    {
        question: "What types of home care services do you provide?",
        answer:
            "We offer a range of home care services including baby care, pet care, and elder care. Our trained caregivers assist with daily activities, supervision, companionship, and basic support tailored to your family's needs."
    },
    {
        question: "Are your caregivers trained and verified?",
        answer:
            "Yes. All caregivers go through a thorough background verification process and receive training to ensure they provide safe, reliable, and professional care services."
    },
    {
        question: "How do I book a service?",
        answer:
            "Booking a service is simple. Choose the service type, select the tasks you need help with, provide the required details, and confirm your booking through our platform."
    },
    {
        question: "Can I customize the services according to my needs?",
        answer:
            "Absolutely. You can select specific tasks during the booking process so the service is tailored to your exact requirements."
    },
    {
        question: "What areas do you currently serve?",
        answer:
            "We are gradually expanding our coverage. Please select your region during booking to check if services are available in your location."
    },
    {
        question: "What is included in baby care services?",
        answer:
            "Baby care services may include feeding assistance, diaper changing, soothing the baby, sleep supervision, and light baby-related assistance depending on the selected tasks."
    },
    {
        question: "Do you provide emergency medical care?",
        answer:
            "No. Our caregivers provide non-medical support and assistance. For medical emergencies, we recommend contacting professional healthcare services immediately."
    },
    {
        question: "Can I cancel or reschedule my booking?",
        answer:
            "Yes. You can cancel or reschedule your booking before the scheduled service time according to our cancellation policy."
    },
    {
        question: "How do you ensure safety and trust?",
        answer:
            "We prioritize safety by verifying caregivers, maintaining transparent service policies, and allowing customers to review service details before booking."
    },
    {
        question: "How can I contact support if I need help?",
        answer:
            "You can reach our support team through the contact section on our website. We are always ready to assist you with booking or service-related questions."
    }
];

const FAQ = () => {

    return (
        <div className="container py-5">

            <h2 className="text-center mb-4 fw-bold">
                Frequently Asked Questions
            </h2>

            <div className="accordion" id="faqAccordion">

                {faqData.map((faq, index) => (
                    <div className="accordion-item" key={index}>

                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#faq${index}`}
                            >
                                {faq.question}
                            </button>
                        </h2>

                        <div
                            id={`faq${index}`}
                            className={`accordion-collapse collapse ${index === 0 ? "show" : "" }`}
                            data-bs-parent="#faqAccordion"
                        >
                            <div className="accordion-body">
                                {faq.answer}
                            </div>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default FAQ;