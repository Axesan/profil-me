import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          "http://192.168.1.95:3001/api/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Token invalide ou expiré.", err);
        logout();
      }
    };

    verifyToken();
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
