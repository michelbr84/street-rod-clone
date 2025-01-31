// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // ✅ Navbar fixa para navegação
import styles from '../styles/layout.module.css'; // ✅ Importação de estilos (opcional)

export default function Layout() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* ✅ Navbar Global */}
      <main className={styles.content}>
        <Outlet /> {/* ✅ Aqui será renderizada a página ativa */}
      </main>
    </div>
  );
}
