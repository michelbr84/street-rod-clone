import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface RaceState {
  type: 'drag' | 'circuit';
  speed: number;
  gear: number;
  fuel: number;
  position: number;
  time: number;
  isRaceActive: boolean;
  startRace: (raceType: 'drag' | 'circuit') => void;
  accelerate: () => void;
  brake: () => void;
  updateRace: () => void;
}

const RaceContext = createContext<RaceState | undefined>(undefined);

export function RaceProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<'drag' | 'circuit'>('drag');
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [fuel, setFuel] = useState(100);
  const [position, setPosition] = useState(5); // 🏁 Começa na última posição
  const [time, setTime] = useState(0);
  const [isRaceActive, setIsRaceActive] = useState(false);

  // 🚦 Iniciar Corrida
  const startRace = (raceType: 'drag' | 'circuit') => {
    setType(raceType);
    setSpeed(0);
    setGear(1);
    setFuel(100);
    setPosition(5);
    setTime(0);
    setIsRaceActive(true);
  };

  // 🚀 Acelerar
  const accelerate = () => {
    if (fuel > 0 && isRaceActive) {
      setSpeed((prev) => Math.min(220, prev + 10));

      // 🚗 Ajuste da marcha
      setGear(() => {
        if (speed < 40) return 1;
        if (speed < 80) return 2;
        if (speed < 140) return 3;
        return 4;
      });

      // 🏎️ Simula ultrapassagem
      if (Math.random() > 0.7 && speed > 100) {
        setPosition((prev) => Math.max(1, prev - 1));
      }
    }
  };

  // 🛑 Frear
  const brake = () => {
    if (isRaceActive) {
      setSpeed((prev) => Math.max(0, prev - 20));

      // 🚗 Ajuste da marcha
      setGear(() => {
        if (speed < 40) return 1;
        if (speed < 80) return 2;
        return 3;
      });
    }
  };

  // ⏱️ Atualização Contínua da Corrida
  const updateRace = () => {
    if (isRaceActive) {
      setFuel((prev) => Math.max(0, prev - (speed > 100 ? 0.7 : 0.3)));
      setTime((prev) => prev + 1);

      // 🚨 Verifica se o combustível acabou
      setFuel((prevFuel) => {
        if (prevFuel <= 0) {
          setIsRaceActive(false);
          setSpeed(0);
          alert('⛽ Fuel exhausted. Race over!');
          return 0;
        }
        return prevFuel;
      });

      // 🏆 Vitória se alcançar a primeira posição
      if (position === 1) {
        setIsRaceActive(false);
        alert('🏆 You won the race!');
      }
    }
  };

  // 🔄 Efeito para Atualizar a Corrida Automaticamente
  useEffect(() => {
    if (isRaceActive) {
      const interval = setInterval(updateRace, 1000);
      return () => clearInterval(interval);
    }
  }, [isRaceActive, speed, fuel, position]);

  return (
    <RaceContext.Provider
      value={{
        type,
        speed,
        gear,
        fuel,
        position,
        time,
        isRaceActive,
        startRace,
        accelerate,
        brake,
        updateRace,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
}

export function useRace() {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error('useRace must be used within a RaceProvider');
  }
  return context;
}
