import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 60%"]
  });

  const characters = text.split("");

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        return (
          <Character key={i} range={[start, end]} progress={scrollYProgress}>
            {char}
          </Character>
        );
      })}
    </p>
  );
};

const Character = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};
