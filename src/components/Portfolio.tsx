import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import ProjectCard from './ProjectCard';
import ScrambleText from './ScrambleText';

// --- Dados do Portfólio ---
const portfolioProjects = [
  {
    id: 1,
    title: 'BibiFood System v2.0',
    category: 'Sistemas & Automação',
    description: 'Sistema completo de gestão para restaurantes, controle de pedidos e estoque.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600&h=400',
    link: 'https://bytegreen.netlify.app/',
    ctaLabel: 'Acessar Demo',
    secondaryLink: 'https://github.com/Fenixposts2/Sistema-Restaurante',
    secondaryLabel: 'Ver Documentacao',
    demoLogin: 'admin@bytegreen.com',
    demoPassword: 'admin123',
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

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
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

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-dark-surface/80 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <m.div
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
        </m.div>

        {/* Galeria */}
        <m.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
};

export default Portfolio;
