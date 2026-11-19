import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './features/home/HeroSection';
import { WhatsAppButton } from './components/floating/WhatsAppButton';
import { BackgroundMusicPlayer } from './components/floating/BackgroundMusicPlayer';

const GallerySection = lazy(() =>
  import('./features/gallery/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const AboutSection = lazy(() =>
  import('./features/about/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ContactFooterSection = lazy(() =>
  import('./features/contact/ContactFooterSection').then((m) => ({
    default: m.ContactFooterSection,
  }))
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
