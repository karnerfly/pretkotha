import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Protected() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
}

export default Protected;
