import { useRef } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Seo } from '@/components/Seo';
import { FounderPhoto, LinkedInIcon, Marked, QuoteWords, Reveal, StoryProgress } from '@/components/about/AboutParts';
import { site } from '@/config/site';
import { LANGUAGES } from '@/i18n/languages';
import { useI18n } from '@/i18n';
import { Link } from '@/i18n/Link';
import { usePageMeta } from '@/i18n/usePageMeta';
import { tools } from '@/tools/registry';
import { BELIEF_PARAGRAPHS, NOT_ITEMS, storyBlocks } from './aboutContent';

/** About page: a founder-led story for a one-person project, translated like every other page (see src/i18n/en/about.ts). */
export default function About() {
  const { t } = useI18n();
  const meta = usePageMeta('/about');
  const v = { site: site.name, tools: tools.length, languages: LANGUAGES.length };
  const photo = { pill: t('about.pill'), alt: t('about.photoAlt', v) };
  const storyRef = useRef<HTMLElement | null>(null);
  const blocks = storyBlocks(t, v);
  const firstParagraph = blocks.findIndex((b) => b.type === 'p');
  let paragraphs = 0;
  return (
    <div className="about-page">
      {meta && <Seo {...meta} />}

      <section className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <Breadcrumbs path="/about" />
          <div className="about-hero-grid">
            <FounderPhoto priority {...photo} />
            <div className="about-hero-text">
              <h1 id="about-title">{t('about.hero.title')}</h1>
              <p className="about-intro">{t('about.hero.intro', v)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container about-story" ref={storyRef} aria-labelledby="story-title">
        <h2 id="story-title" className="about-eyebrow-h">{t('about.story.heading')}</h2>
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
          <p>{t('about.respect', v)}</p>
        </Reveal>
      </section>

      <section className="container about-ceo" aria-labelledby="ceo-title">
        <Reveal className="about-ceo-card">
          <p className="about-eyebrow">{t('about.ceo.eyebrow')}</p>
          <div className="about-ceo-head">
            <FounderPhoto size="small" {...photo} />
            <div>
              <h2 id="ceo-title">{site.author.name}</h2>
              <p className="about-ceo-title">{t('about.ceo.title', v)}</p>
            </div>
          </div>
          <div className="about-quote-card">
            <span className="about-quote-glyph" aria-hidden="true">“</span>
            <QuoteWords text={t('about.ceo.quote')} />
          </div>
          <p className="about-roles">{t('about.ceo.roles')}</p>
          <p className="about-ceo-text">{t('about.ceo.text', v)}</p>
        </Reveal>
      </section>

      <section className="about-belief" aria-labelledby="belief-title">
        <div className="container about-belief-inner">
          <Reveal>
            <h2 id="belief-title">{t('about.belief.heading', v)}</h2>
          </Reveal>
          {Array.from({ length: BELIEF_PARAGRAPHS }, (_, i) => (
            <Reveal key={i} as="p" delay={i * 80}>
              {t(`about.belief.p${i + 1}`, v)}
            </Reveal>
          ))}
          <Reveal as="p" className="about-belief-final">
            <strong>{t('about.belief.final')}</strong>
          </Reveal>
        </div>
      </section>

      <div className="container about-rest">
        <Reveal as="section" className="about-block" >
          <h2>{t('about.matters.heading')}</h2>
          <p>{t('about.matters.text', v)}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{t('about.improve.heading')}</h2>
          <p>{t('about.improve.text')}</p>
          <div className="about-actions">
            <a className="btn btn-primary btn-lg" href={site.author.profile} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              {t('about.improve.linkedin')}
            </a>
            <Link className="btn btn-secondary btn-lg" to="/contact">
              {t('about.improve.feedback')}
            </Link>
          </div>
        </Reveal>

        <Reveal as="section" className="about-block">
          <h2>{t('about.what.heading')}</h2>
          <p>{t('about.what.text', v)}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{t('about.how.heading')}</h2>
          <p>{t('about.how.text')}</p>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{t('about.not.heading')}</h2>
          <ul>
            {Array.from({ length: NOT_ITEMS }, (_, i) => (
              <li key={i}>{t(`about.not.${i + 1}`)}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="section" className="about-block">
          <h2>{t('about.touch.heading')}</h2>
          <p>{t('about.touch.text').split(/(\{contact\}|\{privacy\})/).map((part, i) => (part === '{contact}' ? <Link key={i} to="/contact">{t('about.touch.contact')}</Link> : part === '{privacy}' ? <Link key={i} to="/privacy">{t('about.touch.privacy')}</Link> : part))}</p>
        </Reveal>
      </div>
    </div>
  );
}
