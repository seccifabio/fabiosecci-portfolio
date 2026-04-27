import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Portfolio } from './components/Portfolio';
import { ProjectPage } from './components/ProjectPage';
import PresentationPage from './components/presentation/PresentationPage';
import IntroPage from './components/presentation/IntroPage';
import Beyond from './components/presentation/Beyond';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/beyond" element={<Beyond />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Content() {
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation' || location.pathname === '/intro' || location.pathname === '/beyond';

  return (
    <div className="relative bg-black text-white min-h-screen selection:bg-white selection:text-black">
      {!isPresentation && <Header />}
      <div id="page-content">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}
