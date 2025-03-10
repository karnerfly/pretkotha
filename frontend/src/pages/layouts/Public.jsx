import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Public({ accessByAuthenticatedUser = true }) {
  const { isAuthenticated } = useAuth();
  return HandlePage(accessByAuthenticatedUser, isAuthenticated);
}

function HandlePage(accessByAuthenticatedUser, isAuthenticated) {
  if (isAuthenticated) {
    if (accessByAuthenticatedUser) {
      return <Outlet />;
    } else {
      return <Navigate to="/user/dashboard/posts" />;
    }
  } else {
    return <Outlet />;
  }
}

export default Public;
