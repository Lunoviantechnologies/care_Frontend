import axios from "axios";
import { API } from "./baseUrl";
import { logout } from "../features/auth/authSlice";
import store from "../app/store/store";

const authApi = axios.create({
  baseURL: API.AUTH,
});

const bookingApi = axios.create({
  baseURL: API.BOOKING,
});

const paymentApi = axios.create({
  baseURL: API.PAYMENT,
});

const trackingApi = axios.create({
  baseURL: API.TRACKING,
});

const safetyAiApi = axios.create({
  baseURL: API.AI,
});

const addInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = store.getState()?.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

[
  authApi,
  bookingApi,
  paymentApi,
  trackingApi,
  safetyAiApi,
].forEach(addInterceptor);

export default {
  authApi,
  bookingApi,
  paymentApi,
  trackingApi,
  safetyAiApi,
};