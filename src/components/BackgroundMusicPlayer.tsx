import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/music/background.mp3" loop preload="metadata" />

      <button
        type="button"
        onClick={togglePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause background music' : 'Play background music'}
        className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40 inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 rounded-full bg-[#29232B]/85 hover:bg-[#50363F]/85 backdrop-blur-xl border border-[#B49A82]/35 hover:border-[#B49A82]/70 text-[#D8C9B8] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A82] cursor-pointer"
      >
        <span className="w-7 h-7 rounded-full bg-[#B49A82] text-[#17151B] flex items-center justify-center shrink-0">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </span>

        <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-medium text-[#D8C9B8]">
          {isPlaying ? 'Playing' : 'Play Song'}
        </span>

        {isPlaying && (
          <span className="flex items-end gap-0.5 h-3.5 pr-0.5" aria-hidden="true">
            {[0.5, 1, 0.7].map((scale, i) => (
              <span
                key={i}
                className="wave-bar w-[2px] rounded-full bg-[#B49A82]"
                style={{
                  height: `${Math.round(scale * 14)}px`,
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </span>
        )}
      </button>
    </>
  );
}
