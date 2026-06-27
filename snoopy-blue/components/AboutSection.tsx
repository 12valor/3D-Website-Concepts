"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import { Droplets, Sparkles, Heart, Gift, Clock } from "lucide-react";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (custom: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.08,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const stats = [
    { icon: Heart, label: "Skin-friendly" },
    { icon: Clock, label: "Daily use" },
    { icon: Gift, label: "Gift-ready" },
  ];

  const highlights = [
    "Gentle Daily Clean",
    "Fresh Blue Scent",
    "Cute Gift-Ready Soap",
  ];

  return (
    <section
      id="about"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 pt-16 pb-14 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-20 sm:pb-16 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-24 md:pb-20"
    >
      {/* Background decorative bubbles — subtle and small */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-16 h-40 w-40 rounded-full border border-[#30BDF7]/10" />
        <div className="absolute right-20 top-24 h-32 w-32 rounded-full border border-[#30BDF7]/10" />
        <div className="absolute bottom-16 left-1/4 h-36 w-36 rounded-full border border-[#30BDF7]/8" />
        <div className="absolute right-1/3 bottom-24 h-28 w-28 rounded-full border border-[#30BDF7]/8" />
      </div>

      <motion.div
        className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Left side: text content */}
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-[#30BDF7] sm:text-sm">
              About Snoopy Blue
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,44px)] leading-tight font-black text-[#045f94]">
              Meet Snoopy Blue Soap.
            </h2>
          </div>

          <p className="text-base font-medium leading-relaxed text-[#31566d] sm:text-lg">
            Snoopy Blue Soap is made for people who love a fresh, gentle, and
            playful bath routine. With soft scents, clean ingredients, and a cute
            blue mascot identity, every bar is designed to make everyday washing
            feel simple, refreshing, and fun.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 rounded-full border border-[#30BDF7]/25 bg-[#f0f9ff] px-4 py-2 text-sm font-semibold text-[#045f94]"
              >
                <stat.icon className="size-4 text-[#30BDF7]" strokeWidth={2.5} />
                {stat.label}
              </div>
            ))}
          </div>

          <ul className="space-y-2.5 pt-1 lg:pt-2">
            {highlights.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-base font-bold text-[#082033] sm:text-lg"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e6f7ff] text-[13px] font-extrabold text-[#30BDF7]">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: bento cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-5" style={{ minHeight: "480px" }}>
          {/* Main Mascot Card — spans 2 rows */}
          <motion.div
            className="relative col-span-1 row-span-2 flex flex-col items-center justify-start overflow-hidden rounded-[24px] bg-[#45B5F5] p-5 md:rounded-[32px] md:p-6"
            style={{ transformOrigin: "bottom" }}
            custom={0}
            variants={cardVariants}
          >
            {/* Decorative bubbles inside card */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute right-3 top-16 h-8 w-8 rounded-full border-2 border-white/20" />
              <div className="absolute left-4 top-1/3 h-6 w-6 rounded-full border-2 border-white/15" />
              <div className="absolute right-8 bottom-32 h-10 w-10 rounded-full border-2 border-white/15" />
              <div className="absolute left-8 bottom-20 h-5 w-5 rounded-full border-2 border-white/20" />
              <div className="absolute right-1/3 top-10 h-4 w-4 rounded-full bg-white/10" />
              <div className="absolute left-1/3 bottom-40 h-7 w-7 rounded-full bg-white/10" />
            </div>

            {/* Label */}
            <div className="z-10 w-full text-center mt-1 md:mt-2">
              <p className="text-[11px] font-extrabold tracking-widest text-white/95 uppercase sm:text-xs md:text-sm">
                Fresh. Soft. Gentle.
              </p>
            </div>

            {/* Mascot image — fills most of the card */}
            <div className="absolute inset-x-0 bottom-0 top-14 z-0 flex items-end justify-center px-4 pb-0 sm:top-16">
              <div className="relative h-[80%] w-full">
                <Image
                  src="/mascot.png"
                  alt="Snoopy Blue Mascot"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Soft Lather Card */}
          <motion.div
            className="relative flex flex-col items-start justify-end overflow-hidden rounded-[24px] bg-[#30BDF7] p-5 text-white md:rounded-[32px] md:p-6 lg:p-7"
            style={{ transformOrigin: "bottom" }}
            custom={1}
            variants={cardVariants}
          >
            {/* Decorative bubbles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute right-4 top-5 h-9 w-9 rounded-full border-2 border-white/20" />
              <div className="absolute right-12 top-1/2 h-6 w-6 rounded-full border-2 border-white/15" />
              <div className="absolute left-1/2 top-8 h-5 w-5 rounded-full bg-white/10" />
            </div>

            <div className="z-10 mb-4 rounded-[16px] bg-white/20 p-3 md:p-3.5 lg:mb-5">
              <Droplets className="size-7 md:size-8 lg:size-9" strokeWidth={2} />
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold leading-tight mb-1 lg:text-2xl lg:mb-2">
                Soft Lather
              </h3>
              <p className="text-sm text-white/90 leading-snug font-medium lg:text-base">
                Creamy foam for a gentle daily clean.
              </p>
            </div>
          </motion.div>

          {/* Fresh Scent Card */}
          <motion.div
            className="relative flex flex-col items-start justify-end overflow-hidden rounded-[24px] bg-[#61C8FA] p-5 text-white md:rounded-[32px] md:p-6 lg:p-7"
            style={{ transformOrigin: "bottom" }}
            custom={2}
            variants={cardVariants}
          >
            {/* Decorative bubbles / scent lines */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-5 top-6 h-8 w-8 rounded-full border-2 border-white/20" />
              <div className="absolute right-6 top-1/3 h-5 w-5 rounded-full border-2 border-white/15" />
              <div className="absolute left-1/3 top-3 h-4 w-4 rounded-full bg-white/10" />
              <div className="absolute right-10 bottom-1/3 h-6 w-6 rounded-full border-2 border-white/15" />
            </div>

            <div className="z-10 mb-4 rounded-[16px] bg-white/20 p-3 md:p-3.5 lg:mb-5">
              <Sparkles className="size-7 md:size-8 lg:size-9" strokeWidth={2} />
            </div>
            <div className="z-10">
              <h3 className="text-xl font-bold leading-tight mb-1 lg:text-2xl lg:mb-2">
                Fresh Scent
              </h3>
              <p className="text-sm text-white/90 leading-snug font-medium lg:text-base">
                A clean blue scent made for everyday freshness.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
