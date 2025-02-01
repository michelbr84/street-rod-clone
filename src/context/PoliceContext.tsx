import { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos de evento policial
interface PoliceEvent {
  type: 'CHASE' | 'FINE' | 'CAR_SEIZED';
  amount?: number;
}

interface PoliceContextType {
  policeAlert: boolean;
  activeEvent: PoliceEvent | null;
  triggerPoliceEvent: () => void;
  attemptEscape: (speed: number) => boolean;
  payFine: () => void;
}

const PoliceContext = createContext<PoliceContextType | undefined>(undefined);

// Provedor do contexto policial
export function PoliceProvider({ children }: { children: ReactNode }) {
  const [policeAlert, setPoliceAlert] = useState(false);
  const [activeEvent, setActiveEvent] = useState<PoliceEvent | null>(null);

  // Método para ativar um evento policial aleatório
  const triggerPoliceEvent = () => {
    const eventChance = Math.random();
    if (eventChance < 0.4) {
      startChase();
    } else if (eventChance < 0.7) {
      issueFine();
    } else {
      seizeCar();
    }
  };

  // Perseguição policial
  const startChase = () => {
    setActiveEvent({ type: 'CHASE' });
    setPoliceAlert(true);
  };

  // Multa ao jogador
  const issueFine = () => {
    const fineAmount = Math.floor(Math.random() * 1000) + 500;
    setActiveEvent({ type: 'FINE', amount: fineAmount });
    setPoliceAlert(true);
  };

  // Apreensão do carro
  const seizeCar = () => {
    setActiveEvent({ type: 'CAR_SEIZED' });
    setPoliceAlert(true);
  };

  // Tentativa de fuga baseada na velocidade
  const attemptEscape = (speed: number): boolean => {
    const escapeChance = Math.random() + speed / 400;
    if (escapeChance > 0.6) {
      setActiveEvent(null);
      setPoliceAlert(false);
      return true;
    } else {
      seizeCar();
      return false;
    }
  };

  // Pagamento de multa
  const payFine = () => {
    setActiveEvent(null);
    setPoliceAlert(false);
  };

  return (
    <PoliceContext.Provider
      value={{ policeAlert, activeEvent, triggerPoliceEvent, attemptEscape, payFine }}
    >
      {children}
    </PoliceContext.Provider>
  );
}

// Hook personalizado para acessar o contexto da polícia
export function usePolice() {
  const context = useContext(PoliceContext);
  if (!context) {
    throw new Error('usePolice must be used within a PoliceProvider');
  }
  return context;
}
