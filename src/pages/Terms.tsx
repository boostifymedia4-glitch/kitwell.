import { LegalBody, LegalNotice, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['muted', 'legal.terms.effective'],
  ['h', 'legal.terms.s1.h'],
  ['p', 'legal.terms.s1.p'],
  ['h', 'legal.terms.s2.h'],
  ['p', 'legal.terms.s2.p'],
  ['h', 'legal.terms.s3.h'],
  ['p', 'legal.terms.s3.p'],
  ['h', 'legal.terms.s4.h'],
  ['p', 'legal.terms.s4.p'],
  ['h', 'legal.terms.s5.h'],
  ['p', 'legal.terms.s5.p'],
  ['h', 'legal.terms.s6.h'],
  ['p', 'legal.terms.s6.p'],
  ['h', 'legal.terms.s7.h'],
  ['p', 'legal.terms.s7.p'],
  ['h', 'legal.terms.s8.h'],
  ['p', 'legal.terms.s8.p'],
  ['h', 'legal.terms.s9.h'],
  ['p', 'legal.terms.s9.p'],
];

export default function Terms() {
  const { t } = useI18n();
  return (
    <PageShell path="/terms" title={t('legal.terms.title')} lead={t('legal.terms.lead', { site: site.name })}>
      <LegalNotice />
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
