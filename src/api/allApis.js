import axios from "axios";
import baseUrl from "./baseUrl";

// register customer api
export const registerCoustomer = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/customer/create`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
}