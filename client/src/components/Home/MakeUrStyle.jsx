import React from 'react'
import { Button } from "@/components/ui/button"

const MakeUrStyle = ({ heading, description, btnName, handleClick }) => {
  return (
    <div className="relative my-10 w-full h-fit bg-gradient-to-r from-cyan-600 to-cyan-700 flex flex-col items-center justify-center py-8 bg-opacity-90 rounded-none sm:rounded-none">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center py-5">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {heading}
        </h1>
        <p className="text-gray-100 text-sm md:text-base mb-8 max-w-2xl mx-auto px-8">
          {description}
        </p>
        <Button
          className="bg-cyan-900/50 hover:bg-cyan-900/70 text-white px-8 py-2 rounded-sm transition-colors"
          onClick={handleClick} 
        >
          {btnName}
        </Button>
      </div>
    </div>
  )
}

export default MakeUrStyle
