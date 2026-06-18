import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const FloatingProjectStatsCard = () => {
  const pfps = [
    '/images/pfps/pfp_sarah_1781437452438.png',
    '/images/pfps/pfp_marcus_1781437461970.png',
    '/images/pfps/pfp_elena_1781437472589.png',
  ];

  return (
    <div className="mt-5 flex w-full justify-center pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[calc(100vw-2rem)]"
      >
        <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 pl-2 sm:pl-2.5 pr-5 sm:pr-7 py-2 sm:py-2.5 w-max max-w-full flex items-center gap-3 sm:gap-5">
          {/* Avatars */}
          <div className="flex -space-x-3 sm:-space-x-4">
            {pfps.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="Client" 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-[3px] border-[#111111]/90 relative"
                style={{ zIndex: 4 - i }}
              />
            ))}
          </div>

          {/* Text Content */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 mb-0.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d97706] fill-[#d97706]" />
                ))}
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-white font-display font-bold text-sm sm:text-base leading-none tracking-tight">10+</span>
                <span className="text-white/90 font-medium text-xs sm:text-sm leading-none">Projects Done</span>
              </div>
            </div>
            <span className="text-white/60 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] mt-0.5">
              Trusted by homeowners & businesses
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
