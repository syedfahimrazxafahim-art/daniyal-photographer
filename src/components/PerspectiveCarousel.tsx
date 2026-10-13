import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../data/assets';

interface PerspectiveCarouselProps {
  photos: PhotoItem[];
  onOpenLightbox: (photo: PhotoItem) => void;
}

export const PerspectiveCarousel: React.FC<PerspectiveCarouselProps> = ({
  photos,
  onOpenLightbox,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const total = photos.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-8 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Perspective Stage */}
      <div className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full flex items-center justify-center [perspective:1400px] overflow-hidden sm:overflow-visible">
        {photos.map((photo, index) => {
          // Calculate offset relative to activeIndex wrapped
          let offset = index - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Spatial calculations for perspective layout
          const translateX = offset * 240; // horizontal separation
          const translateZ = -Math.abs(offset) * 160; // depth separation
          const rotateY = offset * -18; // 3D angle rotation
          const scale = 1 - Math.abs(offset) * 0.14;
          const opacity = isActive ? 1 : Math.max(0.2, 0.75 - Math.abs(offset) * 0.28);
          const zIndex = 20 - Math.abs(offset);

          return (
            <div
              key={photo.id}
              data-cursor="view"
              onClick={() => {
                if (isActive) {
                  onOpenLightbox(photo);
                } else {
                  setActiveIndex(index);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className={`absolute top-0 w-[290px] sm:w-[380px] md:w-[440px] h-[440px] sm:h-[520px] md:h-[580px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group rounded-none overflow-hidden bg-[#101010] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border ${
                isActive ? 'border-white/30 ring-1 ring-white/20' : 'border-white/10'
              }`}
            >
              {/* Image with high fidelity, zero distortion */}
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                loading={isActive ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/85 via-black/20 to-transparent ${
                  isActive ? 'opacity-80 group-hover:opacity-90' : 'opacity-70'
                }`}
              />

              {/* Card Meta for Active & Hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#F5F5F2]/70 mb-1.5 font-sans">
                    <span>{photo.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F5F5F2] tracking-normal leading-tight">
                    {photo.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox(photo);
                  }}
                  className="p-3 rounded-none bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 transition-colors"
                  aria-label={`View ${photo.title} fullscreen in lightbox`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between max-w-md mx-auto mt-6 px-4">
        <button
          type="button"
          onClick={prevSlide}
          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-[#F5F5F2]/80 hover:text-white border border-white/10 hover:border-white/40 transition-colors bg-white/[0.02]"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Counter & Indicator */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-[#F5F5F2]/90 tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
          </span>
          <div className="hidden sm:flex items-center gap-1.5">
            {photos.slice(0, Math.min(total, 9)).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setActiveIndex(dotIdx)}
                className={`h-1 transition-all duration-300 ${
                  dotIdx === activeIndex % Math.min(total, 9)
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-[#F5F5F2]/80 hover:text-white border border-white/10 hover:border-white/40 transition-colors bg-white/[0.02]"
          aria-label="Next photograph"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
