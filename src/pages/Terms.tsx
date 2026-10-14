import { LegalBody, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['h', 'legal.terms.1.h'],
  ['p', 'legal.terms.1.p'],
  ['h', 'legal.terms.2.h'],
  ['p', 'legal.terms.2.p'],
  ['h', 'legal.terms.3.h'],
  ['p', 'legal.terms.3.p'],
  ['h', 'legal.terms.4.h'],
  ['p', 'legal.terms.4.p'],
  ['h', 'legal.terms.5.h'],
  ['p', 'legal.terms.5.p'],
  ['h', 'legal.terms.6.h'],
  ['p', 'legal.terms.6.p'],
];

export default function Terms() {
  const { t } = useI18n();
  return (
    <PageShell path="/terms" title={t('legal.terms.title')} lead={t('legal.terms.intro', { site: site.name })}>
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
