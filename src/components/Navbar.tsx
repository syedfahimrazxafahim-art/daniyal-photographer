import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_ASSETS, BUSINESS_INFO } from '../data/assets';
import { LiquidMetalButton } from './LiquidMetalButton';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand mark preserving client's provided logo */}
          <a
            href="#"
            className="flex items-center gap-3.5 text-[#F5F5F2] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
            aria-label="Daniyal Photography home"
          >
            {/* Provided Brand Logo Asset - Preserving original aspect ratio & appearance */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden rounded-none border border-white/20 bg-black shrink-0 flex items-center justify-center">
              <img
                src={BRAND_ASSETS.logo}
                alt="Daniyal Photography Official Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-lg sm:text-xl tracking-normal text-[#F5F5F2] font-medium leading-none">
                Daniyal Photography
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E9E99] mt-1 font-sans">
                New York
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.18em] text-[#9E9E99]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F5F5F2] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <LiquidMetalButton
                href="#contact"
                variant="primary"
                className="!py-2.5 !px-5 text-[11px]"
              >
                Inquire
              </LiquidMetalButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#F5F5F2] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-center px-8 transition-all duration-400 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-6 text-center max-w-xs mx-auto w-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-editorial text-2xl text-[#F5F5F2] hover:text-[#9E9E99] transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 flex flex-col gap-3">
            <LiquidMetalButton
              href="#contact"
              variant="primary"
              className="w-full !py-3.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inquire for Wedding
            </LiquidMetalButton>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-xs uppercase tracking-widest text-[#9E9E99] hover:text-white py-2"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
