import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const { accessToken } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <UserNavbar />

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default DashboardLayout;