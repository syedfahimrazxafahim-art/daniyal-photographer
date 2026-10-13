import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PHOTOS, PhotoItem } from '../data/assets';
import { PerspectiveCarousel } from './PerspectiveCarousel';
import { PhotoLightbox } from './PhotoLightbox';
import { Maximize2, Sparkles } from 'lucide-react';
import { LiquidMetalButton } from './LiquidMetalButton';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<PhotoItem | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'gallery'>('carousel');

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'stories', label: 'Wedding Stories' },
    { id: 'ceremonies', label: 'Ceremonies' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'details', label: 'Details' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_PHOTOS;
    return PORTFOLIO_PHOTOS.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="portfolio"
      className="relative w-full py-28 sm:py-36 bg-[#050505] border-t border-white/10"
      aria-label="Photography Portfolio"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E9E99] font-sans mb-3">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>New York & Beyond</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F2] tracking-tight leading-tight">
              Cinematic Portfolio
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9E9E99] font-sans max-w-xl font-light leading-relaxed">
              Every celebration is a private universe of glances, sacred promises, and joyous tears.
              Explore a curated selection of wedding imagery captured across New York.
            </p>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-none self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans transition-colors ${
                viewMode === 'carousel'
                  ? 'bg-white text-black font-medium'
                  : 'text-[#9E9E99] hover:text-white'
              }`}
            >
              Perspective View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-sans transition-colors ${
                viewMode === 'gallery'
                  ? 'bg-white text-black font-medium'
                  : 'text-[#9E9E99] hover:text-white'
              }`}
            >
              Editorial Grid
            </button>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-sans whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'text-white border-b-2 border-white font-medium'
                  : 'text-[#9E9E99] hover:text-white border-b-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mode 1: 3D Perspective Carousel */}
        {viewMode === 'carousel' && (
          <div className="transition-all duration-500">
            <PerspectiveCarousel
              photos={filteredPhotos}
              onOpenLightbox={(photo) => setActiveLightboxPhoto(photo)}
            />
          </div>
        )}

        {/* Mode 2: Editorial Masonry Showcase Grid */}
        {viewMode === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-500">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                data-cursor="view"
                onClick={() => setActiveLightboxPhoto(photo)}
                className={`group relative bg-[#101010] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/30 ${
                  index % 7 === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle dark gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover metadata & zoom trigger */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="self-end p-2 bg-black/60 backdrop-blur-sm border border-white/20 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/70 font-sans mb-1">
                      <span>{photo.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{photo.location}</span>
                    </div>
                    <h3 className="font-editorial text-2xl text-white font-normal leading-tight">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Callout */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-white/70" />
            <p className="text-xs uppercase tracking-widest text-[#9E9E99] font-sans">
              Currently accepting wedding date inquiries for New York & destination celebrations.
            </p>
          </div>

          <LiquidMetalButton
            href="#contact"
            variant="secondary"
            className="!px-6 !py-3 text-xs shrink-0"
          >
            Inquire for Your Date
          </LiquidMetalButton>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && (
        <PhotoLightbox
          photo={activeLightboxPhoto}
          photos={filteredPhotos}
          onClose={() => setActiveLightboxPhoto(null)}
          onNavigate={(photo) => setActiveLightboxPhoto(photo)}
        />
      )}
    </section>
  );
};
