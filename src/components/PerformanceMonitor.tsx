import { BaseComponent } from '@/types';
import { memo, useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
}

interface PerformanceMonitorProps extends BaseComponent {
  enabled?: boolean;
  showMetrics?: boolean;
  onMetricsChange?: (metrics: PerformanceMetrics) => void;
}

const PerformanceMonitor = memo<PerformanceMonitorProps>(({
  enabled = false,
  showMetrics = false,
  onMetricsChange,
  className
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    renderTime: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const memory = (performance as any).memory?.usedJSHeapSize || 0;
        
        const newMetrics: PerformanceMetrics = {
          fps,
          memory: Math.round(memory / 1024 / 1024), // MB
          renderTime: currentTime - lastTime,
        };

        setMetrics(newMetrics);
        onMetricsChange?.(newMetrics);

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled, onMetricsChange]);

  if (!enabled || !showMetrics) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 ${className || ''}`}>
      <div className="mb-1">
        <span className="text-gray-300">FPS:</span>
        <span className={`ml-1 ${metrics.fps >= 55 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
          {metrics.fps}
        </span>
      </div>
      <div className="mb-1">
        <span className="text-gray-300">Memory:</span>
        <span className="ml-1 text-blue-400">{metrics.memory}MB</span>
      </div>
      <div>
        <span className="text-gray-300">Render:</span>
        <span className="ml-1 text-purple-400">{metrics.renderTime.toFixed(1)}ms</span>
      </div>
    </div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
