import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoItem } from '../data/assets';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const currentIndex = photos.findIndex((p) => p.id === photo.id);
        const next = photos[(currentIndex + 1) % photos.length];
        onNavigate(next);
        setIsZoomed(false);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = photos.findIndex((p) => p.id === photo.id);
        const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
        onNavigate(prev);
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [photo, photos, onClose, onNavigate]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const total = photos.length;

  const handleNext = () => {
    const next = photos[(currentIndex + 1) % total];
    onNavigate(next);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    const prev = photos[(currentIndex - 1 + total) % total];
    onNavigate(prev);
    setIsZoomed(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph view: ${photo.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 border-b border-white/10 bg-gradient-to-b from-[#050505] to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#F5F5F2]/70 font-sans">
            Daniyal Photography
          </span>
          <span className="text-[#F5F5F2]/40">·</span>
          <span className="font-mono text-xs tabular-nums text-[#F5F5F2]/80">
            {String(currentIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 text-[#F5F5F2]/80 hover:text-white hover:bg-white/10 transition-colors rounded-none"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 text-[#F5F5F2]/80 hover:text-white hover:bg-white/10 transition-colors rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Close lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className={`relative max-w-full max-h-full transition-transform duration-300 ease-out flex items-center justify-center ${
            isZoomed ? 'cursor-zoom-out scale-135' : 'cursor-zoom-in scale-100'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[75vh] object-contain shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-white hover:text-black text-white/90 backdrop-blur-sm border border-white/15 transition-all z-20"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-white hover:text-black text-white/90 backdrop-blur-sm border border-white/15 transition-all z-20"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Editorial Caption Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-20">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#F5F5F2]/60 mb-1">
            <span>{photo.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{photo.location}</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F5F5F2]">
            {photo.title}
          </h2>
          <p className="text-sm text-[#9E9E99] font-sans max-w-xl mt-1">
            {photo.caption}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:booking.dsphotography@gmail.com?subject=Inquiry for Wedding Photography regarding ${encodeURIComponent(
              photo.title
            )}`}
            className="px-5 py-2.5 text-xs font-sans tracking-wider uppercase text-black bg-white hover:bg-[#F5F5F2] transition-colors whitespace-nowrap"
          >
            Inquire About This Style
          </a>
        </div>
      </div>
    </div>
  );
};
