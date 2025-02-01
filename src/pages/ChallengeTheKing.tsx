// src/pages/ChallengeTheKing.tsx
import { useProgression } from '../context/ProgressionContext';
import { useNavigate } from 'react-router-dom';

export default function ChallengeTheKing() {
  const { rank, defeatedKing, defeatKing } = useProgression();
  const navigate = useNavigate();

  const handleChallenge = () => {
    if (rank > 1) {
      alert('🚫 You need to be Rank 1 to challenge The King!');
      return;
    }

    const victory = Math.random() > 0.5; // Simula chance de vitória
    if (victory) {
      defeatKing();
      alert('🏆 You defeated The King!');
      navigate('/victory');
    } else {
      alert('❌ You lost! Try again.');
    }
  };

  return (
    <div>
      <h1>👑 Face The King!</h1>
      <p>{defeatedKing ? 'You already defeated The King!' : 'Are you ready for the challenge?'}</p>
      <button onClick={handleChallenge} disabled={defeatedKing}>
        🔥 Challenge Now
      </button>
    </div>
  );
}
