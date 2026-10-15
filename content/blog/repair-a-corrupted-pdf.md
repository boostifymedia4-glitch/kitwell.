---
title: How to Repair a Corrupted PDF That Will Not Open
description: Learn why PDFs get damaged, which problems a rebuild can fix and which it cannot, and how to repair a broken PDF in your browser without uploading the file.
excerpt: A PDF that will not open is not always lost. See what damage can be repaired, how to try it safely and what to do when it cannot be saved.
imageAlt: A cracked PDF document being mended with a wrench and a green check mark on a teal background
published: 2026-10-15
tool: repair-pdf
tools: repair-pdf, extract-pdf-text, pdf-to-jpg, compress-pdf, merge-pdf, unlock-pdf
ctaHeading: Try to repair your PDF
cta: Open <tool_repair_pdf>Repair PDF</tool_repair_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

You double-click a PDF and get “the file is damaged and could not be repaired”, a blank window, or a document that opens with half its pages missing. It might be an important report, a download that was interrupted, or an attachment that arrived broken. Before you ask for the file again, it is worth knowing that many of these cases can be repaired.

This guide explains how a PDF is built, why it breaks, what a repair can and cannot recover, and how to try it safely.

:::takeaways
- A PDF is a set of objects plus an index at the end; most “corrupted” files have a damaged or missing index, and the pages themselves are often intact.
- Repair PDF rebuilds the index and page structure in your browser and keeps the pages it can read.
- It cannot bring back content that is missing from the file, and damage inside compressed object streams cannot be rebuilt.
- If a file cannot be repaired, the tool says so and does not give you a download it did not create.
:::

## Why a PDF stops opening

A PDF file is a collection of objects, such as pages, fonts and images, followed by a cross-reference table that lists where each object is, and a small trailer that points to the table. A viewer reads the trailer first, then uses the table to find everything else.

If the end of the file is damaged, the viewer cannot find the table, and it reports a corrupted file even when every page is still inside. The usual causes:

- A download that stopped early, so the file is cut off and the end is missing.
- An email gateway, a flaky USB drive or a cloud sync that wrote only part of the file.
- A program that crashed while saving or exporting.
- Extra data added before the PDF header, for example by a faulty export or transfer tool.
- Real storage errors on a failing disk, which damage the content itself.

## First, quick checks

Before you try a repair, rule out the simple causes:

1. Open the file in a different program, such as your browser or another PDF reader. Some viewers are stricter than others.
2. Check the file size. A file that is only a few kilobytes, or far smaller than you expect, was probably cut off.
3. Download or copy it again from the source. A second transfer often fixes a damaged one.
4. If it is password-protected, make sure you are entering the password correctly. A protected file that fails to open is not necessarily corrupted. With the password, <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf> removes the protection first.

## How to repair a PDF in your browser

<tool_repair_pdf>Repair PDF</tool_repair_pdf> works inside your browser tab, so the damaged file is not uploaded anywhere.

1. Open the tool and choose the PDF (up to 100 MB). A password-protected file must be unlocked first.
2. Start the repair. The tool looks for the objects in the file, rebuilds the cross-reference table and trailer, and when needed gathers the pages it can read into a new page structure.
3. Read the report under the result. It lists the problems found, what was done and how many pages are in the repaired file.
4. If a file was produced, open it and check the pages before you rely on it, then download it.

## What a repair can fix

Repair works on the structure of the file:

- A missing or wrong object list (the cross-reference table).
- A missing trailer or end-of-file marker.
- Junk data before the PDF header.
- A broken page list.
- A file that was cut off: the pages that were saved before the cut can often be recovered.

When the file opens fine but only had small structural problems, the tool says so and gives you a cleaned copy.

## What a repair cannot fix

Be realistic about the limits, because they are physical, not a matter of effort:

- Content that is no longer in the file. If the end of a long document was never downloaded, those pages do not exist and cannot be reconstructed.
- Damaged pages, images or fonts. A page whose data is broken cannot be brought back, so it may be left out of the repaired file.
- Damage inside compressed object streams, which this tool cannot rebuild.
- Some files are too damaged to save at all. In that case the tool tells you that nothing could be recovered; it never hands you a download that it did not create.

A repaired file may therefore have fewer pages than the original, and after a heavy repair the order of the pages can change. Always compare the page count and a few pages with what you expected.

## Checking a repaired file

A repaired PDF needs a quick inspection:

1. Open it and scroll through. Look for blank pages, garbled text and missing images.
2. Check the page count against what you expected.
3. Search for a word you know is inside. If the text is found, the text layer survived.
4. For important documents, ask the sender for a fresh copy as soon as possible, and treat the repaired file as a stop-gap.

If you only need the words from a document that opens badly, <tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text> can copy the selectable text out of a readable file, and <tool_pdf_to_jpg>PDF to JPG</tool_pdf_to_jpg> renders the pages as pictures.

## After the repair

- A damaged file is often larger than it needs to be, so run <tool_compress_pdf>Compress PDF</tool_compress_pdf> on the repaired copy if size matters. Our guide to <post_compress-pdf-without-losing-quality>compressing a PDF without losing quality</post_compress-pdf-without-losing-quality> covers the options.
- If you were about to combine files, repair the broken one first and then use <tool_merge_pdf>Merge PDF</tool_merge_pdf>; <post_how-to-merge-pdf-files>how to merge PDF files</post_how-to-merge-pdf-files> explains the order and limits.

## How to avoid damaged PDFs

- Let downloads finish and compare the file size with what the source states.
- Do not unplug a drive while a file is being saved or copied.
- Keep a second copy of important documents in another place.
- Avoid renaming a file’s extension to change its type; a file with the wrong extension is a common cause of “cannot open”.
- Export from the program again if you can. A fresh export is better than any repair.

:::faq Frequently asked questions
Q: Can every corrupted PDF be repaired?
A: No. Structural damage, such as a missing index or a cut-off end, can often be repaired. Missing or broken content cannot be recreated, and some files are too damaged to save. The tool tells you when it cannot produce a usable file.

Q: Is my PDF uploaded when I repair it?
A: No. Repair PDF works inside your browser, so the file stays on your device.

Q: Why does the repaired PDF have fewer pages?
A: Pages whose data was missing or damaged cannot be recovered, so they are left out. The report under the result states how many pages were kept.

Q: What if my PDF opens but looks wrong?
A: Then it may not be corrupted at all. The tool will report that no repair was needed and give you a cleaned copy. Wrong-looking text or missing fonts usually come from the program that created the file.

Q: Can it repair a password-protected PDF?
A: Not directly. Unlock the file first with the password, then repair the unlocked copy.
:::
