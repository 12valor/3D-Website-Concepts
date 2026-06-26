"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const cards = [
  { id: 1, title: "Analytics", position: "left", delay: 0.1 },
  { id: 2, title: "System Status", position: "right", delay: 0.2 },
  { id: 3, title: "Clean UI", position: "left", delay: 0.3 },
  { id: 4, title: "Fast Setup", position: "right", delay: 0.4 },
  { id: 5, title: "Mobile Ready", position: "left", delay: 0.5 },
  { id: 6, title: "Business Dashboard", position: "right", delay: 0.6 },
];

export default function MascotHero() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Animation variants
  const mascotVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
      y: prefersReducedMotion ? 0 : [0, -15, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const cardVariants = {
    initial: (custom: { position: string; delay: number }) => ({
      opacity: 0,
      x: custom.position === "left" ? -50 : 50,
      y: 20,
    }),
    animate: (custom: { position: string; delay: number }) => ({
      opacity: 1,
      x: 0,
      y: prefersReducedMotion ? 0 : [0, -10, 0],
      transition: {
        opacity: { duration: 0.8, delay: custom.delay },
        x: { duration: 0.8, delay: custom.delay, ease: "easeOut" },
        y: {
          duration: 3,
          delay: custom.delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-sky-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/blue-background.png"
          alt="Blue Background"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-sky-900/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col md:flex-row items-center justify-center min-h-screen">
        {/* Left Cards */}
        <div className="hidden md:flex flex-col gap-6 w-1/3 items-end pr-4 lg:pr-12">
          {cards
            .filter((c) => c.position === "left")
            .map((card) => (
              <motion.div
                key={card.id}
                custom={{ position: card.position, delay: card.delay }}
                initial="initial"
                animate={mounted ? "animate" : "initial"}
                variants={cardVariants}
                className="w-full max-w-[240px] p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,120,255,0.1)] transform-gpu hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(0,120,255,0.2)] transition-all duration-300"
              >
                <div className="h-1.5 w-8 bg-sky-500 rounded-full mb-3 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
                <h3 className="text-slate-800 font-semibold text-lg tracking-wide">
                  {card.title}
                </h3>
                <div className="mt-3 h-1 w-full bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-400 rounded-full"
                    style={{ width: `${Math.random() * 40 + 40}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Mascot Center */}
        <div className="relative w-full md:w-1/3 flex justify-center items-center mt-10 md:mt-0 z-20">
          {/* Soft Glow Behind Mascot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-sky-100/60 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

          <motion.div
            initial="initial"
            animate={mounted ? "animate" : "initial"}
            variants={mascotVariants}
            className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]"
          >
            <Image
              src="/mascot.png"
              alt="Mascot"
              fill
              priority
              className="object-contain drop-shadow-[0_15px_25px_rgba(0,50,150,0.3)]"
            />
          </motion.div>
        </div>

        {/* Right Cards */}
        <div className="hidden md:flex flex-col gap-6 w-1/3 items-start pl-4 lg:pl-12 mt-10 md:mt-0">
          {cards
            .filter((c) => c.position === "right")
            .map((card) => (
              <motion.div
                key={card.id}
                custom={{ position: card.position, delay: card.delay }}
                initial="initial"
                animate={mounted ? "animate" : "initial"}
                variants={cardVariants}
                className="w-full max-w-[240px] p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,120,255,0.1)] transform-gpu hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(0,120,255,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center border border-sky-200">
                    <div className="h-3 w-3 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                  </div>
                  <h3 className="text-slate-800 font-semibold text-lg">
                    {card.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <div className="h-1.5 flex-1 bg-white/50 rounded-full"></div>
                  <div className="h-1.5 w-6 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Mobile Cards (Stacked below) */}
        <div className="md:hidden flex flex-col w-full gap-4 mt-12 px-4 z-10 pb-10">
          {cards.map((card) => (
            <motion.div
              key={`mobile-${card.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5 }}
              className="w-full p-4 rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,120,255,0.1)] flex items-center justify-between"
            >
              <h3 className="text-slate-800 font-semibold">{card.title}</h3>
              <div className="h-2.5 w-2.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
