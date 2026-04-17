import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Portfolio } from './components/Portfolio';
import { ProjectPage } from './components/ProjectPage';
import PresentationPage from './components/presentation/PresentationPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* key here drives the exit/enter animation on route change */}
      <div key={location.pathname} style={{ position: 'relative' }}>
        <Routes location={location}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

function Content() {
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation';

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
