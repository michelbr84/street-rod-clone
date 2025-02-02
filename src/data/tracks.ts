import { Track } from '../types/track';

export const tracks: Track[] = [
  {
    id: 1,
    name: 'Desert Sprint',
    length: 3000,
    weather: 'sunny',
    gripModifier: 1,
    visibility: 1,
  },
  {
    id: 2,
    name: 'Rainy Road',
    length: 2800,
    weather: 'rainy',
    gripModifier: 0.7,
    visibility: 0.8,
  },
  {
    id: 3,
    name: 'Foggy Forest',
    length: 3200,
    weather: 'foggy',
    gripModifier: 0.85,
    visibility: 0.5,
  },
  {
    id: 4,
    name: 'Snow Drift',
    length: 3500,
    weather: 'snowy',
    gripModifier: 0.6,
    visibility: 0.6,
  },
];
