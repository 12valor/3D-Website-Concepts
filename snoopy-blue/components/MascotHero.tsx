"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Droplets, Sparkles, Shield, Heart, Gift, Leaf, Star, Sun } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const tags = [
  { icon: Droplets, label: "Gentle Daily Clean" },
  { icon: Sparkles, label: "Fresh Blue Scent" },
  { icon: Shield, label: "Skin-Friendly" },
  { icon: Heart, label: "Made with Love" },
  { icon: Gift, label: "Gift-Ready" },
  { icon: Leaf, label: "Clean Ingredients" },
  { icon: Star, label: "Premium Quality" },
  { icon: Sun, label: "Bright & Cheerful" },
];

const marqueeImages = [
  { src: "/images/bar-soap-1.jpg", label: "Bar Soap" },
  { src: "/images/liquid-soap.jpg", label: "Liquid Soap" },
  { src: "/images/gift-set.jpg", label: "Gift Set" },
];

export default function MascotHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "<0.1"
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "<0.15"
      )
      .fromTo(
        ".hero-marquee",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "<0.2"
      )
      .fromTo(
        ".hero-tags",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "<0.15"
      );
  }, { scope: sectionRef });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#e6f7ff] to-[#f4fbff] pb-12 pt-24 sm:pb-16 sm:pt-28 md:pb-20 md:pt-32"
    >
      {/* Background decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#30BDF7]/10" />
        <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full border border-[#30BDF7]/8" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full border border-[#30BDF7]/8" />
      </div>

      <div ref={heroRef} className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Badge */}
        <div className="hero-badge mb-6 flex justify-center opacity-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#30BDF7]/20 bg-white/60 px-4 py-2 text-xs font-semibold text-[#045f94] backdrop-blur-sm sm:text-sm">
            <span>🛁</span>
            <span className="h-4 w-px bg-[#30BDF7]/30" />
            <span>Find Your Freshness</span>
            <span className="h-4 w-px bg-[#30BDF7]/30" />
            <span>Philippines</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title mb-6 text-center text-[clamp(3rem,10vw,80px)] leading-none font-black text-[#045f94] opacity-0">
          Snoopy Blue
        </h1>

        {/* Description */}
        <p className="hero-desc mx-auto mb-10 max-w-2xl text-center text-base font-medium leading-relaxed text-[#31566d] opacity-0 sm:text-lg">
          A fresh, gentle, and playful soap brand made for everyday cleaning.
          Soft scents, clean ingredients, and a lovable blue mascot — every bar
          is designed to make washing feel simple, refreshing, and fun.
        </p>

        {/* Image Marquee */}
        <div className="hero-marquee mb-10 opacity-0">
          <div className="overflow-hidden rounded-2xl">
            <div className="flex animate-marquee gap-4">
              {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((img, i) => (
                <div
                  key={i}
                  className="relative h-40 w-60 shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-72 md:h-56 md:w-80"
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/30 to-transparent p-3">
                    <span className="text-sm font-bold text-white">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Tags Marquee */}
        <div className="hero-tags opacity-0">
          <div className="overflow-hidden">
            <div className="flex animate-marquee-fast gap-3">
              {[...tags, ...tags, ...tags].map((tag, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[#30BDF7]/20 bg-white/70 px-4 py-2.5 text-sm font-medium text-[#045f94] backdrop-blur-sm"
                >
                  <tag.icon className="size-4 text-[#30BDF7]" strokeWidth={2} />
                  <span>{tag.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
