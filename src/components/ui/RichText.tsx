import React from 'react';

export function RichText({ text }: {text: string;}) {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, i) =>
      i % 2 === 1 ?
      <code key={i} className="rounded-md bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
            {part}
          </code> :

      <span key={i}>{part}</span>

      )}
    </>);

}