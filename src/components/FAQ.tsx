import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BUSINESS_INFO } from '../data/assets';

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqData: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Where is Daniyal Photography based?',
      answer: (
        <p>
          Daniyal Photography is based in <strong className="text-white font-normal">New York</strong>.
          We provide wedding photography coverage across New York and are available for travel to
          destination celebrations upon inquiry.
        </p>
      ),
    },
    {
      id: 'faq-2',
      question: 'How do I inquire about availability for my wedding date?',
      answer: (
        <p>
          You can reach out directly via email at{' '}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="text-white underline underline-offset-4 hover:text-[#9E9E99] transition-colors"
          >
            {BUSINESS_INFO.email}
          </a>{' '}
          or call{' '}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="text-white underline underline-offset-4 hover:text-[#9E9E99] transition-colors"
          >
            {BUSINESS_INFO.phone}
          </a>
          . We will respond promptly to discuss your date, venue location, and vision.
        </p>
      ),
    },
    {
      id: 'faq-3',
      question: 'How can I view more of Daniyal Photography’s portfolio?',
      answer: (
        <p>
          In addition to the curated portfolio showcase on this website, you can explore recent
          works, wedding highlights, and updates on our official{' '}
          <a
            href={BUSINESS_INFO.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-[#9E9E99] transition-colors"
          >
            Facebook Page
          </a>
          .
        </p>
      ),
    },
    {
      id: 'faq-4',
      question: 'What is the photographic style of Daniyal Photography?',
      answer: (
        <p>
          Our work blends fine-art editorial elegance with natural, candid storytelling. We focus on
          genuine emotion, rich cinematic contrast, and honest moments so your gallery reflects your
          authentic connection.
        </p>
      ),
    },
    {
      id: 'faq-5',
      question: 'How can we discuss custom coverage or schedule a consultation?',
      answer: (
        <p>
          Every wedding celebration has its own unique timeline and needs. Please reach out to us
          directly via phone or email to set up an introductory consultation where we can tailor our
          coverage to your celebration.
        </p>
      ),
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] border-t border-white/10"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9E9E99] font-sans mb-3">
            <span>Inquiries & Details</span>
            <span aria-hidden="true">·</span>
            <span>FAQ</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#F5F5F2] tracking-tight">
            Common Inquiries
          </h2>
          <p className="mt-3 text-sm text-[#9E9E99] font-sans font-light">
            Essential information regarding booking and working with Daniyal Photography in New York.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="transition-colors">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-btn-${item.id}`}
                    className="w-full py-6 sm:py-7 flex items-center justify-between text-left gap-4 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    <span className="font-editorial text-xl sm:text-2xl text-[#F5F5F2] font-normal group-hover:text-white transition-colors">
                      {item.question}
                    </span>
                    <span
                      className={`p-2 rounded-none border border-white/10 text-[#9E9E99] group-hover:text-white transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-white/5 text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden text-sm sm:text-base text-[#9E9E99] font-sans font-light leading-relaxed pr-6 sm:pr-12">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
