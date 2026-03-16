import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLongArrowAltLeft, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import "../../styleSheets/checkoutPage.css";

const CheckoutPage = () => {

  const bgColors = {
    baby: "#ffe4ec",   // baby pink
    pet: "#fff9c4",    // light yellow
    elder: "#ede7f6"   // light violet
  };

  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const serviceType = cartItems[0]?.serviceType;
  const bookingDetails = cartItems[0]?.bookingDetails;

  if (cartItems.length === 0) {
    navigate("/");
    return null;
  };

  const handleCOD = () => {

    alert("Your booking is confirmed. Caregiver will arrive at scheduled time.");

    navigate("/order-success");

  };

  return (
    <div style={{ backgroundColor: bgColors[serviceType] || "#ffffff", minHeight: "100vh" }}>
      <div className="container py-5">

        {/* Back Button */}
        <button
          className="btn btn-light border mb-4"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft className="me-2" />
          Back
        </button>

        <h2 className="mb-4 fw-bold">Checkout</h2>

        <div className="row g-4">

          {/* Payment Section - LEFT */}
          <div className="col-md-7">

            <p className="text-muted mb-4">
              Choose your preferred payment method
            </p>

            {/* Pay Online */}
            <div
              className="card payment-card p-4 border-0 mb-3"
              onClick={() => navigate("/payment")}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <FaCreditCard size={28} className="text-success me-3" />
                <div>
                  <h5 className="mb-1">Pay Online</h5>
                  <p className="text-muted mb-0">
                    Secure payment using card, UPI, or net banking.
                  </p>
                </div>
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              className="card payment-card p-4 border-0 mb-3"
              onClick={() => alert("Order Placed")}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <FaMoneyBillWave size={28} className="text-warning me-3" />
                <div onClick={handleCOD}>
                  <h5 className="mb-1">Cash On Delivery</h5>
                  <p className="text-muted mb-0">
                    Pay in cash after the service is completed.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-4 border-0 mb-3 orderCheckout">

              <h5>Booking Details</h5>
              <hr />

              <p className="mb-1">
                <strong>Name:</strong> {bookingDetails?.name}
              </p>

              <p className="mb-1">
                <strong>Date:</strong> {bookingDetails?.date}
              </p>

              <p className="mb-1">
                <strong>Time:</strong> {bookingDetails?.time}
              </p>

              {bookingDetails?.notes && (
                <p className="mb-0">
                  <strong>Notes:</strong> {bookingDetails?.notes}
                </p>
              )}

            </div>

          </div>

          {/* Order Summary - RIGHT */}
          <div className="col-md-5">

            <div className="card p-4 border-0 orderCheckout">

              <h5 className="">Order Summary</h5>
              <hr />
              {cartItems.map((item) => (
                <div
                  key={item.serviceId}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <span>{item.serviceName} x{item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-3 fw-bold fs-5">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

            </div>

          </div>

          <div className="alert alert-warning mt-4">

            <strong>Service Limitations</strong>

            {serviceType === "baby" && (
              <ul className="mb-0 mt-2">
                <li>No medicines or injections will be given</li>
                <li>No oil massage therapy</li>
                <li>Guardian must be present during service</li>
              </ul>
            )}

            {serviceType === "elder" && (
              <ul className="mb-0 mt-2">
                <li>No medical nursing services</li>
                <li>No injections or wound dressing</li>
                <li>No handling aggressive dementia patients</li>
              </ul>
            )}

            {serviceType === "pet" && (
              <ul className="mb-0 mt-2">
                <li>No grooming or veterinary procedures</li>
                <li>No handling aggressive pets</li>
                <li>No medicines will be administered</li>
              </ul>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;