// src/pages/Settings.tsx
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import styles from '../styles/settings.module.css';

export default function Settings() {
  const { volume, setVolume, playEffect } = useAudio();
  const [graphics, setGraphics] = useState('medium');

  // 🎮 Carregar configurações salvas no localStorage
  useEffect(() => {
    const savedGraphics = localStorage.getItem('graphics');
    if (savedGraphics) setGraphics(savedGraphics);
  }, []);

  // 💾 Salvar configurações no localStorage
  const handleSaveSettings = () => {
    localStorage.setItem('graphics', graphics);
    localStorage.setItem('audioVolume', volume.toString()); // 🔊 Salva o volume no localStorage
    alert('Settings saved! ✅');
  };

  // 🔊 Ajustar volume e tocar som de teste
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100; // Converte de 0-100 para 0-1
    setVolume(newVolume); // Atualiza o volume globalmente
    playEffect('button_click'); // 🔔 Toca um som de teste
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
            value={Math.round(volume * 100)} // Converte de 0-1 para 0-100
            onChange={handleVolumeChange}
          />
          {Math.round(volume * 100)}%
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
