import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, X, ChevronDown } from 'lucide-react';
import { cn, getAssetPath } from '../lib/utils';
import { AnimatedText } from './AnimatedText';
import { LoadingIndicator } from './application/loading-indicator/loading-indicator';

const BrowserSkeleton = ({ children, onClose, projectName }: { children: React.ReactNode, onClose: () => void, projectName: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 lg:p-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-zinc-800 flex flex-col"
      >
        <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
          </div>
          <div className="flex-1 mx-8">
            <div className="h-7 bg-zinc-950 rounded-lg border border-zinc-800/50 flex items-center px-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mr-3 animate-pulse" />
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Lab Preview / {projectName}</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="group p-2 hover:bg-zinc-800 rounded-full transition-all duration-300 text-zinc-500 hover:text-white use-std-cursor"
          >
            <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
        <div className="flex-1 relative bg-black overflow-hidden text-white">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
              <LoadingIndicator type="dot-circle" size="md" label="Loading Lab..." />
            </div>
          )}
          {React.cloneElement(children as React.ReactElement, { 
            onLoadedData: () => setIsLoading(false) 
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperimentVisual = ({ videoUrl, onExpand }: { videoUrl: string, onExpand: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-200 group cursor-none hide-cursor-label">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-50">
          <LoadingIndicator type="dot-circle" size="sm" label="" />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={videoUrl || 'empty'}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {videoUrl ? (
            <video
              src={getAssetPath(videoUrl)}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsLoading(false)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-300 uppercase font-mono text-xs" onMount={() => setIsLoading(false)}>Coming Soon</div>
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center use-std-cursor"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 hover:bg-white/20 hover:scale-110"
            >
              <Maximize size={22} strokeWidth={1.2} />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FALLBACK_EXPERIMENTS = [
  { id: 'f1', title: "HypeAddicted", description: "luxury barbershop prototype", tools: ["AI", "Next-Gen"], video: "/Experiments/hypeaddicted.mp4", order_index: 0 },
  { id: 'f2', title: "Murgia Liquori", description: "heritage distillery site", tools: ["Framer", "Stripe"], video: "/Experiments/murgia.mp4", order_index: 1 },
  { id: 'f3', title: "Aurora", description: "earbuds landing page", tools: ["Windsurf", "Meshy"], video: "/Experiments/aurora.mp4", order_index: 2 },
  { id: 'f4', title: "SwimFlow", description: "pool management app", tools: ["React", "Supabase"], video: "/Experiments/swimflow.mp4", order_index: 3 }
];

export const AIExperimentsSection = () => {
  const [experiments] = useState<any[]>(FALLBACK_EXPERIMENTS);
  const [loading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [expandedIndex]);

  return (
    <motion.section 
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute inset-0 w-full min-h-screen bg-white z-10 px-4 md:px-16 pt-24 md:pt-32 pb-40 text-zinc-900 ${expandedIndex !== null ? 'overflow-hidden' : 'overflow-y-auto'}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 block mb-4">Lab</span>
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9] flex flex-wrap gap-x-4">
              <span className="text-zinc-900">Experiments</span>
              <span className="text-zinc-200">.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 md:gap-16 items-center">
          <div className="flex flex-col border-t border-zinc-100">
            {experiments.map((exp, i) => {
              if (!exp) return null;
              return (
                <motion.div key={exp.id || i} ref={el => itemRefs.current[i] = el} onMouseEnter={() => setHoveredIndex(i)} className={`group border-b border-zinc-100 ${expandedIndex === i ? 'border-b-transparent' : ''}`}>
                  <div onClick={() => setExpandedIndex(i)} className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 use-std-cursor relative">
                    <div className="flex items-start md:items-center gap-6 md:gap-10">
                      <span className="text-xs font-mono opacity-30">0{i + 1}</span>
                      <div className="flex flex-col gap-3">
                        <AnimatedText text={exp.title || ""} className={`text-2xl md:text-4xl font-display font-black tracking-tighter uppercase transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />
                        <div className="flex flex-wrap gap-2">
                          {exp.tools?.map((tool: string, toolIndex: number) => (
                            <span key={toolIndex} className="text-[8px] font-mono uppercase tracking-widest px-2 py-1 bg-zinc-100 rounded-full opacity-60">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  <div className="flex items-center gap-8">
                    <p className={`text-sm font-sans max-w-xs transition-all duration-500 hidden md:block ${hoveredIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                      {exp.description}
                    </p>
                    <div className="md:hidden">
                      <motion.div animate={{ rotate: expandedIndex === i ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                        <ChevronDown size={24} className="text-zinc-400" />
                      </motion.div>
                    </div>
                  </div>
                  <motion.div className="absolute left-0 bottom-0 h-[2px] bg-zinc-900" initial={{ width: 0 }} animate={{ width: hoveredIndex === i ? '100%' : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              </motion.div>
            )})}
          </div>
          
          <div className="hidden lg:block h-[500px]">
            <ExperimentVisual videoUrl={experiments[hoveredIndex]?.video} onExpand={() => setIsFullscreen(true)} />
          </div>
        </div>

        <AnimatePresence>
          {isFullscreen && experiments[hoveredIndex] && (
            <BrowserSkeleton onClose={() => setIsFullscreen(false)} projectName={experiments[hoveredIndex].title}>
              <video src={getAssetPath(experiments[hoveredIndex].video)} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </BrowserSkeleton>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expandedIndex !== null && experiments[expandedIndex] && (
            <motion.div key="experiment-details" initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto p-4">
              <div onClick={() => setExpandedIndex(null)} className="py-8 flex items-center justify-between gap-4 use-std-cursor">
                <div className="flex items-start gap-6">
                  <span className="text-xs font-mono opacity-30">0{expandedIndex + 1}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-display font-black tracking-tighter uppercase">{experiments[expandedIndex].title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {experiments[expandedIndex].tools?.map((tool: string, toolIndex: number) => (
                        <span key={toolIndex} className="text-[8px] font-mono uppercase tracking-widest px-2 py-1 bg-zinc-100 rounded-full opacity-60">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div animate={{ rotate: 180 }}><ChevronDown size={24} className="text-zinc-400" /></motion.div>
              </div>
              <div className="py-8 px-4 md:px-8 flex flex-col items-center">
                <div className="w-24 h-px bg-zinc-200 mb-6"></div>
                <p className="text-sm font-sans mb-8 text-zinc-600 max-w-md text-center leading-relaxed">{experiments[expandedIndex].description}</p>
                <div className="w-full aspect-video bg-zinc-100 rounded-2xl overflow-hidden">
                  <video src={getAssetPath(experiments[expandedIndex].video)} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
