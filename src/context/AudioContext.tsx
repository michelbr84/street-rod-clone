// src/context/AudioContext.tsx
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';

/* 🔊 Interface do contexto de áudio */
interface AudioContextType {
  playMusic: () => void;
  pauseMusic: () => void;
  playEffect: (
    effect:
      | 'victory'
      | 'game_over'
      | 'button_click'
      | 'engine_roar'
      | 'crash'
      | 'siren'
      | 'gear_shift'
      | 'tire_screech'
  ) => void;
  isMusicPlaying: boolean;
}

/* 🎵 Criação do contexto */
const AudioContext = createContext<AudioContextType | undefined>(undefined);

/* 🚀 Provedor de áudio */
export function AudioProvider({ children }: { children: ReactNode }) {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  /* 🎶 Inicializa o áudio de fundo uma única vez */
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('/sounds/bg_music.mp3');
      bgMusicRef.current.loop = true; // 🔁 Loop contínuo
      bgMusicRef.current.volume = 0.5; // 🎚️ Volume inicial
    }
  }, []);

  /* ▶️ Tocar música de fundo */
  const playMusic = () => {
    if (bgMusicRef.current && !isMusicPlaying) {
      bgMusicRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => console.error('Erro ao reproduzir música:', err));
    }
  };

  /* ⏸️ Pausar música de fundo */
  const pauseMusic = () => {
    if (bgMusicRef.current && isMusicPlaying) {
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  /* 🔔 Reproduzir efeitos sonoros */
  const playEffect = (
    effect:
      | 'victory'
      | 'game_over'
      | 'button_click'
      | 'engine_roar'
      | 'crash'
      | 'siren'
      | 'gear_shift'
      | 'tire_screech'
  ) => {
    const effectSounds: Record<string, string> = {
      victory: '/sounds/victory.mp3',
      game_over: '/sounds/game_over.mp3',
      button_click: '/sounds/button_click.mp3',
      engine_roar: '/sounds/engine_roar.mp3',
      crash: '/sounds/crash.mp3',
      siren: '/sounds/siren.mp3',
      gear_shift: '/sounds/gear_shift.mp3',
      tire_screech: '/sounds/tire_screech.mp3',
    };

    const sound = new Audio(effectSounds[effect]);
    sound.volume = 0.8; // 🔊 Volume do efeito
    sound.currentTime = 0; // ⏪ Reinicia o som para evitar sobreposição
    sound.play().catch((err) => console.error(`Erro ao reproduzir efeito ${effect}:`, err));
  };

  return (
    <AudioContext.Provider value={{ playMusic, pauseMusic, playEffect, isMusicPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

/* 🎯 Hook personalizado para acessar o contexto de áudio */
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
