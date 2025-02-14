import React, { useState, useContext, useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";

import { loginUser } from "../api/api";
import { AuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, setToken } = useContext(AuthContext);

  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && token) {
      navigate("/"); // Redirige vers la page protégée
    }
  }, [user, token, navigate]); // Vérifie dès que le token ou l'utilisateur change

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token, user } = await loginUser({ email, password });
      login(user, token); // Passe le token dans `login`
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur est survenue.");
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
