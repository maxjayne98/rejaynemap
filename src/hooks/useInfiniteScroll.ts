import { useState, useEffect } from "react";

const useInfiniteScroll = (callback: () => void, threshold: number) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold
      ) {
        setIsFetching(true);
        callback();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
