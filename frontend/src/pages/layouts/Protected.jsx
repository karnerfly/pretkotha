import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation, Outlet } from "react-router";

const Protected = ({ roles = [] }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();
  const eurl = encodeURIComponent(location.pathname);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/auth/login?next=${eurl}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected;
