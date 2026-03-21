import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBookingDetails, removeFromCart } from "../cart/cartSlice";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const BookingForm = () => {

    const bgColors = {
        baby: "#ffe4ec",   // baby pink
        pet: "#fff9c4",    // light yellow
        elder: "#ede7f6"   // light violet
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const serviceType = cartItems[0]?.serviceType;

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        notes: "",

        guardianPresent: false,
        allergies: "",

        medicalHistory: "",
        walkerAvailable: false,

        petBehavior: "",
        vaccinationConfirmed: false,

        acceptPolicy: false
    });

    if (cartItems.length === 0) {
        navigate("/");
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.acceptPolicy) {
            alert("Please accept service policy before continuing");
            return;
        }

        cartItems.forEach((service) => {
            dispatch(
                updateBookingDetails({
                    serviceId: service.serviceId,
                    bookingDetails: formData
                })
            );
        });

        navigate("/dashboard/checkout");
    };

    return (
        <div style={{ backgroundColor: bgColors[serviceType] || "#ffffff", minHeight: "100vh" }}>
            <div className="container py-5">

                {/* Back Button */}
                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate(-1)}
                >
                    <FaLongArrowAltLeft /> Back to Services
                </button>

                <div className="row g-4">

                    {/* Booking Form */}
                    <div className="col-lg-7">

                        <div className="card p-4" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}>

                            <h4 className="mb-4">Booking Details</h4>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        name="name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Notes</label>
                                    <textarea
                                        className="form-control"
                                        name="notes"
                                        rows="3"
                                        onChange={handleChange}
                                    />
                                </div>

                                {serviceType === "baby" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Baby Allergies / Special Instructions</label>
                                            <textarea
                                                className="form-control"
                                                name="allergies"
                                                rows="2"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name="guardianPresent"
                                                onChange={(e) => setFormData({ ...formData, guardianPresent: e.target.checked })}
                                                required
                                            />
                                            <label className="form-check-label">
                                                Guardian will be present during service
                                            </label>
                                        </div>
                                    </>
                                )}

                                {serviceType === "elder" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Medical History</label>
                                            <textarea
                                                className="form-control"
                                                name="medicalHistory"
                                                rows="2"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name="walkerAvailable"
                                                onChange={(e) => setFormData({ ...formData, walkerAvailable: e.target.checked })}
                                            />
                                            <label className="form-check-label">
                                                Walker/Wheelchair Available
                                            </label>
                                        </div>
                                    </>
                                )}

                                {serviceType === "pet" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Pet Behavior</label>
                                            <input
                                                className="form-control"
                                                name="petBehavior"
                                                onChange={handleChange}
                                                placeholder="Friendly / aggressive / shy"
                                            />
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name="vaccinationConfirmed"
                                                onChange={(e) => setFormData({ ...formData, vaccinationConfirmed: e.target.checked })}
                                                required
                                            />
                                            <label className="form-check-label">
                                                Pet vaccination completed
                                            </label>
                                        </div>
                                    </>
                                )}

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date</label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split("T")[0]}
                                            className="form-control"
                                            name="date"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            name="time"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="form-check mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="acceptPolicy"
                                        onChange={(e) => setFormData({ ...formData, acceptPolicy: e.target.checked })}
                                        required
                                    />
                                    <label className="form-check-label">
                                        I agree to the service limitations and responsibilities
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>Service Duration</label>

                                    <select
                                        className="form-select"
                                        name="duration"
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">Select Duration</option>
                                        <option value="2hr">2 Hours</option>
                                        <option value="4hr">4 Hours</option>
                                        <option value="fullDay">Full Day</option>

                                    </select>

                                </div>

                                <button className="btn btn-success w-100 mt-3">
                                    Continue To Checkout
                                </button>

                            </form>

                        </div>

                    </div>


                    {/* Order Summary */}
                    <div className="col-lg-5">

                        <div className="card p-4" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}>

                            <h5 className="mb-3">Order Summary</h5>

                            {cartItems.map((item) => (

                                <div
                                    key={item.serviceId}
                                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                                >

                                    <div>
                                        <div className="fw-semibold">
                                            {item.serviceName}
                                        </div>
                                        <small className="text-muted">
                                            Qty: {item.quantity}
                                        </small>
                                    </div>

                                    <div className="text-end">

                                        <div>₹{item.price}</div>

                                        <button
                                            className="btn btn-sm btn-link text-danger p-0"
                                            onClick={() =>
                                                dispatch(removeFromCart(item.serviceId))
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                            <div className="d-flex justify-content-between mt-4 fw-bold fs-5">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default BookingForm;