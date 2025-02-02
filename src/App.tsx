// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Shop from './pages/Shop';
import Game from './pages/Game';
import Race from './pages/Race';
import DragRace from './pages/DragRace';
import CircuitRace from './pages/CircuitRace';
import FuelStation from './pages/FuelStation';
import PoliceChase from './pages/PoliceChase';
import Leaderboard from './pages/Leaderboard';
import GameOver from './pages/GameOver';
import Settings from './pages/Settings';
import Credits from './pages/Credits';
import EngineEditor from './pages/EngineEditor';
import RepairShop from './pages/RepairShop';
import Maintenance from './pages/Maintenance';
import ChallengeTheKing from './pages/ChallengeTheKing';
import VictoryScreen from './pages/VictoryScreen';
import NotFound from './pages/NotFound';
import SelectTrack from './pages/SelectTrack'; // ✅ Página de seleção de pista
import Layout from './components/Layout';

import { CarProvider } from './context/CarContext';
import { EngineProvider } from './context/EngineContext';
import { PoliceProvider } from './context/PoliceContext';
import { ProgressionProvider } from './context/ProgressionContext';
import { RaceProvider } from './context/RaceContext'; // ✅ Contexto da corrida (inclui pistas e clima)

import './styles/global.css'; // 🌍 Estilos globais

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
            {/* 🚀 Gerencia o progresso do jogador */}
            <RaceProvider>
              {' '}
              {/* 🏁 Gerencia corridas, pistas e condições climáticas */}
              <Router>
                <Routes>
                  <Route element={<Layout />}>
                    {' '}
                    {/* 🌐 Layout com Navbar fixa */}
                    {/* 📋 Páginas principais */}
                    <Route path="/" element={<Home />} />
                    <Route path="/garage" element={<Garage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/game" element={<Game />} />
                    {/* 🏎️ Modos de Corrida */}
                    <Route path="/select-track" element={<SelectTrack />} />{' '}
                    {/* ✅ Seleção de pista */}
                    <Route path="/race" element={<Race />} />
                    <Route path="/drag-race" element={<DragRace />} />
                    <Route path="/circuit-race" element={<CircuitRace />} />
                    {/* ⛽ Estações e Eventos */}
                    <Route path="/fuel-station" element={<FuelStation />} />
                    <Route path="/police-chase" element={<PoliceChase />} />
                    {/* 🛠️ Manutenção e Reparo */}
                    <Route path="/repair-shop" element={<RepairShop />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    {/* 👑 Sistema de Progressão e Desafio Final */}
                    <Route path="/challenge-king" element={<ChallengeTheKing />} />
                    <Route path="/victory" element={<VictoryScreen />} />
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
            </RaceProvider>
          </ProgressionProvider>
        </PoliceProvider>
      </EngineProvider>
    </CarProvider>
  );
}

export default App;
