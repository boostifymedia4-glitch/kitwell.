import { LegalBody, LegalNotice, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['muted', 'legal.privacy.effective'],
  ['h', 'legal.privacy.s1.h'],
  ['p', 'legal.privacy.s1.p'],
  ['h', 'legal.privacy.s2.h'],
  ['p', 'legal.privacy.s2.p1'],
  ['p', 'legal.privacy.s2.p2'],
  ['h', 'legal.privacy.s3.h'],
  ['ul', ['legal.privacy.s3.l1', 'legal.privacy.s3.l2', 'legal.privacy.s3.l3']],
  ['p', 'legal.privacy.s3.p'],
  ['h', 'legal.privacy.s4.h'],
  ['p', 'legal.privacy.s4.p'],
  ['h', 'legal.privacy.s5.h'],
  ['p', 'legal.privacy.s5.p'],
  ['h', 'legal.privacy.s6.h'],
  ['p', 'legal.privacy.s6.p'],
  ['h', 'legal.privacy.s7.h'],
  ['p', 'legal.privacy.s7.p'],
  ['h', 'legal.privacy.s8.h'],
  ['p', 'legal.privacy.s8.p'],
  ['h', 'legal.privacy.s9.h'],
  ['p', 'legal.privacy.s9.p'],
];

export default function Privacy() {
  const { t } = useI18n();
  return (
    <PageShell path="/privacy" title={t('legal.privacy.title')} lead={t('legal.privacy.lead', { site: site.name })}>
      <LegalNotice />
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
