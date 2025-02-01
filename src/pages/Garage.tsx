import { Link } from 'react-router-dom';
import { useCar } from '../context/CarContext'; // 🔗 Integração com o contexto de carros
import styles from '../styles/garage.module.css';

export default function Garage() {
  const { cars, balance, sellCar } = useCar(); // 🔗 Obtendo os carros e saldo do jogador
  const selectedCar = cars.length > 0 ? cars[0] : null; // 🔄 Seleciona o primeiro carro (pode ser expandido futuramente)

  return (
    <div className={styles.garageContainer}>
      <header className={styles.garageHeader}>
        <h1>
          🏎️ <span className={styles.title}>My Garage</span>
        </h1>
        <p>Customize, upgrade, and maintain your cars.</p>
        <p className={styles.balance}>
          💰 Balance: <strong>${balance}</strong> {/* 💰 Mostra o saldo atual */}
        </p>
      </header>

      <main className={styles.garageContent}>
        {selectedCar ? (
          <div className={styles.garageCarDisplay}>
            <img
              src={`/images/${selectedCar.name.toLowerCase().replace(/\s+/g, '-')}.png`} // 🔗 Imagem dinâmica do carro
              alt={selectedCar.name}
              className={styles.garageCar}
              onError={(e) => {
                e.currentTarget.onerror = null; // Evita loop infinito em caso de falha
                e.currentTarget.src = '/images/car-placeholder.png';
              }} // 🚨 Placeholder caso a imagem não exista
            />
            <h2>🔥 {selectedCar.name}</h2>
            <p>
              Horsepower: {selectedCar.speed} HP | Weight: {selectedCar.weight || 1400} kg
            </p>

            {/* ❌ Botão para vender o carro */}
            <button
              className={styles.sellButton}
              onClick={() => {
                if (window.confirm(`Are you sure you want to sell ${selectedCar.name}?`)) {
                  sellCar(selectedCar.id);
                }
              }}
              disabled={cars.length === 1} // 🚫 Impede a venda do último carro
            >
              💸 Sell Car
            </button>
          </div>
        ) : (
          <p className={styles.noCar}>
            You don&rsquo;t own any cars yet! Buy one in the{' '}
            <Link to="/shop" className={styles.shopLink}>
              shop
            </Link>
            .
          </p>
        )}

        <div className={styles.garageButtons}>
          <Link to="/shop" className={`${styles.garageButton} ${styles.upgrade}`}>
            🛠 Upgrade
          </Link>
          <Link
            to="/race"
            className={`${styles.garageButton} ${styles.race}`}
            style={{
              opacity: selectedCar ? 1 : 0.5,
              pointerEvents: selectedCar ? 'auto' : 'none',
            }} // 🚫 Desativa o botão se não houver carro
          >
            🏁 Race
          </Link>
          <Link to="/" className={`${styles.garageButton} ${styles.back}`}>
            ⬅ Back
          </Link>
        </div>

        {/* 🚗 Lista de Carros do Jogador */}
        {cars.length > 0 && (
          <div className={styles.carList}>
            <h3>🚗 Your Cars:</h3>
            <ul>
              {cars.map((car) => (
                <li key={car.id} className={styles.carItem}>
                  <span>
                    {car.name} - {car.speed} HP
                  </span>
                  <button
                    className={styles.sellButtonSmall}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to sell ${car.name}?`)) {
                        sellCar(car.id);
                      }
                    }}
                    disabled={cars.length === 1} // 🚫 Impede a venda do último carro
                  >
                    💸 Sell
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className={styles.garageFooter}>
        <p>© 2024 Street Rod Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
