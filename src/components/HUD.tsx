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
  return (
    <div className={styles.hud}>
      <div className={styles.infoBox}>🚀 Speed: {speed} km/h</div>
      <div className={styles.infoBox}>⚙️ Gear: {gear}</div>
      <div className={styles.infoBox}>⏱ Time: {time}s</div>
      <div className={styles.infoBox}>⛽ Fuel: {fuel.toFixed(1)}%</div>
      <div className={styles.infoBox}>🏁 Position: {position}/5</div>
    </div>
  );
}
