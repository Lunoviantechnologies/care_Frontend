import { useState } from "react";
import { FaGooglePay, FaCreditCard, FaCheckCircle, FaLongArrowAltLeft } from "react-icons/fa";
import "../../styleSheets/paymentPage.css";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="container py-5 text-center">

        <FaCheckCircle size={70} className="text-success mb-3" />

        <h2 className="fw-bold">Payment Successful</h2>

        <p className="text-muted">
          Your service booking has been confirmed.
        </p>

        <button
          className="btn btn-success mt-3"
          onClick={() => window.location.href = "/"}
        >
          Go To Home
        </button>

      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Back Button */}
      <button className="btn btn-light border mb-4" onClick={() => navigate(-1)} >
        <FaLongArrowAltLeft className="me-2" />
        Back
      </button>

      <h2 className="mb-4 fw-bold">Payment</h2>

      <p className="text-muted mb-4">
        Choose your payment method
      </p>

      <div className="row g-4">

        {/* UPI Payment */}
        <div className="col-md-6">
          <div className="card payment-card p-4 border-0">

            <div className="d-flex align-items-center mb-3">
              <FaGooglePay size={30} className="text-success me-3" />
              <h5 className="mb-0">UPI Payment</h5>
            </div>

            <input
              type="text"
              placeholder="Enter UPI ID"
              className="form-control mb-3"
            />

            <button
              className="btn btn-success w-100"
              onClick={handlePayment}
            >
              Pay with UPI
            </button>

          </div>
        </div>

        {/* Card Payment */}
        <div className="col-md-6">
          <div className="card payment-card p-4 border-0">

            <div className="d-flex align-items-center mb-3">
              <FaCreditCard size={28} className="text-primary me-3" />
              <h5 className="mb-0">Card Payment</h5>
            </div>

            <input
              type="text"
              placeholder="Card Number"
              className="form-control mb-3"
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              className="form-control mb-3"
            />

            <div className="row">
              <div className="col">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="form-control mb-3"
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  placeholder="CVV"
                  className="form-control mb-3"
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handlePayment}
            >
              Pay with Card
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default PaymentPage;