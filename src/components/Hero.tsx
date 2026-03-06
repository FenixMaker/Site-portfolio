import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* LCP Optimization: Removido initial/animate para renderização imediata do conteúdo principal */}
        <div className="max-w-3xl">
          <p className="text-neon-green font-mono text-sm md:text-base mb-4 tracking-wider uppercase">
            Olá, eu sou
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Alejandro Alexandre<br className="hidden md:block" /> Vilauba Coenio
          </h1>
          <h2 className="text-lg md:text-2xl lg:text-3xl text-gray-400 font-medium mb-8 cursor-default">
            Desenvolvedor de Sistemas <span className="text-neon-green">|</span> Suporte Técnico & Redes <span className="text-neon-green">|</span> Editor de Vídeo
          </h2>
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed cursor-default">
            Transformando lógica em código, ideias em vídeos e peças em máquinas de alto desempenho. Estudante de Análise e Desenvolvimento de Sistemas.
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
