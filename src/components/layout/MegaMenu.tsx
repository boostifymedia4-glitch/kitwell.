import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, categoryPath, getCategory, groupsInCategory, toolPath, toolsInCategory, toolsInGroup, tools } from '@/tools/registry';
import { useLocalize } from '@/i18n/useLocalize';
import { useI18n, type MessageKey } from '@/i18n';
import type { CategoryId } from '@/tools/types';
import { Icon } from '../Icon';
import { CategoryIcon } from '../ui/CategoryIcon';
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
  // True while the menu was opened by hovering, so the click that usually follows keeps it open instead of closing it.
  const openedByHover = useRef(false);
  const { pathname } = useLocation();
  const baseId = useId();
  const { t } = useI18n();
  const loc = useLocalize();

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    openedByHover.current = false;
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

  const onTrigger = () => {
    if (open && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setOpen(!open);
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
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!hoverCapable()) return;
        timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
      }}
    >
      <button ref={buttonRef} type="button" className="nav-link mega-trigger" aria-expanded={open} aria-controls="mega-panel" onClick={onTrigger}>
        {t('nav.allTools')}
        <Icon name="chevron-down" size={15} className="mega-chevron" />
      </button>
      {open && (
        <div className="mega-panel" id="mega-panel" role="region" aria-label={t('nav.allTools')}>
          <div className="container">
            <div className="mega-body">
              <div className="mega-rail" role="tablist" aria-label={t('mega.categories')} aria-orientation="vertical" onKeyDown={onTabKeys}>
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
                    <CategoryIcon id={c.id} size="sm" />
                    <span className="mega-tab-text">
                      {t(`cat.${c.id}` as MessageKey)}
                      <small>{toolsInCategory(c.id).length}</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mega-content" role="tabpanel" id={panelId} aria-labelledby={`${baseId}-tab-${active}`}>
                <div className="mega-content-head">
                  <p>{t(`cat.${cat.id}.description`)}</p>
                  <Link to={categoryPath(cat.id)} className="mega-viewall" onClick={close}>
                    {t('mega.viewAll', { count: toolsInCategory(cat.id).length })}
                    <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
                <div className="mega-groups">
                  {groupsInCategory(cat.id).map((g) => (
                    <section key={g.name} aria-label={loc.group(g).name}>
                      <h2 className="mega-heading">{loc.group(g).name}</h2>
                      <ul>
                        {toolsInGroup(cat.id, g.name).map((tool) => (
                          <li key={tool.slug}>
                            <Link to={toolPath(tool)} className="mega-item" onClick={close}>
                              <ToolIcon tool={tool} size="sm" />
                              <span>{loc.tool(tool).name}</span>
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
              <span>{t('mega.foot', { count: tools.length })}</span>
              <Link to="/tools" onClick={close}>
                {t('mega.browse')} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
