import { site } from '@/config/site';
import { developerTools } from './data/developer';
import { imageTools } from './data/image';
import { pdfTools } from './data/pdf';
import { textTools } from './data/text';
import type { Category, CategoryId, ToolDef } from './types';

export const categories: Category[] = [
  {
    id: 'image',
    name: 'Image Tools',
    short: 'Image',
    icon: 'image',
    description: 'Convert, compress, resize, crop and inspect images.',
    metaTitle: `Free Online Image Tools – Convert, Compress, Resize | ${site.name}`,
    metaDescription:
      'Free online image tools: convert JPG, PNG and WebP, compress, resize, crop, rotate, flip, encode Base64 and pick colours. Processed in your browser.',
    intro:
      'Everyday image jobs, done in your browser. Convert between formats, shrink files for the web, resize and crop photos, or grab exact colours.',
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    short: 'PDF',
    icon: 'file-text',
    description: 'Merge, split, rotate, reorder and convert PDF files.',
    metaTitle: `Free Online PDF Tools – Merge, Split, Convert | ${site.name}`,
    metaDescription:
      'Free online PDF tools: merge, split, rotate, extract and reorder pages, convert images to PDF and PDF to JPG or PNG, and view metadata. Runs in your browser.',
    intro:
      'Work with PDFs without installing software. Combine and split documents, rearrange pages, and convert between PDF and images.',
  },
  {
    id: 'text',
    name: 'Text Tools',
    short: 'Text',
    icon: 'text',
    description: 'Count, clean, sort, convert and compare text.',
    metaTitle: `Free Online Text Tools – Word Counter, Case Converter | ${site.name}`,
    metaDescription:
      'Free online text tools: word and character counter, case converter, duplicate line remover, text sorter, cleaner and diff checker.',
    intro: 'Quick utilities for writers, students, editors and analysts: count, clean, sort, convert and compare text.',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    short: 'Developer',
    icon: 'terminal',
    description: 'Format JSON and XML, encode and decode, test regex, generate IDs.',
    metaTitle: `Free Online Developer Tools – JSON, XML, Regex | ${site.name}`,
    metaDescription:
      'Free online developer tools: JSON and XML formatters, URL, HTML and Base64 encoders, regex tester, Markdown previewer, and password, UUID and timestamp utilities.',
    intro: 'Small, dependable utilities for everyday development work. Nothing to install, and your data stays in the browser.',
  },
];

export const tools: ToolDef[] = [...imageTools, ...pdfTools, ...textTools, ...developerTools];

const bySlug = new Map(tools.map((t) => [t.slug, t]));
const catById = new Map(categories.map((c) => [c.id, c]));

export const getTool = (slug: string) => bySlug.get(slug);
export const getCategory = (id: string): Category | undefined => catById.get(id as CategoryId);
export const toolsInCategory = (id: CategoryId) => tools.filter((t) => t.category === id);
export const popularTools = () => tools.filter((t) => t.popular);
export const relatedTools = (tool: ToolDef) =>
  tool.related.map((s) => bySlug.get(s)).filter((t): t is ToolDef => Boolean(t));

export const toolPath = (t: Pick<ToolDef, 'category' | 'slug'>) => `/tools/${t.category}/${t.slug}`;
export const categoryPath = (id: CategoryId) => `/tools/${id}`;

export function toolTitle(t: ToolDef) {
  return t.title ?? `${t.name} – Free Online Tool | ${site.name}`;
}

/** Simple ranked search across name, keywords and description. */
export function searchTools(query: string, limit = 8): ToolDef[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return tools
    .map((t) => {
      const name = t.name.toLowerCase();
      const hay = `${name} ${t.keywords.join(' ')} ${t.description.toLowerCase()} ${t.category}`;
      if (!words.every((w) => hay.includes(w))) return null;
      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 50;
      if (name.includes(q)) score += 25;
      if (t.keywords.some((k) => k.includes(q))) score += 10;
      if (t.popular) score += 2;
      return { t, score };
    })
    .filter((x): x is { t: ToolDef; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}
