import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy, Medal, MapPin, Tv, Video, Newspaper, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetPath, cn } from '../../lib/utils';

interface CareerSource {
  text: string;
  url: string;
}

interface CareerItem {
  id: string;
  category: string;
  icon: React.ReactNode;
  achievements: string[];
  sources: CareerSource[];
  bgImageUrl?: string;
  bgVideoUrl?: string;
  period?: string;
}

const careerData: CareerItem[] = [
  {
    id: "intro",
    category: "Beyond",
    achievements: [],
    sources: [],
    bgVideoUrl: "/Career/career/Intro.mp4"
  },
  {
    id: "titles",
    category: "World & European Titles",
    period: "from 2018 to 2019",
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    achievements: ["Vice World Champion and European leader in Adaptive Wakesurf."],
    sources: [
      { text: "Unleashed Wake: Nautique Wakesurf Series", url: "https://unleashedwakemag.com/jodi-grassman-and-markus-lahmer-win-nautique-wakesurf-series/2019/06/14/" },
      { text: "4ActionSport: Secondo nel Mondo", url: "https://www.4actionsport.it/adaptive-wakesurf-fabio-secci-e-secondo-nel-mondo/" },
      { text: "City & City: Vice Campione del Mondo", url: "https://www.cityandcity.it/fabio-secci-e-vice-campione-del-mondo-di-adaptive-wake-surf/" },
      { text: "Surfcorner: Adaptive Wake Surf Victory", url: "http://www.surfcorner.it/2019/10/05/fabio-secci-vice-campione-del-mondo-di-adaptive-wake-surf/" }
    ],
    bgVideoUrl: "/Career/career/wake.mp4"
  },
  {
    id: "national-team",
    category: "National Team (Italy)",
    period: "from 2016 to 2019",
    icon: <Medal className="w-8 h-8 text-blue-400" />,
    achievements: ["Proudly representing Italy in the ISA World Adaptive Surfing Championships."],
    sources: [
      { text: "FISSW: Risultato Storico per l'Italia", url: "https://fissw.com/news/adaptive-surf-un-altro-risultato-storico-per-litalia/" },
      { text: "4ActionSport: Italia ISA World Championship", url: "https://www.4actionsport.it/italia-isa-world-adaptive-surfing-championship/" },
      { text: "Disabili.com: Sulla tavola con una disabilità", url: "https://www.disabili.com/home/ultimora/sulla-tavola-con-una-disabilita-ai-mondiali-di-adaptive-surf-c-e-anche-l-italia" },
      { text: "Medasa: Alla pari con surfisti senza disabilità", url: "https://www.medasa.it/cip-sardegna-fabio-secci-alla-pari-surfisti-senza-disabilita/" }
    ],
    bgVideoUrl: "/Career/career/Surf.mp4"
  },
  {
    id: "skyrace",
    category: "Skyrace Villacidro",
    period: "2018",
    icon: <Video className="w-8 h-8 text-pink-400" />,
    achievements: ["Conquering the rugged 10km Santu Miali mountain route in the heart of Sardinia."],
    sources: [
      { text: "Villacidro Skyrace: Oltre i tuoi limiti", url: "https://www.villacidroskyrace.it/vsr-blog/oltre-i-tuoi-limiti/" },
      { text: "SportSmall: Skyrace Coverage", url: "https://www.sportsmall.it/2018/04/13/running-ce-la-roma-appia-run-la-cento-chilometri-di-seregno-la-villacidro-skyrace-e-altro/" },
      { text: "Ufficio Stampa Cagliari: Press Feature", url: "https://ufficiostampacagliari.it/rassegnastampa.php?pagina=62766" },
      { text: "Sardegna Magazine: Sport Paralimpico", url: "https://www.sardegnamagazine.net/cagliari-sport-paralimpico-la-vera-vittoria-delluomo-moderno/" }
    ],
    bgVideoUrl: "/Career/career/Skyrace.mp4"
  },
  {
    id: "wakeboarding",
    category: "Wakeboarding",
    period: "2017",
    icon: <Video className="w-8 h-8 text-cyan-400" />,
    achievements: ["Advancing regional wakeboarding through regional initiatives and FISW testimonials."],
    sources: [
      { text: "Alliance Wake: Fabio Secci Story Challenge", url: "https://alliancewake.com/videos/Fabio-Secci-Story-Challenge/" },
      { text: "La Nuova Sardegna: Sardegna Open", url: "https://www.lanuovasardegna.it/sport/2026/04/27/news/sardegna-open-al-via-tanti-big-in-campo-a-cagliari-1.100861957" },
      { text: "Casteddu Online: Piccolo Eroe nel Surf", url: "https://www.castedduonline.it/fabio-secci-piccolo-eroe-volo-nel-surf-con-una-protesi-alla-gamba/" },
      { text: "FISSW: Testimonial Turisport Edition", url: "https://fissw.com/news/2017/con-la-fisw-fabio-secci-e-testimonial-della-37-edizione-di-turisport/" }
    ],
    bgVideoUrl: "/Career/career/Wakeboarding.mp4"
  },
  {
    id: "fyourlimit",
    category: "F.yourlimit",
    period: "from 2019 to 2023",
    icon: <Medal className="w-8 h-8 text-white" />,
    achievements: [
      "Four years of pure emotion, transforming the water into a sanctuary where every new soul discovers their own limitless horizon."
    ],
    sources: [],
    bgVideoUrl: "/Career/career/Fyourlimit.mp4"
  },
  {
    id: "wingfoiling",
    category: "Wingfoiling",
    period: "from 2023 to Present",
    icon: <Video className="w-8 h-8 text-indigo-400" />,
    achievements: ["Stay curious and never stop reaching for the next horizon."],
    sources: [],
    bgVideoUrl: "/Career/career/Wing.mp4"
  },
  {
    id: "sponsors",
    category: "Sponsors & Partners",
    period: "Partners",
    icon: <MapPin className="w-8 h-8 text-green-400" />,
    achievements: ["Empowered by world-class technical partners in prosthetic innovation."],
    sources: [
      { text: "Team ALPS: Official Athlete Profile", url: "https://easyliner.com/team-alps/fabio/" },
      { text: "WASP: No Limits Paralympic Athlete", url: "https://www.3dwasp.com/en/from-london-the-no-limits-paralimpic-athlete/" },
      { text: "Blatchford: Fabio's Elite 2 Story", url: "https://www.blatchfordmobility.com/en-gb/true-stories/non-microprocessor-feet/fabio-s-elite-2-story/" }
    ],
    bgVideoUrl: "/Career/career/protesi.mp4"
  },
  {
    id: "press",
    category: "Press & Media Coverage",
    period: "Media",
    icon: <Newspaper className="w-8 h-8 text-red-400" />,
    achievements: ["Featured globally for a journey that redefines the limits of adaptive sport."],
    sources: [
      { text: "La Repubblica: Storia di Fabio Secci", url: "https://www.repubblica.it/sport/vari/2017/11/24/news/storia_fabio_secci_mondiali_disabili-182006014/" },
      { text: "La Repubblica: Il cuore oltre le onde (Gallery)", url: "https://ricerca.repubblica.it/repubblica/archivio/repubblica/2017/11/12/secci-il-cuore-oltre-le-onde-sfida-i-marosi-della-californiaSardegna15.html" },
      { text: "Casteddu Online: Piccolo Eroe nel Surf", url: "https://www.castedduonline.it/fabio-secci-piccolo-eroe-volo-nel-surf-con-una-protesi-alla-gamba/" },
      { text: "Swellbound: Surfing in the ISA Worlds", url: "https://www.swellbound.org/home/2018/1/12/fabio-secci-surfing-in-the-isa-worlds" }
    ],
    bgVideoUrl: "/Career/career/Newspapers.mp4"
  },
  {
    id: "thanks",
    category: "Special Thanks",
    period: "Team",
    icon: <Medal className="w-8 h-8 text-white" />,
    achievements: [
      "A journey built with passion and shared with incredible people."
    ],
    sources: [
      { text: "Sara — Partner & Support", url: "" },
      { text: "My Family — Unwavering Support", url: "" },
      { text: "Alessandro — Cinematography", url: "" },
      { text: "Blatchford — Technical Partner", url: "" },
      { text: "ALPS — Technical Partner", url: "" },
      { text: "Porzio Group & Marco — Support", url: "" },
      { text: "CIP — Regional Support", url: "" }
    ],
    bgVideoUrl: "/Career/career/Intro.mp4"
  }
];

