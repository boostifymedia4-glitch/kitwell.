/**
 * The legal pages (Privacy Policy, Terms & Conditions, Cookie information). Keys are `legal.<page>.<n>.h` (heading)
 * and `.p` (text). Every language has a translation; `legal.translationNote` is shown above translated pages.
 * Markers: `{site}` is the site name. The statements about data, cookies and third parties describe what the
 * website actually does (no analytics, no advertising, no cookies, local storage only for the language choice,
 * tools run in the browser): update them if that changes.
 */
export const legal = {

  'legal.privacy.intro': 'How {site} handles information when you use the website.',
  'legal.privacy.1.h': 'Files and text in the tools',
  'legal.privacy.1.p': 'The tools are built to work in your browser. When you add a file or type text, your browser reads and processes it on your device, and the tools do not send it to {site} servers. The pages load their own code and resources, such as the text-recognition files used by OCR PDF, from this website. Browser extensions, shared computers and your network settings are outside our control.',
  'legal.privacy.2.h': 'Contact form',
  'legal.privacy.2.p': 'If you use the Contact form, we receive your name, email address, subject, the optional tool or page, and your message. We use them to answer your inquiry and to improve {site}. The message is delivered to us through the form handler and message service we use to receive inquiries. Please do not include sensitive documents or personal data in your message.',
  'legal.privacy.3.h': 'Technical data',
  'legal.privacy.3.p': 'Like most websites, our hosting provider may process technical information such as your IP address, the pages requested, your browser type and timestamps in order to deliver and secure the website. At present, {site} does not use advertising or analytics services.',
  'legal.privacy.4.h': 'Cookies and browser storage',
  'legal.privacy.4.p': '{site} does not set cookies. It saves your selected language in your browser’s local storage so that the website opens in that language next time. You can remove it by clearing your browser data.',
  'legal.privacy.5.h': 'Your choices',
  'legal.privacy.5.p': 'To ask about the information you sent us through the Contact form, or to request that it is deleted, send a message through the Contact form and choose Privacy Request as the subject.',
  'legal.privacy.6.h': 'Changes',
  'legal.privacy.6.p': 'We may update this policy when the website or the way it handles information changes.',

  'legal.terms.intro': 'The rules for using {site}.',
  'legal.terms.1.h': 'Using {site}',
  'legal.terms.1.p': '{site} provides online tools for PDFs, images, text and developer tasks. By using the website you agree to these terms. If you do not agree, please do not use it.',
  'legal.terms.2.h': 'Your files and content',
  'legal.terms.2.p': 'You are responsible for the files and text you process and for having the right to use them. Do not use {site} for unlawful purposes or in a way that interferes with the website or other people’s use of it.',
  'legal.terms.3.h': 'Availability and results',
  'legal.terms.3.p': 'The tools are provided “as is” and “as available”, without a guarantee that they will always be available or error-free. Results can differ from the original, especially when converting between formats, so check the output before you rely on it and keep your original files. Each tool page describes its known limitations.',
  'legal.terms.4.h': 'Limitation of liability',
  'legal.terms.4.p': 'To the extent permitted by law, {site} is not liable for loss of data or for indirect or consequential loss arising from your use of the website or its tools.',
  'legal.terms.5.h': 'Intellectual property',
  'legal.terms.5.p': 'The design, text and code of the website belong to {site} or its licensors. You keep all rights to your own files. {site} uses open-source software under its own licenses.',
  'legal.terms.6.h': 'Changes',
  'legal.terms.6.p': 'We may change or discontinue tools, or update these terms, at any time. If you keep using {site} after a change, you accept the updated terms.',

  'legal.cookies.intro': 'What {site} stores in your browser.',
  'legal.cookies.1.h': 'Cookies',
  'legal.cookies.1.p': 'Cookies are small files that a website can store in your browser. {site} does not set cookies of its own.',
  'legal.cookies.2.h': 'Browser storage',
  'legal.cookies.2.p': '{site} saves your selected language in your browser’s local storage, under the name “kitwell-language”, so that the website opens in that language on your next visit. Choosing English removes it. The tools keep your files and text in memory only while the page is open.',
  'legal.cookies.3.h': 'Third parties',
  'legal.cookies.3.p': '{site} does not currently use advertising or analytics services. Our hosting provider may keep standard server logs, which are outside our control.',
  'legal.cookies.4.h': 'Managing storage',
  'legal.cookies.4.p': 'You can block or delete cookies and stored site data in your browser settings. This does not stop the tools from working; you will only need to choose your language again.',
} as Record<string, string>;
