import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

export interface RevealGroup {
  selector: string;
  y?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Observes each individual matched element inside sectionRef so every row, card, and heading
 * animates smoothly into view as you scroll down the page (and replays when scrolled back down).
 */
export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  groups: RevealGroup[]
) {
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || groups.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const elementConfig = new Map<
      HTMLElement,
      { y: number; duration: number; stagger: number; revealed: boolean }
    >();

    for (const group of groups) {
      const nodes = sectionEl.querySelectorAll<HTMLElement>(group.selector);
      const yOffset = (group.y ?? 28) * 1.15;
      const dur = (group.duration ?? 1.0) * 2.5;
      const stag = (group.stagger ?? 0.1) * 2.2;

      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const alreadyAboveOrVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
        elementConfig.set(el, {
          y: yOffset,
          duration: dur,
          stagger: stag,
          revealed: alreadyAboveOrVisible,
        });

        if (!alreadyAboveOrVisible && rect.top >= window.innerHeight * 0.92) {
          gsap.set(el, { opacity: 0, y: yOffset, scale: 0.97 });
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;

        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const cfg = elementConfig.get(el);
          if (!cfg) continue;

          if (entry.isIntersecting) {
            if (!cfg.revealed) {
              cfg.revealed = true;
              const delay = Math.min(batchIndex * cfg.stagger, 0.9);
              batchIndex++;

              gsap.to(el, {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: cfg.duration,
                delay,
                ease: 'power2.out',
                force3D: true,
                overwrite: 'auto',
                clearProps: 'transform,opacity',
              });
            }
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.98) {
            // Reset when scrolled back above the element so scrolling down replays the reveal
            cfg.revealed = false;
            gsap.set(el, { opacity: 0, y: cfg.y, scale: 0.97, overwrite: 'auto' });
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    elementConfig.forEach((_, el) => observer.observe(el));

    return () => {
      observer.disconnect();
      elementConfig.forEach((_, el) => gsap.set(el, { clearProps: 'transform,opacity' }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef]);
}
