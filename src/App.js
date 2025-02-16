import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfileEditor from "./pages/ProfileEditor";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import { responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import theme from "./utils/Themes";
// Création du thème

// Ajouter la responsivité des polices
const responsiveTheme = responsiveFontSizes(theme);

function App() {
  return (
    <Router>
      <ThemeProvider theme={responsiveTheme}>
        <AuthProvider>
          <CssBaseline />
          <Navbar />
          <Container sx={{ backgroundColor: theme.palette.background }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/editor"
                element={
                  <PrivateRoute>
                    <ProfileEditor />
                  </PrivateRoute>
                }
              />
              {/* Route protégée */}
            </Routes>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
