import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useI18n } from '.';

/**
 * Wraps content that exists only in English (tool names, tool pages, legal text) so that, while the site
 * is shown in another language, screen readers pronounce it as English and right-to-left layouts do not
 * scramble it. The wrapper is always rendered, so switching language never remounts the content.
 */
export function English({ children, as: Tag = 'div', style }: { children: ReactNode; as?: ElementType; style?: CSSProperties }) {
  const { lang } = useI18n();
  const foreign = lang.code !== 'en';
  return (
    <Tag lang={foreign ? 'en' : undefined} dir={foreign ? 'ltr' : undefined} style={{ display: 'contents', ...style }}>
      {children}
    </Tag>
  );
}
