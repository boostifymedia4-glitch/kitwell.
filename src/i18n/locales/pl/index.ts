import type { PartialMessages } from '../../en';
import shell from './shell';
import ui from './ui';
import registry from './registry';
import pages from './pages';
import help from './help';
import legal from './legal';
import errors from './errors';
import toolsImageA from './toolsImageA';
import toolsImageB from './toolsImageB';
import toolsPdfA from './toolsPdfA';
import toolsPdfB from './toolsPdfB';
import toolsPdfC from './toolsPdfC';
import toolsTextDev from './toolsTextDev';
import blog from './blog';

export { default as tools } from './tools';

/** Everything translated for this language, merged. */
const messages: PartialMessages = { ...shell, ...ui, ...registry, ...pages, ...help, ...legal, ...errors, ...toolsImageA, ...toolsImageB, ...toolsPdfA, ...toolsPdfB, ...toolsPdfC, ...toolsTextDev, ...blog };
export default messages;
