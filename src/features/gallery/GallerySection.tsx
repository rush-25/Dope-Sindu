import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_PHOTOS, type GalleryPhoto } from '../../data/bandData';
import { useSectionReveal } from '../../hooks/useSectionReveal';

interface TiltCardProps {
  photo: GalleryPhoto;
  index: number;
  onOpen: (index: number) => void;
}

function EditorialPhotoCard({ photo, index, onOpen }: TiltCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const quickTiltRef = useRef<{
    rx: gsap.QuickToFunc;
    ry: gsap.QuickToFunc;
    y: gsap.QuickToFunc;
  } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(card, { transformPerspective: 1100 });
    quickTiltRef.current = {
      rx: gsap.quickTo(card, 'rotationX', { duration: 1.1, ease: 'power3.out' }),
      ry: gsap.quickTo(card, 'rotationY', { duration: 1.1, ease: 'power3.out' }),
      y: gsap.quickTo(card, 'y', { duration: 1.1, ease: 'power3.out' }),
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    const tilt = quickTiltRef.current;
    if (!card || !tilt) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    tilt.rx(-y * 4.5);
    tilt.ry(x * 4.5);
    tilt.y(-4);
  };

  const handlePointerLeave = () => {
    const tilt = quickTiltRef.current;
    if (!tilt) return;
    tilt.rx(0);
    tilt.ry(0);
    tilt.y(0);
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(index)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`gallery-card group relative block w-full h-full text-left overflow-hidden rounded-2xl bg-[#29232B] border border-[#B49A82]/20 transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#B49A82]/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] cursor-pointer ${photo.layoutClass}`}
      style={{ willChange: 'transform' }}
    >
      <div className={`relative w-full h-full overflow-hidden ${photo.aspectClass}`}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] filter saturate-[0.9] contrast-[1.03] group-hover:saturate-100 will-change-transform"
        />

        {/* Dusty Rose & Midnight Plum Editorial Tint */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#17151B]/90 via-[#50363F]/18 to-transparent opacity-80 group-hover:opacity-65 transition-opacity duration-500"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#96777B]/10 mix-blend-soft-light pointer-events-none"
        />

        {/* Top Expand Icon */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-end">
          <span className="w-9 h-9 rounded-full bg-[#17151B]/65 backdrop-blur-md border border-[#B49A82]/25 flex items-center justify-center text-[#D8C9B8] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Expand className="w-4 h-4 text-[#B49A82]" />
          </span>
        </div>

        {/* Bottom Editorial Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <p className="text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.24em] uppercase text-[#B49A82] mb-1">
            {photo.subtitle}
          </p>
          <h3 className="font-[family-name:var(--font-serif-luxury)] text-xl sm:text-2xl lg:text-3xl font-normal text-[#D8C9B8] tracking-wide">
            {photo.title}
          </h3>
        </div>
      </div>
    </button>
  );
}

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useSectionReveal(sectionRef, [
    { selector: '.gallery-header-reveal', y: 26, duration: 0.9, stagger: 0.12 },
    { selector: '.gallery-card', y: 34, duration: 0.85, stagger: 0.08 },
  ]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <section
      id="photos"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 bg-[#17151B]"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(80,54,63,0.28)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <div className="gallery-header-reveal flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#B49A82] mb-4">
              <span className="w-8 h-[1px] bg-[#B49A82]/60" />
              <span>Live Archive</span>
            </div>
            <h2 className="gallery-header-reveal font-[family-name:var(--font-serif-luxury)] font-light text-4xl sm:text-6xl lg:text-7xl text-[#D8C9B8] tracking-[0.02em] leading-[0.95]">
              CAPTURED IN <span className="italic text-[#B49A82]">MUSIC.</span>
            </h2>
          </div>
          <p className="gallery-header-reveal text-sm sm:text-base text-[#D8C9B8]/70 font-light max-w-sm md:text-right leading-relaxed">
            Every performance. Every moment. Every memory.
          </p>
        </div>

        <div className="deco-line mb-12 sm:mb-14" />

        {/* Asymmetric Editorial Magazine Grid */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7">
          {GALLERY_PHOTOS.map((photo, index) => (
            <EditorialPhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onOpen={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 h-[100dvh] overflow-hidden touch-none overscroll-none bg-[#17151B]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Controls */}
            <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
              <div className="text-xs tracking-[0.28em] uppercase text-[#B49A82]">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery lightbox"
                className="p-2.5 rounded-full border border-[#B49A82]/30 bg-[#29232B]/70 text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4 min-h-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photograph"
                className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-[#B49A82]/30 bg-[#29232B]/70 text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82] transition-colors mr-4 shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 || info.velocity.x < -300) {
                    showNext();
                  } else if (info.offset.x > 50 || info.velocity.x > 300) {
                    showPrev();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[72vh] w-fit max-w-full mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              >
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  draggable={false}
                  className="max-h-[72vh] max-w-full w-auto object-contain rounded-xl border border-[#B49A82]/25 shadow-[0_24px_80px_rgba(0,0,0,0.65)] pointer-events-none select-none"
                />
              </motion.div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photograph"
                className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-[#B49A82]/30 bg-[#29232B]/70 text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82] transition-colors ml-4 shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption + Mobile Side Navigation */}
            <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photograph"
                className="flex sm:hidden items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#B49A82]/35 bg-[#29232B] text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82] transition-colors shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex-1 min-w-0 text-center sm:text-left"
              >
                <p className="text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.26em] uppercase text-[#B49A82] truncate">
                  {activePhoto.subtitle}
                </p>
                <h3 className="font-[family-name:var(--font-serif-luxury)] text-xl sm:text-3xl text-[#D8C9B8] truncate">
                  {activePhoto.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photograph"
                className="flex sm:hidden items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#B49A82]/35 bg-[#29232B] text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82] transition-colors shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
