// src/pages/VictoryScreen.tsx
import { Link } from 'react-router-dom';

export default function VictoryScreen() {
  return (
    <div>
      <h1>🏆 Congratulations!</h1>
      <p>You have defeated The King and claimed the ultimate prize!</p>
      <Link to="/garage">🚗 Back to Garage</Link>
    </div>
  );
}
