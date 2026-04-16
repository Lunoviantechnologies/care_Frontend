import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ServiceLists from "../features/services/ServiceLists";
import BookingForm from "../features/booking/BookingForm";
import Cart from "../features/cart/Cart";
import CheckoutPage from "../features/checkout/CheckoutPage";
import PaymentPage from "../features/payments/PaymentPage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import ServiceBabyCare from "../pages/ServiceBabyCare";
import ServicePetCare from "../pages/ServicePetCare";
import ServiceElderCare from "../pages/ServiceElderCare";
import ServicePregnancyCare from "../pages/ServicePregnancyCare";
import ServiceHomeAssistCare from "../pages/ServiceHomeAssistCare";
import LiveMap from "../features/tracking/LiveMap";
import ForgotPassword from "../features/auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "./PublicRoute";
import AdminLogin from "../admin/features/adminauth/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminSelectService from "../admin/features/services/AdminSelectService";
import AdminDashboard from "../admin/features/dashboard/AdminDashboard";
import AdminWorkers from "../admin/features/workers/AdminWorkers";
import AdminBookings from "../admin/features/bookings/AdminBookings";
import AdminComplaints from "../admin/features/complaints/AdminComplaints";
import AdminSafety from "../admin/features/safety/AdminSafety";
import AdminReports from "../admin/features/reports/AdminReports";
import AdminProfiles from "../admin/features/profiles/AdminProfiles";
import AdminSettings from "../admin/features/settings/AdminSettings";
import AdminReviews from "../admin/features/reviews/AdminReviews";
import AdminAnalytics from "../admin/features/dashboard/AdminAnalytics";
import AdminLayout from "../admin/pages/AdminLayout";
import BookingHistory from "../features/booking/BookingHistory";
import ProfilePage from "../features/profile/ProfilePage";
import Help from "../components/Help";
import Settings from "../components/settings/Settings";
import Wallet from "../features/wallet/wallet";
import ChangePassword from "../features/auth/ChangePassword";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <PublicRoute>
                        <Home />
                    </PublicRoute>
                ),
            },
            {
                path: "login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "register",
                element: (
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                ),
            },

            { path: "forget_password", element: <ForgotPassword /> },
            { path: "about_us", element: <AboutUs /> },
            { path: "contact_us", element: <ContactUs /> },

            {
                path: "services",
                children: [
                    { path: "baby_care", element: <ServiceBabyCare /> },
                    { path: "pet_care", element: <ServicePetCare /> },
                    { path: "elder_care", element: <ServiceElderCare /> },
                    { path: "pregnancy_care", element: <ServicePregnancyCare /> },
                    { path: "kitchen_care", element: <ServiceHomeAssistCare /> },
                ],
            },

            { path: "/admin_login", element: <AdminLogin /> },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "", element: <Dashboard /> },
            { path: "booking", element: <BookingForm /> },
            { path: "booking_history", element: <BookingHistory /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "payment", element: <PaymentPage /> },
            { path: "live_tracking", element: <LiveMap /> },
            { path: "services/:type", element: <ServiceLists /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "help", element: <Help /> },
            { path: "settings", element: <Settings /> },
            { path: "wallet", element: <Wallet /> },
            { path: "change_password", element: <ChangePassword /> },
        ]
    },

    {
        path: "/admin",
        element: (
            <AdminProtectedRoute>
                <AdminLayout />
            </AdminProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="admin/baby/dashboard" replace /> },
            { path: "service", element: <AdminSelectService /> },

            { path: ":serviceType/dashboard", element: <AdminDashboard /> },
            { path: ":serviceType/workers", element: <AdminWorkers /> },
            { path: ":serviceType/bookings", element: <AdminBookings /> },
            { path: ":serviceType/complaints", element: <AdminComplaints /> },
            { path: ":serviceType/safety", element: <AdminSafety /> },
            { path: ":serviceType/reports", element: <AdminReports /> },
            { path: ":serviceType/profile", element: <AdminProfiles /> },
            { path: ":serviceType/settings", element: <AdminSettings /> },
            { path: ":serviceType/reviews", element: <AdminReviews /> },
            { path: ":serviceType/analytics", element: <AdminAnalytics /> },
        ],
    },
]);

export default AppRoutes;