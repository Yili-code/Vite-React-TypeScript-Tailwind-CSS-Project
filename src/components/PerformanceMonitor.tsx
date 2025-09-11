import React, { memo, useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  componentCount: number;
  reRenderCount: number;
  timestamp: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  interval?: number;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = memo(
  ({ enabled = false, interval = 1000, onMetrics }) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
      fps: 0,
      memory: 0,
      renderTime: 0,
      componentCount: 0,
      reRenderCount: 0,
      timestamp: Date.now(),
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!enabled) return;

      let frameCount = 0;
      let lastTime = performance.now();
      let animationId: number;

      const measurePerformance = () => {
        const currentTime = performance.now();
        frameCount++;

        if (currentTime - lastTime >= interval) {
          const fps = Math.round(
            (frameCount * 1000) / (currentTime - lastTime)
          );

          // 獲取記憶體使用情況（如果可用）
          const memory = (performance as any).memory
            ? (performance as any).memory.usedJSHeapSize / 1024 / 1024
            : 0;

          // 計算渲染時間
          const renderTime = performance.now() - currentTime;

          // 計算組件數量（近似值）
          const componentCount =
            document.querySelectorAll('[data-reactroot]').length;

          const newMetrics: PerformanceMetrics = {
            fps,
            memory: Math.round(memory * 100) / 100,
            renderTime: Math.round(renderTime * 100) / 100,
            componentCount,
            reRenderCount: 0, // 這需要更複雜的實現
            timestamp: Date.now(),
          };

          setMetrics(newMetrics);
          onMetrics?.(newMetrics);

          frameCount = 0;
          lastTime = currentTime;
        }

        animationId = requestAnimationFrame(measurePerformance);
      };

      animationId = requestAnimationFrame(measurePerformance);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, [enabled, interval, onMetrics]);

    if (!enabled || !isVisible) {
      return (
        <button
          onClick={() => setIsVisible(true)}
          className='fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs opacity-50 hover:opacity-100 transition-opacity'
          title='顯示性能監控'
        >
          📊
        </button>
      );
    }

    return (
      <div className='fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-xs'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-sm font-bold'>性能監控</h3>
          <button
            onClick={() => setIsVisible(false)}
            className='text-gray-400 hover:text-white'
          >
            ✕
          </button>
        </div>

        <div className='space-y-1'>
          <div className='flex justify-between'>
            <span>FPS:</span>
            <span
              className={
                metrics.fps < 30
                  ? 'text-red-400'
                  : metrics.fps < 50
                    ? 'text-yellow-400'
                    : 'text-green-400'
              }
            >
              {metrics.fps}
            </span>
          </div>

          <div className='flex justify-between'>
            <span>記憶體:</span>
            <span
              className={
                metrics.memory > 100
                  ? 'text-red-400'
                  : metrics.memory > 50
                    ? 'text-yellow-400'
                    : 'text-green-400'
              }
            >
              {metrics.memory}MB
            </span>
          </div>

          <div className='flex justify-between'>
            <span>渲染時間:</span>
            <span
              className={
                metrics.renderTime > 16
                  ? 'text-red-400'
                  : metrics.renderTime > 8
                    ? 'text-yellow-400'
                    : 'text-green-400'
              }
            >
              {metrics.renderTime}ms
            </span>
          </div>

          <div className='flex justify-between'>
            <span>組件數:</span>
            <span className='text-blue-400'>{metrics.componentCount}</span>
          </div>

          <div className='flex justify-between'>
            <span>重渲染:</span>
            <span className='text-purple-400'>{metrics.reRenderCount}</span>
          </div>
        </div>
      </div>
    );
  }
);

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
