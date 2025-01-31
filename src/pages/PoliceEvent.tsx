// src/pages/PoliceEvent.tsx
import { useState } from 'react';
import styles from '../styles/policeEvent.module.css';

export default function PoliceEvent() {
  const [caught, setCaught] = useState(false);

  const attemptEscape = () => {
    const escapeChance = Math.random();
    if (escapeChance > 0.5) {
      alert('You managed to escape! 🏎️💨');
    } else {
      setCaught(true);
    }
  };

  return (
    <div className={styles.policeContainer}>
      <h1>🚔 Police Chase!</h1>
      {!caught ? (
        <>
          <p>The police are after you! Try to escape before it&apos;s too late.</p>{' '}
          {/* 🔥 Corrigido */}
          <button onClick={attemptEscape} className={styles.escapeButton}>
            Attempt Escape
          </button>
        </>
      ) : (
        <>
          <p>🚨 You&apos;ve been caught! You lost money and your car was impounded.</p>{' '}
          {/* 🔥 Corrigido */}
          <button onClick={() => alert('Game Over!')} className={styles.gameOverButton}>
            Accept Fate
          </button>
        </>
      )}
    </div>
  );
}
