import babyAssist from "../../assets/baby1.jpg";
import babySleep from "../../assets/baby3.webp";
import babyBurp from "../../assets/baby4.jpg";
import babySooth from "../../assets/soothing.webp";

import pet1 from "../../assets/pet1.jpg";
import pet2 from "../../assets/pet2.jpg";
import pet3 from "../../assets/pet3.jpg";
import pet5 from "../../assets/pet5.jpg";

import elder1 from "../../assets/elder1.jpg";
import elder2 from "../../assets/elder2.jpg";
import elder3 from "../../assets/elder3.jpg";
import elder4 from "../../assets/elder4.jpg";

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
            policyBg: "#ffdce8",
            title: "#e00950",
            checkboxBg: "#f9d7e2",
            checkboxHover: "#f3c0d2"
        },
        pet: {
            pageBg: "#fff9c4",
            serviceBox: "#fffde7",
            policyBg: "#fff4a3",
            title: "#c49000",
            checkboxBg: "#fff3a0",
            checkboxHover: "#ffe67c"
        },
        elder: {
            pageBg: "#ede7f6",
            serviceBox: "#f6f2ff",
            policyBg: "#e2d9ff",
            title: "#5e35b1",
            checkboxBg: "#ddd2ff",
            checkboxHover: "#cfc0ff"
        }
    };

    const serviceImages = {
        baby: [babyAssist, babyBurp, babySleep, babySooth],
        pet: [pet3, pet2, pet1, pet5],
        elder: [elder1, elder2, elder3, elder4],
    };

    const { type } = useParams();

    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [customPet, setCustomPet] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const petBreeds = {
        dog: ["Labrador", "Golden Retriever", "German Shepherd", "Pug", "Beagle"],
        cat: ["Persian", "Siamese", "Maine Coon", "Ragdoll"]
    };

    const { cartItems } = useSelector((state) => state.cart);

    const services = servicesData[type] || [];

    const currentTheme = theme[type] || theme.baby;

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
                    price: service.price
                })
            );
        }
    };

    return (

        <div style={{ backgroundColor: currentTheme.pageBg, minHeight: "100vh" }}>

            <div className="container py-5">

                <h2 className="mb-4 text-capitalize serviceTitle" style={{ color: currentTheme.title, fontWeight: "bold" }}>
                    {type} Care Services
                </h2>

                <div className="row">

                    {/* LEFT SIDE - SCROLLABLE SERVICES */}
                    <div className="col-md-5">

                        <div className="service-box" style={{ backgroundColor: currentTheme.serviceBox }}>

                            <div className="service-box-header">
                                <h6>What help do you need?</h6>
                                <p className="service-subtext">
                                    Choose the options that match the help you're looking for.
                                </p>
                            </div>

                            {type === "pet" && (

                                <div className="pet-selection mb-3 d-flex justify-content-evenly">

                                    {/* PET TYPE */}
                                    <div className="col-md-6 mb-3 me-2">

                                        <label className="form-label fw-semibold">
                                            Select Pet Type
                                        </label>

                                        <select
                                            className="form-select"
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

                                    {/* BREED DROPDOWN */}
                                    {petType && petType !== "others" && (

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Select Breed
                                            </label>

                                            <select
                                                className="form-select"
                                                value={petBreed}
                                                onChange={(e) => setPetBreed(e.target.value)}
                                                style={{ backgroundColor: currentTheme.checkboxBg }}
                                            >
                                                <option value="">Choose Breed</option>

                                                {petBreeds[petType]?.map((breed, i) => (
                                                    <option key={i} value={breed}>
                                                        {breed}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                    )}

                                    {/* OTHER PET INPUT */}
                                    {petType === "others" && (

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-semibold">
                                                Enter Pet Type
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter pet type"
                                                value={customPet}
                                                onChange={(e) => setCustomPet(e.target.value)}
                                                style={{ backgroundColor: currentTheme.checkboxBg }}
                                            />

                                        </div>

                                    )}

                                </div>

                            )}

                            <div className="service-checkbox-list">

                                {services[0]?.included.map((service, index) => {

                                    const isSelected = cartItems.find((item) => item.serviceId === index);

                                    return (

                                        <label
                                            key={service.id}
                                            className={`service-checkbox-item ${isSelected ? "selected-service" : ""}`}
                                            style={{ backgroundColor: currentTheme.checkboxBg }}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={!!isSelected}
                                                onChange={() =>
                                                    handleSelect({
                                                        id: index,
                                                        name: service,
                                                        price: 0
                                                    })
                                                }
                                            />

                                            <span className="service-name">
                                                {service}
                                            </span>

                                        </label>

                                    );
                                })}

                            </div>

                            {cartItems.length > 0 && (

                                <div className="d-flex justify-content-end mt-3">

                                    <button
                                        className="btn"
                                        onClick={() => navigate("/booking")}
                                        style={{ backgroundColor: currentTheme.title, color: "white" }}
                                    >
                                        Proceed to Booking ({cartItems.length})
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* RIGHT SIDE - STICKY POLICIES */}
                    <div className="col-md-7">

                        {/* SERVICE IMAGE SLIDER */}
                        <div className="service-image-slider mb-4">

                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={15}
                                slidesPerView={2}
                                autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false
                                }}
                                loop={true}
                            >

                                {serviceImages[type]?.map((img, index) => (

                                    <SwiperSlide key={index}>

                                        <div className="slider-image-wrapper">
                                            <img src={img} alt="service" />
                                        </div>

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                        </div>

                        <div className="policy-container">

                            <div className="row g-3">

                                {/* NOT INCLUDED */}
                                <div className="col-md-6">
                                    <div className="policy-card notincluded" style={{ backgroundColor: currentTheme.policyBg }}>

                                        <h6 className="text-danger">
                                            ⚠ Services Not Covered
                                        </h6>

                                        <ul>
                                            {services[0]?.notIncluded.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                                {/* RESPONSIBILITIES */}
                                <div className="col-md-6">
                                    <div className="policy-card responsibilities" style={{ backgroundColor: currentTheme.policyBg }}>

                                        <h6 className="text-primary">
                                            📌 Customer Guidelines
                                        </h6>

                                        <ul>
                                            {services[0]?.responsibilities.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ServiceLists;