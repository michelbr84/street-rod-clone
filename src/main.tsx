// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* 🌍 Importação dos contextos globais */
import { CarProvider } from './context/CarContext'; // 🚗 Contexto para gerenciamento de carros
import { EngineProvider } from './context/EngineContext'; // 🔧 Contexto para gerenciamento do motor
import { MoneyProvider } from './context/MoneyContext'; // 💰 Contexto financeiro e de apostas
import { PoliceProvider } from './context/PoliceContext'; // 🚔 Contexto para eventos policiais
import { AudioProvider } from './context/AudioContext'; // 🎵 Contexto para trilha sonora e efeitos sonoros

import './styles/global.css'; // ✅ Estilos globais do projeto

/* 🚀 Renderização da aplicação */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarProvider>
      {' '}
      {/* 🚗 Provedor para gerenciamento de carros */}
      <EngineProvider>
        {' '}
        {/* 🔧 Provedor para gerenciamento do motor */}
        <MoneyProvider>
          {' '}
          {/* 💰 Provedor para sistema de dinheiro e apostas */}
          <PoliceProvider>
            {' '}
            {/* 🚔 Provedor para eventos e alertas policiais */}
            <AudioProvider>
              {' '}
              {/* 🎵 Provedor para trilha sonora e efeitos sonoros */}
              <App /> {/* 🔥 Componente principal da aplicação */}
            </AudioProvider>
          </PoliceProvider>
        </MoneyProvider>
      </EngineProvider>
    </CarProvider>
  </React.StrictMode>
);
