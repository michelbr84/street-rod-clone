// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // ✅ Navbar fixa para navegação
import Footer from './Footer'; // ✅ Rodapé global opcional
import styles from '../styles/layout.module.css'; // ✅ Estilos do layout

export default function Layout() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* ✅ Navbar global fixa no topo */}
      <main className={styles.content}>
        <Outlet /> {/* 🔥 Renderiza a página ativa com base na rota */}
      </main>
      <Footer /> {/* ✅ Footer global para informações adicionais */}
    </div>
  );
}
