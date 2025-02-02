// src/hooks/useSound.ts
import { useEffect, useRef } from 'react';

export function useSound(src: string, volume: number = 1, loop: boolean = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
    audioRef.current.loop = loop;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src, volume, loop]);

  const play = () => audioRef.current?.play();
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
}
