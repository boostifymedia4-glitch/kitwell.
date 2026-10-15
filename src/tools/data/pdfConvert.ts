import type { FaqItem, ToolDef } from '../types';

/**
 * Converters added to the PDF category: scans, HTML, Word, PowerPoint and Excel to PDF, PDF to Markdown and Repair PDF.
 * All of them run in the browser (no upload). The limits below are what the code really does; keep them in step with
 * src/lib/docPdf.ts, docx.ts, xlsx.ts, pptxPdf.ts, htmlDoc.ts, pdfMarkdown.ts and pdfRepair.ts.
 */
const privacyFaq: FaqItem = {
  q: 'Is my file uploaded anywhere?',
  a: 'No. The file is read and converted by your browser. This tool does not send it to a server.',
};

const fontFaq: FaqItem = {
  q: 'Which languages and fonts are supported in the PDF?',
  a: 'The PDF is written with Noto Sans, which covers Latin (including Polish, Czech, Romanian and Turkish letters), Cyrillic, Greek, Vietnamese and Devanagari text. Arabic, Hebrew, Thai, Chinese, Japanese and Korean text is not supported yet: those characters appear as question marks and the tool tells you how many were affected. The original fonts of the document are not kept.',
};

const common = { category: 'pdf' as const, fileTool: true };

