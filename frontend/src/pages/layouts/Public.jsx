import React from "react";
import { Navigate, Outlet } from "react-router";
import isAuthenticated from "../../api/user";

function Public({ children, accessByAuthenticatedUser = true }) {
  return HandlePage(accessByAuthenticatedUser, isAuthenticated, children);
}

function HandlePage(accessByAuthenticatedUser, isAuthenticated, children) {
  if (isAuthenticated) {
    if (accessByAuthenticatedUser) {
      return <Outlet>{children}</Outlet>;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  } else {
    return <Outlet>{children}</Outlet>;
  }
}

export default Public;
