import { useId, useState } from 'react';
import type { FaqItem } from '@/tools/types';

/**
 * Accessible accordion: each question is a button with aria-expanded that controls its answer. Any number of answers
 * can be open at once. The +/− sign is drawn by CSS from aria-expanded, and the panel opens with a short height
 * transition (none when the visitor prefers reduced motion).
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const base = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const expanded = open.has(i);
        const buttonId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={i} className="accordion-item" data-open={expanded || undefined}>
            <h2 className="accordion-heading">
              <button type="button" id={buttonId} className="accordion-trigger" aria-expanded={expanded} aria-controls={panelId} onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="accordion-sign" aria-hidden="true">
                  {expanded ? '−' : '+'}
                </span>
              </button>
            </h2>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel">
              <div className="accordion-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
