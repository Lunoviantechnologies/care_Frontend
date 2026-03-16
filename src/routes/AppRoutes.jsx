import React from "react";
import { createBrowserRouter } from "react-router-dom";
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

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "about_us", element: <AboutUs /> },
            {
                path: "services",
                children: [
                    {
                        path: "baby_care",
                        element: <ServiceBabyCare />
                    },
                    {
                        path: "pet_care",
                        element: <ServicePetCare />
                    },
                    {
                        path: "elder_care",
                        element: <ServiceElderCare />
                    },
                    {
                        path: "pregnancy_care",
                        element: <ServicePregnancyCare />
                    },
                    {
                        path: "home_assistance_care",
                        element: <ServiceHomeAssistCare />
                    },
                ]
            },
            { path: "contact_us", element: <ContactUs /> },
            { path: "services/:type", element: <ServiceLists /> },
            { path: "booking", element: <BookingForm /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "payment", element: <PaymentPage /> }
        ]
    }
]);

export default AppRoutes;