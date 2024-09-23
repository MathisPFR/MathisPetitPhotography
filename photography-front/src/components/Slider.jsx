import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";

import "../App.css"; // Assurez-vous d'avoir un fichier CSS pour personnaliser le style

export default function App() {
  return (
    <div className="slider">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="/images/PhotosDefinitive.jpg"
              alt="Slide 1"
              className="slide-img"
            />
            <div className="title-overlay">
              <div class="header-container">
                <div class="author">
                  <span class="author-line"></span> MATHIS PETIT
                </div>
                <h1>Capturer</h1>
                <h2 class="outlined-text">l'éphémère</h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="/images/PhotosDefinitive16Avr2022IMG7140.jpg"
              alt="Slide 2"
              className="slide-image"
            />
            <div className="title-overlay"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
