---
title: How to Compare Two PDF Files and See Exactly What Changed
description: Find the differences between two versions of a PDF with a text comparison and a visual view, and learn the limits for scans and inserted pages.
excerpt: Compare an original and a revised PDF page by page, read the added and removed words, switch to a visual view of changed areas and avoid misleading results.
imageAlt: Two PDF pages side by side with changed words highlighted in green and red on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: compare-pdf
tools: compare-pdf, ocr-pdf, extract-pdf-text, merge-pdf, extract-pdf-pages, pdf-viewer
ctaHeading: Try it yourself
cta: Open <tool_compare_pdf>Compare PDF</tool_compare_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

A colleague sends back “the final version” of a contract, and you have a bad feeling that more than the agreed paragraph changed. A supplier updates a price list, and you need to know which lines are different. A thesis goes through a third round of edits and the supervisor wants only the changes. In each case you hold two PDFs and want a list of differences.

Reading both files side by side is slow and unreliable; the eye skips changes it does not expect. This guide shows how to compare two PDFs in your browser, how to read the result and where comparisons can mislead you.

:::takeaways
- Add the original and the revised PDF; the tool lists each page with the number of words added and removed.
- Open a page to read the text changes, or use the visual view to see changed areas marked in red.
- Pages are matched by number, so an inserted page makes all later pages look changed.
- Scans have no selectable text; use the visual view or run OCR on both files first.
- A comparison is a guide for review, not a legal proof. Read the important parts yourself.
:::

## Two kinds of comparison

There are two ways to compare documents, and they answer different questions.

A text comparison looks at the words. For each page it shows which words were added and which were removed, and collapses the unchanged text so you can concentrate on the differences. It is ideal for contracts, reports and anything where the wording matters. It ignores layout, so moving a paragraph to another place on the page is not flagged unless the words changed.

A visual comparison looks at the picture of each page and marks the areas that are different. It catches things that text comparison cannot: a changed image, a different logo, a moved table, a shifted signature line. It also works on scanned documents, because it does not need selectable text.

Use both when the stakes are high.

## How to compare two PDFs in your browser

<tool_compare_pdf>Compare PDF</tool_compare_pdf> works inside your browser tab, so both files are read from your device. The steps:

1. Open the tool and add the original PDF.
2. Add the revised PDF. Unlock either file first if it has a password.
3. Run the comparison. Each page appears in a list with the number of words added and removed.
4. Open a page to read the text changes, with additions in green and deletions in red.
5. Switch to the visual view to see changed areas marked in red.
6. Go through every page that shows a change.

Up to 100 pages per file are compared.

## Reading the text view

Added words appear in green and removed words in red. The unchanged text is collapsed, with only a little context around each change, so a page with one edited sentence is easy to scan.

Things to keep in mind while reading:

- A reworded sentence shows as removed words followed by added words. Read both parts together.
- Changed numbers are the most important and the easiest to miss in a long text. Look at them first.
- A page with a very large number of changes usually means the layout shifted. Open it and compare with your eyes.

## Reading the visual view

The visual view renders both pages at screen resolution and highlights the areas that differ. Use it for:

- Changed pictures, charts and logos.
- Moved or resized elements.
- Scanned documents.
- Layout changes that do not alter the words, such as a different font size or spacing.

Tiny differences below screen resolution may not show up, so a change of a single dot or accent can slip through. For text-heavy documents, rely on the text view for wording and on the visual view for everything else.

## The inserted page problem

Pages are compared by number. If someone inserts a page after page 3, page 4 of the revised file is page 3 of the original, and so on, so every following page appears changed. This is the most common reason for a comparison to look much worse than reality.

To avoid it, remove the inserted page first, or compare only the matching ranges. <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> lets you cut each document to the pages that correspond, and you can then compare the two shorter files. Our guide to <post_how-to-extract-pages-from-a-pdf>extracting pages from a PDF</post_how-to-extract-pages-from-a-pdf> explains how.

## Comparing scanned documents

A scan is a picture. It has no text to compare, so the text view finds nothing. You have two options:

- Use the visual view. It works on pictures, but even a tiny shift in the scan makes many areas look different.
- Run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf> on both files first, so they have a text layer, and then compare the results. Recognition is English only and never perfect, so expect some false differences caused by misread characters. Our guide to <post_ocr-scanned-pdf-searchable>making a scanned PDF searchable</post_ocr-scanned-pdf-searchable> explains what to expect.

## Other ways to look at differences

- If you only need the words of one file, <tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text> gives you plain text you can compare in another tool.
- If you are checking a redacted copy against the original, our guide to <post_how-to-redact-a-pdf-properly>redacting a PDF properly</post_how-to-redact-a-pdf-properly> lists the checks to run.
- If you want to read a long document comfortably before comparing, <tool_pdf_viewer>PDF Viewer</tool_pdf_viewer> lets you browse it in the browser.
- If several documents will be joined, compare the final merged file with the previous one, not the separate parts. <post_how-to-merge-pdf-files>Merging PDF files</post_how-to-merge-pdf-files> explains the order of work.

## How to use the result responsibly

A comparison tells you where to look. It does not tell you whether a change is acceptable, and it cannot replace reading. For contracts and anything legally binding:

- Read each flagged page in full.
- Check numbers, dates, names and negations such as “not” and “except”.
- Look at pages with no flagged change if a page was inserted or removed.
- Ask the other party to confirm the list of changes in writing.

## Common mistakes to avoid

- Comparing files in the wrong order, so additions look like deletions.
- Ignoring the inserted page problem and concluding that everything changed.
- Trusting a text comparison on a scanned document.
- Skipping the visual view for pages with images or tables.
- Treating the result as proof instead of a review aid.

## A quick checklist

1. Add the original first and the revised file second.
2. Look at the page list for pages with many changes.
3. Read the text changes, then the visual view.
4. Handle inserted or removed pages before drawing conclusions.
5. For scans, use the visual view or run OCR on both files.

:::faq Frequently asked questions
Q: What does the text comparison show?
A: For each page, the words that were added (green) and removed (red) between the original and the revised document, with the unchanged text collapsed. Pages are matched by number.

Q: What about scanned PDFs?
A: Scans have no selectable text, so the text comparison finds nothing. Use the visual comparison, or run OCR PDF on both files first.

Q: Why do all pages after page 3 show changes?
A: Most likely a page was inserted or removed. Pages are compared by number, so everything after the change appears shifted.

Q: Can it find tiny differences in a picture?
A: The visual comparison renders each page at screen resolution, so very small differences may not show.

Q: How many pages can be compared?
A: Up to 100 pages per file. Password-protected PDFs must be unlocked first.

Q: Are my files uploaded?
A: No. The comparison runs inside your browser, so both files stay on your device.
:::
