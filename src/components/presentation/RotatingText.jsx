import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence
} from 'framer-motion';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 250 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-100%', opacity: 0 },
      animatePresenceMode = 'popLayout',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0.02,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const splitIntoCharacters = (text) => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), (segment) => segment.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      const lines = currentText.split('\n');
      return lines.map((line, i, arr) => {
        const words = line.split(' ');
        return {
          words: words.map((word, j) => ({
            characters: splitBy === 'characters' ? splitIntoCharacters(word) : [word],
            needsSpace: j !== words.length - 1
          })),
          needsLineBreak: i !== arr.length - 1
        };
      });
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index, totalChars) => {
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
          const center = Math.floor(totalChars / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === 'random') {
          return Math.random() * totalChars * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    const totalCharacters = useMemo(() => {
      return elements.reduce((sum, line) => 
        sum + line.words.reduce((wordSum, word) => wordSum + word.characters.length, 0), 0
      );
    }, [elements]);

    return (
      <motion.span
        className={cn('inline-flex flex-col relative', mainClassName)}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <div className="flex flex-col w-full" aria-hidden="true">
          {elements.map((lineObj, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap w-full">
              {lineObj.words.map((wordObj, wordIndex, array) => {
                const previousCharsInLine = array
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0);
                
                const previousCharsInPreviousLines = elements
                  .slice(0, lineIndex)
                  .reduce((sum, line) => sum + line.words.reduce((wordSum, word) => wordSum + word.characters.length, 0), 0);

                const globalIndexOffset = previousCharsInPreviousLines + previousCharsInLine;

                return (
                  <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                    {wordObj.characters.map((char, charIndex) => (
                      <span 
                        key={charIndex} 
                        className="relative" 
                        style={{ 
                          display: 'inline-block',
                          minWidth: splitBy === 'characters' ? '0.65em' : 'auto',
                          textAlign: 'center'
                        }}
                      >
                        <AnimatePresence mode="popLayout" initial={animatePresenceInitial}>
                          <motion.span
                            key={`${currentTextIndex}-${lineIndex}-${wordIndex}-${charIndex}`}
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            transition={{
                              ...transition,
                              delay: getStaggerDelay(
                                globalIndexOffset + charIndex,
                                totalCharacters
                              )
                            }}
                            className={cn('inline-block', elementLevelClassName)}
                          >
                            {char}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    ))}
                    {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </motion.span>
    );
  }
);

RotatingText.displayName = 'RotatingText';
export default RotatingText;


