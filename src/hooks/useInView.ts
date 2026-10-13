import { useEffect, useState, type RefObject } from 'react';

function useInView(ref: RefObject<HTMLElement | null>, threshold: number = 0.15): boolean {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

export default useInView;
