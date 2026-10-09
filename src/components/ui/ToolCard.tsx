import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useLocalize } from '@/i18n/useLocalize';
import { toolPath } from '@/tools/registry';
import type { ToolDef } from '@/tools/types';
import { ToolIcon } from './ToolIcon';

export type HeadingLevel = 'h2' | 'h3' | 'h4';

interface CardProps {
  tool: ToolDef;
  /** Heading level for the tool name, chosen to fit the page's outline. */
  as?: HeadingLevel;
  showCategory?: boolean;
}

export function ToolCard({ tool, as: H = 'h3', showCategory = false }: CardProps) {
  const { t } = useI18n();
  const x = useLocalize().tool(tool);
  return (
    <Link to={toolPath(tool)} className="card tool-card">
      <ToolIcon tool={tool} />
      <H className="tool-card-title">{x.name}</H>
      <p className="tool-card-desc">{x.description}</p>
      {showCategory && <span className="tool-card-meta">{t(`cat.${tool.category}`)}</span>}
    </Link>
  );
}

export function ToolGrid({ tools, headingLevel = 'h3', showCategory }: { tools: ToolDef[]; headingLevel?: HeadingLevel; showCategory?: boolean }) {
  return (
    <div className="grid grid-tools">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} as={headingLevel} showCategory={showCategory} />
      ))}
    </div>
  );
}
