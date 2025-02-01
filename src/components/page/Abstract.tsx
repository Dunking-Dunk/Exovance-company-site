"use client";

import React from 'react';

const Abstract = () => {
  return (
    <div className="h-full relative flex items-center justify-center  px-80 py-60">
      {/* Floating Pills */}
      <div className="absolute top-[15%] left-[20%]">
        <span className="bg-customGray text-customBlack px-4 py-1 rounded-full text-sm font-medium">IMAGINE</span>
      </div>
      <div className="absolute left-[15%] top-[50%]">
        <span className="bg-customGray text-customBlack px-4 py-1 rounded-full text-sm font-medium">INNOVATE</span>
      </div>
      <div className="absolute right-[20%] top-[20%]">
        <span className="bg-customGray text-customBlack px-4 py-1 rounded-full text-sm font-medium">SERVICES</span>
      </div>
      <div className="absolute right-[25%] top-[45%]">
        <span className="bg-customGray text-customBlack px-4 py-1 rounded-full text-sm font-medium">INVENT</span>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <h1 className="text-customGrayLight text-5xl md:text-7xl font-bold leading-tight tracking-wider font-exo2">
          PIONEERING INTELLIGENT
        </h1>
        <div className="relative my-4 text-center">
          <span className="playwrite-us-trad text-4xl md:text-7xl text-customGrayDarker italic">
            Solutions for a
          </span>
        </div>
        <h1 className="text-customGrayLight text-right text-5xl md:text-7xl font-bold tracking-wider font-exo2">
          FUTURISTIC WORLD
        </h1>
         
      </div>
      <p className="text-customGrayDark absolute left-[10%] bottom-[20%] mt-8 mx-auto text-sm">
          Innovate. Automate. Elevate. Cutting-edge AI, web, and <br/> mobile solutions to shape the future.
    </p>
    </div>
  );
};

export default Abstract;