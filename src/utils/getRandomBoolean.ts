export const getRandomBoolean = (probability: number): boolean =>
  Math.random() * 100 <= probability;
