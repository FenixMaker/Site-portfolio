import React from 'react';
import { m } from 'motion/react';
import { MiniMatrixRain } from './MatrixRain';
import ScrambleText from './ScrambleText';

const About = () => {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-dark-surface/80 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          <m.div
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
          </m.div>

          <m.div
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
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default About;
