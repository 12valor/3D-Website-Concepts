import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';

export const ServicesSection = () => {
  const services = [
    {
      num: '01',
      title: 'Residential Construction',
      desc: 'Modern homes, renovations, and extensions built with careful planning and durable materials.',
      image: '/images/services/residential-construction.png',
    },
    {
      num: '02',
      title: 'Commercial Fit-Outs',
      desc: 'Functional and polished spaces for offices, shops, studios, cafés, and small businesses.',
      image: '/images/services/commercial-fit-outs.png',
    },
    {
      num: '03',
      title: 'Design & Build Coordination',
      desc: 'A streamlined process connecting design direction, budgeting, materials, and site work.',
      image: '/images/services/design-build-coordination.png',
    },
    {
      num: '04',
      title: 'Renovation & Improvements',
      desc: 'Upgrades, repairs, expansions, and finishing improvements for existing spaces.',
      image: '/images/services/renovation-improvements.png',
    },
    {
      num: '05',
      title: 'Project Consultation',
      desc: 'Practical guidance for estimating, planning, and preparing a construction project.',
      image: '/images/services/project-consultation.png',
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F5F1E8] text-[#111111] rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-16 relative z-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="mb-16 sm:mb-24 max-w-3xl">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-[-0.02em]">
              Services
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-[#111111]/70 leading-relaxed font-body">
              From early planning to final turnover, we provide construction services built around clarity, durability, and clean execution.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-start">
          <div className="flex flex-col border-t border-[#111111]/10">
            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <FadeIn key={service.num} delay={index * 0.05} y={20}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group w-full border-b border-[#111111]/10 py-7 sm:py-9 text-left transition-colors duration-300 ${
                      isActive ? 'bg-[#111111]/[0.035]' : 'hover:bg-[#111111]/[0.02]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
                      <span
                        className={`text-2xl sm:text-3xl font-display font-semibold transition-colors duration-300 ${
                          isActive ? 'text-[#d97706]' : 'text-[#111111]/30 group-hover:text-[#d97706]/80'
                        }`}
                      >
                        {service.num}
                      </span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-4 md:gap-10">
                        <h3
                          className={`text-2xl sm:text-3xl font-display font-semibold transition-colors duration-300 ${
                            isActive ? 'text-[#d97706]' : 'text-[#111111] group-hover:text-[#d97706]'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.15} y={24} className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#111111] min-h-[360px] sm:min-h-[480px] lg:min-h-[620px] shadow-2xl shadow-[#111111]/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.image}
                  src={activeService.image}
                  alt={`${activeService.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, x: 36, scale: 1.04 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/12 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-sm font-semibold text-[#d97706]">{activeService.num}</span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-display font-semibold text-white">
                      {activeService.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
