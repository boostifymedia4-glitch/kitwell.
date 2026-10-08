import type { ToolDef } from '@/tools/types';
import { Icon } from '../Icon';

type Size = 'sm' | 'md' | 'lg';

const ICON_PX: Record<Size, number> = { sm: 16, md: 22, lg: 28 };

/**
 * The one icon treatment used everywhere a tool appears: a tinted square holding a line icon.
 * Conversion tools show their formats inside the square (JPG over PNG) instead of an icon, except
 * in the compact size used by menus and search, where the line icon is used.
 */
export function ToolIcon({ tool, size = 'md' }: { tool: Pick<ToolDef, 'icon' | 'category' | 'convert'>; size?: Size }) {
  return (
    <span className={`tool-icon tool-icon-${size} chip-${tool.category}`} aria-hidden="true">
      {tool.convert && size !== 'sm' ? (
        <span className="tool-icon-fmt">
          <b>{tool.convert[0]}</b>
          <Icon name="arrow-down" size={size === 'lg' ? 12 : 10} />
          <b>{tool.convert[1]}</b>
        </span>
      ) : (
        <Icon name={tool.icon} size={ICON_PX[size]} />
      )}
    </span>
  );
}
