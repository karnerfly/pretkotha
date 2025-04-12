import React from "react";
import { Navigate, Outlet, useLocation, useSearchParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Public({ accessByAuthenticatedUser = true }) {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const next = searchParams.get("next") || "/user/dashboard";
  const location = useLocation();
  return HandlePage(accessByAuthenticatedUser, isAuthenticated, location, next);
}

function HandlePage(
  accessByAuthenticatedUser,
  isAuthenticated,
  location,
  next
) {
  if (isAuthenticated) {
    if (accessByAuthenticatedUser) {
      return <Outlet />;
    } else {
      return <Navigate to={next} state={{ from: location }} replace />;
    }
  } else {
    return <Outlet />;
  }
}

export default Public;
