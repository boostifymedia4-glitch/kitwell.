import { Link } from '@/i18n/Link';
import { Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';
import { Rich } from '@/i18n/Rich';

/** One block of a legal page: heading, paragraph, muted paragraph or list. Values are catalog keys. */
export type LegalBlock = ['h', string] | ['p', string] | ['muted', string] | ['ul', string[]];

const EMAIL = site.contactEmail.replace(/^\[|\]$/g, '');

/** Renders a legal page from its catalog keys, so every language shows the full text and not just the headings. */
export function LegalText({ blocks }: { blocks: LegalBlock[] }) {
  const { t } = useI18n();
  const tags = {
    ph: (c: React.ReactNode) => <Placeholder>{c}</Placeholder>,
    b: (c: React.ReactNode) => <strong>{c}</strong>,
    cookies: (c: React.ReactNode) => <Link to="/cookies">{c}</Link>,
    privacy: (c: React.ReactNode) => <Link to="/privacy">{c}</Link>,
    contact: (c: React.ReactNode) => <Link to="/contact">{c}</Link>,
  };
  const text = (key: string) => <Rich text={t(key, { site: site.name, email: EMAIL })} tags={tags} />;
  return (
    <>
      {blocks.map((b, i) => {
        switch (b[0]) {
          case 'h':
            return <h2 key={i}>{text(b[1])}</h2>;
          case 'p':
            return <p key={i}>{text(b[1])}</p>;
          case 'muted':
            return (
              <p key={i} className="muted">
                {text(b[1])}
              </p>
            );
          case 'ul':
            return (
              <ul key={i}>
                {b[1].map((k) => (
                  <li key={k}>{text(k)}</li>
                ))}
              </ul>
            );
        }
      })}
    </>
  );
}
