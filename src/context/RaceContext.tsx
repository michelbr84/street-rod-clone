// src/context/RaceContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/* 🌦️ Tipos de clima possíveis */
type Weather = 'clear' | 'rainy' | 'foggy' | 'snowy';

/* 🛣️ Interface para as pistas */
interface Track {
  name: string;
  weather: Weather;
  gripModifier: number; // Modificador de aderência com base no clima
}

/* 🛞 Tipos de pneus disponíveis */
type TireType = 'soft' | 'medium' | 'hard';

interface Tire {
  type: TireType;
  grip: number; // 🛣️ Aderência do pneu
  durability: number; // ⏳ Durabilidade restante (%)
  wearRate: number; // 🔥 Taxa de desgaste por ciclo de atualização
}

/* 🎯 Interface que define o estado da corrida */
interface RaceState {
  track: Track | null;
  speed: number;
  gear: number;
  fuel: number;
  position: number;
  time: number;
  tire: Tire;
  isRaceActive: boolean;
  startRace: (track: Track, tireType: TireType) => void;
  accelerate: () => void;
  brake: () => void;
  updateRace: () => void;
  changeTire: (newTireType: TireType) => void;
}

/* 🚗 Criação do contexto da corrida */
const RaceContext = createContext<RaceState | undefined>(undefined);

/* 🎵 Carregamento de sons */
const engineSound = new Audio('/sounds/engine.mp3');
engineSound.loop = true;

const tireScreechSound = new Audio('/sounds/tire_screech.mp3');
const gearShiftSound = new Audio('/sounds/gear_shift.mp3');
const engineRoarSound = new Audio('/sounds/engine_roar.mp3');
const crashSound = new Audio('/sounds/crash.mp3');

/* 🚀 Provedor do contexto da corrida */
export function RaceProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [fuel, setFuel] = useState(100);
  const [position, setPosition] = useState(5);
  const [time, setTime] = useState(0);
  const [isRaceActive, setIsRaceActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const [tire, setTire] = useState<Tire>({
    type: 'medium',
    grip: 1,
    durability: 100,
    wearRate: 0.5,
  });

  /* 🚦 Iniciar corrida */
  const startRace = (selectedTrack: Track, tireType: TireType) => {
    setTrack(selectedTrack);
    setSpeed(0);
    setGear(1);
    setFuel(100);
    setPosition(5);
    setTime(0);
    setIsRaceActive(true);
    changeTire(tireType);

    engineSound.play().catch((err) => console.log('Erro ao iniciar som do motor:', err));
  };

  /* 🔄 Troca de pneus */
  const changeTire = (newTireType: TireType) => {
    const tireOptions = {
      soft: { grip: 1.2, durability: 70, wearRate: 1 },
      medium: { grip: 1, durability: 100, wearRate: 0.5 },
      hard: { grip: 0.8, durability: 150, wearRate: 0.3 },
    };
    setTire({ type: newTireType, ...tireOptions[newTireType] });
  };

  /* 🚀 Aceleração */
  const accelerate = () => {
    if (fuel > 0 && isRaceActive && track) {
      const gripEffect = tire.grip * track.gripModifier * (tire.durability / 100);
      const newSpeed = Math.min(220, speed + 10 * gripEffect);
      setSpeed(isNaN(newSpeed) ? 0 : newSpeed);

      engineSound.volume = Math.min(1, newSpeed / 220);

      if (newSpeed > 150 && engineRoarSound.paused) {
        engineRoarSound.play();
      }

      if (newSpeed > 100 && Math.random() < 0.05) {
        handleCollision();
      }

      setTire((prevTire) => ({
        ...prevTire,
        durability: Math.max(0, prevTire.durability - prevTire.wearRate),
      }));

      setGear((prevGear) => {
        let newGear = prevGear;
        if (newSpeed < 40) newGear = 1;
        else if (newSpeed < 80) newGear = 2;
        else if (newSpeed < 140) newGear = 3;
        else newGear = 4;

        if (newGear !== prevGear) {
          gearShiftSound.play();
        }
        return newGear;
      });

      if (Math.random() > 0.7 && newSpeed > 100) {
        setPosition((prevPosition) => Math.max(1, prevPosition - 1));
      }
    }
  };

  /* 💥 Colisão */
  const handleCollision = () => {
    crashSound.play();
    setSpeed((prevSpeed) => Math.max(0, prevSpeed - 30));
    setTire((prevTire) => ({
      ...prevTire,
      durability: Math.max(0, prevTire.durability - 10),
    }));
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    alert('💥 Collision occurred! Speed reduced and tire damaged.');
  };

  /* 🛑 Frenagem */
  const brake = () => {
    if (isRaceActive && track) {
      const brakingEfficiency = tire.grip * (track.weather === 'rainy' ? 0.7 : 1);
      const newSpeed = Math.max(0, speed - 20 * brakingEfficiency);
      setSpeed(isNaN(newSpeed) ? 0 : newSpeed);

      if (newSpeed < speed && speed > 80) {
        tireScreechSound.play();
      }

      setGear(() => {
        if (newSpeed < 40) return 1;
        if (newSpeed < 80) return 2;
        return 3;
      });
    }
  };

  /* 🔄 Atualização contínua */
  const updateRace = () => {
    if (isRaceActive && track) {
      setFuel((prevFuel) => {
        const baseConsumption = speed > 100 ? 0.7 : speed > 50 ? 0.4 : 0.2;
        const weatherImpact = track.weather === 'snowy' ? 1.3 : track.weather === 'rainy' ? 1.1 : 1;
        const newFuel = Math.max(0, prevFuel - baseConsumption * weatherImpact);

        if (newFuel === 0) {
          setIsRaceActive(false);
          setSpeed(0);
          engineSound.pause();
          alert('⛽ Fuel exhausted. Race over!');
        }
        return newFuel;
      });

      setTime((prevTime) => prevTime + 1);

      if (position === 1) {
        setIsRaceActive(false);
        engineSound.pause();
        alert('🏆 You won the race!');
      }
    }
  };

  useEffect(() => {
    if (isRaceActive) {
      const interval = setInterval(updateRace, 1000);
      return () => clearInterval(interval);
    }
  }, [isRaceActive, speed, fuel, position]);

  return (
    <RaceContext.Provider
      value={{
        track,
        speed,
        gear,
        fuel,
        position,
        time,
        tire,
        isRaceActive,
        startRace,
        accelerate,
        brake,
        updateRace,
        changeTire,
      }}
    >
      <div className={isShaking ? 'shake' : ''}>{children}</div>
    </RaceContext.Provider>
  );
}

/* 🚀 Hook personalizado para acessar o contexto */
export function useRace() {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error('useRace must be used within a RaceProvider');
  }
  return context;
}
