import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Dog, GraduationCap, X, Clock, Headphones, RefreshCw, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import BounceCards from './BounceCards';

const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return '/' + path.replace(/^\/+/, '');
};

const BRANDS = [
  '/Brands/0BgrnDtZsiw89IJFIiuvrbwJiKI.avif',
  '/Brands/1ULi72BQs2VaBHnaOeD4C3y8Fw.avif',
  '/Brands/33KRGeiC8U6lfCaqVJg5xNslhg.avif',
  '/Brands/TIcCzBe5SPt8fv3hVaXsMs6fGQo.avif',
  '/Brands/TOIQFStYoBqXsOH4j07VJf0B8.avif',
  '/Brands/TQMgrkzQfI8zdVPsUn6emniKzWE.avif',
  '/Brands/t8kRBBfnOfCWVblGlnUByGnWTvI.avif',
  '/Brands/vcfRGgsVP2bZBoEc1txx8NZK3z8.avif',
  '/Brands/z8hpkWybHzbkbD9oBb7GaeskoA.avif',
];


const NDS_EASE = [0.19, 1, 0.22, 1];
const APPLE_EASE = [0.16, 1, 0.3, 1];

const Highlighter = ({ children, delay = 0.8, color = "var(--novartis-primary)" }) => {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay, ease: NDS_EASE }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          height: '60%',
          backgroundColor: color,
          zIndex: -1,
          opacity: 0.8,
          borderRadius: '4px'
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
};

