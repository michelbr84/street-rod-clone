import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/settings.module.css';

export default function Settings() {
  const [volume, setVolume] = useState(50);
  const [graphics, setGraphics] = useState('medium');

  // Carregar configurações salvas no localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('volume');
    const savedGraphics = localStorage.getItem('graphics');

    if (savedVolume) setVolume(Number(savedVolume));
    if (savedGraphics) setGraphics(savedGraphics);
  }, []);

  // Salvar configurações no localStorage
  const handleSaveSettings = () => {
    localStorage.setItem('volume', String(volume));
    localStorage.setItem('graphics', graphics);
    alert('Settings saved! ✅');
  };

  return (
    <div className={styles.settingsContainer}>
      <h1>⚙️ Settings</h1>

      <div className={styles.settingsOptions}>
        <label>
          🎵 Volume:
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          {volume}%
        </label>

        <label>
          🎮 Graphics Quality:
          <select value={graphics} onChange={(e) => setGraphics(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button onClick={handleSaveSettings} className={styles.saveButton}>
          💾 Save Settings
        </button>

        <Link to="/" className={styles.backButton}>
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
