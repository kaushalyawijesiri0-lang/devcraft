import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { easeOut } from "../utils/motion";

export function useCountUp(target: number, start: boolean, duration = 1.2) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: easeOut,
      onUpdate: (v) => setValue(Math.round(v))
    });
    return () => controls.stop();
  }, [start, target, duration, reduce]);

  return value;
}