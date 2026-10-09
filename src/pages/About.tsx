import { Link } from 'react-router-dom';
import { PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';

export default function About() {
  const { t } = useI18n();
  const v = { site: site.name };
  return (
    <PageShell path="/about" title={t('about.title', v)} lead={t('about.lead')}>
      <h2>{t('about.what.h')}</h2>
      <p>{t('about.what.p', v)}</p>
      <h2>{t('about.how.h')}</h2>
      <p>{t('about.how.p')}</p>
      <h2>{t('about.not.h')}</h2>
      <ul>
        <li>{t('about.not.1')}</li>
        <li>{t('about.not.2')}</li>
        <li>{t('about.not.3')}</li>
      </ul>
      <h2>{t('about.who.h', v)}</h2>
      <p>
        <Placeholder>{t('about.who.placeholder')}</Placeholder>
      </p>
      <h2>{t('about.touch.h')}</h2>
      <p>
        <Rich
          text={t('about.touch.p')}
          tags={{ contact: (c) => <Link to="/contact">{c}</Link>, privacy: (c) => <Link to="/privacy">{c}</Link> }}
        />
      </p>
    </PageShell>
  );
}
