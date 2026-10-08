import type { ToolDef } from '@/tools/types';
import { Icon } from '../Icon';

type Size = 'sm' | 'md' | 'lg';

const ICON_PX: Record<Size, number> = { sm: 16, md: 22, lg: 28 };

/** The one icon treatment used everywhere a tool appears: tinted square, line icon, optional format badge. */
export function ToolIcon({ tool, size = 'md' }: { tool: Pick<ToolDef, 'icon' | 'category' | 'badge'>; size?: Size }) {
  return (
    <span className={`tool-icon tool-icon-${size} chip-${tool.category}`} aria-hidden="true">
      <Icon name={tool.icon} size={ICON_PX[size]} />
      {tool.badge && size !== 'sm' && <span className="tool-icon-badge">{tool.badge}</span>}
    </span>
  );
}
