import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("session_token");
  });

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("session_token"));
  }, []);

  const login = (token) => {
    localStorage.setItem("session_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("session_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
