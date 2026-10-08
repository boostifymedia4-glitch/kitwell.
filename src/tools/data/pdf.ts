import type { FaqItem, ToolDef } from '../types';

const privacyFaq: FaqItem = {
  q: 'Is my PDF uploaded anywhere?',
  a: 'No. The PDF is read and rewritten by your browser. This tool does not send the file to a server.',
};

const encryptedFaq: FaqItem = {
  q: 'Can it open password-protected PDFs?',
  a: 'No. Encrypted PDFs are detected and rejected with a clear message. Remove the password first with our Unlock PDF tool.',
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
    group: 'Convert to PDF',
    convert: ['JPG', 'PDF'],
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
    group: 'Convert to PDF',
    convert: ['PNG', 'PDF'],
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
    group: 'Convert to PDF',
    convert: ['IMG', 'PDF'],
    name: 'Images to PDF',
    icon: 'layers',
    impl: 'images-to-pdf',
    config: { accept: 'any' },
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
    group: 'Organize PDF',
    name: 'Merge PDF',
    icon: 'merge',
    impl: 'pdf-merge',
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
    related: ['split-pdf', 'rotate-pdf', 'extract-pdf-pages', 'reorder-pdf-pages', 'images-to-pdf', 'add-page-numbers', 'protect-pdf'],
  },
  {
    ...common,
    slug: 'split-pdf',
    group: 'Organize PDF',
    name: 'Split PDF',
    icon: 'split',
    impl: 'pdf-split',
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
    related: ['extract-pdf-pages', 'merge-pdf', 'rotate-pdf', 'reorder-pdf-pages', 'pdf-to-jpg', 'remove-pdf-pages'],
  },
  {
    ...common,
    slug: 'rotate-pdf',
    group: 'Organize PDF',
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
    related: ['reorder-pdf-pages', 'extract-pdf-pages', 'merge-pdf', 'split-pdf', 'pdf-viewer', 'crop-pdf'],
  },
  {
    ...common,
    slug: 'extract-pdf-pages',
    group: 'Organize PDF',
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
    related: ['split-pdf', 'reorder-pdf-pages', 'merge-pdf', 'rotate-pdf', 'pdf-to-jpg', 'remove-pdf-pages'],
  },
  {
    ...common,
    slug: 'reorder-pdf-pages',
    group: 'Organize PDF',
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
    related: ['extract-pdf-pages', 'rotate-pdf', 'merge-pdf', 'split-pdf', 'pdf-viewer', 'remove-pdf-pages'],
  },
  {
    ...common,
    slug: 'pdf-to-jpg',
    group: 'Convert from PDF',
    convert: ['PDF', 'JPG'],
    name: 'PDF to JPG',
    icon: 'file-text',
    impl: 'pdf-to-image',
    config: { format: 'jpeg' },
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
    related: ['pdf-to-png', 'jpg-to-pdf', 'split-pdf', 'pdf-viewer', 'image-compressor', 'extract-pdf-text'],
  },
  {
    ...common,
    slug: 'pdf-to-png',
    group: 'Convert from PDF',
    convert: ['PDF', 'PNG'],
    name: 'PDF to PNG',
    icon: 'file-text',
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
    group: 'View and inspect',
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
    related: ['pdf-metadata-viewer', 'rotate-pdf', 'extract-pdf-pages', 'pdf-to-jpg', 'merge-pdf', 'extract-pdf-text'],
  },
  {
    ...common,
    slug: 'pdf-metadata-viewer',
    group: 'View and inspect',
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
    related: ['pdf-viewer', 'merge-pdf', 'split-pdf', 'extract-pdf-pages', 'rotate-pdf', 'edit-pdf-metadata'],
  },
  {
    ...common,
    slug: 'remove-pdf-pages',
    group: 'Organize PDF',
    name: 'Remove PDF Pages',
    icon: 'trash',
    impl: 'pdf-organize',
    config: { mode: 'remove' },
    description: 'Delete the pages you do not need and save the rest as a new PDF.',
    metaDescription:
      'Remove pages from a PDF online for free. Select pages visually or by range, delete them and download the rest. Processed in your browser.',
    keywords: ['delete pdf pages', 'remove pages from pdf', 'cut pages out of pdf'],
    steps: [
      'Add a PDF; its pages appear as thumbnails.',
      'Click the pages you want to delete, or type a range such as 2, 5-7.',
      'Remove them and download the new PDF.',
    ],
    faq: [
      { q: 'Does it change my original file?', a: 'No. You get a new PDF without the selected pages. Your original stays as it was.' },
      { q: 'Can I remove every page?', a: 'No. At least one page has to stay.' },
      encryptedFaq,
    ],
    limits: pdfLimits,
    related: ['extract-pdf-pages', 'reorder-pdf-pages', 'split-pdf', 'merge-pdf', 'rotate-pdf'],
  },
  {
    ...common,
    slug: 'add-page-numbers',
    group: 'Edit PDF',
    name: 'Add Page Numbers',
    icon: 'hash',
    impl: 'pdf-page-numbers',
    description: 'Number the pages of a PDF with your choice of position, format and style.',
    metaDescription:
      'Add page numbers to a PDF online for free. Choose the position, a format such as “Page 1 of 10”, the start number and font size. Runs in your browser.',
    keywords: ['number pdf pages', 'pdf page numbering', 'insert page numbers pdf'],
    steps: [
      'Add a PDF.',
      'Choose where the numbers go, their format, and which pages to number.',
      'Add the numbers and download the PDF.',
    ],
    faq: [
      { q: 'Can I skip the cover page?', a: 'Yes. Set “First page to number” to 2, then choose which number it should show.' },
      { q: 'Does it work on rotated pages?', a: 'Yes. Numbers are placed relative to what you see on screen, including pages that are rotated.' },
      { q: 'Which font is used?', a: 'Helvetica, which covers digits and Latin letters.' },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Numbers are drawn on top of each page, never behind existing content.', 'Uses the built-in Helvetica font.'],
    related: ['watermark-pdf', 'crop-pdf', 'merge-pdf', 'reorder-pdf-pages', 'remove-pdf-pages'],
  },
  {
    ...common,
    slug: 'watermark-pdf',
    group: 'Edit PDF',
    name: 'Watermark PDF',
    icon: 'stamp',
    impl: 'pdf-watermark',
    description: 'Stamp text or an image across your PDF pages with adjustable opacity and angle.',
    metaDescription:
      'Add a watermark to a PDF online for free. Stamp text or an image, centred or tiled, with custom opacity and rotation. Processed in your browser.',
    keywords: ['pdf watermark', 'stamp pdf', 'add text to pdf pages'],
    steps: [
      'Add a PDF.',
      'Choose a text or image watermark, then set its size, opacity, angle and layout.',
      'Apply it to all pages or a selection, then download.',
    ],
    faq: [
      {
        q: 'Can the watermark be removed?',
        a: 'It is drawn on top of the page and is not a security feature. Anyone with a PDF editor can remove it. For stronger protection, combine it with Protect PDF.',
      },
      {
        q: 'Can I use Urdu, Arabic or other alphabets?',
        a: 'Not as typed text, because PDF’s built-in fonts only cover Latin letters. Make a transparent PNG of your text and use the image option instead.',
      },
      { q: 'Is the watermark in front of or behind the page text?', a: 'In front. Lower the opacity so the page stays readable.' },
      encryptedFaq,
    ],
    limits: [
      ...pdfLimits,
      'Text watermarks support Latin letters, digits and common symbols only.',
      'Watermark images: PNG or JPG, up to 5 MB.',
      'The mark is drawn on top of existing page content.',
    ],
    related: ['add-page-numbers', 'protect-pdf', 'crop-pdf', 'merge-pdf', 'image-watermark'],
  },
  {
    ...common,
    slug: 'crop-pdf',
    group: 'Edit PDF',
    name: 'Crop PDF',
    icon: 'crop',
    impl: 'pdf-crop',
    description: 'Trim margins or keep a chosen area on every page, with a live page preview.',
    metaDescription:
      'Crop PDF pages online for free. Drag a crop box on a page preview or type margins, then apply it to all or selected pages. Runs in your browser.',
    keywords: ['trim pdf margins', 'crop pdf pages', 'cut pdf borders'],
    steps: [
      'Add a PDF and pick a page to preview.',
      'Drag the box or type margins to select the area to keep.',
      'Choose which pages to crop, then download.',
    ],
    faq: [
      {
        q: 'Is the cropped-away content deleted?',
        a: 'No. Cropping changes the visible area of each page, but the content outside it is still inside the file. Do not rely on cropping to hide sensitive information.',
      },
      {
        q: 'What if my pages have different sizes?',
        a: 'The same proportions are applied to every page you choose, so pages of different sizes are trimmed by the same percentage.',
      },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Cropping hides content; it does not delete it.', 'The crop area is a share of each page, not a fixed size in millimetres.'],
    related: ['rotate-pdf', 'add-page-numbers', 'extract-pdf-pages', 'pdf-viewer', 'image-cropper'],
  },
  {
    ...common,
    slug: 'edit-pdf-metadata',
    group: 'Edit PDF',
    name: 'Edit PDF Metadata',
    icon: 'pencil',
    impl: 'pdf-metadata-edit',
    description: 'Change a PDF’s title, author, subject and keywords, or remove all metadata.',
    metaDescription:
      'Edit PDF metadata online for free. Change the title, author, subject and keywords, or strip all document properties. Processed in your browser.',
    keywords: ['pdf properties', 'change pdf author', 'remove pdf metadata'],
    steps: [
      'Add a PDF; its current properties are filled in.',
      'Edit the fields, or choose Remove all metadata.',
      'Save and download the updated PDF.',
    ],
    faq: [
      {
        q: 'What does “Remove all metadata” remove?',
        a: 'The document information (title, author, subject, keywords, creator, producer and dates) and the embedded XMP metadata. It does not touch the page text, images or comments.',
      },
      {
        q: 'Why edit metadata?',
        a: 'To fix a wrong title shown in browser tabs and search results, to credit the right author, or to strip personal details before sharing a file.',
      },
      { q: 'Does it support non-Latin text?', a: 'Yes. Titles and authors in Urdu, Arabic, Chinese and other scripts are saved correctly.' },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Only document-level properties are changed. Comments, form data and page content stay as they are.'],
    related: ['pdf-metadata-viewer', 'protect-pdf', 'extract-pdf-text', 'merge-pdf', 'add-page-numbers'],
  },
  {
    ...common,
    slug: 'protect-pdf',
    group: 'Secure PDF',
    name: 'Protect PDF',
    icon: 'lock',
    impl: 'pdf-protect',
    description: 'Lock a PDF with a password using AES-256 encryption.',
    metaDescription:
      'Protect a PDF with a password online for free. AES-256 encryption happens in your browser; your file and password are never uploaded.',
    keywords: ['password protect pdf', 'encrypt pdf', 'lock pdf'],
    steps: [
      'Add a PDF.',
      'Type a password twice and choose what readers may do (print, copy, edit).',
      'Protect it and download the encrypted copy.',
    ],
    faq: [
      {
        q: 'How strong is the protection?',
        a: 'Files are encrypted with AES-256, the strongest standard PDF encryption. In practice, safety depends on your password: use a long one that you do not use anywhere else.',
      },
      {
        q: 'What if I forget the password?',
        a: 'It cannot be recovered. Nothing is stored or sent anywhere, and there is no reset. Keep your original file and the password somewhere safe.',
      },
      {
        q: 'Are the print, copy and edit options enforced?',
        a: 'They are requests that most PDF programs respect, but they are not unbreakable. The password is what really protects the file.',
      },
      { q: 'Is my password uploaded?', a: 'No. Encryption happens in your browser.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'Passwords: up to 127 standard characters (letters, digits and symbols).',
      'A PDF that already has a password must be unlocked first.',
      'Very old PDF readers (from before about 2008) may not open AES-256 files.',
    ],
    related: ['unlock-pdf', 'watermark-pdf', 'edit-pdf-metadata', 'merge-pdf', 'password-generator'],
  },
  {
    ...common,
    slug: 'unlock-pdf',
    group: 'Secure PDF',
    name: 'Unlock PDF',
    icon: 'lock-open',
    impl: 'pdf-unlock',
    description: 'Remove the password from a PDF you have access to, so it opens freely.',
    metaDescription:
      'Unlock a password-protected PDF online for free. Enter the password to save an unprotected copy, processed in your browser and never uploaded.',
    keywords: ['remove pdf password', 'decrypt pdf', 'unprotect pdf'],
    steps: [
      'Add the protected PDF.',
      'Enter its password if asked. PDFs that only restrict printing or copying need none.',
      'Download the unlocked copy.',
    ],
    faq: [
      {
        q: 'Can it unlock a PDF if I forgot the password?',
        a: 'No. This tool never guesses or cracks passwords. It removes protection only when you give the correct password, or when the file merely restricts actions such as printing.',
      },
      { q: 'Is this allowed?', a: 'Use it only on files you own or have permission to open. You are responsible for how you use the result.' },
      { q: 'Is my password uploaded?', a: 'No. Everything happens in your browser.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'Supports standard PDF password protection (RC4 and AES).',
      'A digital signature becomes invalid once the file is re-saved.',
      'Certificate-based or DRM-protected files are not supported.',
    ],
    related: ['protect-pdf', 'edit-pdf-metadata', 'merge-pdf', 'split-pdf', 'pdf-viewer'],
  },
  {
    ...common,
    slug: 'extract-pdf-text',
    group: 'Convert from PDF',
    name: 'Extract Text from PDF',
    icon: 'file-text',
    convert: ['PDF', 'TXT'],
    impl: 'pdf-extract-text',
    description: 'Copy all the selectable text out of a PDF, page by page.',
    metaDescription:
      'Extract text from a PDF online for free. Get the selectable text of every page or a range, then copy it or save it as .txt. Runs in your browser.',
    keywords: ['pdf to text', 'copy text from pdf', 'pdf text extractor'],
    steps: [
      'Add a PDF.',
      'Choose all pages or a range, and whether to mark page breaks.',
      'Copy the text or download it as a .txt file.',
    ],
    faq: [
      {
        q: 'Why is the result empty?',
        a: 'The PDF is probably a scan, which is a picture of text rather than real text. Reading it needs OCR (text recognition), which this tool does not do.',
      },
      { q: 'Is the layout kept?', a: 'Lines and paragraphs are rebuilt as well as possible, but columns, tables and footnotes may come out in a different order.' },
      encryptedFaq,
    ],
    limits: [...pdfLimits, 'Only real text is extracted; scanned pages need OCR.', 'Reading order follows the PDF and can differ from the visual order in complex layouts.'],
    related: ['pdf-to-jpg', 'pdf-viewer', 'pdf-metadata-viewer', 'word-counter', 'text-cleaner'],
  },
];
