import React from 'react';
import ImageSlider from "@/components/Home/ImageSlider";
import NewArrivals from "@/components/Home/NewArrivals";
import OurProducts from "@/components/Home/OurProducts";
import ReviewSlider from "@/components/Home/ReviewSlider";
import FullWidthBanners from "@/components/Home/FullWidthBanners";

import MyBanner from "../../../assets/bannernw.png";

import offImg1 from "../../../assets/trendskart/home/offer-img.png"
import offImg2 from "../../../assets/trendskart/home/offer-img-2.jpg"
import MakeUrStyle from "@/components/Home/MakeUrStyle";
import FlashSale from "@/components/Home/FlashSale";
import LookBook from "@/components/Home/LookBook";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ShopCategories from "@/components/Others/ShopCatogories";

// Social Icon Component
const SocialIcon = ({ type, size = "responsive", onClick, className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    responsive: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    responsive: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
  };

  const InstagramPath = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
  
  const WhatsAppPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.486 3.488";

  return (
    <div 
      className={`${sizes[size]} border-2 border-gray-900 border-opacity-95 bg-transparent rounded-full flex items-center justify-center p-1 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm ${className}`}
      onClick={onClick}
    >
      {/* Inner Circle */}
      <div className="w-full h-full bg-gray-900 bg-opacity-60 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-300">
        <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="currentColor">
          <path d={type === 'instagram' ? InstagramPath : WhatsAppPath} />
        </svg>
      </div>
    </div>
  );
};

// Banner Wrapper Component that adds social icons overlay
const BannerWithSocialIcons = ({ children, onInstagramClick, onWhatsAppClick, socialIconsPosition = "bottom-left" }) => {
  const positionClasses = {
    "bottom-left": "bottom-3 left-8 sm:bottom-4 sm:left-12 md:bottom-6 md:left-16",
    "bottom-right": "bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6",
    "top-left": "top-3 left-8 sm:top-4 sm:left-12 md:top-6 md:left-16",
    "top-right": "top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6",
    "bottom-center": "bottom-3 left-1/2 transform -translate-x-1/2 sm:bottom-4 md:bottom-6"
  };

  return (
    <div className="relative w-full">
      {children}
      
      {/* Social Icons Overlay */}
      <div className={`absolute ${positionClasses[socialIconsPosition]} flex space-x-2 sm:space-x-3 z-10`}>
        <SocialIcon 
          type="instagram" 
          size="responsive"
          onClick={onInstagramClick}
          className="hover:scale-110 transform transition-transform duration-200"
        />
        <SocialIcon 
          type="whatsapp" 
          size="responsive"
          onClick={onWhatsAppClick}
          className="hover:scale-110 transform transition-transform duration-200"
        />
      </div>
    </div>
  );
};

const images = [MyBanner];
const offImages = [offImg1, offImg2];

const handleClickFunctionWhats = () => {
  const phoneNumber = '9400740061'; // Replace with the WhatsApp number
  const message = encodeURIComponent('Hi, I\'m excited to create my own custom-designed dress! Can you help me bring my vision to life?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
}

const handleClickFunctionInsta = () => {
  window.open('https://www.instagram.com/sagey.in/', '_blank');
}

export default function Home2() {
  return (
    <>
      {/* <ShopCategories/> */}
      {/* <CarouselTextSlider/> */}
      {/* <ShopCategories /> */}
      <WhatsAppFloatingButton/>
      <div className="w-full">
        <BannerWithSocialIcons
          onInstagramClick={handleClickFunctionInsta}
          onWhatsAppClick={handleClickFunctionWhats}
          socialIconsPosition="bottom-left" // Position as shown in your reference image
        >
          <ImageSlider 
            images={images} 
            hideArrows={true} 
            hideThreeDot={true} 
            autoplay={false} 
            className="w-full h-[640px]"
          />
        </BannerWithSocialIcons>
        
        {/*
        <div className="ml-4 px-0 sm:px-20 py-10 ">
          <h1 className="font-bold text-xl ">THRILLER DEALS</h1>
          <div className="h-1 w-20 bg-primary"></div>
        </div>
        <ImageSlider images={offImages} hideArrows={true} hideThreeDot={true} slideInterval={3000} />
        */}
        
        <NewArrivals />
        
        {/*
        <MakeUrStyle
          heading="MAKE YOUR OWN DESIGN"
          description="Express your style with custom designs made just for you. Enjoy seamless personalization, premium quality, and endless possibilities to create your unique look or the perfect gift"
          btnName="Make Now"
          handleClick={handleClickFunctionWhats}
        />
        */}
        
        {/*
        <FlashSale />
        */}
        
        <OurProducts />
        <ReviewSlider />
        
        {/* <BestSellers /> */}
        
        {/*
        <MakeUrStyle
          heading="@sagey.in follow us on instagram"
          description="#Wear The Change"
          btnName="Follow Us"
          handleClick={handleClickFunctionInsta}
        />
        */}
        
        <LookBook />
        
        {/* New Full Width Banners Section */}
        <FullWidthBanners />
      </div>
    </>
  );
}