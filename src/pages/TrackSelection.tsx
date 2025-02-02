import { tracks } from '../data/tracks';
import { useRace } from '../context/RaceContext';
import styles from '../styles/trackSelection.module.css';

export default function TrackSelection() {
  const { startRace } = useRace();

  return (
    <div className={styles.trackContainer}>
      <h1>🏁 Select Your Track</h1>
      <div className={styles.trackList}>
        {tracks.map((track) => (
          <button key={track.id} onClick={() => startRace(track)}>
            {track.name} - 🌦️ {track.weather.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
