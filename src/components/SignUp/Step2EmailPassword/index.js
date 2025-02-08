import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export function Step2EmailPassword({
  formData,
  setFormData,
  error,
  handleNextStep,
  handleCheckEmailAndPassword,
  setError,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleCheckEmailAndNext = async (email) => {
    try {
      const valid = await handleCheckEmailAndPassword(email);
      if (valid) {
        setShowPassword(true);
        setError({ api: { message: "", bool: true } });
        if (isPasswordValid) {
          handleNextStep();
        }
      }
    } catch (err) {
      setError({
        api: {
          message: err.response.data.errorMessage,
          bool: err.response.data.errorBool,
        },
      });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setIsPasswordValid(newPassword.length >= 8);
  };

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="16px">
        Infos de connexion
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        textAlign="center"
        marginBottom="16px"
      >
        Félicitations, paa.ge/{formData.link} est à vous !
      </Typography>
      <TextField
        required
        fullWidth
        label="Email"
        placeholder="email@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={error?.api?.bool === false}
        helperText={error?.api?.bool === false ? error?.api?.message : ""}
        slotProps={{
          input: {
            endAdornment:
              error?.api?.bool === false ? (
                <HighlightOffIcon color="error" />
              ) : (
                <></>
              ),
          },
        }}
      />
      {showPassword && (
        <TextField
          required
          fullWidth
          label="Mot de passe"
          type="password"
          placeholder="******"
          value={formData.password}
          onChange={handlePasswordChange}
          helperText="Le mot de passe doit contenir au moins 8 caractères."
          sx={{ marginTop: "16px" }}
        />
      )}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleCheckEmailAndNext({ email: formData.email })}
        sx={{ marginTop: "16px" }}
        disabled={showPassword && !isPasswordValid}
      >
        Suivant
      </Button>
    </Box>
  );
}

//export default Step2EmailPassword;
