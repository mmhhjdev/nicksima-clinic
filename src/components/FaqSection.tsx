import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clinicData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // تزریق پویای اسکیمای سوالات متداول (FAQ Schema) برای گوگل
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'clinic-faq-schema';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('clinic-faq-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="font-header">پاسخ به پرسش‌ها</span>
          </div>
          <h2 className="font-header text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            سوالات متداول مراجعین
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-2">
            پاسخ به سوالات پرتکرار درباره نوبت‌دهی و خدمات درمانی کلینیک پری سیما
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all text-right shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-header text-xs sm:text-sm font-bold text-[#0F172A]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0284C7] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="font-sans px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;