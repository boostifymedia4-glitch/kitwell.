import { site } from '@/config/site';
import { useI18n } from '@/i18n';

/**
 * Reserved, clearly labelled advertising placement. Renders nothing until ads are enabled in
 * config/site.ts, so there is no empty box or layout cost before launch. Keep slots away from
 * tool controls and download buttons.
 */
export function AdSlot({ id }: { id: string }) {
  const { t } = useI18n();
  if (!site.ads.enabled) return null;
  return <aside className="ad-slot" data-ad-slot={id} aria-label={t('ui.advertisement')} />;
}
