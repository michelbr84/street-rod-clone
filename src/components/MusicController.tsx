// src/components/MusicController.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

export default function MusicController() {
  const { playMusic, pauseMusic, isMusicPlaying } = useAudio();
  const location = useLocation();

  useEffect(() => {
    const racingRoutes = ['/race', '/drag-race', '/circuit-race'];

    if (racingRoutes.includes(location.pathname)) {
      if (isMusicPlaying) pauseMusic();
    } else {
      if (!isMusicPlaying) playMusic();
    }
  }, [location, playMusic, pauseMusic, isMusicPlaying]);

  return null;
}
