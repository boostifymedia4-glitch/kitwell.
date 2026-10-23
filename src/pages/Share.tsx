import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { PageShell } from '@/components/ui/PageShell';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { fetchShare, type ShareInfo } from '@/lib/share';

type State = { kind: 'loading' } | { kind: 'ready'; info: ShareInfo } | { kind: 'missing' } | { kind: 'error' } | { kind: 'noId' };

/** Download page of a temporary share link: /share?id=... (not listed in the sitemap, never indexed). */
export default function Share() {
  const { t, lang } = useI18n();
  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return setState({ kind: 'noId' });
    let live = true;
    fetchShare(id)
      .then((info) => live && setState(info ? { kind: 'ready', info } : { kind: 'missing' }))
      .catch(() => live && setState({ kind: 'error' }));
    return () => {
      live = false;
    };
  }, []);

  return (
    <PageShell path="/share" title={t('share.page.title')}>
      {state.kind === 'loading' && <ProcessingState label={t('share.page.loading')} />}
      {state.kind === 'noId' && <Notice tone="warn">{t('share.page.noId')}</Notice>}
      {state.kind === 'missing' && <Notice tone="warn">{t('share.page.notFound')}</Notice>}
      {state.kind === 'error' && <ErrorMessage>{t('share.page.error')}</ErrorMessage>}
      {state.kind === 'ready' && (
        <div className="stack">
          <p className="muted">{t('share.page.info', { size: formatBytes(state.info.size), time: new Intl.DateTimeFormat(lang.code, { dateStyle: 'medium', timeStyle: 'short' }).format(state.info.expiresAt) })}</p>
          <div className="toolbar">
            <a className="btn btn-primary btn-lg" href={state.info.url} download={state.info.name} rel="noopener noreferrer">
              <Icon name="download" size={18} />
              {t('share.page.download', { name: state.info.name })}
            </a>
          </div>
          <p className="hint">{t('share.page.note')}</p>
        </div>
      )}
    </PageShell>
  );
}
