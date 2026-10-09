import { useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@/components/tool/CopyButton';
import { ErrorMessage } from '@/components/tool/Feedback';
import { ClearButton, TextInput } from '@/components/tool/TextIO';
import { useI18n } from '@/i18n';
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
  const { t } = useI18n();
  const [text, setText] = useState(SAMPLE);
  const [renderer, setRenderer] = useState<Renderer | null>(null);
  const [error, setError] = useState(false);
  const [html, setHtml] = useState('');
  const preview = useMemo(() => (html ? demoteHeadings(html) : ''), [html]);

  useEffect(() => {
    let cancelled = false;
    loadRenderer()
      .then((r) => !cancelled && setRenderer(r))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!renderer) return;
    const timer = window.setTimeout(() => setHtml(renderer.render(text)), 120);
    return () => window.clearTimeout(timer);
  }, [renderer, text]);

  return (
    <div className="stack">
      {error && <ErrorMessage>{t('markdownPreviewer.loadError')}</ErrorMessage>}
      <div className="two-col">
        <TextInput label={t('markdownPreviewer.markdown')} value={text} onChange={setText} rows={20} actions={<ClearButton onClick={() => setText('')} disabled={!text} />} />
        <div className="field">
          <span className="label" id="md-preview-label">
            {t('markdownPreviewer.preview')}
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
        <CopyButton text={text} label={t('markdownPreviewer.copyMarkdown')} />
        <CopyButton text={html} label={t('markdownPreviewer.copyHtml')} />
        <button type="button" className="btn btn-secondary btn-sm" disabled={!html} onClick={() => downloadText(html, 'preview.html', 'text/html')}>
          {t('markdownPreviewer.downloadHtml')}
        </button>
      </div>
      <p className="hint">{t('markdownPreviewer.note')}</p>
    </div>
  );
};

export default MarkdownPreviewer;
