import { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos de peça do motor
interface EnginePart {
  id: number;
  name: string;
  performanceBoost: number;
}

// Lista inicial de peças do motor padrão
const defaultParts: EnginePart[] = [
  { id: 1, name: 'Stock Pistons', performanceBoost: 0 },
  { id: 2, name: 'Stock Camshaft', performanceBoost: 0 },
  { id: 3, name: 'Stock Turbo', performanceBoost: 0 },
];

// Definição do contexto para gerenciamento do motor
interface EngineContextType {
  parts: EnginePart[];
  modifyPart: (id: number, newPart: EnginePart) => void;
  resetEngine: () => void;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

// Provedor do contexto
export function EngineProvider({ children }: { children: ReactNode }) {
  const [parts, setParts] = useState<EnginePart[]>(defaultParts);

  // Modifica uma peça específica do motor
  const modifyPart = (id: number, newPart: EnginePart) => {
    setParts((prevParts) => prevParts.map((part) => (part.id === id ? newPart : part)));
  };

  // Reseta o motor para o estado inicial
  const resetEngine = () => {
    setParts(defaultParts);
  };

  return (
    <EngineContext.Provider value={{ parts, modifyPart, resetEngine }}>
      {children}
    </EngineContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within an EngineProvider');
  }
  return context;
}
