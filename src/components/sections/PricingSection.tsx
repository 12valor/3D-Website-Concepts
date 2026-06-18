import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Check } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      title: 'Starter Consultation',
      price: '₱4,999',
      priceSuffix: ' starting',
      desc: 'For small builds, renovations, or early project planning.',
      features: [
        'Project discussion',
        'Basic scope review',
        'Initial material direction',
        'Timeline suggestions',
      ],
      cta: 'Book Consultation',
      featured: false,
    },
    {
      title: 'Design & Build Plan',
      price: 'Custom Quote',
      priceSuffix: '',
      desc: 'For homeowners and business owners who need a clear construction roadmap.',
      features: [
        'Project planning',
        'Layout and build coordination',
        'Material guidance',
        'Cost direction',
        'Timeline preparation',
      ],
      cta: 'Request Estimate',
      featured: true,
      label: 'Most Requested',
    },
    {
      title: 'Full Project Execution',
      price: 'Custom Quote',
      priceSuffix: '',
      desc: 'For residential, commercial, or renovation projects needing full construction handling.',
      features: [
        'Site preparation',
        'Construction management',
        'Material coordination',
        'Progress updates',
        'Final walkthrough',
      ],
      cta: 'Start Full Build',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#0C0C0C] text-[#F5F5F0] rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-16 relative z-30">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-6 text-white tracking-[-0.02em]">
              Flexible project pricing.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-[#F5F5F0]/80 leading-relaxed font-body">
              Every build is different, so pricing depends on project size, scope, materials, and timeline.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <FadeIn key={plan.title} delay={0.2 + index * 0.1} y={30} className="h-full">
              <div
                className={`h-full relative flex flex-col p-8 sm:p-10 rounded-3xl bg-white/[0.02] border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.featured
                    ? 'border-[#d97706]/50 shadow-[0_0_30px_rgba(217,119,6,0.15)]'
                    : 'border-white/10'
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d97706] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                    {plan.label}
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-display font-semibold text-white">
                      {plan.price}
                    </span>
                    <span className="text-[#F5F5F0]/60 text-sm">{plan.priceSuffix}</span>
                  </div>
                  <p className="text-[#F5F5F0]/70 text-sm leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-4">Includes:</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[#F5F5F0]/80">
                        <Check className="w-5 h-5 text-[#d97706] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <PrimaryButton className="w-full mt-auto" showIcon>
                  {plan.cta}
                </PrimaryButton>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="text-center text-sm text-[#F5F5F0]/50 mt-12 sm:mt-16">
            Final pricing depends on location, materials, labor requirements, and project timeline.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
