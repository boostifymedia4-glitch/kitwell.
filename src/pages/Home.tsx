import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { AdSlot } from '@/components/ui/AdSlot';
import { Faq } from '@/components/ui/Faq';
import { ToolGrid } from '@/components/ui/ToolCard';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { site } from '@/config/site';
import { getPageMeta } from '@/pageMeta';
import { categories, categoryPath, getTool, showcaseTools, popularTools, toolPath, toolsInCategory, tools } from '@/tools/registry';

const SHORTCUTS = ['jpg-to-png', 'image-compressor', 'merge-pdf', 'pdf-to-jpg', 'json-formatter', 'word-counter']
  .map(getTool)
  .filter((t) => t !== undefined);

const TRUST = [
  { icon: 'shield', title: 'Processed in your browser', text: 'Files are opened, converted and saved by your own browser. Our tools do not upload them to a server.' },
  { icon: 'lock', title: 'No account, no watermark', text: 'Use any tool immediately. There is nothing to sign up for and nothing is added to your output.' },
  { icon: 'info', title: 'Honest about limits', text: 'Every tool page lists the formats and sizes it supports, and what it cannot do, before you start.' },
];

const FAQ = [
  { q: 'Are the tools really free?', a: `Yes. There is no sign-up and no per-use fee. ${site.name} may be supported by advertising in future; ads will always be labelled and kept away from tool controls and download buttons.` },
  { q: 'Are my files uploaded?', a: 'No. Image, PDF, text and developer tools run in your browser using JavaScript. Files are read locally and results are created locally. See the Privacy Policy for details.' },
  { q: 'Which browsers work best?', a: 'Current versions of Chrome, Edge, Firefox and Safari. A few features, such as saving WebP images, depend on what your browser supports; the tool will tell you if something is unavailable.' },
  { q: 'Is there a file size limit?', a: 'Because work happens on your device, limits depend on your memory. Each tool sets a sensible cap (for example 25 MB per image and 100 MB per PDF) and shows it before you upload.' },
];

export default function Home() {
  const meta = getPageMeta('/');
  return (
    <>
      {meta && <Seo {...meta} />}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title">Everyday tools for files, PDFs, text and code</h1>
          <p className="lead">
            Free browser-based tools for everyday file, PDF, text and developer tasks. {tools.length} tools, no sign-up, nothing to install.
          </p>
          <ToolSearch variant="hero" />
          <ul className="shortcuts" aria-label="Popular tools">
            {SHORTCUTS.map((t) => (
              <li key={t.slug}>
                <Link to={toolPath(t)} className="shortcut">
                  <ToolIcon tool={t} size="sm" />
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container">
        <section className="section" aria-labelledby="popular">
          <div className="section-head">
            <div>
              <h2 id="popular">Popular tools</h2>
              <p>The tools people reach for most.</p>
            </div>
            <Link to="/tools" className="btn btn-secondary btn-sm">
              All {tools.length} tools <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          <ToolGrid tools={popularTools()} showCategory />
        </section>

        {categories.map((c) => (
          <section key={c.id} className="section" aria-labelledby={`home-${c.id}`}>
            <div className="section-head">
              <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <span className={`tool-icon tool-icon-md chip-${c.id}`} aria-hidden="true">
                  <Icon name={c.icon} size={22} />
                </span>
                <div>
                  <h2 id={`home-${c.id}`}>{c.name}</h2>
                  <p>{c.description}</p>
                </div>
              </div>
              <Link to={categoryPath(c.id)} className="btn btn-secondary btn-sm">
                View all {toolsInCategory(c.id).length} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <ToolGrid tools={showcaseTools(c.id)} />
          </section>
        ))}

        <AdSlot id="home-mid" />

        <section className="section" aria-labelledby="privacy">
          <div className="section-head">
            <div>
              <h2 id="privacy">Built around your privacy</h2>
              <p>Most online converters upload your files. These don’t need to.</p>
            </div>
          </div>
          <div className="trust-grid">
            {TRUST.map((t) => (
              <div key={t.title} className="card trust-item">
                <span className="tool-icon tool-icon-md chip-image" aria-hidden="true">
                  <Icon name={t.icon} size={22} />
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="faq">
          <div className="section-head">
            <h2 id="faq">Questions, answered</h2>
          </div>
          <Faq items={FAQ} />
        </section>
      </div>
    </>
  );
}
