---
title: How to Split a PDF: Ranges, Single Pages and Chunks
description: Split a PDF by page ranges, into single pages or into equal parts, or extract just the pages you need, directly in your browser and without uploading the file.
excerpt: Break a large PDF into the parts you need, by range, page by page or in fixed-size chunks, and pick the right tool for each job.
imageAlt: One long PDF document being cut into separate smaller documents, shown on a teal background
published: 2026-10-15
tool: split-pdf
tools: split-pdf, extract-pdf-pages, remove-pdf-pages, merge-pdf, reorder-pdf-pages, compress-pdf, unlock-pdf
ctaHeading: Split your PDF now
cta: Open <tool_split_pdf>Split PDF</tool_split_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

You have a 120-page scan and the person you are writing to needs pages 14 to 19. Or a report where every chapter must go to a different team. Or a bundle of invoices that arrived as one file and has to be filed one by one. Sending the whole document is slow, untidy and sometimes a privacy problem.

Splitting solves all three. This guide explains the three ways to split a PDF, how to write page ranges that do what you mean, and when a different tool is a better fit.

:::takeaways
- Split PDF can cut a file by custom ranges such as 1-3 and 4-6, into single pages, or into chunks of a fixed size.
- Download the parts one by one or all together as a ZIP.
- To keep only some pages as one new file, Extract PDF Pages is simpler; to delete pages, use Remove PDF Pages.
- Everything happens in your browser, so the document is never uploaded.
:::

## Three ways to split a PDF

<tool_split_pdf>Split PDF</tool_split_pdf> offers three modes, and picking the right one saves time.

### Custom ranges

Use this when you know which pages go together. Type ranges separated by commas, for example 1-3, 4-6, 7-12. Each range becomes its own PDF. This is the mode for chapters, sections, and for pulling a single part out of a long document.

### Every page

Use this when every page must be a separate file, such as invoices, tickets, payslips or certificates that were scanned in one run. You get one PDF per page.

### Every N pages

Use this to cut a long file into equal pieces, for example every 10 pages. The last part contains whatever is left over, so a 25-page file split every 10 pages gives 10, 10 and 5.

## Step by step

1. Open the tool and add your PDF. It can be up to 100 MB.
2. Choose the mode: custom ranges, every page or every N pages.
3. For custom ranges, type the ranges. For the other modes, set the number if asked.
4. Press Split. The parts appear as a list.
5. Download each part, or take all of them together as a ZIP file.

## Writing page ranges that work

Ranges are written the way you would write them in a print dialog. A few examples show the pattern:

- 1-3 means pages 1, 2 and 3 as one file.
- 1-3, 4-6 means two files: one from pages 1 to 3 and one from pages 4 to 6.
- 5 on its own means page 5 as a single-page file.

Page numbers are the position of the page in the file, counting from 1, not the number printed on the page. A document with a cover and a roman-numeral preface can have printed number 1 on its fifth page, and the tool counts the fifth page as 5. If a result looks off by a few pages, that is almost always the reason; open the PDF and check the position of the page in the viewer.

> Tip: do a test with one short range first. Download it and check that it starts and ends on the pages you meant before you split the whole file.

## When Extract PDF Pages is the better tool

Split PDF makes several files. If you want one new file that contains a chosen set of pages, <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> is quicker. You click page thumbnails to select pages, or type a list such as 1-3, 8, and download one new PDF with exactly those pages in order. Use it for sending “just pages 4, 9 and 10” to someone.

If you only need to throw pages away, such as blank pages at the end of a scan, <tool_remove_pdf_pages>Remove PDF Pages</tool_remove_pdf_pages> deletes them and keeps everything else in one file.

## Splitting and merging go together

Two jobs come up again and again. The first is to take apart a pack, change one part and put it back together: split the file, edit or replace the part, then join the parts again with <tool_merge_pdf>Merge PDF</tool_merge_pdf>. Our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> covers the order and limits.

The second is to rearrange a document. For a handful of pages, <tool_reorder_pdf_pages>Reorder PDF Pages</tool_reorder_pdf_pages> lets you drag thumbnails into a new order without splitting anything.

## Splitting to send a large PDF

Attachment limits are set by the receiving system. Many email services accept roughly 20 to 25 MB in total, and portals often allow far less. If a PDF is too large, splitting can help: send two files of half the size, or only the pages that matter. If the pages themselves are heavy, for example scans with photos, compressing is usually a better answer. Our guide to <post_compress-pdf-without-losing-quality>compressing a PDF without losing quality</post_compress-pdf-without-losing-quality> explains how to shrink a file while keeping text sharp.

## What to know before you split

- Password-protected PDFs are not supported. If you know the password, remove it first with <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf>.
- Very large or complex files depend on your device memory. If a file will not process, split it in two stages, for example first by half, then each half by range.
- The pages of each part keep their look, but a link that pointed to a page now in another part cannot work any more.
- Bookmarks of the original file do not follow the parts, so rebuild them if you need them.

## Common situations

- A scanned bundle of invoices: use Every page, then rename the files to match your filing system.
- A long report for several readers: use custom ranges, one range per chapter.
- A big file for an upload form with a page limit: use Every N pages, with N set to the form’s limit, and upload the parts one by one.
- Only the signature page: use Extract PDF Pages and select that page.

:::faq Frequently asked questions
Q: Does splitting a PDF reduce the quality?
A: No. The pages are copied into the new files as they are, so text and images look the same as in the original.

Q: Can I split a PDF into single pages and get them all at once?
A: Yes. Choose Every page and download the result as a ZIP file that contains one PDF per page.

Q: Is my PDF uploaded to a server when I split it?
A: No. Split PDF works inside your browser tab, so the file stays on your device.

Q: What is the maximum file size?
A: Up to 100 MB per PDF, although very large or complex files also depend on your device memory.

Q: How do I split a PDF that asks for a password?
A: Remove the password first with Unlock PDF, which works when you know the password, then split the unlocked copy.
:::
