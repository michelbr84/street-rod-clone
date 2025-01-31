// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Opcional, se quiser um menu fixo

export default function Layout() {
  return (
    <div>
      <Navbar /> {/* Opcional, pode ser um menu ou cabeçalho */}
      <main>
        <Outlet /> {/* Renderiza as páginas dentro do layout */}
      </main>
    </div>
  );
}
