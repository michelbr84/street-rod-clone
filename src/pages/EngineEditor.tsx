import { useEngine } from '../context/EngineContext';
import EnginePart from '../components/EnginePart';
import styles from '../styles/engineEditor.module.css';

export default function EngineEditor() {
  const { parts, modifyPart, resetEngine } = useEngine(); // ✅ Garantindo `resetEngine()`

  const upgradePart = (id: number) => {
    const upgrades = [
      { id, name: 'Racing Pistons', performanceBoost: 20 },
      { id, name: 'High-Performance Camshaft', performanceBoost: 15 },
      { id, name: 'Twin Turbo', performanceBoost: 50 },
    ];

    const newPart = upgrades[Math.floor(Math.random() * upgrades.length)];
    modifyPart(id, { ...newPart, id }); // ✅ Mantém o ID original ao modificar a peça
  };

  return (
    <div className={styles.editorContainer}>
      <h1>🔧 Engine Editor</h1>
      <p>Customize your engine to boost performance!</p>

      <div className={styles.partsGrid}>
        {parts.map((part) => (
          <div key={part.id} className={styles.partItem}>
            <EnginePart name={part.name} performanceBoost={part.performanceBoost} />
            <button onClick={() => upgradePart(part.id)}>Upgrade</button>
          </div>
        ))}
      </div>

      {/* ✅ Botão para resetar o motor */}
      <button className={styles.resetButton} onClick={resetEngine}>
        🔄 Reset Engine
      </button>
    </div>
  );
}
