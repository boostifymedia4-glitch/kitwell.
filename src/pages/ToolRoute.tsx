import { useLocation } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ToolPage } from '@/components/tool/ToolPage';
import { NOT_FOUND_META } from '@/pageMeta';
import { normalizePath } from '@/routes';
import { getTool } from '@/tools/registry';

export default function ToolRoute() {
  const path = normalizePath(useLocation().pathname);
  const tool = getTool(path.split('/')[3] ?? '');
  if (!tool) return <Seo {...NOT_FOUND_META} />;
  return <ToolPage tool={tool} />;
}