export const pdfConvertTools: ToolDef[] = [
  {
    ...common,
    slug: 'scan-to-pdf',
    group: 'Convert to PDF',
    convert: ['IMG', 'PDF'],
    name: 'Scan to PDF',
    icon: 'file-image',
    impl: 'scan-to-pdf',
    description: 'Turn photos or scans of paper pages into one PDF, with optional clean-up for readability.',
    metaDescription:
      'Scan to PDF online: combine photos or scans of paper pages into one PDF, set the page order and clean up shadows with a black and white document mode.',
    keywords: ['scan to pdf', 'scan document', 'photo to pdf', 'camera to pdf', 'document scanner'],
    steps: [
      'Add photos or scans of your pages, or take a photo if your phone or tablet supports it.',
      'Put the pages in order and choose the page size and a clean-up style.',
      'Create the PDF and download it.',
    ],
    faq: [
      {
        q: 'Does this recognise the text on the page?',
        a: 'No. Scan to PDF turns the pictures into PDF pages and can clean them up, but the text stays part of the image. To make it searchable, run the result through OCR PDF.',
      },
      {
        q: 'Can I use my phone camera?',
        a: 'On phones and tablets whose browser supports it, the Take a photo button opens the camera. Otherwise choose photos that are already saved on your device.',
      },
      {
        q: 'What do the clean-up styles do?',
        a: 'Original keeps the colours. Grayscale removes colour. Black and white document turns the page into pure black text on white paper and evens out shadows and uneven lighting, which suits printed pages and notes but not photographs.',
      },
      privacyFaq,
    ],
    limits: [
      'Maximum 25 MB per image and 100 images per PDF.',
      'Large photos are scaled down to about A4 size at 300 dpi to keep the PDF small.',
      'Some phone formats such as HEIC cannot be read by browsers; save them as JPG first.',
    ],
    related: ['images-to-pdf', 'jpg-to-pdf', 'ocr-pdf', 'compress-pdf', 'merge-pdf'],
  },
  {
    ...common,
    slug: 'html-to-pdf',
    group: 'Convert to PDF',
    convert: ['HTML', 'PDF'],
    name: 'HTML to PDF',
    icon: 'file-text',
    impl: 'html-to-pdf',
    description: 'Convert an HTML file or pasted HTML into a PDF with selectable text.',
    metaDescription:
      'HTML to PDF online: convert an HTML file or pasted HTML code into a PDF with real, selectable text, headings, lists, tables and embedded pictures.',
    keywords: ['html to pdf', 'convert html pdf', 'webpage to pdf', 'html file to pdf'],
    steps: [
      'Choose an HTML file or paste your HTML.',
      'Pick the page size.',
      'Convert it and download the PDF.',
    ],
    faq: [
      {
        q: 'Can I enter a web page address?',
        a: 'No. Fetching other websites would require sending the address to a server, and a page rarely converts well without its styles. Save the page as an HTML file in your browser and use that file, or paste its HTML.',
      },
      {
        q: 'Will the PDF look like the web page?',
        a: 'No, not exactly. The tool reads the structure of the document (headings, paragraphs, lists, tables, links, bold and italic text and embedded pictures) and lays it out as a simple document. CSS styles, scripts, web fonts, columns and positioned elements are not applied.',
      },
      {
        q: 'Is it safe to convert HTML that I do not trust?',
        a: 'The HTML is read as inert text: scripts do not run and nothing is loaded from the internet. Only pictures embedded in the HTML itself are used.',
      },
      fontFaq,
      privacyFaq,
    ],
    limits: [
      'Maximum 10 MB of HTML.',
      'Only pictures embedded in the HTML (data: addresses) are included; pictures and styles loaded from other websites are skipped, not fetched.',
      'Scripts, forms, frames, canvas, video and SVG graphics are not converted.',
    ],
    related: ['word-to-pdf', 'markdown-previewer', 'html-encoder-decoder', 'extract-pdf-text', 'pdf-to-markdown'],
  },
  {
    ...common,
    slug: 'word-to-pdf',
    group: 'Convert to PDF',
    convert: ['DOCX', 'PDF'],
    name: 'Word to PDF',
    icon: 'file-text',
    impl: 'word-to-pdf',
    description: 'Convert a Word (DOCX) document to PDF, keeping headings, lists, tables and pictures.',
    metaDescription:
      'Word to PDF online: convert a DOCX document to a PDF with selectable text, headings, lists, tables, links and pictures. The file is converted in your browser.',
    keywords: ['word to pdf', 'docx to pdf', 'convert word document', 'doc to pdf'],
    steps: ['Choose a DOCX file.', 'Pick the page size, or keep the one from the document.', 'Convert it and download the PDF.'],
    faq: [
      {
        q: 'Will the PDF look exactly like the document in Word?',
        a: 'No. Kitwell does not use Microsoft Word or LibreOffice. It reads the document’s content and structure and lays it out itself, so fonts, spacing and page breaks differ from Word. Check the result before you send it.',
      },
      {
        q: 'What is converted, and what is not?',
        a: 'Converted: text with bold, italic, underline and links, headings, bulleted and numbered lists, tables, JPEG and PNG pictures, line and page breaks, alignment and the page orientation. Not converted: headers and footers, footnotes, text boxes, equations, charts, shapes and other picture formats.',
      },
      {
        q: 'Can I convert an old .doc file?',
        a: 'No. Open it in Word and save it as a DOCX file first.',
      },
      fontFaq,
      privacyFaq,
    ],
    limits: [
      'DOCX files only, maximum 50 MB. Old .doc files and password-protected documents are not supported.',
      'Layout is approximate: columns, text wrapping around pictures, headers, footers and footnotes are not reproduced.',
      'Fonts of the original are replaced by Noto Sans.',
    ],
    related: ['html-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf', 'merge-pdf', 'compress-pdf'],
  },
  {
    ...common,
    slug: 'powerpoint-to-pdf',
    group: 'Convert to PDF',
    convert: ['PPTX', 'PDF'],
    name: 'PowerPoint to PDF',
    icon: 'file-text',
    impl: 'powerpoint-to-pdf',
    description: 'Convert a PowerPoint (PPTX) presentation to PDF with one page per slide.',
    metaDescription:
      'PowerPoint to PDF online: convert a PPTX presentation to a PDF with one page per slide, keeping slide size, text, pictures and simple shapes. Done in your browser.',
    keywords: ['powerpoint to pdf', 'pptx to pdf', 'slides to pdf', 'presentation to pdf'],
    steps: ['Choose a PPTX file.', 'Convert it.', 'Check the pages and download the PDF.'],
    faq: [
      {
        q: 'Will the slides look exactly like in PowerPoint?',
        a: 'Not exactly. Kitwell draws each slide from its text boxes, pictures, simple shapes and tables. Fonts, gradients, shadows, effects and exact text fitting differ. Always look through the PDF before you use it.',
      },
      {
        q: 'What is not converted?',
        a: 'Charts, SmartArt, video and audio, animations and transitions, speaker notes, gradients, lines and connectors, and pictures in formats other than JPEG and PNG. The tool tells you how many items were left out.',
      },
      {
        q: 'Can I convert an old .ppt file?',
        a: 'No. Open it in PowerPoint and save it as a PPTX file first.',
      },
      fontFaq,
      privacyFaq,
    ],
    limits: [
      'PPTX files only, maximum 100 MB and 300 slides. Old .ppt files and password-protected presentations are not supported.',
      'Each slide becomes one page with the slide’s own size and orientation.',
      'Text that does not fit its box is shrunk, down to half of its size.',
    ],
    related: ['word-to-pdf', 'excel-to-pdf', 'merge-pdf', 'compress-pdf', 'pdf-to-jpg'],
  },
  {
    ...common,
    slug: 'excel-to-pdf',
    group: 'Convert to PDF',
    convert: ['XLSX', 'PDF'],
    name: 'Excel to PDF',
    icon: 'file-text',
    impl: 'excel-to-pdf',
    description: 'Convert an Excel (XLSX) workbook to PDF, with every visible sheet as a table.',
    metaDescription:
      'Excel to PDF online: convert an XLSX workbook to a PDF with every visible sheet as a table of its saved values, numbers and dates. Converted in your browser.',
    keywords: ['excel to pdf', 'xlsx to pdf', 'spreadsheet to pdf', 'convert excel'],
    steps: ['Choose an XLSX file.', 'Convert it.', 'Check the tables and download the PDF.'],
    faq: [
      {
        q: 'Are formulas calculated?',
        a: 'No. The PDF shows the values Excel saved with the file. If a formula cell has no saved value, it is left empty and the tool tells you; open the file in Excel, let it calculate, save it and convert it again.',
      },
      {
        q: 'Will it look like the print layout in Excel?',
        a: 'No. Each visible sheet becomes a simple table that is fitted to the page width. Cell colours, merged cells, column widths, charts, pictures, print areas and page breaks are not kept.',
      },
      {
        q: 'Can I convert an old .xls file?',
        a: 'No. Open it in Excel and save it as an XLSX file first.',
      },
      fontFaq,
      privacyFaq,
    ],
    limits: [
      'XLSX files only, maximum 50 MB. Old .xls files and password-protected workbooks are not supported.',
      'Up to 5,000 rows and 60 columns per sheet; anything beyond that is left out and the tool says so.',
      'Hidden sheets are skipped.',
    ],
    related: ['word-to-pdf', 'powerpoint-to-pdf', 'merge-pdf', 'compress-pdf', 'split-pdf'],
  },
  {
    ...common,
    slug: 'pdf-to-markdown',
    group: 'Convert from PDF',
    convert: ['PDF', 'MD'],
    name: 'PDF to Markdown',
    icon: 'file-text',
    impl: 'pdf-to-markdown',
    description: 'Turn the text of a PDF into a Markdown file with headings, paragraphs and lists.',
    metaDescription:
      'PDF to Markdown online: extract the text of a PDF and download it as a Markdown (.md) file with headings, paragraphs and lists. Works in your browser.',
    keywords: ['pdf to markdown', 'pdf to md', 'convert pdf markdown', 'extract text markdown'],
    steps: ['Choose a PDF.', 'Choose whether to remove repeating page headers, footers and page numbers.', 'Convert it, check the result and download the .md file.'],
    faq: [
      {
        q: 'How are headings and lists found?',
        a: 'Headings are lines set in a larger font than the body text, lists are lines that start with a bullet or a number, and paragraphs are separated by the spacing between lines. This is a good guess, not a guarantee, so check the result.',
      },
      {
        q: 'Why is the result empty for my scanned PDF?',
        a: 'A scan is a picture of a page and has no text to extract. Run OCR PDF first to add a text layer, then convert the result.',
      },
      {
        q: 'What about tables, columns and images?',
        a: 'Tables and columns are not rebuilt: their text appears as ordinary lines, in reading order where possible. Images, links, bold and italic text, footnotes and equations are not carried over.',
      },
      privacyFaq,
    ],
    limits: [
      'Maximum 100 MB per PDF. Password-protected PDFs must be unlocked first.',
      'Only text that is real text in the PDF is converted; scanned pages need OCR PDF first.',
      'The structure is estimated from font sizes and spacing and may be wrong for complex layouts.',
    ],
    related: ['extract-pdf-text', 'ocr-pdf', 'markdown-previewer', 'html-to-pdf', 'pdf-to-jpg'],
  },
  {
    ...common,
    slug: 'repair-pdf',
    group: 'Optimize PDF',
    name: 'Repair PDF',
    icon: 'file-text',
    impl: 'repair-pdf',
    description: 'Try to repair a PDF that will not open by rebuilding its internal structure.',
    metaDescription:
      'Repair PDF online: rebuild the structure of a damaged PDF that will not open, for example one with a broken cross-reference table or a cut-off end. Works in your browser.',
    keywords: ['repair pdf', 'fix corrupted pdf', 'recover pdf', 'damaged pdf', 'pdf will not open'],
    steps: ['Choose the damaged PDF.', 'Start the repair.', 'If the tool produced a file, check it and download it.'],
    faq: [
      {
        q: 'What kinds of damage can be repaired?',
        a: 'Damage to the file’s structure: a missing or wrong index of objects (cross-reference table), a missing trailer, junk before the start, or a broken page list. If the file was cut off, the pages that were saved before the cut can be recovered.',
      },
      {
        q: 'What cannot be recovered?',
        a: 'Content that is no longer in the file. Pages, images or fonts that are missing or damaged cannot be brought back, and some files are beyond repair. The tool tells you how many pages it kept and says so when it cannot produce a usable file; it never offers a download that it did not create.',
      },
      {
        q: 'What if my PDF opens fine?',
        a: 'Then there is nothing to repair. The tool says so and offers a cleaned copy of the file.',
      },
      privacyFaq,
    ],
    limits: [
      'Maximum 100 MB per PDF. Password-protected PDFs must be unlocked first.',
      'Damage inside compressed object streams cannot be rebuilt by this tool.',
      'A repaired file may have fewer pages than the original, and the page order can change after a heavy repair.',
    ],
    related: ['compress-pdf', 'pdf-viewer', 'unlock-pdf', 'pdf-to-pdfa', 'pdf-metadata-viewer'],
  },
  {
    ...common,
    slug: 'pdf-to-pdfa',
    group: 'Optimize PDF',
    name: 'PDF to PDF/A',
    icon: 'badge-check',
    impl: 'pdf-to-pdfa',
    description: 'Prepare a PDF as PDF/A-2b for archiving, keeping the text or using page pictures.',
    metaDescription:
      'PDF to PDF/A online: prepare a PDF as PDF/A-2b for archiving with PDF/A identification, metadata and a colour profile. Keeps text when possible. Runs in your browser.',
    keywords: ['pdf to pdf/a', 'pdfa', 'pdf/a-2b', 'archive pdf', 'convert pdf to pdfa', 'long term archiving'],
    steps: [
      'Choose a PDF. A password-protected file must be unlocked first.',
      'Choose how to convert: keep the text and fonts, or turn the pages into pictures.',
      'Convert it, read what was done and download the PDF/A file.',
    ],
    faq: [
      {
        q: 'Is the result a certified PDF/A file?',
        a: 'No. Kitwell prepares your PDF as PDF/A-2b, the basic archival level, and checks its own work against the rules it applies. It does not include a full PDF/A validator. If you must prove compliance, check the file with a validator such as veraPDF.',
      },
      {
        q: 'What is the difference between the two ways to convert?',
        a: 'Keep text and fonts changes only the structure and metadata of the file, so the text stays selectable. It works only when every font is embedded and the file uses no CMYK colour. Turn pages into pictures renders each page as an image and builds a new PDF/A from them. That always works, but the text can no longer be selected and the file is larger.',
      },
      {
        q: 'Why was my PDF refused when I chose to keep the text?',
        a: 'PDF/A needs every font to be embedded in the file, and it does not allow CMYK colour without a CMYK profile, LZW compression or annotations without an appearance. These cannot be fixed without changing the pages, so the tool lists what it found instead of faking a result. You can still use the picture mode.',
      },
      {
        q: 'What does the tool change in the file?',
        a: 'It adds the PDF/A identification and XMP metadata, an sRGB colour profile as the output intent and a file identifier. It removes JavaScript, forbidden actions, attachments, extra document information and annotation settings that PDF/A does not allow.',
      },
      privacyFaq,
    ],
    limits: [
      'Maximum 100 MB per PDF. Password-protected PDFs must be unlocked first, because a PDF/A file cannot be encrypted.',
      'Keep text and fonts works only when every font is embedded and the file has no CMYK colour or LZW compression.',
      'Turning pages into pictures is limited to 200 pages. The text is no longer selectable and the file gets larger.',
      'The result is PDF/A-2b prepared by Kitwell and checked against the rules it applies; it is not validated by a full PDF/A validator.',
    ],
    related: ['compress-pdf', 'repair-pdf', 'ocr-pdf', 'pdf-metadata-viewer', 'unlock-pdf'],
  },
];
