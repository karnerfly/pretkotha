import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Base from "./pages/layouts/Base";
import Public from "./pages/layouts/Public";
import Protected from "./pages/layouts/Protected";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Story from "./pages/Story";

import DashboardLayout from "./pages/layouts/Dashboard";
import {
  MyPosts,
  MyBookmarks,
  Profile,
  Settings,
  DashboardHome,
} from "./pages/user";

import Search from "./pages/Search";
import Newsletter from "./pages/Newsletter";

function App() {
  // <------------------------ layout hierarchy ------------------------>
  // 1. Public or Protected
  // 2. Base
  // 3. Other Layouts like - DashboardLayout

  return (
    <Routes>
      {/* public routes for all users */}
      <Route element={<Public />}>
        <Route path="" element={<Base />}>
          <Route index path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<Faq />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="search" element={<Search />} />
          <Route path="story/:storyId" element={<Story />} />
        </Route>
      </Route>

      {/* Public route with Different configuration for Login and Register page */}
      <Route path="auth" element={<Public accessByAuthenticatedUser={false} />}>
        <Route path="" element={<Base />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>
      </Route>

      {/* protected routes for authenticated users */}
      <Route element={<Protected />}>
        <Route path="" element={<Base />}>
          <Route path="user/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="posts" element={<MyPosts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookmarks" element={<MyBookmarks />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
