import type { CSSProperties } from 'react';
import type { CategoryId } from '@/tools/types';
import { CategoryArt, categoryColorOf } from './ToolArt';

type Size = 'sm' | 'md' | 'lg';

/**
 * The icon in front of a category heading (Image, PDF, Text and Developer Tools): the same colour illustration
 * style and tinted tile as the tool icons, in the category's own colour. Used by the homepage sections, the All
 * tools page, category pages and the menus, so a category looks the same everywhere.
 */
export function CategoryIcon({ id, size = 'md' }: { id: CategoryId; size?: Size }) {
  return (
    <span className={`tool-icon tool-icon-${size}`} style={{ '--art': categoryColorOf(id) } as CSSProperties} aria-hidden="true">
      <CategoryArt id={id} small={size === 'sm'} />
    </span>
  );
}
