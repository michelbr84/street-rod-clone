// src/pages/PoliceEvent.tsx
import { useState } from 'react';
import { usePolice } from '../context/PoliceContext'; // ✅ Importando contexto policial
import styles from '../styles/policeEvent.module.css';

export default function PoliceEvent() {
  const { activeEvent, attemptEscape, payFine } = usePolice();
  const [caught, setCaught] = useState(false);

  if (!activeEvent) {
    return (
      <div className={styles.policeContainer}>
        <h1>🚨 No Police Event</h1>
        <p>Drive safely and avoid trouble!</p>
      </div>
    );
  }

  return (
    <div className={styles.policeContainer}>
      <h1>🚔 Police Event!</h1>

      {activeEvent.type === 'CHASE' && (
        <>
          <p>The police are chasing you! Try to escape before it&apos;s too late.</p>
          <button
            onClick={() => {
              const escaped = attemptEscape(120);
              if (escaped) {
                alert('You escaped successfully! 🏎️💨');
              } else {
                setCaught(true);
              }
            }}
            className={styles.escapeButton}
          >
            Attempt Escape
          </button>
        </>
      )}

      {activeEvent.type === 'FINE' && (
        <>
          <p>
            🚔 You have been fined <strong>${activeEvent.amount}</strong> for reckless driving.
          </p>
          <button onClick={payFine} className={styles.payFineButton}>
            Pay Fine 💸
          </button>
        </>
      )}

      {(activeEvent.type === 'CAR_SEIZED' || caught) && (
        <>
          <p>🚨 You&apos;ve been caught! You lost money and your car was impounded.</p>
          <button onClick={() => alert('Game Over!')} className={styles.gameOverButton}>
            Accept Fate
          </button>
        </>
      )}
    </div>
  );
}
