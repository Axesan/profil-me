import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C5CE7", // Violet moderne pour les actions principales
      contrastText: "#FFFFFF", // Texte blanc sur les boutons principaux
    },
    secondary: {
      main: "#FF7675", // Rose corail pour les actions secondaires
      contrastText: "#FFFFFF", // Texte blanc sur les boutons secondaires
    },
    background: {
      default: "#2D3436", // Arrière-plan sombre mais doux
      paper: "#3E4649", // Arrière-plan des cartes ou des surfaces surélevées
    },
    text: {
      primary: "#FFFFFF", // Texte principal blanc
      secondary: "#B2BEC3", // Texte secondaire gris clair
    },
    success: {
      main: "#00B894", // Vert pour les actions réussies
    },
    error: {
      main: "#D63031", // Rouge pour les erreurs
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif", // Police moderne
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600, // Semi-gras pour les titres
      color: "#FFFFFF", // Titres en blanc
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#FFFFFF",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#FFFFFF",
    },
    body1: {
      fontSize: "1rem",
      color: "#B2BEC3", // Texte gris clair pour le contenu
    },
    button: {
      textTransform: "none", // Désactive la mise en majuscule automatique des boutons
      fontWeight: 600, // Boutons en semi-gras
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Coins arrondis pour les boutons
          padding: "8px 16px", // Padding confortable
          transition: "all 0.3s ease", // Animation fluide
          "&:hover": {
            transform: "scale(1.05)", // Effet de zoom au survol
          },
        },
        containedPrimary: {
          boxShadow: "0 4px 14px rgba(108, 92, 231, 0.4)", // Ombre douce pour les boutons principaux
        },
        containedSecondary: {
          boxShadow: "0 4px 14px rgba(255, 118, 117, 0.4)", // Ombre douce pour les boutons secondaires
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Coins arrondis pour les cartes
          padding: "16px", // Espacement interne
          backgroundColor: "#3E4649", // Arrière-plan des cartes
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Ombre douce
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2D3436", // Arrière-plan sombre pour la barre d'applications
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Ombre douce
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#6C5CE7", // Couleur des liens
          textDecoration: "none", // Pas de soulignement par défaut
          "&:hover": {
            textDecoration: "underline", // Soulignement au survol
          },
        },
      },
    },
  },
});

export default theme;
