import React from "react";
import { Navigate, Outlet } from "react-router";
import isAuthenticated from "../../api/user";

function Public({ accessByAuthenticatedUser = true }) {
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
