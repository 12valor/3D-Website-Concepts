import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Plus, Minus } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does a typical build take?",
      a: "Timelines vary based on scope and site conditions. A standard residential build takes 6-8 months, while commercial fit-outs usually range from 2-4 months. We provide a detailed timeline during the planning phase."
    },
    {
      q: "Do you handle permits and local approvals?",
      a: "Yes. We manage the entire permitting process, ensuring your project complies with all local building codes and regulations before any physical work begins."
    },
    {
      q: "Can I make changes to the design during construction?",
      a: "While it's best to finalize designs early, we understand that adjustments are sometimes necessary. We use a formal change-order process to evaluate the cost and timeline impact of any mid-build changes."
    },
    {
      q: "How do you ensure material quality?",
      a: "We partner exclusively with trusted suppliers and inspect all materials upon delivery. Our project managers maintain strict quality control checkpoints throughout the entire construction phase."
    },
    {
      q: "Is there a warranty on your construction work?",
      a: "Absolutely. We offer a comprehensive 1-year workmanship warranty, plus we transfer all manufacturer warranties for materials and fixtures directly to you upon project handover."
    }
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white text-[#111111] rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-16 relative z-[35]">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-[-0.02em]">
            Common Questions
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={i} delay={0.1 + i * 0.1} y={20}>
                <div 
                  className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#d97706]/30 bg-[#F5F1E8]/50 shadow-sm' : 'border-[#111111]/10 bg-white hover:border-[#111111]/20 hover:bg-[#F5F1E8]/20'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                  >
                    <span className={`text-lg sm:text-xl font-display font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-[#d97706]' : 'text-[#111111]'}`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${isOpen ? 'bg-[#d97706] text-white rotate-180' : 'bg-[#111111]/5 text-[#111111] rotate-0'}`}>
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <div 
                    className={`px-6 sm:px-8 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-[#111111]/70 leading-relaxed text-base sm:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
