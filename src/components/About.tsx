import React from 'react';
import { PORTFOLIO_PHOTOS } from '../data/assets';
import { LiquidMetalButton } from './LiquidMetalButton';

export const About: React.FC = () => {
  // Use high-end genuine couple portrait from the client's collection
  const featuredPhoto = PORTFOLIO_PHOTOS[0]; // Delicate editorial bridal portrait
  const secondaryPhoto = PORTFOLIO_PHOTOS[2]; // Timeless embrace couple portrait

  return (
    <section
      id="about"
      className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] border-t border-white/10"
      aria-label="About Daniyal Photography"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with 2 Genuine Photographs */}
          <div className="lg:col-span-6 relative">
            <div
              data-cursor="view"
              className="relative aspect-[4/5] bg-[#101010] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group"
            >
              <img
                src={featuredPhoto.url}
                alt="Editorial bridal portrait by Daniyal Photography"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping secondary detail image */}
            <div
              data-cursor="view"
              className="hidden sm:block absolute -bottom-10 -right-8 w-56 aspect-[3/4] bg-[#101010] border-2 border-[#0A0A0A] shadow-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={secondaryPhoto.url}
                alt="Intimate wedding portrait by Daniyal Photography"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Statement */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E9E99] font-sans mb-4">
              <span>About the Studio</span>
              <span aria-hidden="true">·</span>
              <span>New York</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F2] tracking-tight leading-[1.1] text-balance">
              Photography That Feels Like You.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#F5F5F2]/90 font-sans font-light leading-relaxed">
              Every wedding holds moments that deserve to be remembered. Daniyal Photography focuses
              on capturing the emotion, atmosphere, and meaningful details that make each celebration
              unique.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#9E9E99] font-sans font-light leading-relaxed">
              Rooted in New York, we approach wedding celebrations with an editorial eye and an
              unobtrusive presence. Our photographs celebrate natural expressions, intimate connection,
              and the delicate textures of your celebration—creating a gallery that remains timeless
              for generations.
            </p>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-6 text-left">
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#9E9E99] font-sans">
                  Location
                </span>
                <span className="font-editorial text-xl sm:text-2xl text-[#F5F5F2] mt-1 block">
                  New York
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#9E9E99] font-sans">
                  Focus
                </span>
                <span className="font-editorial text-xl sm:text-2xl text-[#F5F5F2] mt-1 block">
                  Wedding & Editorial
                </span>
              </div>
            </div>

            <div className="mt-10">
              <LiquidMetalButton
                href="#contact"
                variant="primary"
                className="!px-7 !py-3.5 text-xs"
              >
                Start a Conversation
              </LiquidMetalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
