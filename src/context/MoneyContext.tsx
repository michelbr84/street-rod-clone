// src/context/MoneyContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 🎮 Definição do contexto de dinheiro
interface MoneyContextType {
  balance: number;
  betAmount: number;
  placeBet: (amount: number) => boolean;
  adjustBalance: (amount: number) => void;
  resetBet: () => void;
}

// Criando o contexto
const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

// 🔥 Provedor do contexto
export function MoneyProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(5000); // 💰 Saldo inicial do jogador
  const [betAmount, setBetAmount] = useState(0);

  // 💰 Apostar dinheiro antes da corrida
  const placeBet = (amount: number): boolean => {
    if (amount > 0 && amount <= balance) {
      setBetAmount(amount);
      setBalance((prev) => prev - amount);
      return true;
    } else {
      alert('⚠️ Aposta inválida ou saldo insuficiente!');
      return false;
    }
  };

  // 🏆 Ajusta o saldo do jogador (ganho ou perda)
  const adjustBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  // 🔄 Resetar a aposta após a corrida
  const resetBet = () => {
    setBetAmount(0);
  };

  return (
    <MoneyContext.Provider value={{ balance, betAmount, placeBet, adjustBalance, resetBet }}>
      {children}
    </MoneyContext.Provider>
  );
}

// 🚀 Hook personalizado para acessar o contexto
export function useMoney() {
  const context = useContext(MoneyContext);
  if (!context) {
    throw new Error('useMoney must be used within a MoneyProvider');
  }
  return context;
}
