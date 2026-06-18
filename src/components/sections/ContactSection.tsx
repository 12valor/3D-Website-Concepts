import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { PrimaryButton } from '../ui/PrimaryButton';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F5F1E8] text-[#111111] rounded-t-[2.5rem] sm:rounded-t-[4rem] -mt-16 relative z-40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <FadeIn delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-6 text-[#111111] tracking-[-0.02em]">
                Tell us what you want to build.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-[#111111]/70 leading-relaxed font-body mb-12">
                Share your project idea, location, timeline, and the type of space you want to create. We’ll help you understand the next practical step.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-6 mt-auto">
              <FadeIn delay={0.3}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#111111]/50 uppercase tracking-wider">Phone</span>
                  <a href="tel:09943008493" className="text-xl font-display font-medium hover:text-[#d97706] transition-colors">
                    0994 300 8493
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#111111]/50 uppercase tracking-wider">Email</span>
                  <a href="mailto:evangelista.agdiaz@gmail.com" className="text-xl font-display font-medium hover:text-[#d97706] transition-colors">
                    evangelista.agdiaz@gmail.com
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#111111]/50 uppercase tracking-wider">Website</span>
                  <a href="https://8k-iot-solutions.vercel.app" target="_blank" rel="noreferrer" className="text-xl font-display font-medium hover:text-[#d97706] transition-colors">
                    8k-iot-solutions.vercel.app
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Form */}
          <FadeIn delay={0.3} x={20} className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-[#111111]/5">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <FadeIn delay={0.4} y={10}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111111]">Full Name</label>
                  <input type="text" className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="John Doe" />
                </div>
              </FadeIn>
              
              <FadeIn delay={0.45} y={10}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111111]">Phone or Email</label>
                  <input type="text" className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="How should we reach you?" />
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FadeIn delay={0.5} y={10}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#111111]">Project Type</label>
                    <select className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all appearance-none cursor-pointer">
                      <option value="">Select type</option>
                      <option value="residential">Residential Construction</option>
                      <option value="commercial">Commercial Fit-Out</option>
                      <option value="renovation">Renovation</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </FadeIn>

                <FadeIn delay={0.55} y={10}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#111111]">Estimated Budget</label>
                    <select className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all appearance-none cursor-pointer">
                      <option value="">Select budget</option>
                      <option value="below50k">Below ₱50,000</option>
                      <option value="50k-150k">₱50,000 - ₱150,000</option>
                      <option value="150k-500k">₱150,000 - ₱500,000</option>
                      <option value="500k+">₱500,000+</option>
                      <option value="notsure">Not sure yet</option>
                    </select>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.6} y={10}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111111]">Project Location</label>
                  <input type="text" className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all" placeholder="City or Region" />
                </div>
              </FadeIn>

              <FadeIn delay={0.65} y={10}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#111111]">Message</label>
                  <textarea rows={4} className="px-4 py-3 rounded-xl bg-[#F5F1E8]/50 border border-[#111111]/10 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706] transition-all resize-none" placeholder="Tell us more about your project..." />
                </div>
              </FadeIn>

              <FadeIn delay={0.7} y={10} className="mt-2">
                <PrimaryButton className="w-full" type="submit" showIcon>
                  Send Project Inquiry
                </PrimaryButton>
              </FadeIn>
            </form>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
