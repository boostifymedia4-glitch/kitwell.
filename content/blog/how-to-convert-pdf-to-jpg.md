---
title: How to Convert PDF to JPG: Resolution, Pages and Quality
description: Turn PDF pages into JPG images in your browser. Learn which DPI to pick, how to convert only some pages and when PNG is the better choice.
excerpt: A practical guide to turning PDF pages into JPG pictures: choosing the resolution, converting selected pages, keeping file sizes sensible and avoiding common mistakes.
imageAlt: A PDF page turning into a JPG picture on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: pdf-to-jpg
tools: pdf-to-jpg, pdf-to-png, jpg-to-pdf, image-compressor, unlock-pdf, ocr-pdf
ctaHeading: Try it yourself
cta: Open <tool_pdf_to_jpg>PDF to JPG</tool_pdf_to_jpg>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Sometimes a PDF is the wrong container for what you need. A slide for a social post, a page of a brochure for a website, a scanned receipt for an expense form that only accepts pictures: in all of these, the page has to become an image. JPG is the most widely accepted picture format, which makes it the usual target.

This guide explains how a PDF page becomes a JPG, which resolution to choose, how to convert only the pages you need, and what to do when the result is too large or too soft. Everything here can be done in your browser, without installing software.

:::takeaways
- Each PDF page becomes one JPG. A 10-page document gives ten pictures.
- 150 DPI suits screens and sharing; 300 DPI suits printing. Higher values mean larger files.
- You can convert a few pages instead of the whole document, which saves time and space.
- JPG is lossy and has no transparency. Use PNG for sharp diagrams or pages with fine line art.
- Password-protected PDFs must be unlocked before they can be converted.
:::

## What happens when a PDF becomes a JPG

A PDF page is a set of instructions: draw this text in this font, place this picture here, fill this rectangle with that colour. Converting it to JPG means a program follows those instructions and paints the result onto a grid of pixels, then saves the grid as a picture. The text, which was real selectable text in the PDF, becomes part of the picture and can no longer be selected or searched.

That one-way step is the most important thing to know. Keep your original PDF. The JPG is a snapshot, and you cannot turn it back into editable text without running a recognition tool such as <tool_ocr_pdf>OCR PDF</tool_ocr_pdf>, which is never perfect.

## Choosing the resolution

Resolution is measured in DPI, dots per inch. A standard page is about 8.3 by 11.7 inches (A4), so the DPI decides how many pixels the picture has: at 150 DPI an A4 page is roughly 1,240 by 1,750 pixels, and at 300 DPI roughly 2,480 by 3,500.

- 150 DPI is a good default for screens, email, chat and web pages. Text is readable and the files stay modest.
- 300 DPI is the usual choice for printing, or for pages with small print that people will zoom into.
- Lower settings make small files but soften text. They are fine for thumbnails and previews.

A higher setting is not automatically better. It takes longer, needs more memory in your browser and produces files several times larger without looking different on a phone screen. The tool caps each page at about 50 megapixels, so extremely large pages such as posters or maps may be refused at the highest resolution.

## How to convert a PDF to JPG step by step

<tool_pdf_to_jpg>PDF to JPG</tool_pdf_to_jpg> runs inside your browser tab, so the PDF is read from your device and the pictures are created there. The steps are short:

1. Open the tool and add your PDF (up to 100 MB).
2. Choose the resolution.
3. Optionally enter the pages you want, for example 1-3, 5. Leave the field empty to convert every page.
4. Press Convert.
5. Download the images one by one, or all together as a ZIP file.

The pictures are named after the document and the page number, with leading zeros, so they sort correctly in a folder: report-page-01.jpg, report-page-02.jpg and so on.

## Converting only some pages

Converting a 200-page report when you need three pages wastes time and creates files you have to delete. Use the page field instead. Ranges and single pages can be combined: 1-3, 8, 12-14 converts pages 1, 2, 3, 8, 12, 13 and 14.

If you only need a few pages as a new PDF rather than as pictures, <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> is the better tool, and the result stays selectable text. Our guide to <post_how-to-extract-pages-from-a-pdf>extracting pages from a PDF</post_how-to-extract-pages-from-a-pdf> explains the details.

## JPG or PNG?

<tool_pdf_to_png>PDF to PNG</tool_pdf_to_png> works the same way but writes lossless PNG files. The choice depends on what is on the page:

- Photographs, scans and pages with large images: JPG. The files are much smaller and the loss is invisible at sensible settings.
- Pages with sharp text on flat colours, diagrams, charts and screenshots: PNG. JPG can leave faint blotches around hard edges.
- Anything that must not lose detail on the next edit: PNG.

Our guide to <post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> explains the differences in more depth.

## Keeping the files small

If the pictures are too large for an upload limit, try these in order:

1. Lower the resolution, for example from 300 to 150 DPI.
2. Convert only the pages you need.
3. Run the images through <tool_image_compressor>Compress Image</tool_image_compressor>, which also lets you limit the width or height.

For email, a width of about 1,200 to 1,600 pixels is plenty. Our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> covers the routine in detail.

## Password-protected and damaged PDFs

Encrypted PDFs are detected and refused with a clear message, because the pages cannot be read without the password. If the file belongs to you, remove the password first with <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf> and then convert the unlocked copy. Our guide to <post_password-protect-and-unlock-a-pdf>protecting and unlocking a PDF</post_password-protect-and-unlock-a-pdf> explains what unlocking does and does not do.

A PDF that will not open at all may be damaged. <post_repair-a-corrupted-pdf>Repairing a corrupted PDF</post_repair-a-corrupted-pdf> describes how to recover what can be recovered.

## How accurate is the rendering?

Pages are drawn with Mozilla’s PDF.js, the same engine used by Firefox, which handles the large majority of PDFs well. Unusual fonts, exotic blend modes or very advanced graphics can look slightly different from Adobe’s viewer. Always look at the first picture before you convert a long document, and zoom in on small text.

## Common mistakes to avoid

- Choosing a very high resolution for something that will only be seen on a phone.
- Forgetting that the text is no longer selectable and deleting the original PDF.
- Using JPG for a page of thin lines and then wondering about the fuzzy edges. Use PNG there.
- Converting a whole document when only a few pages are needed.
- Sharing pictures of a confidential document without checking every page first.

## A quick checklist

1. Decide where the pictures will be used: screen, print or upload form.
2. Pick 150 DPI for screens and 300 DPI for print.
3. Enter the pages you need, or leave the field empty for all of them.
4. Look at the first picture at full size before downloading the rest.
5. Keep the original PDF safe.

:::faq Frequently asked questions
Q: Does converting a PDF to JPG reduce its quality?
A: The picture is a copy of the page at the resolution you chose, saved with JPG compression. At 150 or 300 DPI the difference from the PDF is rarely visible, but the text can no longer be selected.

Q: How many pages can I convert at once?
A: You can convert every page of a PDF up to 100 MB in one go, and download the pictures as a ZIP. Very long or complex documents depend on your device’s memory, so convert in smaller page ranges if the browser slows down.

Q: Can I convert a password-protected PDF?
A: Not directly. Remove the password first with Unlock PDF, then convert the unlocked copy.

Q: Which resolution should I choose for printing?
A: 300 DPI is the usual choice for printing. Use 150 DPI when the pictures will only be viewed on a screen.

Q: Is my PDF uploaded to a server?
A: No. The conversion runs inside your browser, so the file stays on your device.

Q: Can I turn the JPG images back into a PDF?
A: Yes. JPG to PDF puts the pictures onto pages again, but the result is a set of pictures, not editable text.
:::
