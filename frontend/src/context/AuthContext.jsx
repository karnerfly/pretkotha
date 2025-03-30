import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    let auth = localStorage.getItem("authState");
    return auth && auth == "true" ? true : false;
  });
  useEffect(() => {}, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("authState", true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("authState", false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
