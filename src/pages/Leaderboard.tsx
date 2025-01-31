// src/pages/Leaderboard.tsx
import { useState } from 'react';
import styles from '../styles/leaderboard.module.css';

interface Player {
  id: number;
  name: string;
  score: number;
}

// Mock de jogadores (simulação de um ranking)
const initialPlayers: Player[] = [
  { id: 1, name: 'The King', score: 5000 },
  { id: 2, name: 'Speed Racer', score: 4500 },
  { id: 3, name: 'Nitro Boost', score: 4200 },
  { id: 4, name: 'Street Legend', score: 3900 },
  { id: 5, name: 'Ghost Rider', score: 3700 },
];

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  // Simula uma atualização do ranking (embaralhando os jogadores)
  const updateLeaderboard = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
  };

  return (
    <div className={styles.leaderboardContainer}>
      <h1>🏆 Leaderboard</h1>
      <p>Top racers of the street!</p>

      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id} className={index < 3 ? styles.topPlayer : ''}>
              <td>#{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.updateButton} onClick={updateLeaderboard}>
        🔄 Update Leaderboard
      </button>
    </div>
  );
}
