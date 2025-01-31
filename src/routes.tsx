import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Shop from './pages/Shop';
import Race from './pages/Race'; // ⬅️ Certifique-se de que foi importado corretamente!
import Game from './pages/Game';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/race" element={<Race />} /> {/* ⬅️ Rota da corrida */}
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
