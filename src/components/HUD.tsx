// src/components/HUD.tsx

import styles from '../styles/hud.module.css';
import { useRace } from '../context/RaceContext'; // 🚗 Importa o contexto da corrida

interface HUDProps {
  speed?: number;
  gear?: number;
  time?: number;
  fuel?: number;
  position?: number;
}

export default function HUD({ speed = 0, gear = 0, time = 0, fuel = 100, position = 5 }: HUDProps) {
  const { tire } = useRace(); // 🛞 Obtém informações dos pneus do contexto

  // 🔥 Ajusta a cor do combustível dinamicamente (verde, amarelo, vermelho)
  const fuelLevelClass =
    fuel > 50 ? styles.fuelHigh : fuel > 20 ? styles.fuelMedium : styles.fuelLow;

  // 🚦 Feedback visual para a velocidade (verde, laranja, vermelho)
  const speedStatus =
    speed > 180 ? styles.speedHigh : speed > 100 ? styles.speedMedium : styles.speedLow;

  // 🛞 Feedback visual para o desgaste dos pneus
  const tireWearClass =
    tire?.durability && tire.durability > 70
      ? styles.tireGood
      : tire?.durability && tire.durability > 40
        ? styles.tireWorn
        : styles.tireCritical;

  // ✅ Verificação para evitar NaN
  const safeSpeed = isNaN(speed) ? 0 : speed;
  const safeTime = isNaN(time) ? 0 : time;
  const safeFuel = isNaN(fuel) ? 0 : fuel;
  const safeTireDurability =
    tire?.durability !== undefined && !isNaN(tire.durability) ? tire.durability : 100;

  return (
    <div className={styles.hudContainer}>
      {/* 🚀 Velocidade */}
      <div className={`${styles.hudItem} ${speedStatus}`}>
        <span className={styles.icon}>🚀</span> Speed: <strong>{safeSpeed.toFixed(0)}</strong> km/h
      </div>

      {/* ⚙️ Marcha */}
      <div className={styles.hudItem}>
        <span className={styles.icon}>⚙️</span> Gear:{' '}
        <strong>{safeSpeed === 0 ? 'N' : gear}</strong>
      </div>

      {/* ⏱️ Tempo */}
      <div className={styles.hudItem}>
        <span className={styles.icon}>⏱️</span> Time: <strong>{safeTime.toFixed(1)}</strong> s
      </div>

      {/* ⛽ Combustível */}
      <div className={`${styles.hudItem} ${fuelLevelClass}`}>
        <span className={styles.icon}>⛽</span> Fuel: <strong>{safeFuel.toFixed(1)}</strong>%
      </div>

      {/* 🏁 Posição na corrida */}
      <div className={styles.hudItem}>
        <span className={styles.icon}>🏁</span> Position: <strong>{position}</strong>/5
      </div>

      {/* 🛞 Desgaste dos Pneus */}
      {tire && (
        <div className={`${styles.hudItem} ${tireWearClass}`}>
          <span className={styles.icon}>🛞</span> Tire Wear:{' '}
          <strong>{safeTireDurability.toFixed(0)}</strong>%
        </div>
      )}
    </div>
  );
}
