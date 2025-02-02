// src/context/EngineContext.tsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ⚙️ Definição dos tipos de peça do motor
interface EnginePart {
  id: number;
  name: string;
  performanceBoost: number; // 🚀 Aumento de performance da peça
}

// 🔧 Lista inicial de peças do motor padrão
const defaultParts: EnginePart[] = [
  { id: 1, name: 'Stock Pistons', performanceBoost: 0 },
  { id: 2, name: 'Stock Camshaft', performanceBoost: 0 },
  { id: 3, name: 'Stock Turbo', performanceBoost: 0 },
];

// 🔩 Definição do contexto para gerenciamento do motor
interface EngineContextType {
  parts: EnginePart[];
  modifyPart: (id: number, newPart: EnginePart) => void;
  resetEngine: () => void;
  totalPerformance: number; // 📊 Novo: soma do desempenho total das peças
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

// 🚀 Provedor do contexto
export function EngineProvider({ children }: { children: ReactNode }) {
  const [parts, setParts] = useState<EnginePart[]>(() => {
    const savedParts = localStorage.getItem('engineParts');
    return savedParts ? JSON.parse(savedParts) : defaultParts;
  });

  // 🔄 Persistência das peças no localStorage
  useEffect(() => {
    localStorage.setItem('engineParts', JSON.stringify(parts));
  }, [parts]);

  // ⚙️ Modifica uma peça específica do motor
  const modifyPart = (id: number, newPart: EnginePart) => {
    setParts((prevParts) =>
      prevParts.map((part) => (part.id === id ? { ...part, ...newPart } : part))
    );
    alert(`🔧 ${newPart.name} installed successfully!`);
  };

  // ♻️ Reseta o motor para o estado inicial
  const resetEngine = () => {
    setParts(defaultParts);
    localStorage.removeItem('engineParts');
    alert('🔄 Engine reset to default settings!');
  };

  // 📊 Calcula o desempenho total do motor
  const totalPerformance = parts.reduce((acc, part) => acc + part.performanceBoost, 0);

  return (
    <EngineContext.Provider value={{ parts, modifyPart, resetEngine, totalPerformance }}>
      {children}
    </EngineContext.Provider>
  );
}

// 🛠️ Hook personalizado para acessar o contexto do motor
export function useEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
}
