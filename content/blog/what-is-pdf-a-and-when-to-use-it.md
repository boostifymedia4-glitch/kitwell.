---
title: What Is PDF/A? Versions, Uses and How to Convert Safely
description: PDF/A is the archival version of PDF. Learn what 1b, 2b, 2u, 3b, 3u and 4 mean, when you need it and why a real converter must never fake compliance.
excerpt: Understand PDF/A for long-term archiving: what the standard guarantees, how the versions differ, why fonts and colours can block a conversion and how to validate the result.
imageAlt: A PDF document with an archive badge and a checkmark on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: pdf-to-pdfa
tools: pdf-to-pdfa, repair-pdf, unlock-pdf, ocr-pdf, compress-pdf, edit-pdf-metadata
ctaHeading: Try it yourself
cta: Open <tool_pdf_to_pdfa>PDF to PDF/A</tool_pdf_to_pdfa>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Documents have a way of outliving the software that made them. A contract signed in 2026 might need to be opened in 2046, by a different program on a different computer. Ordinary PDFs usually survive, but they are allowed to depend on things outside the file: fonts installed on your machine, links to external content, even scripts. PDF/A exists to remove those dependencies.

This guide explains what PDF/A is, what its version names mean, when you really need it and how to convert a file without pretending that it complies when it does not.

:::takeaways
- PDF/A is a restricted form of PDF made for long-term archiving: everything needed to display the file must be inside it.
- The names such as 1b, 2b, 2u, 3b, 3u and 4 describe the generation of the standard and the level of conformance.
- A real conversion either meets the rules or says clearly why it cannot; it never relabels an ordinary PDF.
- Fonts that are not embedded, CMYK colour without a profile and some compression methods can block a conversion that keeps the text.
- Check important files with an independent validator such as veraPDF.
:::

## What PDF/A guarantees

PDF/A is an ISO standard family for archiving. A conforming file is self-contained and predictable:

- All fonts used on the pages are embedded, so the text looks the same everywhere.
- Colours are defined in a way that does not depend on the display device.
- There is no JavaScript, no launching of external programs and no encryption.
- Metadata is stored in a standard form, so software can identify the file for what it is.

The result is a document designed to look the same decades from now. The price is that some PDF features are not allowed, and the files can be larger.

## Understanding the version names

A name such as PDF/A-2b has two parts: a number and a letter.

The number is the generation of the standard:

- PDF/A-1 is the oldest, based on PDF 1.4. It is strict: no transparency and no layers.
- PDF/A-2 is based on PDF 1.7 and allows more features, such as transparency and compressed object structures.
- PDF/A-3 has the same rules as 2 but also allows files embedded as attachments.
- PDF/A-4 is the newest, based on PDF 2.0.

The letter is the level of conformance:

- b (basic) means the file will look the same.
- u (Unicode) adds a guarantee that the text can be copied and searched reliably, because every font maps its characters to Unicode.
- a (accessible) adds a tagged document structure for accessibility. A tagged structure cannot be created automatically from an arbitrary PDF, so it is not offered here.

PDF/A-4 also has variants for 3D content and attachments, called 4e and 4f, which are not offered either.

## Which version should you choose?

Start from the requirement. If an authority, archive or client names a version, use that one. If not:

- PDF/A-2b is the most widely accepted and the sensible default.
- PDF/A-1b is for systems that insist on the oldest version.
- The u versions, 2u and 3u, are a good choice when text must remain searchable and copyable.
- PDF/A-3b matches 2b and exists for workflows that attach source files.
- PDF/A-4 is for organisations that have moved to the newest standard.

If you do not know, choose 2b.

## How to convert in your browser

<tool_pdf_to_pdfa>PDF to PDF/A</tool_pdf_to_pdfa> works in your browser tab, so the file is read from your device.

