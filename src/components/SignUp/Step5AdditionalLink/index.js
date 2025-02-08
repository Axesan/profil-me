import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export function Step5AdditionalLinks({
  formData,
  setFormData,
  handleNextStep,
}) {
  const [additionalLinks, setAdditionalLinks] = useState(
    formData.additionalLinks || [""]
  );

  // Ajoute un nouveau champ de lien
  const handleAddLink = () => {
    setAdditionalLinks([...additionalLinks, ""]);
  };

  // Supprime un champ de lien
  const handleRemoveLink = (index) => {
    const newLinks = additionalLinks.filter((_, i) => i !== index);
    setAdditionalLinks(newLinks);
  };

  // Met à jour un lien dans le tableau
  const handleLinkChange = (index, value) => {
    const newLinks = [...additionalLinks];
    newLinks[index] = value;
    setAdditionalLinks(newLinks);
  };

  // Sauvegarde les liens et passe à l'étape suivante
  const saveLinksAndNext = () => {
    setFormData((prev) => ({
      ...prev,
      additionalLinks: additionalLinks.filter((link) => link.trim() !== ""), // Supprime les liens vides
    }));
    handleNextStep();
  };

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="16px">
        Vos liens additionnels
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        textAlign="center"
        marginBottom="16px"
      >
        Ajoutez vos liens additionnels
      </Typography>

      {/* Liste des champs pour les liens additionnels */}
      {additionalLinks.map((link, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            fullWidth
            label={`Lien ${index + 1}`}
            placeholder="Ex: https://monlien.com"
            value={link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
          />
          <Button
            variant="text"
            color="error"
            onClick={() => handleRemoveLink(index)}
            endIcon={<HighlightOffIcon />}
          />
        </Box>
      ))}

      {/* Bouton pour ajouter un nouveau lien */}
      <Button
        variant="outlined"
        onClick={handleAddLink}
        sx={{ marginTop: "16px" }}
      >
        Ajouter un lien
      </Button>

      {/* Boutons Suivant et Ignorer */}
      <Stack direction="row" spacing={2} sx={{ marginTop: "16px" }}>
        <Button variant="contained" color="primary" onClick={saveLinksAndNext}>
          Suivant
        </Button>
        {additionalLinks.length === 0 && (
          <Button variant="text" onClick={handleNextStep}>
            Ignorer
          </Button>
        )}
      </Stack>
    </Box>
  );
}

//export default Step5AdditionalLinks;
