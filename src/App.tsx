import React, { useState, useEffect, Suspense } from 'react';
import { ArrowUp } from 'lucide-react';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Carregamento lento de componentes pesados
const MatrixRain = React.lazy(() => import('./components/MatrixRain'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Contact = React.lazy(() => import('./components/Contact'));

// Componente de carregamento simples para evitar layout shifts bruscos
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Efeito para mudar o estilo do header ao rolar a página e Scroll-Spy
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        setScrolled(window.scrollY > 50);
        scrollTimeout = null;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Otimização: IntersectionObserver com threshold menor
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } 
    );

    // Observar seções após o carregamento
    const observeSections = () => {
      document.querySelectorAll('section, footer').forEach((section) => {
        observer.observe(section);
      });
    };

    // Pequeno delay para garantir que o DOM foi atualizado com componentes lazy
    setTimeout(observeSections, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-transparent text-white font-sans selection:bg-neon-green selection:text-black">
        <Suspense fallback={null}>
          <MatrixRain />
        </Suspense>

        <style>{`
          /* Minimal CSS for maximum CLS prevention */
          * { box-sizing: border-box; }
          
          /* GPU acceleration */
          img { transform: translateZ(0); backface-visibility: hidden; }
          
          /* Fixed canvas */
          canvas { position: fixed !important; pointer-events: none !important; }
          
          /* Prevent layout shifts */
          .aspect-square { aspect-ratio: 1 / 1; }
          
          .glitch-btn { position: relative; }
          .glitch-btn:hover { animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
          .glitch-btn::before, .glitch-btn::after {
            content: attr(data-text);
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; opacity: 0; z-index: -1; pointer-events: none;
          }
          .glitch-btn:hover::before {
            opacity: 1; color: #00ff00; background: rgba(0,0,0,0.9);
            left: 2px; text-shadow: -2px 0 red;
            animation: glitch-anim-1 0.2s linear infinite alternate-reverse; z-index: 20;
          }
          .glitch-btn::after {
            content: attr(data-text);
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; opacity: 0; z-index: -1; pointer-events: none;
          }
          .glitch-btn:hover::after {
            opacity: 1; color: #00ff00; background: rgba(0,0,0,0.9);
            left: -2px; text-shadow: -2px 0 blue;
            animation: glitch-anim-2 0.3s linear infinite alternate-reverse; z-index: 20;
          }
          @keyframes glitch-anim-1 {
            0% { clip-path: inset(20% 0 80% 0); }
            20% { clip-path: inset(60% 0 10% 0); }
            40% { clip-path: inset(40% 0 50% 0); }
            60% { clip-path: inset(80% 0 5% 0); }
            80% { clip-path: inset(10% 0 70% 0); }
            100% { clip-path: inset(30% 0 50% 0); }
          }
          @keyframes glitch-anim-2 {
            0% { clip-path: inset(10% 0 60% 0); }
            20% { clip-path: inset(30% 0 20% 0); }
            40% { clip-path: inset(70% 0 10% 0); }
            60% { clip-path: inset(20% 0 50% 0); }
            80% { clip-path: inset(50% 0 30% 0); }
            100% { clip-path: inset(5% 0 80% 0); }
          }
          @keyframes glitch-skew {
            0% { transform: skew(0deg); }
            20% { transform: skew(-10deg); }
            40% { transform: skew(10deg); }
            60% { transform: skew(-5deg); }
            80% { transform: skew(5deg); }
            100% { transform: skew(0deg); }
          }

          /* Custom Cursor */
          body {
            cursor: url('/cursor-resized.png') 0 0, auto;
          }
          a, button, .glitch-btn, input, textarea, [role="button"] {
            cursor: url('/cursor-resized.png') 0 0, pointer !important;
          }
        `}</style>

        <Navbar scrolled={scrolled} activeSection={activeSection} />

        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        {/* Botão Voltar ao Topo */}
        <AnimatePresence>
          {scrolled && (
            <m.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 p-3 bg-neon-green text-black rounded-full shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all z-50"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={24} />
            </m.button>
          )}
        </AnimatePresence>
      </main>
    </LazyMotion>
  );
}
