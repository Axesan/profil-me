import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfileEditor from './pages/ProfileEditor';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Login from './pages/Login';

// Création du thème
let theme = createTheme({
  palette: {
    primary: {
      main: '#21403D', // Vert sombre pour les actions principales
      contrastText: '#CCD9D7', // Texte clair sur les boutons principaux
    },
    secondary: {
      main: '#8FA6A1', // Vert-gris pour les actions secondaires
      contrastText: '#0D0D0D', // Texte sombre pour les boutons secondaires
    },
    background: {
      default: '#132624', // Arrière-plan général sombre
      paper: '#21403D', // Arrière-plan des cartes ou des surfaces surélevées
    },
    text: {
      primary: '#CCD9D7', // Texte principal clair
      secondary: '#8FA6A1', // Texte secondaire gris
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#CCD9D7', // Couleur claire pour les titres principaux
    },
    body1: {
      fontSize: '1rem',
      color: '#8FA6A1', // Texte gris pour le contenu
    },
    button: {
      textTransform: 'none', // Désactive la mise en majuscule automatique des boutons
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Coins arrondis pour les boutons
        },
      },
    },
  },
});
// Ajouter la responsivité des polices
theme = responsiveFontSizes(theme);
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container sx={{ backgroundColor: theme.palette.background }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Route proteger */}
            <Route path="/editor" element={<ProfileEditor />} />

          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}


export default App;