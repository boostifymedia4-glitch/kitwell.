import { Link } from 'react-router-dom';
import { getCategory, toolPath } from '@/tools/registry';
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
  return (
    <Link to={toolPath(tool)} className="card tool-card">
      <ToolIcon tool={tool} />
      <H className="tool-card-title">{tool.name}</H>
      <p className="tool-card-desc">{tool.description}</p>
      {showCategory && <span className="tool-card-meta">{getCategory(tool.category)?.name}</span>}
    </Link>
  );
}

export function ToolGrid({ tools, headingLevel = 'h3', showCategory }: { tools: ToolDef[]; headingLevel?: HeadingLevel; showCategory?: boolean }) {
  return (
    <div className="grid grid-tools">
      {tools.map((t) => (
        <ToolCard key={t.slug} tool={t} as={headingLevel} showCategory={showCategory} />
      ))}
    </div>
  );
}
