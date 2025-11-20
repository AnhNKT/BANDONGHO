// src/components/CarouselBanner.tsx
import React from "react";
import "./CarouselBanner.css";
import bannerImg from "../assets/79cbcf74-b9b7-4567-aa89-472b27fe1991.png"; // file bạn vừa upload

const CarouselBanner: React.FC = () => {
  return (
    <div className="carousel-banner">
      <img src={bannerImg} alt="Banner" />
    </div>
  );
};

export default CarouselBanner;
