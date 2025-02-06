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

  // ✅ Verificação para evitar NaN e valores indefinidos
  const safeSpeed = isNaN(speed) ? 0 : speed;
  const safeGear = isNaN(gear) ? 0 : gear;
  const safeTime = isNaN(time) ? 0 : time;
  const safeFuel = isNaN(fuel) ? 0 : fuel;
  const safePosition = isNaN(position) ? 5 : position;
  const safeTireDurability = tire?.durability && !isNaN(tire.durability) ? tire.durability : 100;

  // 🔥 Feedback visual para o nível de combustível
  const fuelLevelClass =
    safeFuel > 50 ? styles.fuelHigh : safeFuel > 20 ? styles.fuelMedium : styles.fuelLow;

  // 🚦 Feedback visual para a velocidade
  const speedStatus =
    safeSpeed > 180 ? styles.speedHigh : safeSpeed > 100 ? styles.speedMedium : styles.speedLow;

  // 🛞 Feedback visual para o desgaste dos pneus
  const tireWearClass =
    safeTireDurability > 70
      ? styles.tireGood
      : safeTireDurability > 40
        ? styles.tireWorn
        : styles.tireCritical;

  return (
    <div className={styles.hudContainer}>
      {/* Linha 1: Velocidade, Marcha e Tempo */}
      <div className={styles.hudRow}>
        <div className={`${styles.hudItem} ${speedStatus}`}>
          <span className={styles.icon}>🚀</span> Speed: <strong>{safeSpeed.toFixed(0)}</strong>{' '}
          km/h
        </div>

        <div className={styles.hudItem}>
          <span className={styles.icon}>⚙️</span> Gear:{' '}
          <strong>{safeSpeed === 0 ? 'N' : safeGear}</strong>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.icon}>⏱️</span> Time: <strong>{safeTime.toFixed(1)}</strong> s
        </div>
      </div>

      {/* Linha 2: Combustível e Posição */}
      <div className={styles.hudRow}>
        <div className={`${styles.hudItem} ${fuelLevelClass}`}>
          <span className={styles.icon}>⛽</span> Fuel: <strong>{safeFuel.toFixed(1)}</strong>%
        </div>

        <div className={styles.hudItem}>
          <span className={styles.icon}>🏁</span> Position: <strong>{safePosition}</strong>/5
        </div>
      </div>

      {/* 🛞 Estado do desgaste dos pneus */}
      {tire && (
        <div className={`${styles.hudItem} ${tireWearClass}`}>
          <span className={styles.icon}>🛞</span> Tire Wear:{' '}
          <strong>{safeTireDurability.toFixed(0)}</strong>%
        </div>
      )}
    </div>
  );
}
