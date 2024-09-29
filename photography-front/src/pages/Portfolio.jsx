import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import "../assets/portfolio.css";
import Photos from "../components/Photos";
import Footer from "../components/Footer";
import FilterByPartner from "../components/FilterByPartner";

const Portfolio = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState(null); // ID du partenaire sélectionné

  const handlePartnerSelect = (partnerId) => {
    setSelectedPartnerId(partnerId); // Met à jour l'ID du partenaire sélectionné
  };

  return (
    <div className="portfolio-container">
      <div>
        <HeroSection
          title="Bienvenue sur"
          subtitle="mon Portfolio"
          backgroundImage="./images/PhotosDefinitive16Avr2022IMG7140.jpg"
        />
      </div>

      {/* Section du filtre par partenaire */}
      <div className="container mx-auto p-4">
        <FilterByPartner onPartnerSelect={handlePartnerSelect} />
      </div>

      {/* Affichage des photos filtrées */}
      <div className="container mx-auto p-4">
        <Photos partnerId={selectedPartnerId} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
