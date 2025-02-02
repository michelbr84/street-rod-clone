// src/context/PoliceContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMoney } from './MoneyContext'; // 💰 Integração com o sistema de dinheiro

// 🚔 Definição dos tipos de evento policial
interface PoliceEvent {
  type: 'CHASE' | 'FINE' | 'CAR_SEIZED';
  amount?: number; // 💰 Valor da multa (aplicável para FINE)
}

interface PoliceContextType {
  policeAlert: boolean; // 🚨 Status do alerta policial
  activeEvent: PoliceEvent | null; // 📢 Evento policial ativo
  triggerPoliceEvent: () => void; // 🚔 Aciona um evento policial aleatório
  attemptEscape: (speed: number) => boolean; // 🏃‍♂️ Tenta escapar de uma perseguição
  payFine: () => void; // 💸 Paga uma multa
  resetPolice: () => void; // 🔄 Resetar o status policial
}

const PoliceContext = createContext<PoliceContextType | undefined>(undefined);

// 🚨 Provedor do contexto policial
export function PoliceProvider({ children }: { children: ReactNode }) {
  const [policeAlert, setPoliceAlert] = useState(false);
  const [activeEvent, setActiveEvent] = useState<PoliceEvent | null>(null);
  const { adjustBalance } = useMoney(); // 💰 Controle financeiro para pagamento de multas

  // 💾 Recuperar estado do alerta policial do localStorage
  useEffect(() => {
    const savedEvent = localStorage.getItem('policeEvent');
    if (savedEvent) {
      setActiveEvent(JSON.parse(savedEvent));
      setPoliceAlert(true);
    }
  }, []);

  // 💾 Salvar estado do evento policial no localStorage
  useEffect(() => {
    if (activeEvent) {
      localStorage.setItem('policeEvent', JSON.stringify(activeEvent));
    } else {
      localStorage.removeItem('policeEvent');
    }
  }, [activeEvent]);

  // 🚔 Método para acionar um evento policial aleatório
  const triggerPoliceEvent = () => {
    const eventChance = Math.random();
    if (eventChance < 0.4) {
      startChase(); // 🚗 Inicia uma perseguição (40% de chance)
    } else if (eventChance < 0.7) {
      issueFine(); // 💸 Aplica uma multa (30% de chance)
    } else {
      seizeCar(); // ❌ Apreende o carro (30% de chance)
    }
  };

  // 🚓 Iniciar uma perseguição policial
  const startChase = () => {
    setActiveEvent({ type: 'CHASE' });
    setPoliceAlert(true);
    console.log('🚔 Perseguição policial iniciada!');
  };

  // 💸 Aplicar uma multa ao jogador
  const issueFine = () => {
    const fineAmount = Math.floor(Math.random() * 1000) + 500; // Multa entre $500 e $1500
    setActiveEvent({ type: 'FINE', amount: fineAmount });
    setPoliceAlert(true);
    console.log(`💰 Multa emitida no valor de $${fineAmount}`);
  };

  // 🚗 Apreensão do carro
  const seizeCar = () => {
    setActiveEvent({ type: 'CAR_SEIZED' });
    setPoliceAlert(true);
    console.log('❌ Carro apreendido!');
  };

  // 🏃‍♂️ Tentativa de fuga baseada na velocidade do carro
  const attemptEscape = (speed: number): boolean => {
    const escapeChance = Math.random() + speed / 400; // 🚀 Quanto maior a velocidade, maior a chance de escapar
    console.log(`🔎 Tentativa de fuga: chance de escapar = ${escapeChance.toFixed(2)}`);

    if (escapeChance > 0.6) {
      // ✅ Sucesso se chance for maior que 0.6
      setActiveEvent(null);
      setPoliceAlert(false);
      console.log('✅ Fuga bem-sucedida!');
      return true;
    } else {
      seizeCar(); // ❌ Falha resulta na apreensão do carro
      console.log('🚨 Fuga falhou! Carro apreendido.');
      return false;
    }
  };

  // 💰 Pagamento de multa
  const payFine = () => {
    if (activeEvent?.type === 'FINE') {
      if (activeEvent.amount) {
        adjustBalance(-activeEvent.amount); // Deduz o valor da multa do saldo do jogador
        console.log(`💸 Multa de $${activeEvent.amount} paga com sucesso!`);
      }
    }
    setActiveEvent(null);
    setPoliceAlert(false);
  };

  // 🔄 Resetar o status da polícia (útil para debug ou novo jogo)
  const resetPolice = () => {
    setActiveEvent(null);
    setPoliceAlert(false);
    localStorage.removeItem('policeEvent');
    console.log('🔄 Status da polícia resetado.');
  };

  return (
    <PoliceContext.Provider
      value={{ policeAlert, activeEvent, triggerPoliceEvent, attemptEscape, payFine, resetPolice }}
    >
      {children}
    </PoliceContext.Provider>
  );
}

// 🚀 Hook personalizado para acessar o contexto da polícia
export function usePolice() {
  const context = useContext(PoliceContext);
  if (!context) {
    throw new Error('usePolice must be used within a PoliceProvider');
  }
  return context;
}
