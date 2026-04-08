import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Mail, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomCursor } from './CustomCursor';
import { BrandScroller } from './BrandScroller';
import { getAssetPath } from '../lib/utils';
import { Project, PROJECTS } from '../data/projects';
import ShinyText from './ui/ShinyText';
import { AnimatedText } from './AnimatedText';
import { AIExperimentsSection } from './AIExperimentsSection';
import { LoadingIndicator } from './application/loading-indicator/loading-indicator';

const VideoSection: React.FC<{ project: Project; index: number; direction: number; isLast: boolean }> = ({ project, direction, isLast }) => {
  const shouldFadeToWhite = isLast && direction > 0;

  return (
    <motion.section 
      initial={{ filter: 'blur(30px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ 
        filter: shouldFadeToWhite ? 'blur(0px)' : 'blur(30px)', 
        opacity: shouldFadeToWhite ? 1 : 0 
      }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black z-10"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.video
            autoPlay
            muted
            loop
            playsInline
            initial={{ scale: 1.2, x: "-5%", y: "5%" }}
            animate={{ 
              scale: [1.2, 1.3, 1.2],
              x: ["-5%", "5%"],
              y: ["5%", "-5%"]
            }}
            transition={{ 
              scale: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" },
              x: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" },
              y: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }
            }}
            className="w-full h-full object-cover opacity-40"
            src={project?.videoUrl ? getAssetPath(project.videoUrl) : ''}
          />
        
        <motion.div 
          initial={{ opacity: 0 }}
          exit={{ opacity: shouldFadeToWhite ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white z-10 pointer-events-none"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 md:p-16">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col gap-2 mb-4 overflow-hidden">
            <motion.h2 
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[8vw] md:text-[6vw] font-display font-black tracking-tighter leading-[1] uppercase max-w-[70vw] md:max-w-[50vw]"
            >
              <span className="block md:hidden">{project.title}</span>
              <span className="hidden md:flex flex-wrap" style={{ columnGap: '0.25em' }}>
                {project.title.split(' ').map((word, wordIdx) => (
                  <AnimatedText key={wordIdx} text={word} />
                ))}
              </span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-xs font-sans font-normal tracking-[0.1em] opacity-80 uppercase"
            >
              PROJECT: {project.title} | {project.location || 'N/A'} | {project.year}
            </motion.p>
          </motion.div>
        </div>
      </div>


    </motion.section>
  );
};

const FooterSection: React.FC = () => {
  return (
    <motion.section 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 w-full h-full bg-black z-20 flex flex-col items-center justify-center p-10 text-center hide-cursor-label cursor-none"
    >
      <div className="max-w-6xl w-full flex flex-col items-center gap-16">
        <BrandScroller />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase"
        >
          <ShinyText text="Don't chase change." speed={3} />
          <br />
          <ShinyText text="Shape them." speed={3} />
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 w-full mt-12 md:mt-16 mb-16 md:mb-20">
          <a href="mailto:fabiosecci@gmail.com" className="group use-std-cursor">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:text-black">
              <Mail size={20} />
            </div>
          </a>

          <a href="https://www.linkedin.com/in/fabiosecci/" target="_blank" rel="noopener noreferrer" className="group use-std-cursor">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:text-black">
              <Linkedin size={20} />
            </div>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 right-10 flex justify-start opacity-30 transition-opacity duration-300">
        <div className="text-[10px] font-mono uppercase tracking-widest">© 2026 Fabio Secci</div>
      </div>
    </motion.section>
  );
};

export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isTransitioning = useRef(false);
  const navigate = useNavigate();
  const projects = PROJECTS;
  const loading = false;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const TOTAL_SLIDES = projects.length + 2; 
  
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('header-visibility', { detail: { isVisible: activeIndex === 0 } }));
    const isWhiteSection = activeIndex === projects.length;
    window.dispatchEvent(new CustomEvent('header-theme', { detail: { isDark: isWhiteSection } }));
    
    return () => {
      window.dispatchEvent(new CustomEvent('header-visibility', { detail: { isVisible: true } }));
      window.dispatchEvent(new CustomEvent('header-theme', { detail: { isDark: false } }));
    };
  }, [activeIndex, projects.length]);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (isTransitioning.current) return;

    if (e.deltaY > 20 && activeIndex < TOTAL_SLIDES - 1) {
      setDirection(1);
      setActiveIndex(prev => prev + 1);
      isTransitioning.current = true;
      setTimeout(() => { isTransitioning.current = false; }, 1200);
    } else if (e.deltaY < -20 && activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(prev => prev - 1);
      isTransitioning.current = true;
      setTimeout(() => { isTransitioning.current = false; }, 1200);
    }
  }, [activeIndex, TOTAL_SLIDES]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioning.current) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < TOTAL_SLIDES - 1) {
        setDirection(1);
        setActiveIndex(prev => prev + 1);
        isTransitioning.current = true;
        setTimeout(() => { isTransitioning.current = false; }, 1200);
      } else if (diff < 0 && activeIndex > 0) {
        setDirection(-1);
        setActiveIndex(prev => prev - 1);
        isTransitioning.current = true;
        setTimeout(() => { isTransitioning.current = false; }, 1200);
      }
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black cursor-pointer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        if (activeIndex < projects.length) {
          navigate(`/project/${projects[activeIndex].slug}`);
        }
      }}
    >
      <CustomCursor />
      
      <AnimatePresence initial={true} custom={direction}>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full bg-black">
            <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
          </div>
        ) : activeIndex < projects.length ? (
          <VideoSection 
            key={projects[activeIndex]?.id || activeIndex} 
            project={projects[activeIndex]} 
            index={activeIndex}
            direction={direction}
            isLast={activeIndex === projects.length - 1}
          />
        ) : activeIndex === projects.length ? (
          <AIExperimentsSection key="ai-experiments" />
        ) : (
          <FooterSection key="footer" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && activeIndex < projects.length && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-2"
          >
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => {
              const isWhiteSection = activeIndex === projects.length;
              const dotColor = isWhiteSection ? 'bg-black' : 'bg-white';
              const dotOpacity = isWhiteSection ? 'bg-black/20' : 'bg-white/20';
              const hoverColor = isWhiteSection ? 'group-hover:bg-black/50' : 'group-hover:bg-white/50';

              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isTransitioning.current || i === activeIndex) return;
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                    isTransitioning.current = true;
                    setTimeout(() => { isTransitioning.current = false; }, 1200);
                  }}
                  className="group py-1 flex justify-end use-std-cursor relative"
                >
                  <div className={`transition-all duration-700 ease-out relative overflow-hidden ${
                    i === activeIndex 
                      ? `${dotColor} w-6 md:w-8 h-[1.5px]` 
                      : `${dotOpacity} w-3 md:w-4 h-[1px] ${hoverColor} group-hover:w-6 md:group-hover:w-7`
                  }`}>
                    {activeIndex === 0 && (
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                        className="absolute inset-0 w-full h-full bg-white"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeIndex === TOTAL_SLIDES - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              if (isTransitioning.current) return;
              setDirection(-1);
              setActiveIndex(0);
              isTransitioning.current = true;
              setTimeout(() => { isTransitioning.current = false; }, 1200);
            }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hide-cursor-label"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.main>
  );
};
