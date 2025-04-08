import React from "react";
import { Route, Routes } from "react-router";
import Base from "./pages/layouts/Base";
import Public from "./pages/layouts/Public";
import Protected from "./pages/layouts/Protected";
import DashboardLayout from "./pages/layouts/Dashboard";
import {
  HomePage,
  AboutPage,
  ContactUsPage,
  FaqPage,
  NewsletterPage,
  SearchPage,
  StoryPage,
  YouTubePretkothaPage,
} from "./pages";
import { LoginPage, RegsiterPage, ForgotPasswordPage } from "./pages/auth";
import {
  MyPosts,
  MyBookmarks,
  Profile,
  Settings,
  DashboardHome,
} from "./pages/user";

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
          <Route index path="" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="story/:storyId" element={<StoryPage />} />
          <Route path="pretkotha" element={<YouTubePretkothaPage />} />
        </Route>
      </Route>

      {/* Public route with different configuration for Login, Register and ForgotPassword page */}
      <Route path="auth" element={<Public accessByAuthenticatedUser={false} />}>
        <Route path="" element={<Base />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegsiterPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
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
