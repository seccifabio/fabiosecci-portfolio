import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollOpacityTextProps {
  children: React.ReactNode;
  className?: string;
  root: React.RefObject<Element | null>;
}

const ScrollOpacityText: React.FC<ScrollOpacityTextProps> = ({ children, className, root }) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    container: root,
    offset: ["start 90%", "start 40%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={textRef}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollOpacityText;
