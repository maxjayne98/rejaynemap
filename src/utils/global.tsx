export const createEmptyArray = (size: number) => {
  return Array.from(Array(size).keys());
};

export const showComponentBy10percentProb = () => {
  return Math.floor(Math.random() * 100) % 10 === 0;
};

export const isSameObject = (obj1: any, obj2: any) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export async function retry(
  asyncCallback: () => void,
  { until = 1, tried = 0 }: { until?: number; tried?: number } = {}
): Promise<any> {
  try {
    const response = await asyncCallback();
    return response;
  } catch (error) {
    if (tried + 1 < until) {
      return retry(asyncCallback, { tried: tried + 1, until });
    }
    throw error;
  }
}

export const getLocalStorage = (key: string) =>
  window.localStorage.getItem(key);

export const setLocalStorage = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
