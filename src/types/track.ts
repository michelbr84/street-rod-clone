export type WeatherCondition = 'sunny' | 'rainy' | 'foggy' | 'snowy';

export interface Track {
  id: number;
  name: string;
  length: number; // 🛣️ Comprimento da pista em metros
  weather: WeatherCondition; // ☀️🌧️ Condição climática
  gripModifier: number; // 🔥 Modificador de aderência da pista
  visibility: number; // 👀 Nível de visibilidade (0 a 1)
}
