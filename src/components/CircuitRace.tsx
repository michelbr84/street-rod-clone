import { useRace } from '../context/RaceContext';
import HUD from './HUD';
import RaceControls from './RaceControls';

export default function CircuitRace() {
  const { speed, time } = useRace();

  return (
    <div>
      <h1>🔄 Circuit Race</h1>
      <HUD speed={speed} gear={1} fuel={100} time={time} />
      <RaceControls />
      <p>🏁 Complete the laps to win!</p>
    </div>
  );
}
