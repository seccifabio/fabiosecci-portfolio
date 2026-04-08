import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatedText } from './AnimatedText';
import { Menu } from './Menu';

export const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isForcedHidden, setIsForcedHidden] = useState(false);
  // Logo starts expanded on mount, collapses after 2s
  const [isIntroExpanded, setIsIntroExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/project/');

  // Collapse logo intro after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsIntroExpanded(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pageContent = document.getElementById('page-content');
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      if (pageContent) {
        pageContent.style.filter = 'blur(8px)';
        pageContent.style.transition = 'filter 0.5s ease';
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      if (pageContent) {
        pageContent.style.filter = 'none';
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      if (pageContent) pageContent.style.filter = 'none';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkTheme(e.detail.isDark);
    };

    const handleVisibilityChange = (e: CustomEvent) => {
      setIsForcedHidden(!e.detail.isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('header-theme', handleThemeChange as EventListener);
    window.addEventListener('header-visibility', handleVisibilityChange as EventListener);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('header-theme', handleThemeChange as EventListener);
      window.removeEventListener('header-visibility', handleVisibilityChange as EventListener);
    };
  }, []);

  // The logo is expanded if hovered OR if the intro is still active
  const logoExpanded = isHovered || isIntroExpanded;

  return (
    <>
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: (isVisible && !isForcedHidden) ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none"
      >
        {isProjectPage ? (
          <motion.div animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? -10 : 0 }} className={isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}>
            <button 
              onClick={() => { setIsMenuOpen(false); navigate('/'); }}
              className={`use-std-cursor pointer-events-auto flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:opacity-100 transition-opacity group ${isDarkTheme && !isMenuOpen ? 'text-black opacity-100' : 'text-white opacity-50'}`}
            >
              <ArrowLeft size={24} className="sm:size-4 transition-transform duration-500 group-hover:-translate-x-2" /> 
              <span className="hidden sm:block"><AnimatedText text="Back to home" /></span>
            </button>
          </motion.div>
        ) : (
          <motion.div animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? -10 : 0 }} className={isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}>
            <div 
              className={`use-std-cursor flex items-center transition-colors duration-500 ${isDarkTheme && !isMenuOpen ? 'text-black' : 'text-white'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => { setIsMenuOpen(false); navigate('/'); }}
            >
              <motion.div
                className="font-brand font-bold text-4xl md:text-5xl tracking-tight flex items-center lowercase leading-[0.6]"
                animate={{ gap: logoExpanded ? '2px' : '0px' }}
              >
                <div className="flex overflow-hidden">
                  <span>f</span>
                  <motion.div
                    animate={{ width: logoExpanded ? 'auto' : '0px', opacity: logoExpanded ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex whitespace-nowrap"
                  >
                    <span className="inline-block">abio</span>
                  </motion.div>
                </div>
                <div className="flex overflow-hidden">
                  <span>s</span>
                  <motion.div
                    animate={{ width: logoExpanded ? 'auto' : '0px', opacity: logoExpanded ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex whitespace-nowrap"
                  >
                    <span className="inline-block">ecci</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="pointer-events-auto relative z-50">
          <motion.button 
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "use-std-cursor font-brand font-bold text-4xl md:text-5xl tracking-tight transition-colors duration-500 lowercase",
              isDarkTheme && !isMenuOpen ? "text-black" : "text-white"
            )}
            animate={{ opacity: isMenuOpen ? 0 : 1, y: isMenuOpen ? -10 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            .me
          </motion.button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.button
                initial={false} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}
                onClick={() => setIsMenuOpen(false)}
                className="absolute inset-0 w-full h-full text-white use-std-cursor"
              >
                <div className="absolute w-full h-[3px] bg-current top-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute w-full h-[3px] bg-current top-1/2 -translate-y-1/2 -rotate-45" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
