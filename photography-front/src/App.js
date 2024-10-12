import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Nav } from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorite from "./pages/Favorite";
import Account from "./pages/Account";
import ProtectedRoute from './components/ProtectedRoute'; 
import ListingDashboard from "./pages/dashboard/ListingDashboard";
import AddPhoto from "./pages/dashboard/AddPhoto";
import EditPhoto from "./pages/dashboard/EditPhoto";
import EditUser from "./pages/dashboard/EditUser";
import UserListing from "./pages/dashboard/UserListing";
import MentionsLegales from "./pages/MentionsLegales";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  // Vérification de l'authentification lors du montage du composant
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Une fois la vérification terminée, on arrête le chargement
  }, []);

  // Si le chargement n'est pas terminé, on affiche un indicateur de chargement ou rien
  if (loading) {
    return <p>Chargement...</p>; // Affichage temporaire pendant la vérification
  }

  return (
    <Router>
      <LocationBasedApp isAuthenticated={isAuthenticated} />
    </Router>
  );
}

// Un sous-composant pour gérer l'affichage de la Nav
function LocationBasedApp({ isAuthenticated }) {
  const location = useLocation();

  return (
    <>
      {/* Navigation visible sauf sur certaines routes */}
      {!(["/dashboard", "/add-photo", "/users-listing"].includes(location.pathname) || 
        location.pathname.startsWith("/edit-photo") || 
        location.pathname.startsWith("/edit-user")) && <Nav />}

      {/* Routes de l'application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
        
        <Route path="*" element={<NotFound />} />
  
        <Route path="/favorite" element={<ProtectedRoute allowedRoles={['user', 'partner', 'admin']}><Favorite /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute allowedRoles={['user', 'partner', 'admin']}><Account /></ProtectedRoute>} />
  
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['partner', 'admin']}>
              <ListingDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-photo"
          element={
            <ProtectedRoute allowedRoles={['partner', 'admin']}>
              <AddPhoto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-photo/:id"
          element={
            <ProtectedRoute allowedRoles={['partner', 'admin']}>
              <EditPhoto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users-listing"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
