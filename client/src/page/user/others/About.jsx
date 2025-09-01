import React from 'react'
import { Button } from "@/components/ui/button"


const About = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-[45px] text-[#2C2C2C] mb-12">About us</h1>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="rounded-lg flex items-start overflow-hidden w-[300px] h-[400px] p-4 md:w-[400px] md:h-[500px]">
              <img
                alt="Jewelry"
                className="object-contain w-full h-full"
                height="500"
                src="https://raw.githubusercontent.com/sreenath256/Helah/master/src/assets/AboutPageImage1.png"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "contain",
                }}
                width="400"
              />
            </div>
            <div className="max-w-md space-y-6 p-3">
              <h2 className="text-[55px] text-[#CC4254]">Adorn Yourself With Our Classics</h2>
              <p className="text-lg font-Inter font-light">
                Welcome to helah, where every piece tells a story of affordable glamour. Proudly made in India with a
                passion for blending style and accessibility, we bring you imitation jewelry that mirrors the beauty of real
                gems. Join us on this journey of adornment, where each piece at helah is more than an accessory – it's a
                reflection of your unique style.
              </p>
              <Button className="bg-[#CC4254] w-[230px] h-[52px]  font-Inter text-lg hover:bg-[#973b47] p-6 text-white">Explore our collections</Button>
            </div>
          </div>
          
          <div className="bg-[#FFEFF1] rounded-2xl p-32 mt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="w-full flex items-end flex-col justify-center text-right md:pr-8">
          <h2 className="text-5xl text-center  text-[#CC4254] mb-6">Brand Story</h2>
          <p className="text-lg font-Inter font-light text-black">
            Helah, a sanctuary of style founded in 1999 by Ubaid. For over two decades, we've been devoted to delivering
            affordable elegance to adorn your unique journey. From our origins as a wholesale hub to the heart of South
            India's jewelry scene, Helah has flourished into a name synonymous with craftsmanship and sophistication.
          </p> 
          <Button className="mt-6 bg-[#CC4254] w-[230px] h-[52px] font-Inter text-lg hover:bg-[#973b47] p-6 text-white ">Explore our collections</Button>
        </div>
        <div className="w-full ">
          <div className="relative">
            <img
              alt="Jewelry"
              className="w-3/4 max-w-[350px] h-auto "
              height="300"
              src="https://raw.githubusercontent.com/sreenath256/Helah/master/src/assets/AboutPageImage2.png"
              style={{
                aspectRatio: "300/300",
                objectFit: "contain",
              }}
              width="200"
            />
            
          </div>
        </div>
      </div>
    </div>
  
        </div>
      )
}

export default About