import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/common/Header";
import Footer from "../../components/common/Footer";

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
