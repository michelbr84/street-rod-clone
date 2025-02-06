// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
import SelectTrack from './pages/SelectTrack';
import Layout from './components/Layout';

import { CarProvider } from './context/CarContext';
import { EngineProvider } from './context/EngineContext';
import { PoliceProvider } from './context/PoliceContext';
import { ProgressionProvider } from './context/ProgressionContext';
import { RaceProvider } from './context/RaceContext';
import { GarageProvider } from './context/GarageContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { MoneyProvider } from './context/MoneyContext';

import './styles/global.css'; // 🌍 Estilos globais

// 🎵 Controlador de Música baseado na Rota Atual
function MusicController() {
  const { playMusic, pauseMusic, isMusicPlaying } = useAudio();
  const location = useLocation();

  useEffect(() => {
    const racingRoutes = ['/race', '/drag-race', '/circuit-race']; // 🏁 Rotas de Corrida

    if (racingRoutes.includes(location.pathname)) {
      if (isMusicPlaying) pauseMusic(); // ⏸️ Pausa a música durante as corridas
    } else {
      if (!isMusicPlaying) playMusic(); // ▶️ Toca a música em todas as outras páginas
    }
  }, [location, playMusic, pauseMusic, isMusicPlaying]);

  return null; // Não renderiza nada na UI
}

function App() {
  return (
    <Router>
      {' '}
      {/* ✅ Router no topo */}
      <AudioProvider>
        {' '}
        {/* 🎵 AudioProvider dentro do Router */}
        <MusicController /> {/* 🎶 Controlador de Música Global */}
        <GarageProvider>
          <CarProvider>
            <EngineProvider>
              <PoliceProvider>
                <ProgressionProvider>
                  <RaceProvider>
                    <MoneyProvider>
                      {' '}
                      {/* 💰 Gerencia finanças do jogador */}
                      <Routes>
                        <Route element={<Layout />}>
                          <Route path="/" element={<Home />} />
                          <Route path="/garage" element={<Garage />} />
                          <Route path="/shop" element={<Shop />} />
                          <Route path="/game" element={<Game />} />

                          {/* 🏎️ Modos de Corrida */}
                          <Route path="/select-track" element={<SelectTrack />} />
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

                        {/* 🚫 Página 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </MoneyProvider>
                  </RaceProvider>
                </ProgressionProvider>
              </PoliceProvider>
            </EngineProvider>
          </CarProvider>
        </GarageProvider>
      </AudioProvider>
    </Router>
  );
}

export default App;
