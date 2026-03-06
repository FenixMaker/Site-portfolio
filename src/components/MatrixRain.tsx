import React, { useEffect, useRef } from 'react';

const MatrixRain = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Verificação de preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Performance: Detectar dispositivo móvel
    const isMobile = window.innerWidth < 768;
    // Em mobile, aumentar o espaçamento das colunas para reduzir processamento
    const fontSize = isMobile ? 18 : 14; 
    const columns = Math.floor(width / (fontSize * 1.5)) + 1; // Menos colunas
    const yPositions = Array.from({ length: columns }).fill(0) as number[];

    // Performance: Controle de FPS
    let animationFrameId: number;
    let lastTime = 0;
    const fps = isMobile ? 15 : 30; // Reduzir FPS em mobile
    const interval = 1000 / fps;

    const matrix = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(matrix);

      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;

      // Efeito de fade mais suave e performático
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}pt monospace`;

      yPositions.forEach((y, index) => {
        // Reduzir probabilidade de queda em mobile para menos atualizações de texto
        if (isMobile && Math.random() > 0.8) return; 

        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = index * (fontSize * 1.5);
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + fontSize + 6;
        }
      });
    };

    // Iniciar animação
    animationFrameId = requestAnimationFrame(matrix);

    // Debounce no resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (canvasRef.current) {
            width = canvasRef.current.width = window.innerWidth;
            height = canvasRef.current.height = window.innerHeight;
        }
      }, 200);
    };
    
    // Performance: Pausar quando não estiver visível
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(matrix);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-5 pointer-events-none" />;
});

export const MiniMatrixRain = () => null;

export default MatrixRain;
