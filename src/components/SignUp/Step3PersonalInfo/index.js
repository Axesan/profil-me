import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export function Step3PersonalInfo({ formData, setFormData, handleNextStep }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personnalData: {
        ...prev.personnalData,
        [name]: value, // Met à jour soit firstName, soit lastName
      },
    }));
  };

  const handleNext = () => {
    if (formData.personnalData.firstName && formData.personnalData.lastName) {
      handleNextStep();
    }
  };

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="16px">
        Vos informations
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        textAlign="center"
        marginBottom="16px"
      >
        Parlez-nous de vous
      </Typography>

      {/* Champ Prénom */}
      <TextField
        required
        fullWidth
        label="Prénom"
        name="firstName"
        value={formData.personnalData.firstName}
        onChange={handleInputChange}
        sx={{ marginBottom: "16px" }}
      />

      {/* Champ Nom */}
      <TextField
        required
        fullWidth
        label="Nom"
        name="lastName"
        value={formData.personnalData.lastName}
        onChange={handleInputChange}
        sx={{ marginBottom: "16px" }}
      />

      {/* Bouton Suivant */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={
          !formData.personnalData.firstName || !formData.personnalData.lastName
        }
      >
        Suivant
      </Button>
    </Box>
  );
}

//export default Step3PersonalInfo;
