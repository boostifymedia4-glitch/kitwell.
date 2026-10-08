import { groupId, groupsInCategory, toolsInGroup } from '@/tools/registry';
import type { CategoryId } from '@/tools/types';
import { ToolGrid, type HeadingLevel } from './ToolCard';

/** A category's tools, split into titled sections with a short description each. */
export function GroupedTools({ category, groupLevel = 'h2', idPrefix = '' }: { category: CategoryId; groupLevel?: 'h2' | 'h3'; idPrefix?: string }) {
  const Title = groupLevel;
  const cardLevel: HeadingLevel = groupLevel === 'h2' ? 'h3' : 'h4';
  return (
    <>
      {groupsInCategory(category).map((g) => {
        const id = `${idPrefix}${groupId(g.name)}`;
        return (
          <section key={g.name} className="tool-group" id={id} aria-labelledby={`${id}-title`}>
            <header className="group-head">
              <Title id={`${id}-title`} className="group-title">
                {g.name}
              </Title>
              <p>{g.description}</p>
            </header>
            <ToolGrid tools={toolsInGroup(category, g.name)} headingLevel={cardLevel} />
          </section>
        );
      })}
    </>
  );
}
