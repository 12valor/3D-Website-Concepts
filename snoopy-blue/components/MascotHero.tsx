"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export default function MascotHero() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Staggered Entrance Animations
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const sceneVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-sky-50 pt-24 pb-12">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/blue-background.png"
          alt="Blue Background"
          fill
          priority
          className="object-cover opacity-80 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[4px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 via-transparent to-sky-50/90"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        
        {/* Top Text Block */}
        <motion.div 
          className="w-full max-w-3xl flex flex-col items-center text-center z-30 relative"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-sky-200 shadow-sm backdrop-blur-md mb-6">
            <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
            <span className="text-xs font-bold text-sky-800 tracking-widest uppercase">MVP Website System</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-5 drop-shadow-sm">
            Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">business system</span> faster.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
            A clean, responsive MVP section built with modern UI, startup-style layout, and polished product visuals.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-[0_10px_20px_rgba(14,165,233,0.3)] transition-all duration-300 hover:-translate-y-0.5">
              View Demo
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white/60 hover:bg-white text-slate-800 font-semibold border border-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5">
              Start Building
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Scene Wrapper */}
        <motion.div 
          className="relative w-full flex justify-center items-center mt-12 md:mt-20 z-20"
          style={{ perspective: "1200px" }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          {/* Depth Orbs (Background Ambient Light) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/90 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-200/50 rounded-full blur-[140px] pointer-events-none -z-20"></div>

          {/* Center Mascot */}
          <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] lg:w-[560px] lg:h-[560px] z-30 transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/mascot.png"
              alt="Mascot"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,40,100,0.25)]"
            />
          </div>

          {/* 3D Holographic Cards Container (Desktop Only for extreme 3D) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Top-Left: Analytics */}
            <div 
              className="absolute top-[10%] left-[10%] lg:left-[15%] w-56 p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_15px_35px_rgba(0,100,250,0.15)] pointer-events-auto transition-transform duration-500 hover:translate-y-[-5px]"
              style={{ transform: "rotateY(10deg) rotateX(5deg) translateZ(-40px)" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Analytics</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">+14%</span>
                </div>
                <div className="text-3xl font-extrabold text-slate-800 mb-3 drop-shadow-sm">24.5k</div>
                <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30">
                  <path d="M0,30 L20,15 L40,25 L60,5 L80,15 L100,0" fill="none" stroke="url(#skyGradient2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_3px_5px_rgba(56,189,248,0.4)]" />
                  <defs>
                    <linearGradient id="skyGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Top-Right: System Status */}
            <div 
              className="absolute top-[15%] right-[10%] lg:right-[15%] w-56 p-5 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 shadow-[0_20px_40px_rgba(0,100,250,0.12)] pointer-events-auto transition-transform duration-500 hover:translate-y-[-5px]"
              style={{ transform: "rotateY(-10deg) rotateX(8deg) translateZ(20px)" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-white/50 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">System Status</div>
                <div className="space-y-3">
                  {[
                    { name: "API Servers", color: "bg-emerald-500" },
                    { name: "Database", color: "bg-emerald-500" },
                    { name: "Storage", color: "bg-sky-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">OK</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm border border-white/50`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom-Left: MVP Setup */}
            <div 
              className="absolute bottom-[20%] left-[5%] lg:left-[10%] w-64 p-6 rounded-2xl bg-white/60 backdrop-blur-2xl border border-white shadow-[0_25px_50px_rgba(0,100,250,0.2)] pointer-events-auto transition-transform duration-500 hover:translate-y-[-5px]"
              style={{ transform: "rotateY(15deg) rotateX(-8deg) translateZ(60px)" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/60 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shadow-inner">
                      <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">MVP Setup</span>
                  </div>
                  <span className="text-lg font-extrabold text-sky-600">85%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden shadow-inner border border-black/5">
                  <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>

            {/* Bottom-Right: Feature Summary */}
            <div 
              className="absolute bottom-[10%] right-[5%] lg:right-[10%] w-60 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_15px_30px_rgba(0,100,250,0.1)] pointer-events-auto transition-transform duration-500 hover:translate-y-[-5px]"
              style={{ transform: "rotateY(-12deg) rotateX(-5deg) translateZ(-30px)" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-white/40 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Performance</div>
                    <div className="text-xs text-slate-500 font-medium">Lightning Fast</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Optimized for speed, SEO, and massive scale out of the box.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Mobile Cards (Stacked below Mascot) */}
        <div className="md:hidden flex flex-col w-full gap-4 mt-8 pb-12 z-20">
           {/* Add simplified cards here if needed, or leave empty as it's already tight */}
           <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white shadow-lg flex items-center justify-between">
              <span className="font-bold text-slate-800">MVP Setup</span>
              <div className="flex items-center gap-3">
                 <span className="font-bold text-sky-600">85%</span>
                 <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div className="bg-sky-500 h-full rounded-full" style={{width: '85%'}}></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
