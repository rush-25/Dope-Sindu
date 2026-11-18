export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  layoutClass: string;
  aspectClass: string;
}

export const BAND_ASSETS = {
  logo: '/images/dopesindu/logo.webp',
  banner: '/images/dopesindu/banner.webp',
  heroStage: '/images/dopesindu/live-wide-stage.webp',
  aboutFeature: '/images/dopesindu/live-toast.webp',
  aboutSecondary: '/images/dopesindu/acoustic-duo.webp',
};

export const SOCIAL_LINKS = [
  {
    id: 'youtube',
    platform: 'YouTube',
    label: 'Watch Our Performances',
    handle: '@dopesindu',
    url: 'https://www.youtube.com/@dopesindu',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    label: 'Follow Our Journey',
    handle: '@dopesindu',
    url: 'https://www.tiktok.com/@dopesindu',
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    label: 'Connect With Us',
    handle: 'Dope Sindu',
    url: 'https://www.facebook.com/dopesindu/directory_contact_info',
  },
] as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'wide-stage',
    src: '/images/dopesindu/live-wide-stage.webp',
    alt: 'Dope Sindu performing live on stage with acoustic guitars, cajon, and warm stage lights',
    title: 'The Full Ensemble',
    subtitle: 'Live Acoustic Stage — Warm Lights & Timeless Chords',
    layoutClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'portrait-vocalist',
    src: '/images/dopesindu/portrait-vocalist.webp',
    alt: 'Dope Sindu lead vocalist singing with passion under warm concert lighting',
    title: 'In Full Voice',
    subtitle: 'Classic Melodies Reimagined',
    layoutClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'portrait-rhythm',
    src: '/images/dopesindu/portrait-rhythm.webp',
    alt: 'Dope Sindu percussionist smiling at the cajon beside vocalist',
    title: 'Rhythm & Brotherhood',
    subtitle: 'Behind the Groove',
    layoutClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'live-ensemble',
    src: '/images/dopesindu/live-ensemble.webp',
    alt: 'Dope Sindu performing beneath the illuminated Sinhala Dope Sindu Live marquee',
    title: 'Under the Marquee',
    subtitle: 'ඩෝප් සිංදු Live',
    layoutClass: 'md:col-span-8',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'acoustic-duo',
    src: '/images/dopesindu/acoustic-duo.webp',
    alt: 'Acoustic guitarist and bass guitarist locked into a Sri Lankan classic groove',
    title: 'Strings & Harmony',
    subtitle: 'Acoustic Guitar & Bass Session',
    layoutClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/11]',
  },
  {
    id: 'live-toast',
    src: '/images/dopesindu/live-toast.webp',
    alt: 'Dope Sindu raising a toast on stage beneath the Dope Sindu Live sign',
    title: 'The Signature Toast',
    subtitle: 'Drink Responsibly — Celebrate the Night',
    layoutClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/11]',
  },
  {
    id: 'live-harmony',
    src: '/images/dopesindu/live-harmony.webp',
    alt: 'Dope Sindu vocalists and guitarists in synchronized live performance',
    title: 'Golden Oldies Night',
    subtitle: 'Connecting Generations Through Song',
    layoutClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'live-duet',
    src: '/images/dopesindu/live-duet.webp',
    alt: 'Two vocalists trading verses live with accordion and percussion backing',
    title: 'Classic Baila Energy',
    subtitle: 'Live in Chilaw & Beyond',
    layoutClass: 'md:col-span-5',
    aspectClass: 'aspect-[16/10] md:aspect-[4/3]',
  },
  {
    id: 'vocalist-green-session',
    src: '/images/dopesindu/vocalist-green-session.webp',
    alt: 'Dope Sindu vocalist and percussionist singing at the microphone beside acoustic guitar',
    title: 'Soulful Delivery',
    subtitle: 'Vocals & Percussion Live',
    layoutClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'full-band-marquee',
    src: '/images/dopesindu/full-band-marquee.webp',
    alt: 'Full Dope Sindu band seated on stage beneath the illuminated Sinhala marquee sign',
    title: 'All Together Now',
    subtitle: 'Full Band Beneath the Marquee',
    layoutClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'live-quartet-groove',
    src: '/images/dopesindu/live-quartet-groove.webp',
    alt: 'Accordionist, acoustic guitarist, and percussionists locked into a live rhythm',
    title: 'Accordion & Pulse',
    subtitle: 'Classic Baila Instrumentation',
    layoutClass: 'md:col-span-8',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'bongo-percussion-solo',
    src: '/images/dopesindu/bongo-percussion-solo.webp',
    alt: 'Percussionist playing twin bongos passionately beside vocalist',
    title: 'Hands on the Bongos',
    subtitle: 'The Heartbeat of the Night',
    layoutClass: 'md:col-span-4',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'marquee-sign-closeup',
    src: '/images/dopesindu/marquee-sign-closeup.webp',
    alt: 'Illuminated Sinhala Dope Sindu Live vintage marquee sign',
    title: 'ඩෝප් සිංදු Live',
    subtitle: 'The Signature Stage Marquee',
    layoutClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'live-trio-harmony',
    src: '/images/dopesindu/live-trio-harmony.webp',
    alt: 'Three Dope Sindu musicians singing and playing acoustic guitar in harmony',
    title: 'Three-Part Harmony',
    subtitle: 'Unplugged Voices & Acoustic Strings',
    layoutClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'lead-singer-spotlight',
    src: '/images/dopesindu/lead-singer-spotlight.webp',
    alt: 'Vocalist in navy shirt singing into microphone with bandmates behind him',
    title: 'Center Stage',
    subtitle: 'Stories Sung from the Heart',
    layoutClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'monochrome-full-stage',
    src: '/images/dopesindu/monochrome-full-stage.webp',
    alt: 'Black and white wide shot of Dope Sindu performing live as a full collective',
    title: 'Timeless Monochrome',
    subtitle: 'Dope Sindu — Live Collective',
    layoutClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]',
  },
];

export const ABOUT_HIGHLIGHTS = [
  {
    title: 'GOLDEN OLDIES',
    detail: 'Timeless Sri Lankan melodies reborn with warmth',
  },
  {
    title: 'CLASSIC BAILA',
    detail: 'Infectious rhythm & celebratory live energy',
  },
  {
    title: 'LIVE ACOUSTIC VIBES',
    detail: 'Unplugged intimacy with contemporary soul',
  },
];

export const INSPIRED_ARTISTS = [
  'H.R. Jothipala',
  'Nihal Nelson',
  'Priya Sooriyasena',
  'Victor Rathnayaka',
  'C.T. Fernando',
];
