import React from 'react';
import SlotCounter from 'react-slot-counter';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface CounterProps {
  value: string;
  duration?: number;
  root?: React.RefObject<Element | null>;
}

const Counter: React.FC<CounterProps> = ({ value, root }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", root });

  // Separate parsing for the smaller suffix if it's a common symbol
  const match = value.match(/([^\d.]*)(\d+\.?\d*)(.*)/);
  const prefix = match ? match[1] : '';
  const numberPart = match ? match[2] : value;
  const suffix = match ? match[3] : '';

  return (
    <div ref={ref} className="inline-flex items-baseline">
      {prefix && <span className="mr-1">{prefix}</span>}
      
      {isInView ? (
        <SlotCounter
          value={numberPart}
          duration={1.5}
          animateOnVisible={false} // Transition handled by our isInView logic
          charClassName="font-display font-black tracking-tighter"
        />
      ) : (
        <span className="font-display font-black tracking-tighter opacity-0">0</span>
      )}

      {suffix && (
        <span className="text-[0.5em] md:text-[0.6em] ml-1 opacity-70 font-display font-black">
          {suffix}
        </span>
      )}
    </div>
  );
};

export default Counter;
