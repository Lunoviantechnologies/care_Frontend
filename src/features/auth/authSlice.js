import { createSlice } from "@reduxjs/toolkit";
import { isTokenExpired } from "../../utils/authUtils";

const token = localStorage.getItem("accessToken");

const initialState = {
    user: localStorage.getItem("user_id")
        ? { user_id: localStorage.getItem("user_id") } : null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null,
    user_id: localStorage.getItem("user_id") || null,
    isAuthenticated: token && !isTokenExpired(token),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        loginSuccess: (state, action) => {
            const { access_token, refresh_token, role, user_id } = action.payload;

            state.accessToken = access_token;
            state.refreshToken = refresh_token;
            state.role = role;
            state.user = { user_id };
            state.isAuthenticated = true;

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            localStorage.setItem("role", role);
            localStorage.setItem("user_id", user_id);
        },

        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.user = null;
            state.user_id = null;
            state.isAuthenticated = false;

            localStorage.clear();
        },

    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;