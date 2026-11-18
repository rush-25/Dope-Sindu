import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, ArrowUpRight, Disc3 } from 'lucide-react';
import { BAND_ASSETS } from '../data/bandData';
import { VinylStage3D } from './VinylStage3D';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 1.05,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'transform',
      });
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!bgImageRef.current || window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(bgImageRef.current, {
        x: -x,
        y: -y,
        duration: 1.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#17151B] flex flex-col justify-between pt-28 sm:pt-32 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14"
    >
      {/* Background Live Band Photography with Slow Parallax */}
      <div
        ref={bgImageRef}
        className="absolute -inset-6 z-0 pointer-events-none will-change-transform"
      >
        <img
          src={BAND_ASSETS.heroStage}
          alt="Dope Sindu live acoustic performance"
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter saturate-[0.82] contrast-[1.06]"
        />
      </div>

      {/* Deep Plum & Burgundy Cinematic Overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#17151B]/95 via-[#17151B]/70 to-[#50363F]/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-t from-[#17151B] via-[#17151B]/45 to-[#17151B]/70"
      />

      {/* Warm Champagne Ambient Light Reflection */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-[#B49A82]/10 blur-[140px] pointer-events-none z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 w-[440px] h-[440px] rounded-full bg-[#50363F]/35 blur-[130px] pointer-events-none z-0"
      />

      {/* Subtle Vintage Film Grain */}
      <div aria-hidden="true" className="absolute inset-0 z-0 vintage-grain pointer-events-none" />

      {/* Top Editorial Metadata Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 pt-2 hero-stagger">
        <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase text-[#B49A82]">
          <span className="hidden sm:inline-block w-8 h-[1px] bg-[#B49A82]/60" />
          <span>Chilaw, Sri Lanka • Live Acoustic Collective</span>
        </div>

        {/* Creative "DRINK RESPONSIBLY" Brand Signature */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#B49A82]/30 bg-[#29232B]/55 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B49A82]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.26em] sm:tracking-[0.32em] uppercase text-[#D8C9B8]/90 font-medium">
            Drink Responsibly
          </span>
        </div>
      </div>

      {/* Main Editorial Split Composition — Anchored Toward Bottom of Hero */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center lg:items-end mt-auto pt-6 pb-4 sm:pt-10 sm:pb-6 lg:pb-8">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="hero-stagger flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="font-[family-name:var(--font-sinhala)] text-xl sm:text-3xl text-[#B49A82] font-normal tracking-wide">
              ඩෝප් සිංදු
            </span>
            <span className="h-[1px] w-10 sm:w-12 bg-[#96777B]/60" />
          </div>

          <h1 className="hero-stagger font-[family-name:var(--font-serif-luxury)] font-light text-[clamp(3rem,12vw,7rem)] leading-[0.88] tracking-[0.03em] text-[#D8C9B8] uppercase">
            DOPE
            <span className="block italic font-normal text-[#B49A82] pl-3 sm:pl-10">
              SINDU
            </span>
          </h1>

          <p className="hero-stagger mt-5 sm:mt-6 font-[family-name:var(--font-display-bold)] text-lg sm:text-2xl md:text-[1.7rem] tracking-[0.1em] sm:tracking-[0.12em] text-[#D8C9B8] max-w-xl">
            “A FRESH MUSICAL VIBE BY THE NEW GENERATION.”
          </p>

          <p className="hero-stagger mt-2.5 sm:mt-3 text-sm sm:text-base text-[#D8C9B8]/75 font-light leading-relaxed max-w-lg">
            Bringing timeless Sri Lankan classics, golden oldies and baila back to life with a fresh contemporary sound.
          </p>

          {/* Dual CTA Buttons */}
          <div className="hero-stagger mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo('photos')}
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full bg-[#B49A82] text-[#17151B] text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-400 hover:bg-[#D8C9B8] hover:shadow-[0_0_28px_rgba(180,154,130,0.35)] cursor-pointer"
            >
              <span>Explore Our Music</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full border border-[#B49A82]/45 bg-[#29232B]/50 backdrop-blur-md text-[#D8C9B8] text-xs font-medium tracking-[0.22em] uppercase transition-all duration-400 hover:border-[#B49A82] hover:bg-[#50363F]/45 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 text-[#B49A82] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right Interactive 3D Vinyl Stage */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end hero-stagger">
          <div className="relative w-full max-w-[260px] sm:max-w-[330px] lg:max-w-[390px] aspect-square flex items-center justify-center">
            {/* Warm Ambient Backlight Behind Vinyl */}
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#50363F]/45 via-[#B49A82]/15 to-transparent blur-2xl pointer-events-none"
            />
            {/* Art Deco Halo Rings */}
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-full border border-[#B49A82]/25 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-10 rounded-full border border-[#96777B]/25 pointer-events-none"
            />

            <VinylStage3D className="w-full h-full" />

            {/* Subtle Editorial Floating Caption */}
            <div className="absolute bottom-3 right-2 sm:right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17151B]/80 backdrop-blur-md border border-[#B49A82]/25">
              <Disc3 className="w-3.5 h-3.5 text-[#B49A82] animate-vinyl-slow" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#D8C9B8]/80">
                Live Vinyl Session
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Decorative Soundwave & Custom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-end justify-between gap-4 pt-4 border-t border-[#B49A82]/15 hero-stagger">
        {/* Animated Decorative Sound Wave */}
        <div className="flex items-end gap-1.5 h-7" aria-hidden="true">
          {[0.4, 0.85, 0.55, 1, 0.7, 0.9, 0.45, 0.75, 0.5].map((scale, i) => (
            <span
              key={i}
              className="wave-bar w-[2px] rounded-full bg-[#B49A82]/65"
              style={{
                height: `${Math.round(scale * 24)}px`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
          <span className="ml-3 text-[10px] tracking-[0.25em] uppercase text-[#96777B] self-center hidden sm:inline">
            Golden Oldies • Baila • Acoustic
          </span>
        </div>

        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => scrollTo('photos')}
          className="group flex items-center gap-2.5 sm:gap-3 min-h-[44px] text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.26em] uppercase text-[#D8C9B8]/70 hover:text-[#B49A82] transition-colors cursor-pointer"
        >
          <span>Scroll to Explore</span>
          <span className="relative flex items-center justify-center w-7 h-11 rounded-full border border-[#B49A82]/35 group-hover:border-[#B49A82] transition-colors">
            <span className="w-1 h-2 rounded-full bg-[#B49A82] animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
}
