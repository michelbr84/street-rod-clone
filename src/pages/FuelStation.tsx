// src/pages/FuelStation.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/fuelStation.module.css';

const FUEL_PRICE = 3.5; // Preço por litro de combustível

export default function FuelStation() {
  const [fuelLevel, setFuelLevel] = useState(20); // Nível de combustível inicial (litros)
  const [balance, setBalance] = useState(500); // Dinheiro do jogador
  const [amount, setAmount] = useState(0); // Quantidade a abastecer
  const navigate = useNavigate();

  const handleRefuel = () => {
    const totalCost = amount * FUEL_PRICE;

    if (amount <= 0) {
      alert('Enter a valid amount of fuel.');
      return;
    }
    if (totalCost > balance) {
      alert('Not enough money!');
      return;
    }

    setFuelLevel(fuelLevel + amount);
    setBalance(balance - totalCost);
    alert(`You refueled ${amount} liters!`);
  };

  return (
    <div className={styles.container}>
      <h1>⛽ Fuel Station</h1>
      <p>
        Fuel Level: <strong>{fuelLevel}L</strong>
      </p>
      <p>
        Balance: <strong>${balance.toFixed(2)}</strong>
      </p>

      <input
        type="number"
        placeholder="Liters to refuel"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleRefuel}>Refuel</button>

      <button className={styles.backButton} onClick={() => navigate('/garage')}>
        Back to Garage
      </button>
    </div>
  );
}
