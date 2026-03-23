import babyAssist from "../../assets/baby1.jpg";
import baby2 from "../../assets/baby2.jpg";
import babySleep from "../../assets/baby3.webp";
import babyBurp from "../../assets/baby4.jpg";
import baby5 from "../../assets/baby5.jpg";
import babySooth from "../../assets/soothing.webp";

import pet1 from "../../assets/pet1.jpg";
import pet2 from "../../assets/pet2.jpg";
import pet3 from "../../assets/pet3.jpg";
import pet5 from "../../assets/pet5.jpg";

import elder1 from "../../assets/elder1.jpg";
import elder2 from "../../assets/elder2.jpg";
import elder3 from "../../assets/elder3.jpg";
import elder4 from "../../assets/elder4.jpg";

import kitchen1 from "../../assets/kitchen1.jpg";
import kitchen2 from "../../assets/kitchen2.jpg";
import kitchen3 from "../../assets/kitchen3.jpg";
import kitchen4 from "../../assets/kitchen5.jpg";

import preg1 from "../../assets/pregnant1.jpeg";
import preg2 from "../../assets/pregnant2.jpg";
import preg3 from "../../assets/pregnant3.jpg";
import preg4 from "../../assets/pregnant4.jpg";

import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../../data/serviceFeaturesData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "../../styleSheets/serviceLists.css";
import { useState } from "react";

