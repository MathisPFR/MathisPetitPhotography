import React from "react";
import "../assets/HeroSection.css";

const HeroSectionLogin = ({ title }) => {
  return (
    <div className="hero-section-login">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-transparent">Formulaire</span> <br />
            <span className="hero-title-bold">{title}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionLogin;
