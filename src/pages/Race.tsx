// src/pages/Race.tsx
import { useState, useEffect } from 'react';
import HUD from '../components/HUD';
import styles from '../styles/race.module.css';

export default function Race() {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [time, setTime] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [position, setPosition] = useState(1); // ✅ Variável agora está sendo usada

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
      setFuel((prev) => Math.max(0, prev - 0.1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const accelerate = () => {
    if (fuel > 0) {
      setSpeed((prev) => Math.min(200, prev + 10));
      if (speed >= 40 && speed < 80) setGear(2);
      if (speed >= 80 && speed < 140) setGear(3);
      if (speed >= 140) setGear(4);

      // Simula mudança de posição na corrida
      setPosition((prev) => Math.max(1, prev - 1));
    }
  };

  const brake = () => {
    setSpeed((prev) => Math.max(0, prev - 15));
    if (speed < 40) setGear(1);
    if (speed < 80) setGear(2);
    if (speed < 140) setGear(3);
  };

  return (
    <div className={styles.raceContainer}>
      <h1>🏎️ Race in Progress...</h1>
      <HUD speed={speed} gear={gear} time={time} fuel={fuel} position={position} />
      <div className={styles.controls}>
        <button onClick={accelerate} disabled={fuel <= 0}>
          🚀 Accelerate
        </button>
        <button onClick={brake}>🛑 Brake</button>
      </div>
    </div>
  );
}
