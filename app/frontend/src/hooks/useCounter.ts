import { useEffect, useState } from 'react';

export function useCounter(shouldStart: boolean, target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = target / (duration / 16); // assuming 60fps
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    step();
  }, [shouldStart, target, duration]);

  return count;
}
