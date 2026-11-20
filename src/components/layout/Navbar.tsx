import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BAND_ASSETS } from '../../data/bandData';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'photos', label: 'PHOTOS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoWheelRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > 40);

      // Direct DOM transforms for 60-120fps scroll-driven logo rotation & progress bar
      if (logoWheelRef.current) {
        logoWheelRef.current.style.transform = `rotate(${(y * 0.14).toFixed(1)}deg)`;
      }
      if (progressBarRef.current) {
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const progress = Math.min(1, Math.max(0, y / maxScroll));
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = y + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'py-2.5 px-4 md:px-8' : 'py-5 px-4 md:px-10'
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={`relative overflow-hidden mx-auto flex items-center justify-between rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
            scrolled
              ? 'max-w-5xl px-4 md:px-6 py-2.5 bg-[#17151B]/85 backdrop-blur-xl border-[#B49A82]/35 shadow-[0_18px_50px_rgba(0,0,0,0.55)]'
              : 'max-w-7xl px-5 md:px-7 py-3 bg-[#17151B]/45 backdrop-blur-md border-[#B49A82]/15'
          }`}
        >
          {/* Scroll Progress Hairline Along Bottom of Navbar */}
          <span
            ref={progressBarRef}
            aria-hidden="true"
            style={{ transform: 'scaleX(0)' }}
            className="absolute bottom-0 left-6 right-6 h-[1.5px] origin-left bg-gradient-to-r from-[#B49A82]/20 via-[#B49A82] to-[#D8C9B8] transition-transform duration-150 ease-out pointer-events-none"
          />

          {/* Brand Logo (rotates smoothly as you scroll) */}
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] rounded-full pr-2 cursor-pointer"
          >
            <div
              ref={logoWheelRef}
              className="w-10 h-10 rounded-full overflow-hidden border border-[#B49A82]/40 group-hover:border-[#B49A82] bg-[#17151B] shrink-0 transition-[border-color] duration-700 will-change-transform"
            >
              <img
                src={BAND_ASSETS.logo}
                alt="Dope Sindu Official Logo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="leading-none">
              <span className="block font-[family-name:var(--font-serif-luxury)] text-lg md:text-xl tracking-[0.14em] text-[#D8C9B8] group-hover:text-[#B49A82] transition-colors duration-500 font-medium">
                DOPE SINDU
              </span>
              <span className="block font-[family-name:var(--font-sinhala)] text-[11px] text-[#B49A82] tracking-wider mt-0.5">
                ඩෝප් සිංදු
              </span>
            </div>
          </motion.button>

          {/* Desktop Links */}
          <ul
            onMouseLeave={() => setHoveredItem(null)}
            className="hidden md:flex items-center gap-3"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.25 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    className={`relative px-4 py-2 text-xs tracking-[0.24em] font-medium transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] rounded-full cursor-pointer ${
                      isActive
                        ? 'text-[#D8C9B8]'
                        : 'text-[#D8C9B8]/65 hover:text-[#D8C9B8]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 130, damping: 24 }}
                        className="absolute inset-0 rounded-full bg-[#B49A82]/12 border border-[#B49A82]/30"
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        transition={{ type: 'spring', stiffness: 150, damping: 24 }}
                        className="absolute inset-0 rounded-full bg-[#D8C9B8]/6"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        transition={{ type: 'spring', stiffness: 130, damping: 24 }}
                        className="absolute left-3 right-3 bottom-1 h-[1px] bg-gradient-to-r from-transparent via-[#B49A82] to-transparent"
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[#B49A82]/25 text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82]/50 transition-colors duration-500"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#17151B]/95 backdrop-blur-2xl flex flex-col items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 rounded-full overflow-hidden border border-[#B49A82]/40 mb-6"
            >
              <img
                src={BAND_ASSETS.logo}
                alt="Dope Sindu"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <ul className="flex flex-col items-center gap-7 mb-12">
              {NAV_ITEMS.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.12 + 0.08 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`font-[family-name:var(--font-serif-luxury)] text-3xl tracking-[0.18em] transition-colors duration-500 ${
                      activeSection === item.id
                        ? 'text-[#B49A82]'
                        : 'text-[#D8C9B8] hover:text-[#B49A82]'
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[11px] tracking-[0.3em] text-[#96777B] uppercase"
            >
              Chilaw, Sri Lanka • Drink Responsibly
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
