import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        'rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-20px_rgba(15,23,42,0.18)]',
        className
      )}
      {...props} />);


}