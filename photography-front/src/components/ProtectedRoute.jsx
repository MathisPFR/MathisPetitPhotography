import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null); // Stocke le rôle de l'utilisateur
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupère le token du localStorage
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Envoyer le token dans le header Authorization
              },
            }
          );
          setUserRole(response.data.role); // Stocke le rôle de l'utilisateur
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error
        );
      } finally {
        setLoading(false); // Arrête l'indicateur de chargement après la requête
      }
    };

    fetchUserDetails();
  }, []);

  // Afficher une page de chargement tant que les données ne sont pas récupérées
  if (loading) {
    return <p>Chargement...</p>;
  }

  // Si l'utilisateur n'est pas autorisé, rediriger vers la page d'accueil
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  // Si l'utilisateur a un rôle autorisé, afficher la route protégée
  return children;
};

export default ProtectedRoute;
