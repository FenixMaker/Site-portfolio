import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Youtube, Mail, Phone, MapPin, Menu, X, ExternalLink, Code, Server, Video, MonitorPlay, Cpu, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useScroll } from 'motion/react';

// --- Dados do Portfólio ---
const portfolioProjects = [
  {
    id: 1,
    title: 'BibiFood System v2.0',
    category: 'Sistemas & Automação',
    description: 'Sistema completo de gestão para restaurantes, controle de pedidos e estoque.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600&h=400',
    link: '#',
    tech: ['Python', 'CustomTkinter', 'SQLite']
  },
  {
    id: 2,
    title: 'Sistema DAC - Exclusão Digital',
    category: 'Sistemas & Automação',
    description: 'Sistema completo para análise de dados sobre exclusão digital no Brasil. Versão Desktop (Python) e Web (Next.js + FastAPI).',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
    link: 'https://github.com/FenixMaker/DAC_2025',
    tech: ['Next.js', 'FastAPI', 'Python', 'Pandas']
  },
  {
    id: 11,
    title: 'ByteGreen Medical',
    category: 'Sistemas & Automação',
    description: 'Aplicação web para gestão médica sustentável. Monitora consumo energético de equipamentos e gerencia dados com conformidade LGPD.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600&h=400',
    link: 'https://github.com/FenixMaker/bytegreen-medical',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts']
  },
  {
    id: 3,
    title: 'Bots de Automação em Python',
    category: 'Sistemas & Automação',
    description: 'Scripts para automação de tarefas rotineiras e web scraping.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400',
    link: 'https://github.com/seu-usuario/seu-repo',
    tech: ['Python', 'Selenium', 'BeautifulSoup']
  },
  {
    id: 7,
    title: 'Último Vídeo do Canal',
    category: 'Audiovisual',
    description: 'Confira meu trabalho mais recente de edição e criação de conteúdo no YouTube.',
    type: 'video',
    embedId: 'dQw4w9WgXcQ', // Fallback
    link: 'https://www.youtube.com/@FenixPosts',
    tech: ['Sony Vegas', 'Premiere', 'After Effects'],
    isLatestVideo: true
  },
  {
    id: 9,
    title: 'Montagem de PC High-End',
    category: 'Hardware & Redes',
    description: 'Case de montagem de computador focado em performance e cable management.',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600&h=400',
    link: '#',
    tech: ['Hardware', 'Cable Management', 'Overclock']
  },
  {
    id: 10,
    title: 'Setup de Rede Local',
    category: 'Hardware & Redes',
    description: 'Configuração de rede estruturada, roteamento e otimização de Wi-Fi.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400',
    link: '#',
    tech: ['Redes', 'Roteadores', 'Infraestrutura']
  },
];

const categories = ['Todos', 'Sistemas & Automação', 'Audiovisual', 'Hardware & Redes'];

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 20) + 1;
    const yPositions = Array.from({ length: columns }).fill(0) as number[];

    const matrix = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff00';
      ctx.font = '14pt monospace';

      yPositions.forEach((y, index) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = index * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(matrix, 300); // Reduced from 50ms to 300ms for performance

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-5 pointer-events-none" />;
};

const MiniMatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let yPositions: number[] = [];

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
        columns = Math.floor(width / 20) + 1;
        yPositions = Array.from({ length: columns }).fill(0) as number[];
      }
    };

    handleResize();

    const matrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff00';
      ctx.font = '14pt monospace';

      yPositions.forEach((y, index) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = index * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(matrix, 50);
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null; // Disabled for performance to reduce CLS
};

