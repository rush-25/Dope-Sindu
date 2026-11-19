import { useRef } from 'react';
import { Disc3, Music2 } from 'lucide-react';
import { ABOUT_HIGHLIGHTS, BAND_ASSETS, INSPIRED_ARTISTS } from '../../data/bandData';
import { useSectionReveal } from '../../hooks/useSectionReveal';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, [
    { selector: '.about-reveal', y: 28, duration: 0.9, stagger: 0.1 },
  ]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 bg-[#29232B] overflow-hidden"
    >
      {/* Atmospheric Dusty Burgundy & Plum Glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(80,54,63,0.42)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(23,21,27,0.75)_0%,transparent_70%)] pointer-events-none"
      />
      <div aria-hidden="true" className="absolute inset-0 vintage-grain pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Split: Editorial Photography + Subtle Rotating Vinyl */}
        <div className="lg:col-span-6 relative about-reveal">
          {/* Peeking Rotating Vinyl Record */}
          <div
            aria-hidden="true"
            className="hidden sm:flex absolute -top-10 -right-8 w-44 h-44 rounded-full bg-[#17151B] border border-[#B49A82]/35 shadow-2xl items-center justify-center animate-vinyl-slow pointer-events-none z-0"
          >
            <div className="w-36 h-36 rounded-full border border-[#B49A82]/15 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-[#96777B]/20 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#B49A82]/50">
                  <img
                    src={BAND_ASSETS.logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary Editorial Photograph Frame */}
          <div className="relative z-10 rounded-2xl overflow-hidden border border-[#B49A82]/30 bg-[#17151B] p-2 sm:p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
              <img
                src={BAND_ASSETS.aboutFeature}
                alt="Dope Sindu band members raising a toast together on stage"
                loading="lazy"
                className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#17151B]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-[family-name:var(--font-sinhala)] text-sm text-[#B49A82]">
                  ඩෝප් සිංදු — හලාවත
                </span>
                <span className="text-[10px] tracking-[0.26em] uppercase text-[#D8C9B8]/80">
                  Chilaw Town
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Floating Acoustic Card */}
          <div className="hidden md:block relative z-20 -mt-14 ml-auto mr-6 w-64 rounded-xl overflow-hidden border border-[#B49A82]/35 bg-[#17151B] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
            <div className="aspect-[16/10] overflow-hidden rounded-lg">
              <img
                src={BAND_ASSETS.aboutSecondary}
                alt="Dope Sindu acoustic guitar and bass performance"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Right Split: Editorial Narrative */}
        <div className="lg:col-span-6">
          <div className="about-reveal flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#B49A82] mb-4">
            <span className="w-8 h-[1px] bg-[#B49A82]/60" />
            <span>Our Story</span>
          </div>

          <h2 className="about-reveal font-[family-name:var(--font-serif-luxury)] font-light text-4xl sm:text-5xl lg:text-6xl text-[#D8C9B8] tracking-[0.02em] leading-[0.98] mb-7">
            MORE THAN JUST <span className="italic text-[#B49A82]">MUSIC.</span>
          </h2>

          <div className="about-reveal space-y-4 text-sm sm:text-[15px] text-[#D8C9B8]/80 font-light leading-[1.8]">
            <p>
              <strong className="font-medium text-[#D8C9B8]">Dope Sindu</strong> (
              <span className="font-[family-name:var(--font-sinhala)] text-[#B49A82]">
                ඩෝප් සිංදු
              </span>
              ) is a Sri Lankan musical project and live-performance group based in Chilaw Town, bringing a fresh vibe to timeless Sri Lankan music.
            </p>
            <p>
              With a passion for golden oldies, baila and classic melodies, we bring legendary songs back to life through contemporary live acoustic performances.
            </p>
            <p>
              Inspired by legendary Sri Lankan artists such as H.R. Jothipala, Nihal Nelson, Priya Sooriyasena, Victor Rathnayaka and C.T. Fernando, our music connects generations through unforgettable melodies.
            </p>
            <p className="font-[family-name:var(--font-serif-luxury)] italic text-xl sm:text-2xl text-[#B49A82] pt-1">
              “We believe great music never gets old. It simply finds a new generation.”
            </p>
          </div>

          {/* Inspired By Tribute Pills */}
          <div className="about-reveal mt-7 pt-6 border-t border-[#B49A82]/15">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#96777B] mb-3 flex items-center gap-2">
              <Music2 className="w-3.5 h-3.5 text-[#B49A82]" />
              <span>Musical Roots & Inspiration</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {INSPIRED_ARTISTS.map((artist) => (
                <span
                  key={artist}
                  className="px-3 py-1 rounded-full bg-[#17151B]/65 border border-[#B49A82]/20 text-xs text-[#D8C9B8]/80"
                >
                  {artist}
                </span>
              ))}
            </div>
          </div>

          {/* Three Highlight Elements */}
          <div className="about-reveal mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="group p-4 rounded-xl bg-[#17151B]/60 border border-[#B49A82]/20 hover:border-[#B49A82]/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Disc3 className="w-3.5 h-3.5 text-[#B49A82]" />
                  <h3 className="font-[family-name:var(--font-display-bold)] text-sm tracking-[0.14em] text-[#D8C9B8]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#D8C9B8]/60 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
