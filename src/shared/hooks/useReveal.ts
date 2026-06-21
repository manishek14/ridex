import { useEffect, useRef } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook to handle "reveal" animations using Intersection Observer.
 * Adds 'on' class to elements with 'rv' class when they enter viewport.
 */
export function useReveal(options: UseRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const revealElements = container.querySelectorAll(".rv");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("on");
          }
        });
      },
      { threshold, rootMargin }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return containerRef;
}
