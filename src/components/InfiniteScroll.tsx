import { BaseComponent } from '@/types';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps extends BaseComponent {
  hasMore: boolean;
  loadMore: () => void;
  threshold?: number;
  rootMargin?: string;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
}

const InfiniteScroll = memo<InfiniteScrollProps>(({
  hasMore,
  loadMore,
  threshold = 0.1,
  rootMargin = '100px',
  children,
  loadingComponent,
  endComponent,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      await loadMore();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, loadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, handleLoadMore, threshold, rootMargin]);

  const defaultLoadingComponent = (
    <div className="flex justify-center items-center py-8">
      <div className="loading-spinner w-6 h-6"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">載入中...</span>
    </div>
  );

  const defaultEndComponent = (
    <div className="flex justify-center items-center py-8">
      <span className="text-gray-500 dark:text-gray-400">已載入全部內容</span>
    </div>
  );

  return (
    <div className={className}>
      {children}
      
      {hasMore ? (
        <div ref={sentinelRef}>
          {isLoading && (loadingComponent || defaultLoadingComponent)}
        </div>
      ) : (
        endComponent || defaultEndComponent
      )}
    </div>
  );
});

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
