import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {

            const item = action.payload;

            const existingItem = state.cartItems.find(
                (i) => i.serviceId === item.serviceId
            );

            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                state.cartItems.push({
                    ...item,
                    quantity: 1,
                    bookingDetails: item.bookingDetails || null
                });

            }

            state.totalQuantity += 1;
            state.totalAmount += item.price;
        },


        removeFromCart: (state, action) => {

            const serviceId = action.payload;

            const existingItem = state.cartItems.find(
                (item) => item.serviceId === serviceId
            );

            if (!existingItem) return;

            state.totalQuantity -= existingItem.quantity;
            state.totalAmount -= existingItem.price * existingItem.quantity;

            state.cartItems = state.cartItems.filter(
                (item) => item.serviceId !== serviceId
            );

        },


        increaseQuantity: (state, action) => {

            const serviceId = action.payload;

            const item = state.cartItems.find(
                (i) => i.serviceId === serviceId
            );

            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalAmount += item.price;
            }

        },


        decreaseQuantity: (state, action) => {

            const serviceId = action.payload;

            const item = state.cartItems.find(
                (i) => i.serviceId === serviceId
            );

            if (!item) return;

            item.quantity -= 1;
            state.totalQuantity -= 1;
            state.totalAmount -= item.price;

            if (item.quantity === 0) {
                state.cartItems = state.cartItems.filter(
                    (i) => i.serviceId !== serviceId
                );
            }

        },


        updateBookingDetails: (state, action) => {

            const { serviceId, bookingDetails } = action.payload;

            const item = state.cartItems.find(
                (i) => i.serviceId === serviceId
            );

            if (item) {
                item.bookingDetails = bookingDetails;
            }

        },


        clearCart: (state) => {

            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;

        }

    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateBookingDetails, clearCart } = cartSlice.actions;
export default cartSlice.reducer;