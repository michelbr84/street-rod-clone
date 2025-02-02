// src/context/MoneyContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 💰 Definição do contexto de dinheiro
interface MoneyContextType {
  balance: number; // 🏦 Saldo atual do jogador
  betAmount: number; // 🎲 Valor da aposta atual
  placeBet: (amount: number) => boolean; // ➕ Colocar uma aposta
  adjustBalance: (amount: number) => void; // 💸 Ajustar o saldo após a corrida
  resetBet: () => void; // 🔄 Resetar a aposta após a corrida
  resetFinance: () => void; // ♻️ Resetar o saldo e as apostas (para novo jogo)
}

// 🏦 Criando o contexto
const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

// 🔥 Provedor do contexto
export function MoneyProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem('playerBalance');
    return savedBalance ? JSON.parse(savedBalance) : 5000; // 💰 Saldo inicial do jogador
  });

  const [betAmount, setBetAmount] = useState<number>(() => {
    const savedBet = localStorage.getItem('playerBet');
    return savedBet ? JSON.parse(savedBet) : 0;
  });

  // 💾 Salvar saldo e aposta no localStorage
  useEffect(() => {
    localStorage.setItem('playerBalance', JSON.stringify(balance));
    localStorage.setItem('playerBet', JSON.stringify(betAmount));
  }, [balance, betAmount]);

  // 🎲 Apostar dinheiro antes da corrida
  const placeBet = (amount: number): boolean => {
    if (amount > 0 && amount <= balance) {
      setBetAmount(amount);
      setBalance((prev) => prev - amount); // Deduz o valor da aposta do saldo
      alert(`🎯 Aposta de $${amount} colocada com sucesso!`);
      return true;
    } else {
      alert('⚠️ Aposta inválida ou saldo insuficiente!');
      return false;
    }
  };

  // 🏆 Ajusta o saldo do jogador (ganho ou perda)
  const adjustBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
    if (amount > 0) {
      alert(`💰 Você ganhou $${amount}!`);
    } else if (amount < 0) {
      alert(`😢 Você perdeu $${Math.abs(amount)}!`);
    }
  };

  // 🔄 Resetar a aposta após a corrida
  const resetBet = () => {
    setBetAmount(0);
    localStorage.removeItem('playerBet');
  };

  // ♻️ Resetar o saldo e as apostas (para novo jogo)
  const resetFinance = () => {
    setBalance(5000); // Saldo inicial
    setBetAmount(0);
    localStorage.removeItem('playerBalance');
    localStorage.removeItem('playerBet');
    alert('🔄 Finanças resetadas com sucesso!');
  };

  return (
    <MoneyContext.Provider
      value={{ balance, betAmount, placeBet, adjustBalance, resetBet, resetFinance }}
    >
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
