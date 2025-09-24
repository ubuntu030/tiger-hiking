import React from "react";
import Button from "../../common/Button";
import Spinner from "../../common/Spinner";
import type { SlideshowSlide } from "../../../types/slideshow.model";

interface SlideshowProps {
  slides: SlideshowSlide[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  imagesLoaded: boolean;
}

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  currentIndex,
  setCurrentIndex,
  imagesLoaded,
}) => {
  const currentSlide = slides[currentIndex];

  if (!currentSlide) {
    return (
      <section className="relative h-[60vh] rounded-xl overflow-hidden flex items-center justify-center text-center text-white bg-stone-700 mb-16">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-800 z-20">
          <Spinner />
          <p className="mt-4 text-white/80">正在載入...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] rounded-xl overflow-hidden flex items-center justify-center text-center text-white bg-stone-700 mb-16">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-50" : "opacity-0"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-800 z-20">
          <Spinner />
          <p className="mt-4 text-white/80">正在載入絕美風景...</p>
        </div>
      )}

      {/* Text Content */}
      <div key={currentIndex} className="relative z-10 p-4 animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
          {currentSlide.title}
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
          {currentSlide.subtitle}
        </p>
        <Button to="/activities" className="mt-8">
          探索所有活動
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slideshow;
