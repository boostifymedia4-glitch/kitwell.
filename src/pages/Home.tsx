import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Seo } from '@/components/Seo';
import { AdSlot } from '@/components/ui/AdSlot';
import { Faq } from '@/components/ui/Faq';
import { ToolGrid } from '@/components/ui/ToolCard';
import { ToolSearch } from '@/components/ui/ToolSearch';
import { site } from '@/config/site';
import { getPageMeta } from '@/pageMeta';
import { categories, categoryPath, getTool, popularTools, toolPath, toolsInCategory, tools } from '@/tools/registry';

const QUICK = ['jpg-to-png', 'image-compressor', 'merge-pdf', 'pdf-to-jpg', 'json-formatter', 'word-counter']
  .map(getTool)
  .filter((t) => t !== undefined);

const TRUST = [
  { icon: 'shield', title: 'Processed in your browser', text: 'Files are opened, converted and saved by your own browser. Our tools do not upload them to a server.' },
  { icon: 'lock', title: 'No account, no watermark', text: 'Use any tool immediately. There is nothing to sign up for and nothing is added to your output.' },
  { icon: 'info', title: 'Honest about limits', text: 'Every tool page lists the formats and sizes it supports, and what it cannot do, before you start.' },
];

const STEPS = [
  { title: 'Pick a tool', text: 'Search by task or browse the four categories.' },
  { title: 'Add your file or text', text: 'Drag it in, choose it from your device, or paste it.' },
  { title: 'Download the result', text: 'Preview the outcome, then save it. Start over any time.' },
];

const FAQ = [
  { q: 'Are the tools really free?', a: `Yes. There is no sign-up and no per-use fee. ${site.name} may be supported by advertising in future; ads will always be labelled and kept away from tool controls and download buttons.` },
  { q: 'Are my files uploaded?', a: 'No. Image, PDF, text and developer tools run in your browser using JavaScript. Files are read locally and results are created locally. See the Privacy Policy for details.' },
  { q: 'Which browsers work best?', a: 'Current versions of Chrome, Edge, Firefox and Safari. A few features, such as saving WebP images, depend on what your browser supports; the tool will tell you if something is unavailable.' },
  { q: 'Is there a file size limit?', a: 'Because work happens on your device, limits depend on your memory. Each tool sets a sensible cap (for example 25 MB per image and 100 MB per PDF) and shows it before you upload.' },
];

export default function Home() {
  const meta = getPageMeta('/');
  const popular = popularTools().slice(0, 9);
  return (
    <>
      {meta && <Seo {...meta} />}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <h1 id="hero-title">Everyday tools for files, PDFs, text and code</h1>
          <p className="lead">
            Convert and compress images, merge and split PDFs, format JSON and clean up text. {tools.length} free tools that run in your browser, with no sign-up.
          </p>
          <ToolSearch variant="hero" />
          <div className="hero-quick" aria-label="Popular tools">
            {QUICK.map((t) => (
              <Link key={t.slug} to={toolPath(t)} className="pill">
                <Icon name={t.icon} size={15} />
                {t.name}
              </Link>
            ))}
          </div>
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
          <ToolGrid tools={popular} />
        </section>

        <section className="section" aria-labelledby="categories">
          <div className="section-head">
            <div>
              <h2 id="categories">Browse by category</h2>
              <p>Four focused toolkits, each with a full set of related tools.</p>
            </div>
          </div>
          <div className="grid grid-cats">
            {categories.map((c) => (
              <Link key={c.id} to={categoryPath(c.id)} className="card cat-card">
                <span className={`chip chip-${c.id}`}>
                  <Icon name={c.icon} size={20} />
                </span>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="count">{toolsInCategory(c.id).length} tools</span>
              </Link>
            ))}
          </div>
        </section>

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
                <span className="chip chip-image">
                  <Icon name={t.icon} size={20} />
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="how">
          <div className="section-head">
            <h2 id="how">How it works</h2>
          </div>
          <ol className="how-steps">
            {STEPS.map((s) => (
              <li key={s.title} className="card">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="faq">
          <div className="section-head">
            <h2 id="faq">Questions, answered</h2>
          </div>
          <Faq items={FAQ} />
        </section>

        <section className="section" aria-labelledby="cta">
          <div className="cta">
            <h2 id="cta">Not sure where to start?</h2>
            <p>Browse every tool by category, or search for the task you have in mind.</p>
            <Link to="/tools" className="btn btn-primary btn-lg">
              Explore all tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
