import { useState, useEffect } from 'react';
import { usePolice } from '../context/PoliceContext'; // 🚔 Sistema policial
import HUD from '../components/HUD';
import styles from '../styles/race.module.css';

export default function Race() {
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [time, setTime] = useState(0);
  const [fuel, setFuel] = useState(50); // ⛽ Nível inicial de combustível
  const [position, setPosition] = useState(5); // 🏁 Começa na última posição
  const [raceFinished, setRaceFinished] = useState(false);

  const { triggerPoliceEvent, activeEvent } = usePolice(); // 🚔 Sistema de polícia

  // 🎮 Estado da IA dos oponentes
  const [opponents, setOpponents] = useState([
    { id: 1, speed: 50, position: 4 },
    { id: 2, speed: 55, position: 3 },
    { id: 3, speed: 60, position: 2 },
    { id: 4, speed: 65, position: 1 },
  ]);

  // ⏱️ Lógica da corrida
  useEffect(() => {
    const raceInterval = setInterval(() => {
      if (!raceFinished) {
        setTime((prev) => prev + 1);

        // ⛽ Consumo de combustível baseado na velocidade
        setFuel((prevFuel) => Math.max(0, prevFuel - (speed > 100 ? 0.5 : speed > 50 ? 0.3 : 0.1)));

        if (fuel <= 0) {
          setRaceFinished(true);
          setSpeed(0); // 🚗 Para o carro quando o combustível acaba
          alert('⛽ Fuel exhausted. Race over!');
        }

        if (position === 1) {
          setRaceFinished(true);
          alert('🏁 Race finished! 🏆 Victory!');
        }
      }
    }, 1000);

    // 🚗 IA dos oponentes
    const aiInterval = setInterval(() => {
      if (!raceFinished) {
        setOpponents((prevOpponents) =>
          prevOpponents.map((opponent) => {
            const speedVariation = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5;
            const newSpeed = Math.max(40, Math.min(220, opponent.speed + speedVariation));

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
      }
    }, 1500); // 🔄 Atualiza a IA a cada 1.5s

    // 🚔 Eventos policiais aleatórios
    const policeInterval = setInterval(() => {
      if (!raceFinished && Math.random() < 0.2) {
        triggerPoliceEvent();
      }
    }, 5000);

    return () => {
      clearInterval(raceInterval);
      clearInterval(aiInterval);
      clearInterval(policeInterval);
    };
  }, [fuel, position, raceFinished, speed, triggerPoliceEvent]);

  const accelerate = () => {
    if (fuel > 0 && !raceFinished) {
      setSpeed((prev) => Math.min(220, prev + 10));

      // 🔄 Ajuste da marcha
      setGear(speed < 40 ? 1 : speed < 80 ? 2 : speed < 140 ? 3 : 4);

      // 🏁 Simula ultrapassagem
      if (speed > 100 && Math.random() > 0.5) {
        setPosition((prev) => Math.max(1, prev - 1));
      }
    }
  };

  const brake = () => {
    setSpeed((prev) => Math.max(0, prev - 20));
    setGear(speed < 40 ? 1 : speed < 80 ? 2 : 3);
  };

  return (
    <div className={styles.raceContainer}>
      <h1>🏎️ Race in Progress...</h1>
      <HUD speed={speed} gear={gear} time={time} fuel={fuel} position={position} />

      {/* 🚔 Eventos policiais */}
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

      {/* 🏁 Status dos Oponentes */}
      <div className={styles.opponentsStatus}>
        {opponents.map((opponent) => (
          <p key={opponent.id}>
            🚗 Opponent {opponent.id}: {opponent.speed.toFixed(1)} km/h | Position:{' '}
            {opponent.position}
          </p>
        ))}
      </div>

      {!raceFinished ? (
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
