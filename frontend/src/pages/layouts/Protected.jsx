import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import auth from "../../api/user";

function Protected() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // simulate backend api fetching (fetch time 300ms)
  useEffect(() => {
    function checkAuth() {
      setTimeout(() => {
        setIsAuthenticated(auth);
        setAuthChecked(true);
      }, 300);
    }
    checkAuth();
  }, []);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return navigate("/");

  return <Outlet />;
}

export default Protected;
