// src/pages/Game.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGarage } from '../context/GarageContext';
import styles from '../styles/game.module.css';

export default function Game() {
  const navigate = useNavigate();
  const { cars } = useGarage(); // ✅ Obtém a lista de carros do GarageContext

  useEffect(() => {
    if (cars && cars.length > 0) {
      // ✅ O usuário possui pelo menos um carro
      navigate('/select-track'); // 🚀 Redireciona para a seleção de pista
    } else {
      // 🚫 O usuário não possui carros
      navigate('/shop'); // 🚗 Redireciona para a loja de carros
    }
  }, [cars, navigate]); // 👀 O useEffect será acionado sempre que os carros forem atualizados

  return (
    <div className={styles.gameContainer}>
      <h1>🎮 Starting Game...</h1>
    </div>
  );
}
