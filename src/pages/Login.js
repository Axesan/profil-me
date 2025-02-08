import React, { useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";

import { loginUser } from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      console.log("Connexion réussie !");
      // Rediriger vers le tableau de bord ou une autre page
      setError("Connexion reussie !");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
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
