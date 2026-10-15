/**
 * Text of the About page. It is English only on purpose (the page is written in the first person by the founder), so it
 * lives here and not in the translation catalog. `[[words]]` marks a phrase for the soft highlighter.
 */
export type StoryBlock = { type: 'p' | 'quote'; text: string };

export function storyBlocks(tools: number, languages: number): StoryBlock[] {
  return [
    { type: 'p', text: 'Kitwell did not begin in an office. It did not begin with a team, a budget, or a plan handed to me by someone experienced. It began with a [[normal laptop]] and a question I couldn’t stop asking myself.' },
    {
      type: 'p',
      text: 'I’m Ubaid Ullah, a 20-year-old student from Karachi, Pakistan. Like millions of people, I used online tools every day to merge PDFs, compress images and clean up files. And like many people, I kept noticing the same names at the top: websites like iLovePDF, used by people all over the world. One day the question became personal:',
    },
    { type: 'quote', text: 'If they could build something the whole world uses, why couldn’t I?' },
    { type: 'p', text: 'The honest answer was that I had almost nothing to start with.' },
    { type: 'quote', text: 'No MacBook. No high-end PC. No expensive software, no gadgets, no mentor, and nobody to guide me.' },
    { type: 'p', text: 'Just an ordinary laptop, a lot of curiosity, and the stubborn belief that a student from Pakistan can build something that people everywhere will use.' },
    {
      type: 'p',
      text: 'So I started where everyone without resources has to start: by learning. For [[months]] I researched how great tools are designed, what makes them fast, what makes people trust them, and where they fall short. I filled pages with ideas, threw many of them away, and kept going. Most days, the work ran from morning into night, on the same modest laptop.',
    },
    {
      type: 'p',
      text: 'What you see on Kitwell is only the surface. Behind every tool page are months of research, mistakes, rebuilds and quiet struggles that nobody sees on a website. This is my first project, and I decided it would not stay a local experiment. I wanted it live, public and global.',
    },
    { type: 'p', text: `Today, Kitwell offers [[${tools} free tools in ${languages} languages]] for images, PDFs, text and developers, with no sign-up and no watermark. It is still growing, and it will keep growing.` },
    { type: 'p', text: 'I’m not a company with hundreds of employees.' },
    { type: 'quote', text: 'I’m one person with a big dream, and Kitwell is the first proof that it can be done.' },
  ];
}

export const ABOUT = {
  heroTitle: 'Built by one person. Made for everyone.',
  heroIntro: 'Hi, I’m Ubaid Ullah, a 20-year-old student from Karachi, Pakistan. I’m the founder, CEO, designer and support team of Kitwell.',
  storyHeading: 'The story',
  respect:
    'A note of respect. Services like iLovePDF showed the world how simple PDF tools can be, and they are a big reason I believed this was possible. Kitwell is a small, humble project and I’m still learning. If anyone from their team ever visits, thank you for the inspiration. I would be grateful for any advice.',
  ceo: {
    eyebrow: 'One name. Every title.',
    name: 'Ubaid Ullah',
    title: 'Founder & CEO, Kitwell',
    quote: 'Most CEOs have a team. I have a laptop, a notebook full of ideas, and months of late nights.',
    roles: 'Founder. CEO. Product designer. Researcher. Marketer. Support desk.',
    text: 'On most websites, these are six different departments. On Kitwell, they are one 20-year-old student from Karachi.',
  },
  belief: {
    heading: 'The belief behind Kitwell',
    paragraphs: [
      'When a person truly decides to build something, the question stops being “Do I have the resources?” and becomes “How do I begin?”',
      'The right city, the right school, the right background, the right equipment: these help, but they were never the starting line. The people who build things that last are rarely the ones who had everything. They are the ones who decided, and then kept showing up, day after day, even when nobody was watching.',
      'Kitwell is my proof of that. It was built on an ordinary laptop, with no guidance, no shortcuts and no safety net, only a decision I refused to take back.',
    ],
    final: 'If you are waiting for better conditions before you start, this is your sign: start with what you have.',
  },
  matters: {
    heading: 'Why this matters to you',
    text: 'When you send feedback on Kitwell, it doesn’t disappear into a support queue. It lands with the person who designs every page, decides every feature, and reads every message himself.',
  },
  improve: {
    heading: 'Help me improve',
    text: 'I’m still a student, still learning, and this is only my first project. If you spot a bug or an idea for a new tool, tell me. I’m always listening.',
    linkedin: 'Connect on LinkedIn',
    feedback: 'Send me feedback',
  },
  sections: {
    what: {
      heading: 'What I do',
      text: 'Kitwell is a collection of small utilities: converting and compressing images, merging and splitting PDFs, cleaning up text, and formatting or encoding data. Each tool has its own page, does one job, and says plainly what it supports and what it does not.',
    },
    how: {
      heading: 'How the tools work',
      text: 'The tools run inside your web browser. When you add an image or PDF, your browser reads it from your device, does the work locally, and hands you the result to download. They do not send your files or pasted text to a server. Because the work happens on your device, speed and maximum file size depend on your computer or phone.',
    },
    not: {
      heading: 'What I don’t do',
      items: [
        'I do not require an account or add watermarks to your output.',
        'I do not rewrite the existing text inside PDFs. The PDF tools merge, split, compress, sign, fill, redact, compare and recognise text in documents, but they do not change the words that are already there.',
        'I do not offer tools that need large AI models or paid services, such as background removal, until they can be done reliably and privately. The one engine I do ship, for OCR, is open source and runs inside your browser.',
      ],
    },
    touch: {
      heading: 'Get in touch',
      before: 'Found a bug or want a tool added? See the ',
      contact: 'contact page',
      middle: '. To learn how I handle data, read the ',
      privacy: 'Privacy Policy',
      after: '.',
    },
  },
} as const;
