// src/utils/CarPhysics.ts

export interface CarStats {
  weight: number; // kg
  torque: number; // Nm
  gearRatio: number; // Relação de marchas
  wheelRadius: number; // m
  dragCoefficient: number; // Coeficiente de arrasto do ar
  tireGrip: number; // Aderência dos pneus (0 a 1)
}

export interface CarState {
  speed: number; // km/h
  acceleration: number; // m/s²
  position: number; // posição na corrida
  fuel: number; // nível de combustível
}

const AIR_DENSITY = 1.225; // kg/m³ - densidade do ar

// 🏎️ Função para calcular a aceleração
export function calculateAcceleration(car: CarStats, speed: number): number {
  const force = (car.torque * car.gearRatio) / car.wheelRadius; // Força do motor
  const drag = 0.5 * AIR_DENSITY * car.dragCoefficient * (speed / 3.6) ** 2; // Resistência do ar
  const rollingResistance = 0.015 * car.weight * 9.81; // Atrito dos pneus

  const netForce = force - (drag + rollingResistance); // Força líquida
  const acceleration = netForce / car.weight; // Aceleração final (m/s²)

  return Math.max(0, acceleration); // Nunca negativa
}

// 🚀 Atualiza o estado do carro com base na física
export function updateCarState(car: CarStats, state: CarState, deltaTime: number = 1): CarState {
  const acceleration = calculateAcceleration(car, state.speed);
  const newSpeed = state.speed + acceleration * deltaTime * 3.6; // Convertendo m/s² para km/h

  const fuelConsumption = car.torque * 0.0001 * (newSpeed / 100) * deltaTime; // Consumo de combustível

  return {
    speed: Math.min(newSpeed, 300), // Limite de velocidade
    acceleration,
    position: state.position - (acceleration > 1 ? 1 : 0), // Simula ultrapassagens
    fuel: Math.max(0, state.fuel - fuelConsumption),
  };
}
