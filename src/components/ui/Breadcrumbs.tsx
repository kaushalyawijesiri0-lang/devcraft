import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, i) =>
        <Fragment key={item.label}>
            {i > 0 &&
          <li aria-hidden className="text-slate-300">
                /
              </li>
          }
            <li>
              {item.to ?
            <Link to={item.to} className="transition-colors duration-150 hover:text-primary">
                  {item.label}
                </Link> :

            <span aria-current="page" className="font-medium text-ink/80">
                  {item.label}
                </span>
            }
            </li>
          </Fragment>
        )}
      </ol>
    </nav>);

}