// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Shop from './pages/Shop';
import Game from './pages/Game';
import Race from './pages/Race';
import DragRace from './pages/DragRace'; // ✅ Adicionado Drag Race
import CircuitRace from './pages/CircuitRace'; // ✅ Adicionado Circuit Race
import FuelStation from './pages/FuelStation';
import PoliceChase from './pages/PoliceChase';
import Leaderboard from './pages/Leaderboard';
import GameOver from './pages/GameOver';
import Settings from './pages/Settings';
import Credits from './pages/Credits';
import EngineEditor from './pages/EngineEditor';
import RepairShop from './pages/RepairShop'; // ✅ Adicionado Repair Shop
import Maintenance from './pages/Maintenance'; // ✅ Adicionado Maintenance
import ChallengeTheKing from './pages/ChallengeTheKing'; // 👑 Desafio contra "The King"
import VictoryScreen from './pages/VictoryScreen'; // 🏆 Tela de vitória
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

import { CarProvider } from './context/CarContext'; // ✅ Contexto do carro
import { EngineProvider } from './context/EngineContext'; // ✅ Contexto do motor
import { PoliceProvider } from './context/PoliceContext'; // ✅ Contexto policial
import { ProgressionProvider } from './context/ProgressionContext'; // 🚀 Novo contexto de progressão

import './styles/global.css'; // ✅ Importação de estilos globais

function App() {
  return (
    <CarProvider>
      {' '}
      {/* 🚗 Gerencia os carros do jogo */}
      <EngineProvider>
        {' '}
        {/* ⚙️ Gerencia a mecânica do motor */}
        <PoliceProvider>
          {' '}
          {/* 🚔 Gerencia eventos policiais */}
          <ProgressionProvider>
            {' '}
            {/* 🚀 Novo: Gerencia o progresso do jogador */}
            <Router>
              <Routes>
                {/* 🌐 Todas as páginas dentro do Layout (Navbar fixa) */}
                <Route element={<Layout />}>
                  {/* 📋 Páginas principais */}
                  <Route path="/" element={<Home />} />
                  <Route path="/garage" element={<Garage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/game" element={<Game />} />
                  {/* 🏎️ Corridas */}
                  <Route path="/race" element={<Race />} />
                  <Route path="/drag-race" element={<DragRace />} /> {/* ✅ Drag Race */}
                  <Route path="/circuit-race" element={<CircuitRace />} /> {/* ✅ Circuit Race */}
                  {/* ⛽ Estação de Combustível e Eventos */}
                  <Route path="/fuel-station" element={<FuelStation />} />
                  <Route path="/police-chase" element={<PoliceChase />} />
                  {/* 🛠️ Manutenção e Reparo */}
                  <Route path="/repair-shop" element={<RepairShop />} /> {/* ✅ Repair Shop */}
                  <Route path="/maintenance" element={<Maintenance />} /> {/* ✅ Maintenance */}
                  {/* 👑 Sistema de Progressão e Desafio Final */}
                  <Route path="/challenge-king" element={<ChallengeTheKing />} />{' '}
                  {/* 🚩 Desafio final */}
                  <Route path="/victory" element={<VictoryScreen />} /> {/* 🏆 Tela de vitória */}
                  {/* 🏆 Pontuações e Fim de Jogo */}
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/game-over" element={<GameOver />} />
                  {/* ⚙️ Configurações e Créditos */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route path="/engine-editor" element={<EngineEditor />} />
                </Route>

                {/* 🚫 Página 404 para rotas desconhecidas */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ProgressionProvider>
        </PoliceProvider>
      </EngineProvider>
    </CarProvider>
  );
}

export default App;
