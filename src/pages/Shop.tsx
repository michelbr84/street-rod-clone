import { useState } from 'react';
import styles from '../styles/shop.module.css';

// Mock de itens da loja (pode ser substituído por um banco de dados futuramente)
const shopItems = [
  { id: 1, name: 'Turbocharger', price: 1500 },
  { id: 2, name: 'High-Performance Tires', price: 800 },
  { id: 3, name: 'Racing Suspension', price: 1200 },
  { id: 4, name: 'Performance Exhaust', price: 600 },
  { id: 5, name: 'Nitrous Oxide (NOS)', price: 2500 },
];

export default function Shop() {
  const [balance, setBalance] = useState(5000); // Simulando o dinheiro do jogador
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);

  const buyItem = (item: { id: number; name: string; price: number }) => {
    if (balance >= item.price) {
      setCart([...cart, item]);
      setBalance(balance - item.price);
    } else {
      alert('Not enough money!');
    }
  };

  return (
    <div className={styles.shopContainer}>
      <h1>🏁 Performance Shop</h1>
      <p>
        Your balance: <strong>${balance}</strong>
      </p>

      <div className={styles.itemsGrid}>
        {shopItems.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => buyItem(item)} disabled={balance < item.price}>
              Buy
            </button>
          </div>
        ))}
      </div>

      <h2>Your Upgrades</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item, index) => <li key={index}>{item.name}</li>)
        ) : (
          <p>No upgrades purchased yet.</p>
        )}
      </ul>
    </div>
  );
}
