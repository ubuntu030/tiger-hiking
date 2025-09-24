import { useState, useEffect, useCallback } from "react";
import type { SlideshowSlide } from "../types/slideshow.model";

/*
  useSlideshow hook

  說明 (Contract):
  - inputs:
    - slides: SlideshowSlide[] - 要在輪播中顯示的投影片陣列 (每個 slide 含有 img 屬性等)
    - autoplay?: boolean - 是否自動播放 (預設 true)
    - interval?: number - 自動播放的間隔 (毫秒, 預設 5000)

  - outputs (返回物件):
    - currentIndex: number - 目前顯示的投影片索引
    - setCurrentIndex: React state setter - 可由外部控制目前索引
    - imagesLoaded: boolean - 是否已完成圖片預載入 (或至少已嘗試過)
    - currentSlide: SlideshowSlide | null - 目前的 slide 物件

  行為要點:
  - 會預先載入 slides 中的所有圖片 (以減少切換時的閃爍)
  - 若預載入失敗 (某些圖片錯誤)，仍會將 imagesLoaded 設為 true 並開始輪播
  - 當 autoplay 且 imagesLoaded 為 true 時，會以 interval 啟動 setInterval 自動切換
  - 當 slides 為空陣列時，相關副作用會早期返回 (不做任何事)

  重要 edge cases:
  - slides 長度為 0: currentSlide 為 null，定時器不會啟動
  - 圖片任一預載入失敗: 會 log error，但仍開始輪播以維持 UX
*/

export const useSlideshow = (
  slides: SlideshowSlide[],
  autoplay: boolean = true,
  interval: number = 5000
) => {
  // 目前顯示的投影片索引 (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 用來表示是否已完成圖片預載入 (或至少完成嘗試)
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 當 slides 變動時，預載入圖片
  useEffect(() => {
    // 如果沒有 slides，直接離開 (避免不必要的 work)
    if (slides.length === 0) return;

    const preloadImages = async () => {
      // 對每張 slide 建立一個 Image 並監聽 load / error
      const promises = slides.map((slide) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = slide.img; // 假設 SlideshowSlide 有 img 屬性 (URL)
          img.onload = () => resolve();
          img.onerror = (e) => reject(e);
        });
      });

      try {
        // 等待所有圖片載入完成
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        // 如果有任何一張載入失敗，仍然把 imagesLoaded 設為 true
        // 這樣可以避免因為單張圖片失敗而阻塞整個輪播。
        // 同時印出錯誤以便偵錯。
        console.error("Failed to preload slideshow images", error);
        setImagesLoaded(true); // 即使部份圖片失敗也啟動輪播
      }
    };

    preloadImages();
    // 只要 slides 陣列改變就會重新執行預載入
  }, [slides]);

  // 切換到下一張投影片 (含 wrap-around)
  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  // 自動播放效果：當 autoplay 為 true 且圖片已載入後，啟動定時器
  useEffect(() => {
    if (autoplay && imagesLoaded) {
      const slideInterval = setInterval(nextSlide, interval);
      // 清理定時器
      return () => clearInterval(slideInterval);
    }
    // 如果未啟動 autoplay 或圖片尚未載入，則不建立定時器
    return undefined;
  }, [autoplay, imagesLoaded, nextSlide, interval]);

  return {
    currentIndex,
    setCurrentIndex,
    imagesLoaded,
    // 當 slides 為空時，回傳 null 以便呼叫端處理
    currentSlide: slides.length > 0 ? slides[currentIndex] : null,
  };
};