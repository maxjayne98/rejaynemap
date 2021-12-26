import { useRef, useEffect } from "react";

export const useIsMount = (fn: () => void, inputs: Array<any>) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    else didMountRef.current = true;
  }, inputs);
};
