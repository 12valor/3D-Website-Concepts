"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Droplets,
  Sparkles,
  Gift,
  Shield,
  Leaf,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    gsap.fromTo(
      container.current,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}

function BenefitsSection() {
  const container = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Heart,
      title: "Gentle on Skin",
      desc: "Soft enough for sensitive skin. Made to cleanse without drying or irritation.",
      color: "bg-[#30BDF7]",
    },
    {
      icon: Droplets,
      title: "Fresh Daily Scent",
      desc: "A light blue fragrance that stays fresh all day without being overpowering.",
      color: "bg-[#45B5F5]",
    },
    {
      icon: Shield,
      title: "Handmade Quality",
      desc: "Each bar is carefully crafted in small batches for consistent quality and care.",
      color: "bg-[#61C8FA]",
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      desc: "No harsh chemicals. Just simple, skin-safe ingredients you can trust.",
      color: "bg-[#45B5F5]",
    },
    {
      icon: Sparkles,
      title: "Moisturizing Formula",
      desc: "Leaves skin feeling soft and hydrated after every wash.",
      color: "bg-[#30BDF7]",
    },
    {
      icon: Gift,
      title: "Perfect for Gifting",
      desc: "Cute packaging and a lovable mascot make it a ready-to-give gift.",
      color: "bg-[#61C8FA]",
    },
  ];

  useGSAP(() => {
    if (!container.current) return;

    const cards = container.current.querySelectorAll("[data-bento-card]");

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
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
    <section
      id="benefits"
      className="relative z-10 bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 overflow-hidden"
    >
      {/* Background decorative bubbles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 top-20 h-40 w-40 rounded-full border border-[#30BDF7]/10" />
        <div className="absolute -left-10 bottom-32 h-32 w-32 rounded-full border border-[#30BDF7]/8" />
        <div className="absolute right-1/4 bottom-16 h-24 w-24 rounded-full border border-[#30BDF7]/8" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <FadeIn>
          <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-[#30BDF7] sm:text-sm">
            Why choose us
          </p>
          <h2 className="mb-4 text-center text-[clamp(2rem,5vw,56px)] leading-none font-black text-[#045f94]">
            Soap Benefits
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-base font-medium text-[#31566d] sm:mb-20 sm:text-lg">
            Every bar of Snoopy Blue Soap is designed to bring freshness, gentleness, and a little joy to your daily routine.
          </p>
        </FadeIn>

        <div ref={container} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              data-bento-card
              className={`group relative overflow-hidden rounded-[20px] ${b.color} min-h-[220px] p-6 transition-transform duration-200 hover:scale-[1.02] sm:p-7 md:rounded-[28px] md:min-h-[250px] lg:p-8`}
            >
              {/* Decorative bubble */}
              <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-white/15" />
              <div className="pointer-events-none absolute bottom-8 right-6 h-14 w-14 rounded-full border-2 border-white/10" />

              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="mb-auto rounded-[14px] bg-white/20 p-2.5 sm:p-3">
                  <b.icon className="size-6 text-white sm:size-7" strokeWidth={2} />
                </div>
                <div className="mt-6">
                  <h3 className="mb-1.5 text-xl font-bold text-white sm:text-2xl">
                    {b.title}
                  </h3>
                  <p className="text-sm font-medium leading-snug text-white/85 sm:text-base">
                    {b.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const products = [
    { name: "Blue Fresh Bar", desc: "Refreshing everyday soap with a clean cool scent.", price: "$12.00" },
    { name: "Milky Cloud Bar", desc: "Soft moisturizing soap for a gentle bath routine.", price: "$14.00" },
    { name: "Citrus Splash Bar", desc: "Bright and fresh soap with a light citrus scent.", price: "$12.00" },
    { name: "Calm Lavender Bar", desc: "Relaxing soap for night routines and self-care.", price: "$14.00" },
  ];

  return (
    <section id="products" className="bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-14 text-center text-[clamp(2.5rem,8vw,80px)] leading-none font-black uppercase text-[#045f94] sm:mb-20">
          Collection
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {products.map((product, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <Card className="overflow-hidden rounded-[24px] border-none bg-white shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="mb-5 aspect-square rounded-[16px] bg-[#e6f7ff]" />
                <h3 className="mb-2 text-xl font-bold text-[#082033]">{product.name}</h3>
                <p className="mb-4 text-sm text-[#31566d]">{product.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-[#30BDF7]">{product.price}</span>
                  <Button className="rounded-full bg-[#045f94] px-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#034d78]">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function IngredientsSection() {
  const points = [
    "Gentle cleansing",
    "Skin-friendly formula",
    "Soft creamy lather",
    "Simple clean ingredients",
    "Refreshing scent",
    "Cute gift-ready branding",
  ];
  return (
    <section id="ingredients" className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <FadeIn>
            <h2 className="mb-8 text-[clamp(2rem,6vw,60px)] leading-tight font-black text-[#045f94]">
              Made for everyday freshness.
            </h2>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-medium text-[#082033]">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e6f7ff] text-[#30BDF7]">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <div className="aspect-[4/3] w-full rounded-[32px] bg-[#e6f7ff] md:aspect-square" />
        </FadeIn>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const reviews = [
    "“Smells clean and feels soft on the skin.”",
    "“The packaging is cute and perfect for gifting.”",
    "“Simple, fresh, and gentle enough for daily use.”",
  ];
  return (
    <section id="reviews" className="bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-14 text-center text-[clamp(2.5rem,6vw,60px)] leading-tight font-black text-[#045f94] sm:mb-20">
          Loved for its fresh and gentle feel.
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.map((review, i) => (
          <FadeIn key={i} delay={i * 0.1} className="h-full">
            <Card className="h-full rounded-[24px] border-sky-100 bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="mb-4 flex text-[#30BDF7]">★★★★★</div>
                <p className="text-lg font-medium leading-relaxed text-[#082033]">{review}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="bg-white px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-4xl rounded-[40px] bg-[#30bdf7] px-6 py-16 text-center text-white sm:px-12 sm:py-20 md:rounded-[60px] md:px-20 md:py-28">
        <FadeIn>
          <h2 className="mb-6 text-[clamp(2.5rem,6vw,60px)] leading-tight font-black">
            Ready to make your bath routine fresher?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
            Explore the Snoopy Blue Soap collection and find your new everyday favorite.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#products"
              className="inline-flex h-auto w-full items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#045f94] transition hover:-translate-y-0.5 hover:bg-[#e6f7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto md:px-10 md:py-4 md:text-base"
            >
              Shop Collection
            </Link>
            <Link
              href="mailto:hello@snoopyblue.com"
              className="inline-flex h-auto w-full items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#045f94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto md:px-10 md:py-4 md:text-base"
            >
              Contact Us
            </Link>
          </div>
        </FadeIn>
      </div>

      <footer className="mx-auto mt-20 max-w-6xl border-t border-sky-100 pt-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-xl font-black text-[#045f94]">Snoopy Blue Soap</div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-[#31566d]">
            <Link href="#home" className="hover:text-[#30BDF7]">Home</Link>
            <Link href="#benefits" className="hover:text-[#30BDF7]">Benefits</Link>
            <Link href="#products" className="hover:text-[#30BDF7]">Products</Link>
            <Link href="#reviews" className="hover:text-[#30BDF7]">Reviews</Link>
            <Link href="#contact" className="hover:text-[#30BDF7]">Contact</Link>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default function SoapSections() {
  return (
    <>
      <BenefitsSection />
      <ProductsSection />
      <IngredientsSection />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
