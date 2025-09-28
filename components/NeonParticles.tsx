import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  decay: number;
}

interface NeonParticlesProps {
  burst: { x: number; y: number; color: string } | null;
}

const PARTICLE_COUNT = 30;
const MAX_LIFE = 60; // in frames

const createParticle = (x: number, y: number, color: string): Particle => {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 4 + 1; // particle speed
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: Math.random() * 2.5 + 1, // particle size
    color,
    opacity: 1,
    life: MAX_LIFE,
    decay: Math.random() * 0.015 + 0.005, // fade out speed
  };
};

const NeonParticles: React.FC<NeonParticlesProps> = ({ burst }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (burst) {
      const newParticles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(burst.x, burst.y, burst.color)
      );
      particlesRef.current.push(...newParticles);
    }
  }, [burst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        opacity: p.opacity - p.decay,
        life: p.life - 1,
        vy: p.vy + 0.02, // slight gravity
      })).filter(p => p.life > 0 && p.opacity > 0);

      particlesRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        
        ctx.fill();
        ctx.globalAlpha = 1; // Reset global alpha
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default NeonParticles;
