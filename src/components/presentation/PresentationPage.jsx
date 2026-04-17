import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Dog, GraduationCap, X, Clock, Headphones, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import BounceCards from './BounceCards';

const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return '/' + path.replace(/^\/+/, '');
};


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

const Slide = ({ children, background = "white", color = "black", direction = 1 }) => {
  return (
    <motion.div
      initial={{ x: direction > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
      transition={{ duration: 1, ease: APPLE_EASE }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: background === 'deep-blue' ? 'var(--novartis-secondary)' : 
                    background === 'orange' ? 'var(--novartis-primary)' : 
                    background === 'white' ? '#ffffff' : background,
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
        maxWidth: '1600px', 
        height: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw'
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

  const slides = [
    {
      id: 1,
      headline: <RotatingGreeting />,
      subHeader: "I’m Fabio Secci",
      body: <span>Your <Highlighter delay={1.2} color="rgba(255,255,255,0.2)">Head of Design</Highlighter></span>,
      background: "orange",
      color: "white",
      layout: "intro-split"
    },
    {
      id: 2,
      category: "[DNA]",
      headline: "DON’T CHASE\nCHANGE — SHAPE IT.",
      body: [
        <span>Smoothing <Highlighter delay={1}>friction</Highlighter></span>,
        <span>Driving <Highlighter delay={1.2}>efficiency</Highlighter></span>,
        <span>Growing together. Finding <Highlighter delay={1.4}>purpose</Highlighter>.</span>
      ],
      background: "deep-blue",
      color: "white",
      layout: "bullets"
    },
    {
      id: 3,
      category: "[DNA]",
      headline: "RADICALLY\nTRANSPARENT.",
      body: <span>Clarity is the <Highlighter delay={1}>highest form of respect</Highlighter>. I believe in open doors and direct, human conversations.</span>,
      background: "white",
      color: "black",
      accent: { word: "TRANSPARENT", color: "var(--novartis-primary)" }
    },
    {
      id: 4,
      category: "[Vision]",
      headline: <RoleRotation />,
      body: <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>Ask <Highlighter delay={1}>why.</Highlighter></div>
        <div>Hypothesize, experiment, <Highlighter delay={1.6}>iterate.</Highlighter></div>
        <div>Prove or disprove, document.</div>
        <div><Highlighter delay={1.9}>Build shared truths.</Highlighter></div>
      </div>,
      background: "white",
      color: "black"
    },
    {
      id: 5,
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
      ]
    },
    {
      id: 6,
      category: "[Beyond]",
      headline: "outside Work:",
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
      yOffset: "12vh"
    },

    {
      id: 7,
      headline: "GOT 8\nMINUTES?",
      body: <span>Let's grab a <Highlighter delay={1} color="var(--novartis-primary)">coffee</Highlighter>.</span>,
      background: "deep-blue",
      color: "white",
      centered: true
    }
  ];

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    if (currentSlide === 0 && introStage === 0) {
      setIntroStage(1);
      return;
    }
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (currentSlide === slides.length - 1) setIntroStage(0);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    if (currentSlide === 0 && introStage === 1) {
      setIntroStage(0);
      return;
    }
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <Slide 
          key={currentSlide}
          background={current.background} 
          color={current.color} 
          direction={direction}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                        <div style={{ fontSize: '2.4rem', fontWeight: 300, opacity: 0.8, lineHeight: 1.2 }}>
                          {current.body}
                        </div>
                      </div>
                    </motion.div>
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
            height: '35px', 
            opacity: current.background === 'white' ? 0.35 : 0.5,
            filter: current.background === 'white' ? 'none' : 'invert(1)' 
          }} 
        />
      </div>

    </div>
  );
};

export default PresentationPage;
