import { Link } from 'react-router-dom';
import { toolPath } from '@/tools/registry';
import type { ToolDef } from '@/tools/types';
import { Icon } from '../Icon';

type Heading = 'h2' | 'h3';

export function ToolCard({ tool, as: H = 'h3' }: { tool: ToolDef; as?: Heading }) {
  return (
    <Link to={toolPath(tool)} className="card tool-card">
      <span className={`chip chip-${tool.category}`}>
        <Icon name={tool.icon} size={20} />
      </span>
      <span>
        <H>{tool.name}</H>
        <p>{tool.description}</p>
      </span>
    </Link>
  );
}

export function ToolGrid({ tools, headingLevel = 'h3' }: { tools: ToolDef[]; headingLevel?: Heading }) {
  return (
    <div className="grid grid-tools">
      {tools.map((t) => (
        <ToolCard key={t.slug} tool={t} as={headingLevel} />
      ))}
    </div>
  );
}
