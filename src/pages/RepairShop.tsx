import { useCar } from '../context/CarContext';
import styles from '../styles/repairShop.module.css';

export default function RepairShop() {
  const { cars, balance, repairCar } = useCar();

  // 💰 Calcula o custo de reparo com base na condição atual do carro
  const calculateRepairCost = (condition: number) => {
    const damage = 100 - condition; // Quanto maior o dano, maior o custo
    return damage * 20; // 💰 Custo de $20 por ponto de dano
  };

  return (
    <div className={styles.container}>
      <h1>🛠️ Repair Shop</h1>
      <p>
        💰 Balance: <strong>${balance}</strong>
      </p>

      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car.id} className={styles.carCard}>
            <h3>{car.name}</h3>
            <p>
              Condition: <strong>{car.condition}%</strong>
            </p>
            <p>
              Repair Cost: <strong>${calculateRepairCost(car.condition)}</strong>
            </p>

            <button
              className={styles.repairButton}
              onClick={() => {
                if (window.confirm(`Are you sure you want to repair ${car.name}?`)) {
                  repairCar(car.id, calculateRepairCost(car.condition));
                }
              }}
              disabled={car.condition === 100 || balance < calculateRepairCost(car.condition)}
            >
              {car.condition === 100 ? '✅ Perfect Condition' : '🔧 Repair Car'}
            </button>
          </div>
        ))
      ) : (
        <p>No cars in your garage. Buy one in the shop! 🛒</p>
      )}
    </div>
  );
}
