import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getMeStats } from "../api";

const AuthContext = createContext({
  loading: true,
  isAuthenticated: false,
  role: "",
  refreshAuth: (callback) => {},
});

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    isAuthenticated: false,
    role: "",
  });

  const refreshAuth = useCallback(async (callback) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      const resp = await getMeStats();
      setAuthState({
        loading: false,
        isAuthenticated: resp.data.authenticated,
        role: resp.data.role,
      });
    } catch (error) {
      setAuthState({
        loading: false,
        isAuthenticated: false,
        role: "",
      });
    }

    if (callback) callback();
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
