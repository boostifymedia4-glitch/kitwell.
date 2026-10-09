import { Link } from 'react-router-dom';
import { Faq } from '@/components/ui/Faq';
import { PageShell } from '@/components/ui/PageShell';
import { helpSections } from './helpData';

export default function Help() {
  return (
    <PageShell path="/help" title="Help & FAQ" lead="Answers about how the tools work, your files and privacy, and the limits of each tool." wide>
      <nav className="help-jump" aria-label="Help topics">
        {helpSections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
      <div className="help-sections">
        {helpSections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="help-section">
            <h2 id={`${s.id}-title`}>{s.title}</h2>
            <Faq items={s.items} />
          </section>
        ))}
      </div>
      <p className="muted">
        Can’t find your answer? <Link to="/contact">Contact us</Link>, browse <Link to="/tools">all tools</Link>, or read the <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </PageShell>
  );
}
