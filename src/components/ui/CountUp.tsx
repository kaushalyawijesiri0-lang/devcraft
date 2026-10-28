import React, { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

export function CountUp({ value }: {value: number;}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [value, reduce]);

  return <span className="tabular-nums">{display}</span>;
}