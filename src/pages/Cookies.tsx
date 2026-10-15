import { LegalBody, PageShell } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { LegalText, type LegalBlock } from './LegalText';

const blocks: LegalBlock[] = [
  ['h', 'legal.cookies.1.h'],
  ['p', 'legal.cookies.1.p'],
  ['h', 'legal.cookies.2.h'],
  ['p', 'legal.cookies.2.p'],
  ['h', 'legal.cookies.3.h'],
  ['p', 'legal.cookies.3.p'],
  ['h', 'legal.cookies.4.h'],
  ['p', 'legal.cookies.4.p'],
];

export default function Cookies() {
  const { t } = useI18n();
  return (
    <PageShell path="/cookies" title={t('legal.cookies.title')} lead={t('legal.cookies.intro', { site: site.name })}>
      <LegalBody>
        <LegalText blocks={blocks} />
      </LegalBody>
    </PageShell>
  );
}
