import { useState, useEffect } from "react";

type RootElement = Element | Document | null | undefined;

export default function useIsVisible(
  ref: React.RefObject<HTMLElement | null>,
  triggerOnce: boolean = false,
  threshold: number = 0.5,
  root: RootElement = null
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIntersecting(false);
        }
      },
      {
        root: root,
        threshold: threshold,
      }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
    };
  }, [ref, triggerOnce]);

  return isIntersecting;
}
