---
title: Convert PowerPoint to PDF: What Is Kept and What Is Not
description: Turn a PPTX presentation into a PDF with one page per slide. Learn how text, pictures and shapes convert, what is left out and how to check the result.
excerpt: Convert a PowerPoint deck to PDF in your browser, understand which elements are drawn and which are skipped, and prepare slides so the PDF looks right.
imageAlt: A presentation slide turning into a PDF page on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: powerpoint-to-pdf
tools: powerpoint-to-pdf, word-to-pdf, excel-to-pdf, merge-pdf, compress-pdf, extract-pdf-pages
ctaHeading: Try it yourself
cta: Open <tool_powerpoint_to_pdf>PowerPoint to PDF</tool_powerpoint_to_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

A presentation is made to be shown, but it is often shared as a file: a handout for a meeting, slides for people who missed a talk, a deck attached to an application. Sending a PPTX has risks. Fonts may be missing on the recipient’s computer, slides may rearrange themselves and anyone can edit them. A PDF looks the same everywhere and opens on any device.

This guide explains how to convert a PowerPoint presentation to PDF in your browser, what the converter draws and what it leaves out, and how to prepare a deck so that the PDF comes out well.

:::takeaways
- Choose a PPTX file; every slide becomes one page with the slide’s own size and orientation.
- Text boxes, pictures, simple shapes and tables are drawn. Fonts and effects differ from PowerPoint.
- Charts, SmartArt, video, audio, animations, transitions and speaker notes are not converted, and the tool tells you how many items were left out.
- Text that does not fit its box is shrunk, down to half of its size.
- Always look through the PDF before you share it.
:::

## What the converter does

The tool reads the structure of the PPTX file, which is a package of XML and picture files, and draws each slide as a PDF page from the elements it understands: text boxes, pictures, simple shapes and tables. It does not run PowerPoint’s rendering engine, so the result is a faithful but simplified version of each slide.

The PDF contains real text, so you can select and search it, and the pages have the same size and orientation as your slides. A widescreen deck gives widescreen pages.

## How to convert a presentation

<tool_powerpoint_to_pdf>PowerPoint to PDF</tool_powerpoint_to_pdf> works inside your browser tab, so the file is read from your device. The steps:

1. Open the tool and choose a PPTX file (up to 100 MB and 300 slides).
2. Press Convert.
3. Read the notes under the result. They list what could not be converted.
4. Check the pages and download the PDF.

Old .ppt files and password-protected presentations are not supported. Open the old file in PowerPoint and save it as PPTX, and remove the password before converting.

## What is drawn and what is not

Drawn: text, pictures in JPEG and PNG format, simple shapes and tables.

Not converted:

- Charts and SmartArt graphics.
- Video and audio.
- Animations and transitions.
- Speaker notes.
- Gradients, lines and connectors.
- Pictures in formats other than JPEG and PNG.

The tool counts the items it skipped and shows the number. If your deck relies on charts or diagrams, check those slides particularly carefully. A workaround for important charts is to copy them in PowerPoint as pictures, paste them back as images and convert again.

## Fonts and text fitting

The PDF is written with Noto Sans, so the original fonts of the deck are not kept. Noto Sans covers Latin letters, including the special letters of Polish, Czech, Romanian and Turkish, as well as Cyrillic, Greek, Vietnamese and Devanagari. Arabic, Hebrew, Thai, Chinese, Japanese and Korean text is not supported yet: those characters appear as question marks, and the tool tells you how many were affected.

Because the font changes, text may take a different amount of space. When text does not fit its box, it is shrunk to fit, down to half of its original size. If a slide looks crowded in the PDF, shorten the text in PowerPoint and convert again.

## Preparing a deck for a good result

A little preparation makes the conversion more predictable:

1. Save the file as PPTX and remove any password.
2. Replace charts and SmartArt with pictures if they are important.
3. Use JPEG or PNG pictures. Other formats are skipped.
4. Avoid very small text, which gets smaller when it has to be fitted.
5. Do not rely on animations to reveal content step by step. In a PDF every element is visible at once.
6. Put essential information into slide text instead of speaker notes, which are not carried over.

## Reviewing the PDF

Always flip through the whole PDF. Look at:

- Title slides and closing slides, where large text and logos are common.
- Slides with tables, which can wrap differently.
- Slides with pictures, to check that none are missing because of an unsupported format.
- Slides that relied on an effect, such as a shadow or gradient for contrast. Without it, white text on a pale background may be hard to read.

If you only need some slides, <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> lets you keep the pages you want.

## Handouts and sharing

A PDF is ideal as a handout. A few ways to make it better:

- Combine several decks into one file with <tool_merge_pdf>Merge PDF</tool_merge_pdf>. Our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> explains the details.
- If the file is too large to email, <tool_compress_pdf>Compress PDF</tool_compress_pdf> recompresses the pictures. Our guide to <post_compress-pdf-without-losing-quality>compressing a PDF without losing quality</post_compress-pdf-without-losing-quality> explains what to expect.
- For written reports, <tool_word_to_pdf>Word to PDF</tool_word_to_pdf> and <tool_excel_to_pdf>Excel to PDF</tool_excel_to_pdf> follow the same approach; see <post_word-to-pdf-without-losing-formatting>converting Word to PDF</post_word-to-pdf-without-losing-formatting> and <post_how-to-convert-excel-to-pdf>converting Excel to PDF</post_how-to-convert-excel-to-pdf>.
- If the deck must be archived for years, <post_what-is-pdf-a-and-when-to-use-it>PDF/A</post_what-is-pdf-a-and-when-to-use-it> explains the archival format.

## Common mistakes to avoid

- Sharing the PDF without looking at every slide.
- Expecting charts, SmartArt, videos and animations to come through.
- Using picture formats other than JPEG and PNG.
- Letting text run so long that it has to be shrunk to half size.
- Deleting the PPTX after converting. Keep it as the editable source.

## A quick checklist

1. Save as PPTX, remove the password and convert important charts into pictures.
2. Convert and read the notes about skipped items.
3. Flip through every page of the PDF.
4. Fix problem slides in PowerPoint and convert again.
5. Keep the PPTX file.

:::faq Frequently asked questions
Q: Will the slides look exactly like in PowerPoint?
A: Not exactly. Kitwell draws each slide from its text boxes, pictures, simple shapes and tables. Fonts, gradients, shadows, effects and exact text fitting differ. Always look through the PDF before you use it.

Q: What is not converted?
A: Charts, SmartArt, video and audio, animations and transitions, speaker notes, gradients, lines and connectors, and pictures in formats other than JPEG and PNG. The tool tells you how many items were left out.

Q: Can I convert an old .ppt file?
A: No. Open it in PowerPoint and save it as a PPTX file first.

Q: How large can the presentation be?
A: PPTX files up to 100 MB and 300 slides.

Q: Which languages are supported?
A: Latin, Cyrillic, Greek, Vietnamese and Devanagari text. Arabic, Hebrew, Thai, Chinese, Japanese and Korean are not supported yet.

Q: Is my presentation uploaded?
A: No. The conversion runs inside your browser, so the file stays on your device.
:::
