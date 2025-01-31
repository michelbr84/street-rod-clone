// src/pages/GameOver.tsx
import { Link } from 'react-router-dom';
import styles from '../styles/gameOver.module.css';
import btnStyles from '../styles/buttons.module.css'; // ✅ Importação correta dos estilos

export default function GameOver() {
  return (
    <div className={styles.container}>
      <h1>💀 Game Over</h1>
      <p>You have lost the race! Better luck next time.</p>

      <div className={styles.actions}>
        <Link to="/" className={`${btnStyles.btn} ${btnStyles.primary}`}>
          🏠 Return to Home
        </Link>
        <Link to="/race" className={`${btnStyles.btn} ${btnStyles.danger}`}>
          🏎️ Try Again
        </Link>
      </div>
    </div>
  );
}
