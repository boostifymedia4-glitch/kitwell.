---
title: How to Convert PDF to Markdown: Headings, Lists and Limits
description: Turn the text of a PDF into a Markdown file with headings, paragraphs and lists. Learn how structure is guessed, what is lost and how to clean the result.
excerpt: Extract a PDF’s text as Markdown for notes, wikis and documentation, understand how headings and lists are detected and fix the usual problems with tables and scans.
imageAlt: A PDF page turning into lines of Markdown text on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: pdf-to-markdown
tools: pdf-to-markdown, extract-pdf-text, ocr-pdf, html-to-pdf, word-to-pdf, markdown-previewer
ctaHeading: Try it yourself
cta: Open <tool_pdf_to_markdown>PDF to Markdown</tool_pdf_to_markdown>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Markdown is the plain-text format of notes, documentation, wikis and static websites. It is easy to read, easy to edit and easy to move between tools. PDFs, on the other hand, are made for appearance. When you have a PDF article or manual and want to reuse its text in Markdown, copy and paste produces a mess of broken lines and lost structure.

A converter can do better by looking at font sizes and spacing to guess the headings, lists and paragraphs. This guide explains how to turn a PDF into Markdown in your browser, how the structure is estimated, what is not carried over and how to clean up the result.

:::takeaways
- The tool converts the real text of a PDF into Markdown with headings, paragraphs and lists.
- Headings are lines in a larger font, lists are lines starting with a bullet or number, and paragraphs follow the spacing.
- The structure is a good guess, not a guarantee. Always check the result.
- Tables, columns, images, links, bold and italic text, footnotes and equations are not carried over.
- Scanned PDFs have no text; run OCR first.
:::

## What PDF to Markdown does

A PDF does not store structure. It stores positioned pieces of text: this word at this place in this size. A converter therefore reconstructs structure from clues:

- Lines set in a larger font than the body text are probably headings.
- Lines that start with a bullet or a number are probably list items.
- Gaps between lines separate paragraphs.
- Text that repeats at the top or bottom of every page is probably a header or footer.

The result is a Markdown file in which headings start with hash signs, lists have dashes or numbers and paragraphs are separated by blank lines. This is a very good starting point for editing, but it is an estimate.

## How to convert a PDF to Markdown

<tool_pdf_to_markdown>PDF to Markdown</tool_pdf_to_markdown> works in your browser tab, so the PDF is read from your device.

1. Open the tool and add a PDF (up to 100 MB). Unlock it first if it is password-protected.
2. Decide whether to remove repeating page headers, footers and page numbers. This is usually a good idea for books and reports.
3. Optionally mark page breaks with a line, which helps when you want to see where pages ended.
4. Press Convert.
5. Check the Markdown shown in the box, then copy it or download the .md file.

The summary under the box tells you how many pages had text, how many headings and how many list items were found. If a long document reports zero headings, the PDF probably uses one font size throughout.

## Removing headers, footers and page numbers

Repeated text such as a running title, a company name or a page number is a nuisance in Markdown, because it ends up in the middle of sentences when a paragraph crosses a page. The option to remove repeating elements detects lines that appear on many pages in the same place and drops them. Use it for books, reports and articles. Turn it off if the repeating text is meaningful, for example if every page begins with a different value in the same position that you want to keep.

## What is not carried over

Be realistic about the limits. These elements do not come through:

- Tables and multi-column layouts are not rebuilt. Their text appears as ordinary lines, in reading order where possible.
- Images and figures.
- Links.
- Bold and italic text.
- Footnotes and equations.

For documents where tables matter, retype the tables by hand or copy them from the PDF with another approach, and check every number against the original.

## Scanned PDFs give empty results

A scanned page is a picture. There is no text to extract, so the result is empty. First run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf> to add a text layer, then convert the result. Recognition is English only and not perfect, so proofread the output. Our guide to <post_ocr-scanned-pdf-searchable>making a scanned PDF searchable</post_ocr-scanned-pdf-searchable> explains the process and what to expect.

## When plain text is enough

If you do not need headings or lists, <tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text> gives you the text without any Markdown syntax. It can be the better choice for searching, counting words or feeding text to another program.

## Cleaning up the Markdown

After conversion, spend a few minutes on these fixes:

1. Check the headings. A large line that is not really a heading, for example a pull quote, may be marked as one. Remove or demote it.
2. Join broken lines. Where the PDF wrapped a sentence mid-paragraph, make sure it reads as one paragraph.
3. Repair lists. Numbered lists may restart at one, or a long bullet may be split.
4. Retype tables. Turn the loose lines into a Markdown table by hand if you need one.
5. Add links and emphasis again where they matter.
6. Preview the result. <tool_markdown_previewer>Markdown Previewer</tool_markdown_previewer> shows how it will look, which makes mistakes easy to spot.

## Going the other way

If you need a PDF from HTML, <tool_html_to_pdf>HTML to PDF</tool_html_to_pdf> turns an HTML file or pasted HTML into a PDF, as our guide to <post_how-to-convert-html-to-pdf>converting HTML to PDF</post_how-to-convert-html-to-pdf> explains. For documents that start in a word processor, see <post_word-to-pdf-without-losing-formatting>converting Word to PDF</post_word-to-pdf-without-losing-formatting>.

## Common mistakes to avoid

- Trusting the headings without looking at them.
- Expecting tables to survive as tables.
- Converting a scan without running OCR first.
- Leaving page numbers and running headers in the text.
- Forgetting that the structure is estimated from font sizes and spacing, so complex layouts can go wrong.

## A quick checklist

1. Convert with the repeating-element option on for books and reports.
2. Check the summary of headings and list items.
3. Read the Markdown from top to bottom and fix headings, lists and broken lines.
4. Retype tables.
5. Keep the PDF as the reference.

:::faq Frequently asked questions
Q: How are headings and lists found?
A: Headings are lines set in a larger font than the body text, lists are lines that start with a bullet or a number, and paragraphs are separated by the spacing between lines. This is a good guess, not a guarantee, so check the result.

Q: Why is the result empty for my scanned PDF?
A: A scan is a picture of a page and has no text to extract. Run OCR PDF first to add a text layer, then convert the result.

Q: What about tables, columns and images?
A: Tables and columns are not rebuilt: their text appears as ordinary lines, in reading order where possible. Images, links, bold and italic text, footnotes and equations are not carried over.

Q: Can I convert a password-protected PDF?
A: Not directly. Unlock it first, then convert the unlocked copy.

Q: How large can the PDF be?
A: Up to 100 MB. Only text that is real text in the PDF is converted.

Q: Is my PDF uploaded?
A: No. The conversion runs inside your browser, so the file stays on your device.
:::
