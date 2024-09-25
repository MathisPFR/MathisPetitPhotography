import React from "react";
import "../assets/login.css";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LikedPhotos from "../components/LikedPhotos"; // Importer le composant des photos likées

const Favorite = () => {
  return (
    <div className="login-container">
      {/* Section du Hero avec l'image de fond */}
      <div>
        <HeroSection
          title="Vos photos"
          subtitle="favorites"
          backgroundImage="./images/IMG_8418.jpg"
        />
      </div>

      {/* Section des photos likées */}
      <div className="liked-photos-container">
        <LikedPhotos /> {/* Ajoute ici le composant des photos likées */}
      </div>

      {/* Section du Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Favorite;
