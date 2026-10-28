import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function ProgressBar({ value, label }: {value: number;label: string;}) {
  const reduce = useReducedMotion();
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      className="h-2 w-full overflow-hidden rounded-full bg-subtle">
      
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
        style={reduce ? { width: `${value}%` } : undefined} />
      
    </div>);

}