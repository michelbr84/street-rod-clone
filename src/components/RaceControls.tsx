import { useRace } from '../context/RaceContext';
import styles from '../styles/raceControls.module.css';

export default function RaceControls() {
  const { updateRace } = useRace();

  return (
    <div className={styles.controls}>
      <button onClick={() => updateRace(10)}>🔥 Accelerate</button>
      <button onClick={() => updateRace(-10)}>🛑 Brake</button>
    </div>
  );
}
