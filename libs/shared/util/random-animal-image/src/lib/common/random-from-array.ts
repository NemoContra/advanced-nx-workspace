export const getRandomEntry = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
