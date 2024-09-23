import React from "react";
import CompareImage from "react-compare-image";
import '../assets/beforeafterslider.css'

// Assure-toi que les images sont dans le bon dossier ou dans le dossier public
import beforeImage from "../assets/images/avant.jpg"; // Image avant
import afterImage from "../assets/images/apres.jpg"; // Image après

const BeforeAfterSlider = () => {
  return (
    <div className="before-after-container">
      <CompareImage
        leftImage={beforeImage} // Image avant
        rightImage={afterImage} // Image après
        sliderPositionPercentage={0.5} // Position initiale du slider (au milieu ici)
      />
    </div>
  );
};

export default BeforeAfterSlider;
