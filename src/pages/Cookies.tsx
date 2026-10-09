import { Link } from 'react-router-dom';
import { LegalBody, LegalNotice, PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';
import { useI18n } from '@/i18n';

export default function Cookies() {
  const { t } = useI18n();
  return (
    <PageShell path="/cookies" title={t('legal.cookies.title')} lead={t('legal.cookies.lead', { site: site.name })}>
      <LegalNotice />
      <LegalBody>
      <h2>Current status</h2>
      <p>
        {site.name} does not currently set cookies. The only thing it stores in your browser is your language choice, in local storage under the name “kitwell-language”, so
        the site opens in that language next time; choosing English removes it. The tools keep files and text in memory while the page is open; they are gone when you close or
        reload the tab.
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
      </LegalBody>
    </PageShell>
  );
}
