import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import "../assets/account.css";
import UpdateAccountForm from "../components/UpdateAccountForm";
import Footer from "../components/Footer";


const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les informations de l'utilisateur
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des informations utilisateur");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="account-container">
      <HeroSection
        title="Votre"
        subtitle="Compte"
        backgroundImage="./images/19102021-IMG_6263.jpg"
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <p>Chargement des informations...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex items-center space-x-4 text-white">
            {/* Icône utilisateur */}
            <FaUserCircle className="text-7xl" />

            {/* Texte de bienvenue */}
            <div className="text-5xl">
              <span className="font-light">Bienvenue,</span>{" "}
              <span className="font-bold text-special">{user.name}</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <UpdateAccountForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Account;
