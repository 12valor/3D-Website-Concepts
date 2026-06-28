"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Sparkles, Cloud, Sun, Moon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const products = [
  {
    num: "01",
    icon: Sparkles,
    badge: "Best Seller",
    name: "Blue Fresh Bar",
    desc: "Refreshing everyday soap with a clean cool scent.",
    price: "$12.00",
    variant: "bg-[#30BDF7]",
    image: "/images/product-1.jpg",
  },
  {
    num: "02",
    icon: Cloud,
    badge: "New",
    name: "Milky Cloud Bar",
    desc: "Soft moisturizing soap for a gentle bath routine.",
    price: "$14.00",
    variant: "bg-[#45B5F5]",
    image: "/images/product-2.jpg",
  },
  {
    num: "03",
    icon: Sun,
    badge: "Popular",
    name: "Citrus Splash Bar",
    desc: "Bright and fresh soap with a light citrus scent.",
    price: "$12.00",
    variant: "bg-[#61C8FA]",
    image: "/images/product-3.jpg",
  },
  {
    num: "04",
    icon: Moon,
    badge: "Limited",
    name: "Calm Lavender Bar",
    desc: "Relaxing soap for night routines and self-care.",
    price: "$14.00",
    variant: "bg-[#045f94]",
    image: "/images/product-4.jpg",
  },
];

export default function FeaturedProducts() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current.querySelectorAll("[data-product-card]"),
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
    <section className="bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Kick-line header */}
        <div className="mb-12 flex items-center justify-center gap-4 sm:mb-16">
          <div className="h-px w-12 bg-[#30BDF7]/30" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#30BDF7]">New on Snoopy Blue</span>
          <div className="h-px w-12 bg-[#30BDF7]/30" />
        </div>

        <h2 className="mb-4 text-center text-[clamp(2rem,5vw,48px)] leading-tight font-black text-[#045f94]">
          The latest soaps
          <br />
          <span className="text-[#30BDF7]">listed on Snoopy Blue.</span>
        </h2>

        <div ref={container} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-7">
          {products.map((product, i) => (
            <div
              key={i}
              data-product-card
              className="group relative"
            >
              <div className="overflow-hidden rounded-[20px] bg-[#eaf4ff] transition-transform duration-200 hover:scale-[1.02] md:rounded-[24px]">
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Badge on image */}
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#045f94] backdrop-blur-sm">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="relative p-6 pb-7 pt-5 sm:p-7">
                  {/* Faded number */}
                  <span className="pointer-events-none absolute right-3 top-1 text-[80px] font-black leading-none text-[#30BDF7]/8 select-none sm:right-4 sm:text-[100px]">
                    {product.num}
                  </span>

                  <div className="relative z-10">
                    <h3 className="mb-1 text-base font-bold text-[#082033] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium leading-snug text-[#31566d]">
                      {product.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#30BDF7]">{product.price}</span>
                      <button className="rounded-full bg-[#045f94] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#034d78]">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Icon badge with curved notch */}
              <div className="absolute -top-3.5 left-5 z-20 sm:left-6">
                {/* Curved notch background - matches card bg */}
                <div className="absolute -left-3 -top-3 size-[48px] rounded-full bg-[#eaf4ff] sm:-left-3.5 sm:-top-3.5 sm:size-[54px]" />
                {/* Icon circle */}
                <div className={`relative flex size-12 items-center justify-center rounded-full ${product.variant} shadow-md`}>
                  <product.icon className="size-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
