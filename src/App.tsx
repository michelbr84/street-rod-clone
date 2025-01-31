// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <h1>Street Rod Clone 🚗</h1>
        <p>Game development in progress...</p>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
