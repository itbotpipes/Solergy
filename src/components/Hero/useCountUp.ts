import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, active: boolean, duration: number = 1500): number {
  const [count, setCount] = useState<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return undefined;

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target, duration]);

  return count;
}

export default useCountUp;
