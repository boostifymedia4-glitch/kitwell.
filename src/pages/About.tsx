import { Link } from 'react-router-dom';
import { PageShell, Placeholder } from '@/components/ui/PageShell';
import { site } from '@/config/site';

export default function About() {
  return (
    <PageShell path="/about" title={`About ${site.name}`} lead="Simple, dependable tools for everyday file, PDF, text and development tasks.">
      <h2>What we do</h2>
      <p>
        {site.name} is a collection of small utilities: converting and compressing images, merging and splitting PDFs, cleaning up text, and formatting
        or encoding data. Each tool has its own page, does one job, and says plainly what it supports and what it does not.
      </p>
      <h2>How the tools work</h2>
      <p>
        The tools run inside your web browser. When you add an image or PDF, your browser reads it from your device, does the work locally, and hands you
        the result to download. Our tools do not send your files or pasted text to our servers. Because the work happens on your device, speed and maximum
        file size depend on your computer or phone.
      </p>
      <h2>What we don’t do</h2>
      <ul>
        <li>We do not require an account or add watermarks to your output.</li>
        <li>We do not rewrite the existing text inside PDFs. The PDF tools merge, split, compress, sign, fill, redact, compare and recognise text in documents, but they do not change the words that are already there.</li>
        <li>We do not offer tools that need large AI models or paid services, such as background removal, until they can be done reliably and privately. The one engine we do ship, for OCR, is open source and runs inside your browser.</li>
      </ul>
      <h2>Who is behind {site.name}</h2>
      <p>
        <Placeholder>Add a short, truthful description of the person or company that operates this site: name, country and what motivated the project.</Placeholder>
      </p>
      <h2>Get in touch</h2>
      <p>
        Found a bug or want a tool added? See the <Link to="/contact">contact page</Link>. To learn how we handle data, read the{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </PageShell>
  );
}
