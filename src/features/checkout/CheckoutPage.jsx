import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowLeft, FaCreditCard, FaMoneyBillWave,
  FaBaby, FaPaw, FaUserNurse, FaHeartbeat, FaUtensils,
  FaCalendarAlt, FaClock, FaUser, FaStickyNote, FaExclamationTriangle
} from "react-icons/fa";
import "../../styleSheets/checkoutPage.css";
import { toast } from "react-toastify";
import { clearCart } from "../cart/cartSlice";
import { resetBooking } from "../booking/bookingSlice";
import { useEffect } from "react";
import { payOnline, verifyPayment } from "../../api/allApis";

const CheckoutPage = () => {

  const themeMap = {
    baby: {
      pageBg: "#ffe4ec",
      accent: "#e00950",
      accentLight: "#ffdce8",
      accentMid: "#f9d7e2",
      icon: FaBaby,
      label: "Baby Care",
    },
    pet: {
      pageBg: "#fff9c4",
      accent: "#c49000",
      accentLight: "#fff4a3",
      accentMid: "#fff3a0",
      icon: FaPaw,
      label: "Pet Care",
    },
    elder: {
      pageBg: "#ede7f6",
      accent: "#5e35b1",
      accentLight: "#e2d9ff",
      accentMid: "#ddd2ff",
      icon: FaUserNurse,
      label: "Elder Care",
    },
    pregnancy: {
      pageBg: "#e3f2fd",
      accent: "#1565c0",
      accentLight: "#bbdefb",
      accentMid: "#e3f2fd",
      icon: FaHeartbeat,
      label: "Pregnancy Care",
    },
    kitchen: {
      pageBg: "#f1f8e9",
      accent: "#33691e",
      accentLight: "#dcedc8",
      accentMid: "#e8f5e9",
      icon: FaUtensils,
      label: "Home Assistance",
    },
  };

  const limitationsMap = {
    baby: [
      "No medicines or injections will be given",
      "No oil massage therapy",
      "Guardian must be present during service",
    ],
    elder: [
      "No medical nursing services",
      "No injections or wound dressing",
      "No handling aggressive dementia patients",
    ],
    pet: [
      "No grooming or veterinary procedures",
      "No handling aggressive pets",
      "No medicines will be administered",
    ],
    pregnancy: [
      "No clinical or medical procedures",
      "Only companionship and light assistance provided",
      "Emergency medical decisions are not caregiver's responsibility",
    ],
    kitchen: [
      "No heavy construction or electrical work",
      "Caregiver is not responsible for damages due to existing faults",
      "Equipment/tools must be provided by the customer",
    ],
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: id } = useSelector((state) => state.auth);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const { bookingDetails, serviceType } = useSelector((state) => state.booking);

  const theme = themeMap[serviceType] || themeMap.baby;
  const ServiceIcon = theme.icon;
  const limitations = limitationsMap[serviceType] || [];

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems]);

  const handleCOD = () => {
    toast.success("Your booking is confirmed. Caregiver will arrive at the scheduled time.");

    dispatch(clearCart());
    dispatch(resetBooking());

    navigate("/dashboard/live_tracking");
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePay = async () => {
    console.log("total amount: ", totalAmount + 100);

    try {
      const res = await payOnline({
        "amount": totalAmount + 100,
        "booking_id": 1234,
        "customer_id": id?.user_id,
      });
      console.log("pay online res: ", res);

      const { razorpay_key_id, razorpay_order_id, amount, payment_id } = res.data;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        return;
      };

      const options = {
        key: razorpay_key_id,
        amount: amount * 100,
        currency: "INR",
        name: "Care Services",
        description: `Booking for ${theme.label}`,
        order_id: razorpay_order_id,
        handler: async function (response) {
          // response has: razorpay_payment_id, razorpay_order_id, razorpay_signature
          console.log("Payment success:", response);
          try {
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,  // use response values, not outer vars
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment successful! Your booking is confirmed.");
            dispatch(clearCart());
            dispatch(resetBooking());
            navigate("/dashboard/live_tracking");

          } catch (err) {
            console.error("Verification failed:", err);
            toast.error("Payment verification failed. Please contact support.");
          }
        },

        prefill: {
          name: bookingDetails?.name || "",
        },
        theme: {
          color: theme.accent,
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
    }
    // navigate("/dashboard/payment");
  };

  // console.log("user id: ", id.user_id);

  return (
    <div className="co-page" style={{ backgroundColor: theme.pageBg }}>
      <div className="co-container">

        {/* ── Header ── */}
        <div className="co-header">
          <button className="co-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className="co-header-title">
            <div className="co-header-icon" style={{ backgroundColor: theme.accentLight, color: theme.accent }}>
              <ServiceIcon />
            </div>
            <div>
              <p className="co-header-eyebrow">Final Step</p>
              <h1 className="co-header-name">Checkout</h1>
            </div>
          </div>
        </div>

        {/* ── Body grid ── */}
        <div className="co-body">

          {/* ══ LEFT COLUMN ══ */}
          <div className="co-left">

            {/* Payment methods */}
            <div className="co-section-label">Choose Payment Method</div>

            <button
              className="co-payment-card"
              onClick={handleOnlinePay}
            >
              <div className="co-payment-icon co-payment-icon--online">
                <FaCreditCard />
              </div>
              <div className="co-payment-info">
                <span className="co-payment-title">Pay Online</span>
                <span className="co-payment-sub">Card, UPI, or Net Banking — instant confirmation</span>
              </div>
              <span className="co-payment-arrow">→</span>
            </button>

            <button
              className="co-payment-card"
              onClick={handleCOD}
            >
              <div className="co-payment-icon co-payment-icon--cod">
                <FaMoneyBillWave />
              </div>
              <div className="co-payment-info">
                <span className="co-payment-title">Cash on Delivery</span>
                <span className="co-payment-sub">Pay after the service is completed</span>
              </div>
              <span className="co-payment-arrow">→</span>
            </button>

            {/* Booking details */}
            <div className="co-section-label" style={{ marginTop: 28 }}>Booking Details</div>
            <div className="co-detail-card">
              <div className="co-detail-grid">
                {bookingDetails?.name && (
                  <div className="co-detail-item">
                    <span className="co-detail-icon"><FaUser /></span>
                    <div>
                      <span className="co-detail-key">Name</span>
                      <span className="co-detail-val">{bookingDetails.name}</span>
                    </div>
                  </div>
                )}
                {bookingDetails?.date && (
                  <div className="co-detail-item">
                    <span className="co-detail-icon"><FaCalendarAlt /></span>
                    <div>
                      <span className="co-detail-key">Date</span>
                      <span className="co-detail-val">{bookingDetails.date}</span>
                    </div>
                  </div>
                )}
                {bookingDetails?.time && (
                  <div className="co-detail-item">
                    <span className="co-detail-icon"><FaClock /></span>
                    <div>
                      <span className="co-detail-key">Time</span>
                      <span className="co-detail-val">{bookingDetails.time}</span>
                    </div>
                  </div>
                )}
                {bookingDetails?.duration && (
                  <div className="co-detail-item">
                    <span className="co-detail-icon">⏱</span>
                    <div>
                      <span className="co-detail-key">Duration</span>
                      <span className="co-detail-val">{bookingDetails.duration}</span>
                    </div>
                  </div>
                )}
                {bookingDetails?.notes && (
                  <div className="co-detail-item co-detail-item--full">
                    <span className="co-detail-icon"><FaStickyNote /></span>
                    <div>
                      <span className="co-detail-key">Notes</span>
                      <span className="co-detail-val">{bookingDetails.notes}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="co-right">

            {/* Order summary */}
            <div className="co-section-label">Order Summary</div>
            <div className="co-summary-card">
              <div className="co-summary-list">
                {cartItems.map((item) => (
                  <div className="co-summary-row" key={item.serviceId}>
                    <div className="co-summary-dot" style={{ backgroundColor: theme.accent }} />
                    <span className="co-summary-name">{item.serviceName} ×{item.quantity}</span>
                    <span className="co-summary-price">₹{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="co-summary-total" style={{ borderColor: theme.accentLight }}>
                <span className="co-total-label">Total Payable</span>
                <span className="co-total-value" style={{ color: theme.accent }}>₹{totalAmount}</span>
              </div>
              <div className="co-trust-row">
                <span>🔒</span>
                <span className="co-trust-text">100% secure checkout. No hidden charges.</span>
              </div>
            </div>

            {/* Service limitations */}
            {limitations.length > 0 && (
              <>
                <div className="co-section-label" style={{ marginTop: 24 }}>Service Limitations</div>
                <div className="co-limitations-card" style={{ backgroundColor: theme.accentMid, borderColor: theme.accentLight }}>
                  <div className="co-limitations-header">
                    <FaExclamationTriangle style={{ color: theme.accent }} />
                    <span style={{ color: theme.accent }}>Please read before confirming</span>
                  </div>
                  <ul className="co-limitations-list">
                    {limitations.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;