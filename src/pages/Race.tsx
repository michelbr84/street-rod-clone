// src/pages/Race.tsx
import { useState, useEffect } from 'react';
import { usePolice } from '../context/PoliceContext'; // 🚔 Sistema policial
import { useRace } from '../context/RaceContext'; // 🏎️ Contexto da corrida
import HUD from '../components/HUD';
import styles from '../styles/race.module.css';

export default function Race() {
  const {
    track,
    accelerate,
    brake,
    speed,
    gear,
    fuel,
    position,
    time,
    isRaceActive,
    startRace,
    updateRace,
  } = useRace();
  const { triggerPoliceEvent, activeEvent } = usePolice(); // 🚔 Sistema de polícia

  const [opponents, setOpponents] = useState([
    { id: 1, speed: 50, position: 4 },
    { id: 2, speed: 55, position: 3 },
    { id: 3, speed: 60, position: 2 },
    { id: 4, speed: 65, position: 1 },
  ]);

  const weatherEffect = track?.weather === 'rainy' ? 0.9 : track?.weather === 'snowy' ? 0.8 : 1;

  useEffect(() => {
    if (isRaceActive) {
      const raceInterval = setInterval(() => {
        updateRace();

        if (fuel <= 0) {
          alert('⛽ Fuel exhausted. Race over!');
          clearInterval(raceInterval);
        }

        if (position === 1) {
          alert('🏆 Race finished! Victory!');
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
      };
    }
  }, [isRaceActive, speed, fuel, position, weatherEffect, triggerPoliceEvent, updateRace]);

  return (
    <div className={styles.raceContainer}>
      <h1>
        🏎️ Race in Progress - {track?.name || 'Unknown Track'} ({track?.weather || 'Clear'})
      </h1>

      <HUD speed={speed} gear={gear} time={time} fuel={fuel} position={position} />

      {activeEvent?.type === 'CHASE' && (
        <div className={styles.policeOverlay}>
          <p className={styles.policeAlert}>🚔 Police Chase! Escape!</p>
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

      <div className={styles.opponentsStatus}>
        {opponents.map((opponent) => (
          <p key={opponent.id}>
            🚗 Opponent {opponent.id}: {opponent.speed.toFixed(1)} km/h | Position:{' '}
            {opponent.position}
          </p>
        ))}
      </div>

      {isRaceActive ? (
        <div className={styles.controls}>
          <button onClick={accelerate} disabled={fuel <= 0}>
            🚀 Accelerate
          </button>
          <button onClick={brake}>🛑 Brake</button>
        </div>
      ) : (
        <div className={styles.result}>
          {position === 1 ? '🏆 You Won the Race!' : '💨 Race Finished! Try Again!'}
        </div>
      )}
    </div>
  );
}
