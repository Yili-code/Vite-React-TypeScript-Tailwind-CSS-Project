import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = memo(
  ({
    src,
    alt,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA2VjE4TTYgMTJIMTgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+',
    className = '',
    onLoad,
    onError,
    threshold = 0.1,
    rootMargin = '50px',
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setHasError(true);
      onError?.();
    }, [onError]);

    useEffect(() => {
      const img = imgRef.current;
      if (!img) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observerRef.current.observe(img);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [threshold, rootMargin]);

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!isLoaded && !hasError && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
            <img src={placeholder} alt='' className='w-6 h-6 opacity-50' />
          </div>
        )}

        {isInView && (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${hasError ? 'hidden' : ''}`}
          />
        )}

        {hasError && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
            <div className='text-center'>
              <div className='text-2xl mb-2'>📷</div>
              <div className='text-sm'>圖片載入失敗</div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
