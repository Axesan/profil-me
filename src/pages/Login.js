import React, { useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";

import { loginUser } from "../api/api";
import { AuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, setToken } = useContext(AuthContext);
  const { navigate } = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, message, user } = await loginUser({
        email,
        password,
      });
      setToken(token);
      localStorage.setItem("token", token);
      login(user); // Mets à jour l'état utilisateur
      setError(""); // Réinitialiser l'erreur s'il y en avait une
      alert(message); // Afficher un message de succès
      // Rediriger vers le tableau de bord
      navigate("/dashboard");
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TextField
        fullWidth
        required
        label="Email"
        placeholder="Ex: john@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // error={error?.api?.bool === false}
        // helperText={error?.api?.bool === false ? `${error?.api?.message}` : ""}
        // slotProps={{
        //   input: {
        //     endAdornment:
        //       error?.api?.bool === false ? (
        //         <HighlightOffIcon color="error" style={{ padding: "right" }} />
        //       ) : (
        //         <></>
        //       ),
        //   },
        // }}
      />

      <TextField
        fullWidth
        required
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // error={error?.api?.bool === false}
        // helperText={error?.api?.bool === false ? `${error?.api?.message}` : ""}
        // slotProps={{
        //   input: {
        //     endAdornment:
        //       error?.api?.bool === false ? (
        //         <HighlightOffIcon color="error" style={{ padding: "right" }} />
        //       ) : (
        //         <></>
        //       ),
        //   },
        // }}
      />

      <Button type="submit" variant="contained" color="primary">
        Se connecter
      </Button>
    </Box>
  );
}

export default Login;
