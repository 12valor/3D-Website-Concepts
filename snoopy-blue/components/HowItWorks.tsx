"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, MessageSquare, KeyRound } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Choose your soap",
    desc: "Browse our collection of bar soaps, liquid soaps, and gift sets. Filter by scent, type, or ingredient to find your perfect match.",
    variant: "bg-[#30BDF7]",
  },
  {
    num: "02",
    icon: MessageSquare,
    title: "Lather and enjoy",
    desc: "Each bar is crafted for a rich, creamy lather that cleans gently. Wet, lather, rinse — it's that simple for a fresh daily clean.",
    variant: "bg-[#045f94]",
  },
  {
    num: "03",
    icon: KeyRound,
    title: "Reorder anytime",
    desc: "Love it? Restock in seconds. Keep your favorites on hand or try something new every month with our growing collection.",
    variant: "bg-[#45B5F5]",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current.querySelectorAll("[data-step-card]"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  return (
    <section id="how-it-works" className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Kick-line header */}
        <div className="mb-12 flex items-center justify-center gap-4 sm:mb-16">
          <div className="h-px w-12 bg-[#30BDF7]/30" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#30BDF7]">How it works</span>
          <div className="h-px w-12 bg-[#30BDF7]/30" />
        </div>

        <h2 className="mb-14 text-center text-[clamp(2rem,5vw,48px)] leading-tight font-black text-[#045f94] sm:mb-20">
          Your path to
          <br />
          <span className="text-[#30BDF7]">the right soap.</span>
        </h2>

        <div ref={container} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              data-step-card
              className="group relative"
            >
              <div className="rounded-[20px] bg-[#eaf4ff] p-7 pb-8 pt-16 sm:p-8 sm:pt-18 md:rounded-[24px]">
                {/* Faded number */}
                <span className="pointer-events-none absolute right-4 top-2 text-[100px] font-black leading-none text-[#30BDF7]/8 select-none sm:right-6 sm:text-[120px]">
                  {step.num}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-2 text-lg font-bold text-[#082033] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-[#31566d] sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Icon badge with curved notch */}
              <div className="absolute -top-3.5 left-5 z-20 sm:left-7">
                {/* Curved notch background - matches card bg */}
                <div className="absolute -left-3 -top-3 size-[52px] rounded-full bg-[#eaf4ff] sm:-left-4 sm:-top-4 sm:size-[60px]" />
                {/* Icon circle */}
                <div className={`relative flex size-12 items-center justify-center rounded-full ${step.variant} shadow-md sm:size-14`}>
                  <step.icon className="size-5 text-white sm:size-6" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
