"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeaderSlider = () => {
  // Define an array of quotes and image URLs
  const slides = [
    {
      imageUrl: "b1.png",
    },
    {
      imageUrl: "b2.png",
    },
    {
      imageUrl: "b3.png",
    },
    {
      imageUrl: "b4.png",
    },
  ];

  return (
    <Carousel
      showArrows={true} // Hide navigation arrows
      showStatus={false} // Hide slide number/status
      showIndicators={true} // Hide slide indicators
      infiniteLoop={true} // Loop the slider
      autoPlay={true} // Auto play slides
      interval={2800} // Time interval between slides (in milliseconds)
      showThumbs={false} // Set this to false to hide the thumbnails
    >
      {slides.map((slide, index) => (
        <div key={index} className="">
          <img
            src={slide.imageUrl}
            alt={`Slide ${index + 1}`}
            className="h-1/2 lg:h-2x96 bg-contain "
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HeaderSlider;
