import { useEffect, useRef } from "react";

interface UseLazyLoaderParams {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export const useLazyLoader = ({ hasMore, loading, onLoadMore }: UseLazyLoaderParams) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { root: null, threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading, onLoadMore]);

  return observerRef;
};
