import type { ToolDef } from '../types';

const common = { category: 'text' as const, fileTool: false };

export const textTools: ToolDef[] = [
  {
    ...common,
    slug: 'word-counter',
    name: 'Word Counter',
    icon: 'text',
    impl: 'word-counter',
    popular: true,
    description: 'Count words, characters, sentences and paragraphs, and estimate reading time as you type.',
    metaDescription:
      'Free online word counter. Count words, characters, sentences and paragraphs and estimate reading and speaking time instantly.',
    keywords: ['count words', 'word count', 'reading time'],
    steps: ['Type or paste your text.', 'Read the live statistics above the editor.', 'Use Clear to start over.'],
    faq: [
      {
        q: 'How are words counted?',
        a: 'A word is any run of characters separated by whitespace. Hyphenated words count as one and numbers count as words.',
      },
      {
        q: 'How is reading time calculated?',
        a: 'Reading time assumes 238 words per minute and speaking time 150 words per minute, which are typical averages for adults.',
      },
    ],
    limits: ['Counts are based on whitespace, so languages written without spaces (such as Chinese or Japanese) will show one word per run of text.'],
    related: ['character-counter', 'case-converter', 'text-cleaner', 'remove-duplicate-lines', 'text-diff-checker'],
  },
  {
    ...common,
    slug: 'character-counter',
    name: 'Character Counter',
    icon: 'hash',
    impl: 'character-counter',
    description: 'Count characters with and without spaces and check text against common length limits.',
    metaDescription:
      'Free online character counter. Count characters with and without spaces, bytes and lines, and check limits for posts, meta tags and SMS.',
    keywords: ['character count', 'letter counter', 'characters limit'],
    steps: ['Type or paste your text.', 'Read the totals and the limit bars.', 'Adjust your text until it fits.'],
    faq: [
      {
        q: 'Are emoji counted as one character?',
        a: 'Yes. The counter counts visible characters (grapheme clusters), so an emoji counts as one even though it uses several bytes.',
      },
      {
        q: 'Why do my SMS limits differ?',
        a: 'SMS length depends on the encoding. Messages with non-Latin characters or emoji use a shorter limit than the 160-character reference shown here.',
      },
    ],
    limits: ['Limits shown are common guidelines and change over time; check each platform for its current rule.'],
    related: ['word-counter', 'text-cleaner', 'case-converter', 'text-diff-checker', 'url-encoder-decoder'],
  },
  {
    ...common,
    slug: 'case-converter',
    name: 'Case Converter',
    icon: 'case',
    impl: 'case-converter',
    description: 'Convert text to upper, lower, title, sentence, camel, snake, kebab and more.',
    metaDescription:
      'Free online case converter. Change text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case and more.',
    keywords: ['uppercase converter', 'title case', 'camelcase converter'],
    steps: ['Paste your text.', 'Choose the case you want.', 'Copy the converted result.'],
    faq: [
      {
        q: 'Does Title Case handle small words?',
        a: 'Yes. Short words such as "a", "of" and "the" stay lowercase unless they start or end the text.',
      },
    ],
    limits: ['Title case follows common English style rules and may not suit every style guide.'],
    related: ['word-counter', 'text-cleaner', 'text-sorter', 'remove-duplicate-lines', 'character-counter'],
  },
  {
    ...common,
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    icon: 'list-x',
    impl: 'remove-duplicates',
    popular: true,
    description: 'Remove repeated lines from a list while keeping the original order.',
    metaDescription:
      'Free online duplicate line remover. Delete repeated lines from lists, with options for case, whitespace and empty lines.',
    keywords: ['dedupe lines', 'unique lines', 'remove duplicates from list'],
    steps: ['Paste your list, one item per line.', 'Choose whether case and whitespace matter.', 'Copy the de-duplicated result.'],
    faq: [
      {
        q: 'Which copy of a duplicate is kept?',
        a: 'The first occurrence is kept and later ones are removed, so your original order is preserved.',
      },
    ],
    limits: ['Works on whole lines only.'],
    related: ['text-sorter', 'text-cleaner', 'word-counter', 'text-diff-checker', 'case-converter'],
  },
  {
    ...common,
    slug: 'text-sorter',
    name: 'Text Sorter',
    icon: 'arrow-down-up',
    impl: 'text-sorter',
    description: 'Sort lines alphabetically, numerically, by length, or randomly.',
    metaDescription:
      'Free online text sorter. Sort lines A–Z, Z–A, numerically, by length or shuffle them, with case-insensitive and natural ordering.',
    keywords: ['sort lines', 'alphabetize', 'sort list'],
    steps: ['Paste your lines.', 'Choose a sort method and options.', 'Copy the sorted list.'],
    faq: [
      {
        q: 'What is natural sorting?',
        a: 'Natural sorting compares embedded numbers by value, so "item2" comes before "item10".',
      },
    ],
    limits: ['Alphabetical sorting uses your browser’s locale rules.'],
    related: ['remove-duplicate-lines', 'text-cleaner', 'case-converter', 'word-counter', 'text-diff-checker'],
  },
  {
    ...common,
    slug: 'text-cleaner',
    name: 'Text Cleaner',
    icon: 'eraser',
    impl: 'text-cleaner',
    description: 'Trim whitespace, collapse spaces, remove blank lines and strip invisible characters.',
    metaDescription:
      'Free online text cleaner. Remove extra spaces, empty lines, line breaks, invisible characters and smart quotes from pasted text.',
    keywords: ['remove extra spaces', 'clean pasted text', 'remove line breaks'],
    steps: ['Paste your text.', 'Tick the clean-up options you need.', 'Copy the cleaned text.'],
    faq: [
      {
        q: 'What are invisible characters?',
        a: 'Zero-width spaces, soft hyphens and byte-order marks often sneak in when copying from web pages and can break code or comparisons.',
      },
    ],
    limits: ['Operations are applied in a fixed order; run the tool twice if you need a different sequence.'],
    related: ['remove-duplicate-lines', 'word-counter', 'case-converter', 'text-sorter', 'character-counter'],
  },
  {
    ...common,
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    icon: 'diff',
    impl: 'text-diff',
    description: 'Compare two texts and see exactly which lines and words changed.',
    metaDescription:
      'Free online text diff checker. Compare two versions of text side by side and highlight added, removed and changed lines or words.',
    keywords: ['compare text', 'text compare', 'difference checker'],
    steps: ['Paste the original text on the left and the changed text on the right.', 'Choose line or word comparison.', 'Review the highlighted changes.'],
    faq: [
      {
        q: 'What is the difference between line and word mode?',
        a: 'Line mode marks whole lines that changed. Word mode highlights the exact words within the text, which suits prose.',
      },
    ],
    limits: ['Very large inputs (over about 200,000 characters) may be slow.'],
    related: ['remove-duplicate-lines', 'json-formatter', 'text-cleaner', 'word-counter', 'text-sorter'],
  },
];
