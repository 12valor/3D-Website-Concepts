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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const sceneVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 },
    },
  };

  const mascotVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-sky-100 flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/blue-background.png"
          alt="Blue Background"
          fill
          priority
          className="object-cover opacity-100 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-transparent to-indigo-500/20 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* MASSIVE Centered Mascot Layer */}
      <motion.div 
        className="absolute bottom-[-6%] lg:bottom-[-10%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] lg:w-[850px] lg:h-[850px] z-10 pointer-events-none flex items-end justify-center"
        variants={mascotVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative w-full h-full scale-[1.0] lg:scale-[1.1] translate-y-[5%]">
          <Image
            src="/mascot.png"
            alt="Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_40px_80px_rgba(0,30,80,0.35)]"
          />
        </div>
      </motion.div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-20 w-full h-full max-w-[1600px] mx-auto pointer-events-none">
        
        {/* Top Text Block - Perfectly Centered, Absolute Positioned */}
        <motion.div 
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full max-w-4xl flex flex-col items-center text-center pointer-events-auto px-6 py-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,1)]"></div>
            <span className="text-[11px] font-bold text-sky-950 tracking-[0.2em] uppercase">MVP Website System</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-[72px] font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-4 drop-shadow-sm">
            Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">business system</span> faster.
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-lg text-slate-800 leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-sm">
            A clean, responsive MVP section built with modern UI, startup-style layout, and polished product visuals.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold shadow-[0_12px_24px_rgba(14,165,233,0.3)] transition-all duration-300 hover:-translate-y-1 border border-sky-400/50 cursor-pointer">
              View Demo
            </button>
            <button className="px-8 py-3.5 rounded-2xl bg-white/50 hover:bg-white/70 text-slate-900 text-base font-bold border border-white/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              Start Building
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Holographic Cards - Absolute Positioned Around Screen */}
        <motion.div 
          className="absolute inset-0 pointer-events-none hidden lg:block" 
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
        >
          
          {/* Top-Left: Analytics */}
          <div 
            className="absolute top-[50%] left-[6%] -translate-y-1/2 w-52 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/50 shadow-[0_30px_60px_rgba(0,50,150,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] pointer-events-auto transition-all duration-500 hover:translate-y-[-10px] hover:shadow-[0_40px_80px_rgba(0,50,150,0.2)] hover:bg-white/30"
            style={{ transform: "rotateY(12deg) rotateX(8deg) translateZ(-10px)" }}
          >
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Analytics</span>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-300/50 px-2 py-0.5 rounded-full border border-emerald-100/50">+14%</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-3 drop-shadow-sm">24.5k</div>
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30">
                <path d="M0,30 L20,15 L40,25 L60,5 L80,15 L100,0" fill="none" stroke="url(#skyGradient2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_4px_8px_rgba(14,165,233,0.5)]" />
                <defs>
                  <linearGradient id="skyGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Top-Right: System Status */}
          <div 
            className="absolute top-[46%] right-[6%] -translate-y-1/2 w-52 p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/60 shadow-[0_35px_70px_rgba(0,50,150,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] pointer-events-auto transition-all duration-500 hover:translate-y-[-10px] hover:shadow-[0_45px_90px_rgba(0,50,150,0.15)] hover:bg-white/40"
            style={{ transform: "rotateY(-15deg) rotateX(10deg) translateZ(20px)" }}
          >
            <div className="relative">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-4">System Status</div>
              <div className="space-y-3">
                {[
                  { name: "API Servers", color: "bg-emerald-500" },
                  { name: "Database", color: "bg-emerald-500" },
                  { name: "Storage", color: "bg-sky-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 font-bold">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-600 font-bold">OK</span>
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-[0_0_10px_currentColor] border border-white/50`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-Right: Feature Summary */}
          <div 
            className="absolute bottom-[10%] right-[8%] w-56 p-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/40 shadow-[0_20px_40px_rgba(0,50,150,0.1),inset_0_1px_1px_rgba(255,255,255,0.7)] pointer-events-auto transition-all duration-500 hover:translate-y-[-10px] hover:shadow-[0_30px_60px_rgba(0,50,150,0.15)] hover:bg-white/30"
            style={{ transform: "rotateY(-12deg) rotateX(-8deg) translateZ(-10px)" }}
          >
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_10px_20px_rgba(99,102,241,0.5)] text-white border border-white/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">Performance</div>
                  <div className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">Lightning Fast</div>
                </div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Optimized for speed, SEO, and massive scale out of the box.
              </p>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Mobile Fallback layout */}
      <div className="absolute bottom-0 w-full p-4 lg:hidden z-30 pointer-events-auto pb-8">
        <div className="w-full p-5 rounded-3xl bg-white/40 backdrop-blur-2xl border-[1.5px] border-white/70 shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900">MVP Setup</span>
            <span className="font-black text-sky-700">85%</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2.5 overflow-hidden shadow-inner border border-white/40">
            <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-full rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
