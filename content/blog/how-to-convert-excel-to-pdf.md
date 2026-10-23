---
title: How to Convert Excel to PDF: Tables, Formulas and Limits
description: Convert an XLSX workbook to a PDF with every visible sheet as a table. Learn what is kept, why formulas need saved values and how to get a clean result.
excerpt: Turn an Excel workbook into a PDF you can send or print, understand what the conversion keeps and drops, and prepare the file so the numbers come out right.
imageAlt: A spreadsheet grid turning into a PDF document on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: excel-to-pdf
tools: excel-to-pdf, word-to-pdf, powerpoint-to-pdf, merge-pdf, compress-pdf, add-page-numbers
ctaHeading: Try it yourself
cta: Open <tool_excel_to_pdf>Excel to PDF</tool_excel_to_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

A spreadsheet is a good place to work and a poor thing to send. Recipients may not have Excel, formulas can break on another computer, and anyone can change a number by accident. A PDF freezes the table as it is: the same on every device, easy to print and hard to alter by mistake.

This guide explains how to convert an Excel workbook to PDF in your browser, what the result looks like, why formulas sometimes come out empty and how to prepare a workbook so the PDF is clean.

:::takeaways
- Choose an XLSX file; every visible sheet becomes a table in the PDF, fitted to the page width.
- The PDF shows the values saved in the file. Formulas are not recalculated.
- Colours, merged cells, charts, pictures, print areas and page breaks are not kept.
- Hidden sheets are skipped, and very large sheets are limited to 5,000 rows and 60 columns.
- The text is written in Noto Sans, which covers Latin, Cyrillic, Greek, Vietnamese and Devanagari.
:::

## What the conversion produces

The tool reads your workbook and writes each visible sheet as a simple table that fits the page width. The result is real text in a PDF, so you can select, search and copy numbers from it. It is not a picture of the Excel window and it is not Excel’s print layout.

That distinction matters. If your workbook was carefully formatted for printing, with coloured headers, merged cells, a chart beside the table and manual page breaks, the PDF will look plainer. For many uses, such as sending a price list, an attendance table or a set of figures for review, a clean table is exactly what you want.

## How to convert a workbook

<tool_excel_to_pdf>Excel to PDF</tool_excel_to_pdf> works in your browser tab, so the workbook is read from your device. The steps:

1. Open the tool and choose an XLSX file (up to 50 MB).
2. Press Convert.
3. Read the notes under the result. They tell you what could not be converted, for example formulas without values or hidden sheets.
4. Check the tables and download the PDF.

Old .xls files and password-protected workbooks are not supported. If you have an old file, open it in Excel and save it as XLSX first.

## Why formulas can come out empty

A formula cell in an XLSX file stores two things: the formula and the last result Excel calculated. The converter does not run a spreadsheet engine; it shows the saved result. If a file was created by a program that wrote formulas without calculating them, the saved value is missing, and the cell is left empty. The tool counts those cells and tells you.

The fix is simple: open the workbook in Excel, let it calculate, save it and convert it again. Do the same when you changed numbers in a program that does not recalculate.

## What is not kept

To set expectations, here is what you will not find in the PDF:

- Cell colours and fonts. The table uses a uniform style.
- Merged cells, which appear as ordinary cells.
- Column widths set manually. Columns are fitted to the page.
- Charts, pictures and shapes.
- Print areas and page breaks defined in Excel.
- Hidden sheets, which are skipped.

If a chart is the point of your workbook, copy the chart as a picture in Excel and put it into a document instead, or export the sheet from Excel directly.

## Size limits

Each sheet can have up to 5,000 rows and 60 columns. Anything beyond that is left out, and the tool says so. This keeps the conversion fast and the file a sensible size. For very large data sets, a PDF is not the right format anyway; consider splitting the data into several workbooks.

## Languages and fonts

The PDF is written with Noto Sans. It covers Latin letters, including the special letters of Polish, Czech, Romanian and Turkish, as well as Cyrillic, Greek, Vietnamese and Devanagari. Arabic, Hebrew, Thai, Chinese, Japanese and Korean text is not supported yet. Those characters appear as question marks, and the tool tells you how many were affected. The original fonts of the workbook are not kept.

## Preparing the workbook for a clean PDF

A few minutes of preparation give a much better result:

1. Remove columns and rows that nobody needs, and unhide only the sheets you want to include. Hidden sheets are skipped.
2. Put the important table at the top left, with a header row.
3. Make sure formulas have been calculated and saved.
4. Keep column counts moderate so the table remains readable when fitted to the page.
5. Check for text in Arabic, Hebrew, Thai, Chinese, Japanese or Korean, which the PDF cannot show yet.

## After the conversion

- Open the PDF and check numbers against the workbook, especially totals and percentages.
- If you need page numbers on a long table, use <tool_add_page_numbers>Add Page Numbers</tool_add_page_numbers>.
- If several workbooks should become one document, convert each one and then join them with <tool_merge_pdf>Merge PDF</tool_merge_pdf>. Our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> explains the order of work.
- If the file is too large to email, <tool_compress_pdf>Compress PDF</tool_compress_pdf> can reduce it, although tables are mostly text and shrink little.

Other Office files follow the same pattern: <tool_word_to_pdf>Word to PDF</tool_word_to_pdf> and <tool_powerpoint_to_pdf>PowerPoint to PDF</tool_powerpoint_to_pdf> convert documents and presentations, and our guides to <post_word-to-pdf-without-losing-formatting>converting Word to PDF</post_word-to-pdf-without-losing-formatting> and <post_how-to-convert-powerpoint-to-pdf>converting PowerPoint to PDF</post_how-to-convert-powerpoint-to-pdf> compare what each approach keeps. For long-term storage, see <post_what-is-pdf-a-and-when-to-use-it>what PDF/A is</post_what-is-pdf-a-and-when-to-use-it>.

## Common mistakes to avoid

- Converting without checking for empty formula cells.
- Expecting the Excel print layout, colours and charts to appear.
- Leaving hidden sheets that you wanted included.
- Sending a PDF without checking that the numbers match the workbook.
- Throwing away the workbook. The PDF is a snapshot, not a replacement.

## A quick checklist

1. Calculate and save the workbook in Excel.
2. Unhide the sheets you need and tidy the columns.
3. Convert and read the notes shown under the result.
4. Check totals and numbers in the PDF.
5. Keep the workbook as the source of truth.

:::faq Frequently asked questions
Q: Are formulas calculated?
A: No. The PDF shows the values Excel saved with the file. If a formula cell has no saved value, it is left empty and the tool tells you. Open the file in Excel, let it calculate, save it and convert it again.

Q: Will it look like the print layout in Excel?
A: No. Each visible sheet becomes a simple table fitted to the page width. Cell colours, merged cells, column widths, charts, pictures, print areas and page breaks are not kept.

Q: Can I convert an old .xls file?
A: No. Open it in Excel and save it as an XLSX file first.

Q: How large can the workbook be?
A: XLSX files up to 50 MB, with up to 5,000 rows and 60 columns per sheet. Anything beyond that is left out and the tool says so.

Q: Which languages are supported?
A: Latin (including Polish, Czech, Romanian and Turkish letters), Cyrillic, Greek, Vietnamese and Devanagari. Arabic, Hebrew, Thai, Chinese, Japanese and Korean are not supported yet.

Q: Is my workbook uploaded?
A: No. The conversion runs inside your browser, so the file stays on your device.
:::
