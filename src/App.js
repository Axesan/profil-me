import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfileEditor from './pages/ProfileEditor';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Route proteger */}
          <Route path="/editor" element={<ProfileEditor />} />

        </Routes>
      </Container>
    </Router>
  );
}


export default App;