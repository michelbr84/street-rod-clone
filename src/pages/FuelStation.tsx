// src/pages/FuelStation.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCar } from '../context/CarContext'; // 🚗 Integração com o contexto do carro
import styles from '../styles/fuelStation.module.css';

const FUEL_PRICE = 3.5; // 💰 Preço por litro de combustível
const MAX_FUEL_CAPACITY = 60; // 🚗 Capacidade máxima do tanque em litros

export default function FuelStation() {
  const { cars, balance, updateBalance } = useCar(); // 🚗 Obtém o saldo e os carros do jogador
  const selectedCar = cars[0]; // 🚗 Seleciona o primeiro carro (pode ser aprimorado para múltiplos)
  const [fuelLevel, setFuelLevel] = useState(selectedCar?.fuelLevel || 20); // ⛽ Nível de combustível atual
  const [amount, setAmount] = useState(0); // Quantidade de combustível a abastecer
  const navigate = useNavigate();

  const handleRefuel = () => {
    const totalCost = amount * FUEL_PRICE;

    // 🚨 Validações
    if (amount <= 0) {
      alert('❌ Enter a valid amount of fuel.');
      return;
    }
    if (fuelLevel + amount > MAX_FUEL_CAPACITY) {
      alert(`⚠️ Cannot exceed ${MAX_FUEL_CAPACITY}L tank capacity.`);
      return;
    }
    if (totalCost > balance) {
      alert('❌ Not enough money!');
      return;
    }

    // ✅ Atualiza combustível e saldo
    setFuelLevel((prevFuel) => prevFuel + amount);
    updateBalance(-totalCost);
    alert(`✅ You refueled ${amount} liters!`);

    setAmount(0); // 🔄 Limpa o campo de entrada após abastecer
  };

  return (
    <div className={styles.container}>
      <h1>⛽ Fuel Station</h1>

      <p>
        Fuel Level: <strong>{fuelLevel}L</strong> / {MAX_FUEL_CAPACITY}L
      </p>
      <p>
        Balance: <strong>${balance.toFixed(2)}</strong>
      </p>

      <input
        type="number"
        placeholder="Liters to refuel"
        value={amount}
        min={0}
        max={MAX_FUEL_CAPACITY - fuelLevel} // 🚫 Limita o valor máximo
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button onClick={handleRefuel} disabled={amount <= 0 || fuelLevel >= MAX_FUEL_CAPACITY}>
        🚗 Refuel
      </button>

      <button className={styles.backButton} onClick={() => navigate('/garage')}>
        🔙 Back to Garage
      </button>
    </div>
  );
}
