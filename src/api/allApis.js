import axios from "axios";
import baseUrl from "./baseUrl";

// register customer api
export const registerCoustomer = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/customer/create`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

// Login Customer
export const customerLogin = async (payload) => {
    try {
        const res = await axios.post(`${baseUrl}/customer/login`, payload);
        return res;
    } catch (error) {
        throw error;
    }
};