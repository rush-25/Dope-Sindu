import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#17151B] text-[#D8C9B8] selection:bg-[#50363F] selection:text-[#D8C9B8]">
      <Navbar />
      <main>
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <ContactFooterSection />
      </main>
      <BackgroundMusicPlayer />
      <WhatsAppButton />
    </div>
  );
}
