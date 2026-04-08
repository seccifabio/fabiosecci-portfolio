import React from "react";
import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  type?: "dot-circle" | "spinner" | "dots";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = "dot-circle",
  size = "md",
  label = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (type === "dot-circle") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
        <div className={`relative ${sizeClasses[size]}`}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-zinc-400 rounded-full"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 1, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              style={{
                top: `${50 + 40 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                left: `${50 + 40 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)"
              }}
            />
          ))}
        </div>
        {label && (
          <motion.p 
            className="text-white/60 text-sm font-medium tracking-widest uppercase italic"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {label}
          </motion.p>
        )}
      </div>
    );
  }

  // Fallback spinner if type is different
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`border-2 border-zinc-400/20 border-t-zinc-400 rounded-full animate-spin ${sizeClasses[size]}`} />
      {label && <p className="text-white/60 text-xs uppercase tracking-widest">{label}</p>}
    </div>
  );
};
