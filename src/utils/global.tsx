export const createEmptyArray = (size: number) => {
  return Array.from(Array(size).keys());
};

export const showComponentBy10percentProb = () => {
  return Math.floor(Math.random() * 100) % 10 === 0;
};

export const isSameObject = (obj1: any, obj2: any) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
