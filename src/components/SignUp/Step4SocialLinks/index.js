import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  VideoLibrary as TikTokIcon,
  SportsEsports as SteamIcon,
  QueueMusic as SpotifyIcon,
} from "@mui/icons-material";

const socialRegex = {
  instagram:
    /^(https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?|@[a-zA-Z0-9_.]+)$/,
  facebook:
    /^(https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+\/?|@[a-zA-Z0-9_.]+)$/,
  tiktok:
    /^(https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_.]+\/?|@[a-zA-Z0-9_.]+)$/,
  steam:
    /^(https?:\/\/(www\.)?steamcommunity\.com\/id\/[a-zA-Z0-9_-]+\/?|https?:\/\/steamcommunity\.com\/profiles\/\d+\/?)$/,
  spotify:
    /^(https?:\/\/(open\.)?spotify\.com\/(user|artist|track|playlist)\/[a-zA-Z0-9]+\/?|spotify:[a-zA-Z0-9]+:[a-zA-Z0-9]+)$/,
};

export function Step4SocialLinks({ formData, setFormData, handleNextStep }) {
  const [socialErrors, setSocialErrors] = React.useState({});
  const [isSkipDisabled, setIsSkipDisabled] = React.useState(false);

  const handleSocialChange = (key, value) => {
    // Met à jour les liens sociaux dans l'état global
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));

    // Valide le lien saisi
    if (!value) {
      setSocialErrors((prev) => ({ ...prev, [key]: "" }));
    } else if (!socialRegex[key].test(value)) {
      setSocialErrors((prev) => ({
        ...prev,
        [key]: `Lien ou pseudo invalide pour ${key}`,
      }));
    } else {
      setSocialErrors((prev) => ({ ...prev, [key]: "" }));
    }

    // Vérifie si au moins un réseau social est rempli correctement
    const hasValidLink = Object.keys(formData.socialLinks).some((network) =>
      socialRegex[network].test(formData.socialLinks[network])
    );
    setIsSkipDisabled(hasValidLink);
  };

  return (
    <Box>
      <Typography variant="h6" textAlign="center" marginBottom="16px">
        Réseaux sociaux
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        textAlign="center"
        marginBottom="16px"
      >
        Ajoutez vos réseaux sociaux
      </Typography>

      {/* Liste des champs pour les réseaux sociaux */}
      {[
        {
          label: "Instagram",
          icon: <InstagramIcon />,
          key: "instagram",
          placeholder: "Ex: https://www.instagram.com/user1234",
        },
        {
          label: "Facebook",
          icon: <FacebookIcon />,
          key: "facebook",
          placeholder: "Ex: https://www.facebook.com/user1234",
        },
        {
          label: "TikTok",
          icon: <TikTokIcon />,
          key: "tiktok",
          placeholder: "Ex: https://www.tiktok.com/@user1234",
        },
        {
          label: "Steam",
          icon: <SteamIcon />,
          key: "steam",
          placeholder: "Ex: https://steamcommunity.com/id/user1234",
        },
        {
          label: "Spotify",
          icon: <SpotifyIcon />,
          key: "spotify",
          placeholder: "Ex: https://open.spotify.com/user/user1234",
        },
      ].map(({ label, icon, key, placeholder }) => (
        <TextField
          key={key}
          fullWidth
          label={label}
          placeholder={placeholder}
          value={formData.socialLinks[key]}
          onChange={(e) => handleSocialChange(key, e.target.value)}
          error={!!socialErrors[key]}
          helperText={socialErrors[key]}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          sx={{ marginBottom: "16px" }}
        />
      ))}

      {/* Boutons Suivant et Ignorer */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleNextStep}>
          Suivant
        </Button>
        {!isSkipDisabled && (
          <Button variant="text" onClick={handleNextStep}>
            Ignorer
          </Button>
        )}
      </Stack>
    </Box>
  );
}

//export default Step4SocialLinks;
