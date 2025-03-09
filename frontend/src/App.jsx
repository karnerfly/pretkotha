import React from "react";
import { Route, Routes } from "react-router";
import Base from "./pages/layouts/Base";
import Public from "./pages/layouts/Public";
import Protected from "./pages/layouts/Protected";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import Dashboard from "./pages/user/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Story from "./pages/Story";

function App() {
  return (
    <Routes>
      <Route element={<Base />}>
        {/* public routes for all users */}
        <Route element={<Public />}>
          <Route index path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<Faq />} />
          <Route path="story/:storyId" element={<Story />} />
        </Route>

        {/* Public route with Different configuration for Login and Register page */}
        <Route
          path="auth"
          element={<Public accessByAuthenticatedUser={false} />}
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* protected routes for authenticated users */}
        <Route element={<Protected />}>
          <Route path="user/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
