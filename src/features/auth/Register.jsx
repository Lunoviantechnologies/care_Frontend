import React, { useState } from "react";
import "../../styleSheets/register.css";

import baby from "../../assets/baby1.jpg";
import pet from "../../assets/pet1.jpg";
import elder from "../../assets/elder3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useNavigate } from "react-router-dom";
import { registerCoustomer } from "../../api/allApis";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        address: "",
        city: ""
    });

    const slides = [
        { image: baby, title: "Baby Care", text: "Safe and nurturing care for your little ones." },
        { image: pet, title: "Pet Care", text: "Reliable and loving care for your pets." },
        { image: elder, title: "Elder Care", text: "Compassionate care for seniors with dignity and respect." }
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        try{
            const res = await registerCoustomer(form);
            console.log("register response: ", res.data);

            navigate("/login");
        } catch (err) {
            console.log("register error: ", err);
        };

    };

    return (
        <div className="register-page">

            {/* LEFT REGISTER FORM */}

            <div className="register-right">

                <div className="register-box" style={{ height: "auto" }}>

                    <b>Create your account</b>
                    <h2>Register</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="register-input"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            className="register-input"
                            maxLength={10}
                            value={form.mobile}
                            onChange={(e) => {
                                const value = e.target.value;

                                // allow only numbers
                                if (/^\d*$/.test(value)) {
                                    setForm({ ...form, mobile: value });
                                }
                            }}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="register-input"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="register-input"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="register-input"
                            value={form.address}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="register-input"
                            value={form.city}
                            onChange={handleChange}
                        />

                        <button type="submit" className="register-btn">
                            Create Account
                        </button>

                    </form>

                    <p
                        className="create-account"
                        onClick={() => navigate("/login")}
                    >
                        Already have an account? <span>Login</span>
                    </p>

                </div>

            </div>

            {/* RIGHT SLIDER */}

            <div className="register-left">

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000 }}
                    loop={true}
                    className="register-slider"
                >

                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>

                            <div className="register-slide">
                                <img src={slide.image} alt={slide.title} className="slide-img" />

                                <div className="register-overlay">
                                    <h1>Join Us!</h1>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.text}</p>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>

        </div>
    );
};