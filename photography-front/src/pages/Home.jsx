import React from "react";
import Slider from "../components/Slider";
import "../assets/nav.css";
import "../assets/home.css";
import SliderHome from "../components/SliderHome";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Faq from "../components/Faq";
import Partners from "../components/Partners";

const Home = () => {
  return (
    <div>
      <Slider />
      <div class="about-section">
        <div class="about-text">
          <h4 class="subtitle">QUI SUIS-JE ?</h4>
          <h1 class="title">Découvrez Mon Univers</h1>
          <p class="description">
            Bienvenue sur mon portfolio de photographie. Plongez dans un univers
            où chaque image raconte une histoire. Parcourez mes galeries,
            explorez mes projets, et découvrez des moments uniques capturés à
            travers mon objectif.
          </p>
          <a href="#" class="explore-button">
            <span class="line"></span> Explorer le Portfolio
          </a>
        </div>
        <div class="about-image">
          <img src="/images/DriveAug20205717.webp" alt="Photo de Mathis" />
        </div>
      </div>
      <div class="specialty-section">
        <div class="content-wrapper">
          <h4 class="small-title">PHOTO-IDEOLOGY</h4>
          <h2 class="main-title">Mes spécialités en photographie</h2>
        </div>
      </div>
      <div>
        <div class="specialties-section">
          <div class="specialties-content">
            <div class="specialty-item">
              <h3>
                <span class="number">01</span> Photo de voie lactée
              </h3>
              <p>
                Je capture la beauté céleste et les étoiles dans toute leur
                splendeur.
              </p>
            </div>
            <div class="specialty-item">
              <h3>
                <span class="number">02</span> Photo de paysage
              </h3>
              <p>
                J'immortalise des paysages naturels époustouflants et sereins.
              </p>
            </div>
            <div class="specialty-item">
              <h3>
                <span class="number">03</span> Reportage photo
              </h3>
              <p>
                Je raconte des histoires captivantes à travers mes reportages
                photographiques.
              </p>
            </div>
          </div>

          <div class="specialty-image"></div>
        </div>
      </div>
      <div class="portrait-section">
        <h5 class="portrait-subtitle">PORTRAIT EDITION</h5>
        <h2 class="portrait-title">Le meilleurs des portraits</h2>
      </div>
      <div>
        <SliderHome />
      </div>
      <div class="portrait-section">
        <h5 class="portrait-subtitle">La retouche photo</h5>
        <h2 class="portrait-title">
          Exemple de retouche, <br />
          Photographique
        </h2>
        <div className="slider-before-after">
          <BeforeAfterSlider />
        </div>
      </div>
      <div className="faq-bloc">
        <div className="faq-left-container">
          <Faq />
        </div>
        <div class="faq-right-block">
          <span class="vertical-text">Fonctionnalités du Site</span>
        </div>
      </div>
      <div class="portrait-section">
        <h5 class="portrait-subtitle">Partner</h5>
        <h2 class="portrait-title">J'ai déjà collaboré avec</h2>
        <Partners />
      </div>
    </div>
  );
};

export default Home;
