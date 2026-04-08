import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatedText } from './AnimatedText';
import { ABOUT_ME } from '../data/aboutme';

const CareerItem = ({ role, years, company, link, theme }: { role: string, years: string, company: string, link: string, theme: 'light' | 'dark' }) => (
  <div className={cn(
      "flex-shrink-0 w-[300px] h-[180px] flex flex-col justify-between",
      theme === 'light' ? 'text-black' : 'text-white'
    )}>
    <div>
      <h3 className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase leading-none min-h-[2.1em] text-left text-balance">{role}</h3>
      <p className="text-sm font-mono opacity-50 mt-0.5 text-left">{years}</p>
    </div>
    <a href={link || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group use-std-cursor cursor-pointer">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
        theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'
      )}>
        <svg className={cn("w-5 h-5", theme === 'light' ? 'text-zinc-500' : 'text-zinc-600')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17L17 7"/></svg>
      </div>
      <div className="hidden md:flex flex-wrap" style={{ columnGap: '0.25em' }}>
        {company.split(' ').map((word, wordIdx) => (
          <AnimatedText key={wordIdx} text={word} className="font-sans font-semibold text-lg" />
        ))}
      </div>
      <span className="block md:hidden font-sans font-semibold text-lg">{company}</span>
    </a>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const CareerCarousel = ({ theme = 'dark' }: { theme?: 'light' | 'dark' }) => {
  const [showArrow, setShowArrow] = useState(true);
  const items = ABOUT_ME.career;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const hasScrolled = target.scrollLeft > 20;
    if (hasScrolled && showArrow) setShowArrow(false);
    if (!hasScrolled && !showArrow) setShowArrow(true);
  };

  return (
    <div className="w-full">
      <div className={cn("relative w-full", theme === 'light' ? 'draggable-cursor-light' : 'draggable-cursor')}>
        <div 
          className="w-full overflow-x-auto no-scrollbar scroll-smooth"
          onScroll={handleScroll}
        >
          <motion.div 
            className="flex gap-8 md:gap-10 pb-8 px-12 md:pl-24 md:pr-[200px] w-max"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {items.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <CareerItem {...item} link={item.link || '#'} theme={theme} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className={cn("absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r pointer-events-none", theme === 'light' ? 'from-white' : 'from-black')} />
        <div className={cn("absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l pointer-events-none", theme === 'light' ? 'from-white' : 'from-black')} />
        
        <AnimatePresence>
          {showArrow && items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={cn(
                "absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center gap-2",
                theme === 'light' ? 'text-black' : 'text-white'
              )}
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={32} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
