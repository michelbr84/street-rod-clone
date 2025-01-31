import { Link } from 'react-router-dom';
import './Home.css'; // Arquivo de estilos para a Home

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🏁 Street Rod Clone</h1>
        <p>Welcome to the ultimate street racing experience!</p>
      </header>

      <main className="home-content">
        <img src="/images/banner.png" alt="Street Rod Clone Banner" className="home-banner" />

        <div className="home-buttons">
          <Link to="/game" className="home-button play">
            Start Race 🚗
          </Link>
          <Link to="/settings" className="home-button settings">
            Settings ⚙️
          </Link>
          <Link to="/credits" className="home-button credits">
            Credits 📜
          </Link>
        </div>
      </main>

      <footer className="home-footer">
        <p>© 2024 Street Rod Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
