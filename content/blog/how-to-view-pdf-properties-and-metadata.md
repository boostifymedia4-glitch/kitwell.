---
title: How to View a PDF and Read Its Properties and Metadata
description: Open a PDF privately in your browser, then inspect its title, author, dates, page count, page sizes and version, and copy the details as JSON when you need them.
excerpt: A practical guide to viewing PDFs and reading their hidden properties: what a viewer can and cannot do, which metadata a file stores, how to spot odd dates and authors and what to do next.
imageAlt: A PDF page with a magnifying glass over its properties list on a teal background
published: 2026-10-30
updated: 2026-10-30
tool: pdf-metadata-viewer
tools: pdf-metadata-viewer, pdf-viewer, edit-pdf-metadata, unlock-pdf, extract-pdf-text, compare-pdf
ctaHeading: Try it yourself
cta: Open <tool_pdf_metadata_viewer>View PDF Metadata</tool_pdf_metadata_viewer>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

A PDF is more than the pages you see. Inside the file there is a small record of information about the document: its title, its author, the program that made it, the dates on which it was created and changed, the number of pages and the size of each page. Most people never look at it. But it answers useful questions. Who made this file? When? With what? Is it the version I think it is? Are all pages the same size?

This guide shows how to open a PDF without installing anything, how to read its properties and what the details tell you, including the things that are worth noticing before you share a file.

:::takeaways
- A viewer in your browser opens a PDF with zoom and page navigation, without an upload or an install.
- The metadata viewer shows the title, author, dates, page count, page sizes and PDF version.
- Only the fields stored in the file are shown. Many PDFs leave some of them empty.
- Both tools are read-only. To change or remove metadata, use a separate tool.
- Password-protected PDFs must be unlocked first.
:::

## What a PDF viewer is for

Sometimes you only want to look at a document. Perhaps you are on a computer that is not yours, or you do not want to install a program for one file, or you want to check what a file contains before you decide what to do with it.

<tool_pdf_viewer>PDF Viewer</tool_pdf_viewer> opens a PDF in your browser tab. You can scroll through the pages, jump with the page controls and zoom in and out. The file is read on your device.

It is a reader, not an editor. You cannot annotate, fill in forms or search for text there. If you need to change pages, there are separate tools: our guide to <post_how-to-reorder-and-remove-pdf-pages>reordering and removing PDF pages</post_how-to-reorder-and-remove-pdf-pages> covers one of them. For reading the text out of the file, <tool_extract_pdf_text>Extract Text from PDF</tool_extract_pdf_text> turns the pages into text that you can copy.

## What metadata is stored in a PDF

Metadata is information about the file rather than part of the pages. A PDF can hold:

- The title, which browsers often show in the tab.
- The author, subject and keywords.
- The creator, which is the program in which the original document was written, and the producer, which is the program that made the PDF.
- The date of creation and the date of the last change.
- The version of the PDF format.
- The number of pages and the size of each page.

Some of these are set by you when you save a document, some are filled in by the program automatically and some are left empty.

## How to read a PDF's properties

<tool_pdf_metadata_viewer>View PDF Metadata</tool_pdf_metadata_viewer> shows the record at a glance.

1. Open the tool and add your PDF. It accepts files up to 100 MB.
2. Review the document properties: title, author, creation dates, page count, page sizes and version.
3. Copy the details as JSON if you need them somewhere else.

The tool works in your browser tab, so the file stays on your device.

If a field is missing, that does not mean the tool failed. Many PDFs do not set every field, and only the fields actually stored in the file are shown.

## What the details can tell you

A few readings are useful in everyday life.

- Dates. A creation date far in the past or a last-changed date that is later than the creation date tells you something about the history of the file. If a document that is supposed to be new shows an old date, it was probably made from an old file.
- Producer and creator. They show whether a file came from a word processor, a scanner, a browser print function or a conversion tool. A scan made by a phone app looks different from a document exported by an office program.
- Page sizes. If the pages are not all the same size, a printer may scale some of them. A mix of A4 and letter pages is a common surprise after merging files.
- Page count. A quick check that nothing is missing.
- Version. It shows which version of the PDF format the file uses, which matters for old software and for archive rules. Our guide to <post_what-is-pdf-a-and-when-to-use-it>PDF/A and when to use it</post_what-is-pdf-a-and-when-to-use-it> explains why some archives insist on particular versions.

None of these details proves that a document is genuine or fake. They are clues. Anybody can change them, so treat them as a starting point and not as evidence.

## Copying the details as JSON

The tool can give you the properties as JSON, a plain text format that programs read easily. That is handy when you want to keep a record of many files, paste details into a ticket or compare two documents by their properties.

If you paste the JSON into a larger file, our guide to <post_how-to-minify-json-and-save-bytes>minifying JSON</post_how-to-minify-json-and-save-bytes> explains how to keep it compact, and <tool_compare_pdf>Compare PDF</tool_compare_pdf> goes further when you want to see the actual differences between two versions of a document, page by page.

## What to check before you share a file

Metadata can reveal more than you intend. A file named final may show the name of an employee as the author, the title of an earlier project as the title or the names of programs you would rather not mention.

Before you send a PDF outside your organisation, read its properties. If something should not be there, change it or remove it. This tool only reads. To edit the title and author, or to remove all metadata, use <tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata>, and read our guide to <post_how-to-remove-metadata-from-photos-and-pdfs>removing metadata from photos and PDFs</post_how-to-remove-metadata-from-photos-and-pdfs>, which also explains what removing metadata does not cover, such as hidden text and comments.

## Password-protected PDFs

A PDF that is protected by a password cannot be read by either tool, and you will see a clear message. Unlock the file first with <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf>, using the password that you were given. Our guide to <post_password-protect-and-unlock-a-pdf>protecting and unlocking a PDF</post_password-protect-and-unlock-a-pdf> explains how that works and why the tool never tries to guess passwords.

## Damaged files

If a PDF does not open at all, or the viewer shows fewer pages than you expect, the file may be damaged. Our guide to <post_repair-a-corrupted-pdf>repairing a corrupted PDF</post_repair-a-corrupted-pdf> explains what can and cannot be recovered.

## Limits

Both tools are read-only. The viewer has no annotation, form filling or text search, and the metadata viewer cannot edit or remove anything. Each accepts a PDF of up to 100 MB. Very large or complex pages can take a moment to draw.

## Common mistakes to avoid

- Treating metadata as proof that a document is genuine.
- Sharing a file without reading its author and title fields.
- Expecting every field to be filled in.
- Trying to open a protected file without unlocking it.
- Assuming that the viewer can edit or search the document.
- Forgetting that mixed page sizes cause surprises when printing.

## A quick checklist

1. Open the file in the viewer and look at every page.
2. Read the properties: title, author, dates, page count, sizes and version.
3. Look for anything that should not be shared.
4. Edit or remove metadata with a separate tool, if needed.
5. Keep your original file before you change anything.

:::faq Frequently asked questions
Q: Can I edit or annotate the PDF here?
A: No. This is a read-only viewer. Use the page tools to rotate, reorder or extract pages.

Q: Why is some metadata missing?
A: Many PDFs do not set every field. Only fields actually stored in the file are shown.

Q: Can I remove metadata with the viewer?
A: No. This tool only reads metadata. It does not modify the file. Use Edit PDF Metadata to change or remove it.

Q: Can I copy the properties?
A: Yes. You can copy the details as JSON.

Q: What if my PDF has a password?
A: Unlock it first. Password-protected PDFs cannot be read by these tools.
:::
