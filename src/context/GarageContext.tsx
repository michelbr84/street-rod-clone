// src/context/GarageContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Car {
  id: number;
  name: string;
  speed: number;
  price: number;
}

interface GarageContextType {
  cars: Car[];
  addCar: (car: Car) => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem('garageCars');
    return savedCars ? JSON.parse(savedCars) : []; // ✅ Recupera carros do localStorage
  });

  const addCar = (car: Car) => {
    const updatedCars = [...cars, car];
    setCars(updatedCars);
    localStorage.setItem('garageCars', JSON.stringify(updatedCars)); // 💾 Salva no localStorage
  };

  return <GarageContext.Provider value={{ cars, addCar }}>{children}</GarageContext.Provider>;
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
}
