import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  return (
    <div className={`flex overflow-hidden relative group ${className}`}>
      {text.split('').map((char, charIndex) => {
        const isFirstHalf = charIndex < text.length / 2;
        return (
          <span 
            key={charIndex} 
            className={`inline-block transition-transform duration-500 ${isFirstHalf ? 'group-hover:-translate-y-full' : 'group-hover:translate-y-full'}`}
            style={{ transitionDelay: `${charIndex * 30}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {text.split('').map((char, charIndex) => {
          const isFirstHalf = charIndex < text.length / 2;
          return (
            <span 
              key={charIndex} 
              className={`inline-block transition-transform duration-500 ${isFirstHalf ? 'translate-y-full group-hover:translate-y-0' : '-translate-y-full group-hover:translate-y-0'}`}
              style={{ transitionDelay: `${charIndex * 30}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};
