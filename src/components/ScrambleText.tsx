import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

const ScrambleText = ({ text, className, continuous = false }: { text: string; className?: string; continuous?: boolean }) => {
  const [iteration, setIteration] = useState(text.length);
  const [scrambledChars, setScrambledChars] = useState<string[]>([]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

  const triggerScramble = () => {
    let currentIteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const step = Math.max(1, text.length / 15);

    intervalRef.current = setInterval(() => {
      setIteration(currentIteration);
      
      const newScrambled = text.split("").map(char => 
        char === ' ' ? ' ' : letters[Math.floor(Math.random() * letters.length)]
      );
      setScrambledChars(newScrambled);

      if (currentIteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIteration(text.length);
      }

      currentIteration += step;
    }, 40);
  };

  useEffect(() => {
    if (isInView && !document.hidden) {
      triggerScramble();
    }
  }, [isInView]);

  useEffect(() => {
    if (!continuous) return;
    
    // Configura o loop para rodar de tempos em tempos (ex: a cada 8 a 15 segundos)
    const startLoop = () => {
      const randomDelay = Math.floor(Math.random() * 7000) + 8000; // Entre 8s e 15s
      loopRef.current = setTimeout(() => {
        if (!document.hidden) {
          triggerScramble();
        }
        startLoop(); // Chama novamente para o próximo ciclo
      }, randomDelay);
    };

    startLoop();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopRef.current) clearTimeout(loopRef.current);
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

export default ScrambleText;
