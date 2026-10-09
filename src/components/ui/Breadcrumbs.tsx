import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useLocalize } from '@/i18n/useLocalize';
import { breadcrumbsFor } from '@/pageMeta';
import { getCategory, getTool } from '@/tools/registry';
import { Icon } from '../Icon';

export function Breadcrumbs({ path }: { path: string }) {
  const { t } = useI18n();
  const loc = useLocalize();
  const crumbs = breadcrumbsFor(path).map((c) => {
    const parts = c.path.split('/').filter(Boolean);
    if (c.path === '/') return { ...c, name: t('crumb.home') };
    if (c.path === '/tools') return { ...c, name: t('crumb.tools') };
    if (parts[0] === 'tools' && parts.length === 2 && getCategory(parts[1])) return { ...c, name: t(`cat.${parts[1]}`) };
    if (parts[0] === 'tools' && parts.length === 3) {
      const tool = getTool(parts[2]);
      if (tool) return { ...c, name: loc.tool(tool).name };
    }
    return parts.length === 1 ? { ...c, name: t(`page.${parts[0]}.name`) } : c;
  });
  return (
    <nav aria-label={t('ui.breadcrumb')}>
      <ol className="breadcrumbs">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path}>
              {last ? <span aria-current="page">{c.name}</span> : <Link to={c.path}>{c.name}</Link>}
              {!last && <Icon name="chevron-right" size={14} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
