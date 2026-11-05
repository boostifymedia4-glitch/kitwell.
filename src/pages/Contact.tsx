import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from '@/i18n/Link';
import { Icon } from '@/components/Icon';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { Field } from '@/components/tool/Fields';
import { PageShell } from '@/components/ui/PageShell';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';
import { formatBytes } from '@/lib/format';
import {
  ATTACHMENT_RULES,
  CONTACT_LIMITS,
  CONTACT_TOPICS,
  checkAttachment,
  contactConfigured,
  invalidContactFields,
  readBase64,
  sendContact,
  type AttachmentProblem,
  type ContactField,
  type ContactForm,
  type ContactResult,
} from '@/lib/contact';

const EMPTY: ContactForm = { name: '', email: '', topic: '', message: '', page: '', agree: false };
type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [website, setWebsite] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileProblem, setFileProblem] = useState<AttachmentProblem | null>(null);
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<ContactResult | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let live = true;
    void contactConfigured().then((value) => live && setConfigured(value));
    return () => {
      live = false;
    };
  }, []);

  const set = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (invalid.length) setInvalid((list) => list.filter((k) => k !== key));
  };

  const choose = (picked: File | undefined) => {
    if (!picked) return;
    const problem = checkAttachment(picked);
    setFileProblem(problem);
    setFile(problem ? null : picked);
  };
  const removeFile = () => {
    setFile(null);
    setFileProblem(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const problems = invalidContactFields(form);
    setInvalid(problems);
    if (problems.length) {
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    // While the form is still being built, nothing is sent and nothing is stored.
    if (configured === false) {
      setFailure('not_configured');
      setStatus('failed');
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setStatus('sending');
    setFailure(null);
    let attachment: { name: string; data: string } | undefined;
    if (file) {
      try {
        attachment = { name: file.name, data: await readBase64(file) };
      } catch {
        setFailure('invalid');
        setStatus('failed');
        return;
      }
    }
    const result = await sendContact({ ...form, website, attachment });
    if (result === 'sent') {
      setStatus('sent');
      setForm(EMPTY);
      removeFile();
    } else {
      setFailure(result);
      setStatus('failed');
      setTimeout(() => summary.current?.focus(), 0);
    }
  };

  const bad = (field: ContactField) => invalid.includes(field) || undefined;
  const tooLong = form.message.trim().length > CONTACT_LIMITS.message;
  const errorText: Record<ContactField, string> = {
    name: t('contact.err.name'),
    email: t('contact.err.email'),
    topic: t('contact.err.subject'),
    message: tooLong ? t('contact.err.messageLong') : t('contact.err.messageMin', { min: CONTACT_LIMITS.minMessage }),
    agree: t('contact.err.agree'),
  };
  const failureText = (r: ContactResult) =>
    r === 'not_configured'
      ? t('contact.fail.soon')
      : r === 'rate_limited'
        ? t('contact.fail.rate')
        : r === 'network'
          ? t('contact.fail.network')
          : r === 'invalid'
            ? t('contact.fail.invalid')
            : t('contact.fail.delivery');
  const fileText: Record<AttachmentProblem, string> = {
    type: t('contact.attach.errType'),
    size: t('contact.attach.errSize', { size: formatBytes(ATTACHMENT_RULES.maxBytes) }),
    empty: t('contact.attach.errEmpty'),
  };

  return (
    <PageShell path="/contact" title={t('contact.title')} lead={t('contact.lead')} wide>
      <div className="contact-layout">
        <section className="card contact-card" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">{t('contact.form.h')}</h2>

          {configured === false && (
            <Notice tone="info">
              <strong>{t('contact.notice.h')}</strong>
              <br />
              {t('contact.notice.p')}
            </Notice>
          )}

          {status === 'sent' ? (
            <div className="contact-success" role="status">
              <span className="contact-success-icon" aria-hidden="true">
                <Icon name="check-circle" size={28} />
              </span>
              <h3>{t('contact.sent.h')}</h3>
              <p>{t('contact.sent.p')}</p>
              <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
                {t('contact.sent.another')}
              </button>
            </div>
          ) : (
            <form className="stack" onSubmit={submit} noValidate>
              <div ref={summary} tabIndex={-1} className="contact-summary">
                {invalid.length > 0 && (
                  <ErrorMessage>
                    <strong>{t('contact.err.summary')}</strong>
                    <ul style={{ paddingInlineStart: 18, marginTop: 4 }}>
                      {invalid.map((f) => (
                        <li key={f}>{errorText[f]}</li>
                      ))}
                    </ul>
                  </ErrorMessage>
                )}
                {status === 'failed' && failure && <ErrorMessage>{failureText(failure)}</ErrorMessage>}
              </div>

              <div className="options-grid">
                <Field label={t('contact.form.name')}>
                  {(id) => (
                    <input id={id} className="input" value={form.name} maxLength={CONTACT_LIMITS.name} autoComplete="name" placeholder={t('contact.form.namePlaceholder')} aria-invalid={bad('name')} onChange={(e) => set('name', e.target.value)} />
                  )}
                </Field>
                <Field label={t('contact.form.email')}>
                  {(id) => (
                    <input
                      id={id}
                      className="input"
                      type="email"
                      dir="ltr"
                      value={form.email}
                      maxLength={CONTACT_LIMITS.email}
                      autoComplete="email"
                      placeholder={t('contact.form.emailPlaceholder')}
                      aria-invalid={bad('email')}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  )}
                </Field>
              </div>
              <div className="options-grid">
                <Field label={t('contact.form.subject')}>
                  {(id) => (
                    <select id={id} className="select" value={form.topic} aria-invalid={bad('topic')} onChange={(e) => set('topic', e.target.value as ContactForm['topic'])}>
                      <option value="">{t('contact.form.chooseSubject')}</option>
                      {CONTACT_TOPICS.map((k) => (
                        <option key={k} value={k}>
                          {t(`contact.form.topicOption.${k === 'tool-error' ? 'toolError' : k === 'suggestion' ? 'feature' : k === 'other' ? 'misc' : k}`)}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field label={t('contact.form.page')}>
                  {(id) => (
                    <input id={id} className="input" value={form.page} maxLength={CONTACT_LIMITS.page} placeholder={t('contact.form.pagePlaceholder')} onChange={(e) => set('page', e.target.value)} />
                  )}
                </Field>
              </div>
              <Field label={t('contact.form.message')} hint={t('contact.form.messageHint', { min: CONTACT_LIMITS.minMessage })}>
                {(id) => (
                  <textarea
                    id={id}
                    className="textarea prose-font"
                    rows={7}
                    value={form.message}
                    aria-invalid={bad('message')}
                    placeholder={t('contact.form.messagePlaceholder')}
                    onChange={(e) => set('message', e.target.value)}
                  />
                )}
              </Field>

              <div className="field">
                <span className="label" id="contact-attach-label">
                  {t('contact.attach.label')}
                </span>
                <div className="attach">
                  <button type="button" className="btn btn-secondary" onClick={() => fileInput.current?.click()} aria-describedby="contact-attach-hint">
                    <Icon name="paperclip" size={16} />
                    {t('contact.attach.button')}
                  </button>
                  <input
                    ref={fileInput}
                    type="file"
                    hidden
                    tabIndex={-1}
                    aria-labelledby="contact-attach-label"
                    accept={ATTACHMENT_RULES.extensions.map((x) => `.${x}`).join(',')}
                    onChange={(e) => choose(e.target.files?.[0])}
                  />
                  <span className="hint" id="contact-attach-hint">
                    {t('contact.attach.hint', { size: formatBytes(ATTACHMENT_RULES.maxBytes) })}
                  </span>
                </div>
                {file && (
                  <div className="attach-chip">
                    <Icon name="file-text" size={18} />
                    <span className="attach-name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="attach-size">{formatBytes(file.size)}</span>
                    <button type="button" className="icon-btn" aria-label={t('contact.attach.remove', { name: file.name })} onClick={removeFile}>
                      <Icon name="x" size={16} />
                    </button>
                  </div>
                )}
                {fileProblem && (
                  <p className="field-error" role="alert">
                    {fileText[fileProblem]}
                  </p>
                )}
              </div>

              <label className="check contact-agree" data-invalid={bad('agree')}>
                <input type="checkbox" checked={form.agree} aria-invalid={bad('agree')} onChange={(e) => set('agree', e.target.checked)} />
                <span>
                  <Rich
                    text={t('contact.agree')}
                    tags={{ terms: (c) => <Link to="/terms">{c}</Link>, privacy: (c) => <Link to="/privacy">{c}</Link> }}
                  />
                </span>
              </label>

              {/* Hidden from people; automated form fillers tend to complete it. */}
              <div className="contact-trap" aria-hidden="true">
                <label>
                  {t('contact.form.honeypot')}
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>

              <div className="toolbar">
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  {status === 'sending' ? <span className="spinner" aria-hidden="true" /> : <Icon name="mail" size={16} />}
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </PageShell>
  );
}
