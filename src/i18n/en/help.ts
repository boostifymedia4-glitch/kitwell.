/** Help & FAQ page: exactly ten questions, `faq.<n>.q` and `faq.<n>.a` (n = 1 to 10). `{languages}` is the number of site languages. */
export const FAQ_COUNT = 10;

export const help = {
  'help.title': 'Help & FAQ',
  'help.intro': 'Answers to common questions about using Kitwell.',
  'faq.1.q': 'How do I use a Kitwell tool?',
  'faq.1.a': 'Open a tool from the All tools menu or the search box. Add your file or enter your text, adjust the options if there are any, run the tool, then download or copy the result. Each tool page lists the steps, the supported formats and what the tool cannot do.',
  'faq.2.q': 'Do I need to create an account?',
  'faq.2.a': 'No. You can use the tools without creating an account or signing in.',
  'faq.3.q': 'Which file formats are supported?',
  'faq.3.a': 'It depends on the tool. Image tools work with common formats such as JPG, PNG, WebP and GIF, PDF tools work with PDF files, and some converters accept images, HTML, Word, PowerPoint or Excel files. Every tool page lists what it accepts, and a few formats depend on what your browser supports.',
  'faq.4.q': 'Why is my tool not working?',
  'faq.4.a': 'Check that the file is in a supported format and within the size limit shown on the tool page. PDFs protected by a password must be unlocked first. Then try reloading the page, using a current version of Chrome, Edge, Firefox or Safari, closing other heavy tabs, or turning off browser extensions that block scripts. If it still fails, tell us through the Contact form.',
  'faq.5.q': 'Why is my file conversion taking so long?',
  'faq.5.a': 'Large files, documents with many pages or high-resolution images need more processing time and memory, and phones and older computers are slower. Keep the tab open and visible while it works, try a smaller file or fewer pages, and close other tabs to free up memory.',
  'faq.6.q': 'Will the converted file look exactly like the original?',
  'faq.6.a': 'Not always. Converting between formats can change fonts, spacing, colours or layout, especially for complex documents. Check the result before you rely on it and keep your original file. Each tool page lists known limitations.',
  'faq.7.q': 'What should I do if I find a tool error?',
  'faq.7.a': 'Use the Contact form and tell us the tool name, what you did, the error message you saw, your browser and device, and the type and approximate size of the file. Please do not send sensitive documents.',
  'faq.8.q': 'Can I use Kitwell on mobile devices?',
  'faq.8.a': 'Yes. The website adapts to phones and tablets, and the tools run in a mobile browser. Large files and heavy tools can be slow on phones because they use your device’s memory.',
  'faq.9.q': 'How many languages does Kitwell support?',
  'faq.9.a': 'Kitwell is available in {languages} languages. Choose one from the language menu at the bottom of any page.',
  'faq.10.q': 'How can we improve Kitwell?',
  'faq.10.a': 'Have an idea for a new tool or feature? We welcome your suggestions to help make Kitwell more useful. Contact us with your ideas and feedback.',
} as Record<string, string>;
