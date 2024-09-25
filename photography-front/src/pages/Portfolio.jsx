import React from "react";
import HeroSection from "../components/HeroSection";
import "../assets/portfolio.css";
import Photos from "../components/Photos";
import Footer from "../components/Footer";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div>
        <HeroSection />
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
