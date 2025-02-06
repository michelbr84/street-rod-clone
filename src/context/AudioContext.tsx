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
      | 'brake'
      | 'accelerate'
  ) => void;
  isMusicPlaying: boolean;
  volume: number;
  setVolume: (value: number) => void;
}

/* 🎵 Criação do contexto */
const AudioContext = createContext<AudioContextType | undefined>(undefined);

/* 🚀 Provedor de Áudio */
export function AudioProvider({ children }: { children: ReactNode }) {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const [volume, setVolumeState] = useState<number>(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });

  const testSound = useRef<HTMLAudioElement>(new Audio('/sounds/test-sound.mp3'));

  /* 🎶 Inicializa o áudio de fundo uma única vez */
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('/sounds/bg_music.mp3');
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = volume;
    }

    testSound.current.volume = volume;
  }, [volume]);

  /* 🔊 Atualiza o volume globalmente */
  const handleSetVolume = (value: number) => {
    setVolumeState(value);
    localStorage.setItem('audioVolume', value.toString());

    if (bgMusicRef.current) {
      bgMusicRef.current.volume = value;
      bgMusicRef.current.muted = value === 0; // 🔇 Silenciar se o volume for 0
    }

    testSound.current.volume = value;
    testSound.current.muted = value === 0;

    if (value > 0) {
      testSound.current.currentTime = 0;
      testSound.current
        .play()
        .catch((err) => console.error('Erro ao reproduzir som de teste:', err));
    }
  };

  /* ▶️ Tocar música de fundo */
  const playMusic = () => {
    if (bgMusicRef.current && !isMusicPlaying && volume > 0) {
      bgMusicRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) =>
          console.warn('🔇 Reprodução bloqueada. Aguarde uma interação do usuário.', err)
        );
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
      | 'brake'
      | 'accelerate'
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
      brake: '/sounds/brake.mp3',
      accelerate: '/sounds/accelerate.mp3',
    };

    const soundPath = effectSounds[effect];

    if (soundPath) {
      const sound = new Audio(soundPath);
      sound.volume = volume;
      sound.muted = volume === 0; // 🔇 Silenciar se o volume for 0
      sound.currentTime = 0;
      sound.play().catch((err) => console.warn(`Erro ao reproduzir efeito ${effect}:`, err));
    }
  };

  return (
    <AudioContext.Provider
      value={{
        playMusic,
        pauseMusic,
        playEffect,
        isMusicPlaying,
        volume,
        setVolume: handleSetVolume,
      }}
    >
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
