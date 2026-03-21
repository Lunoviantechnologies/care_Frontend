import axios from "axios";
import baseUrl from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      store.dispatch(logout());
      window.location.href = "/login"; // force redirect
    }

    return Promise.reject(error);
  }
);

export default api;