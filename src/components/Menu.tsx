import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { CareerCarousel } from './CareerCarousel';
import { ABOUT_ME } from '../data/aboutme';
import ScrollOpacityText from './ui/ScrollOpacityText';

// Removing FadeInText in favor of ScrollOpacityText or simple divs

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beyondRef = useRef<HTMLDivElement>(null);
  const isBeyondInView = useInView(beyondRef, { amount: 0.6, once: true });
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Animation triggers when in view
  const beyondExpanded = isBeyondInView;

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-black z-40 text-white overflow-y-auto no-scrollbar"
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

        {/* Beyond Entry Point */}
        <div 
          ref={beyondRef}
          className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isBeyondInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center px-6 text-center"
          >
            <div 
              className="use-std-cursor group relative mb-12"
              onClick={() => {
                onClose();
                navigate('/beyond');
              }}
            >
              <div className={cn(
                "flex font-display font-black uppercase leading-none group",
                isMobile ? "flex-col items-center gap-1 text-7xl" : "items-center text-5xl md:text-8xl"
              )}>
                {/* [ character (Index 0) */}
                <div className={cn(
                  "relative overflow-hidden flex items-center h-[1.1em]",
                  isMobile && "rotate-[90deg]"
                )}>
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block transition-transform duration-500 group-hover:-translate-y-[110%] leading-none"
                  >
                    [
                  </motion.span>
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 translate-y-[110%] group-hover:translate-y-0 leading-none pointer-events-none"
                  >
                    [
                  </motion.span>
                </div>
                
                <div className={cn("flex items-center overflow-hidden", isMobile ? "mx-0" : "mx-2 md:mx-4")}>
                  {/* B character (Index 1) */}
                  <div className="relative overflow-hidden flex items-center h-[1.1em]">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-[110%] leading-none" style={{ transitionDelay: '30ms' }}>
                      b
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 translate-y-[110%] group-hover:translate-y-0 leading-none pointer-events-none" style={{ transitionDelay: '30ms' }}>
                      b
                    </span>
                  </div>

                  <motion.div
                    animate={{ 
                      width: beyondExpanded ? 'auto' : '0px',
                      opacity: beyondExpanded ? 1 : 0
                    }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex whitespace-nowrap"
                  >
                    {"eyond".split('').map((char, i) => {
                      const charIdx = i + 2;
                      const isFirstHalf = charIdx < 4;
                      return (
                        <div key={i} className="relative overflow-hidden flex items-center h-[1.1em]">
                          <span 
                            className={cn(
                              "inline-block transition-transform duration-500 leading-none",
                              isFirstHalf ? "group-hover:-translate-y-[110%]" : "group-hover:translate-y-[110%]"
                            )}
                            style={{ transitionDelay: `${charIdx * 30}ms` }}
                          >
                            {char}
                          </span>
                          <span 
                            className={cn(
                              "absolute inset-0 flex items-center justify-center transition-transform duration-500 leading-none pointer-events-none",
                              isFirstHalf ? "translate-y-[110%] group-hover:translate-y-0" : "-translate-y-[110%] group-hover:translate-y-0"
                            )}
                            style={{ transitionDelay: `${charIdx * 30}ms` }}
                          >
                            {char}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* ] character (Index 7) */}
                <div className={cn(
                  "relative overflow-hidden flex items-center h-[1.1em]",
                  isMobile && "rotate-[90deg]"
                )}>
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block transition-transform duration-500 group-hover:translate-y-[110%] leading-none"
                    style={{ transitionDelay: '210ms' }}
                  >
                    ]
                  </motion.span>
                  <motion.span
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 -translate-y-[110%] group-hover:translate-y-0 leading-none pointer-events-none"
                    style={{ transitionDelay: '210ms' }}
                  >
                    ]
                  </motion.span>
                </div>
              </div>
            </div>

            <motion.p 
              className="max-w-2xl text-sm md:text-base uppercase tracking-[0.3em] opacity-0 font-sans font-light leading-relaxed px-4 mb-16"
              animate={isBeyondInView ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              A journey beyond the professional, shaped by sport and a deep passion for the water.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isBeyondInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1.8 }}
              onClick={() => {
                onClose();
                navigate('/beyond');
              }}
              className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em] font-sans font-medium text-white/50 hover:text-white transition-all group pointer-events-auto"
            >
              <span className="relative">
                Discover the journey
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
              </span>
              <div className="w-12 h-[1px] bg-white/20 group-hover:bg-white/80 group-hover:w-16 transition-all duration-500" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
