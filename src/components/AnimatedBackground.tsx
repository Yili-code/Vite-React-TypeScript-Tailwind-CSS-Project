import React, { memo, useCallback, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  colors?: string[];
  speed?: number;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = memo(
  ({
    particleCount = 50,
    colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'],
    speed = 0.5,
    className = '',
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const lastTimeRef = useRef<number>(0);

    const createParticle = useCallback((): Particle => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          size: 0,
          opacity: 0,
          color: colors[0] || '#3B82F6',
        };
      }

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color:
          colors[Math.floor(Math.random() * colors.length)] ||
          colors[0] ||
          '#3B82F6',
      };
    }, [colors, speed]);

    const initParticles = useCallback(() => {
      particlesRef.current = Array.from(
        { length: particleCount },
        createParticle
      );
    }, [particleCount, createParticle]);

    const updateParticles = useCallback((deltaTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;

        // 邊界檢查
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
      });
    }, []);

    const drawParticles = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 繪製連線
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = ((100 - distance) / 100) * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
    }, []);

    const animate = useCallback(
      (currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        updateParticles(deltaTime);
        drawParticles();

        animationRef.current = requestAnimationFrame(animate);
      },
      [updateParticles, drawParticles]
    );

    const handleResize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      initParticles();
    }, [initParticles]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      handleResize();
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    }, [animate, handleResize]);

    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ background: 'transparent' }}
      />
    );
  }
);

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
