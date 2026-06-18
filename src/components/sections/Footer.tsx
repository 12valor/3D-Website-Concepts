import React from 'react';

export const Footer = () => {
  const links = ['About', 'Services', 'Testimonials', 'Pricing', 'FAQ', 'Contact'];

  return (
    <footer className="bg-[#0C0C0C] text-[#F5F5F0] py-16 sm:py-20 border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-white text-2xl font-display font-semibold tracking-[-0.04em]">
              Valor
            </span>
            <p className="text-[#F5F5F0]/70 text-sm sm:text-base max-w-sm">
              Modern construction, reliable execution, and clean project delivery.
            </p>
          </div>
          <div className="flex gap-8 md:justify-end">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Links</span>
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[#F5F5F0]/70 hover:text-[#d97706] transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="h-px bg-white/10 w-full" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#F5F5F0]/50">
            <p>Start with a plan. Build with confidence.</p>
            <p>© 2026 Valor. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
