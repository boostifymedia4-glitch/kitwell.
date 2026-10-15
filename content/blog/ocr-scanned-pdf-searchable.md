---
title: How to Make a Scanned PDF Searchable with OCR
description: Learn what OCR does, how to tell whether a PDF is a scan, and how to add a searchable text layer to scanned pages in your browser, with tips for better accuracy.
excerpt: A scanned PDF is a stack of pictures. See how OCR turns it into text you can search and copy, and how to get the best results.
imageAlt: A scanned page with a magnifying glass revealing selectable text lines, on a teal background
published: 2026-10-09
updated: 2026-10-15
tool: ocr-pdf
tools: ocr-pdf, scan-to-pdf, extract-pdf-text, images-to-pdf, compress-pdf, compare-pdf, redact-pdf
ctaHeading: Try it yourself
cta: Open <tool_ocr_pdf>OCR PDF</tool_ocr_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

You open a PDF, press Ctrl+F to look for a name, and nothing is found, even though you can see the name on the page. Or you try to copy a paragraph and the selection tool grabs the whole page as a picture. That PDF is a scan: every page is an image of text, not text itself.

Optical character recognition, or OCR, reads the letters in those pictures and gives you real text back. This guide explains how it works, how to run it in your browser without uploading the document, and what to do when the results are not perfect.

:::takeaways
- A scanned PDF is a stack of pictures; OCR reads the letters and adds a text layer you can search and copy.
- The recognition runs in your browser, so the scanned document is never uploaded.
- It reads English printed text; handwriting and other languages are unreliable.
- Scan quality matters more than any setting: 200 to 300 DPI, straight pages and good contrast.
:::

## First, check whether your PDF is really a scan

Not every PDF needs OCR. A quick test: try to select a single word with the mouse, or search for a word you can see. If the word highlights, the PDF already contains text. If you can only drag a box over a whole region, or the search finds nothing, it is a scan.

<tool_extract_pdf_text>Extract PDF Text</tool_extract_pdf_text> gives a clear answer as well. If a file has no selectable text, it says so and explains that reading it needs OCR.

## What OCR actually produces

The OCR tool recognises the text on each page and adds it as an invisible layer behind the picture. The pages look exactly as before, but you can now search them, select words and copy text. You can also download the recognised text as a plain text file.

Because the original page images are kept untouched, nothing about the look of your document changes. The text layer is only as good as the recognition, which is why checking the result matters.

## How to run OCR in your browser

1. Open <tool_ocr_pdf>OCR PDF</tool_ocr_pdf> and add your scanned PDF (up to 100 MB).
2. Choose the quality: Fast (150 DPI), Recommended (200 DPI), or Best for small print (300 DPI). Higher settings read smaller text but take longer.
3. Optionally limit the pages, for example 1-3, 5. Leave it empty to read every page. The option “Skip pages that already have selectable text” saves time on mixed documents.
4. Start recognition. Each page takes a few seconds, and you can cancel at any time.
5. Review the recognised text, then download the searchable PDF or the text file.

## What to know before you start

- English only for now. Text in other languages is misread, and the tool says so up front rather than pretending otherwise.
- The recognition engine (Tesseract, compiled to WebAssembly) and its English data are served from this website and run inside your browser. The first run loads about 3 MB, and your document is never uploaded.
- Large documents are slow, because your own device does the work. For a long scan, process a page range at a time.

## Getting more accurate results

OCR quality depends far more on the scan than on the settings. These habits make the biggest difference:

- Scan at 200 to 300 DPI. Lower resolutions blur small letters together; much higher ones only add file size and processing time.
- Keep the page straight. A skewed page produces more errors, so re-scan if the text slopes noticeably.
- Use good contrast. Dark text on a plain light background works best; shadows, folds and coloured backgrounds hurt.
- Expect trouble with handwriting, very small print and decorative fonts. Recognition of these is unreliable.
- Always check important numbers, such as amounts, dates and reference codes, against the page. A single misread digit can change the meaning.

> Tip: if your scan came from photographs of pages, build it from straight, well-lit pictures with <tool_images_to_pdf>Images to PDF</tool_images_to_pdf> first. Our guide to <post_convert-images-to-pdf>converting images to PDF</post_convert-images-to-pdf> explains the options.

## Which quality setting should you choose?

The three settings trade speed against how small a letter the engine can still read. Fast (150 DPI) is fine for a quick look at a clean page of normal-sized text. Recommended (200 DPI) is the right starting point for most documents: letters, contracts, forms and book pages. Best for small print (300 DPI) is for fine print, footnotes, receipts and anything photographed from a distance, and it takes noticeably longer per page because there is more image to read.

If you are unsure, run Recommended on a page range of two or three pages first. Check those pages carefully, and only switch to Best if small characters are being misread. Re-running a whole long document at a higher setting is slow, so a short test saves time.

## How to check the result

OCR is never perfect, so build a short review into your routine instead of trusting the output blindly:

1. Search the finished PDF for a few words you can see on the page. If they are found, the text layer is aligned and working.
2. Copy a paragraph into a text editor and read it. Look for letters swapped with similar shapes, such as l, 1 and I, or 0 and O.
3. Check every number that matters: amounts, dates, account or reference codes, and phone numbers.
4. For contracts or legal documents, treat the text layer as a search aid and keep the original page images as the authoritative version.

## Scanned from a phone? Prepare the pages first

Photos of pages work, but they give weaker results than flat scans, because of perspective, shadows and uneven light. Straighten and crop each picture, then turn the set into a PDF with <tool_scan_to_pdf>Scan to PDF</tool_scan_to_pdf>. Its black and white document style evens out shadows and makes printed text darker, which gives the OCR engine cleaner letters to read. Run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf> on the result.

## What to do next

- Make the file smaller with <tool_compress_pdf>Compress PDF</tool_compress_pdf>. Scans are often large; see <post_compress-pdf-without-losing-quality>how to compress a PDF without losing quality</post_compress-pdf-without-losing-quality>.
- Compare two versions of a document with <tool_compare_pdf>Compare PDF</tool_compare_pdf>. Comparing text works once both files have a text layer.
- Hide private details before sharing with <tool_redact_pdf>Redact PDF</tool_redact_pdf>.

:::faq Frequently asked questions
Q: Is my scanned document sent to an OCR service?
A: No. The recognition engine and its data run inside your browser, so the document stays on your device.

Q: Does OCR change how my pages look?
A: No. The original page images are kept as they are, and the recognised text is added as an invisible layer so that it can be searched and copied.

Q: How long does OCR take?
A: A few seconds per page on a typical computer, longer at the highest quality setting and on large pages. Because your own device does the work, a slow phone or a very long scan will take more time. You can cancel at any time.

Q: Will the file get bigger after OCR?
A: Slightly, because the text layer is added to the existing page images. If size matters, run Compress PDF afterwards.

Q: What if only some pages are scans?
A: Use the option to skip pages that already have selectable text. Those pages are left untouched and only the scanned pages are processed.

Q: Can it read handwriting or languages other than English?
A: Not reliably. The tool currently recognises English printed text. Handwriting and other languages produce many mistakes, so treat any result for them with caution.

:::
