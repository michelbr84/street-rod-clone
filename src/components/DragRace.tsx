import { useEffect, useState } from 'react';
import { useRace } from '../context/RaceContext';
import { calculateRaceResult } from '../utils/raceLogic';
import HUD from './HUD';
import RaceControls from './RaceControls';

export default function DragRace() {
  const { speed, time } = useRace();
  const [raceResult, setRaceResult] = useState('');

  useEffect(() => {
    if (time >= 10) {
      setRaceResult(calculateRaceResult(speed, time));
    }
  }, [time, speed]);

  return (
    <div>
      <h1>🏁 Drag Race</h1>
      <HUD speed={speed} gear={1} fuel={100} time={time} />
      <RaceControls />
      {raceResult && <p>{raceResult}</p>}
    </div>
  );
}
