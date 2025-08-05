import React, { useState, useEffect, useCallback } from "react";
import Navber from "../../share/Navber/Navber";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  let slideInterval;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 1 : prevSlide + 1));
  }, []);

  useEffect(() => {
    slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const handlePrevClick = () => {
    clearInterval(slideInterval);
    setCurrentSlide(currentSlide === 1 ? 3 : currentSlide - 1);
  };

  const handleNextClick = () => {
    clearInterval(slideInterval);
    setCurrentSlide(currentSlide === 3 ? 1 : currentSlide + 1);
  };

  return (
    <div>
      <div className="absolute z-20 w-full">
        <Navber />
      </div>
      <div className="carousel w-full relative" style={{ maxWidth: "100%", overflow: "hidden" }}>
        <div className={`carousel-item relative w-full  ${currentSlide === 1 ? "block" : "hidden"}`}>
          <img src="https://i.postimg.cc/3J4t3ZxH/1.jpg" className="w-full h-[800px] lg:h-[950px]" alt="Slide 1" />
          <div className="absolute inset-0  bg-black bg-opacity-10 flex items-center justify-center -top-1/4">
            <div className=" text-center">
              <h2 className="text-white text-lg  uppercase tracking-[0.6em]">This is a Text Overlay</h2>
              <p className="text-white text-6xl md:text-8xl leading-[70px] 	md:leading-[120px] md:max-w-4xl">Enjoy The Best Moments of Life</p>
            </div>
          </div>
        </div>

        <div className={`carousel-item relative w-full ${currentSlide === 2 ? "block" : "hidden"}`}>
          <img src="https://i.postimg.cc/y6rfqGBP/2.jpg" className="w-full h-[800px] lg:h-[950px]" alt="Slide 2" />

          <div className="absolute inset-0  bg-black bg-opacity-10 flex items-center justify-center -top-1/4">
            <div className=" text-center">
              <h2 className="text-white text-lg  uppercase tracking-[0.6em]">Unique Place to Relax & Enjoy</h2>
              <p className="text-white text-6xl md:text-8xl leading-[70px] md:leading-[120px] md:max-w-4xl">The Perfect Base For You</p>
            </div>
          </div>
        </div>

        <div className={`carousel-item relative w-full ${currentSlide === 3 ? "block" : "hidden"}`}>
          <img src="https://i.postimg.cc/9F6J0qDw/3.jpg" className="w-full h-[800px] lg:h-[950px]" alt="Slide 3" />

          <div className="absolute inset-0  bg-black bg-opacity-10 flex items-center justify-center -top-1/4">
            <div className=" text-center">
              <h2 className="text-white text-lg  uppercase tracking-[0.6em]">Luxury Hotel & Best Resort</h2>
              <p className="text-white text-6xl md:text-8xl leading-[70px] md:leading-[120px] md:max-w-4xl">Enjoy a Luxury Experience</p>
            </div>
          </div>

        </div>

        {/* Navigation buttons (manual control) */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center gap-4">
          <button onClick={handlePrevClick} className="btn btn-circle ">❮</button>
          <button onClick={handleNextClick} className="btn btn-circle  ">❯</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
