export function calculateRaceResult(speed: number, time: number) {
  if (speed > 180 && time < 10) {
    return '🏆 You won the race!';
  } else if (speed < 100) {
    return '😞 You lost! Try upgrading your car.';
  } else {
    return '⚖️ Close call! Try again.';
  }
}
