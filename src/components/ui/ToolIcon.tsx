import type { CSSProperties } from 'react';
import type { ToolDef } from '@/tools/types';
import { ToolArt, artColorOf } from './ToolArt';

type Size = 'sm' | 'md' | 'lg';

/**
 * The one icon treatment used everywhere a tool appears (cards, menus, search, related tools, page headers): the
 * tool's colour-coded illustration from src/tools/toolArt.ts on a softly tinted tile. The compact size drops the
 * format tag, which would be unreadable at that size.
 */
export function ToolIcon({ tool, size = 'md' }: { tool: Pick<ToolDef, 'slug'>; size?: Size }) {
  return (
    <span className={`tool-icon tool-icon-${size}`} style={{ '--art': artColorOf(tool.slug) } as CSSProperties} aria-hidden="true">
      <ToolArt slug={tool.slug} small={size === 'sm'} />
    </span>
  );
}
