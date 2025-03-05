import React from "react";
import { Navigate, Outlet } from "react-router";
import isAuthenticated from "../../api/user";

function Protected({ children }) {
  return (
    <div>
      {isAuthenticated ? <Outlet>{children}</Outlet> : <Navigate to="/" />}
    </div>
  );
}

export default Protected;
