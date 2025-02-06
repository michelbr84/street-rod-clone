// src/pages/Shop.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ Importação do Link para navegação
import { useCar } from '../context/CarContext'; // 🔗 Integração com o contexto de carros
import styles from '../styles/shop.module.css';

// 🚗 Lista de carros disponíveis para compra
const carInventory = [
  { id: 101, name: '1969 Mustang', price: 5000, speed: 180 },
  { id: 102, name: 'Nissan Skyline GT-R', price: 8000, speed: 220 },
  { id: 103, name: 'Porsche 911', price: 12000, speed: 240 },
];

// ⚙️ Lista de upgrades disponíveis
const shopItems = [
  { id: 1, name: 'Turbocharger', price: 1500 },
  { id: 2, name: 'High-Performance Tires', price: 800 },
  { id: 3, name: 'Racing Suspension', price: 1200 },
  { id: 4, name: 'Performance Exhaust', price: 600 },
  { id: 5, name: 'Nitrous Oxide (NOS)', price: 2500 },
];

export default function Shop() {
  const { balance, addCar, updateBalance, cars } = useCar(); // ✅ Correção: usando `updateBalance`
  const [activeTab, setActiveTab] = useState<'cars' | 'upgrades'>('cars');

  const [purchasedUpgrades, setPurchasedUpgrades] = useState<
    { id: number; name: string; price: number }[]
  >(() => {
    const savedUpgrades = localStorage.getItem('purchasedUpgrades');
    return savedUpgrades ? JSON.parse(savedUpgrades) : [];
  });

  useEffect(() => {
    localStorage.setItem('purchasedUpgrades', JSON.stringify(purchasedUpgrades));
  }, [purchasedUpgrades]);

  // 🚗 Comprar um carro
  const handleBuyCar = (car: { id: number; name: string; price: number; speed: number }) => {
    if (balance < car.price) {
      alert('❌ Not enough money to buy this car!');
      return;
    }

    if (cars.some((ownedCar) => ownedCar.id === car.id)) {
      alert('⚠️ You already own this car!');
      return;
    }

    addCar(car); // ✅ O desconto do saldo ocorre internamente no `addCar`
    alert(`✅ You bought the ${car.name}!`);
  };

  // 🛠️ Comprar um upgrade
  const handleBuyUpgrade = (item: { id: number; name: string; price: number }) => {
    if (balance < item.price) {
      alert('❌ Not enough money to buy this upgrade!');
      return;
    }
    if (purchasedUpgrades.some((upgrade) => upgrade.id === item.id)) {
      alert('⚠️ You already own this upgrade!');
      return;
    }

    setPurchasedUpgrades([...purchasedUpgrades, item]);
    updateBalance(-item.price); // ✅ Deduz do saldo apenas para upgrades
    alert(`✅ You purchased the ${item.name}!`);
  };

  return (
    <div className={styles.shopContainer}>
      <h1>🏪 Welcome to the Shop</h1>
      <p className={styles.balance}>
        💰 Your Balance: <strong>${balance}</strong>
      </p>

      {/* 🔙 Botão para voltar à garagem */}
      <Link to="/garage" className={styles.backButton}>
        ⬅️ Back to Garage
      </Link>

      {/* 🗂️ Tabs para alternar entre Carros e Upgrades */}
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab('cars')}
          className={activeTab === 'cars' ? styles.activeTab : ''}
        >
          🚗 Cars
        </button>
        <button
          onClick={() => setActiveTab('upgrades')}
          className={activeTab === 'upgrades' ? styles.activeTab : ''}
        >
          ⚙️ Upgrades
        </button>
      </div>

      {/* 🚗 Aba de Compra de Carros */}
      {activeTab === 'cars' && (
        <div className={styles.itemsGrid}>
          {carInventory.map((car) => {
            const owned = cars.some((ownedCar) => ownedCar.id === car.id);
            return (
              <div key={car.id} className={`${styles.itemCard} ${owned ? styles.owned : ''}`}>
                <h3>{car.name}</h3>
                <p>Speed: {car.speed} km/h</p>
                <p>Price: ${car.price}</p>
                <button
                  onClick={() => handleBuyCar(car)}
                  disabled={balance < car.price || owned} // ✅ Desativa se o saldo for insuficiente ou já possuir o carro
                >
                  {owned ? '✔ Owned' : balance >= car.price ? 'Buy' : 'Not Enough Money'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ⚙️ Aba de Compra de Upgrades */}
      {activeTab === 'upgrades' && (
        <div className={styles.itemsGrid}>
          {shopItems.map((item) => {
            const owned = purchasedUpgrades.some((upgrade) => upgrade.id === item.id);
            return (
              <div key={item.id} className={`${styles.itemCard} ${owned ? styles.owned : ''}`}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <button
                  onClick={() => handleBuyUpgrade(item)}
                  disabled={balance < item.price || owned} // ✅ Desativa se já comprado ou saldo insuficiente
                >
                  {owned ? '✔ Owned' : 'Buy'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 🎯 Lista de Upgrades Comprados */}
      <h2>Your Upgrades</h2>
      <ul className={styles.upgradesList}>
        {purchasedUpgrades.length > 0 ? (
          purchasedUpgrades.map((item) => <li key={item.id}>✅ {item.name}</li>)
        ) : (
          <p>No upgrades purchased yet.</p>
        )}
      </ul>
    </div>
  );
}
