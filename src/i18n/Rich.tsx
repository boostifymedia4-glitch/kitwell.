import { Fragment, type ReactNode } from 'react';

type Tags = Record<string, (children: ReactNode) => ReactNode>;

const TAG = /<([\w-]+)>([\s\S]*?)<\/\1>/g;

/**
 * Renders a translated sentence that contains simple markup such as `See the <contact>contact page</contact>`.
 * Each tag name maps to a function that wraps the text (a link, <strong>, <em>). Unknown tags keep their text.
 * Translators keep the tags and translate the words between them.
 */
export function Rich({ text, tags = {}, resolve }: { text: string; tags?: Tags; resolve?: (tag: string) => Tags[string] | undefined }) {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(TAG)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const wrap = tags[m[1]] ?? resolve?.(m[1]);
    out.push(<Fragment key={n++}>{wrap ? wrap(<Rich text={m[2]} tags={tags} resolve={resolve} />) : m[2]}</Fragment>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export const strong = (c: ReactNode) => <strong>{c}</strong>;
export const em = (c: ReactNode) => <em>{c}</em>;
