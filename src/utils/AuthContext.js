import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke les infos utilisateur
  const [token, setToken] = useState(null); // Stocke le token

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
