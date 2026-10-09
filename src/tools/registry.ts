import { site } from '@/config/site';
import { developerTools } from './data/developer';
import { imageTools } from './data/image';
import { pdfTools } from './data/pdf';
import { textTools } from './data/text';
import type { Category, CategoryId, ToolDef, ToolGroup } from './types';

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

/** Sections shown on category pages, in display order. Every tool's `group` must match one of these. */
export const groups: ToolGroup[] = [
  { category: 'image', name: 'Convert images', description: 'Switch between JPG, PNG and WebP, one file or a whole batch.' },
  { category: 'image', name: 'Optimize and edit', description: 'Shrink file size, resize, crop, rotate and flip photos with a live preview.' },
  { category: 'image', name: 'Create images', description: 'Make animated GIFs from your pictures.' },
  { category: 'image', name: 'Encode and inspect', description: 'Turn images into Base64, decode them back, pick exact colours or read QR codes.' },
  { category: 'pdf', name: 'Organize PDF', description: 'Combine, split, remove, rearrange and rotate pages.' },
  { category: 'pdf', name: 'Optimize PDF', description: 'Make a PDF smaller for email and uploads.' },
  { category: 'pdf', name: 'Edit PDF', description: 'Fill forms, add signatures, page numbers and watermarks, crop pages and edit document properties.' },
  { category: 'pdf', name: 'Secure PDF', description: 'Lock a PDF with a password, remove a password you know, or black out sensitive content.' },
  { category: 'pdf', name: 'Convert to PDF', description: 'Turn photos and screenshots into PDF documents.' },
  { category: 'pdf', name: 'Convert from PDF', description: 'Render PDF pages as images, copy out their text, or recognise text in scans.' },
  { category: 'pdf', name: 'View and inspect', description: 'Read a PDF privately, check its properties and compare two versions.' },
  { category: 'text', name: 'Analyze and compare', description: 'Count words and characters, or compare two versions of a text.' },
  { category: 'text', name: 'Clean up and format', description: 'Remove clutter and duplicate lines, change letter case and sort lines.' },
  { category: 'developer', name: 'JSON and XML', description: 'Format, validate and minify structured data.' },
  { category: 'developer', name: 'Encode and decode', description: 'Convert text for URLs, HTML and Base64.' },
  { category: 'developer', name: 'Test and generate', description: 'Try regular expressions, preview Markdown, and create passwords, UUIDs, timestamps and QR codes.' },
];

export const tools: ToolDef[] = [...imageTools, ...pdfTools, ...textTools, ...developerTools];

/** Curated, ordered tools shown per category in the All tools menu and on the homepage. */
const featuredSlugs: Record<CategoryId, string[]> = {
  image: ['jpg-to-png', 'png-to-jpg', 'svg-converter', 'image-compressor', 'image-resizer', 'photo-editor', 'gif-maker', 'blur-image-area'],
  pdf: ['merge-pdf', 'split-pdf', 'compress-pdf', 'sign-pdf', 'ocr-pdf', 'protect-pdf', 'redact-pdf', 'pdf-to-jpg'],
  text: ['word-counter', 'character-counter', 'case-converter', 'remove-duplicate-lines', 'text-sorter', 'text-cleaner', 'text-diff-checker'],
  developer: ['json-formatter', 'json-validator', 'base64-encoder-decoder', 'url-encoder-decoder', 'regex-tester', 'uuid-generator', 'password-generator', 'qr-code-generator'],
};

const bySlug = new Map(tools.map((t) => [t.slug, t]));
const catById = new Map(categories.map((c) => [c.id, c]));

export const getTool = (slug: string) => bySlug.get(slug);
export const getCategory = (id: string): Category | undefined => catById.get(id as CategoryId);
export const toolsInCategory = (id: CategoryId) => tools.filter((t) => t.category === id);
export const featuredTools = (id: CategoryId) =>
  featuredSlugs[id].map((s) => bySlug.get(s)).filter((t): t is ToolDef => Boolean(t));
export const groupsInCategory = (id: CategoryId) => groups.filter((g) => g.category === id);
export const toolsInGroup = (id: CategoryId, name: string) => tools.filter((t) => t.category === id && t.group === name);
export const groupId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** The most-used tools, spread across all four categories. Order is the display order. */
const popularSlugs = ['jpg-to-png', 'image-compressor', 'merge-pdf', 'split-pdf', 'pdf-to-jpg', 'json-formatter', 'word-counter', 'password-generator'];
const popularSet = new Set(popularSlugs);
export const popularTools = () => popularSlugs.map((s) => bySlug.get(s)).filter((t): t is ToolDef => Boolean(t));
/** A category's featured tools without the ones already shown in "Popular tools", so the homepage does not repeat cards. */
export const showcaseTools = (id: CategoryId) => featuredTools(id).filter((t) => !popularSet.has(t.slug));
export const relatedTools = (tool: ToolDef) =>
  tool.related.map((s) => bySlug.get(s)).filter((t): t is ToolDef => Boolean(t));

export const toolPath = (t: Pick<ToolDef, 'category' | 'slug'>) => `/tools/${t.category}/${t.slug}`;
export const categoryPath = (id: CategoryId) => `/tools/${id}`;

export function toolTitle(t: ToolDef) {
  return t.title ?? `${t.name} – Free Online Tool | ${site.name}`;
}

/** Ranked search across name, keywords, description, group and category. */
export function searchTools(query: string, limit = 8): ToolDef[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return tools
    .map((t) => {
      const name = t.name.toLowerCase();
      const cat = catById.get(t.category)?.name.toLowerCase() ?? '';
      const hay = `${name} ${t.keywords.join(' ')} ${t.description.toLowerCase()} ${t.group.toLowerCase()} ${cat} ${t.category}`;
      if (!words.every((w) => hay.includes(w))) return null;
      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 50;
      if (words.every((w) => name.includes(w))) score += 30;
      if (t.keywords.some((k) => k.includes(q))) score += 10;
      if (t.group.toLowerCase().includes(q)) score += 4;
      if (popularSet.has(t.slug)) score += 2;
      return { t, score };
    })
    .filter((x): x is { t: ToolDef; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}
