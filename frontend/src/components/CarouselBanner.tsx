import React from "react";

interface CarouselBannerProps {
  images: string[];
}

const CarouselBanner: React.FC<CarouselBannerProps> = ({ images }) => {
  return (
    <div className="w-full overflow-hidden mb-8">
      <div className="flex transition-transform duration-500">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`banner-${idx}`} className="w-full h-64 object-cover" />
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;
