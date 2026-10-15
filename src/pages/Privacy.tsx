import { LegalBody, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['h', 'legal.privacy.1.h'],
  ['p', 'legal.privacy.1.p'],
  ['h', 'legal.privacy.2.h'],
  ['p', 'legal.privacy.2.p'],
  ['h', 'legal.privacy.3.h'],
  ['p', 'legal.privacy.3.p'],
  ['h', 'legal.privacy.4.h'],
  ['p', 'legal.privacy.4.p'],
  ['h', 'legal.privacy.5.h'],
  ['p', 'legal.privacy.5.p'],
  ['h', 'legal.privacy.6.h'],
  ['p', 'legal.privacy.6.p'],
];

export default function Privacy() {
  const { t } = useI18n();
  return (
    <PageShell path="/privacy" title={t('legal.privacy.title')} lead={t('legal.privacy.intro', { site: site.name })}>
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
