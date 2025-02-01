import { useCar } from '../context/CarContext';
import styles from '../styles/shop.module.css';

// Lista de carros disponíveis para compra
const availableCars = [
  { id: 1, name: 'Ford Mustang', price: 15000, speed: 200 },
  { id: 2, name: 'Chevrolet Camaro', price: 18000, speed: 220 },
  { id: 3, name: 'Dodge Charger', price: 20000, speed: 240 },
];

export default function CarShop() {
  const { balance, addCar } = useCar();

  return (
    <div className={styles.shopContainer}>
      <h1>🚗 Car Dealership</h1>
      <p>
        Your balance: <strong>${balance}</strong>
      </p>

      <div className={styles.itemsGrid}>
        {availableCars.map((car) => (
          <div key={car.id} className={styles.itemCard}>
            <h3>{car.name}</h3>
            <p>Price: ${car.price}</p>
            <p>Speed: {car.speed} km/h</p>
            <button onClick={() => addCar(car)} disabled={balance < car.price}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
