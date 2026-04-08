// Version: 1.3.0 - Pure Local Restoration (No InsForge)
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUp, Mail, Linkedin } from 'lucide-react';
import { cn, getAssetPath } from '../lib/utils';
import { BrandScroller } from './BrandScroller';
import { LoadingIndicator } from './application/loading-indicator/loading-indicator';
import { PROJECTS } from '../data/projects';
import ShinyText from './ui/ShinyText';
import Counter from './ui/Counter';
import ScrollOpacityText from './ui/ScrollOpacityText';

const FadeText: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <motion.div initial={{ opacity: 1 }} className={className}>
    {children}
  </motion.div>
);

const HorizontalScrollGallery = ({ images, containerRef, viewMode }: { images: string[], containerRef: React.RefObject<HTMLDivElement | null>, viewMode: 'desktop' | 'mobile' }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section ref={targetRef} style={{ height: `${Math.max(1, images.length) * 100}vh` }} className="relative w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-4 md:px-16 w-max">
          {images.map((src, index) => (
            <div key={index} className={`${viewMode === 'desktop' ? 'w-[85vw] md:w-[75vw]' : 'w-auto aspect-[9/19]'} h-[60vh] md:h-[80vh] shrink-0 transition-all duration-500 relative`}>
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 rounded-2xl">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <FadeText className={`w-full h-full transition-opacity duration-500 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}>
                <img
                  src={getAssetPath(src)}
                  alt={`Project gallery ${index + 1}`}
                  className={`w-full h-full rounded-2xl ${viewMode === 'desktop' ? 'object-cover object-top' : 'object-contain'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
              </FadeText>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const formatValue = (value: string) => {
  if (!value) return '';
  const valStr = String(value);
  if (valStr.includes('%')) {
    const [num, rest] = valStr.split('%');
    return <>{num}<span className="text-[0.6em] ml-1">%</span>{rest}</>;
  }
  if (valStr.toUpperCase().includes('K')) {
    const [num, rest] = valStr.toUpperCase().split('K');
    return <>{num}<span className="text-[0.6em] ml-1">K</span>{rest}</>;
  }
  return valStr;
};

export function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projects = PROJECTS;
  const loading = false;
  const project = projects.find(p => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const [galleryView, setGalleryView] = useState<'desktop' | 'mobile'>('desktop');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollY } = useScroll({ container: containerRef as any });
  const heroWhiteOverlayOpacity = useTransform(scrollY, [0, 800], [0, 1]);

  // Gallery Logic
  const galleryItems = Array.isArray(project?.gallery) ? project.gallery : [];
  
  const isFlow = (item: any) => {
    const src = (typeof item === 'string' ? item : item?.src || '').toLowerCase();
    return src.includes('flow') || src.includes('userflow');
  };

  const flowItem = galleryItems.find(isFlow);
  const flowImage = typeof flowItem === 'string' ? flowItem : flowItem?.src;

  const images = galleryItems
    .filter((item: any) => (item.type === 'desktop' || typeof item === 'string') && !isFlow(item))
    .map((item: any) => typeof item === 'string' ? item : item.src);

  const mobileImages = galleryItems
    .filter((item: any) => item.type === 'mobile' && !isFlow(item))
    .map((item: any) => item.src);

  useEffect(() => {
    if (images.length === 0 && mobileImages.length > 0) setGalleryView('mobile');
    else if (mobileImages.length === 0 && images.length > 0) setGalleryView('desktop');
  }, [images.length, mobileImages.length]);

  const handleScroll = () => {
    let isOverWhite = false;
    let isHeaderVisible = true;

    if (whiteSectionRef.current) {
      const rect = whiteSectionRef.current.getBoundingClientRect();
      if (rect.top <= 100) isHeaderVisible = false;
      if (rect.top > 100 || (rect.top <= 100 && rect.bottom >= 50)) isOverWhite = true;
    }

    if (resultsSectionRef.current) {
      const rect = resultsSectionRef.current.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 50) isOverWhite = true;
    }

    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setShowBackToTop(rect.top <= window.innerHeight);
    }

    window.dispatchEvent(new CustomEvent('header-theme', { detail: { isDark: isOverWhite } }));
    window.dispatchEvent(new CustomEvent('header-visibility', { detail: { isVisible: isHeaderVisible } }));
  };

  useEffect(() => {
    handleScroll();
    return () => {
      window.dispatchEvent(new CustomEvent('header-theme', { detail: { isDark: false } }));
    };
  }, [loading, project]);

  const currentGalleryImages = galleryView === 'desktop' ? images : (mobileImages.length > 0 ? mobileImages : images);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (loading) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
    </div>
  );

  if (!project) return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-center z-50">
      <h1 className="text-4xl font-display font-bold mb-8">Project Not Found</h1>
      <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:italic transition-all">Go back home</button>
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      onScroll={handleScroll}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-white text-zinc-900 z-30 overflow-y-auto"
    >
      <div className="sticky top-0 z-0 w-full flex flex-col min-h-screen pb-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="w-full h-[60vh] md:h-[70vh] bg-zinc-900 overflow-hidden">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={getAssetPath(project.videoUrl)} />
        </motion.div>

        <div className="pt-8 md:pt-12 px-6 md:px-16 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase mb-6">{project.title}</h1>
            <p className="text-base md:text-xl font-sans opacity-80 max-w-3xl">{project.description}</p>
          </motion.div>
        </div>

        <motion.div className="absolute inset-0 bg-white pointer-events-none z-10" style={{ opacity: heroWhiteOverlayOpacity }} />
      </div>

      <div ref={whiteSectionRef} className="relative z-10 bg-white text-zinc-900 w-full pt-24 pb-32">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col gap-24">
            <div className="w-full">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-8">The Story</h3>
              <ScrollOpacityText root={containerRef}>
                <p className="text-2xl md:text-4xl font-display font-medium leading-[1.2]">{project.story}</p>
              </ScrollOpacityText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-16 border-t border-black/10">
              <div>
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-8">KPIs</h3>
                <ul className="text-base font-sans space-y-3">
                  {(Array.isArray(project.kpis) ? project.kpis : []).map((kpi: string, i: number) => (
                    <li key={i} className="flex items-start gap-4"><span className="opacity-50">—</span> {kpi}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-8">Insights</h3>
                <ul className="text-base font-sans space-y-3">
                  {(Array.isArray(project.insights) ? project.insights : []).map((insight: string, i: number) => (
                    <li key={i} className="flex items-start gap-4"><span className="opacity-50">—</span> {insight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-8">Challenges</h3>
                <ul className="text-base font-sans space-y-3">
                  {(Array.isArray(project.designChallenges) ? project.designChallenges : []).map((challenge: string, i: number) => (
                    <li key={i} className="flex items-start gap-4"><span className="opacity-50">—</span> {challenge}</li>
                  ))}
                </ul>
              </div>
            </div>

            {flowImage && (
              <div className="w-full">
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-12">User flow</h3>
                <img src={getAssetPath(flowImage)} alt="User flow" className="w-full h-auto rounded-xl" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={gallerySectionRef} className="relative z-10 bg-black text-white w-full">
        {images.length > 0 && mobileImages.length > 0 && (
          <div className="flex justify-center pt-8 pb-4 z-50 pointer-events-none sticky top-24">
            <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md p-1 rounded-full pointer-events-auto border border-white/10">
              <button onClick={() => setGalleryView('desktop')} className={cn("px-6 py-2 rounded-full text-sm font-sans font-medium transition-all", galleryView === 'desktop' ? 'bg-white text-black' : 'text-white hover:text-white/80')}>Desk</button>
              <button onClick={() => setGalleryView('mobile')} className={cn("px-6 py-2 rounded-full text-sm font-sans font-medium transition-all", galleryView === 'mobile' ? 'bg-white text-black' : 'text-white hover:text-white/80')}>Mobile</button>
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={galleryView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <HorizontalScrollGallery images={currentGalleryImages} containerRef={containerRef} viewMode={galleryView} />
          </motion.div>
        </AnimatePresence>
      </div>

      {project.strategicInsight && (
        <div className="relative z-10 bg-zinc-50 text-zinc-900 w-full py-24 border-y border-zinc-100">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <div className="flex flex-col gap-12">
              <div className="w-full">
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest opacity-50 mb-8">Lead's Perspective</h3>
                <ScrollOpacityText root={containerRef}>
                  <p className="text-2xl md:text-5xl font-display font-medium leading-[1.1] tracking-tight max-w-5xl">
                    {project.strategicInsight.text}
                  </p>
                </ScrollOpacityText>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 pt-12 border-t border-zinc-200/50">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] opacity-40">Focus</span>
                <div className="flex flex-wrap gap-2">
                  {project.strategicInsight.pills.map((pill, i) => (
                    <span key={i} className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest px-4 py-2 bg-white border border-zinc-200 rounded-full text-zinc-600">
                      {pill}
                    </span>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.results && (
        <div ref={resultsSectionRef} className="relative z-10 bg-white text-zinc-900 w-full pt-32 pb-48">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-24 md:items-center">
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase whitespace-nowrap">Results</h2>
              <div className="flex flex-col md:flex-row flex-wrap gap-12 md:gap-32">
                {project.results.value1 && (
                  <div className="flex flex-col">
                    <span className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-2"><Counter value={project.results.value1} root={containerRef} /></span>
                    <span className="text-sm font-sans font-bold uppercase tracking-widest opacity-50">{project.results.label1}</span>
                  </div>
                )}
                {project.results.value2 && (
                  <div className="flex flex-col">
                    <span className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-2"><Counter value={project.results.value2} root={containerRef} /></span>
                    <span className="text-sm font-sans font-bold uppercase tracking-widest opacity-50">{project.results.label2}</span>
                  </div>
                )}
                {project.results.value3 && (
                  <div className="flex flex-col">
                    <span className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-2"><Counter value={project.results.value3} root={containerRef} /></span>
                    <span className="text-sm font-sans font-bold uppercase tracking-widest opacity-50">{project.results.label3}</span>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 bg-black text-white w-full py-16 border-t border-white/10">
        <div className="px-6 md:px-16 max-w-7xl mx-auto w-full flex flex-row justify-between items-center">
          {prevProject ? (
            <button onClick={() => { containerRef.current?.scrollTo({ top: 0 }); navigate(`/project/${prevProject.slug}`); }} className="group flex flex-col items-start gap-4 use-std-cursor">
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">Previous</span>
              <div className="flex items-center gap-4">
                <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
                <span className="text-xl md:text-3xl font-display font-black uppercase hidden md:block">{prevProject.title}</span>
              </div>
            </button>
          ) : <div />}
          {nextProject ? (
            <button onClick={() => { containerRef.current?.scrollTo({ top: 0 }); navigate(`/project/${nextProject.slug}`); }} className="group flex flex-col items-end gap-4 use-std-cursor">
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">Next</span>
              <div className="flex items-center gap-4">
                <span className="text-xl md:text-3xl font-display font-black uppercase hidden md:block">{nextProject.title}</span>
                <ArrowLeft size={24} className="group-hover:translate-x-2 transition-transform rotate-180" />
              </div>
            </button>
          ) : <div />}
        </div>
      </div>

      <div ref={footerRef} className="relative z-10 w-full bg-black text-white pt-32 pb-10 flex flex-col items-center">
        <BrandScroller />
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-center mt-32">
          <ShinyText text="Don't chase change." speed={3} />
          <br />
          <ShinyText text="Shape them." speed={3} />
        </h2>
        <div className="flex gap-12 mt-16 mb-20">
          <a href="mailto:fabiosecci@gmail.com" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Mail size={20} /></a>
          <a href="https://linkedin.com/in/fabiosecci/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={20} /></a>
        </div>
        <div className="w-full px-10 flex justify-between items-end opacity-30 mt-20">
          <div className="text-[10px] font-mono uppercase tracking-widest">© 2026 Fabio Secci</div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
