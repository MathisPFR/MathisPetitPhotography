import React from "react";
import "../assets/partners.css"; // Crée un fichier CSS pour styliser ce composant

const Partners = () => {
  return (
    <div className="partners-container">
      <div className="partner">
        <img src="/images/circle.png" alt="Les Missions Locales" />
      </div>
      <div className="partner">
        <img src="/images/fossa.png" alt="UNICEF" />
      </div>
      <div className="partner">
        <img src="/images/muzica-2.png" alt="Charlie Unique Content" />
      </div>
    </div>
  );
};

export default Partners;
