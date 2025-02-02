// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* 📜 Direitos Autorais */}
        <p>© 2024 Street Rod Clone. All rights reserved.</p>

        {/* 🚀 Links Rápidos */}
        <nav className={styles.footerNav}>
          <Link to="/credits" aria-label="Credits">
            📜 Credits
          </Link>
          <Link to="/leaderboard" aria-label="Leaderboard">
            🏆 Leaderboard
          </Link>
          <Link to="/settings" aria-label="Settings">
            ⚙️ Settings
          </Link>
        </nav>

        {/* 🌐 Redes Sociais (Exemplo) */}
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/seuprojeto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            💻 GitHub
          </a>
          <a
            href="https://twitter.com/seuprojeto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            🐦 Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
