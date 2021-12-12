export const createEmptyArray = (size: number) => {
  return Array.from(Array(size).keys());
};

export const showComponentBy10percentProb = () => {
  return Math.floor(Math.random() * 100) % 10 === 0;
};
