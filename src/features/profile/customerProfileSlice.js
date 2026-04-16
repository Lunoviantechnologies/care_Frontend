// src/redux/slices/customerProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerProfile, updateCustomerProfile } from "../../api/allApis";

export const fetchCustomerProfile = createAsyncThunk(
    "customerProfile/fetch",
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await getCustomerProfile(customerId);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch");
        }
    }
);

export const saveCustomerProfile = createAsyncThunk(
    "customerProfile/save",
    async ({ customerId, formData }, { rejectWithValue }) => {
        try {
            const res = await updateCustomerProfile(customerId, formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update");
        }
    }
);

const customerProfileSlice = createSlice({
    name: "customerProfile",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(saveCustomerProfile.fulfilled, (state, action) => {
                // Merge the saved draft into redux state
                if (action.payload) {
                    state.data = { ...state.data, ...action.payload };
                }
            });
    },
});

export const { clearProfile } = customerProfileSlice.actions;
export default customerProfileSlice.reducer;