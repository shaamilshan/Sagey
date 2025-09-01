import React from 'react';

// You can pass the image URL as a prop later if you need to
// For now, it uses the image you provided in the last message.
const imageUrl = "http://googleusercontent.com/file_content/1"; 

const OfferBanner = () => {
  return (
    // Section wrapper with padding and a standard font
    <div className="w-full bg-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      
      {/* "VIEW MORE" Button */}
      <div className="text-center mb-8">
        <button className="bg-[#2A5F62] text-white py-2 px-8 rounded-full text-sm font-semibold hover:bg-[#224e50] transition-colors">
          VIEW MORE
        </button>
      </div>
      
      {/* Main Banner Container - uses 'relative' to position the image */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center">
      
        {/* Image Container - Positioned 'absolute' to overlap the banner */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:left-0 w-2/5 sm:w-1/3 md:w-1/4 z-10">
          <div className="bg-white p-2 shadow-2xl transform -rotate-6">
            <img
              src={imageUrl}
              alt="Promotional item"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Teal Background Banner */}
        <div className="w-full bg-[#2A5F62] text-white flex justify-end py-8 sm:py-12">
          {/* Text Content container */}
          <div className="w-3/5 sm:w-1/2 text-center pr-2">
            <p className="text-3xl md:text-4xl lg:text-5xl font-light">
              MIN.
            </p>
            <p className="text-5xl md:text-6xl lg:text-8xl font-bold my-1">
              50% OFF*
            </p>
            <p className="text-[10px] md:text-xs tracking-widest opacity-80 uppercase">
              TERMS AND CONDITIONS APPLY
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default OfferBanner;