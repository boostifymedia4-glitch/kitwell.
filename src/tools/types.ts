import type { ComponentType } from 'react';

export type CategoryId = 'image' | 'pdf' | 'text' | 'developer';

export interface FaqItem {
  q: string;
  a: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** Short label used in navigation and cards. */
  short: string;
  icon: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

export interface ToolGroup {
  category: CategoryId;
  name: string;
  description: string;
}

export interface ToolDef {
  slug: string;
  category: CategoryId;
  name: string;
  /** One-sentence summary shown on cards and under the H1. */
  description: string;
  icon: string;
  /** Section of the category page this tool belongs to (must match a group in registry.ts). */
  group: string;
  /** For conversion tools: [from, to] format labels drawn inside the icon, e.g. ['JPG', 'PNG']. Decorative only. */
  convert?: [string, string];
  /** Overrides the generated <title>. */
  title?: string;
  /** Overrides the generated meta description. */
  metaDescription?: string;
  steps: string[];
  faq: FaqItem[];
  /** Honest notes about what the tool does not do. */
  limits: string[];
  related: string[];
  keywords: string[];
  /** Key into the lazy implementation map (src/tools/impl/index.ts). */
  impl: string;
  /** Extra per-tool settings consumed by the implementation. */
  config?: Record<string, string>;
  /** True when the tool handles user files (drives the privacy notice wording). */
  fileTool: boolean;
}

export type ToolImplementation = ComponentType<{ tool: ToolDef }>;