1. Open the tool and add your PDF (up to 100 MB). A password-protected file must be unlocked first with <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf>, because a PDF/A file cannot be encrypted (see <post_password-protect-and-unlock-a-pdf>protecting and unlocking a PDF</post_password-protect-and-unlock-a-pdf>).
2. Choose the PDF/A version.
3. Choose how to convert: keep the text and fonts, or turn the pages into pictures.
4. Convert, read the list of what was done and download the file.

## Keep text, or turn pages into pictures?

The first mode changes only the structure and metadata of the file. The text stays selectable and the file stays small. It works only when the file already meets the content rules: every font embedded, no CMYK colour without a profile, no LZW compression, and annotations with an appearance. For the oldest version, there must also be no transparency, no layers and no JPEG 2000 images, and for the u versions and PDF/A-4 every font needs a text mapping.

The second mode renders each page as an image and builds a new PDF/A from the pictures. It always works, up to 200 pages, but the text can no longer be selected and the file becomes larger. If you need searchable text again, you can run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf> on a copy, but the result is then no longer the exact PDF/A you validated.

## Why a real converter says no

Many online converters promise PDF/A and simply change the label inside the file. That is dangerous: the file claims a guarantee it does not meet. A proper tool refuses instead. When Kitwell cannot keep your text and still meet the rules, it lists the reasons, for example the names of fonts that are not embedded, and offers the picture mode.

If a file seems damaged rather than non-compliant, try <tool_repair_pdf>Repair PDF</tool_repair_pdf> first. Our guide to <post_repair-a-corrupted-pdf>repairing a corrupted PDF</post_repair-a-corrupted-pdf> explains what can be recovered.

## What the tool changes

To make a file conform, the tool adds the PDF/A identification and XMP metadata, an sRGB colour profile as the output intent and a file identifier. It removes things that the standard forbids: JavaScript, forbidden actions, attachments, extra document information and annotation settings that are not allowed. Before it hands you the file, it checks its own work against the rules it applies.

## Validation: do not just take our word for it

The browser tool does not include a full PDF/A validator, so it cannot certify its result. During development, files produced in each of the offered versions were checked with veraPDF, a widely used open-source validator, and passed. If you must prove compliance, run your own file through veraPDF or another validator. This is standard practice for archives and legal deposits.

## Common mistakes to avoid

- Assuming that a PDF/A label means the file was validated.
- Choosing a version the receiving system does not accept.
- Converting a password-protected file without unlocking it first.
- Throwing away the original after turning pages into pictures.
- Archiving a huge file without compressing it first; <post_compress-pdf-without-losing-quality>compressing a PDF</post_compress-pdf-without-losing-quality> explains the trade-offs.
- Ignoring the document properties. <tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata> lets you review the title and author before archiving.

## A quick checklist

1. Find out which PDF/A version the recipient requires.
2. Unlock the file if needed.
3. Try keep-text mode first; use picture mode only if it is refused and the text can be given up.
4. Validate important files with veraPDF.
5. Keep the original PDF as well as the archive copy.

:::faq Frequently asked questions
Q: Is the result a certified PDF/A file?
A: No. Kitwell prepares your PDF in the version you choose and checks its own work against the rules it applies. Test files passed the veraPDF validator, but the browser tool itself does not include a full PDF/A validator.

Q: Which PDF/A version should I choose?
A: PDF/A-2b is the most widely accepted and the default. Choose another version only if the receiving system asks for it.

Q: Why was my PDF refused when I chose to keep the text?
A: PDF/A needs every font embedded and does not allow CMYK colour without a profile, LZW compression or annotations without an appearance. These cannot be fixed without changing the pages, so the tool lists what it found.

Q: Does converting to PDF/A make the file larger?
A: Usually a little, because fonts and a colour profile are embedded. Picture mode makes files much larger.

Q: Can a PDF/A file be password-protected?
A: No. Encryption is not allowed in PDF/A, so remove the password first.

Q: Is my PDF uploaded?
A: No. The tool runs inside your browser, so the file stays on your device.
:::
