import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>🏎️ Street Rod Clone</h1>
      <p>Welcome to the game!</p>
      <Link to="/game">Start Game</Link>
    </div>
  );
}