const CarouselSection: React.FC<{ data: CareerItem; index: number }> = ({ data, index }) => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.1 }); // Reduced threshold for more reliable trigger

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.muted = true; // Double-ensure muted for Safari
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.warn("Autoplay prevented:", err);
          }
        });
      }
    } else {
      video.pause();
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      ref={ref}
      className="relative w-full h-screen snap-start snap-always flex flex-col justify-end lg:justify-center overflow-hidden"
    >
      {/* Background Media */}
      <motion.div 
        className={data.bgVideoUrl ? "absolute inset-0 w-full h-full z-0" : "absolute inset-[-15%] w-[130%] h-[130%] z-0"}
        initial={data.bgVideoUrl ? { opacity: 0 } : { opacity: 0, x: "-4%", y: "-4%" }}
        animate={data.bgVideoUrl ? {
          opacity: isInView ? 0.85 : 0
        } : { 
          opacity: isInView ? 0.85 : 0,
          x: isInView ? ["-4%", "4%"] : "-4%",
          y: isInView ? ["-4%", "2%"] : "-4%",
          scale: isInView ? [1, 1.1] : 1
        }}
        transition={data.bgVideoUrl ? {
          opacity: { duration: 1.5, ease: "easeOut" }
        } : { 
          opacity: { duration: 1.5, ease: "easeOut" },
          x: { duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" },
          y: { duration: 28, ease: "linear", repeat: Infinity, repeatType: "reverse" },
          scale: { duration: 35, ease: "linear", repeat: Infinity, repeatType: "reverse" }
        }}
      >
        {data.bgVideoUrl ? (
          <video 
            ref={videoRef}
            key={data.bgVideoUrl}
            className={cn(
              "w-full h-full object-cover pointer-events-none select-none",
              data.id === 'wingfoiling' ? "scale-[1.2]" : ""
            )}
            src={getAssetPath(data.bgVideoUrl)}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${data.bgImageUrl})` }}
          />
        )}
        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </motion.div>      {/* Content Container */}
        <div className={cn(
          "relative z-10 w-full h-full flex flex-col items-center",
          (isMobile && data.sources.length > 0) ? "justify-start" : "justify-center lg:flex-row lg:justify-between"
        )}>
          
          {/* Achievements Text Area */}
          <div className={cn(
            "flex-1 w-full flex flex-col",
            (isMobile && data.sources.length > 0) 
              ? "justify-end pb-12 px-6" 
              : (isMobile || data.id === 'intro') 
                ? "h-full items-center justify-center px-6" 
                : "px-6 md:px-16 lg:px-32 justify-end lg:justify-center pb-12 lg:pb-0 h-full"
          )}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn("w-full", data.id === 'intro' ? "text-center" : "text-left")}
          >
            <div className={cn("flex items-center gap-4 mb-6", data.id === 'intro' ? "justify-center" : "justify-start")}>
              <h2 className={cn(
                "font-bold tracking-tight text-white drop-shadow-2xl uppercase flex items-center",
                data.id === 'intro' ? "text-4xl md:text-8xl lg:text-9xl tracking-[0.1em] justify-center text-center" : "text-2xl md:text-5xl"
              )}>
                <div className={cn("flex items-center", data.id === 'intro' ? "justify-center" : "justify-start")}>
                  {(data.id === 'intro' || !isMobile) && (
                    <motion.span
                      initial={{ x: 0, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block"
                    >
                      [
                    </motion.span>
                  )}
                  
                  <motion.div 
                    className="flex items-center overflow-hidden"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "auto" } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="w-2 md:w-4" /> {/* Leading space */}
                    {data.category.split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.4 + (i * 0.03), 
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <span className="w-2 md:w-4" /> {/* Trailing space */}
                  </motion.div>

                  {(data.id === 'intro' || !isMobile) && (
                    <motion.span
                      initial={{ x: 0, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block"
                    >
                      ]
                    </motion.span>
                  )}
                </div>
              </h2>
            </div>

            {data.id === 'intro' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? {
                  opacity: [0, 0.4, 0.4, 0],
                  y: [10, 0, 0, -10]
                } : { opacity: 0 }}
                transition={{ 
                  duration: 4, 
                  times: [0, 0.1, 0.9, 1],
                  delay: 1.8 
                }}
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-sans font-light text-white mt-4 text-center"
              >
                A journey beyond the professional, shaped by sport and a deep passion for the water.
              </motion.p>
            )}
            
            {data.achievements.length > 0 && !(data.id === 'thanks' && isMobile) && (
              <ul className={cn("space-y-4", data.id === 'fyourlimit' && "lg:max-w-[60%]")}>
                {data.achievements.map((achievement, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                    className="text-lg md:text-xl text-gray-200 leading-relaxed font-light"
                  >
                    <span className="text-left">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

          {data.id === 'thanks' && (
            <>
              {/* Desktop version */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                whileHover={{ opacity: 1, x: 5 }}
                onClick={() => {
                  const container = document.getElementById('career-scroll-container');
                  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden lg:flex absolute bottom-12 left-6 md:left-16 lg:left-32 z-30 items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white transition-all group pointer-events-auto"
              >
                <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-12 transition-all" />
                Back to the beginning
              </motion.button>

              {/* Mobile version - more visible bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:hidden absolute bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-sm py-8 px-6 z-40 border-t border-white/5"
              >
                <button
                  onClick={() => {
                    const container = document.getElementById('career-scroll-container');
                    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-white/90"
                >
                  <div className="w-4 h-[1px] bg-white/30" />
                  Back to the beginning
                  <div className="w-4 h-[1px] bg-white/30" />
                </button>
              </motion.div>
            </>
          )}
        </div>

        {/* Links / Sources White Sidebar - Only show if there are sources */}
        {data.sources.length > 0 && (
          <motion.div 
            className="w-full lg:w-96 lg:h-full bg-white flex flex-col justify-center p-8 lg:p-12 shadow-2xl relative z-20"
            initial={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 100 : 0 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 100 : 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-8">
              {data.period || "Sources"}
            </h3>
            
            <motion.div 
              className="flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {data.sources.map((source, i) => (
                <motion.a 
                  key={i}
                  href={source.url || undefined}
                  target={source.url ? "_blank" : undefined}
                  rel={source.url ? "noopener noreferrer" : undefined}
                  variants={itemVariants}
                  className={cn(
                    "group flex items-center justify-between py-5 border-b border-zinc-100 last:border-0 transition-all duration-300",
                    !source.url && "cursor-default pointer-events-none"
                  )}
                >
                   <span className={cn(
                    "text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors flex-1 mr-4 leading-relaxed",
                    source.url ? "text-zinc-900 group-hover:text-zinc-500" : "text-zinc-600 font-black"
                  )}>
                    {source.text}
                  </span>
                  {source.url && (
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-all duration-300">
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors duration-300" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
        
      </div>
      
      {/* Scroll indicator for the intro section */}
      {data.id === 'intro' && (
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">Discover</span>
          <div className="w-[22px] h-[36px] border-2 border-white/20 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ 
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default function Beyond() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroExpanded, setIsIntroExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const logoExpanded = isHovered || isIntroExpanded;
  const TOTAL_SLIDES = careerData.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroExpanded(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPosition = target.scrollTop;
    const viewportHeight = window.innerHeight;
    const newIndex = Math.round(scrollPosition / viewportHeight);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < TOTAL_SLIDES) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    const container = document.getElementById('career-scroll-container');
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-black text-white relative"
    >
      {/* Fixed Header/Nav */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/" className="hover:opacity-70 transition-opacity">
            <div 
              className={`flex items-center transition-colors duration-500 text-white`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
          </Link>
        </div>
      </header>

      {/* Close Icon */}
      <Link 
        to="/" 
        className={cn(
          "fixed top-8 right-6 md:right-10 lg:right-12 z-[110] transition-all duration-500",
          (careerData[activeIndex]?.sources.length === 0) 
            ? "text-white opacity-40 hover:opacity-100" 
            : "text-white lg:text-zinc-900 opacity-40 hover:opacity-100"
        )}
      >
        <X size={32} strokeWidth={1.5} />
      </Link>

      {/* Snap Scrolling Container */}
      <div 
        id="career-scroll-container"
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
        onScroll={handleScroll}
      >
        {careerData.map((data, index) => (
          <CarouselSection key={data.id} data={data} index={index} />
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
        className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-start gap-2"
      >
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => {
          const dotColor = 'bg-white';
          const dotOpacity = 'bg-white/30';
          const hoverColor = 'hover:bg-white/70';

          return (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className="group py-1 flex justify-start cursor-pointer relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`transition-all duration-700 ease-out relative overflow-hidden ${
                i === activeIndex 
                  ? `${dotColor} w-6 md:w-8 h-[1.5px]` 
                  : `${dotOpacity} w-3 md:w-4 h-[1px] ${hoverColor} group-hover:w-6 md:group-hover:w-7`
              }`}>
                {activeIndex === 0 && i === 0 && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                    className="absolute inset-0 w-full h-full bg-white/80"
                  />
                )}
              </div>
            </button>
          );
        })}
      </motion.div>
      
      <style>{`
        /* Hide scrollbar for cleaner look */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.main>
  );
}
