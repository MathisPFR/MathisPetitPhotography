import React from "react";
import "../assets/HeroSection.css";

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-transparent">{title}</span> <br />
            <span className="hero-title-bold">{subtitle}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
