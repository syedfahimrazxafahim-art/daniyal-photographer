import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Send, Copy, Check } from 'lucide-react';
import { BUSINESS_INFO } from '../data/assets';
import { LiquidMetalButton } from './LiquidMetalButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateEmailBody = () => {
    return `Hello Daniyal Photography,

I would like to inquire about wedding photography coverage for our celebration.

Couple: ${formData.name || '[My Name]'} & ${formData.partnerName || '[Partner Name]'}
Contact Email: ${formData.email || '[Email]'}
Contact Phone: ${formData.phone || '[Phone]'}
Wedding Date: ${formData.date || '[Date]'}
Location/Venue: ${formData.location || 'New York'}

Vision & Details:
${formData.notes || 'Looking forward to discussing coverage, availability, and next steps.'}

Thank you!`;
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Wedding Photography Inquiry - ${formData.name || 'New Inquiry'}`
    );
    const body = encodeURIComponent(generateEmailBody());
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
    setSubmittedStatus(
      'Your default email application has opened with your inquiry details formatted. You can review and click send.'
    );
  };

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(generateEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#050505] border-t border-white/10"
      aria-label="Contact and Inquiries"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact & Location Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E9E99] font-sans mb-3">
                <span>Inquire</span>
                <span aria-hidden="true">·</span>
                <span>Get in Touch</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F2] tracking-tight leading-tight">
                Let's Tell Your Story.
              </h2>
              <p className="mt-4 text-base text-[#9E9E99] font-sans font-light leading-relaxed">
                We take on a limited number of weddings each season to ensure every celebration
                receives our undivided artistic devotion. Share your date and vision with us below.
              </p>

              {/* Verified Contact Card Items */}
              <div className="mt-10 space-y-6">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors group"
                >
                  <div className="p-3 bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest text-[#9E9E99] font-sans">
                      Direct Telephone
                    </span>
                    <span className="font-sans text-sm sm:text-base text-[#F5F5F2] font-medium group-hover:text-white">
                      {BUSINESS_INFO.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors group"
                >
                  <div className="p-3 bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest text-[#9E9E99] font-sans">
                      Booking Inquiries Email
                    </span>
                    <span className="font-sans text-sm sm:text-base text-[#F5F5F2] font-medium group-hover:text-white break-all">
                      {BUSINESS_INFO.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10">
                  <div className="p-3 bg-white/5 border border-white/10 text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest text-[#9E9E99] font-sans">
                      Base Location
                    </span>
                    <span className="font-sans text-sm sm:text-base text-[#F5F5F2] font-medium">
                      New York · Available Worldwide
                    </span>
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors group text-sm text-[#F5F5F2]"
                >
                  <span className="font-sans uppercase tracking-wider text-xs text-[#9E9E99] group-hover:text-white">
                    Official Facebook Page
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#9E9E99] group-hover:text-white" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#9E9E99] font-sans">
              <span>Response timeline: Within 24–48 hours for wedding inquiries.</span>
            </div>
          </div>

          {/* Right Column: Mailto-Connected Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 p-8 sm:p-10">
            <div className="mb-6">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F5F2] font-normal">
                Wedding Inquiry Draft
              </h3>
              <p className="text-xs text-[#9E9E99] font-sans mt-1">
                Fill in your celebration details. Submitting opens a pre-composed email draft in your email client addressed to{' '}
                <strong className="text-white font-normal">{BUSINESS_INFO.email}</strong>.
              </p>
            </div>

            <form onSubmit={handleMailtoSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partnerName"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Partner's Name
                  </label>
                  <input
                    type="text"
                    id="partnerName"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleChange}
                    placeholder="e.g. Julian Hayes"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Wedding Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                  >
                    Venue / City
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Brooklyn Botanic Garden, NY"
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-xs uppercase tracking-wider text-[#9E9E99] font-sans mb-2"
                >
                  Tell Us About Your Celebration & Vision
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share details regarding your celebration, schedule, guest count, or any specific moments you hold dear..."
                  className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-[#F5F5F2] placeholder-white/20 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {submittedStatus && (
                <div className="p-4 bg-white/5 border border-white/20 text-xs text-[#F5F5F2] leading-relaxed">
                  {submittedStatus}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black hover:bg-[#F5F5F2] text-xs font-sans uppercase tracking-wider font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Open in Email Client</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent border border-white/20 hover:border-white/50 text-[#F5F5F2] text-xs font-sans uppercase tracking-wider transition-colors"
                  title="Copy drafted text to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
