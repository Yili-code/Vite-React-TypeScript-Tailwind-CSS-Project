import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
  children: React.ReactNode;
  className?: string;
  loadingComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = memo(
  ({
    hasMore,
    isLoading,
    onLoadMore,
    threshold = 0.1,
    rootMargin = '100px',
    children,
    className = '',
    loadingComponent,
    endComponent,
  }) => {
    const [, setIsIntersecting] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (!entry) return;

        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      [hasMore, isLoading, onLoadMore]
    );

    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      observerRef.current.observe(sentinel);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [handleIntersection, threshold, rootMargin]);

    const defaultLoadingComponent = (
      <div className='flex justify-center items-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600'></div>
        <span className='ml-2 text-gray-600 dark:text-gray-400'>載入中...</span>
      </div>
    );

    const defaultEndComponent = (
      <div className='flex justify-center items-center py-8'>
        <span className='text-gray-500 dark:text-gray-400'>沒有更多內容了</span>
      </div>
    );

    return (
      <div className={className}>
        {children}

        {hasMore && (
          <div ref={sentinelRef}>
            {isLoading && (loadingComponent || defaultLoadingComponent)}
          </div>
        )}

        {!hasMore && !isLoading && (endComponent || defaultEndComponent)}
      </div>
    );
  }
);

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
