import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export function Step1Link({
  formData,
  setFormData,
  error,
  handleNextStep,
  handleCheckLink,
  setError,
}) {
  const handleCheckLinkAndNext = async (link) => {
    try {
      const valid = await handleCheckLink(link);
      if (valid) {
        handleNextStep();
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

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="16px">
        Lien
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        textAlign="center"
        marginBottom="16px"
      >
        Choisissez votre lien unique !
      </Typography>

      <TextField
        fullWidth
        required
        label="Lien"
        placeholder="Ex: toto"
        value={formData.link}
        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        error={error?.api?.bool === false}
        helperText={error?.api?.bool === false ? `${error?.api?.message}` : ""}
        slotProps={{
          input: {
            endAdornment:
              error?.api?.bool === false ? (
                <HighlightOffIcon color="error" style={{ padding: "right" }} />
              ) : (
                <></>
              ),
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          handleCheckLinkAndNext({ link: formData.link });
        }}
        sx={{ marginTop: "16px" }}
      >
        Suivant
      </Button>
    </Box>
  );
}

//export default Step1Link;
