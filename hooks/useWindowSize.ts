import { useEffect, useState } from 'react';

interface IWindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize() {
  const [size, setSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
