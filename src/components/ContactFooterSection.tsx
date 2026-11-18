import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Mail, Phone, Sparkles } from 'lucide-react';
import { BAND_ASSETS, SOCIAL_LINKS } from '../data/bandData';
import { useSectionReveal } from '../hooks/useSectionReveal';

function PlatformIcon({ id, className = 'w-5 h-5' }: { id: string; className?: string }) {
  if (id === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (id === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function ContactFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showBookingInfo, setShowBookingInfo] = useState(false);

  useSectionReveal(sectionRef, [
    { selector: '.contact-reveal', y: 26, duration: 0.9, stagger: 0.1 },
  ]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-24 sm:pt-32 pb-12 px-5 sm:px-8 lg:px-14 bg-gradient-to-b from-[#50363F] via-[#2D2129] to-[#17151B] overflow-hidden"
    >
      {/* Subtle Atmospheric Overlays */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[#B49A82]/10 blur-[140px] pointer-events-none"
      />
      <div aria-hidden="true" className="absolute inset-0 vintage-grain pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="contact-reveal inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#B49A82] mb-5">
            <span className="w-8 h-[1px] bg-[#B49A82]/60" />
            <span>Bookings & Connect</span>
            <span className="w-8 h-[1px] bg-[#B49A82]/60" />
          </div>

          <h2 className="contact-reveal font-[family-name:var(--font-serif-luxury)] font-light text-4xl sm:text-6xl lg:text-[5.2rem] text-[#D8C9B8] tracking-[0.02em] leading-[0.95]">
            LET’S MAKE SOME <span className="italic text-[#B49A82]">NOISE.</span>
          </h2>

          <p className="contact-reveal mt-5 text-sm sm:text-base text-[#D8C9B8]/80 font-light leading-relaxed max-w-xl mx-auto">
            Have an event, collaboration or something special in mind? Get in touch with Dope Sindu.
          </p>

          {/* Primary Contact CTA */}
          <div className="contact-reveal mt-8 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowBookingInfo((prev) => !prev)}
              aria-expanded={showBookingInfo}
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-8 py-4 min-h-[44px] rounded-full bg-[#B49A82] text-[#17151B] text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-400 hover:bg-[#D8C9B8] hover:shadow-[0_0_32px_rgba(180,154,130,0.38)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Us / Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Placeholder Official Contact Details Drawer */}
            <AnimatePresence>
              {showBookingInfo && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden w-full max-w-xl mt-6"
                >
                  <div className="p-6 rounded-2xl bg-[#17151B]/80 backdrop-blur-xl border border-[#B49A82]/30 text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-[#B49A82]/15 pb-3">
                      <span className="text-[11px] tracking-[0.26em] uppercase text-[#B49A82]">
                        Official Booking Desk
                      </span>
                      <span className="text-[11px] text-[#96777B]">Chilaw, Sri Lanka</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#B49A82] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.22em] uppercase text-[#96777B]">
                            Official Email
                          </p>
                          <p className="text-sm text-[#D8C9B8]/85 mt-0.5">
                            [Official Email Placeholder]
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[#B49A82] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.22em] uppercase text-[#96777B]">
                            Booking Hotline
                          </p>
                          <p className="text-sm text-[#D8C9B8]/85 mt-0.5">
                            [Official Phone Number Placeholder]
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#D8C9B8]/60 font-light">
                      For immediate inquiries, reach out directly via our official Facebook, TikTok, or YouTube channels below.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Media Cards */}
        <div className="contact-reveal mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#17151B]/65 backdrop-blur-md border border-[#B49A82]/20 hover:border-[#B49A82]/55 transition-all duration-400 hover:-translate-y-1 flex flex-col justify-between min-h-[170px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-full bg-[#29232B] border border-[#B49A82]/30 flex items-center justify-center text-[#B49A82] group-hover:bg-[#B49A82] group-hover:text-[#17151B] transition-colors duration-300">
                  <PlatformIcon id={social.id} className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#B49A82]/60 group-hover:text-[#B49A82] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>

              <div className="mt-7">
                <p className="text-[10px] tracking-[0.26em] uppercase text-[#96777B] mb-1">
                  {social.handle}
                </p>
                <h3 className="font-[family-name:var(--font-serif-luxury)] text-2xl sm:text-[1.75rem] text-[#D8C9B8] font-normal">
                  {social.platform}
                </h3>
                <p className="text-xs sm:text-sm text-[#D8C9B8]/70 font-light mt-1">
                  {social.label}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Luxury Footer */}
        <footer className="mt-20 sm:mt-24 pt-10 border-t border-[#B49A82]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand Identity */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#B49A82]/40 bg-[#17151B] shrink-0">
                <img
                  src={BAND_ASSETS.logo}
                  alt="Dope Sindu Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-serif-luxury)] text-xl tracking-[0.14em] text-[#D8C9B8]">
                  DOPE SINDU
                </p>
                <p className="font-[family-name:var(--font-sinhala)] text-xs text-[#B49A82]">
                  ඩෝප් සිංදු
                </p>
              </div>
            </div>

            {/* Understated Social Icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platform} — ${social.label}`}
                  className="w-10 h-10 rounded-full border border-[#B49A82]/25 bg-[#29232B]/60 flex items-center justify-center text-[#D8C9B8]/75 hover:text-[#B49A82] hover:border-[#B49A82] transition-colors"
                >
                  <PlatformIcon id={social.id} className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.26em] uppercase text-[#D8C9B8]/75 hover:text-[#B49A82] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <span className="w-8 h-8 rounded-full border border-[#B49A82]/30 flex items-center justify-center group-hover:border-[#B49A82] group-hover:-translate-y-0.5 transition-all">
                <ArrowUp className="w-3.5 h-3.5 text-[#B49A82]" />
              </span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#B49A82]/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-center text-[11px] tracking-[0.22em] text-[#D8C9B8]/55 uppercase">
            <p>© 2026 Dope Sindu. All Rights Reserved.</p>
            <p className="text-[#D8C9B8]/60">
              Developed by:{' '}
              <a
                href="https://ceyloninnovation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B49A82] hover:text-[#D8C9B8] transition-colors underline underline-offset-4 decoration-[#B49A82]/35 hover:decoration-[#D8C9B8]"
              >
                Ceylon Innovation Services (PVT) LTD
              </a>
            </p>
            <p className="text-[#B49A82] tracking-[0.3em]">DRINK RESPONSIBLY.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
