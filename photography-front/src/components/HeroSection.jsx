import React from "react";
import "../assets/HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-transparent">Bienvenue,</span> <br />
            <span className="hero-title-bold">sur mon Portfolio</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
