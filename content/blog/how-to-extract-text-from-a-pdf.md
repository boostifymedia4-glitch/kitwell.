---
title: How to Extract Text From a PDF and Copy It Cleanly
description: Copy all the selectable text out of a PDF page by page, choose a page range, mark page breaks, and fix the empty-result problem that scanned PDFs cause.
excerpt: A practical guide to getting text out of PDF files: how extraction works, why scans return nothing, how to keep page breaks, how to clean the result and what happens to tables and columns.
imageAlt: A PDF page with lines of text flowing out into a plain text document on a teal background
published: 2026-10-31
updated: 2026-10-31
tool: extract-pdf-text
tools: extract-pdf-text, ocr-pdf, pdf-to-markdown, text-cleaner, word-counter, pdf-viewer
ctaHeading: Try it yourself
cta: Open <tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

You have a PDF, and you need its words somewhere else: in an email, a report, a spreadsheet, a translation program or a notes app. Selecting text with the mouse works for a paragraph, but not for forty pages, and the result often arrives with strange line breaks and broken words. A proper extraction takes the whole text in one step and gives you something you can work with.

This guide shows how to extract text from a PDF in your browser, explains why some PDFs give an empty result, describes what happens to layouts such as columns and tables and shows how to clean up the text afterwards.

:::takeaways
- Extraction copies the real, selectable text from a PDF, page by page. It does not read pictures.
- A scanned PDF is a picture of text, so extraction returns nothing until you run OCR on it.
- You can extract all pages or a range, and choose whether to mark where each page begins.
- Lines and paragraphs are rebuilt as well as possible, but columns, tables and footnotes can come out in a different order.
- The text can be copied or downloaded as a plain text file.
:::

## What is inside a PDF

A PDF is a description of pages: where to draw each letter, line and picture. Most PDFs made by word processors, browsers and design programs also contain the letters as text, so that you can search and select them. That is the text that extraction collects.

Other PDFs contain only pictures of pages. A scan from a copier or a phone camera is one example. The page looks like text, but the file holds a photograph, so there are no letters to collect. This difference explains most of the questions people have about extraction.

You can tell the two apart in a viewer. If you can select a word with the mouse, the page has real text. <tool_pdf_viewer>PDF Viewer</tool_pdf_viewer> opens a file in your browser for a quick look.

## How to extract text

<tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text> runs inside your browser tab, so the file stays on your device.

1. Open the tool and add your PDF. Files up to 100 MB are accepted.
2. Choose all pages, or type a range such as 1-3, 5 if you need only some of them. Leave the box empty for all pages.
3. Decide whether to mark where each page starts. Page markers are useful when you need to know where a sentence came from, and unnecessary for a continuous article.
4. Start the extraction, then copy the text, or download it as a text file.

The result appears as plain text. It carries no fonts, colours or pictures, which is what makes it easy to reuse.

## When the result is empty

An empty result almost always means that the PDF is a scan. Extraction collects text that exists in the file, and a scan has none. The tool cannot recognise letters in pictures, so it returns nothing, and you need OCR, which stands for optical character recognition.

<tool_ocr_pdf>OCR PDF</tool_ocr_pdf> reads the pictures of the pages and adds an invisible layer of text, so that the file becomes searchable and its text can be extracted. Our guide to <post_ocr-scanned-pdf-searchable>making a scanned PDF searchable</post_ocr-scanned-pdf-searchable> explains how to use it, and how to get good results from your scan, such as straight pages and a resolution of 200 to 300 dots per inch.

Two other causes of an empty or odd result are worth knowing. Some PDFs store text as shapes, which look like letters but are drawings, and extraction cannot read them. And a PDF protected with a password has to be unlocked first.

## Layouts: columns, tables and footnotes

Text in a PDF is stored as many small pieces with positions, not as sentences. The tool rebuilds lines and paragraphs from those positions as well as it can, and for a simple document, such as a letter or an article in one column, the result reads naturally.

Complex layouts are harder.

