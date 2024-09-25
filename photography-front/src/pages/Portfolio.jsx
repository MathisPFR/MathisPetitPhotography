import React from "react";
import HeroSection from "../components/HeroSection";
import "../assets/portfolio.css";
import Photos from "../components/Photos";
import Footer from "../components/Footer";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div>
        <HeroSection
          title="Bienvenu sur"
          subtitle="mon Portfolio"
          backgroundImage="./images/PhotosDefinitive16Avr2022IMG7140.jpg"
        />
      </div>
      <div>
        <Photos />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
