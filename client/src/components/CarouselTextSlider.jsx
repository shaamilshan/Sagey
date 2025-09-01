import { useState, useEffect } from "react";

function CarouselTextSlider() {
  const texts = ["Welcome to Sagey", "Made in India", "Free Shipping"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [texts.length]);

  return (
    <div className="bg-primary text-white py-2 overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full text-center font-semibold text-md"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselTextSlider;
