import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/common/Header";
import Footer from "../../components/common/Footer";

function Base() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Base;
