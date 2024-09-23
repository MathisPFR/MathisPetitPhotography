import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../assets/sliderhome.css";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function SliderHome() {
  return (
    <>
      <Swiper
        slidesPerView={"3"}
        centeredSlides={false}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/PhotosDefinitive16Avr2022IMG7140.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/PhotosDefinitive0507202IMG4839.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/MissionLocaleEcopole.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/ConcoursSonyNov30.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
