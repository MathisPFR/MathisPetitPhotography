import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importer tes pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound'; // pour gérer les routes non trouvées
import { Nav } from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Favorite from './pages/Favorite'; 

function App() {
  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Vérifie si un token est présent
  };

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route
          path="/favorite"
          element={
            isAuthenticated() ? <Favorite /> : <Navigate to="/" />
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