const ServiceLists = () => {

    const theme = {
        baby: {
            pageBg: "#ffe4ec",
            serviceBox: "#fff5f8",
            policyBg: "#fbc5d8",
            title: "#e00950",
            checkboxBg: "#f9d7e2",
            checkboxHover: "#f3c0d2",
            selectedBorder: "#e00950",
            btnHover: "#b8073f",
        },
        pet: {
            pageBg: "#fff9c4",
            serviceBox: "#fffde7",
            policyBg: "#fff4a3",
            title: "#c49000",
            checkboxBg: "#fff3a0",
            checkboxHover: "#ffe67c",
            selectedBorder: "#c49000",
            btnHover: "#a07800",
        },
        elder: {
            pageBg: "#ede7f6",
            serviceBox: "#f6f2ff",
            policyBg: "#e2d9ff",
            title: "#5e35b1",
            checkboxBg: "#ddd2ff",
            checkboxHover: "#cfc0ff",
            selectedBorder: "#5e35b1",
            btnHover: "#4a2590",
        },
        kitchen: {
            pageBg: "#f1f8e9",
            serviceBox: "#ffffff",
            policyBg: "#dcedc8",
            title: "#33691e",
            checkboxBg: "#e8f5e9",
            checkboxHover: "#c5e1a5",
            selectedBorder: "#33691e",
            btnHover: "#1b5e20",
        },
        pregnancy: {
            pageBg: "#e3f2fd",
            serviceBox: "#f5fbff",
            policyBg: "#bbdefb",
            title: "#1565c0",
            checkboxBg: "#e3f2fd",
            checkboxHover: "#cfe8ff",
            selectedBorder: "#1565c0",
            btnHover: "#0d47a1",
        },
    };

    const serviceImages = {
        baby: [babyAssist, babyBurp, babySleep, babySooth, baby2, baby5],
        pet: [pet3, pet2, pet1, pet5],
        elder: [elder1, elder2, elder3, elder4],
        kitchen: [kitchen1, kitchen2, kitchen3, kitchen4],
        pregnancy: [preg1, preg2, preg3, preg4],
    };

    const serviceTitles = {
        baby: "Baby Care Services",
        pet: "Pet Care Services",
        elder: "Elder Care Services",
        kitchen: "Kitchen Assistance Services",
        pregnancy: "Pregnancy Care Services",
    };

    const { type } = useParams();

    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [customPet, setCustomPet] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const petBreeds = {
        dog: ["Labrador", "Golden Retriever", "German Shepherd", "Pug", "Beagle"],
        cat: ["Persian", "Siamese", "Maine Coon", "Ragdoll"],
    };

    const { cartItems } = useSelector((state) => state.cart);

    const services = servicesData[type] || [];
    const currentTheme = theme[type] || theme.baby;
    const pageTitle = serviceTitles[type] || `${type} Care Services`;

    const handleSelect = (service) => {
        const exists = cartItems.find((item) => item.serviceId === service.id);
        if (exists) {
            dispatch(removeFromCart(service.id));
        } else {
            dispatch(
                addToCart({
                    serviceId: service.id,
                    serviceType: type,
                    serviceName: service.name,
                    price: service.price,
                })
            );
        }
    };

    const images = serviceImages[type] || [];
    // Reversed image array for the second slider
    const reversedImages = [...images].reverse();

    return (
        <div
            className="sl-page"
            style={{ backgroundColor: currentTheme.pageBg, minHeight: "100vh" }}
        >
            <div className="sl-container">

                {/* ── Page Title ── */}
                <h2
                    className="sl-page-title"
                    style={{ color: currentTheme.title }}
                >
                    {pageTitle}
                </h2>

                {/* ══ TOP: Left + Right columns ══ */}
                <div className="sl-layout">

                    {/* ── LEFT — Service selection box ── */}
                    <div className="sl-left">
                        <div
                            className="sl-service-box"
                            style={{ backgroundColor: currentTheme.serviceBox }}
                        >
                            <div className="sl-box-header">
                                <h6 className="sl-box-title">What help do you need?</h6>
                                <p className="sl-box-subtext">
                                    Choose the options that match the help you're looking for.
                                </p>
                            </div>

                            {/* Pet type selector */}
                            {type === "pet" && (
                                <div className="sl-pet-selection">
                                    <div className="sl-pet-field">
                                        <label className="sl-field-label">Select Pet Type</label>
                                        <select
                                            className="sl-select"
                                            value={petType}
                                            onChange={(e) => {
                                                setPetType(e.target.value);
                                                setPetBreed("");
                                                setCustomPet("");
                                            }}
                                            style={{ backgroundColor: currentTheme.checkboxBg }}
                                        >
                                            <option value="">Choose Pet Type</option>
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>

                                    {petType && petType !== "others" && (
                                        <div className="sl-pet-field">
                                            <label className="sl-field-label">Select Breed</label>
                                            <select
                                                className="sl-select"
                                                value={petBreed}
                                                onChange={(e) => setPetBreed(e.target.value)}
                                                style={{ backgroundColor: currentTheme.checkboxBg }}
                                            >
                                                <option value="">Choose Breed</option>
                                                {petBreeds[petType]?.map((breed, i) => (
                                                    <option key={i} value={breed}>{breed}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {petType === "others" && (
                                        <div className="sl-pet-field">
                                            <label className="sl-field-label">Enter Pet Type</label>
                                            <input
                                                type="text"
                                                className="sl-input"
                                                placeholder="e.g. Rabbit, Parrot..."
                                                value={customPet}
                                                onChange={(e) => setCustomPet(e.target.value)}
                                                style={{ backgroundColor: currentTheme.checkboxBg }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Checkbox list */}
                            <div className="sl-checkbox-list">
                                {services[0]?.included.map((service, index) => {
                                    const uniqueId = `${type}-${index}`;
                                    const isSelected = cartItems.find(
                                        (item) => item.serviceId === uniqueId
                                    );
                                    return (
                                        <label
                                            key={index}
                                            className={`sl-checkbox-item ${isSelected ? "sl-checkbox-selected" : ""}`}
                                            style={{
                                                backgroundColor: currentTheme.checkboxBg,
                                                borderColor: isSelected
                                                    ? currentTheme.selectedBorder
                                                    : "transparent",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="sl-checkbox-input"
                                                checked={!!isSelected}
                                                onChange={() =>
                                                    handleSelect({ id: uniqueId, name: service, price: 0 })
                                                }
                                            />
                                            <span className="sl-service-name">{service}</span>
                                            {isSelected && (
                                                <span
                                                    className="sl-check-badge"
                                                    style={{ color: currentTheme.title }}
                                                >
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="sl-proceed-wrap">
                                    <button
                                        className="sl-proceed-btn"
                                        onClick={() => navigate("/dashboard/booking")}
                                        style={{ backgroundColor: currentTheme.title }}
                                    >
                                        Proceed to Booking ({cartItems.length} selected)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT — Two stacked image sliders ── */}
                    <div className="sl-right">

                        {/* Slider 1 — forward direction */}
                        <div className="sl-slider-wrap">
                            <div className="sl-slider-label" style={{ color: currentTheme.title }}>
                                Our Caregivers in Action
                            </div>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={12}
                                slidesPerView={2}
                                autoplay={{ delay: 2000, disableOnInteraction: false, reverseDirection: false }}
                                loop={true}
                                style={{ width: "100%" }}
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 10 },
                                    480: { slidesPerView: 2, spaceBetween: 12 },
                                }}
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={`fwd-${index}`}>
                                        <div className="sl-slide-img-wrap sl-slide-img-wrap--top">
                                            <img src={img} alt={`${type} service ${index + 1}`} />
                                            <div className="sl-slide-shimmer" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Slider 2 — reverse direction */}
                        <div className="sl-slider-wrap">
                            <div className="sl-slider-label" style={{ color: currentTheme.title }}>
                                Moments of Care
                            </div>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={12}
                                slidesPerView={2}
                                autoplay={{ delay: 1700, disableOnInteraction: false, reverseDirection: true }}
                                loop={true}
                                style={{ width: "100%" }}
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 10 },
                                    480: { slidesPerView: 2, spaceBetween: 12 },
                                }}
                            >
                                {reversedImages.map((img, index) => (
                                    <SwiperSlide key={`rev-${index}`}>
                                        <div className="sl-slide-img-wrap sl-slide-img-wrap--bottom">
                                            <img src={img} alt={`${type} service reverse ${index + 1}`} />
                                            <div className="sl-slide-shimmer" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </div>

                {/* ══ BOTTOM: Full-width policy cards ══ */}
                <div className="sl-policy-section">

                    <div className="sl-policy-section-title" style={{ color: currentTheme.title }}>
                        Before You Book
                    </div>

                    <div className="sl-policy-grid">

                        {/* Not included */}
                        <div
                            className="sl-policy-card sl-not-included"
                            style={{ backgroundColor: currentTheme.policyBg }}
                        >
                            <h6 className="sl-policy-heading sl-policy-heading--danger">
                                ⚠ Services Not Covered
                            </h6>
                            <ul className="sl-policy-list">
                                {services[0]?.notIncluded.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Responsibilities */}
                        <div
                            className="sl-policy-card sl-responsibilities"
                            style={{ backgroundColor: currentTheme.policyBg }}
                        >
                            <h6 className="sl-policy-heading sl-policy-heading--info">
                                📌 Customer Guidelines
                            </h6>
                            <ul className="sl-policy-list">
                                {services[0]?.responsibilities.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceLists;