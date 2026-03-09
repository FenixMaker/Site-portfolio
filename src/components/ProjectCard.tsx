import React, { useRef, useState } from 'react';
import { ExternalLink, X, Youtube } from 'lucide-react';
import { m, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { createPortal } from 'react-dom';

const renderMarkdownBlocks = (content: string) => {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push(
      <ul key={`list-${key++}`} className="list-disc space-y-1 pl-6 text-gray-200">
        {listBuffer.map((item, idx) => (
          <li key={`li-${idx}`}>{item}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushCode = () => {
    if (!codeBuffer.length) return;
    blocks.push(
      <pre
        key={`code-${key++}`}
        className="overflow-x-auto rounded-md border border-white/20 bg-black/70 p-4 text-xs text-neon-green"
      >
        <code>{codeBuffer.join('\n')}</code>
      </pre>
    );
    codeBuffer = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(rawLine);
      return;
    }

    if (!line) {
      flushList();
      blocks.push(<div key={`space-${key++}`} className="h-2" />);
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      listBuffer.push(line.slice(2));
      return;
    }

    flushList();

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={`h3-${key++}`} className="mt-2 text-lg font-bold text-neon-green">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-4 text-xl font-bold text-white">
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h1 key={`h1-${key++}`} className="mt-4 text-2xl font-bold text-white">
          {line.slice(2)}
        </h1>
      );
      return;
    }

    blocks.push(
      <p key={`p-${key++}`} className="leading-relaxed text-gray-200">
        {line}
      </p>
    );
  });

  flushList();
  flushCode();

  return blocks;
};

const ProjectCard = ({ project, index }: { project: any; index: number; key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const docCacheRef = useRef<Record<string, string>>({});
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docContent, setDocContent] = useState('');
  const [docLoading, setDocLoading] = useState(false);
  const [docError, setDocError] = useState('');
  
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

  const link = typeof project.link === 'string' ? project.link.trim() : '';
  const hasValidLink = link !== '' && link !== '#';
  const isExternalLink = hasValidLink && link.startsWith('http');
  const isPrivateRepo = project.privateRepo === true;
  const ctaLabel = typeof project.ctaLabel === 'string' ? project.ctaLabel : 'Ver Detalhes';
  const secondaryLink = typeof project.secondaryLink === 'string' ? project.secondaryLink.trim() : '';
  const hasSecondaryLink = secondaryLink !== '' && secondaryLink !== '#';
  const secondaryLabel = typeof project.secondaryLabel === 'string' ? project.secondaryLabel : 'Ver Documentacao';
  const isMainMarkdownLink = hasValidLink && /\.md($|\?|#)/i.test(link);
  const isSecondaryMarkdownLink = hasSecondaryLink && /\.md($|\?|#)/i.test(secondaryLink);

  const openMarkdownModal = async (docUrl: string) => {
    setIsDocModalOpen(true);
    setDocError('');

    if (docCacheRef.current[docUrl]) {
      setDocContent(docCacheRef.current[docUrl]);
      return;
    }

    setDocLoading(true);
    try {
      const res = await fetch(docUrl);
      if (!res.ok) {
        throw new Error(`Falha ao carregar documento (${res.status}).`);
      }
      const text = await res.text();
      docCacheRef.current[docUrl] = text;
      setDocContent(text);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel carregar o documento.';
      setDocError(message);
    } finally {
      setDocLoading(false);
    }
  };

  const closeDocModal = () => setIsDocModalOpen(false);

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeDocModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeDocModal();
  };

  const modalContent = isDocModalOpen ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleEscapeKey}
      role="presentation"
    >
      <div
        className="relative w-full max-w-4xl rounded-xl border border-neon-green/40 bg-dark-surface shadow-[0_0_40px_rgba(0,255,0,0.15)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-modal-title"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h4 id="doc-modal-title" className="text-sm font-mono uppercase tracking-wider text-neon-green">
            Documentacao do Projeto
          </h4>
          <button
            type="button"
            onClick={closeDocModal}
            className="rounded border border-white/20 p-2 text-gray-300 transition-colors hover:border-neon-green hover:text-neon-green"
            aria-label="Fechar documentação"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-5 py-4">
          {docLoading && <p className="font-mono text-sm text-gray-300">Carregando documento...</p>}
          {!docLoading && docError && <p className="font-mono text-sm text-red-400">{docError}</p>}
          {!docLoading && !docError && (
            <div className="space-y-2 text-sm">
              {renderMarkdownBlocks(docContent)}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

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
          {hasValidLink && project.type !== 'video' && (
            <ExternalLink size={18} className="text-gray-500 group-hover:text-neon-green transition-colors" />
          )}
        </h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        {project.demoLogin && project.demoPassword && (
          <div className="mb-4 rounded border border-neon-green/30 bg-neon-green/5 p-3 text-xs font-mono text-gray-300">
            <p>Login: {project.demoLogin}</p>
            <p>Senha: {project.demoPassword}</p>
          </div>
        )}
        
        {project.tech && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-gray-300 rounded">
                {t}
              </span>
            ))}
          </div>
        )}

        {project.type !== 'video' && hasValidLink ? (
          <div className="mt-auto flex flex-wrap items-center gap-4">
            {isMainMarkdownLink ? (
              <button
                type="button"
                onClick={() => openMarkdownModal(link)}
                className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-neon-green transition-colors"
              >
                {ctaLabel} <ExternalLink size={16} />
              </button>
            ) : (
              <a
                href={link}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-neon-green transition-colors"
              >
                {ctaLabel} <ExternalLink size={16} />
              </a>
            )}
            {hasSecondaryLink && (
              isSecondaryMarkdownLink ? (
                <button
                  type="button"
                  onClick={() => openMarkdownModal(secondaryLink)}
                  className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-neon-green transition-colors"
                >
                  {secondaryLabel} <ExternalLink size={16} />
                </button>
              ) : (
                <a
                  href={secondaryLink}
                  target={secondaryLink.startsWith('http') ? "_blank" : undefined}
                  rel={secondaryLink.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-neon-green transition-colors"
                >
                  {secondaryLabel} <ExternalLink size={16} />
                </a>
              )
            )}
          </div>
        ) : project.type !== 'video' && isPrivateRepo ? (
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-mono text-neon-green hover:text-white transition-colors mt-auto"
          >
            Repositório Privado (solicitar acesso)
          </a>
        ) : project.type !== 'video' ? (
          <span className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 mt-auto">
            Detalhes em breve
          </span>
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

      {modalContent && createPortal(modalContent, document.body)}
    </m.div>
  );
};

export default ProjectCard;
