// src/context/ProgressionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressionContextType {
  rank: number; // Posição do jogador no ranking
  defeatedKing: boolean; // Status do desafio final
  completeRace: () => void; // Função para subir de rank
  defeatKing: () => void; // Função para marcar a vitória contra "The King"
}

const ProgressionContext = createContext<ProgressionContextType | undefined>(undefined);

export const ProgressionProvider = ({ children }: { children: ReactNode }) => {
  const [rank, setRank] = useState(10); // Começa no rank 10
  const [defeatedKing, setDefeatedKing] = useState(false);

  const completeRace = () => {
    setRank((prev) => Math.max(1, prev - 1)); // Sobe no ranking
  };

  const defeatKing = () => {
    setDefeatedKing(true); // Marca a vitória final
  };

  return (
    <ProgressionContext.Provider value={{ rank, defeatedKing, completeRace, defeatKing }}>
      {children}
    </ProgressionContext.Provider>
  );
};

export const useProgression = () => {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
};
