import axios from "axios";
import { API } from "./baseUrl";

// register customer api
export const registerCustomer = async (data) => {
    try {
        const res = await axios.post(`${API.AUTH}/customer/create`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

// Login Customer
export const customerLogin = async (payload) => {
    try {
        const res = await axios.post(`${API.AUTH}/customer/login`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};

// Forgot Password
export const forgotPassword = async (payload) => {
    try {
        const res = await axios.post(`${API.AUTH}/customer/send-otp`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};
// verify OTP for reset password
export const verifyForgotPassword = async (payload) => {
    try {
        const res = await axios.post(`${API.AUTH}/customer/verify-otp`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};
// Reset Password
export const createNewPassword = async (payload) => {
    try {
        const res = await axios.post(`${API.AUTH}/customer/reset-password`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};

// Contact Us
export const ContactUsApi = async (payload) => {
    try {
        const res = await axios.post(`${API.AUTH}/contact`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};

// Get Customer Profile
export const getCustomerProfile = async (customerId) => {
    try {
        const res = await axios.get(`${API.AUTH}/customer/get/${customerId}`);
        return res;
    } catch (error) {
        throw error;
    }
};
// Update Customer Profile
export const updateCustomerProfile = async (customerId, data) => {
    try {
        const res = await axios.put(`${API.AUTH}/customer/update/${customerId}`, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
};

//Customer Pay online 
export const payOnline = async (payload) => {
    try {
        const res = await axios.post(`${API.PAYMENT}/payments/initiate`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};
// Verify Payment
export const verifyPayment = async (payload) => {
    try {
        const res = await axios.post(`${API.PAYMENT}/payments/verify`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};

// Customer Live Tracking
export const getLiveTracking = async (bookingId) => {
    try {
        const res = await axios.get(`${API.TRACKING}/ws/customer/${bookingId}`);
        return res;
    } catch (error) {
        throw error;
    };
};