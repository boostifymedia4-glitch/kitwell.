import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, categoryPath, featuredTools, toolPath, toolsInCategory, tools } from '@/tools/registry';
import { Icon } from '../Icon';
import { ToolIcon } from '../ui/ToolIcon';

const CLOSE_DELAY_MS = 180;

/**
 * The "All tools" menu. Opens on click or keyboard, and on hover for mouse users.
 * Lists the featured tools of every category plus a "View all" link, using the live tool registry.
 */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>(0);
  const { pathname } = useLocation();

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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      close();
      buttonRef.current?.focus();
    }
  };

  const hoverCapable = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
            <div className="mega-grid">
              {categories.map((c) => (
                <section key={c.id} className="mega-col" aria-labelledby={`mega-${c.id}`}>
                  <h2 className="mega-heading" id={`mega-${c.id}`}>
                    <Link to={categoryPath(c.id)} onClick={close}>
                      {c.name}
                    </Link>
                  </h2>
                  <ul>
                    {featuredTools(c.id).map((t) => (
                      <li key={t.slug}>
                        <Link to={toolPath(t)} className="mega-item" onClick={close}>
                          <ToolIcon tool={t} size="sm" />
                          <span>{t.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={categoryPath(c.id)} className="mega-viewall" onClick={close}>
                    View all {toolsInCategory(c.id).length} {c.short.toLowerCase()} tools
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </section>
              ))}
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
