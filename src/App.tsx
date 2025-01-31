import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Shop from './pages/Shop';
import Game from './pages/Game';
import Race from './pages/Race';
import FuelStation from './pages/FuelStation';
import PoliceChase from './pages/PoliceChase';
import Leaderboard from './pages/Leaderboard';
import GameOver from './pages/GameOver'; // ✅ Importação da tela Game Over
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/game" element={<Game />} />
          <Route path="/race" element={<Race />} />
          <Route path="/fuel-station" element={<FuelStation />} />
          <Route path="/police-chase" element={<PoliceChase />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game-over" element={<GameOver />} /> {/* ✅ Rota adicionada */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
