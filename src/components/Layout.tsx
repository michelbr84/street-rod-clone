// src/components/Layout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar'; // ✅ Navbar fixa para navegação
import Footer from './Footer'; // ✅ Rodapé global opcional
import { useRace } from '../context/RaceContext'; // 🚗 Importa o contexto da corrida
import styles from '../styles/layout.module.css'; // ✅ Estilos do layout

export default function Layout() {
  const { track, isRaceActive } = useRace(); // 🎯 Verifica se há uma pista selecionada
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 🚩 Se o jogador estiver na página de corrida e não houver pista selecionada, redireciona para a seleção de pista
    if (location.pathname === '/race' && !track && !isRaceActive) {
      navigate('/select-track'); // 🔄 Redireciona para a página de seleção de pistas
    }
  }, [track, isRaceActive, location, navigate]);

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
