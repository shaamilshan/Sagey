import { URL } from "@/Common/api";
import React, { useState } from "react";

const ProductSlider = ({ images, selectedImageIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // Update the current index when selectedImageIndex changes
  React.useEffect(() => {
    setCurrentIndex(selectedImageIndex);
  }, [selectedImageIndex]);

  return (
    <div className="flex w-full px-4 h-[500px] lg:h-[700px]">
      {/* Thumbnails on the left */}
      <div className="flex flex-col justify-start items-left gap-2 overflow-y-scroll scrollbar-hide h-full w-1/5">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-24 h-44 cursor-pointer ${index === currentIndex ? "border-2 border-[#CC4254]" : ""}`}
          >
            <img
              src={`${URL}/img/${image}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Main Image on the right */}
      <div className="flex-1 h-full pl-4">
        <img
          src={`${URL}/img/${images[currentIndex]}`}
          alt="Main Image"
          className="w-full h-full object-cover object-top rounded"
        />
      </div>
    </div>
  );
};

export default ProductSlider;
