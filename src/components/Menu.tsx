import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CareerCarousel } from './CareerCarousel';
import { ABOUT_ME } from '../data/aboutme';
import ScrollOpacityText from './ui/ScrollOpacityText';

// Removing FadeInText in favor of ScrollOpacityText or simple divs

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen }: MenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const isVisible = scrollTop < 50;
      window.dispatchEvent(new CustomEvent('header-visibility', { 
        detail: { isVisible } 
      }));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.dispatchEvent(new CustomEvent('header-visibility', { 
        detail: { isVisible: true } 
      }));
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-black z-40 text-white overflow-y-auto"
    >
      <div className="font-serif">
        <div className="w-full max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
          <div className="flex flex-col gap-24">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] opacity-50 mb-6 font-sans">Experience</h2>
              <ScrollOpacityText root={containerRef} className="text-2xl md:text-4xl leading-relaxed opacity-90 font-sans">
                <p>{ABOUT_ME.bio}</p>
              </ScrollOpacityText>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] opacity-50 mb-8 font-sans">Education</h2>
              <ScrollOpacityText root={containerRef} className="text-2xl md:text-4xl leading-relaxed opacity-90 font-sans">
                {ABOUT_ME.education.map((item, idx) => (
                  <div key={idx} className={idx < ABOUT_ME.education.length - 1 ? "mb-8" : ""}>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="opacity-60 text-lg">{item.subtitle}</p>
                  </div>
                ))}
              </ScrollOpacityText>
            </div>
          </div>
        </div>

        <motion.div
          className="bg-white text-black py-24"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center px-6 md:px-10">
            <h2 className="text-base uppercase tracking-[0.3em] opacity-50 mb-12 font-sans">Career History</h2>
            <CareerCarousel theme="light" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
