import { useCar } from '../context/CarContext';

export function useManageCar() {
  const { parts, addPart, removePart, balance } = useCar();

  return {
    parts,
    balance,
    buyPart: (part: { id: number; name: string; effect: string; price: number }) => {
      if (balance >= part.price) {
        addPart(part);
      } else {
        alert('Not enough money!');
      }
    },
    uninstallPart: (id: number) => removePart(id),
  };
}
