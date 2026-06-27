"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const services = [
  {
    number: "01",
    name: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
  {
    number: "02",
    name: "UI/UX Design",
    description:
      "Creating simple, responsive, and user-friendly interfaces that feel polished across desktop and mobile.",
  },
  {
    number: "03",
    name: "3D-Inspired Visuals",
    description:
      "Building visual concepts that use depth, glassmorphism, mascot branding, and modern motion to make a page stand out.",
  },
  {
    number: "04",
    name: "Branding",
    description:
      "Crafting cohesive visual identities, from logos and colors to full brand systems that communicate a memorable presence.",
  },
  {
    number: "05",
    name: "Motion Design",
    description:
      "Adding subtle animations and motion details that make digital experiences feel smoother, more premium, and more alive.",
  },
];

function multiplyImages(images: string[]) {
  return [...images, ...images, ...images];
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <Link
      id="contact"
      href="mailto:hello@snoopyblue.com"
      className="inline-flex rounded-full border border-white/90 bg-[#30BDF7] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-[0_18px_45px_rgba(48,189,247,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(48,189,247,0.36)] focus:outline-none focus:ring-2 focus:ring-sky-300/80 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      Contact Me
    </Link>
  );
}

function MarqueeRow({
  images,
  transform,
}: {
  images: string[];
  transform: string;
}) {
  return (
    <div
      className="flex gap-3 will-change-transform"
      style={{ transform, willChange: "transform" }}
    >
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="h-[206px] w-[316px] shrink-0 rounded-[28px] border border-sky-200/80 bg-white p-2 shadow-[0_18px_55px_rgba(48,189,247,0.18)] sm:h-[246px] sm:w-[374px] lg:h-[286px] lg:w-[436px]"
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            width={420}
            height={270}
            className="h-full w-full rounded-[20px] object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = multiplyImages(marqueeImages.slice(0, 11));
  const rowTwo = multiplyImages(marqueeImages.slice(11));

  useEffect(() => {
    let frame = 0;

    const updateOffset = () => {
      if (!sectionRef.current) {
        return;
      }

      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Project preview marquee"
      className="overflow-hidden bg-[#f4fbff] pt-24 pb-14 sm:pt-32 md:pt-40"
    >
      <div className="mb-10 px-5 text-center sm:px-8">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-widest text-[#30BDF7]">
            Bright work, soft motion
          </p>
        </FadeIn>
      </div>
      <div className="flex flex-col gap-3">
        <MarqueeRow
          images={rowOne}
          transform={`translateX(${offset - 200}px)`}
        />
        <MarqueeRow
          images={rowTwo}
          transform={`translateX(${-1 * (offset - 200)}px)`}
        />
      </div>
    </section>
  );
}

function AnimatedWord({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.18);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.8", "end 0.2"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={target}
      className="mx-auto flex max-w-[680px] flex-wrap justify-center gap-x-1.5 text-center text-[clamp(1rem,2vw,1.35rem)] leading-relaxed font-medium text-[#0b3552]"
    >
      {words.map((word, index) => (
        <AnimatedWord
          key={`${word}-${index}`}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        >
          {word}
        </AnimatedWord>
      ))}
    </p>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="pointer-events-none absolute left-[7%] top-[18%] h-32 w-32 rounded-full bg-[#30BDF7]/16 blur-2xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-[16%] h-48 w-48 rounded-full bg-[#b8eaff]/70 blur-3xl" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-[36px] border border-sky-100 bg-white px-5 py-14 shadow-[0_25px_80px_rgba(48,189,247,0.14)] sm:px-8 sm:py-16 md:rounded-[56px] md:px-12 md:py-20">
        <FadeIn>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,150px)] leading-none font-black tracking-tight uppercase">
            About Snoopy Blue
          </h2>
        </FadeIn>
        <AnimatedText text="Snoopy Blue is a playful 3D-inspired digital mascot concept built for clean web experiences, modern interfaces, and memorable brand visuals. With a focus on clarity, motion, and personality, this landing page turns a simple mascot into a strong visual identity." />
        <FadeIn delay={0.15} y={18}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="features"
      className="rounded-t-[40px] bg-[#f4fbff] px-5 py-20 text-[#082033] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,150px)] leading-none font-black uppercase text-[#045f94] sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-sky-100 bg-white shadow-[0_24px_80px_rgba(48,189,247,0.16)] sm:rounded-[44px]">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1}>
            <article className="grid gap-6 border-t border-sky-100 px-5 py-8 first:border-t-0 sm:gap-8 sm:px-8 sm:py-10 md:grid-cols-[0.34fr_1fr] md:px-10 md:py-12">
              <div className="text-[clamp(3rem,10vw,128px)] leading-none font-black text-[#30BDF7]">
                {service.number}
              </div>
              <div className="flex flex-col gap-4 md:pt-4">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#082033]">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] leading-relaxed font-light text-[#31566d]">
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function BentoCard({
  className = "",
  index = 0,
}: {
  className?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      style={{ transformOrigin: "bottom" }}
      className={`rounded-[16px] md:rounded-[24px] bg-[#45B5F5] ${className}`}
    />
  );
}

function ProjectsSection() {
  const cards = [
    "lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-1 md:col-span-1 md:row-span-1",
    "lg:col-start-1 lg:col-span-3 lg:row-start-2 lg:row-span-1 md:col-span-1 md:row-span-1",
    "lg:col-start-4 lg:col-span-3 lg:row-start-1 lg:row-span-2 md:col-span-1 md:row-span-2",
    "lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-1 md:col-span-2 md:row-span-1",
    "lg:col-start-7 lg:col-span-3 lg:row-start-2 lg:row-span-1 md:col-span-1 md:row-span-1",
    "lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-1 md:col-span-1 md:row-span-1",
  ];

  return (
    <section
      id="gallery"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-14 text-center text-[clamp(3rem,8vw,100px)] leading-none font-black uppercase text-[#045f94] sm:mb-20">
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[240px] md:auto-rows-[280px] lg:auto-rows-[320px] gap-4 md:gap-6 lg:gap-8 md:grid-flow-row-dense">
          {cards.map((className, index) => (
            <BentoCard key={index} index={index} className={className} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PortfolioSections() {
  return (
    <>
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </>
  );
}
