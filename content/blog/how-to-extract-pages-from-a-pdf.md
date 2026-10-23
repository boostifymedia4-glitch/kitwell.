---
title: How to Extract Pages From a PDF and Save Them as a New File
description: Pick the pages you need from a PDF and save them as a new document. Learn page ranges, how extracting differs from splitting and how to keep the order.
excerpt: Select pages by thumbnail or range, save just those pages as a new PDF, and learn when to extract, split or remove pages instead.
imageAlt: Selected pages being lifted out of a stack of PDF pages into a new document on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: extract-pdf-pages
tools: extract-pdf-pages, remove-pdf-pages, split-pdf, reorder-pdf-pages, merge-pdf, compress-pdf
ctaHeading: Try it yourself
cta: Open <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Most PDFs arrive with more pages than you need. A 60-page contract where only the signature page matters, a bank statement where you need one month, a report where a manager asked for pages 4 to 9: sending the whole file wastes the reader’s time and sometimes shares information they were never meant to see.

Extracting pages solves this. You choose the pages you want, and the tool writes them into a new PDF. This guide shows how to do it, how page ranges work, and how extracting relates to splitting and removing pages.

:::takeaways
- Extracting creates a new PDF that contains only the pages you chose. Your original is not changed.
- Choose pages by clicking thumbnails or by typing a range such as 1-3, 8.
- Extracted pages keep the order they had in the original document.
- Extract the pages to keep, or use Remove PDF Pages when it is easier to name the pages to drop.
- Check the result before you send it, because the pages you left out are not in the new file at all.
:::

## What “extract” means

A PDF is a list of pages. Extracting builds a new list that contains a copy of some of them. The text stays real, selectable text, the pictures keep their quality and the page layout is untouched, because the pages are copied as they are rather than redrawn.

This is different from converting pages to pictures. If you want images, use <tool_pdf_to_jpg>PDF to JPG</tool_pdf_to_jpg>; our guide to <post_how-to-convert-pdf-to-jpg>converting PDF to JPG</post_how-to-convert-pdf-to-jpg> explains resolution and page ranges. If you want a PDF with fewer pages, extraction is the right operation.

## How to extract pages in your browser

<tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> works inside your browser tab, so the PDF is read from your device. The steps:

1. Open the tool and add your PDF (up to 100 MB). If it is password-protected, unlock it first.
2. Wait for the page thumbnails to appear.
3. Select the pages you want by clicking their thumbnails, or type a range in the range field and press Apply range.
4. Check the count shown under the field. It tells you how many pages are selected.
5. Press Extract and download the new PDF.

## How page ranges work

Ranges are the fastest way to select many pages. Separate items with commas and use a dash for a stretch of pages:

- 5 selects only page 5.
- 2-4 selects pages 2, 3 and 4.
- 1-3, 8, 12-14 selects pages 1, 2, 3, 8, 12, 13 and 14.
- 10- selects page 10 and every page after it.

Selecting by thumbnail is better when you do not remember page numbers but recognise the page when you see it, for example a signature page or a certain chart. You can mix both methods: type a range, then click thumbnails to add or remove single pages.

## Order matters

Pages in the new file appear in the same order as in the original, no matter in which order you clicked them. If you need a different order, for example the summary first, extract first and then use <tool_reorder_pdf_pages>Reorder PDF Pages</tool_reorder_pdf_pages> on the new file.

## Extract, split or remove?

These three operations sound similar but give different results:

- Extract: you name the pages to keep, and get one new file.
- Remove: you name the pages to drop, and get the rest as one new file. <tool_remove_pdf_pages>Remove PDF Pages</tool_remove_pdf_pages> is quicker when only a few pages must go.
- Split: you cut the document into several files at once, for example one file per chapter. <tool_split_pdf>Split PDF</tool_split_pdf> is the tool for that, and our guide to <post_how-to-split-a-pdf>splitting a PDF</post_how-to-split-a-pdf> explains the options.

A simple rule: if you can describe the pages you want in a few words, extract. If you can describe the pages you do not want, remove them. If you need several smaller documents, split.

## Typical uses

- Sending one statement from a long bank or utility document.
- Pulling out the pages a form portal asks for, such as only the identity page of a scan.
- Sharing a chapter of an e-book or a manual with a colleague.
- Removing an internal cover sheet or appendix before a document goes to a customer.
- Combining chosen pages from several documents: extract from each one and then join the results with <tool_merge_pdf>Merge PDF</tool_merge_pdf>. Our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> covers the details.

## Privacy: what is really left out

Because extraction copies pages, the pages you did not select are not present in the new file. That makes it a sensible way to share part of a document. Two cautions apply:

- Document properties such as the title and author may or may not be present in the new file. If those details matter, open <tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata> on the result and check them.
- Pages that you do include still contain everything on them. If a page has a name or a number that must be hidden, use <tool_redact_pdf>Redact PDF</tool_redact_pdf> rather than hoping nobody looks.

## Keeping the result small

An extracted file is usually much smaller than the original, but it can still be large if the pages contain photos or scans. If an upload limit is a problem, run the new file through <tool_compress_pdf>Compress PDF</tool_compress_pdf>. Our guide to <post_compress-pdf-without-losing-quality>compressing a PDF without losing quality</post_compress-pdf-without-losing-quality> explains what to expect.

## Common mistakes to avoid

- Selecting pages by printed page number when the PDF’s own numbering is different. The tool counts physical pages from the first one, so a cover page makes printed page 1 into PDF page 2.
- Forgetting to check the result. Open the new file and make sure the right pages are in it.
- Sending a file that still has sensitive document properties.
- Extracting from an already-compressed copy when the original would give better quality.
- Overwriting the original. Save the new file under a clear name such as invoice-march.pdf.

## A quick checklist

1. Unlock the PDF if it has a password.
2. Select pages by range or by thumbnail.
3. Look at the count shown under the field.
4. Extract, download and open the result.
5. Keep the original file untouched.

:::faq Frequently asked questions
Q: Does extracting pages change my original PDF?
A: No. The tool reads your file and writes a new one. The original stays exactly as it was.

Q: Can I extract pages from a password-protected PDF?
A: Not directly. Unlock the file first with Unlock PDF, then extract from the unlocked copy.

Q: Can I use extraction to delete pages?
A: Yes. Select the pages you want to keep and extract them; the others are left out of the new file. For a few pages, Remove PDF Pages is quicker.

Q: Will the text stay selectable?
A: Yes. Pages are copied, not redrawn, so text, links and images behave as in the original.

Q: Is there a limit on file size?
A: PDFs up to 100 MB are supported. Very large documents depend on the memory of your device.

Q: Can I choose pages in a different order?
A: The new file keeps the original order. Use Reorder PDF Pages afterwards if you need another order.
:::
