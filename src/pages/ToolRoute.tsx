import { usePath } from '@/i18n/routing';
import { Seo } from '@/components/Seo';
import { ToolPage } from '@/components/tool/ToolPage';
import { useNotFoundMeta } from '@/i18n/usePageMeta';
import { normalizePath } from '@/routes';
import { getTool } from '@/tools/registry';

export default function ToolRoute() {
  const path = normalizePath(usePath());
  const notFound = useNotFoundMeta();
  const tool = getTool(path.split('/')[3] ?? '');
  if (!tool) return <Seo {...notFound} />;
  return <ToolPage tool={tool} />;
}
