import React from 'react';
import { m } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Youtube } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Contact = () => {
  return (
    <footer id="contato" className="py-16 md:py-24 relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <m.div
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
        </m.div>
      </div>
    </footer>
  );
};

export default Contact;
