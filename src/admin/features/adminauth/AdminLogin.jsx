import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import babyImg from "../../../assets/baby1.jpg";
import petImg from "../../../assets/pet3.jpg";
import elderImg from "../../../assets/elder2.jpg";
import styles from "../../stylesheet/adminLogin.module.css";

const services = [
  { title: "Baby Care Services", image: babyImg },
  { title: "Pet Care Services", image: petImg },
  { title: "Elder Care Services", image: elderImg },
];

const AdminLogin = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  const inputRefs = useRef([]);
  const DEFAULT_OTP = "1234";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/baby/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) =>
        prev === services.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    if (mobile.length !== 10) return alert("Enter valid mobile number");
    setStep(2);
    setTimer(30);
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join("") !== DEFAULT_OTP) {
      alert("Invalid OTP (use 1234)");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("token", "admin-token");
      navigate("/admin/baby/dashboard", { replace: true });
    }, 1200);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* LEFT PANEL */}
        <div
          className={styles.servicePanel}
          style={{
            backgroundImage: `url(${services[currentService].image})`
          }}
        >
          <div className={styles.overlay}>
            <h2>{services[currentService].title}</h2>
            <p>
              Professional and trusted care services managed through our admin dashboard
            </p>

            <div className={styles.dots}>
              {services.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${index === currentService ? styles.active : ""
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.loginPanel}>
          <div className={styles.loginBox}>
            <div className={styles.logo}>🛡️</div>

            <h2>Admin Login</h2>

            {step === 1 && (
              <div className={styles.step}>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  maxLength="10"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, ""))
                  }
                />
                <button onClick={handleSendOtp}>Send OTP</button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.step}>
                <div className={styles.otpBox}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength="1"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                    />
                  ))}
                </div>

                <button onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;