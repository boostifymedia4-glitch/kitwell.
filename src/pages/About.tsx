import { useRef } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Seo } from '@/components/Seo';
import { FounderPhoto, LinkedInIcon, Marked, QuoteWords, Reveal, StoryProgress } from '@/components/about/AboutParts';
import { site } from '@/config/site';
import { LANGUAGES } from '@/i18n/languages';
import { Link } from '@/i18n/Link';
import { usePageMeta } from '@/i18n/usePageMeta';
import { tools } from '@/tools/registry';
import { ABOUT, storyBlocks } from './aboutContent';

/** About page: a founder-led story for a one-person project. Written in English only (see aboutContent.ts). */
export default function About() {
  const meta = usePageMeta('/about');
  const storyRef = useRef<HTMLElement | null>(null);
  const blocks = storyBlocks(tools.length, LANGUAGES.length);
  const firstParagraph = blocks.findIndex((b) => b.type === 'p');
  let paragraphs = 0;
  return (
    <div className="about-page" lang="en" dir="ltr">
      {meta && <Seo {...meta} />}

      <section className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <Breadcrumbs path="/about" />
          <div className="about-hero-grid">
            <FounderPhoto priority />
            <div className="about-hero-text">
              <h1 id="about-title">{ABOUT.heroTitle}</h1>
              <p className="about-intro">{ABOUT.heroIntro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container about-story" ref={storyRef} aria-labelledby="story-title">
        <h2 id="story-title" className="about-eyebrow-h">{ABOUT.storyHeading}</h2>
        <div className="about-story-body">
          <StoryProgress targetRef={storyRef} />
          {blocks.map((b, i) =>
            b.type === 'quote' ? (
              <Reveal key={i} as="figure" className="about-pull">
                <blockquote>
                  <p>{b.text}</p>
                </blockquote>
              </Reveal>
            ) : (
              <Reveal key={i} as="p" delay={(paragraphs++ % 3) * 80} className={i === firstParagraph ? 'about-dropcap' : ''}>
                <Marked text={b.text} />
              </Reveal>
            ),
          )}
        </div>
        <Reveal as="aside" className="about-respect">
          <p>{ABOUT.respect}</p>
        </Reveal>
      </section>

      <section className="container about-ceo" aria-labelledby="ceo-title">
        <Reveal className="about-ceo-card">
          <p className="about-eyebrow">{ABOUT.ceo.eyebrow}</p>
          <div className="about-ceo-head">
            <FounderPhoto size="small" />
            <div>
              <h2 id="ceo-title">{ABOUT.ceo.name}</h2>
              <p className="about-ceo-title">{ABOUT.ceo.title}</p>
            </div>
          </div>
          <div className="about-quote-card">
            <span className="about-quote-glyph" aria-hidden="true">“</span>
            <QuoteWords text={ABOUT.ceo.quote} />
          </div>
          <p className="about-roles">{ABOUT.ceo.roles}</p>
          <p className="about-ceo-text">{ABOUT.ceo.text}</p>
        </Reveal>
      </section>

      <section className="about-belief" aria-labelledby="belief-title">
        <div className="container about-belief-inner">
          <Reveal>
            <h2 id="belief-title">{ABOUT.belief.heading}</h2>
          </Reveal>
          {ABOUT.belief.paragraphs.map((p, i) => (
            <Reveal key={i} as="p" delay={i * 80}>
              {p}
            </Reveal>
          ))}
          <Reveal as="p" className="about-belief-final">
            <strong>{ABOUT.belief.final}</strong>
          </Reveal>
        </div>
      </section>

      <div className="container about-rest">
        <Reveal as="section" className="about-block" >
          <h2>{ABOUT.matters.heading}</h2>
          <p>{ABOUT.matters.text}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{ABOUT.improve.heading}</h2>
          <p>{ABOUT.improve.text}</p>
          <div className="about-actions">
            <a className="btn btn-primary btn-lg" href={site.author.profile} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              {ABOUT.improve.linkedin}
            </a>
            <Link className="btn btn-secondary btn-lg" to="/contact">
              {ABOUT.improve.feedback}
            </Link>
          </div>
        </Reveal>

        <Reveal as="section" className="about-block">
          <h2>{ABOUT.sections.what.heading}</h2>
          <p>{ABOUT.sections.what.text}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{ABOUT.sections.how.heading}</h2>
          <p>{ABOUT.sections.how.text}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{ABOUT.sections.not.heading}</h2>
          <ul>
            {ABOUT.sections.not.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{ABOUT.sections.touch.heading}</h2>
          <p>
            {ABOUT.sections.touch.before}
            <Link to="/contact">{ABOUT.sections.touch.contact}</Link>
            {ABOUT.sections.touch.middle}
            <Link to="/privacy">{ABOUT.sections.touch.privacy}</Link>
            {ABOUT.sections.touch.after}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
