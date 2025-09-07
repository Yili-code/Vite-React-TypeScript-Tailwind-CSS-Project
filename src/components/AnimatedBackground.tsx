import { BaseComponent } from '@/types';
import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps extends BaseComponent {
  type?: 'particles' | 'waves' | 'geometric' | 'matrix' | 'hologram';
  intensity?: 'low' | 'medium' | 'high';
  color?: 'primary' | 'accent' | 'rainbow' | 'monochrome';
}

const AnimatedBackground = ({ 
  type = 'particles', 
  intensity = 'medium',
  color = 'primary',
  className = ''
}: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getIntensityClass = () => {
    switch (intensity) {
      case 'low': return 'opacity-20';
      case 'medium': return 'opacity-40';
      case 'high': return 'opacity-60';
      default: return 'opacity-40';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'from-primary-400 via-primary-500 to-primary-600';
      case 'accent': return 'from-accent-400 via-accent-500 to-accent-600';
      case 'rainbow': return 'from-cyan-400 via-blue-500 to-purple-600';
      case 'monochrome': return 'from-gray-400 via-gray-500 to-gray-600';
      default: return 'from-primary-400 via-primary-500 to-primary-600';
    }
  };

  const renderParticles = () => (
    <div className={`absolute inset-0 ${getIntensityClass()}`}>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-gradient-to-r ${getColorClass()} rounded-full animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  const renderWaves = () => (
    <div className={`absolute inset-0 ${getIntensityClass()}`}>
      <div className="wave absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30" />
      <div className="wave absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-red-500/20" style={{ animationDelay: '1s' }} />
      <div className="wave absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-r from-green-400/20 via-yellow-500/20 to-orange-500/20" style={{ animationDelay: '2s' }} />
    </div>
  );

  const renderGeometric = () => (
    <div className={`absolute inset-0 ${getIntensityClass()}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-16 h-16 border-2 border-gradient-to-r ${getColorClass()} rounded-lg animate-rotate-in`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );

  const renderMatrix = () => (
    <div className={`absolute inset-0 ${getIntensityClass()}`}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono text-xs animate-matrix"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="opacity-70">
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderHologram = () => (
    <div className={`absolute inset-0 hologram ${getIntensityClass()}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-600/10"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
        }}
      />
    </div>
  );

  const renderBackground = () => {
    switch (type) {
      case 'particles': return renderParticles();
      case 'waves': return renderWaves();
      case 'geometric': return renderGeometric();
      case 'matrix': return renderMatrix();
      case 'hologram': return renderHologram();
      default: return renderParticles();
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {renderBackground()}
    </div>
  );
};

export default AnimatedBackground;
