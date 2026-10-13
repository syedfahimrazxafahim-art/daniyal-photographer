import React from 'react';
import { PORTFOLIO_PHOTOS } from '../data/assets';

export const Approach: React.FC = () => {
  // Use 3 authentic distinct captures for the three visual pillars
  const pillars = [
    {
      num: '01',
      title: 'Emotion & Presence',
      description:
        'Documenting organic laughter, quiet tears, and unprompted tenderness as they unfold naturally without artificial staging.',
      photo: PORTFOLIO_PHOTOS[5], // Laughter in motion
    },
    {
      num: '02',
      title: 'Natural Elegance',
      description:
        'Refined composition inspired by fashion editorial spreads, honoring couture tailoring, light geometry, and authentic movement.',
      photo: PORTFOLIO_PHOTOS[4], // The Regal Veil
    },
    {
      num: '03',
      title: 'Timeless Imagery',
      description:
        'True-to-life tones, rich blacks, and delicate highlight retention ensuring your images feel modern today and cherished fifty years from now.',
      photo: PORTFOLIO_PHOTOS[8], // Heirloom Adornment
    },
  ];

  return (
    <section
      id="approach"
      className="relative w-full py-28 sm:py-36 bg-[#050505] border-t border-white/10"
      aria-label="Photographic Approach"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E9E99] font-sans mb-3">
            <span>Philosophy & Craft</span>
            <span aria-hidden="true">·</span>
            <span>The Approach</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F2] tracking-tight leading-tight">
            An Unobtrusive Eye for the Unrepeatable
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="group flex flex-col justify-between bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-xs text-[#9E9E99] tracking-widest">
                    {pillar.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-[#9E9E99]">
                    Editorial Standard
                  </span>
                </div>

                <div
                  data-cursor="view"
                  className="aspect-[4/3] bg-black border border-white/10 mb-6 overflow-hidden cursor-pointer"
                >
                  <img
                    src={pillar.photo.url}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F5F5F2] leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-[#9E9E99] font-sans font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
