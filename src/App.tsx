// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Garage from './pages/Garage';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import Layout from './components/Layout'; // Layout global opcional

function App() {
  return (
    <Router>
      <Routes>
        {/* Envolve todas as páginas dentro do Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/game" element={<Game />} />
        </Route>

        {/* Página 404 para rotas desconhecidas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
