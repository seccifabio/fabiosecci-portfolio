import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '../lib/utils';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [useStdCursor, setUseStdCursor] = useState(false);
  const [hideLabel, setHideLabel] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isLightCursor, setIsLightCursor] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button') || 
                          target.closest('a') || 
                          target.tagName === 'BUTTON' || 
                          target.tagName === 'A';
      
      const stdCursor = target.closest('.use-std-cursor');
      const noLabel = target.closest('.hide-cursor-label');
      const draggable = target.closest('.draggable-cursor');
      const draggableLight = target.closest('.draggable-cursor-light');
      
      setIsHovering(!!interactive);
      setUseStdCursor(!!stdCursor);
      setHideLabel(!!noLabel);
      setIsDraggable(!!draggable || !!draggableLight);
      setIsLightCursor(!!draggableLight);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Cursor Dot - Solid 20x20 */}
      <motion.div
        className="absolute w-5 h-5 bg-foreground rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--fg-rgb,255,255,255),0.3)]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: useStdCursor || isDraggable ? 0 : 1,
        }}
      />
      <motion.div
        className={cn("absolute", isLightCursor ? 'text-background' : 'text-foreground')}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isDraggable ? 1 : 0,
          scale: isDraggable ? 1.5 : 1,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
          <path d="M4 12H20M4 12L8 8M4 12L8 16M20 12L16 8M20 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
};
