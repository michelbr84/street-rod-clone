/* src/context/CarContext.tsx */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/* 🚗 Tipo de Carro */
export interface Car {
  id: number; // 🔑 ID único para cada carro
  name: string;
  price: number;
  speed: number;
  condition: number; // 🛠️ Condição do carro (0-100%)
  horsepower?: number;
  weight?: number;
}

/* 🔧 Estrutura do Contexto */
interface CarContextType {
  cars: Car[];
  balance: number;
  addCar: (car: Car) => void;
  sellCar: (carId: number) => void;
  repairCar: (carId: number, cost: number) => void; // 🔧 Método para reparo de carros
  updateBalance: (amount: number) => void; // ✅ Atualização de saldo
  resetGarage: () => void; // 🔄 Resetar a garagem
}

/* 📌 Criando o Contexto */
const CarContext = createContext<CarContextType | undefined>(undefined);

/* 🚗 Provedor do Contexto (CarProvider) */
export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem('playerCars');
    return savedCars ? JSON.parse(savedCars) : [];
  });

  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem('playerBalance');
    return savedBalance ? JSON.parse(savedBalance) : 10000; // 💰 Saldo inicial
  });

  // 🔄 Atualiza o localStorage quando os carros mudam
  useEffect(() => {
    localStorage.setItem('playerCars', JSON.stringify(cars));
  }, [cars]);

  // 🔄 Atualiza o localStorage quando o saldo muda
  useEffect(() => {
    localStorage.setItem('playerBalance', JSON.stringify(balance));
  }, [balance]);

  /* ✅ Atualiza o saldo do jogador (impede saldo negativo) */
  const updateBalance = (amount: number) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount;
      if (newBalance < 0) {
        alert('❌ Not enough money!');
        return prevBalance; // 🚫 Impede saldo negativo
      }
      return newBalance;
    });
  };

  /* ➕ Comprar um carro (garante dedução única do saldo) */
  const addCar = (car: Car) => {
    // Verifica se o carro já foi comprado
    const alreadyOwned = cars.some((ownedCar) => ownedCar.name === car.name);
    if (alreadyOwned) {
      alert(`⚠️ You already own the ${car.name}!`);
      return;
    }

    // Verifica saldo suficiente
    if (balance < car.price) {
      alert('❌ Not enough money to buy this car!');
      return;
    }

    const uniqueId = Date.now() + Math.floor(Math.random() * 1000); // 🔑 ID único
    const newCar = { ...car, id: uniqueId, condition: 100 }; // 🚗 Novo carro com condição 100%

    // Atualiza garagem e saldo
    setCars((prevCars) => [...prevCars, newCar]);
    updateBalance(-car.price); // ✅ Deduz o valor do carro do saldo
    alert(`🚗 You purchased a ${car.name}!`);
  };

  /* ❌ Vender um carro de forma segura */
  const sellCar = (carId: number) => {
    const carToSell = cars.find((c) => c.id === carId);

    if (!carToSell) {
      alert('❌ Car not found!');
      return;
    }

    if (cars.length === 1) {
      alert("⚠️ You can't sell your only car!");
      return;
    }

    setCars((prevCars) => prevCars.filter((c) => c.id !== carId));
    updateBalance(carToSell.price / 2); // 💰 Recebe 50% do valor do carro ao vender
    alert(`✅ You sold your ${carToSell.name} for $${carToSell.price / 2}!`);
  };

  /* 🔧 Reparo de um carro (restaura a condição para 100%) */
  const repairCar = (carId: number, cost: number) => {
    if (balance < cost) {
      alert('❌ Not enough money for repairs!');
      return;
    }

    setCars((prevCars) =>
      prevCars.map((car) => (car.id === carId ? { ...car, condition: 100 } : car))
    );

    updateBalance(-cost); // Deduz o custo do reparo do saldo
    alert('✅ Car repaired successfully!');
  };

  /* 🔄 Resetar a garagem (para debug ou novo jogo) */
  const resetGarage = () => {
    setCars([]);
    setBalance(10000); // Reinicia o saldo inicial
    localStorage.clear(); // Limpa o localStorage
    alert('🔄 Garage reset successfully!');
  };

  return (
    <CarContext.Provider
      value={{ cars, balance, addCar, sellCar, repairCar, updateBalance, resetGarage }}
    >
      {children}
    </CarContext.Provider>
  );
}

/* 🎯 Hook personalizado para acessar o contexto */
export function useCar() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
}
