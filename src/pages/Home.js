import { Box, Typography, Button, Grid2 } from "@mui/material";
import React from "react";
import { AuthContext } from "../utils/AuthContext";
import Bannier from "../components/Home/Bannier";
function Home() {
  const { token } = React.useContext(AuthContext);
  console.log(React.useContext(AuthContext));

  return (
    <div>
      {/* Section principale */}
      <Box sx={{ marginBottom: "40px", display: "grid" }}>
        <Bannier isLoggedIn={token} />
      </Box>

      {/* Section avec trois colonnes */}
      <Grid2
        container
        spacing={3}
        sx={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <Grid2 item xs={12}>
          <Box
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "background.paper",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Design Moderne
            </Typography>
            <Typography variant="body2">
              Découvrez des templates élégants et modernes pour vos profils.
            </Typography>
          </Box>
        </Grid2>
        <Grid2 item xs={12}>
          <Box
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "background.paper",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Flexibilité Totale
            </Typography>
            <Typography variant="body2">
              Ajoutez des images, citations et liens selon vos besoins.
            </Typography>
          </Box>
        </Grid2>
        <Grid2 item xs={12}>
          <Box
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "background.paper",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Partage Simplifié
            </Typography>
            <Typography variant="body2">
              Partagez vos profils directement sur les réseaux sociaux.
            </Typography>
          </Box>
        </Grid2>
      </Grid2>

      {/* Section citations */}
      <Box sx={{ marginBottom: "40px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Citations Inspirantes
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            marginBottom: "12px",
          }}
        >
          "Le design n’est pas seulement ce à quoi ça ressemble et ce que ça
          fait ressentir. Le design, c’est comment ça fonctionne." – Steve Jobs
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            marginBottom: "12px",
          }}
        >
          "Votre image est votre meilleure carte de visite." – Anonyme
        </Typography>
      </Box>

      {/* Section avec image d'aperçu */}
      <Box sx={{ position: "relative", marginBottom: "40px" }}>
        <Box
          component="img"
          src="https://via.placeholder.com/400x200"
          alt="Aperçu des profils"
          sx={{
            width: "100%",
            borderRadius: "8px",
            boxShadow: 2,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Personnalisez votre profil dès aujourd'hui !
        </Typography>
      </Box>

      {/* Section témoignages */}
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Ce que disent nos utilisateurs
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          "Un outil fantastique pour mettre en avant ma personnalité !" – Marie
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          "Simple à utiliser et des designs incroyables. Je recommande !" –
          Julien
        </Typography>
      </Box>
    </div>
  );
}

export default Home;
