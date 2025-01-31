import { Link } from 'react-router-dom';
import './Garage.css';

export default function Garage() {
  return (
    <div className="garage-container">
      <header className="garage-header">
        <h1>🏎️ My Garage</h1>
        <p>Customize, upgrade, and maintain your cars.</p>
      </header>

      <main className="garage-content">
        <div className="garage-car-display">
          <img src="/images/car-placeholder.png" alt="Selected Car" className="garage-car" />
          <h2>🔥 1969 Mustang</h2>
          <p>Horsepower: 350 HP | Weight: 1400kg</p>
        </div>

        <div className="garage-buttons">
          <Link to="/shop" className="garage-button upgrade">
            🛠 Upgrade
          </Link>
          <Link to="/race" className="garage-button race">
            🏁 Race
          </Link>
          <Link to="/home" className="garage-button back">
            ⬅ Back
          </Link>
        </div>
      </main>

      <footer className="garage-footer">
        <p>© 2024 Street Rod Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
