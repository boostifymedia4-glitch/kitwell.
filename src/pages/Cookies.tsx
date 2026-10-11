import { LegalBody, LegalNotice, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['h', 'legal.cookies.s1.h'],
  ['p', 'legal.cookies.s1.p1'],
  ['p', 'legal.cookies.s1.p2'],
  ['h', 'legal.cookies.s2.h'],
  ['p', 'legal.cookies.s2.p'],
  ['ul', ['legal.cookies.s2.l1', 'legal.cookies.s2.l2', 'legal.cookies.s2.l3']],
  ['muted', 'legal.cookies.s2.n'],
  ['h', 'legal.cookies.s3.h'],
  ['p', 'legal.cookies.s3.p'],
];

export default function Cookies() {
  const { t } = useI18n();
  return (
    <PageShell path="/cookies" title={t('legal.cookies.title')} lead={t('legal.cookies.lead', { site: site.name })}>
      <LegalNotice />
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
