import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/header/Footer";

function Base({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet>{children}</Outlet>
      </main>
      <Footer />
    </>
  );
}

export default Base;
