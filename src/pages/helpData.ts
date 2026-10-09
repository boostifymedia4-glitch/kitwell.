import type { FaqItem } from '@/tools/types';

export interface HelpSection {
  id: string;
  title: string;
  items: FaqItem[];
}

/** Content of the Help & FAQ page. Kept in data so it can also feed the page's FAQ structured data. */
export const helpSections: HelpSection[] = [
  {
    id: 'basics',
    title: 'Getting started',
    items: [
      {
        q: 'How do I use a tool?',
        a: 'Open any tool from the All tools menu or the search box. Add your file (drop it on the box or click to choose it), adjust the options if there are any, run the tool, then download the result. Every tool page lists the steps, the supported formats and what the tool cannot do.',
      },
      {
        q: 'Do I need an account?',
        a: 'No. There is no sign-up, no login and no watermark added to your results.',
      },
      {
        q: 'Which browsers are supported?',
        a: 'Current versions of Chrome, Edge, Firefox and Safari on desktop and mobile. Chrome and Edge are the most thoroughly tested. A few features depend on the browser, for example saving WebP images; the tool tells you if something is unavailable.',
      },
      {
        q: 'Why is a tool slow or why did the page freeze?',
        a: 'Everything runs on your own device, so large files, scanned documents (OCR) and big images need memory and processing time. Try a smaller file, close other tabs, or use a desktop computer. Keep the tab in the foreground: browsers slow down background tabs, which can stall PDF previews.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy and your files',
    items: [
      {
        q: 'Are my files uploaded to your servers?',
        a: 'No. Files are opened, processed and saved by your own browser. Our tools do not send them to a server. You can confirm this by turning off your internet connection after the page has loaded: the tools keep working. The Privacy Policy explains what the website itself collects.',
      },
      {
        q: 'Does Kitwell keep a copy of my results?',
        a: 'No. Results exist only in your browser tab until you download them, and disappear when you close or reload the page.',
      },
      {
        q: 'Which settings are remembered?',
        a: 'Only your language choice, saved in your browser so it is applied on your next visit. Clear your browser data to remove it.',
      },
    ],
  },
  {
    id: 'pdf',
    title: 'PDF tools',
    items: [
      {
        q: 'My PDF says it is password-protected. What now?',
        a: 'Use Unlock PDF and enter the password you were given. Unlock PDF never guesses or cracks passwords. Other PDF tools stop with a message when a file is encrypted.',
      },
      {
        q: 'Is a signature added with Sign PDF legally binding?',
        a: 'Sign PDF places a visual signature (a drawn, typed or uploaded image) on a page. It is not a cryptographic digital signature and does not prove who signed or detect later changes. Whether it is accepted depends on the person or organisation asking for it.',
      },
      {
        q: 'Can I black out private information with Redact PDF?',
        a: 'Yes. Redact PDF turns the pages you redact into images with the chosen areas blacked out, so the text underneath is genuinely removed from those pages. The redacted pages can no longer be searched or selected. Check the result before sharing it.',
      },
      {
        q: 'Why did Compress PDF not make my file much smaller?',
        a: 'The standard mode recompresses embedded JPEG images and keeps text selectable, so it helps most for PDFs full of photos. PDFs that are mostly text, or whose images are already small, cannot shrink much. The stronger mode converts pages to images and always loses selectable text; it says so before you run it.',
      },
      {
        q: 'Which languages does OCR PDF recognise?',
        a: 'English only for now. Text in other languages or in unusual handwriting may be misread. The scan must be reasonably sharp; 200 to 300 DPI works best.',
      },
      {
        q: 'Can I edit the existing text of a PDF?',
        a: 'No. Kitwell can fill form fields, add signatures, watermarks, page numbers and redactions, crop, merge, split, reorder and compress PDFs, but it does not rewrite the existing text.',
      },
    ],
  },
  {
    id: 'other',
    title: 'Images, passwords and languages',
    items: [
      {
        q: 'Are name-based passwords as safe as random ones?',
        a: 'No. A password built on a recognisable name or word is easier to guess than fully random text, even with random numbers, capitals and a symbol added. Use the Name + word style for low-risk accounts and the Fully random style for email, banking and password managers.',
      },
      {
        q: 'Does Enlarge Image use AI?',
        a: 'No. It uses high-quality resampling to make an image bigger and smooth. It cannot invent detail that was never in the picture.',
      },
      {
        q: 'Which languages is the site available in?',
        a: 'Menus, the footer and the homepage can be shown in 17 languages: English, Urdu, Arabic, Spanish, French, German, Portuguese, Italian, Turkish, Chinese, Japanese, Korean, Hindi, Indonesian, Bengali, Russian and Dutch. Tool pages, tool names and legal pages are in English for now. Choose a language at the bottom of any page.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Still stuck?',
    items: [
      {
        q: 'How do I report a bug or suggest a tool?',
        a: 'Use the Contact page. Please include the tool name, your browser and what you expected to happen. Never send files that contain private information.',
      },
    ],
  },
];

export const allHelpItems: FaqItem[] = helpSections.flatMap((s) => s.items);
