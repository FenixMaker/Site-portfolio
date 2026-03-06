import React from 'react';
import { m } from 'motion/react';
import { Code, Server, Video } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Skills = () => {
  return (
    <section id="habilidades" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4">
            <span className="text-neon-green font-mono text-xl"><ScrambleText text="02." continuous={false} /></span> <ScrambleText text="Habilidades" continuous={false} />
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Desenvolvimento */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <m.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="inline-block"
              >
                <Code className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
              </m.div>
            </m.div>
            <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Desenvolvimento" continuous={false} /></h3>
            <div className="flex flex-wrap gap-3">
              {['Lógica de Programação', 'Estrutura de Dados', 'SQL', 'Python', 'Next.js'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </m.div>

          {/* Infraestrutura e TI */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            >
              <m.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5, repeatDelay: 1 }}
                className="inline-block"
              >
                <Server className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
              </m.div>
            </m.div>
            <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Infraestrutura e TI" continuous={false} /></h3>
            <div className="flex flex-wrap gap-3">
              {['Montagem e Manutenção', 'Diagnóstico de Hardware', 'Redes Locais', 'Wi-Fi e Roteadores', 'Suporte Técnico Presencial', 'Resolução de Conectividade'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </m.div>

          {/* Audiovisual */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-dark-surface p-8 border border-white/5 hover:border-neon-green/50 transition-colors group"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.5, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            >
              <m.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1, repeatDelay: 1 }}
                className="inline-block"
              >
                <Video className="w-12 h-12 text-neon-green mb-6 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)] group-hover:scale-125 group-hover:rotate-6 group-hover:drop-shadow-[0_0_20px_rgba(0,255,0,1)] transition-all duration-300" />
              </m.div>
            </m.div>
            <h3 className="text-2xl font-bold mb-6"><ScrambleText text="Audiovisual" continuous={false} /></h3>
            <div className="flex flex-wrap gap-3">
              {['Edição Profissional', 'YouTube', 'Ritmos de Corte', 'Engajamento', 'Criação de Conteúdo', 'Pós-produção'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/5 text-sm font-mono text-gray-300 rounded-full border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
