import { Accordion } from '@/components/ui/Accordion';
import { PageShell } from '@/components/ui/PageShell';
import { useI18n } from '@/i18n';
import { buildFaq } from './helpData';

export default function Help() {
  const { t } = useI18n();
  return (
    <PageShell path="/help" title={t('help.title')} lead={t('help.intro')}>
      <Accordion items={buildFaq(t)} />
    </PageShell>
  );
}
