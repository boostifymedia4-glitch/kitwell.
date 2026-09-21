import { Link } from 'react-router-dom';
import { LegalNotice, PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';

export default function Privacy() {
  return (
    <PageShell path="/privacy" title="Privacy Policy" lead={`How ${site.name} handles your files and data.`}>
      <LegalNotice />
      <p className="muted">
        Effective date: <Placeholder>DATE</Placeholder>
      </p>

      <h2>1. Who we are</h2>
      <p>
        This site is operated by <Placeholder>LEGAL NAME / TRADING NAME</Placeholder> (“we”, “us”). Contact:{' '}
        <Placeholder>{site.contactEmail.replace(/^\[|\]$/g, '')}</Placeholder>.
      </p>

      <h2>2. Your files and text</h2>
      <p>
        The image, PDF, text and developer tools on {site.name} process your content locally in your browser. Files you add and text you paste are read by
        your browser, and results are created on your device. Our tools do not upload this content to our servers, and we do not receive, store or view it.
      </p>
      <p>
        This describes how our tools are built. Browser extensions, shared or managed devices, and your own network settings are outside our control.
      </p>

      <h2>3. Information we collect</h2>
      <ul>
        <li>
          <strong>Server logs.</strong> Like most websites, our hosting infrastructure may record technical information about each request, such as IP
          address, date and time, page requested, browser type and referring page. We use this to keep the site secure and working. Retention period:{' '}
          <Placeholder>e.g. 30 days, per your host’s settings</Placeholder>.
        </li>
        <li>
          <strong>Email you send us.</strong> If you contact us, we receive your email address and message and use them only to respond.
        </li>
        <li>
          <strong>Analytics.</strong>{' '}
          <Placeholder>State whether you use analytics. This template assumes none. If you add an analytics tool, name it here and update the Cookie page.</Placeholder>
        </li>
      </ul>
      <p>We do not require accounts, and we do not knowingly collect personal information from children under 13.</p>

      <h2>4. Cookies and similar technologies</h2>
      <p>
        At the time of writing, the site does not set cookies of its own. If advertising or analytics are added, third parties may set cookies and we will
        ask for consent where the law requires it. See the <Link to="/cookies">Cookie information</Link> page.
      </p>

      <h2>5. Advertising</h2>
      <p>
        We may show advertising in the future. If we do, our advertising partners may use cookies or similar technologies to show ads and measure
        performance.{' '}
        <Placeholder>Complete this section with your ad network’s required disclosures before enabling ads.</Placeholder>
      </p>

      <h2>6. Sharing</h2>
      <p>
        We do not sell personal information. We may share limited technical data with service providers that host or secure the site, and where required
        by law.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal information, and to object or
        complain to a data protection authority. To exercise these rights, contact us at the address above.
      </p>

      <h2>8. International visitors</h2>
      <p>
        {site.name} is available worldwide. Server logs may be processed in countries other than yours.{' '}
        <Placeholder>Add hosting location and any transfer safeguards.</Placeholder>
      </p>

      <h2>9. Changes</h2>
      <p>We may update this policy. The effective date above shows when it last changed.</p>
    </PageShell>
  );
}
