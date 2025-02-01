import { Link } from 'react-router-dom';
import styles from '../styles/credits.module.css';

export default function Credits() {
  return (
    <div className={styles.creditsContainer}>
      <h1>📜 Credits</h1>
      <p>Street Rod Clone was developed by:</p>

      <ul className={styles.teamList}>
        <li>MichelBR84 - Lead Developer</li>
        <li>John Doe - UI/UX Designer</li>
        <li>Jane Smith - Game Logic & AI</li>
        <li>Alex Johnson - Sound & Music</li>
        <li>Community Contributors</li>
      </ul>

      <p>Special thanks to all testers and supporters!</p>

      <Link to="/" className={styles.backButton}>
        ⬅ Back to Home
      </Link>
    </div>
  );
}
