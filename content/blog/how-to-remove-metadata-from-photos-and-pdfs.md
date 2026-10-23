---
title: How to Remove Metadata From Photos and PDFs Before Sharing
description: Photos and PDFs carry hidden details such as location, camera, author and dates. Learn what metadata is, what it can reveal and how to remove it in your browser.
excerpt: Find out what hidden data your files carry, how to strip location and author details from photos and PDFs before you share them, and what metadata removal does not cover.
imageAlt: A document and a photo with a tag being peeled off, on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: edit-pdf-metadata
tools: edit-pdf-metadata, image-compressor, image-resizer, image-format-converter, redact-pdf, pdf-metadata-viewer
ctaHeading: Try it yourself
cta: Open <tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Every file you create carries more than you see. A holiday photo knows which phone took it and where you were standing. A report knows who wrote it, in which program and on which dates. This hidden information is called metadata, and most of the time it is harmless. Sometimes it is not: a photo posted online can reveal a home address, and a PDF sent to a client can show the name of a colleague or the program that produced it.

This guide explains what metadata is, what it can reveal, how to remove it from photos and PDFs in your browser and what it does not cover.

:::takeaways
- Metadata is information stored inside a file about the file: author, dates, device, software and sometimes location.
- Photos carry EXIF data, including camera model and GPS location. Re-encoding a picture in the browser removes it.
- PDFs carry document information and XMP metadata. The metadata tool can edit it or remove it all.
- Removing metadata does not change the visible content; hidden text, comments and the picture itself stay.
- Review a file before sharing; do not assume that metadata has been cleaned.
:::

## What metadata is

Metadata is data about data. It is stored in the file but is not part of the visible page or picture. Two families matter here.

For photos, the standard is EXIF. It typically records:

- The camera or phone model and the lens.
- Date and time the picture was taken.
- Exposure settings.
- GPS coordinates, if location was enabled on the device.
- Sometimes the editing program used.

For PDFs, there are two layers:

- The document information: title, author, subject, keywords, creator program, producer program and creation and modification dates.
- XMP metadata, a more detailed record that carries similar fields and more.

## Why it matters

Most metadata is useless to others, but a few situations make it dangerous:

- A photo of an item for sale taken at home contains the coordinates of your home.
- A PDF contract carries the name of the employee who prepared it, or an old title that reveals an earlier client.
- A file exported from a template includes the template’s original author.
- Dates can reveal when a document was really made, which may not match the date you claim.
- The program name can disclose which software and version you use.

Metadata is not a secret kept in a vault; anybody with the file can read it with free tools. Removing it before sharing is basic hygiene.

## Removing metadata from PDFs

<tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata> works inside your browser tab, so the PDF is read from your device.

1. Open the tool and add your PDF (up to 100 MB). Unlock it first if it has a password.
2. The current properties are filled in. To see them without changing anything, <tool_pdf_metadata_viewer>PDF Metadata Viewer</tool_pdf_metadata_viewer> shows them.
3. Edit the title, author, subject and keywords, or choose Remove all metadata.
4. Save and download the updated PDF.

Remove all metadata clears the document information, which covers title, author, subject, keywords, creator, producer and dates, and the embedded XMP metadata. It does not touch the page text, images or comments. If you want to keep a useful title, edit the fields instead and delete only the author and software details.

The tool also supports non-Latin text: titles and authors in Urdu, Arabic, Chinese and other scripts are saved correctly.

## Removing metadata from photos

For pictures, the browser tools that re-encode an image through a canvas drop EXIF metadata as a side effect, including camera model and GPS location. That means any of these tools produce a clean copy:

- <tool_image_compressor>Compress Image</tool_image_compressor> re-encodes the picture and shows you the new size.
- <tool_image_resizer>Resize Image</tool_image_resizer> creates a smaller version, which is also what you want for most web uses.
- <tool_image_format_converter>Convert Image Format</tool_image_format_converter> changes the format and re-encodes in the same step.

Embedded colour profiles are dropped as well, which can shift colours slightly on some screens. For sharing photos on forums, marketplaces and social networks, this trade-off is usually welcome. Our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> explains the resizing routine, and <post_how-to-convert-webp-to-jpg>converting WebP to JPG</post_how-to-convert-webp-to-jpg> shows another way to get a clean copy.

Check the result: open the converted picture and look at its properties in your operating system. The GPS fields should be gone.

## What removing metadata does not do

Be clear about the boundary:

- The visible content is unchanged. A name written in the document text stays.
- Hidden text, comments and annotations in a PDF are not removed by the metadata tool. If parts of the content must not be seen, use <tool_redact_pdf>Redact PDF</tool_redact_pdf>, and read our guide to <post_how-to-redact-a-pdf-properly>redacting a PDF properly</post_how-to-redact-a-pdf-properly>.
- Photos can still show a landmark, a street sign or a reflection that reveals the place. Metadata is only one of the ways a picture betrays its location.
- Watermarks and visible stamps remain.
- File names can contain names or places as well. Rename the file before sharing.

## A sensible sharing routine

1. Decide who will receive the file and what they should know.
2. Look at the metadata. For PDFs, use the viewer; for photos, check the file properties.
3. Remove or edit what is not needed.
4. Check the visible content for names and details.
5. Rename the file so the name does not reveal anything.
6. Keep your original, with all its metadata, in a private place.

Metadata can also be useful. Photographers rely on EXIF to sort pictures, and archives rely on titles and dates. Strip it from the copies you publish, not from your master files.

## Common mistakes to avoid

- Assuming that a file is clean because it looks clean.
- Removing metadata but leaving hidden text or comments.
- Posting photos of valuables or children with GPS data intact.
- Forgetting the file name.
- Deleting the original together with its useful metadata.

## A quick checklist

1. Look at what metadata the file carries.
2. Remove all of it, or edit it to what you want to show.
3. For photos, re-encode through a tool that drops EXIF.
4. Redact content that must not be visible.
5. Rename the file and keep the original.

:::faq Frequently asked questions
Q: What does Remove all metadata remove from a PDF?
A: The document information, which covers title, author, subject, keywords, creator, producer and dates, and the embedded XMP metadata. It does not touch the page text, images or comments.

Q: Why edit metadata at all?
A: To fix a wrong title shown in browser tabs and search results, to credit the right author, or to strip personal details before sharing a file.

Q: Do image tools remove GPS location from photos?
A: Re-encoding through a canvas drops EXIF metadata such as camera model and GPS location, so the output of the compressor, resizer and format converter does not carry it.

Q: Does it support non-Latin text in titles and authors?
A: Yes. Titles and authors in Urdu, Arabic, Chinese and other scripts are saved correctly.

Q: Can I edit a password-protected PDF?
A: Not directly. Unlock it first, then edit the unlocked copy.

Q: Are my files uploaded?
A: No. The tools run inside your browser, so the files stay on your device.
:::
