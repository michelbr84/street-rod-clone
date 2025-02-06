// src/context/RaceContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAudio } from './AudioContext'; // 🎵 Importação do contexto de áudio

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

/* 🚀 Provedor do contexto da corrida */
export function RaceProvider({ children }: { children: ReactNode }) {
  const { volume } = useAudio(); // 🎚️ Volume global do contexto de áudio

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

  /* 🎵 Carregamento de sons */
  const sounds = {
    engine: new Audio('/sounds/engine.mp3'),
    tireScreech: new Audio('/sounds/tire_screech.mp3'),
    gearShift: new Audio('/sounds/gear_shift.mp3'),
    engineRoar: new Audio('/sounds/engine_roar.mp3'),
    crash: new Audio('/sounds/crash.mp3'),
  };

  sounds.engine.loop = true;

  /* 🔊 Sincroniza o volume global com os sons da corrida */
  useEffect(() => {
    Object.values(sounds).forEach((sound) => {
      sound.volume = volume;
    });
  }, [volume]);

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

    sounds.engine.play().catch((err) => console.log('Erro ao iniciar som do motor:', err));
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
      setSpeed(newSpeed);

      sounds.engine.volume = volume * Math.min(1, newSpeed / 220);

      if (newSpeed > 150 && sounds.engineRoar.paused) {
        sounds.engineRoar.play();
      }

      if (newSpeed > 100 && Math.random() < 0.05) {
        handleCollision();
      }

      setTire((prevTire) => ({
        ...prevTire,
        durability: Math.max(0, prevTire.durability - prevTire.wearRate),
      }));

      handleGearChange(newSpeed);
      updatePosition(newSpeed);
    }
  };

  /* 🔄 Mudança de Marcha */
  const handleGearChange = (newSpeed: number) => {
    let newGear = gear;
    if (newSpeed < 40) newGear = 1;
    else if (newSpeed < 80) newGear = 2;
    else if (newSpeed < 140) newGear = 3;
    else newGear = 4;

    if (newGear !== gear) {
      sounds.gearShift.play();
    }
    setGear(newGear);
  };

  /* 🏁 Atualização da Posição */
  const updatePosition = (newSpeed: number) => {
    if (Math.random() > 0.7 && newSpeed > 100) {
      setPosition((prev) => Math.max(1, prev - 1));
    }
  };

  /* 💥 Colisão */
  const handleCollision = () => {
    sounds.crash.play();
    setSpeed((prev) => Math.max(0, prev - 30));
    setTire((prev) => ({
      ...prev,
      durability: Math.max(0, prev.durability - 10),
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
      setSpeed(newSpeed);

      if (newSpeed < speed && speed > 80) {
        sounds.tireScreech.play();
      }

      handleGearChange(newSpeed);
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
          endRace('⛽ Fuel exhausted. Race over!');
        }
        return newFuel;
      });

      setTime((prevTime) => prevTime + 1);

      if (position === 1) {
        endRace('🏆 You won the race!');
      }
    }
  };

  /* 🏁 Encerrar Corrida */
  const endRace = (message: string) => {
    setIsRaceActive(false);
    setSpeed(0);
    sounds.engine.pause();
    alert(message);
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
