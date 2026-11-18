import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

export interface RevealGroup {
  selector: string;
  y?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Reveals GSAP-animated elements when their container section enters (or is above) the viewport.
 * Falls back immediately to visible state when prefers-reduced-motion is enabled.
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

    let hasAnimated = false;
    let observer: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      const reveal = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        for (const group of groups) {
          gsap.fromTo(
            group.selector,
            { y: group.y ?? 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: group.duration ?? 0.9,
              stagger: group.stagger ?? 0.1,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );
        }
      };

      if (sectionEl.getBoundingClientRect().top < window.innerHeight * 0.95) {
        reveal();
        return;
      }

      gsap.set(
        groups.map((g) => g.selector).join(', '),
        { opacity: 0 }
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
              reveal();
              observer?.disconnect();
              break;
            }
          }
        },
        { threshold: 0.02 }
      );

      observer.observe(sectionEl);
    }, sectionRef);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
    // groups is static per component call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef]);
}
