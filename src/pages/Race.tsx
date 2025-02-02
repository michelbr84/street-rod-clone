// src/pages/Race.tsx
import { useState, useEffect } from 'react';
import { usePolice } from '../context/PoliceContext'; // 🚔 Sistema policial
import { useRace } from '../context/RaceContext'; // 🏎️ Contexto da corrida
import { useAudio } from '../context/AudioContext'; // 🎵 Contexto de áudio
import HUD from '../components/HUD';
import styles from '../styles/race.module.css';

export default function Race() {
  const { track, accelerate, brake, speed, gear, fuel, position, time, isRaceActive, updateRace } =
    useRace();

  const { triggerPoliceEvent, activeEvent } = usePolice(); // 🚔 Eventos policiais
  const { playEffect, playMusic, pauseMusic } = useAudio(); // 🎵 Efeitos sonoros

  const [opponents, setOpponents] = useState([
    { id: 1, speed: 50, position: 4 },
    { id: 2, speed: 55, position: 3 },
    { id: 3, speed: 60, position: 2 },
    { id: 4, speed: 65, position: 1 },
  ]);

  const [isShaking, setIsShaking] = useState(false); // 💥 Tremor da tela
  const [isFlashing, setIsFlashing] = useState(false); // ⚡ Flash de impacto

  // 🌦️ Efeito do clima na corrida
  const weatherEffect = track?.weather === 'rainy' ? 0.9 : track?.weather === 'snowy' ? 0.8 : 1;

  // 🚀 Lógica principal da corrida
  useEffect(() => {
    if (isRaceActive) {
      playMusic(); // 🎵 Toca a música de fundo ao iniciar a corrida

      const raceInterval = setInterval(() => {
        updateRace();

        if (fuel <= 0) {
          handleGameOver(); // 💀 Fim do jogo ao acabar o combustível
          clearInterval(raceInterval);
        }

        if (position === 1) {
          handleVictory(); // 🏆 Vitória ao alcançar o 1º lugar
          clearInterval(raceInterval);
        }
      }, 1000);

      const aiInterval = setInterval(() => {
        setOpponents((prevOpponents) =>
          prevOpponents.map((opponent) => {
            const speedVariation = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5;
            const newSpeed = Math.max(
              40,
              Math.min(220, opponent.speed + speedVariation * weatherEffect)
            );

            return {
              ...opponent,
              speed: newSpeed,
              position:
                newSpeed > speed
                  ? Math.max(1, opponent.position - 1)
                  : Math.min(5, opponent.position + 1),
            };
          })
        );
      }, 1500);

      const policeInterval = setInterval(() => {
        if (Math.random() < 0.2) {
          triggerPoliceEvent();
        }
      }, 5000);

      return () => {
        clearInterval(raceInterval);
        clearInterval(aiInterval);
        clearInterval(policeInterval);
        pauseMusic(); // ⏸️ Pausar música ao sair da corrida
      };
    }
  }, [isRaceActive, speed, fuel, position, weatherEffect, triggerPoliceEvent, updateRace]);

  // 🏆 Função de vitória
  const handleVictory = () => {
    playEffect('victory'); // 🎵 Efeito sonoro de vitória
    pauseMusic();
    setIsFlashing(true); // ⚡ Flash ao vencer
    setTimeout(() => setIsFlashing(false), 500);
    alert('🏆 You won the race!');
  };

  // 💀 Função de derrota
  const handleGameOver = () => {
    playEffect('game_over'); // 🎵 Efeito sonoro de game over
    pauseMusic();
    setIsShaking(true); // 💥 Tremor ao perder
    setTimeout(() => setIsShaking(false), 1000);
    alert('💀 Game Over!');
  };

  return (
    <div
      className={`${styles.raceContainer} 
        ${isShaking ? styles.shake : ''} 
        ${activeEvent?.type === 'CHASE' ? styles.glitch : ''}`}
    >
      <h1>
        🏎️ Race in Progress - {track?.name || 'Unknown Track'} ({track?.weather || 'Clear'})
      </h1>

      <HUD speed={speed} gear={gear} time={time} fuel={fuel} position={position} />

      {/* ⚡ Flash de impacto */}
      {isFlashing && <div className={styles.flash}></div>}

      {/* 🚔 Eventos Policiais */}
      {activeEvent?.type === 'CHASE' && (
        <div className={styles.policeOverlay}>
          <p className={`${styles.policeAlert} ${styles.glitch}`}>🚔 Police Chase! Escape!</p>
          <audio autoPlay>
            <source src="/sounds/siren.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}
      {activeEvent?.type === 'FINE' && (
        <p className={styles.policeAlert}>💰 You Got a Fine of ${activeEvent.amount}!</p>
      )}
      {activeEvent?.type === 'CAR_SEIZED' && (
        <p className={styles.policeAlert}>❌ Your Car Was Seized! Game Over!</p>
      )}

      {/* 🏁 Status dos Oponentes */}
      <div className={styles.opponentsStatus}>
        {opponents.map((opponent) => (
          <p key={opponent.id}>
            🚗 Opponent {opponent.id}: {opponent.speed.toFixed(1)} km/h | Position:{' '}
            {opponent.position}
          </p>
        ))}
      </div>

      {/* 🎮 Controles de corrida */}
      {isRaceActive ? (
        <div className={styles.controls}>
          <button
            onClick={() => {
              playEffect('button_click'); // 🎵 Efeito sonoro de clique
              accelerate();
              setIsFlashing(true); // ⚡ Flash ao acelerar
              setTimeout(() => setIsFlashing(false), 200);
            }}
            disabled={fuel <= 0}
          >
            🚀 Accelerate
          </button>

          <button
            onClick={() => {
              playEffect('brake'); // 🎵 Efeito sonoro de frenagem
              brake();
              setIsShaking(true); // 💥 Tremor ao frear bruscamente
              setTimeout(() => setIsShaking(false), 300);
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
