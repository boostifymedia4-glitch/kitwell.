import { useState } from 'react';
import { ErrorMessage, Notice, ProcessingState } from '@/components/tool/Feedback';
import { CheckField, Field } from '@/components/tool/Fields';
import { PdfSource } from '@/components/tool/PdfSource';
import { PdfResult } from '@/components/tool/Results';
import { Icon } from '@/components/Icon';
import { baseName } from '@/lib/format';
import { PdfError } from '@/lib/pdfOps';
import { protectPdf } from '@/lib/pdfEdit';
import { usePdfTool } from '@/lib/usePdfFile';
import type { ToolImplementation } from '../../types';

const hintFor = (pw: string) => (pw.length === 0 ? 'Use at least 8 characters; longer is stronger.' : pw.length < 8 ? 'Short passwords are easy to guess. Aim for 12 or more.' : pw.length < 12 ? 'Fair. Twelve or more characters is better.' : 'Good length.');

const PdfProtect: ToolImplementation = () => {
  const { pdf, task, reset, running } = usePdfTool();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [allowCopying, setAllowCopying] = useState(true);
  const [allowModifying, setAllowModifying] = useState(false);

  const mismatch = confirm.length > 0 && confirm !== password;

  const clearAll = () => {
    setPassword('');
    setConfirm('');
    reset();
  };

  return (
    <PdfSource pdf={pdf}>
      {(ready) => {
        const run = () =>
          task.run(async () => {
            if (password !== confirm) throw new PdfError('The two passwords do not match.');
            const out = await protectPdf(ready.bytes, { userPassword: password, allowPrinting, allowCopying, allowModifying });
            return new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' });
          });

        return (
          <>
            <div className="options-grid">
              <Field label="Password" hint={hintFor(password)}>
                {(id) => (
                  <input id={id} className="input" type={show ? 'text' : 'password'} autoComplete="new-password" spellCheck={false} maxLength={127} value={password} onChange={(e) => setPassword(e.target.value)} />
                )}
              </Field>
              <Field label="Repeat password" hint={mismatch ? 'The passwords do not match.' : undefined}>
                {(id) => (
                  <input id={id} className="input" type={show ? 'text' : 'password'} autoComplete="new-password" spellCheck={false} maxLength={127} aria-invalid={mismatch} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                )}
              </Field>
            </div>
            <CheckField label="Show passwords" checked={show} onChange={setShow} />
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="label" style={{ marginBottom: 8 }}>
                Readers who open it may
              </legend>
              <div className="row" style={{ gap: 20 }}>
                <CheckField label="Print" checked={allowPrinting} onChange={setAllowPrinting} />
                <CheckField label="Copy text and images" checked={allowCopying} onChange={setAllowCopying} />
                <CheckField label="Edit and annotate" checked={allowModifying} onChange={setAllowModifying} />
              </div>
            </fieldset>
            <Notice tone="warn">
              If you forget this password, the file cannot be opened. Nothing is stored or sent anywhere, so there is no way to recover it. Keep your original PDF.
            </Notice>
            <div className="toolbar">
              <button type="button" className="btn btn-primary btn-lg" onClick={run} disabled={running || !password || !confirm}>
                <Icon name="lock" size={18} />
                Protect PDF
              </button>
            </div>
            {running && <ProcessingState label="Encrypting…" />}
            {task.state.status === 'error' && <ErrorMessage>{task.state.error}</ErrorMessage>}
            {task.state.status === 'done' && (
              <PdfResult blob={task.state.result} name={`${baseName(ready.file.name)}-protected.pdf`} onReset={clearAll} title="Your protected PDF is ready" note="AES-256 encrypted" />
            )}
          </>
        );
      }}
    </PdfSource>
  );
};

export default PdfProtect;
