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
            <Link to="/fuel-station">⛽ Fuel</Link>
          </li>
          <li>
            <Link to="/police-chase">🚔 Police Chase</Link>
          </li>
          <li>
            <Link to="/leaderboard">🏆 Leaderboard</Link>
          </li>
          <li>
            <Link to="/game-over">💀 Game Over</Link> {/* ✅ Adicionado link para Game Over */}
          </li>
          <li>
            <Link to="/game">🎮 Game</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
