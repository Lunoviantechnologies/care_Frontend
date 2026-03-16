import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();

    return (
        <div className="container py-5">

            <h2>Your Cart</h2>

            {cartItems.map((item, index) => (

                <div key={index} className="card p-3 mb-3">

                    <h5>{item.serviceType} Service</h5>

                    <p>Date: {item.bookingDetails.date}</p>

                    <p>Time: {item.bookingDetails.time}</p>

                    <p>₹{item.price}</p>

                </div>

            ))}

            <button
                className="btn btn-primary"
                onClick={() => navigate("/checkout")}
            >
                Proceed To Checkout
            </button>

        </div>
    );
};

export default Cart;