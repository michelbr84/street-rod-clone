import styles from '../styles/engineEditor.module.css';

interface EnginePartProps {
  name: string;
  performanceBoost: number;
}

export default function EnginePart({ name, performanceBoost }: EnginePartProps) {
  return (
    <div className={styles.partCard}>
      <h3>{name}</h3>
      <p>Boost: {performanceBoost} HP</p>
    </div>
  );
}
