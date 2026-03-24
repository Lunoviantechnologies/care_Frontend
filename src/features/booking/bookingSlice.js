import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serviceType: "",
    bookingDetails: {
        name: "",
        date: "",
        time: "",
        duration: "",
        notes: "",

        // baby
        allergies: "",
        guardianPresent: false,

        // elder
        medicalHistory: "",
        walkerAvailable: false,

        // pet
        petBehavior: "",
        vaccinationConfirmed: false,

        // common
        acceptPolicy: false,
    },
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {

        setServiceType: (state, action) => {
            state.serviceType = action.payload;
        },

        setBookingDetails: (state, action) => {
            state.bookingDetails = {
                ...state.bookingDetails,
                ...action.payload,
            };
        },

        resetBooking: (state) => {
            state.serviceType = "";
            state.bookingDetails = initialState.bookingDetails;
        },

    },
});

export const { setServiceType, setBookingDetails, resetBooking, } = bookingSlice.actions;

export default bookingSlice.reducer;