import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import pant from "../../assets/Sagey/product1.png";
import Shirt from "../../assets/Sagey/model1.png";
import OrangeTShirt from "../../assets/Sagey/product1.png";
import tShirt from "../../assets/Sagey/model1.png";

const categories = [
  {
    title: "MAXI GOWN",
    image: pant,
    bgColor: "bg-amber-100",
  },
  {
    title: "PARTY WEAR",
    image: Shirt,
    bgColor: "bg-orange-200",
  },
  {
    title: "CROP TOPS",
    image: OrangeTShirt,
    bgColor: "bg-gray-100",
  },
  {
    title: "BOTTOMS",
    image: tShirt,
    bgColor: "bg-stone-200",
  }
];

const FlashSale = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: !isMobile,  // Disable infinite scroll on mobile
    draggable: isMobile,  // Enable dragging only for mobile
  });

  // Handle screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Consider mobile screens as less than 768px
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update the current index on change
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentIndex(emblaApi.selectedScrollSnap()); // Get the selected slide index
      };
      emblaApi.on("select", onSelect);
      return () => emblaApi.off("select", onSelect);
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Navigate to the category route
  const handleNavigation = (category) => {
    const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/collections?search=${formattedCategory}`);
  };

  return (
    <div className="relative overflow-hidden py-10 px-4 sm:px-20">

      {/* Title */}
      <div className="mb-4 mx-2 font-bold text-2xl flex flex-col items-left">
        <h1 className=" text-lg sm:text-xl md:text-2xl font-normal sm:font-semibold md:font-bold ">Flash Sales</h1>
        <div className="h-1 w-16 hover:w-20 bg-primary"></div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categories.map((category, index) => (
           <div
           key={index}
           className="relative flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_25%]"
         >
           <div
             className={`relative aspect-[3/4] ${category.bgColor} transition-transform 
                         duration-500 hover:scale-110`}
             onClick={() => handleNavigation(category.title)} // Add onClick to navigate
           >
             <img
               src={category.image}
               alt={category.title}
               className="absolute inset-0 w-full h-full object-cover"
               loading={index === 0 ? "eager" : "lazy"}
             />
             <div className="absolute inset-0 bg-black/20" />
             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
               <h3 className="text-white  sm:text-2xl  font-bold tracking-wider ">
                 {category.title}
               </h3>
             </div>
           </div>
         </div>
         
          ))}
        </div>
      </div>

      {/* Pagination Dots (only on mobile) */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          {categories.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FlashSale;
