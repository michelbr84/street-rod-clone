// src/pages/Maintenance.tsx
import { useCar } from '../context/CarContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/maintenance.module.css';

export default function Maintenance() {
  const { cars, balance, updateBalance, repairCar } = useCar(); // ✅ Inclui balance e repairCar do contexto
  const navigate = useNavigate();
  const selectedCar = cars[0]; // 🔧 Considerando o primeiro carro (pode ser expandido)

  if (!selectedCar) {
    return (
      <div className={styles.container}>
        <h1>🚗 Maintenance</h1>
        <p>No car available to repair. Go buy one in the shop!</p>
        <button onClick={() => navigate('/shop')}>🛒 Go to Shop</button>
      </div>
    );
  }

  const repairCostPerPercent = 50; // 💰 Custo por ponto de dano
  const damage = 100 - (selectedCar.condition || 100);
  const repairCost = damage * repairCostPerPercent;

  const handleRepair = () => {
    if (damage === 0) {
      alert('✅ Your car is already in perfect condition!');
      return;
    }
    if (repairCost > 0 && balance >= repairCost) {
      updateBalance(-repairCost); // 💸 Deduz o custo do saldo
      repairCar(selectedCar.id, repairCost); // 🔧 Chama a função de reparo do contexto
      alert('✅ Your car has been fully repaired!');
    } else {
      alert('❌ Not enough money to repair the car.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>🛠️ Car Maintenance</h1>
      <p>
        🚘 <strong>Car:</strong> {selectedCar.name}
      </p>
      <p>
        🔧 <strong>Condition:</strong> {selectedCar.condition || 100}%
      </p>
      <p>
        💰 <strong>Repair Cost:</strong> ${repairCost}
      </p>

      <button onClick={handleRepair} disabled={damage === 0 || balance < repairCost}>
        {damage === 0 ? '✅ Car is Perfect' : '🔧 Repair Car'}
      </button>

      <button onClick={() => navigate('/garage')} className={styles.backButton}>
        ⬅ Back to Garage
      </button>
    </div>
  );
}
