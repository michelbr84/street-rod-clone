// src/pages/BetScreen.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoney } from '../context/MoneyContext';
import styles from '../styles/betScreen.module.css';

export default function BetScreen() {
  const { balance, placeBet } = useMoney();
  const [bet, setBet] = useState(0);
  const navigate = useNavigate();

  const handleBet = () => {
    if (placeBet(bet)) {
      navigate('/race'); // 🚀 Inicia a corrida após a aposta
    }
  };

  return (
    <div className={styles.betContainer}>
      <h1>💰 Place Your Bet</h1>
      <p>
        Current Balance: <strong>${balance}</strong>
      </p>

      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        min="0"
        max={balance}
      />

      <button onClick={handleBet} disabled={bet <= 0 || bet > balance}>
        Confirm Bet
      </button>
    </div>
  );
}
