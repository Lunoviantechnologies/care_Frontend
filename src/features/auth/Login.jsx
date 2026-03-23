import React, { useState } from "react";
import "../../styleSheets/login.css";

import baby from "../../assets/baby1.jpg";
import pet from "../../assets/pet1.jpg";
import elder from "../../assets/elder3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./authSlice";
import { customerLogin } from "../../api/allApis";
import { toast } from "react-toastify";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState("password");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [auth, setAuth] = useState({
        "phone": "",
        "password": ""
    });
    const [error, setError] = useState("");

    const { accessToken } = useSelector((state) => state.auth);

    // 🔒 Protect route
    if (accessToken) {
        return <Navigate to="/dashboard" />;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const slides = [
        { image: baby, title: "Baby Care", text: "Safe and nurturing care for your little ones." },
        { image: pet, title: "Pet Care", text: "Reliable and loving care for your pets." },
        { image: elder, title: "Elder Care", text: "Compassionate care for seniors with dignity and respect." }
    ];

    const handleOtpChange = (value, index, e) => {

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move to next input
        if (value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }

    };

    const handlePaste = (e) => {

        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasteData)) return;

        const pasteOtp = pasteData.split("");
        const newOtp = [...otp];

        pasteOtp.forEach((num, index) => {
            newOtp[index] = num;
        });

        setOtp(newOtp);
    };

    const handlePassLogin = async () => {
        // console.log("login data: ", auth);

        try {
            const res = await customerLogin(auth);
            console.log("login response : ", res);

            const loginData = res.data.data;

            dispatch(loginSuccess(loginData));

            // ✅ Role-based navigation
            if (loginData.role === "customer") {
                navigate("/dashboard");
                toast.success("Login successfull");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.error("login error: ", err);
            const message = err?.response?.data?.detail || err?.response?.data?.message || "Invalid credentials";
            toast.error(message);
        }
    };

    return (
        <div className="login-page">

            {/* LEFT SLIDER */}

            <div className="login-left">

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000 }}
                    loop={true}
                    className="login-slider"
                >

                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>

                            <div className="slide">
                                <img src={slide.image} alt={slide.title} className="slide-img" />

                                <div className="overlay">
                                    <h1>Welcome!</h1>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.text}</p>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>

            {/* RIGHT LOGIN FORM */}

            <div className="login-right">

                <div className="login-box">
                    <b>Welcome back!</b>
                    <h2>Login</h2>

                    {loginType === "password" ? (

                        <>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                if (!auth.phone || auth.phone.length !== 10) {
                                    setError("Mobile number must be 10 digits");
                                    return;
                                };
                                handlePassLogin();
                            }}>

                                {error && <p className="login-error-text">{error}</p>}

                                <input
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    className="login-input"
                                    maxLength={10}
                                    value={auth.phone || ""}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setAuth({ ...auth, phone: value });
                                        if (value.length === 10) {
                                            setError(""); // clear error when valid
                                        }
                                    }}
                                />

                                <div className="password-box">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="login-input"
                                        onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                                    />

                                    <span
                                        className="eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <p className="forgot" onClick={() => navigate("/forget_password")}>
                                    Forgot Password?
                                </p>

                                <button type="submit" className="login-btn">
                                    Login
                                </button>

                            </form>

                            <div className="or">OR</div>

                            <button className="otp-btn" onClick={() => setLoginType("otp")}>
                                Continue with OTP
                            </button>
                        </>

                    ) : (

                        <>
                            {loginType === "otp" && (

                                <>
                                    <p className="back-login text-success"
                                        onClick={() => setLoginType("password")}>
                                        <MdKeyboardDoubleArrowLeft size={25} /> Back
                                    </p>

                                    <div className="enter-mobile">
                                        <input
                                            type="text"
                                            placeholder="Enter Mobile Number"
                                            className="login-input"
                                            maxLength={10}
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />

                                        <button
                                            className="login-btn"
                                            onClick={() => setLoginType("verifyOtp")}
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                </>

                            )}
                        </>

                    )}

                    {loginType === "verifyOtp" && (

                        <>
                            <p className="back-login text-success" onClick={() => setLoginType("otp")}>
                                <MdKeyboardDoubleArrowLeft size={25} /> Change Number
                            </p>

                            <p className="otp-text">
                                Enter OTP sent to {mobile}
                            </p>

                            <div className="otp-container" onPaste={handlePaste}>

                                {otp.map((digit, index) => (

                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="otp-input"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index, e)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />

                                ))}

                            </div>

                            <button className="login-btn">
                                Verify OTP
                            </button>

                            <p className="resend">Resend OTP</p>
                        </>

                    )}

                    <p className="create-account" onClick={() => navigate("/register")}>
                        Don't have an account? <span>Create Account</span>
                    </p>

                </div>

            </div>

        </div>
    );
};