- Columns. A page with two columns can come out with the lines of both columns mixed, or with the whole left column followed by the right one. The reading order follows the order stored in the PDF, which may differ from the visual order.
- Tables. The cells appear as lines of text, in the order stored in the file, without the grid. Numbers in a table are therefore easy to copy, but the rows and columns may need rebuilding.
- Footnotes and headers. They appear where the PDF puts them, often at the end of a page or in between paragraphs.
- Hyphenation. Words that were split across two lines may appear with a hyphen in the middle.

If your goal is to keep headings, lists and links as structure and not only as text, <tool_pdf_to_markdown>PDF to Markdown</tool_pdf_to_markdown> may be a better fit, and our guide to <post_how-to-convert-pdf-to-markdown>converting PDF to Markdown</post_how-to-convert-pdf-to-markdown> explains what it keeps and what it estimates.

## Clean the text afterwards

Extracted text often needs a few small fixes: lines broken in the middle of sentences, double spaces, empty lines and odd characters.

<tool_text_cleaner>Text Cleaner</tool_text_cleaner> handles these with tick boxes. It can trim spaces, collapse repeated spaces, remove invisible characters, remove or reduce empty lines, join lines into one paragraph, replace curly quotes and strip HTML tags. Joining lines into one paragraph is especially helpful for text that was wrapped at the width of the PDF page.

If you need to know how long the text is, <tool_word_counter>Word Counter</tool_word_counter> shows words, characters and reading time, and our guide to <post_how-to-count-words-and-characters-online>counting words and characters</post_how-to-count-words-and-characters-online> explains the numbers. After cleaning, you may also want to change capital letters in headings. Our guide to <post_how-to-change-text-case-online>changing text case online</post_how-to-change-text-case-online> shows how.

## Privacy, copyright and good practice

Extraction happens on your device. Even so, think about what you do with the text. A PDF may carry copyright, and copying a large part of someone else's work into your own document is not the same as quoting it. Keep the source, and mark quotes clearly.

Do not assume that the text is correct because it came out of a file. For scanned PDFs, OCR makes mistakes, especially with numbers, names and small print, so check anything important against the page.

## Other ways to get part of a PDF

Sometimes you do not need the text, only some of the pages. Our guide to <post_how-to-extract-pages-from-a-pdf>extracting pages from a PDF</post_how-to-extract-pages-from-a-pdf> shows how to keep a few pages as a new PDF. And if the pages are pictures that you want to use in a presentation, our guide to <post_how-to-convert-pdf-to-jpg>converting PDF to JPG</post_how-to-convert-pdf-to-jpg> explains how.

If the PDF came from pictures that you saved in a different format, the guide to <post_how-to-convert-png-to-jpg>converting PNG to JPG</post_how-to-convert-png-to-jpg> may help with the first step.

## Common mistakes to avoid

- Expecting text from a scanned PDF without running OCR first.
- Trusting the order of columns and tables without checking.
- Extracting a protected file without unlocking it.
- Forgetting to clean line breaks and double spaces.
- Treating OCR output as perfect.
- Copying large parts of a copyrighted document without credit.

## A quick checklist

1. Check in a viewer whether the text can be selected.
2. If it cannot, run OCR first.
3. Choose all pages or a range, and decide on page markers.
4. Extract, then clean the text.
5. Check the order of columns and tables against the original page.

:::faq Frequently asked questions
Q: Why is the result empty?
A: The PDF is probably a scan, which is a picture of text rather than real text. Reading it needs OCR, which this tool does not do.

Q: Is the layout kept?
A: Lines and paragraphs are rebuilt as well as possible, but columns, tables and footnotes may come out in a different order.

Q: Can I extract only some pages?
A: Yes. Type a range such as 1-3, 5, or leave the box empty for all pages.

Q: Can I mark where each page starts?
A: Yes. Turn on the option to mark page starts, which helps when you need to trace text back to its page.

Q: What if my PDF has a password?
A: Unlock it first. Password-protected PDFs cannot be read until they are unlocked.
:::
