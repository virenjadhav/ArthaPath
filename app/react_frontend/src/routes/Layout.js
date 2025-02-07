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
    <div style={{ width: "100%", height: "100%" }}>
      {shouldShowHeaderFooter && <HeaderComponent />}
      <div
        style={{
          flexGrow: 1, // Take up remaining height
          display: "flex", // Optional, for flex alignment of children
          flexDirection: "column", // Stack content vertically
        }}
      >
        <section
          style={{
            // marginTop: shouldShowHeaderFooter ? "60px" : "0",
            // height: "100%",
            flexGrow: 1, // Ensure it stretches to fill available height
            marginTop: shouldShowHeaderFooter ? "60px" : "0",
            overflowY: "auto", // Scroll content if it exceeds height
          }}
        >
          {children}
        </section>
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
