---
title: How to Compress a PDF Without Losing Quality
description: Why PDFs get so large and how to shrink them without ruining text or photos, using a free method that runs in your browser and never uploads your file.
excerpt: Find out what makes a PDF heavy, which kinds shrink well, and how to cut the size while keeping text sharp and selectable.
imageAlt: A large PDF document being squeezed into a much smaller file, illustrated on a teal background
published: 2026-10-09
updated: 2026-10-15
tool: compress-pdf
tools: compress-pdf, split-pdf, merge-pdf, image-compressor, images-to-pdf, ocr-pdf
ctaHeading: Try it yourself
cta: Open <tool_compress_pdf>Compress PDF</tool_compress_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

A PDF that is too big to email, or too slow to upload to a portal with a size limit, is one of the most common small annoyances in office life. The usual advice is to run it through an online compressor, but many of those services upload your document to a server, and the results are often disappointing because nobody explains what is actually making the file large.

This guide explains where the weight in a PDF comes from, what can and cannot be removed, and how to compress a file in your own browser so that text stays sharp and only the images pay the price.

:::takeaways
- Images, not text, make most PDFs large, so only the images need to be compressed.
- Photo-heavy and scanned PDFs shrink well; plain text PDFs have little to remove.
- Start with the Recommended strength and check the result at 100% zoom before you send it.
- Compress once, at the end, because every round of recompression costs a little image quality.
:::

## Why PDF files get so large

Most of the weight in a PDF is images. A single phone photo can add several megabytes, a scanned page is a full-page picture, and a document exported from a slide deck may embed the same artwork many times. Text is tiny by comparison: a page of typed text is usually a few kilobytes. Embedded fonts add some weight, but far less than most people expect.

That is why the first question is not “which tool should I use?” but “what is inside this file?”. A report with twenty photos behaves very differently from a contract made of typed text.

## Three kinds of PDF, three different results

- Text-heavy PDFs (contracts, invoices, articles) are usually small already. There is little to remove, so do not expect dramatic savings.
- Photo-heavy PDFs (brochures, reports, exported presentations) shrink well, because the images can be recompressed and scaled down while the text is left alone.
- Scanned PDFs, where every page is a picture, are large by nature. They can shrink the most, but only by lowering the quality of those pictures.

## How to compress a PDF in your browser

<tool_compress_pdf>Compress PDF</tool_compress_pdf> works on your own device, so the file is not uploaded anywhere. The steps are short:

1. Open the tool and add your PDF (up to 100 MB). If it is password-protected, unlock it first.
2. Keep the standard mode. It recompresses the embedded JPEG images and leaves text, links and fonts as they are.
3. Pick a strength: Light keeps images almost unchanged, Recommended balances size and quality, and Strong gives the smallest file with visibly softer images.
4. Run the compression, compare the sizes before and after, and download the result.

If the file could not be made smaller, the tool tells you so instead of handing back a copy that is no better. That normally means the PDF is mostly text, or its images are already small.

## Choosing the right strength

Start with Recommended and judge the result at the size you will actually use it. For a document read on a screen, small losses of photo detail are rarely noticeable. For something you will print, or that has small print inside images, start with Light and compare.

> Tip: zoom to 100% on a page with a photo before you decide. Compression artefacts that are invisible when the page is fitted to the window can appear when you zoom in.

## When to use Maximum mode, and what it costs

Maximum mode renders every page as a picture at a resolution set by the strength you chose and builds a new PDF from those pictures. It gives the smallest files for scans, but it has real costs:

- Text can no longer be selected, copied or searched.
- Links and form fields stop working.
- It is a poor choice for documents that people need to fill in or quote from.

If you flatten a scan and later need searchable text again, run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf>. It adds an invisible text layer on top of the pages (English only). Our guide to <post_ocr-scanned-pdf-searchable>making a scanned PDF searchable</post_ocr-scanned-pdf-searchable> explains how.

## Other ways to make a PDF smaller

- Split it. If the recipient only needs some pages, <tool_split_pdf>Split PDF</tool_split_pdf> extracts just those.
- Shrink the pictures before they go into the PDF. Compress or resize photos with <tool_image_compressor>Compress Image</tool_image_compressor>, then build the file with <tool_images_to_pdf>Images to PDF</tool_images_to_pdf>. Our guide to <post_convert-images-to-pdf>converting images to PDF</post_convert-images-to-pdf> covers the details.
- Prefer JPG over PNG for photographs. PNG is lossless and much larger for photos, and the standard compression mode only recompresses JPEG images.
- Compress once, at the end. When you combine files with <tool_merge_pdf>Merge PDF</tool_merge_pdf>, compress the merged file a single time, because every round of recompression costs a little more image quality.

## How small does it need to be?

Most limits you will meet are set by the place that receives the file, not by the PDF format. Many email services cap attachments at roughly 20 to 25 MB in total, and job portals, tax sites, university systems and government forms often allow far less, sometimes only a few megabytes. Read the limit before you start so you can stop compressing as soon as the file fits.

If you are close to the limit, remember that an email adds a little overhead to every attachment, so aim a comfortable margin under the number rather than exactly on it. If you are far above it, compression alone may not be enough. Combine it with the other options above: remove pages nobody needs, or send two smaller files instead of one large one.

## Common mistakes to avoid

- Compressing a file that is already compressed. A PDF that has been through a compressor, or exported at low quality, has little left to give, and another pass only adds artefacts.
- Judging quality at the wrong zoom level. A page that looks fine fitted to the window can show blocky photos at 100%.
- Using Maximum mode on a document people must fill in or quote from. It turns pages into pictures, so forms and text selection stop working.
- Forgetting to keep the original. Always save the compressed copy under a new name so you can go back to the full-quality file.
- Expecting a miracle from a text-only PDF. If the file is 200 KB of text, there is nothing worth removing.

## What happens to your file

Everything described here runs inside your browser tab. The PDF is read from your device, processed locally and offered back as a download. Nothing is sent to our servers, which is also why very large files depend on your computer’s memory. Close the tab and the file is gone.

## A quick checklist

1. Work out what is in the file: photos, scans or plain text.
2. Try the standard mode at Recommended first.
3. Compare the result at 100% zoom.
4. Use Light if quality matters more than size, and Strong if size matters more.
5. Use Maximum only for scans, and run OCR afterwards if you need searchable text.

:::faq Frequently asked questions
Q: Does compressing a PDF reduce its quality?
A: In the standard mode only the images are affected: they lose some detail in exchange for a smaller size. Text and vector graphics are not changed. How much you notice depends on the strength you choose and how closely you zoom in.

Q: Why did my PDF barely get smaller?
A: PDFs that are mostly text, or whose images are already small, have little to remove. Only embedded JPEG images are recompressed, so a PDF built from PNG images or vector artwork gains little in the standard mode.

Q: Is it safe to compress a confidential PDF this way?
A: The compression runs in your browser and the file is not uploaded, so it does not leave your device. As with any document, avoid working on it on a shared or public computer.

Q: What is the difference between compressing a PDF and resizing its pages?
A: Compression changes how the images inside the file are stored. Resizing pages changes the paper size and does not make the pictures lighter. For a smaller file, compression is the tool you want.

Q: Can I compress several PDFs at once?
A: Compress them one at a time, or merge them first and compress the combined file once. Merging first also avoids paying the quality cost of compression twice.

Q: Will compression remove my bookmarks, links or form fields?
A: In the standard mode the text, links and fonts are left alone. Maximum mode rebuilds every page as a picture, so links and form fields stop working there.

:::
