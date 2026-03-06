import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { m, AnimatePresence } from 'motion/react';

const Navbar = ({ scrolled, activeSection }: { scrolled: boolean; activeSection: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre Mim', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <>
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
            <m.div
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
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