const ScrambleText = ({ text, className, continuous = true }: { text: string; className?: string; continuous?: boolean }) => {
  const [iteration, setIteration] = useState(text.length);
  const [scrambledChars, setScrambledChars] = useState<string[]>([]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  const triggerScramble = () => {
    let currentIteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    const step = Math.max(1, text.length / 15);

    intervalRef.current = setInterval(() => {
      setIteration(currentIteration);
      
      const newScrambled = text.split("").map(char => 
        char === ' ' ? ' ' : letters[Math.floor(Math.random() * letters.length)]
      );
      setScrambledChars(newScrambled);

      if (currentIteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setIteration(text.length);
      }

      currentIteration += step;
    }, 40);
  };

  useEffect(() => {
    if (isInView) {
      triggerScramble();
    }
  }, [isInView]);

  useEffect(() => {
    if (!continuous) return;
    
    // Configura o loop para rodar de tempos em tempos (ex: a cada 8 a 15 segundos)
    const startLoop = () => {
      const randomDelay = Math.floor(Math.random() * 7000) + 8000; // Entre 8s e 15s
      loopRef.current = setTimeout(() => {
        triggerScramble();
        startLoop(); // Chama novamente para o próximo ciclo
      }, randomDelay);
    };

    startLoop();

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      clearTimeout(loopRef.current as NodeJS.Timeout);
    };
  }, [text, continuous]);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, index) => {
        if (index < iteration) {
          return <span key={index}>{char}</span>;
        }
        return (
          <span key={index} className="text-neon-green font-mono opacity-90 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
            {scrambledChars[index] || char}
          </span>
        );
      })}
    </span>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number; key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const mouseTranslateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const mouseTranslateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / width - 0.5;
    const yPct = y / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-dark-bg border border-white/10 hover:border-neon-green/40 hover:shadow-[0_8px_30px_rgba(0,255,0,0.15)] overflow-hidden flex flex-col h-full transition-all"
    >
      {/* Imagem ou Embed */}
      <div className="relative aspect-video overflow-hidden bg-black/50">
        {project.type === 'video' ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${project.embedId}`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full object-cover relative z-10"
          ></iframe>
        ) : (
          <>
            <motion.img loading="lazy"
              width="800"
              height="600"
              style={{ 
                x: mouseTranslateX, 
                y: scrollTranslateY,
                translateY: mouseTranslateY 
              }}
              src={project.image}
              alt={project.title}
              className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute max-w-none object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80 pointer-events-none"></div>
          </>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <span className="text-neon-green font-mono text-xs mb-3 block uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mb-3 group-hover:text-neon-green transition-colors flex items-center gap-2">
          {project.title}
          {project.link !== '#' && project.type !== 'video' && (
            <ExternalLink size={18} className="text-gray-500 group-hover:text-neon-green transition-colors" />
          )}
        </h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>
        
        {project.tech && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded">
                {t}
              </span>
            ))}
          </div>
        )}

        {project.type !== 'video' ? (
          <a
            href={project.link}
            className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-neon-green transition-colors mt-auto"
          >
            Ver Detalhes <ExternalLink size={16} />
          </a>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-neon-green transition-colors mt-auto"
          >
            Assistir no YouTube <Youtube size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [latestVideo, setLatestVideo] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const idRes = await fetch('https://decapi.me/youtube/latest_video?id=@FenixPosts&format={id}');
        const id = await idRes.text();
        const titleRes = await fetch('https://decapi.me/youtube/latest_video?id=@FenixPosts&format={title}');
        const title = await titleRes.text();
        
        if (id && !id.includes('Error') && !id.includes('invalid')) {
          setLatestVideo({ id: id.trim(), title: title.trim() });
        }
      } catch (error) {
        console.error('Erro ao buscar último vídeo:', error);
      }
    };
    fetchLatestVideo();
  }, []);

  // Efeito para mudar o estilo do header ao rolar a página e Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section, footer').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Projetos com vídeo dinâmico
  const displayProjects = portfolioProjects.map(project => {
    if ((project as any).isLatestVideo && latestVideo) {
      return {
        ...project,
        title: `Último Vídeo: ${latestVideo.title}`,
        embedId: latestVideo.id,
        link: `https://www.youtube.com/watch?v=${latestVideo.id}`
      };
    }
    return project;
  });

  // Filtro do portfólio
  const filteredProjects = displayProjects.filter(
    (project) => activeCategory === 'Todos' || project.category === activeCategory
  );

  // Contagem de projetos por categoria
  const getCategoryCount = (category: string) => {
    if (category === 'Todos') return displayProjects.length;
    return displayProjects.filter((p) => p.category === category).length;
  };

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre Mim', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <main className="min-h-screen bg-transparent text-white font-sans selection:bg-neon-green selection:text-black">
      <MatrixRain />
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
      {/* Navegação */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#inicio" className="text-2xl font-bold tracking-tighter">
            Alejandro<span className="text-neon-green">.</span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-neon-green'
                    : 'text-gray-300 hover:text-neon-green'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="md:hidden text-white hover:text-neon-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-dark-surface border-b border-white/10 shadow-2xl md:hidden"
            >
              <div className="flex flex-col px-6 py-8 space-y-6 h-[calc(100vh-80px)]">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-medium transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'text-neon-green'
                        : 'text-gray-300 hover:text-neon-green'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Elementos de fundo decorativos */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-neon-green font-mono text-sm md:text-base mb-4 tracking-wider uppercase">
              Olá, eu sou
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Alejandro Alexandre<br className="hidden md:block" /> Vilauba Coenio
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-medium mb-8 cursor-default">
              <ScrambleText text="Desenvolvedor de Sistemas" /> <span className="text-neon-green">|</span> <ScrambleText text="Suporte Técnico & Redes" /> <span className="text-neon-green">|</span> <ScrambleText text="Editor de Vídeo" />
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed cursor-default">
              <ScrambleText text="Transformando lógica em código, ideias em vídeos e peças em máquinas de alto desempenho. Estudante de Análise e Desenvolvimento de Sistemas." />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portfolio"
                data-text="Ver Meus Projetos"
                className="glitch-btn group relative px-8 py-4 bg-neon-green text-black font-bold rounded-none overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span className="relative z-10">Ver Meus Projetos</span>
              </a>
              <a
                href="#contato"
                data-text="Entrar em Contato"
                className="glitch-btn group relative px-8 py-4 bg-transparent border border-neon-green/50 text-neon-green font-bold rounded-none overflow-hidden transition-all duration-300 hover:shadow-[inset_0_0_20px_rgba(0,255,0,0.2),0_0_20px_rgba(0,255,0,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span className="relative z-10">Entrar em Contato</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sobre Mim */}
      <section id="sobre" className="py-16 md:py-24 bg-dark-surface/80 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2 px-4 md:px-0"
            >
              <div className="relative aspect-square max-w-md mx-auto group">
                <div className="absolute inset-0 border-2 border-neon-green translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5 md:group-hover:translate-x-6 md:group-hover:translate-y-6"></div>
                <div className="relative w-full h-full overflow-hidden">
                  <img loading="lazy"
                    src="/Foto.jpg"
                    alt="Alejandro Alexandre Vilauba Coenio"
                    width="600"
                    height="600"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 opacity-60 md:group-hover:opacity-0 transition-opacity duration-500 pointer-events-none mix-blend-lighten">
                    <MiniMatrixRain />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 flex items-center gap-4">
                <span className="text-neon-green font-mono text-xl"><ScrambleText text="01." continuous={false} /></span> <ScrambleText text="Sobre Mim" continuous={false} />
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  <ScrambleText text="Estudante de Análise e Desenvolvimento de Sistemas (5º semestre) na UCDB, com perfil proativo e foco em resultados práticos." continuous={false} />
                </p>
                <p>
                  <ScrambleText text="Tenho experiência técnica em hardware, redes e suporte, além de domínio em ferramentas de edição de vídeo. Destaco-me pela facilidade de aprendizado autodidata e resolução de problemas." continuous={false} />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4">
              <span className="text-neon-green font-mono text-xl"><ScrambleText text="02." continuous={false} /></span> <ScrambleText text="Habilidades" continuous={false} />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Desenvolvimento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="inline-block"
                >
                  <Code className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Desenvolvimento" continuous={true} /></h3>
              <div className="flex flex-wrap gap-3">
                {['Lógica de Programação', 'Estrutura de Dados', 'SQL', 'Python', 'Next.js'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Infraestrutura e TI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5, repeatDelay: 1 }}
                  className="inline-block"
                >
                  <Server className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Infraestrutura e TI" continuous={true} /></h3>
              <div className="flex flex-wrap gap-3">
                {['Montagem e Manutenção', 'Diagnóstico de Hardware', 'Redes Locais', 'Wi-Fi e Roteadores', 'Suporte Técnico Presencial', 'Resolução de Conectividade'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Audiovisual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1, repeatDelay: 1 }}
                  className="inline-block"
                >
                  <Video className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Audiovisual" continuous={true} /></h3>
              <div className="flex flex-wrap gap-3">
                {['Edição Profissional', 'YouTube', 'Ritmos de Corte', 'Engajamento', 'Criação de Conteúdo', 'Pós-produção'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-16 md:py-24 bg-dark-surface/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4 mb-8">
              <span className="text-neon-green font-mono text-xl"><ScrambleText text="03." continuous={false} /></span> <ScrambleText text="Portfólio" continuous={false} />
            </h2>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Filtrar por ${category}`}
                  className={`px-4 py-2 md:px-6 md:py-2 text-xs md:text-sm font-mono transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-neon-green text-black font-bold'
                      : 'bg-transparent text-gray-400 border border-white/20 hover:border-neon-green hover:text-neon-green'
                  }`}
                >
                  {category}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {getCategoryCount(category)}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Galeria */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contato (Rodapé) */}
      <footer id="contato" className="py-16 md:py-24 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-neon-green font-mono text-lg mb-4 tracking-wider uppercase">
              <ScrambleText text="04. Qual o próximo passo?" continuous={false} />
            </h2>
            <h2 className="text-3xl md:text-6xl font-bold mb-8"><ScrambleText text="Entrar em Contato" continuous={false} /></h2>
            <p className="text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto">
              <ScrambleText text="Estou sempre aberto a novas oportunidades, seja para um estágio na área de tecnologia, projetos freelance de desenvolvimento, infraestrutura ou edição de vídeo. Minha caixa de entrada está sempre aberta!" continuous={false} />
            </p>

            <a
              href="mailto:Fenixposts@gmail.com"
              className="inline-flex px-8 py-4 bg-neon-green text-black font-bold text-lg hover:bg-white transition-colors duration-300 mb-16 w-full sm:w-auto justify-center"
            >
              Diga Olá
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 text-left max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-dark-surface p-6 border border-white/5">
                <Mail className="text-neon-green w-8 h-8 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 font-mono">E-mail</p>
                  <a href="mailto:Fenixposts@gmail.com" className="text-white hover:text-neon-green transition-colors break-all">
                    Fenixposts@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-dark-surface p-6 border border-white/5">
                <MapPin className="text-neon-green w-8 h-8 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 font-mono">Localização</p>
                  <span className="text-white">
                    Vila Margarida, Campo Grande - MS
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-8 mb-12">
              <a href="https://github.com/FenixMaker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green hover:-translate-y-1 transition-all">
                <Github size={28} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/alejandro-alexandre-00851726a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green hover:-translate-y-1 transition-all">
                <Linkedin size={28} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.youtube.com/@FenixPosts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green hover:-translate-y-1 transition-all">
                <Youtube size={28} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>

            <p className="text-gray-600 font-mono text-sm">
              Desenvolvido por Alejandro Alexandre Vilauba Coenio &copy; {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-neon-green text-black rounded-full shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all z-50"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
