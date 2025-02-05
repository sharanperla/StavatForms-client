import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("session_token");
  });

  const [userId,setUserId]=useState('')

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("session_token"));
  }, []);

  const login = (token,user_Id) => {
    localStorage.setItem("session_token", token);
    setUserId(user_Id)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("session_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,userId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
