import { useRef, useEffect, useState } from 'react';
import { CAR_DEFS } from '../data';

function initCars() {
  return CAR_DEFS.map(def => {
    // stagger start positions so they don't all begin at the same edge
    const frac = Math.random();
    const pos  = def.from + (def.to - def.from) * frac;
    return { ...def, pos };
  });
}

export function useCars() {
  const [cars, setCars] = useState(() => initCars());
  const rafRef = useRef(null);
  const carsRef = useRef(cars);
  carsRef.current = cars;

  useEffect(() => {
    const tick = () => {
      setCars(prev =>
        prev.map(car => {
          const dir = car.to > car.from ? 1 : -1;
          let pos = car.pos + car.speed * dir;
          // wrap around when past destination
          if (dir === 1 && pos > car.to)  pos = car.from - car.w;
          if (dir === -1 && pos < car.to) pos = car.from + car.w;
          return { ...car, pos };
        })
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return cars;
}
