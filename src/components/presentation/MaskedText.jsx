import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MaskedText = ({ 
  text, 
  className = '', 
  style = {}, 
  delay = 0,
  stagger = 0.1,
  duration = 0.8,
  containerClassName = ''
}) => {
  const words = useMemo(() => text.split(' '), [text]);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const wordVars = {
    hidden: { y: '110%' },
    visible: { 
      y: 0,
      transition: {
        duration: duration,
        ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for premium feel
      }
    },
    exit: { 
      y: '-110%',
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      }
    }
  };

  return (
    <motion.div
      key={text}
      variants={containerVars}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-wrap ${containerClassName}`}
      style={{ ...style, overflow: 'hidden' }}
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'top' }}
        >
          <motion.span
            variants={wordVars}
            className="inline-block"
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default MaskedText;
