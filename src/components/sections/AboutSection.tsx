import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { AnimatedText } from '../ui/AnimatedText';

export const AboutSection = () => {
  const cards = [
    {
      num: '01',
      title: 'Planning',
      desc: 'Clear scope, site understanding, and practical build direction.',
    },
    {
      num: '02',
      title: 'Build Execution',
      desc: 'Organized timelines, material coordination, and consistent site progress.',
    },
    {
      num: '03',
      title: 'Final Delivery',
      desc: 'Clean finishing, walkthroughs, and a completed space ready for real use.',
    },
  ];

  return (
    <section id="about" className="relative -mt-px py-24 sm:py-32 bg-[#0C0C0C] text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="flex flex-col">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-8 text-white leading-[1.1] tracking-[-0.02em]">
                Built from the ground up.
              </h2>
            </FadeIn>
            <AnimatedText
              text="We turn empty lots, raw foundations, and unfinished spaces into modern structures designed to last. From planning to execution, every project is handled with precision, clean workmanship, and a process that keeps clients confident from the first layout to the final handover."
              className="text-lg sm:text-xl text-[#F5F5F0]/80 leading-relaxed font-body"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center gap-8 lg:gap-12">
            {cards.map((card, index) => (
              <FadeIn key={card.num} delay={0.2 + index * 0.1} y={40}>
                <div className="group border-t border-white/12 pt-6 sm:pt-8 relative transition-colors duration-500 hover:border-[#d97706]/40">
                  <div className="flex gap-6 sm:gap-8">
                    <span className="text-xl sm:text-2xl font-display text-[#d97706]">
                      {card.num}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-[#d97706]">
                        {card.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#F5F5F0]/68 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
