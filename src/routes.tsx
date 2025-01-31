import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/game', element: <Game /> },
  { path: '*', element: <NotFound /> }, // Rota para páginas não encontradas
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
