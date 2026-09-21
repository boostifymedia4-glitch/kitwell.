import type { FaqItem, ToolDef } from '../types';

const privacyFaq: FaqItem = {
  q: 'Is my PDF uploaded anywhere?',
  a: 'No. The PDF is read and rewritten by your browser. This tool does not send the file to a server.',
};

const encryptedFaq: FaqItem = {
  q: 'Can it open password-protected PDFs?',
  a: 'No. Encrypted PDFs are detected and rejected with a clear message. Remove the password in the app that created it first.',
};

const common = { category: 'pdf' as const, fileTool: true };

const pdfLimits = [
  'Maximum 100 MB per PDF.',
  'Password-protected (encrypted) PDFs are not supported.',
  'Very large or complex PDFs depend on your device memory.',
];

export const pdfTools: ToolDef[] = [
  {
    ...common,
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    icon: 'file-image',
    impl: 'images-to-pdf',
    config: { accept: 'jpeg' },
    description: 'Turn JPG photos into a PDF, one image per page.',
    metaDescription:
      'Convert JPG to PDF online for free. Choose page size, orientation and margins. JPEG data is embedded without re-compression.',
    keywords: ['jpeg to pdf', 'photo to pdf', 'convert jpg pdf'],
    steps: [
      'Add your JPG files and drag or use the arrows to set their order.',
      'Choose the page size, orientation and margin.',
      'Create the PDF and download it.',
    ],
    faq: [
      {
        q: 'Does the image quality drop?',
        a: 'No. JPG files are embedded into the PDF as they are, without re-compression.',
      },
      privacyFaq,
    ],
    limits: ['Maximum 25 MB per image and 100 images per PDF.', 'Only JPG images are accepted here; use Images to PDF for mixed formats.'],
    related: ['images-to-pdf', 'png-to-pdf', 'merge-pdf', 'pdf-to-jpg', 'image-compressor'],
  },
  {
    ...common,
    slug: 'png-to-pdf',
    name: 'PNG to PDF',
    icon: 'file-image',
    impl: 'images-to-pdf',
    config: { accept: 'png' },
    description: 'Turn PNG images into a PDF, keeping transparency.',
    metaDescription:
      'Convert PNG to PDF online for free. Choose page size and margins; transparency is preserved. Runs in your browser.',
    keywords: ['png to pdf converter', 'screenshot to pdf'],
    steps: ['Add your PNG files and set their order.', 'Choose the page size, orientation and margin.', 'Create the PDF and download it.'],
    faq: [
      {
        q: 'Is transparency preserved?',
        a: 'Yes. PNG images are embedded with their alpha channel, so transparent areas show the white page behind them.',
      },
      privacyFaq,
    ],
    limits: ['Maximum 25 MB per image and 100 images per PDF.', 'Only PNG images are accepted here; use Images to PDF for mixed formats.'],
    related: ['images-to-pdf', 'jpg-to-pdf', 'merge-pdf', 'pdf-to-png', 'image-compressor'],
  },
  {
    ...common,
    slug: 'images-to-pdf',
    name: 'Images to PDF',
    icon: 'file-image',
    impl: 'images-to-pdf',
    config: { accept: 'any' },
    popular: true,
    description: 'Combine JPG and PNG images into a single PDF in the order you choose.',
    metaDescription:
      'Combine multiple images into one PDF online for free. Reorder pages, choose page size and margins. Processed in your browser.',
    keywords: ['combine images to pdf', 'multiple images to pdf', 'photos to pdf'],
    steps: [
      'Add JPG and PNG images (drop several at once).',
      'Reorder them, and choose page size, orientation and margin.',
      'Create the PDF and download it.',
    ],
    faq: [
      {
        q: 'Which image formats work?',
        a: 'JPG and PNG are embedded directly. WebP, GIF and BMP are converted to PNG first if your browser can decode them.',
      },
      {
        q: 'What does "Fit to image" do?',
        a: 'Each page is sized to its image, so nothing is scaled or padded. Choose A4 or Letter for standard document pages.',
      },
      privacyFaq,
    ],
    limits: ['Maximum 25 MB per image and 100 images per PDF.'],
    related: ['jpg-to-pdf', 'png-to-pdf', 'merge-pdf', 'reorder-pdf-pages', 'image-compressor'],
  },
  {
    ...common,
    slug: 'merge-pdf',
    name: 'Merge PDF',
    icon: 'merge',
    impl: 'pdf-merge',
    popular: true,
    description: 'Combine several PDF files into one document in your chosen order.',
    metaDescription:
      'Merge PDF files online for free. Combine multiple PDFs into one, reorder them, and download instantly. Processed in your browser.',
    keywords: ['combine pdf', 'join pdf', 'merge pdf files'],
    steps: [
      'Add two or more PDF files.',
      'Put them in the order you want using the arrows.',
      'Merge and download the combined PDF.',
    ],
    faq: [
      {
        q: 'Are bookmarks and form fields kept?',
        a: 'Pages are copied with their visible content and links. Document-level bookmarks and interactive form data are not carried across.',
      },
      encryptedFaq,
      privacyFaq,
    ],
    limits: [...pdfLimits, 'Bookmarks/outlines and form fields of the source files are not merged.'],
    related: ['split-pdf', 'rotate-pdf', 'extract-pdf-pages', 'reorder-pdf-pages', 'images-to-pdf'],
  },
  {
    ...common,
    slug: 'split-pdf',
    name: 'Split PDF',
    icon: 'split',
    impl: 'pdf-split',
    popular: true,
    description: 'Split a PDF by page ranges, into single pages, or into fixed-size chunks.',
    metaDescription:
      'Split a PDF online for free. Separate by page ranges, every page, or every N pages and download as a ZIP. Runs in your browser.',
    keywords: ['split pdf', 'separate pdf pages', 'divide pdf'],
    steps: [
      'Add a PDF.',
      'Choose how to split: custom ranges like 1-3, 4-6, every page, or every N pages.',
      'Split and download the parts individually or as a ZIP.',
    ],
    faq: [
      {
        q: 'How do I write ranges?',
        a: 'Separate output files with commas. Each file can be a range (1-3), a single page (5), or a mix separated by a plus (1-2+7). Example: 1-3, 4-6, 7+9.',
      },
      encryptedFaq,
    ],
    limits: pdfLimits,
    related: ['extract-pdf-pages', 'merge-pdf', 'rotate-pdf', 'reorder-pdf-pages', 'pdf-to-jpg'],
  },
  {
    ...common,
    slug: 'rotate-pdf',
    name: 'Rotate PDF',
    icon: 'rotate',
    impl: 'pdf-organize',
    config: { mode: 'rotate' },
    description: 'Rotate individual pages or the whole PDF, with thumbnail previews.',
    metaDescription:
      'Rotate PDF pages online for free. Turn single pages or all pages 90, 180 or 270 degrees and save a new PDF. Runs in your browser.',
    keywords: ['rotate pdf pages', 'turn pdf sideways'],
    steps: [
      'Add a PDF; its pages appear as thumbnails.',
      'Rotate individual pages, or rotate all at once.',
      'Save the rotated PDF.',
    ],
    faq: [
      {
        q: 'Is the rotation permanent?',
        a: 'It is stored in the new PDF as a page rotation attribute. The page content is not redrawn, so nothing is lost.',
      },
      encryptedFaq,
    ],
    limits: pdfLimits,
    related: ['reorder-pdf-pages', 'extract-pdf-pages', 'merge-pdf', 'split-pdf', 'pdf-viewer'],
  },
  {
    ...common,
    slug: 'extract-pdf-pages',
    name: 'PDF Page Extractor',
    icon: 'file-output',
    impl: 'pdf-organize',
    config: { mode: 'extract' },
    description: 'Pick the pages you need from a PDF and save them as a new document.',
    metaDescription:
      'Extract pages from a PDF online for free. Select pages visually or by range and save a new PDF. Processed in your browser.',
    keywords: ['extract pages from pdf', 'delete pdf pages', 'select pdf pages'],
    steps: [
      'Add a PDF.',
      'Click page thumbnails to select them, or type a range such as 1-3, 8.',
      'Extract and download the new PDF.',
    ],
    faq: [
      {
        q: 'Can I use this to delete pages?',
        a: 'Yes. Select the pages you want to keep and extract them; the rest are left out of the new file.',
      },
      encryptedFaq,
    ],
    limits: pdfLimits,
    related: ['split-pdf', 'reorder-pdf-pages', 'merge-pdf', 'rotate-pdf', 'pdf-to-jpg'],
  },
  {
    ...common,
    slug: 'reorder-pdf-pages',
    name: 'PDF Page Reordering',
    icon: 'arrow-down-up',
    impl: 'pdf-organize',
    config: { mode: 'reorder' },
    description: 'Rearrange, remove and rotate pages visually, then save the result.',
    metaDescription:
      'Reorder PDF pages online for free. Drag or move pages, delete pages you do not need, and save a new PDF. Runs in your browser.',
    keywords: ['rearrange pdf pages', 'reorder pdf', 'organize pdf'],
    steps: [
      'Add a PDF; its pages appear as thumbnails.',
      'Drag pages, or use the arrow buttons, to change their order. Remove pages you do not need.',
      'Save the reordered PDF.',
    ],
    faq: [
      {
        q: 'Can I reorder with the keyboard?',
        a: 'Yes. Use the move-earlier and move-later buttons on each page.',
      },
      encryptedFaq,
    ],
    limits: pdfLimits,
    related: ['extract-pdf-pages', 'rotate-pdf', 'merge-pdf', 'split-pdf', 'pdf-viewer'],
  },
  {
    ...common,
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    icon: 'file-image',
    impl: 'pdf-to-image',
    config: { format: 'jpeg' },
    popular: true,
    description: 'Render PDF pages as JPG images at the resolution you choose.',
    metaDescription:
      'Convert PDF to JPG online for free. Render every page or a selection at up to 300 DPI and download a ZIP. Runs in your browser.',
    keywords: ['pdf to jpeg', 'pdf to image', 'convert pdf pages to jpg'],
    steps: [
      'Add a PDF.',
      'Choose the resolution and, optionally, which pages to convert.',
      'Convert and download images individually or as a ZIP.',
    ],
    faq: [
      {
        q: 'Which resolution should I choose?',
        a: '150 DPI is suitable for screens; 300 DPI for printing. Higher values create larger images and need more memory.',
      },
      {
        q: 'Are pages rendered accurately?',
        a: 'Rendering uses Mozilla’s PDF.js, which handles most PDFs well. Unusual fonts or advanced graphics may differ slightly from other viewers.',
      },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Each page is capped at about 50 megapixels.'],
    related: ['pdf-to-png', 'jpg-to-pdf', 'split-pdf', 'pdf-viewer', 'image-compressor'],
  },
  {
    ...common,
    slug: 'pdf-to-png',
    name: 'PDF to PNG',
    icon: 'file-image',
    impl: 'pdf-to-image',
    config: { format: 'png' },
    description: 'Render PDF pages as sharp, lossless PNG images.',
    metaDescription:
      'Convert PDF to PNG online for free. Render pages at up to 300 DPI as lossless images and download a ZIP. Runs in your browser.',
    keywords: ['pdf to png converter', 'pdf page to image'],
    steps: ['Add a PDF.', 'Choose the resolution and pages.', 'Convert and download images individually or as a ZIP.'],
    faq: [
      {
        q: 'Why choose PNG over JPG?',
        a: 'PNG stays sharp on text and line art and supports transparency. The files are larger than JPG.',
      },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Each page is capped at about 50 megapixels.'],
    related: ['pdf-to-jpg', 'png-to-pdf', 'split-pdf', 'pdf-viewer', 'image-compressor'],
  },
  {
    ...common,
    slug: 'pdf-viewer',
    name: 'PDF Viewer',
    icon: 'eye',
    impl: 'pdf-viewer',
    description: 'Open and read a PDF privately in your browser, with zoom and page navigation.',
    metaDescription:
      'View PDF files online for free. Zoom, jump to a page and read documents in your browser without uploading them anywhere.',
    keywords: ['open pdf online', 'read pdf', 'pdf reader'],
    steps: ['Add a PDF.', 'Scroll or use the page controls to navigate.', 'Zoom in or out as needed.'],
    faq: [
      {
        q: 'Can I edit or annotate the PDF here?',
        a: 'No. This is a read-only viewer. Use the page tools to rotate, reorder or extract pages.',
      },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Read-only: no annotation, form filling or text search.'],
    related: ['pdf-metadata-viewer', 'rotate-pdf', 'extract-pdf-pages', 'pdf-to-jpg', 'merge-pdf'],
  },
  {
    ...common,
    slug: 'pdf-metadata-viewer',
    name: 'PDF Metadata Viewer',
    icon: 'info',
    impl: 'pdf-metadata',
    description: 'Inspect a PDF’s title, author, creation dates, page count, page sizes and version.',
    metaDescription:
      'View PDF metadata online for free. See title, author, producer, dates, page count and page sizes without uploading the file.',
    keywords: ['pdf properties', 'pdf info', 'pdf author'],
    steps: ['Add a PDF.', 'Review the document properties.', 'Copy the details as JSON if you need them.'],
    faq: [
      {
        q: 'Why is some metadata missing?',
        a: 'Many PDFs do not set every field. Only fields actually stored in the file are shown.',
      },
      {
        q: 'Can I remove metadata?',
        a: 'This tool only reads metadata. It does not modify the file.',
      },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Read-only: metadata cannot be edited or removed here.'],
    related: ['pdf-viewer', 'merge-pdf', 'split-pdf', 'extract-pdf-pages', 'rotate-pdf'],
  },
];
