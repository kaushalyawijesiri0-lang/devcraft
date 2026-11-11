import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

export function BackLink({ to, label }: {to: string;label: string;}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 rounded-md text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      
      <ArrowLeftIcon className="h-4 w-4 transition-transform duration-150 ease-snappy group-hover:-translate-x-0.5" />
      {label}
    </Link>);

}