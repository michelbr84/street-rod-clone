// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/">🏠 Home</Link>
          </li>
          <li>
            <Link to="/garage">🚗 Garage</Link>
          </li>
          <li>
            <Link to="/shop">🛒 Shop</Link>
          </li>
          <li>
            <Link to="/race">🏎️ Race</Link>
          </li>
          <li>
            <Link to="/drag-race">🚀 Drag Race</Link> {/* ✅ Adicionado */}
          </li>
          <li>
            <Link to="/circuit-race">🏁 Circuit Race</Link> {/* ✅ Adicionado */}
          </li>
          <li>
            <Link to="/fuel-station">⛽ Fuel Station</Link>
          </li>
          <li>
            <Link to="/police-chase">🚔 Police Chase</Link>
          </li>
          <li>
            <Link to="/repair-shop">🔧 Repair Shop</Link> {/* ✅ Adicionado */}
          </li>
          <li>
            <Link to="/maintenance">🛠️ Maintenance</Link> {/* ✅ Adicionado */}
          </li>
          <li>
            <Link to="/challenge-king">👑 Challenge The King</Link> {/* 🚩 Novo */}
          </li>
          <li>
            <Link to="/leaderboard">🏆 Leaderboard</Link>
          </li>
          <li>
            <Link to="/game-over">💀 Game Over</Link>
          </li>
          <li>
            <Link to="/game">🎮 Game</Link>
          </li>
          <li>
            <Link to="/settings">⚙️ Settings</Link>
          </li>
          <li>
            <Link to="/credits">📜 Credits</Link>
          </li>
          <li>
            <Link to="/engine-editor">🔩 Engine Editor</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
