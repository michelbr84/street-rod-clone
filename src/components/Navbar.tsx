// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul className={styles.navList}>
          {/* 🏠 Navegação Principal */}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/garage" className={({ isActive }) => (isActive ? styles.active : '')}>
              🚗 Garage
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? styles.active : '')}>
              🛒 Shop
            </NavLink>
          </li>

          {/* 🏎️ Modos de Corrida */}
          <li>
            <NavLink
              to="/select-track"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🏎️ Race
            </NavLink>
          </li>
          <li>
            <NavLink to="/drag-race" className={({ isActive }) => (isActive ? styles.active : '')}>
              🚀 Drag Race
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/circuit-race"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🏁 Circuit Race
            </NavLink>
          </li>

          {/* ⛽ Serviços */}
          <li>
            <NavLink
              to="/fuel-station"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              ⛽ Fuel Station
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/repair-shop"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🔧 Repair Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/maintenance"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🛠️ Maintenance
            </NavLink>
          </li>

          {/* 🚔 Eventos Especiais */}
          <li>
            <NavLink
              to="/police-chase"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🚔 Police Chase
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/challenge-king"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              👑 Challenge The King
            </NavLink>
          </li>

          {/* 🏆 Progresso e Rankings */}
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🏆 Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/victory" className={({ isActive }) => (isActive ? styles.active : '')}>
              🎉 Victory
            </NavLink>
          </li>
          <li>
            <NavLink to="/game-over" className={({ isActive }) => (isActive ? styles.active : '')}>
              💀 Game Over
            </NavLink>
          </li>

          {/* ⚙️ Configurações */}
          <li>
            <NavLink to="/game" className={({ isActive }) => (isActive ? styles.active : '')}>
              🎮 Game
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? styles.active : '')}>
              ⚙️ Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/engine-editor"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              🔩 Engine Editor
            </NavLink>
          </li>

          {/* 📜 Créditos */}
          <li>
            <NavLink to="/credits" className={({ isActive }) => (isActive ? styles.active : '')}>
              📜 Credits
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
