import { Link } from 'react-router-dom';
import { LegalNotice, PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';

export default function Cookies() {
  return (
    <PageShell path="/cookies" title="Cookie & browser storage information" lead="What this site stores in your browser, and what would change if advertising is added.">
      <LegalNotice />
      <h2>Current status</h2>
      <p>
        {site.name} does not currently set cookies and does not store data in your browser’s local storage. The tools keep files and text in memory while
        the page is open; they are gone when you close or reload the tab.
      </p>
      <p>
        Your hosting provider may set technical cookies or record server logs outside our control.{' '}
        <Placeholder>Confirm with your host and update this line.</Placeholder>
      </p>

      <h2>If advertising or analytics are enabled</h2>
      <p>Advertising and analytics providers commonly use cookies and similar identifiers. Before enabling them, this site must:</p>
      <ul>
        <li>list each provider and its purpose on this page;</li>
        <li>show a consent banner that lets visitors in regions such as the EEA and the UK accept or reject non-essential cookies before they are set; and</li>
        <li>
          update the <Link to="/privacy">Privacy Policy</Link>.
        </li>
      </ul>
      <p className="muted">
        Google AdSense requires a certified consent management platform for visitors in the EEA, UK and Switzerland. See the README section “AdSense
        readiness”.
      </p>

      <h2>Controlling cookies</h2>
      <p>You can block or delete cookies in your browser settings. Blocking cookies does not affect how the tools work.</p>
    </PageShell>
  );
}
