import React from 'react';
import { FlameIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function StreakFlame({ className }: {className?: string;}) {
  return <FlameIcon aria-hidden className={twMerge('h-6 w-6 fill-flame-light text-flame', className)} strokeWidth={1.75} />;
}