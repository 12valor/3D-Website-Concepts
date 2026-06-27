"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import { Droplets, Sparkles } from "lucide-react";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (custom: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.08,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <motion.section 
      id="about" 
      className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side: text content */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-black uppercase tracking-widest text-[#30BDF7]">
              About Snoopy Blue
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,56px)] leading-tight font-black text-[#045f94]">
              Meet Snoopy Blue Soap.
            </h2>
          </div>
          
          <p className="text-lg font-medium leading-relaxed text-[#31566d]">
            Snoopy Blue Soap is made for people who love a fresh, gentle, and playful bath routine. With soft scents, clean ingredients, and a cute blue mascot identity, every bar is designed to make everyday washing feel simple, refreshing, and fun.
          </p>

          <ul className="space-y-4 pt-4">
            {["1. Gentle Daily Clean", "2. Fresh Blue Scent", "3. Cute Gift-Ready Soap"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg font-bold text-[#082033]">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e6f7ff] text-[#30BDF7] text-sm">
                  {i + 1}
                </span>
                {item.slice(3)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: bento cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 h-auto sm:h-[400px] md:h-[500px]">
          {/* Main Card */}
          <motion.div 
            className="col-span-2 sm:col-span-1 sm:row-span-2 rounded-3xl bg-[#45B5F5] p-6 relative min-h-[250px] sm:min-h-0 flex flex-col items-center justify-end overflow-hidden"
            style={{ transformOrigin: "bottom" }}
            custom={0}
            variants={cardVariants}
          >
            <div className="absolute inset-0 z-0 p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src="/mascot.png" 
                  alt="Snoopy Blue Mascot" 
                  fill 
                  className="object-contain object-bottom drop-shadow-md"
                />
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            className="col-span-1 rounded-3xl bg-[#30BDF7] p-6 flex flex-col items-start justify-between text-white min-h-[140px] sm:min-h-0"
            style={{ transformOrigin: "bottom" }}
            custom={1}
            variants={cardVariants}
          >
            <div className="rounded-2xl bg-white/20 p-3">
              <Droplets className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold leading-tight">Soft<br/>Lather</p>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            className="col-span-1 rounded-3xl bg-[#61C8FA] p-6 flex flex-col items-start justify-between text-white min-h-[140px] sm:min-h-0"
            style={{ transformOrigin: "bottom" }}
            custom={2}
            variants={cardVariants}
          >
            <div className="rounded-2xl bg-white/20 p-3">
              <Sparkles className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold leading-tight">Fresh<br/>Scent</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
