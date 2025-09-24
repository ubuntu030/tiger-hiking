import { useState, useEffect, useCallback } from "react";
import type { SlideshowSlide } from "../types/slideshow.model";

export const useSlideshow = (
  slides: SlideshowSlide[],
  autoplay: boolean = true,
  interval: number = 5000
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (slides.length === 0) return;
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.img;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload slideshow images", error);
        setImagesLoaded(true); // Start slideshow even if some images fail
      }
    };

    preloadImages();
  }, [slides]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    if (autoplay && imagesLoaded) {
      const slideInterval = setInterval(nextSlide, interval);
      return () => clearInterval(slideInterval);
    }
  }, [autoplay, imagesLoaded, nextSlide, interval]);

  return {
    currentIndex,
    setCurrentIndex,
    imagesLoaded,
    currentSlide: slides.length > 0 ? slides[currentIndex] : null,
  };
};