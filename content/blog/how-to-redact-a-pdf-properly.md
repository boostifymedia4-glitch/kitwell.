---
title: How to Redact a PDF Properly So Hidden Text Is Really Gone
description: Black out names, numbers and areas in a PDF so the text underneath is destroyed, not just covered. Learn the right workflow and the checks to do.
excerpt: Why a black box on top of text is not redaction, how page-to-image redaction removes the content for good and how to find and check every match before sharing.
imageAlt: A PDF page with black redaction bars over lines of text on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: redact-pdf
tools: redact-pdf, ocr-pdf, edit-pdf-metadata, crop-pdf, protect-pdf, compare-pdf
ctaHeading: Try it yourself
cta: Open <tool_redact_pdf>Redact PDF</tool_redact_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Every year, organisations publish PDFs with black boxes over names and numbers, only for journalists to select the text under the boxes, copy it and read it. The boxes were just drawings on top of the page. The words were still there.

Real redaction destroys the covered content. This guide explains the difference between covering and removing, how to redact a PDF in your browser so the underlying text is gone, and which checks to run before a redacted file leaves your hands.

:::takeaways
- A black rectangle drawn on top of text is not redaction: the text stays selectable underneath.
- Real redaction removes the content. Kitwell rebuilds every page that has a redaction as a picture with the black boxes painted in.
- Redacted pages lose selectable text, links and form fields, which is the price of destroying the content.
- Automatic search finds text inside a single line; always review every page and add boxes by hand where needed.
- Check the result by trying to select and search for the hidden words, and look at the document properties.
:::

## Covering is not redacting

Many tools offer a rectangle or highlighter in black. In the PDF file, the rectangle is an extra object placed above the text. The text object is still there, so:

- You can select the area and copy the words.
- Search finds them.
- A screen reader reads them aloud.
- A PDF editor can move or delete the black box.

If the information is confidential, this is a data leak waiting to happen. Redaction in the strict sense means the content is removed from the file, so nothing remains to be recovered.

## How redaction works here

<tool_redact_pdf>Redact PDF</tool_redact_pdf> destroys content by changing what the page is. Every page that contains at least one redaction is rendered into a picture with the black boxes painted in, and the new file uses that picture instead of the original page. The text, vector objects and images underneath do not exist in the new file. Pages that you did not redact are copied unchanged, so they keep their selectable text.

The consequences are straightforward and important:

- Redacted pages cannot have their text selected, because they are pictures now.
- Links and form fields on redacted pages stop working.
- Document properties such as title and author are removed from the result unless you choose to keep them.

If you need searchable text again afterwards, run <tool_ocr_pdf>OCR PDF</tool_ocr_pdf>; our guide to <post_ocr-scanned-pdf-searchable>making a scanned PDF searchable</post_ocr-scanned-pdf-searchable> explains what to expect. The recognition only reads what is visible, so the redacted words stay black.

## How to redact a PDF step by step

The tool runs in your browser tab, so the file is read from your device.

1. Open the tool and add your PDF (up to 100 MB). Unlock it first if it has a password.
2. Choose a page and draw boxes over everything that must disappear.
3. Or search for words, email addresses and numbers to mark all matches automatically.
4. Review every page, and add boxes by hand wherever search missed something.
5. Apply the redactions and download the result.
6. Check the result before you share it.

## Drawing boxes and searching

Drawing is the most reliable method because you see exactly what will be covered. It is the only method that works for scanned pages and for text that is part of a picture, because those have no selectable words to search.

Search is fast for long documents. Type a name, an email address or a number and mark all matches at once. It has limits you should understand:

- It works on selectable text only.
- It finds matches that sit inside a single run of text. A phrase that the PDF has split into pieces can be missed.
- It cannot read pictures of text.

So treat search as a first pass, not as a guarantee. Go through every page afterwards.

## What to redact

Think about what could identify a person or reveal a secret, including things that are easy to overlook:

- Names, addresses, phone numbers and email addresses.
- Account, identification and case numbers.
- Signatures and handwritten notes.
- Headers and footers that repeat a name on every page.
- Small print, margin notes and watermarks that contain details.
- Information visible in pictures, such as a name tag in a photograph.

If a number appears in several forms, for example with and without spaces, search for each form, or redact by hand.

## Checks before you share

Never trust a redaction you have not tested:

1. Open the new file and try to select text on the redacted area. Nothing should be selectable on redacted pages.
2. Use the viewer’s search function to look for a word you redacted. It must find nothing.
3. Scroll through every page, not only those you remember marking.
4. Check the document properties. If you kept them, make sure they do not contain the name you hid. <tool_edit_pdf_metadata>Edit PDF Metadata</tool_edit_pdf_metadata> can inspect and clear them, and <post_how-to-remove-metadata-from-photos-and-pdfs>our guide to removing metadata</post_how-to-remove-metadata-from-photos-and-pdfs> explains what files hide.
5. Compare the original and the redacted file with <tool_compare_pdf>Compare PDF</tool_compare_pdf> to confirm that only the intended places changed; <post_how-to-compare-two-pdf-files>our comparison guide</post_how-to-compare-two-pdf-files> explains how to read the result.

## Redaction versus other tools

- Cropping only hides content outside a box; it does not delete it. See <post_how-to-crop-pdf-pages>how to crop PDF pages</post_how-to-crop-pdf-pages>.
- Watermarks are drawn on top of the page and can be removed; see <post_how-to-add-a-watermark-to-a-pdf>adding a watermark to a PDF</post_how-to-add-a-watermark-to-a-pdf>.
- Passwords protect the whole file, not parts of it. <tool_protect_pdf>Protect PDF</tool_protect_pdf> is useful for transport, but anybody with the password sees everything unredacted.

Use redaction when part of a document must never be seen, and passwords when the whole file must only be seen by the right person. Often you use both.

## Common mistakes to avoid

- Relying on a black rectangle from a general PDF editor.
- Trusting search to find every match.
- Forgetting repeated headers, footers and metadata.
- Not testing the result.
- Overwriting the only copy. Always keep the original in a safe place.

## A quick checklist

1. Keep the original safe and work on a copy.
2. Mark everything: boxes first for scans, search for text.
3. Review every page.
4. Apply, then try to select and search for the hidden words.
5. Check the document properties before sharing.

:::faq Frequently asked questions
Q: Is the hidden text really removed?
A: Yes. Every page with a redaction is rebuilt as a picture with the black boxes painted in, so the text and objects underneath do not exist in the new file. Pages you did not redact are copied unchanged.

Q: Why can I not select text on redacted pages any more?
A: Because those pages are pictures now. That is how the underlying content is destroyed. Run OCR PDF afterwards if you need searchable text; the redacted words stay black.

Q: Does the search find every match automatically?
A: No. It marks matches that sit inside a single line of text. A phrase split into pieces, or text that is part of an image, may be missed, so review every page.

Q: What happens to links and form fields on redacted pages?
A: They stop working, because the pages become pictures.

Q: Are the document properties removed?
A: They are removed from the result unless you choose to keep them.

Q: Is my PDF uploaded?
A: No. The tool runs inside your browser, so the file stays on your device.
:::
