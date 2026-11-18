import { WHATSAPP_CONTACT } from '../data/bandData';

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_CONTACT.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONTACT.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dope Sindu on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1F9D55] hover:bg-[#25D366] animate-whatsapp-blink text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
}
