// src/pages/Race.tsx
import { useState, useEffect } from 'react';
import { usePolice } from '../context/PoliceContext';
import { useRace } from '../context/RaceContext';
import { useAudio } from '../context/AudioContext';
import HUD from '../components/HUD'; // ✅ Importação correta
import styles from '../styles/race.module.css';

export default function Race() {
  const { track, accelerate, brake, speed, gear, fuel, position, time, isRaceActive, updateRace } =
    useRace();
  const { triggerPoliceEvent, activeEvent } = usePolice();
  const { playEffect, pauseMusic, playMusic, isMusicPlaying } = useAudio(); // 🎵 Controle de áudio

  const [isShaking, setIsShaking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // 🎵 Pausa a música de fundo ao iniciar a corrida e volta a tocar após a corrida terminar
  useEffect(() => {
    if (isRaceActive) {
      if (isMusicPlaying) pauseMusic(); // ⏸️ Pausa a música se estiver tocando

      const raceInterval = setInterval(() => {
        updateRace();
        if (fuel <= 0 || position === 1) {
          clearInterval(raceInterval);
          handleRaceEnd();
        }
      }, 1000);

      return () => {
        clearInterval(raceInterval);
        playMusic(); // ▶️ Retoma a música após sair da corrida
      };
    }
  }, [isRaceActive, fuel, position, updateRace]);

  // 🚩 Final da corrida (vitória ou derrota)
  const handleRaceEnd = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
    alert(position === 1 ? '🏆 You won the race!' : '💀 Game Over!');
    playMusic(); // ▶️ Retoma a música após o término da corrida
  };

  return (
    <div className={`${styles.raceContainer} ${isShaking ? styles.shake : ''}`}>
      <h1>
        🏎️ Race in Progress - {track?.name || 'Unknown Track'} ({track?.weather || 'Clear'})
      </h1>

      {/* ✅ Renderização única do HUD */}
      <HUD speed={speed} gear={gear} time={time} fuel={fuel} position={position} />

      {isRaceActive ? (
        <div className={styles.controls}>
          <button
            onClick={() => {
              playEffect('accelerate');
              accelerate();
            }}
          >
            🚀 Accelerate
          </button>
          <button
            onClick={() => {
              playEffect('brake');
              brake();
            }}
          >
            🛑 Brake
          </button>
        </div>
      ) : (
        <div className={styles.result}>
          {position === 1 ? '🏆 You Won the Race!' : '💨 Race Finished! Try Again!'}
        </div>
      )}
    </div>
  );
}
