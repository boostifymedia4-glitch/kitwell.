import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, categoryPath, getCategory, groupsInCategory, toolPath, toolsInCategory, toolsInGroup, tools } from '@/tools/registry';
import type { CategoryId } from '@/tools/types';
import { Icon } from '../Icon';
import { ToolIcon } from '../ui/ToolIcon';

const CLOSE_DELAY_MS = 180;

/**
 * The "All tools" menu: categories on the left, the selected category's tool groups on the right.
 * Everything comes from the tool registry, so new tools appear here without editing this file.
 * Opens on click or keyboard, and on hover for mouse users. The category list works like tabs
 * (arrow keys move between categories, Tab moves into the tools).
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timer = useRef<number>(0);
  const { pathname } = useLocation();
  const baseId = useId();

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [open, close]);

  const hoverCapable = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      close();
      buttonRef.current?.focus();
    }
  };

  const onTabKeys = (e: KeyboardEvent) => {
    const i = categories.findIndex((c) => c.id === active);
    const last = categories.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: (i + 1) % categories.length,
      ArrowRight: (i + 1) % categories.length,
      ArrowUp: (i - 1 + categories.length) % categories.length,
      ArrowLeft: (i - 1 + categories.length) % categories.length,
      Home: 0,
      End: last,
    };
    const next = moves[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(categories[next].id);
    tabRefs.current[categories[next].id]?.focus();
  };

  const cat = getCategory(active)!;
  const panelId = `${baseId}-panel`;

  return (
    <div
      className="mega"
      ref={rootRef}
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        if (!hoverCapable()) return;
        window.clearTimeout(timer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!hoverCapable()) return;
        timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
      }}
    >
      <button ref={buttonRef} type="button" className="nav-link mega-trigger" aria-expanded={open} aria-controls="mega-panel" onClick={() => setOpen((v) => !v)}>
        All tools
        <Icon name="chevron-down" size={15} className="mega-chevron" />
      </button>
      {open && (
        <div className="mega-panel" id="mega-panel" role="region" aria-label="All tools">
          <div className="container">
            <div className="mega-body">
              <div className="mega-rail" role="tablist" aria-label="Tool categories" aria-orientation="vertical" onKeyDown={onTabKeys}>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[c.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${c.id}`}
                    aria-selected={active === c.id}
                    aria-controls={panelId}
                    tabIndex={active === c.id ? 0 : -1}
                    className="mega-tab"
                    onClick={() => setActive(c.id)}
                    onMouseEnter={() => hoverCapable() && setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                  >
                    <span className={`tool-icon tool-icon-sm chip-${c.id}`} aria-hidden="true">
                      <Icon name={c.icon} size={16} />
                    </span>
                    <span className="mega-tab-text">
                      {c.name}
                      <small>{toolsInCategory(c.id).length} tools</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mega-content" role="tabpanel" id={panelId} aria-labelledby={`${baseId}-tab-${active}`}>
                <div className="mega-content-head">
                  <p>{cat.description}</p>
                  <Link to={categoryPath(cat.id)} className="mega-viewall" onClick={close}>
                    View all {toolsInCategory(cat.id).length} {cat.short.toLowerCase()} tools
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
                <div className="mega-groups">
                  {groupsInCategory(cat.id).map((g) => (
                    <section key={g.name} aria-label={g.name}>
                      <h2 className="mega-heading">{g.name}</h2>
                      <ul>
                        {toolsInGroup(cat.id, g.name).map((t) => (
                          <li key={t.slug}>
                            <Link to={toolPath(t)} className="mega-item" onClick={close}>
                              <ToolIcon tool={t} size="sm" />
                              <span>{t.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </div>
            <div className="mega-foot">
              <span>{tools.length} free tools. Files stay in your browser.</span>
              <Link to="/tools" onClick={close}>
                Browse all tools <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
