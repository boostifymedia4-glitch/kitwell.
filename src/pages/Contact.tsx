import { PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';

export default function Contact() {
  return (
    <PageShell path="/contact" title="Contact us" lead="Questions, bug reports and tool suggestions are welcome.">
      <h2>Email</h2>
      <p>
        Write to <Placeholder>{site.contactEmail.replace(/^\[|\]$/g, '')}</Placeholder>. We read every message, but we can’t promise a reply time.
      </p>
      <h2>Reporting a problem</h2>
      <p>To help us reproduce an issue, please include:</p>
      <ul>
        <li>The name of the tool and the page address.</li>
        <li>Your browser and device (for example “Chrome 130 on Windows 11”).</li>
        <li>What you expected and what happened instead, including any error message.</li>
        <li>The file type and approximate size. Please do not email sensitive documents.</li>
      </ul>
      <h2>Business details</h2>
      <p>
        <Placeholder>Legal or trading name</Placeholder> · <Placeholder>Registered address, if you wish to publish one</Placeholder>
      </p>
      <p className="muted">There is no contact form, so nothing you type on this site is collected or stored by us.</p>
    </PageShell>
  );
}
