/* global process, console */
/**
 * Decides whether a scheduled blog article has become due since the latest commit, which is what makes Vercel rebuild the site.
 * The articles are static, so a post with `publishAt` in the future is left out of the build (see scripts/build-blog.mjs). When
 * its moment passes, someone has to trigger a new build: the GitHub workflow .github/workflows/publish-scheduled.yml runs this
 * script every 15 minutes and, when it prints publish=true, pushes an empty commit, which Vercel turns into a deployment.
 *
 * "Due" means: publishAt is after the time of the newest commit (every earlier build already included it) and not after now.
 * If a run is delayed or skipped, the next run catches up, because the newest commit is still older than the post.
 *
 * Usage: node scripts/scheduled-publish.mjs        (writes publish=true|false and slugs=... to $GITHUB_OUTPUT when it is set)
 *        BLOG_NOW=2026-10-30T18:30:00+05:00 node scripts/scheduled-publish.mjs   (pretend it is that time)
 */
import { execSync } from 'node:child_process';
import { appendFileSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'content/blog';
const now = process.env.BLOG_NOW ? Date.parse(process.env.BLOG_NOW) : Date.now();
if (Number.isNaN(now)) throw new Error('BLOG_NOW is not a valid date');

const lastCommit = Date.parse(execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim());
if (Number.isNaN(lastCommit)) throw new Error('Could not read the time of the latest commit');

const scheduled = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
  const m = /^publishAt:\s*(.+)$/m.exec(readFileSync(join(dir, f), 'utf8'));
  if (m) scheduled.push({ slug: f.replace(/\.md$/, ''), at: Date.parse(m[1].trim()), raw: m[1].trim() });
}

const due = scheduled.filter((p) => p.at > lastCommit && p.at <= now);
const waiting = scheduled.filter((p) => p.at > now).sort((a, b) => a.at - b.at);

console.log(`Now: ${new Date(now).toISOString()}  newest commit: ${new Date(lastCommit).toISOString()}`);
console.log(`Scheduled articles: ${scheduled.length}, due now: ${due.length}, still waiting: ${waiting.length}`);
for (const p of due) console.log(`  due      ${p.raw}  ${p.slug}`);
if (waiting[0]) console.log(`  next     ${waiting[0].raw}  ${waiting[0].slug}`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `publish=${due.length > 0}\nslugs=${due.map((p) => p.slug).join(', ')}\n`);
}
