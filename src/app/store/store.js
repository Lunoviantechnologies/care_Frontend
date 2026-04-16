import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/authSlice";
import cartReducer from "../../features/cart/cartSlice";
import bookingReducer from "../../features/booking/bookingSlice";
import customerProfileReducer from "../../features/profile/customerProfileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        booking: bookingReducer,
        customerProfile: customerProfileReducer,
    }
});

export default store;