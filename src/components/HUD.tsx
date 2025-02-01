// src/components/HUD.tsx
import styles from '../styles/hud.module.css';

interface HUDProps {
  speed: number;
  gear: number;
  time: number;
  fuel: number;
  position: number;
}

export default function HUD({ speed, gear, time, fuel, position }: HUDProps) {
  // 🔥 Ajusta a cor do combustível dinamicamente (verde, amarelo, vermelho)
  const fuelLevelClass =
    fuel > 50 ? styles.fuelHigh : fuel > 20 ? styles.fuelMedium : styles.fuelLow;

  return (
    <div className={styles.hudContainer}>
      <div className={styles.hudItem}>
        <span className={styles.icon}>🚀</span> Speed: <strong>{speed.toFixed(0)}</strong> km/h
      </div>
      <div className={styles.hudItem}>
        <span className={styles.icon}>⚙️</span> Gear: <strong>{speed === 0 ? 'N' : gear}</strong>{' '}
        {/* Exibe "N" se o carro estiver parado */}
      </div>
      <div className={styles.hudItem}>
        <span className={styles.icon}>⏱</span> Time: <strong>{time.toFixed(1)}</strong> s
      </div>
      <div className={`${styles.hudItem} ${fuelLevelClass}`}>
        <span className={styles.icon}>⛽</span> Fuel: <strong>{fuel.toFixed(1)}</strong>%
      </div>
      <div className={styles.hudItem}>
        <span className={styles.icon}>🏁</span> Position: <strong>{position}</strong>/5
      </div>
    </div>
  );
}
