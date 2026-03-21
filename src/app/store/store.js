import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/authSlice";
import cartReducer from "../../features/cart/cartSlice";
// import bookingReducer from "../../features/booking/bookingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        // booking: bookingReducer,
    }
});

export default store;