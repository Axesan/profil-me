import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";

export function Step6Theme({
  formData,
  setFormData,
  themes,
  handleSubmit,
  isPending,
}) {
  const handleThemeChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      theme: event.target.value,
    }));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Choisissez un thème
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Thème</InputLabel>
        <Select value={formData.theme} onChange={handleThemeChange}>
          {themes.map((theme) => (
            <MenuItem key={theme.id} value={theme.name}>
              {theme.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isPending || !formData.theme}
          //onClick={handleSubmit}
        >
          {isPending ? <CircularProgress size={24} /> : "Valider et Terminer"}
        </Button>
      </Box>
    </Box>
  );
}

// export default Step6Theme;
