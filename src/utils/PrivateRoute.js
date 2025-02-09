import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // On suppose que tu as déjà ce hook dans ton contexte

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Récupère l'utilisateur depuis le contexte

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
