import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css'; // Importação do CSS atualizado

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h1>🏁 Street Rod Clone</h1>
        <p>Welcome to the ultimate street racing experience!</p>
      </header>

      <main className={styles.homeContent}>
        <img src="/images/banner.png" alt="Street Rod Clone Banner" className={styles.homeBanner} />

        <div className={styles.homeButtons}>
          <Link
            to="/game"
            className={`${styles.homeButton} ${styles.play}`}
            aria-label="Start Game"
          >
            🚗 Start Race
          </Link>
          <Link
            to="/garage"
            className={`${styles.homeButton} ${styles.garage}`}
            aria-label="Go to Garage"
          >
            🏎️ Garage
          </Link>
          <Link
            to="/settings"
            className={`${styles.homeButton} ${styles.settings}`}
            aria-label="Game Settings"
          >
            ⚙️ Settings
          </Link>
          <Link
            to="/credits"
            className={`${styles.homeButton} ${styles.credits}`}
            aria-label="View Credits"
          >
            📜 Credits
          </Link>
        </div>
      </main>

      <footer className={styles.homeFooter}>
        <p>© 2024 Street Rod Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
