import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPillsProps {
  id: string;
  label: string;
  options: string[];
  extraOptions?: string[];
  value: string;
  onChange: (val: string) => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  id,
  label,
  options,
  extraOptions = [],
  value,
  onChange,
}) => {
  const [showMore, setShowMore] = useState(extraOptions.includes(value));
  const displayed = showMore ? [...options, ...extraOptions] : options;

  return (
    <div className="flex flex-col">
      <p id={`${id}-label`} className="mb-2 text-xs font-bold text-ink-900">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={`${id}-label`} className="flex flex-wrap items-center gap-1.5">
        {displayed.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                isSelected
                  ? 'bg-brand text-white shadow-button ring-1 ring-brand'
                  : 'border border-line bg-white text-ink-600 hover:border-brand-300 hover:text-ink-900'
              }`}
            >
              {opt}
            </button>
          );
        })}

        {extraOptions.length > 0 && !showMore && (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-medium text-ink-500 hover:border-brand-300 hover:text-ink-900 transition-colors"
          >
            <span>More</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        )}

        {extraOptions.length > 0 && showMore && (
          <button
            type="button"
            onClick={() => setShowMore(false)}
            className="flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-medium text-ink-500 hover:border-brand-300 hover:text-ink-900 transition-colors"
          >
            <span>Less</span>
            <ChevronUp className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
