import { useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage } from '@/components/tool/Feedback';
import { ClearButton, TextInput } from '@/components/tool/TextIO';
import { downloadText } from '@/lib/download';
import type { ToolImplementation } from '../../types';

const SAMPLE = `# Markdown preview

Write **bold**, *italic*, \`inline code\` and [links](https://example.com).

## A list
- First item
- Second item
  - Nested item

> Blockquotes work too.

| Tool | Runs in browser |
| ---- | --------------- |
| Markdown | Yes |

\`\`\`js
console.log('Hello');
\`\`\`
`;

interface Renderer {
  render: (md: string) => string;
}

/** The page already has an H1, so headings inside the preview are shown one level lower. */
function demoteHeadings(html: string): string {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  tpl.content.querySelectorAll('h1,h2,h3,h4,h5').forEach((h) => {
    const next = document.createElement(`h${Number(h.tagName[1]) + 1}`);
    next.innerHTML = h.innerHTML;
    h.replaceWith(next);
  });
  return tpl.innerHTML;
}

async function loadRenderer(): Promise<Renderer> {
  const [{ marked }, { default: DOMPurify }] = await Promise.all([import('marked'), import('dompurify')]);
  // Links from user content should never be able to access this page.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      node.setAttribute('rel', 'noopener noreferrer nofollow');
      node.setAttribute('target', '_blank');
    }
  });
  return {
    render: (md) => DOMPurify.sanitize(marked.parse(md, { async: false, gfm: true }) as string, { USE_PROFILES: { html: true } }),
  };
}

const MarkdownPreviewer: ToolImplementation = () => {
  const [text, setText] = useState(SAMPLE);
  const [renderer, setRenderer] = useState<Renderer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState('');
  const preview = useMemo(() => (html ? demoteHeadings(html) : ''), [html]);

  useEffect(() => {
    let cancelled = false;
    loadRenderer()
      .then((r) => !cancelled && setRenderer(r))
      .catch(() => !cancelled && setError('The Markdown engine could not be loaded. Check your connection and reload the page.'));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!renderer) return;
    const t = window.setTimeout(() => setHtml(renderer.render(text)), 120);
    return () => window.clearTimeout(t);
  }, [renderer, text]);

  return (
    <div className="stack">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="two-col">
        <TextInput label="Markdown" value={text} onChange={setText} rows={20} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
        <div className="field">
          <span className="label" id="md-preview-label">
            Preview
          </span>
          <div
            className="md-preview"
            role="region"
            aria-labelledby="md-preview-label"
            tabIndex={0}
            style={{ minHeight: 420 }}
            // Sanitized with DOMPurify in loadRenderer().
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
      <div className="toolbar">
        <CopyButton text={text} label="Copy Markdown" />
        <CopyButton text={html} label="Copy HTML" />
        <button type="button" className="btn btn-secondary btn-sm" disabled={!html} onClick={() => downloadText(html, 'preview.html', 'text/html')}>
          Download HTML
        </button>
      </div>
      <p className="hint">Remote images are not loaded in this preview. Links open in a new tab.</p>
    </div>
  );
};

export default MarkdownPreviewer;
