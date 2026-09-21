import { Link } from 'react-router-dom';
import { breadcrumbsFor } from '@/pageMeta';
import { Icon } from '../Icon';

export function Breadcrumbs({ path }: { path: string }) {
  const crumbs = breadcrumbsFor(path);
  return (
    <nav aria-label="Breadcrumb">
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
