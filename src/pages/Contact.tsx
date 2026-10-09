import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { ErrorMessage, Notice } from '@/components/tool/Feedback';
import { Field } from '@/components/tool/Fields';
import { PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';
import {
  CONTACT_LIMITS,
  CONTACT_TOPICS,
  contactConfigured,
  invalidContactFields,
  isRealEmail,
  sendContact,
  type ContactField,
  type ContactForm,
  type ContactResult,
} from '@/lib/contact';

const EMPTY: ContactForm = { name: '', email: '', topic: '', message: '', page: '' };
type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [website, setWebsite] = useState('');
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<ContactResult | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const summary = useRef<HTMLDivElement>(null);

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

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const problems = invalidContactFields(form);
    setInvalid(problems);
    if (problems.length) {
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setStatus('sending');
    setFailure(null);
    const result = await sendContact({ ...form, website });
    if (result === 'sent') {
      setStatus('sent');
      setForm(EMPTY);
    } else {
      setFailure(result);
      setStatus('failed');
      setTimeout(() => summary.current?.focus(), 0);
    }
  };

  const bad = (field: ContactField) => invalid.includes(field) || undefined;
  const errorText: Record<ContactField, string> = {
    name: t('contact.err.name'),
    email: t('contact.err.email'),
    topic: t('contact.err.topic'),
    message: t('contact.err.message', { min: CONTACT_LIMITS.minMessage, max: CONTACT_LIMITS.message }),
  };
  const failureText = (r: ContactResult) =>
    r === 'not_configured'
      ? t('contact.fail.notConfigured')
      : r === 'rate_limited'
        ? t('contact.fail.rate')
        : r === 'network'
          ? t('contact.fail.network')
          : t('contact.fail.delivery');

  return (
    <PageShell path="/contact" title={t('contact.title')} lead={t('contact.lead')} wide>
      <div className="contact-layout">
        <section className="card contact-card" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">{t('contact.form.h')}</h2>

          {configured === false && (
            <Notice tone="warn">
              <strong>{t('contact.unavailable.h')}</strong>
              <br />
              {t('contact.unavailable.p')}
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
                    <input id={id} className="input" value={form.name} maxLength={CONTACT_LIMITS.name} autoComplete="name" aria-invalid={bad('name')} onChange={(e) => set('name', e.target.value)} />
                  )}
                </Field>
                <Field label={t('contact.form.email')} hint={t('contact.form.emailHint')}>
                  {(id) => (
                    <input
                      id={id}
                      className="input"
                      type="email"
                      dir="ltr"
                      value={form.email}
                      maxLength={CONTACT_LIMITS.email}
                      autoComplete="email"
                      aria-invalid={bad('email')}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  )}
                </Field>
              </div>
              <div className="options-grid">
                <Field label={t('contact.form.topic')}>
                  {(id) => (
                    <select id={id} className="select" value={form.topic} aria-invalid={bad('topic')} onChange={(e) => set('topic', e.target.value as ContactForm['topic'])}>
                      <option value="">{t('contact.form.choose')}</option>
                      {CONTACT_TOPICS.map((k) => (
                        <option key={k} value={k}>
                          {t(`contact.form.topicOption.${k === 'other' ? 'misc' : k}`)}
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
                  <>
                    <textarea
                      id={id}
                      className="textarea prose-font"
                      rows={7}
                      value={form.message}
                      maxLength={CONTACT_LIMITS.message}
                      aria-invalid={bad('message')}
                      onChange={(e) => set('message', e.target.value)}
                    />
                    <span className="hint contact-counter" aria-hidden="true">
                      {t('contact.form.counter', { count: form.message.length, max: CONTACT_LIMITS.message })}
                    </span>
                  </>
                )}
              </Field>

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
              <p className="hint">
                <Rich text={t('contact.privacy')} tags={{ privacy: (c) => <Link to="/privacy">{c}</Link> }} />
              </p>
            </form>
          )}
        </section>

        <aside className="contact-side">
          <section className="card contact-card" aria-labelledby="contact-email">
            <h2 id="contact-email">{t('contact.email.h')}</h2>
            <p>
              {t('contact.email.p')}{' '}
              {isRealEmail(site.contactEmail) ? (
                <a href={`mailto:${site.contactEmail}`} dir="ltr">
                  {site.contactEmail}
                </a>
              ) : (
                <Placeholder>{t('contact.email.placeholder')}</Placeholder>
              )}
            </p>
          </section>
          <section className="card contact-card" aria-labelledby="contact-report">
            <h2 id="contact-report">{t('contact.report.h')}</h2>
            <p>{t('contact.report.intro')}</p>
            <ul className="limit-list">
              {[1, 2, 3, 4].map((n) => (
                <li key={n}>{t(`contact.report.${n}`)}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
