import React, { useRef } from 'react';
import { ExternalLink, Youtube } from 'lucide-react';
import { m, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';

const ProjectCard = ({ project, index }: { project: any; index: number; key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Otimização: Detectar mobile para desativar efeitos pesados
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

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
    if (isMobile) return;

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
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Valores de estilo condicional para evitar hooks inválidos
  const imgStyle = !isMobile ? { 
    x: mouseTranslateX, 
    y: scrollTranslateY,
    translateY: mouseTranslateY 
  } : {};

  return (
    <m.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }} // Otimização de viewport
      whileHover={!isMobile ? { y: -8 } : {}}
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
            src={`https://www.youtube-nocookie.com/embed/${project.embedId}`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full object-cover relative z-10"
          ></iframe>
        ) : (
          <>
            <m.img 
              loading="lazy"
              width="800"
              height="600"
              style={imgStyle}
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
            target={project.link.startsWith('http') ? "_blank" : undefined}
            rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
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
    </m.div>
  );
};

export default ProjectCard;
