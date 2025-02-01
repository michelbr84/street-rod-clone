import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CarProvider } from './context/CarContext'; // 🚗 Contexto para carros
import { EngineProvider } from './context/EngineContext'; // 🔧 Contexto do motor
import { MoneyProvider } from './context/MoneyContext'; // 💰 Contexto financeiro e apostas
import { PoliceProvider } from './context/PoliceContext'; // 🚔 Contexto do sistema policial
import './styles/global.css'; // ✅ Importação dos estilos globais

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarProvider>
      {' '}
      {/* 🚗 Provedor para gerenciamento dos carros */}
      <EngineProvider>
        {' '}
        {/* 🔧 Provedor para gerenciamento do motor */}
        <MoneyProvider>
          {' '}
          {/* 💰 Provedor para sistema de dinheiro e apostas */}
          <PoliceProvider>
            {' '}
            {/* 🚔 Provedor para eventos policiais */}
            <App /> {/* 🔥 Aplicação principal */}
          </PoliceProvider>
        </MoneyProvider>
      </EngineProvider>
    </CarProvider>
  </React.StrictMode>
);
