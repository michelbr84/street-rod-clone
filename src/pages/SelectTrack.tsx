// src/pages/SelectTrack.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRace } from '../context/RaceContext';
import styles from '../styles/selectTrack.module.css'; // 🌟 CSS para estilização

export default function SelectTrack() {
  const { startRace } = useRace();
  const navigate = useNavigate();

  // 🛣️ Lista de pistas disponíveis
  const tracks = [
    { name: 'Desert Dash', weather: 'clear', gripModifier: 1 },
    { name: 'Rainy Rally', weather: 'rainy', gripModifier: 0.8 },
    { name: 'Foggy Forest', weather: 'foggy', gripModifier: 0.9 },
    { name: 'Snow Drift', weather: 'snowy', gripModifier: 0.7 },
  ];

  // 🛞 Tipos de pneus disponíveis
  const tireTypes = ['soft', 'medium', 'hard'] as const;

  // 🎯 Estados locais para seleção de pista e pneu
  const [selectedTrack, setSelectedTrack] = useState<(typeof tracks)[0] | null>(null);
  const [selectedTire, setSelectedTire] = useState<(typeof tireTypes)[number] | null>(null);
  const [error, setError] = useState(''); // 🚩 Para mensagens de erro

  // 🚀 Iniciar corrida ao confirmar seleção de pista e pneu
  const handleStartRace = () => {
    if (!selectedTrack || !selectedTire) {
      setError('⚠️ Please select both a track and a tire type before starting the race.');
      return;
    }
    startRace(selectedTrack, selectedTire); // Inicia a corrida com a pista e pneu selecionados
    navigate('/race'); // Redireciona para a página da corrida
  };

  return (
    <div className={styles.container}>
      <h1>🏁 Select a Track</h1>

      {/* 🛣️ Seção de seleção de pistas */}
      <div className={styles.trackList}>
        {tracks.map((track) => (
          <button
            key={track.name}
            className={`${styles.trackButton} ${
              selectedTrack?.name === track.name ? styles.selected : ''
            }`}
            onClick={() => {
              setSelectedTrack(track);
              setError(''); // Limpa o erro ao selecionar uma pista
            }}
          >
            {track.name} - {track.weather.toUpperCase()} 🌤️
          </button>
        ))}
      </div>

      {/* 🛞 Seção de seleção de pneus */}
      {selectedTrack && (
        <div className={styles.tireSelection}>
          <h2>🛞 Select Tire Type:</h2>
          <div className={styles.tireOptions}>
            {tireTypes.map((tire) => (
              <button
                key={tire}
                className={`${styles.tireButton} ${selectedTire === tire ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedTire(tire);
                  setError(''); // Limpa o erro ao selecionar um pneu
                }}
              >
                {tire.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🚩 Exibição de mensagens de erro */}
      {error && <p className={styles.error}>{error}</p>}

      {/* 🚀 Botão para iniciar a corrida */}
      <button
        className={styles.startButton}
        onClick={handleStartRace}
        disabled={!selectedTrack || !selectedTire}
      >
        🚗 Start Race
      </button>
    </div>
  );
}