const RotatingGreeting = () => {
  const greetings = ["CIAO.", "HELLO.", "HOLA.", "OLÁ.", "SALUT.", "HALLO."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [greetings.length]);

  const currentWord = greetings[index].split("");

  return (
    <div style={{ 
      height: 'clamp(8rem, 15vw, 18rem)', 
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center'
    }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={greetings[index]}
          style={{ display: 'flex', position: 'absolute' }}
        >
          {currentWord.map((char, i) => (
            <motion.span
              key={`${greetings[index]}-${i}`}
              initial={{ y: 80, opacity: 0, rotateX: -90, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ y: -80, opacity: 0, rotateX: 90, filter: 'blur(10px)' }}
              transition={{ 
                duration: 1, 
                ease: APPLE_EASE,
                delay: i * 0.05 
              }}
              style={{
                fontSize: 'clamp(8rem, 15vw, 18rem)',
                lineHeight: 0.8,
                fontWeight: 900,
                letterSpacing: '-0.07em',
                textTransform: 'uppercase',
                display: 'inline-block',
                transformOrigin: 'center center',
                perspective: '1000px',
                color: 'inherit'
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const RoleRotation = () => {
  const roles = ["SYSTEMS ARCHITECT.", "ORCHESTRATOR."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      overflow: 'visible'
    }}>
      <div style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, opacity: 0.2 }}>THE</div>
      <div style={{ 
        height: 'clamp(4rem, 8vw, 10rem)', 
        position: 'relative',
        display: 'flex',
        alignItems: 'baseline'
      }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={roles[index]}
            style={{ display: 'flex' }}
          >
            {roles[index].split("").map((char, i) => (
              <motion.span
                key={`${roles[index]}-${i}`}
                initial={{ y: 40, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -40, opacity: 0, rotateX: 90 }}
                transition={{ 
                  duration: 0.8, 
                  ease: NDS_EASE,
                  delay: i * 0.03 
                }}
                style={{
                  fontSize: 'clamp(4rem, 7.5vw, 10rem)',
                  lineHeight: 0.8,
                  fontWeight: 900,
                  letterSpacing: '-0.07em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  transformOrigin: 'center center',
                  perspective: '1000px',
                  whiteSpace: char === ' ' ? 'pre' : 'normal'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ValuesRotation = () => {
  const values = ["INSPIRED.", "CURIOUS.", "UNBOSSED."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % values.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [values.length]);

  const currentWord = values[index].split("");

  return (
    <div style={{ 
      height: 'clamp(8rem, 15vw, 18rem)', 
      width: 'auto', 
      position: 'relative',
      display: 'flex',
      alignItems: 'baseline'
    }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={values[index]}
          style={{ display: 'flex' }}
        >
          {currentWord.map((char, i) => (
            <motion.span
              key={`${values[index]}-${i}`}
              initial={{ y: 60, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -60, opacity: 0, rotateX: 90 }}
              transition={{ 
                duration: 0.8, 
                ease: NDS_EASE,
                delay: i * 0.05 
              }}
              style={{
                fontSize: 'clamp(8rem, 15vw, 18rem)',
                lineHeight: 0.8,
                fontWeight: 900,
                letterSpacing: '-0.07em',
                textTransform: 'uppercase',
                display: 'inline-block',
                transformOrigin: 'center center',
                perspective: '1000px',
                color: 'white'
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Slide = ({ children, background = "white", color = "black", custom, fullWidth = false }) => {
  const variants = {
    initial: (c) => {
      const dir = c?.direction ?? 1;
      const t = c?.type ?? "horizontal";
      return {
        x: t === "vertical" ? 0 : (dir > 0 ? '100%' : '-100%'),
        y: t === "vertical" ? (dir > 0 ? '100%' : '-100%') : 0,
        opacity: 0
      };
    },
    animate: { 
      x: 0, 
      y: 0, 
      opacity: 1 
    },
    exit: (c) => {
      const dir = c?.direction ?? 1;
      const t = c?.type ?? "horizontal";
      return {
        x: t === "vertical" ? 0 : (dir > 0 ? '-100%' : '100%'),
        y: t === "vertical" ? (dir > 0 ? '-100%' : '100%') : 0,
        opacity: 0
      };
    }
  };

  return (
    <motion.div
      custom={custom}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: APPLE_EASE }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: background === 'deep-blue' ? 'var(--novartis-secondary)' : 
                    background === 'orange' ? 'var(--novartis-primary)' : 
                    background === 'white' ? '#ffffff' : 
                    background === 'flag-italy' ? 'linear-gradient(to right, #008C45 33.33%, #FFFFFF 33.33% 66.66%, #CD212A 66.66%)' : 
                    background,
        color: color === 'white' ? '#ffffff' : 'var(--text-primary)',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        zIndex: 11
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 12, 
        width: '100%', 
        maxWidth: fullWidth ? 'none' : '1600px', 
        height: '100%',
        margin: fullWidth ? '0' : '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: fullWidth ? '0' : '0 8vw'
      }}>
        {children}
      </div>
    </motion.div>
  );
};

const PresentationPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [introStage, setIntroStage] = useState(0); 
  const [transitionType, setTransitionType] = useState("horizontal");

  const slides = [
    {
      id: 1,
      headline: <RotatingGreeting />,
      subHeader: "I’m Fabio Secci",
      body: <span>Your <Highlighter delay={1.2} color="rgba(255,255,255,0.2)">Head of DD&IT EXP Design</Highlighter></span>,
      background: "orange",
      color: "white",
      layout: "intro-split",
      transition: "horizontal"
    },
    {
      id: 2,
      category: "[Heritage]",
      headline: "MADE IN ITALY.",
      body: <span>Born in Sardinia, <Highlighter delay={1}>crafted</Highlighter> around the world.</span>,
      background: "flag-italy",
      color: "black",
      centered: true,
      layout: "centered",
      transition: "vertical"
    },
    {
      id: 3,
      category: "[Experience]",
      headline: "GLOBAL BRANDS.",
      body: (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '4rem 6rem', 
          marginTop: '4rem',
          alignItems: 'center',
          justifyItems: 'center',
          maxWidth: '1200px'
        }}>
          {BRANDS.map((brand, idx) => (
            idx === 0 ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: APPLE_EASE }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#666666',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}
              >
                THE BIG NOW
              </motion.div>
            ) : (
              <motion.img
                key={idx}
                initial={{ opacity: 0, y: 40, rotateX: -45, scale: 0.8 }}
                animate={{ opacity: 0.6, y: 0, rotateX: 0, scale: 1 }}
                transition={{ 
                  delay: 0.6 + (idx * 0.08), 
                  duration: 1, 
                  ease: APPLE_EASE 
                }}
                src={getAssetPath(brand)}
                alt="Brand"
                style={{ width: 'auto', maxHeight: '55px', filter: 'brightness(0)', transformOrigin: 'center top' }}
              />
            )
          ))}
        </div>
      ),
      background: "white",
      color: "black",
      transition: "horizontal"
    },
    {
      id: 4,
      category: "[DNA]",
      headline: "DON’T CHASE\nCHANGE — SHAPE IT.",
      body: [
        <span>Smoothing <Highlighter delay={1}>friction</Highlighter></span>,
        <span>Driving <Highlighter delay={1.2}>efficiency</Highlighter></span>,
        <span>Growing together. Finding <Highlighter delay={1.4}>purpose</Highlighter>.</span>
      ],
      background: "deep-blue",
      color: "white",
      layout: "bullets",
      transition: "horizontal"
    },
    {
      id: 5,
      category: "[DNA]",
      headline: "RADICALLY\nTRANSPARENT.",
      body: <span>Clarity is the <Highlighter delay={1}>highest form of respect</Highlighter>. I believe in open doors and direct, human conversations.</span>,
      background: "white",
      color: "black",
      accent: { word: "TRANSPARENT", color: "var(--novartis-primary)" },
      transition: "horizontal"
    },
    {
      id: 6,
      category: "[Vision]",
      headline: <RoleRotation />,
      body: <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>Ask <Highlighter delay={1}>why.</Highlighter></div>
        <div>Hypothesize, experiment, <Highlighter delay={1.6}>iterate.</Highlighter></div>
        <div>Prove or disprove, document.</div>
        <div><Highlighter delay={1.9}>Build shared truths.</Highlighter></div>
      </div>,
      background: "white",
      color: "black",
      transition: "horizontal"
    },
    {
      id: 7,
      category: "[First weeks]",
      headline: <ValuesRotation />,
      background: "deep-blue",
      color: "white",
      layout: "grid",
      items: [
        { 
          icon: <Headphones size={40} strokeWidth={1} color="var(--novartis-primary)" />, 
          title: "LISTEN AND LEARN", 
          desc: <span>Learning with & from <Highlighter delay={1.4}>everyone.</Highlighter></span> 
        },
        { 
          icon: <Clock size={40} strokeWidth={1} color="var(--novartis-primary)" />, 
          title: "8-MINUTE RULE", 
          desc: <span><Highlighter delay={1.2}>Skills,</Highlighter> <Highlighter delay={1.4}>experiences,</Highlighter> and <Highlighter delay={1.6}>challenges.</Highlighter></span> 
        },
        { 
          icon: <RefreshCw size={40} strokeWidth={1} color="var(--novartis-primary)" />, 
          title: "GROWTH", 
          desc: <span>Our <Highlighter delay={1.2}>purpose.</Highlighter> Finding <Highlighter delay={1.4}>what</Highlighter> and <Highlighter delay={1.6}>how.</Highlighter></span> 
        }
      ],
      transition: "horizontal"
    },
    {
      id: 8,
      category: "[Beyond]",
      headline: "outside Work.",
      body: (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          marginTop: '1rem'
        }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 300, opacity: 0.8, whiteSpace: 'nowrap' }}>
            Nature, water, Cicci & Hugo 🐾 are my <Highlighter delay={1}>creative fuel</Highlighter> and <Highlighter delay={1.4}>reset</Highlighter>.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-4.5rem', width: '100%', paddingLeft: '8rem' }}>
            <BounceCards
              className="custom-bounceCards"
              images={[
                getAssetPath("/Videos/Wake.mp4"),
                getAssetPath("/Videos/Cicci-hugo.mp4"),
                getAssetPath("/Videos/Wing.mp4")
              ]}
              containerWidth={1200}
              containerHeight={550}
              animationDelay={1}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={[
                "rotate(-10deg) translate(-350px)",
                "rotate(0deg) translate(0px)",
                "rotate(10deg) translate(350px)"
              ]}
              enableHover={false}
              cardWidth={350}
            />
          </div>
        </div>
      ),
      background: "white",
      color: "black",
      yOffset: "12vh",
      transition: "horizontal"
    },
    {
      id: 9,
      headline: "GOT 8\nMINUTES?",
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          <span>Let's grab a <Highlighter delay={1} color="var(--novartis-primary)">coffee</Highlighter>.</span>
          <motion.div
            animate={{ 
              rotate: [-30, 30],
              y: [0, -10, 0]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Coffee size={80} strokeWidth={1} color="white" />
          </motion.div>
        </div>
      ),
      background: "deep-blue",
      color: "white",
      centered: true,
      transition: "horizontal"
    }
  ];

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    
    // Handle multi-stage slides
    if (current.layout === 'intro-split' && introStage === 0) {
      setIntroStage(1);
      return;
    }
    
    if (current.category === '[Heritage]' && introStage === 0) {
      setIntroStage(1);
      return;
    }

    const nextIndex = (currentSlide + 1) % slides.length;
    const type = slides[nextIndex].transition || "horizontal";
    
    setTransitionType(type);
    setDirection(1);
    setIntroStage(0);
    setCurrentSlide(nextIndex);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    
    if (introStage > 0) {
      setIntroStage(0);
      return;
    }

    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    const type = slides[prevIndex].transition || "horizontal";
    
    setTransitionType(type);
    setDirection(-1);
    setCurrentSlide(prevIndex);
    
    // Set to last stage if it's a multi-stage slide
    if (slides[prevIndex].layout === 'intro-split' || slides[prevIndex].category === '[Heritage]') {
      setIntroStage(1);
    } else {
      setIntroStage(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, introStage]);

  const current = slides[currentSlide];

  const renderHeadline = (text, accent) => {
    if (typeof text !== 'string') return text;
    if (!accent) return text.split('\n').map((line, i) => <div key={i}>{line}</div>);
    const parts = text.split(accent.word);
    return (
      <React.Fragment>
        {parts[0]}
        <span style={{ color: accent.color }}>{accent.word}</span>
        {parts[1]}
      </React.Fragment>
    );
  };

  const getBodyColor = () => {
    if (current.background === 'deep-blue' || current.background === 'orange') return 'rgba(255, 255, 255, 0.9)';
    return 'rgba(0, 0, 0, 0.6)';
  };

  return (
    <div 
      onClick={nextSlide}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-main)',
        cursor: 'default'
      }}
    >
      <Link 
        to="/" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '40px',
          right: '40px',
          zIndex: 1000,
          color: current.color === 'white' ? 'white' : 'black',
          opacity: 0.4,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.4}
      >
        <X size={32} strokeWidth={1.5} />
      </Link>

      <AnimatePresence mode="popLayout" custom={{ direction, type: transitionType }} initial={false}>
        <Slide 
          key={currentSlide}
          background={current.background} 
          color={current.color} 
          custom={{ direction, type: transitionType }}
          fullWidth={!!current.content || current.layout === 'education'}
        >
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: current.content ? 'row' : 'column', 
            justifyContent: current.content ? 'stretch' : 'center' 
          }}>
            {current.layout === 'intro-split' ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative'
              }}>
                <motion.div 
                  animate={{ 
                    x: introStage === 0 ? 0 : '-22vw',
                    scale: introStage === 0 ? 1 : 0.85
                  }}
                  transition={{ duration: 1.4, ease: APPLE_EASE }}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    position: introStage === 0 ? 'relative' : 'absolute'
                  }}
                >
                  {current.headline}
                </motion.div>

                <AnimatePresence>
                  {introStage === 1 && (
                    <motion.div 
                      key="intro-content"
                      initial={{ opacity: 0, x: 200, filter: 'blur(20px)' }}
                      animate={{ opacity: 1, x: '22vw', filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 200, filter: 'blur(20px)' }}
                      transition={{ duration: 1.4, ease: APPLE_EASE, delay: 0.1 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4vw',
                        position: 'absolute'
                      }}
                    >
                      <motion.div 
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.2, ease: NDS_EASE, delay: 0.4 }}
                        style={{
                          width: '1px',
                          height: '40vh',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          transformOrigin: 'center'
                        }}
                      />
                      <div style={{ maxWidth: '40vw' }}>
                        <div style={{ fontSize: '4.5rem', fontWeight: 300, marginBottom: '1rem', lineHeight: 1 }}>
                          {current.subHeader}
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 300, opacity: 0.8, lineHeight: 1.2 }}>
                          {current.body}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : current.category === '[Heritage]' ? (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                  animate={{ 
                    y: introStage === 0 ? 0 : '-18vh',
                    x: introStage === 0 ? 0 : '0',
                    scale: introStage === 0 ? 1 : 0.85
                  }}
                  transition={{ duration: 1.2, ease: APPLE_EASE }}
                  style={{ textAlign: 'left', width: '100%', zIndex: 20 }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'monospace', opacity: 0.3 }}>
                    {current.category}
                  </div>
                  <div style={{ fontSize: 'clamp(5rem, 11vw, 12rem)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.07em', textTransform: 'uppercase' }}>
                    {renderHeadline(current.headline, current.accent)}
                  </div>
                  <div style={{ marginTop: '2.5rem', fontSize: '2.2rem', fontWeight: 400, opacity: 1, color: '#000000' }}>
                    {current.body}
                  </div>
                </motion.div>

                <AnimatePresence>
                  {introStage === 1 && (
                    <>
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: 0, opacity: 0 }}
                        transition={{ duration: 1.2, ease: APPLE_EASE }}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 'calc(-50vw + 50%)',
                          width: '100vw',
                          height: '50vh',
                          backgroundColor: '#FFFFFF',
                          opacity: 1,
                          zIndex: 15
                        }}
                      />
                      <motion.div
                        key="heritage-stage-2"
                        initial={{ opacity: 0, y: 100, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.2 }}
                        style={{ 
                          position: 'absolute', 
                          top: '50vh',
                          paddingTop: '40px',
                          left: 0, 
                          width: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          gap: '2rem',
                          zIndex: 20
                        }}
                      >
                        <div style={{ fontSize: '2.4rem', fontWeight: 300, color: '#000000' }}>
                          Based in <Highlighter delay={0.6}>Barcelona</Highlighter>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.4 }}
                        style={{
                          width: '100vw',
                          height: '40vh',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          position: 'absolute',
                          bottom: 0, 
                          left: '-10vw',   
                          overflow: 'hidden',
                          pointerEvents: 'none',
                          zIndex: 16
                        }}
                      >
                        <svg 
                          fill="var(--color-muted)" 
                          style={{ width: '100%', height: '100%', maxHeight: '35vh', display: 'block', opacity: 0.2 }}
                          viewBox="0 0 32 31" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier"> 
                            <path id="barcelona_2_" d="M24,19.36c-0.199,0-0.36-0.161-0.36-0.36v-2c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v2 C24.36,19.199,24.199,19.36,24,19.36z M8,19.36c-0.199,0-0.36-0.161-0.36-0.36v-2c0-0.199,0.161-0.36,0.36-0.36S8.36,16.801,8.36,17 v2C8.36,19.199,8.199,19.36,8,19.36z M20,17.36c-0.199,0-0.36-0.161-0.36-0.36v-2c0-0.199,0.161-0.36,0.36-0.36 s0.36,0.161,0.36,0.36v2C20.36,17.199,20.199,17.36,20,17.36z M12,17.36c-0.199,0-0.36-0.161-0.36-0.36v-2 c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v2C12.36,17.199,12.199,17.36,12,17.36z M16.5,23c0,0.276-0.224,0.5-0.5,0.5 s-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5C16.276,22.5,16.5,22.724,16.5,23z M22,24.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5 s0.5-0.224,0.5-0.5S22.276,24.5,22,24.5z M26,26.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5 S26.276,26.5,26,26.5z M10,24.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S10.276,24.5,10,24.5z M6,26.5 c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S6.276,26.5,6,26.5z M18.322,27.839l-1-2 c-0.122-0.243-0.522-0.244-0.644,0L16,27.195l-0.678-1.356c-0.121-0.244-0.522-0.244-0.644,0l-1,2 c-0.025,0.05-0.038,0.105-0.038,0.161v3h0.72v-2.915l0.64-1.28l0.64,1.28V31h0.72v-2.915l0.64-1.28l0.64,1.28V31h0.721v-3 C18.36,27.944,18.347,27.889,18.322,27.839z M6.36,29H5.64v2h0.72C6.36,31,6.36,29,6.36,29z M10.36,29H9.64v2h0.72 C10.36,31,10.36,29,10.36,29z M22.36,29h-0.72v2h0.721L22.36,29L22.36,29z M26.36,29h-0.72v2h0.721L26.36,29L26.36,29z M28.3,26.801 l-1.94-2.909l-0.009-7.97l-1.957-8.807l0.86-0.86c0.141-0.141,0.141-0.368,0-0.509l-1-1c-0.141-0.141-0.369-0.141-0.51,0l-1,1 c-0.141,0.141-0.141,0.368,0,0.509l0.861,0.861l-1.539,6.954L20.383,3.126l0.872-0.872c0.141-0.141,0.141-0.368,0-0.509l-1-1 c-0.141-0.141-0.369-0.141-0.51,0l-1,1c-0.141,0.141-0.141,0.368,0,0.509l0.872,0.872l-1.861,12.116l-1.362-6.128l0.861-0.86 c0.141-0.141,0.141-0.368,0-0.509l-1-1c-0.141-0.141-0.368-0.141-0.509,0l-1,1c-0.141,0.141-0.141,0.368,0,0.509l0.86,0.86 l-1.358,6.126L12.384,3.125l0.871-0.871c0.141-0.141,0.141-0.368,0-0.509l-1-1c-0.141-0.141-0.368-0.141-0.509,0l-1,1 c-0.141,0.141-0.141,0.368,0,0.509l0.871,0.871L9.936,14.05L8.394,7.114l0.86-0.86c0.141-0.141,0.141-0.368,0-0.509l-1-1 c-0.141-0.141-0.368-0.141-0.509,0l-1,1c-0.141,0.141-0.141,0.368,0,0.509l0.86,0.86L5.64,16v7.892l-1.939,2.909 C3.661,26.859,3.64,26.929,3.64,27v4h0.72v-3.891L6,24.649l1.64,2.46V31h0.72v-3.964l1.64-8.2l1.64,8.2V31h0.72l-0.008-3.904 L16,18.887l3.64,8.189V31h0.721l-0.008-3.93h0.001L22,18.836l1.64,8.195V31h0.721v-3.891l1.64-2.46l1.64,2.46V31h0.721v-4 C28.36,26.929,28.339,26.859,28.3,26.801z M7.509,6L8,5.509L8.491,6L8,6.491L7.509,6z M9.64,16.963l-1.823,9.114L6.36,23.891 l-0.008-7.813l1.649-7.422L9.64,16V16.963z M19.509,2L20,1.509L20.491,2L20,2.491L19.509,2z M16,7.509L16.491,8L16,8.491L15.509,8 L16,7.509z M11.509,2L12,1.509L12.491,2L12,2.491L11.509,2z M12.022,25.276l-1.663-8.314l-0.007-0.908l0.003,0.001L12,5.365 L13.64,16v1.98L12.022,25.276z M16.329,17.854c-0.116-0.26-0.542-0.26-0.658,0l-2.539,5.712L16,10.658l2.881,12.94L16.329,17.854z M21.64,16.968l-1.658,8.29l-1.622-7.297l-0.005-1.906L20,5.368l1.64,10.655V16.968z M23.509,6L24,5.509L24.491,6L24,6.491L23.509,6 z M25.64,23.892l-1.457,2.186l-1.822-9.111l-0.008-0.889l1.649-7.422L25.64,16V23.892z"></path> 
                          </g>
                        </svg>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ maxWidth: '1400px', width: '100%', marginTop: current.yOffset || 0 }}>
                {current.category && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.3 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 300,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '1.5rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    {current.category}
                  </motion.div>
                )}
                <motion.div 
                  initial={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 1, ease: APPLE_EASE, delay: 0.2 }}
                  style={{ textAlign: current.centered ? 'center' : 'left', width: '100%' }}
                >
                  <div style={{
                    fontSize: 'clamp(5rem, 11vw, 12rem)',
                    lineHeight: 0.8,
                    margin: 0,
                    fontWeight: 900,
                    letterSpacing: '-0.07em',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line'
                  }}>
                    {renderHeadline(current.headline, current.accent)}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
                  style={{ width: '100%' }}
                >
                  {current.body && (
                    <div style={{ 
                      marginTop: '3.5rem',
                      fontSize: '2.2rem',
                      lineHeight: 1.1,
                      fontWeight: 300,
                      textAlign: current.centered ? 'center' : 'left',
                      maxWidth: current.centered ? '100%' : '900px',
                      letterSpacing: '-0.01em',
                      color: getBodyColor()
                    }}>
                      {Array.isArray(current.body) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                          {current.body.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: current.centered ? 'center' : 'flex-start' }}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        current.body
                      )}
                    </div>
                  )}

                  {current.layout === 'grid' && (
                    <div style={{ marginTop: '5rem' }}>
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' }}>
                        {current.items.map((item, idx) => (
                          <div key={idx}>
                            <div style={{ marginBottom: '2rem' }}>{item.icon}</div>
                            <h3 style={{ 
                              fontSize: 'clamp(1.5rem, 2.1vw, 2.2rem)', 
                              fontWeight: 800, 
                              textTransform: 'uppercase', 
                              marginBottom: '1rem', 
                              letterSpacing: '-0.04em' 
                            }}>
                              {item.title}
                            </h3>
                            <div style={{ 
                              color: getBodyColor(), 
                              fontSize: 'clamp(1.2rem, 1.6vw, 1.7rem)', 
                              fontWeight: 300, 
                              lineHeight: 1.35 
                            }}>
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                      {current.footer && (
                        <div style={{ marginTop: '5rem' }}>
                          {current.footer}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </div>
        </Slide>
      </AnimatePresence>
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
        zIndex: 100,
        pointerEvents: 'none'
      }}>
        <img 
          src={getAssetPath("/novartis-logo.png")} 
          alt="Novartis" 
          style={{ 
            height: '25px', 
            opacity: current.background === 'white' ? 0.6 : 0.8,
            filter: (current.background === 'white' || current.background === '#ffffff') 
              ? 'brightness(0)' 
              : 'brightness(0) invert(1)' 
          }} 
        />
      </div>

    </div>
  );
};

export default PresentationPage;
