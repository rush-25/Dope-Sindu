import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

const GallerySection = lazy(() =>
  import('./components/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ContactFooterSection = lazy(() =>
  import('./components/ContactFooterSection').then((m) => ({ default: m.ContactFooterSection }))
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#17151B] text-[#D8C9B8] selection:bg-[#50363F] selection:text-[#D8C9B8]">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-[40vh] bg-[#17151B]" />}>
          <GallerySection />
          <AboutSection />
          <ContactFooterSection />
        </Suspense>
      </main>
      <BackgroundMusicPlayer />
      <WhatsAppButton />
    </div>
  );
}
