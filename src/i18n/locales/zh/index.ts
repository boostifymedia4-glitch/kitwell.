import type { PartialMessages } from '../../en';
import shell from './shell';
import ui from './ui';
import registry from './registry';
import pages from './pages';
import help from './help';
import blog from './blog';
import errors from './errors';
import toolsImageA from './toolsImageA';
import toolsImageB from './toolsImageB';
import toolsPdfA from './toolsPdfA';
import toolsPdfB from './toolsPdfB';
import toolsTextDev from './toolsTextDev';

export { default as tools } from './tools';

/** Everything translated for this language, merged. */
const messages: PartialMessages = { ...shell, ...ui, ...registry, ...pages, ...help, ...blog, ...errors, ...toolsImageA, ...toolsImageB, ...toolsPdfA, ...toolsPdfB, ...toolsTextDev };
export default messages;
