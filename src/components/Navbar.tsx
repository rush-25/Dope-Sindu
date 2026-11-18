import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BAND_ASSETS } from '../data/bandData';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'photos', label: 'PHOTOS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 px-4 md:px-8' : 'py-5 px-4 md:px-10'
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={`mx-auto max-w-7xl flex items-center justify-between px-5 md:px-7 py-3 rounded-full transition-all duration-500 border ${
            scrolled
              ? 'bg-[#17151B]/80 backdrop-blur-xl border-[#B49A82]/25 shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
              : 'bg-[#17151B]/45 backdrop-blur-md border-[#B49A82]/15'
          }`}
        >
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] rounded-full pr-2"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B49A82]/40 bg-[#17151B] shrink-0 transition-transform duration-500 group-hover:scale-105">
              <img
                src={BAND_ASSETS.logo}
                alt="Dope Sindu Official Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-none">
              <span className="block font-[family-name:var(--font-serif-luxury)] text-lg md:text-xl tracking-[0.14em] text-[#D8C9B8] font-medium">
                DOPE SINDU
              </span>
              <span className="block font-[family-name:var(--font-sinhala)] text-[11px] text-[#B49A82] tracking-wider mt-0.5">
                ඩෝප් සිංදු
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative py-1.5 text-xs tracking-[0.24em] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] rounded ${
                      isActive
                        ? 'text-[#D8C9B8]'
                        : 'text-[#D8C9B8]/65 hover:text-[#B49A82]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-gradient-to-r from-transparent via-[#B49A82] to-transparent"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[#B49A82]/25 text-[#D8C9B8] hover:text-[#B49A82] hover:border-[#B49A82]/50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#17151B]/95 backdrop-blur-2xl flex flex-col items-center justify-center px-8"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#B49A82]/40 mb-6">
              <img
                src={BAND_ASSETS.logo}
                alt="Dope Sindu"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="flex flex-col items-center gap-7 mb-12">
              {NAV_ITEMS.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`font-[family-name:var(--font-serif-luxury)] text-3xl tracking-[0.18em] transition-colors ${
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
            <p className="text-[11px] tracking-[0.3em] text-[#96777B] uppercase">
              Chilaw, Sri Lanka • Drink Responsibly
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
