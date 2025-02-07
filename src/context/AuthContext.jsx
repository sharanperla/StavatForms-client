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
    localStorage.setItem("userId", user_Id);
    setUserId(user_Id)
    setIsAuthenticated(true);
    console.log(token);
  };

  const logout = () => {
    localStorage.removeItem("session_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("purchasedTemplates");
    localStorage.removeItem("availableTemplates");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,userId,setUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
