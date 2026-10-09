import { Link } from 'react-router-dom';
import { Faq } from '@/components/ui/Faq';
import { PageShell } from '@/components/ui/PageShell';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';
import { buildHelpSections } from './helpData';

export default function Help() {
  const { t } = useI18n();
  const sections = buildHelpSections(t);
  return (
    <PageShell path="/help" title={t('help.title')} lead={t('help.lead')} wide>
      <nav className="help-jump" aria-label={t('help.topics')}>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
      <div className="help-sections">
        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="help-section">
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <Faq items={s.items} />
          </section>
        ))}
      </div>
      <p className="muted">
        <Rich
          text={t('help.more')}
          tags={{
            contact: (c) => <Link to="/contact">{c}</Link>,
            tools: (c) => <Link to="/tools">{c}</Link>,
            privacy: (c) => <Link to="/privacy">{c}</Link>,
          }}
        />
      </p>
    </PageShell>
  );
}
