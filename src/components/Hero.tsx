import React from 'react';
import { ArrowDown } from 'lucide-react';
import { BRAND_ASSETS } from '../data/assets';
import { WaveGridCanvas } from './WaveGridCanvas';
import { LiquidMetalButton } from './LiquidMetalButton';
import { FlipFadeText } from './FlipFadeText';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#050505]"
      aria-label="Introduction & Hero"
    >
      {/* LAYER 1: Base Client Wedding Photograph (Full Quality, Original Aspect Ratio Respected) */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_ASSETS.heroBackground}
          alt="Cinematic luxury wedding portrait by Daniyal Photography"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-[center_35%] scale-100 transition-transform duration-1000 ease-out"
        />
      </div>

      {/* LAYER 2: Wave Grid Canvas Overlay (Transparent, Subtle, Monochrome, Non-intrusive) */}
      <WaveGridCanvas opacity={0.24} className="z-10" />

      {/* LAYER 3: Restrained Contrast Scrim (Measured gradients to protect text legibility without burying the subjects) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-20 pointer-events-none bg-radial-[at_50%_60%] from-transparent via-[#050505]/30 to-[#050505]/75"
        aria-hidden="true"
      />

      {/* LAYER 4: Content Layer */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center mt-12 sm:mt-16">
        {/* Editorial Subtitle (Clean unboxed text, no pill capsule) */}
        <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F5F5F2]/80 font-sans mb-5">
          <span>Daniyal Photography</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>New York</span>
        </div>

        {/* Primary Headline with FlipFade 3D Text Animation */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#F5F5F2] tracking-tight leading-[1.05] max-w-4xl text-balance">
          Your Story,{' '}
          <span className="italic block sm:inline font-light">
            <FlipFadeText
              words={['Beautifully Remembered.', 'Artfully Preserved.', 'Timelessly Captured.']}
              interval={3800}
            />
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#F5F5F2]/85 font-sans font-light max-w-2xl leading-relaxed text-balance">
          Wedding photography capturing the moments, emotions, and details that make your story yours.
        </p>

        {/* CTA Group with Liquid Metal Sheen Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <LiquidMetalButton
            href="#portfolio"
            variant="primary"
            className="w-full sm:w-auto !px-8 !py-4 text-xs font-medium"
          >
            Explore the Portfolio
          </LiquidMetalButton>

          <LiquidMetalButton
            href="#contact"
            variant="secondary"
            className="w-full sm:w-auto !px-8 !py-4 text-xs font-medium"
          >
            Get in Touch
          </LiquidMetalButton>
        </div>
      </div>

      {/* Ambient Scroll Down Affordance */}
      <a
        href="#portfolio"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group"
        aria-label="Scroll to Portfolio"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-sans">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
};
