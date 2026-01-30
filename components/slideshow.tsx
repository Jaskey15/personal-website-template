"use client";

import { useState } from "react";
import Image from "next/image";

interface SlideshowProps {
  images: string[];
  alt?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export function Slideshow({
  images,
  alt = "Slideshow image",
  aspectRatio = "3/4",
  className = "",
  priority = false,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group">
      {/* Main Image Container */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio }}
      >
        {/* Subtle border frame */}
        <div className="absolute inset-0 rounded-sm border border-foreground/10 z-10 pointer-events-none" />

        {/* Inner vignette for printed photo feel */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-sm"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.15), inset 0 0 20px rgba(0,0,0,0.1)'
          }}
        />

        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${className}`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              pointerEvents: index === currentIndex ? 'auto' : 'none',
            }}
            priority={index === 0 ? priority : false}
          />
        ))}

        {/* Navigation - Inside Image */}
        {images.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-2 h-2 bg-white"
                      : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
