/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Approach } from './components/Approach';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F2] font-sans selection:bg-[#F5F5F2] selection:text-[#050505]">
      {/* Refined Cinematic Custom Cursor Interaction */}
      <CustomCursor />

      {/* Refined Minimal 3-Zone Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        {/* Full-Viewport Cinematic Hero with Wave-Grid Overlay */}
        <Hero />

        {/* Photography Portfolio with 3D Perspective Carousel & Editorial Grid */}
        <Portfolio />

        {/* Editorial About Section */}
        <About />

        {/* Artistic Approach & Visual Pillars */}
        <Approach />

        {/* Verified FAQ Accordion */}
        <FAQ />

        {/* Contact & Booking Section */}
        <Contact />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer />
    </div>
  );
}
