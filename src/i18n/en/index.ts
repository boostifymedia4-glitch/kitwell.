/**
 * The English source catalog: every user-facing string of the site shell, shared components, pages, library
 * messages and tool interfaces, split into one file per area so that areas can be edited independently.
 * Tool content (names, descriptions, steps, FAQ, limits) lives in src/tools/data and is translated through
 * src/i18n/toolContent.ts.
 */
import { shell } from './shell';
import { ui } from './ui';
import { pages } from './pages';
import { help } from './help';
import { registry } from './registry';
import { blog } from './blog';
import { errors } from './errors';
import { toolsImageA } from './toolsImageA';
import { toolsImageB } from './toolsImageB';
import { toolsPdfA } from './toolsPdfA';
import { toolsPdfB } from './toolsPdfB';
import { toolsTextDev } from './toolsTextDev';

export const catalogFiles = { shell, ui, pages, help, registry, blog, errors, toolsImageA, toolsImageB, toolsPdfA, toolsPdfB, toolsTextDev } as const;

export const en: Record<string, string> = { ...shell, ...ui, ...pages, ...help, ...registry, ...blog, ...errors, ...toolsImageA, ...toolsImageB, ...toolsPdfA, ...toolsPdfB, ...toolsTextDev };

export type MessageKey = string;
export type Messages = Record<string, string>;
export type PartialMessages = Partial<Messages>;
