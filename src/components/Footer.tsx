// src/components/Footer.tsx
import React from 'react'; // ✅ Importação explícita do React
import { Link } from 'react-router-dom';
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© 2024 Street Rod Clone. All rights reserved.</p>

        <nav className={styles.footerNav}>
          <Link to="/credits" aria-label="Credits">
            📜 Credits
          </Link>
          <Link to="/leaderboard" aria-label="Leaderboard">
            🏆 Leaderboard
          </Link>
        </nav>
      </div>
    </footer>
  );
}
