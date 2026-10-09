import { useEffect, useState } from 'react';
import { ErrorMessage, Notice, ProcessingState, RejectionList } from '@/components/tool/Feedback';
import { Field } from '@/components/tool/Fields';
import { FileList } from '@/components/tool/FileList';
import { PdfResult } from '@/components/tool/Results';
import { UploadDropzone } from '@/components/tool/UploadDropzone';
import { Icon } from '@/components/Icon';
import { baseName, errorMessage } from '@/lib/format';
import { useFileQueue, useTask } from '@/lib/hooks';
import { unlockPdf } from '@/lib/pdfEdit';
import { PDF_RULES } from '@/lib/usePdfFile';
import { useI18n } from '@/i18n';
import type { ToolImplementation } from '../../types';

type Outcome = { kind: 'unlocked'; blob: Blob } | { kind: 'needs-password' } | { kind: 'not-protected' };

const PdfUnlock: ToolImplementation = () => {
  const { t } = useI18n();
  const queue = useFileQueue(PDF_RULES, false);
  const file = queue.items[0]?.file ?? null;
  const task = useTask<Outcome>();
  const { run: runTask, reset: resetTask } = task;
  const [password, setPassword] = useState('');
  const [asksPassword, setAsksPassword] = useState(false);

  const attempt = (f: File, pw?: string) =>
    runTask(async () => {
      const res = await unlockPdf(new Uint8Array(await f.arrayBuffer()), pw);
      if (res.status === 'unlocked') return { kind: 'unlocked', blob: new Blob([res.bytes.buffer as ArrayBuffer], { type: 'application/pdf' }) };
      return { kind: res.status };
    });

  // As soon as a file is chosen, find out whether it needs a password.
  useEffect(() => {
    setPassword('');
    setAsksPassword(false);
    resetTask();
    if (file) void attempt(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (task.state.status === 'done' && task.state.result.kind === 'needs-password') setAsksPassword(true);
  }, [task.state]);

  const start = () => {
    queue.clear();
    resetTask();
  };

  const running = task.state.status === 'running';
  const result = task.state.status === 'done' ? task.state.result : null;

  return (
    <div className="stack">
      {!file && <UploadDropzone extensions={PDF_RULES.extensions} maxBytes={PDF_RULES.maxBytes} onFiles={queue.add} title={t('pdfUnlock.drop')} />}
      <RejectionList items={queue.rejections} onDismiss={queue.dismissRejections} />
      {file && <FileList items={queue.items} kind="pdf" onRemove={start} disabled={running} />}

      {file && running && <ProcessingState label={t('pdfUnlock.checking')} />}

      {file && asksPassword && result?.kind !== 'unlocked' && !running && (
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            if (password) void attempt(file, password);
          }}
        >
          <Notice>{t('pdfUnlock.protected')}</Notice>
          <Field label={t('pdfUnlock.password')}>
            {(id) => <input id={id} className="input" type="password" autoComplete="current-password" spellCheck={false} value={password} onChange={(e) => setPassword(e.target.value)} />}
          </Field>
          <div className="toolbar">
            <button type="submit" className="btn btn-primary btn-lg" disabled={!password}>
              <Icon name="lock-open" size={18} />
              {t('pdfUnlock.unlock')}
            </button>
          </div>
        </form>
      )}

      {task.state.status === 'error' && <ErrorMessage>{task.state.error ?? errorMessage(null)}</ErrorMessage>}
      {result?.kind === 'not-protected' && (
        <Notice tone="success">
          {t('pdfUnlock.notProtected')}{' '}
          <button type="button" className="btn btn-ghost btn-sm" onClick={start}>
            {t('pdfUnlock.chooseAnother')}
          </button>
        </Notice>
      )}
      {result?.kind === 'unlocked' && file && (
        <PdfResult blob={result.blob} name={`${baseName(file.name)}-unlocked.pdf`} onReset={start} title={t('pdfUnlock.ready')} />
      )}
      <p className="hint">{t('pdfUnlock.hint')}</p>
    </div>
  );
};

export default PdfUnlock;
