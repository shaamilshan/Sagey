import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function ImageSlider({
  images,
  hideArrows = false,
  hideThreeDot = false,
  slideInterval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center ">
      <main>
        <section className="relative w-full h-full overflow-hidden">
          <div className="relative h-full w-full flex items-center justify-center ">
            {/* Conditional rendering for arrow buttons */}
            {!hideArrows && (
              <>
                <Button
                  className="absolute left-9 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 shadow-lg hover:bg-gray-100 transition-transform scale-110 opacity-70 z-10 max-md:hidden"
                  size="icon"
                  variant="ghost"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-8 w-8 text-black" />
                </Button>
                <Button
                  className="absolute right-9 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 shadow-lg hover:bg-gray-100 transition-transform scale-110 opacity-70 z-10 max-md:hidden"
                  size="icon"
                  variant="ghost"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8 text-black" />
                </Button>
              </>
            )}

            {/* Slider Container */}
            <div
              className="flex h-full w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Slide to the current image
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-full w-full flex items-center  justify-center flex-shrink-0"
                  style={{ flex: "0 0 100%" }} // Each image takes 100% of the container width
                >
                  <div className="h-full w-full">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="h-full w-full  object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {!hideThreeDot && (
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 rounded-full ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-white opacity-50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ImageSlider;
