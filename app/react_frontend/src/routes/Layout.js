// src/components/Layout.js
import React from "react";
import { useLocation } from "react-router-dom";
import HeaderComponent from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Decide if header and footer should be shown
  const shouldShowHeaderFooter = location.pathname !== "/login"; // Hide Header/Footer for login page

  return (
    <>
      {shouldShowHeaderFooter && <HeaderComponent />}
      <div style={{ marginTop: shouldShowHeaderFooter ? "60px" : "0" }}>
        {children}
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
