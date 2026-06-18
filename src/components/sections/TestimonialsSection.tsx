import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const clients = [
    { name: 'Aura Living', img: '/images/logos/logo_aura_living_1781434478374.png' },
    { name: 'Nexus Properties', img: '/images/logos/logo_nexus_1781434488912.png' },
    { name: 'Vanguard Build', img: '/images/logos/logo_vanguard_1781434499575.png' },
    { name: 'Crest Architects', img: '/images/logos/logo_crest_1781434510767.png' },
    { name: 'Oak & Iron', img: '/images/logos/logo_oak_iron_1781434519686.png' },
    { name: 'Lumina Studios', img: '/images/logos/logo_lumina_1781434530178.png' },
    { name: 'Apex Commercial', img: '/images/logos/logo_apex_1781434541426.png' },
    { name: 'Zenith Spaces', img: '/images/logos/logo_zenith_1781434562288.png' }
  ];

  const testimonials = [
    {
      quote: "Valor completely transformed our commercial space. Their attention to detail and clear communication made the entire process seamless.",
      author: "Sarah Jenkins",
      role: "Director at Lumina Studios",
      avatarImg: "/images/pfps/pfp_sarah_1781437452438.png"
    },
    {
      quote: "The final handover was spotless. They kept the site clean, respected the timeline, and delivered a space that feels incredibly solid.",
      author: "Marcus Rivera",
      role: "Homeowner",
      avatarImg: "/images/pfps/pfp_marcus_1781437461970.png"
    },
    {
      quote: "Working with them was the best decision we made for our new café. Practical design, durable materials, and zero headaches.",
      author: "Elena Cole",
      role: "Founder of The Daily Grind",
      avatarImg: "/images/pfps/pfp_elena_1781437472589.png"
    }
  ];

  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#111111] text-[#F5F5F0] rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-16 relative z-[25]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
        {/* Testimonials */}
        <div className="mb-24 sm:mb-32">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-16 text-center tracking-[-0.02em] text-white">
              Trusted by those who build with us.
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.1} y={30} className="h-full">
                <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/5 h-full flex flex-col relative transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 group">
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-white/5 transition-colors duration-300 group-hover:text-[#d97706]/20" />
                  
                  <p className="text-lg sm:text-xl text-[#F5F5F0]/80 leading-relaxed font-body italic mb-10 flex-1 relative z-10">
                    "{t.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-6">
                    <img 
                      src={t.avatarImg} 
                      alt={t.author} 
                      className="w-12 h-12 rounded-full object-cover shadow-inner border border-white/10"
                    />
                    <div>
                      <p className="font-display font-semibold text-white">{t.author}</p>
                      <p className="text-sm text-[#F5F5F0]/50 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>

      {/* Marquee */}
      <div className="border-y border-white/5 bg-white/[0.02] py-12 overflow-hidden relative group/marquee">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {marqueeItems.map((client, i) => (
            <div key={i} className="flex items-center justify-center px-8 sm:px-16 whitespace-nowrap group/item">
              <div className="flex items-center gap-4 transition-all duration-300">
                <img 
                  src={client.img} 
                  alt={client.name} 
                  className="w-12 h-12 object-contain mix-blend-screen opacity-40 transition-opacity duration-300 group-hover/item:opacity-100"
                />
                <span className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white/30 transition-colors duration-300 group-hover/item:text-white/80">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
