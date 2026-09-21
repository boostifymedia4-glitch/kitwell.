import { Link } from 'react-router-dom';
import { LegalNotice, PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';

export default function Terms() {
  return (
    <PageShell path="/terms" title="Terms & Conditions" lead={`The terms that apply when you use ${site.name}.`}>
      <LegalNotice />
      <p className="muted">
        Effective date: <Placeholder>DATE</Placeholder>
      </p>

      <h2>1. Acceptance</h2>
      <p>
        By using {site.name} you agree to these terms. If you do not agree, please do not use the site. The site is operated by{' '}
        <Placeholder>LEGAL NAME / TRADING NAME</Placeholder>.
      </p>

      <h2>2. Use of the tools</h2>
      <p>
        You may use the tools for lawful personal and commercial purposes. You are responsible for the files and text you process and for having the
        right to use them. You must not use the site to break the law, infringe others’ rights, or interfere with the site’s operation.
      </p>

      <h2>3. No warranty</h2>
      <p>
        The tools are provided “as is” and “as available”. We work to make them accurate, but conversion and processing results can vary by browser,
        device and file. Always keep your original files and check the output before relying on it. Tool pages describe known limitations.
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any indirect or consequential loss, or for loss of data, arising from your use of the site.{' '}
        <Placeholder>Have a lawyer confirm the wording and any liability cap that applies in your jurisdiction.</Placeholder>
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The site’s design, text and code are owned by us or our licensors. You keep all rights in your own files. We use open-source software subject to its
        own licences.
      </p>

      <h2>6. Advertising and third-party links</h2>
      <p>The site may display advertising or link to third-party websites. We are not responsible for their content or practices.</p>

      <h2>7. Changes and availability</h2>
      <p>We may change, suspend or remove tools or these terms at any time. Continued use after a change means you accept the updated terms.</p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of <Placeholder>JURISDICTION, e.g. Pakistan</Placeholder>. Disputes will be handled by the courts of{' '}
        <Placeholder>COURT LOCATION</Placeholder>, unless mandatory consumer law in your country says otherwise.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms? See the <Link to="/contact">contact page</Link>.
      </p>
    </PageShell>
  );
}
