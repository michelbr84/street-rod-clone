// src/routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </BrowserRouter>
  );
}
