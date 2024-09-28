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
import ListingUser from "./pages/dashboard/UserListing";
import EditUser from "./pages/dashboard/EditUser";
import UserListing from "./pages/dashboard/UserListing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifie si le token est présent dans le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  // Déplace l'utilisation de useLocation à l'intérieur du Router
  return (
    <Router>
      <LocationBasedApp isAuthenticated={isAuthenticated} />
    </Router>
  );
}

// Un sous-composant pour gérer l'affichage de la Nav
function LocationBasedApp({ isAuthenticated }) {
  const location = useLocation(); // Utiliser useLocation ici

  return (
    <>
      {/* Affiche la Nav sauf sur la route /dashboard */}
      {!(["/dashboard", "/add-photo", "/users-listing"].includes(location.pathname) || location.pathname.startsWith("/edit-photo") || location.pathname.startsWith("/edit-user")) && <Nav />}


      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorite" element={isAuthenticated ? <Favorite /> : <Navigate to="/" />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
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
