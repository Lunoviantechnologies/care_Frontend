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

// Pay online 
export const payOnline = async (payload) => {
    try {
        const res = await axios.post(`${API.PAYMENT}/payments/initiate`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};