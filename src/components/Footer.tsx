import React from 'react';
import { BRAND_ASSETS, BUSINESS_INFO } from '../data/assets';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-20 pb-12 text-[#9E9E99]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border border-white/20 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Daniyal Photography Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-editorial text-2xl text-[#F5F5F2] font-normal">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-sm font-sans font-light text-[#9E9E99] max-w-sm leading-relaxed">
              Fine-art and editorial wedding photography based in New York. Dedicated to the honest,
              unrepeatable moments of your celebration.
            </p>
          </div>

          {/* Direct Inquiries Column */}
          <div className="md:col-span-4">
            <span className="block text-xs uppercase tracking-[0.2em] text-[#F5F5F2] font-sans mb-4">
              Contact & Inquiries
            </span>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <span className="text-[#9E9E99]">{BUSINESS_INFO.location}</span>
              </li>
            </ul>
          </div>

          {/* Social & Connect Column */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-[#F5F5F2] font-sans mb-4">
                Follow the Work
              </span>
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <span>Facebook Portfolio</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5F5F2]/80 hover:text-white transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/40">
          <div>
            © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>New York Wedding Photography</span>
            <span aria-hidden="true">·</span>
            <span>Editorial Fine Art</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
