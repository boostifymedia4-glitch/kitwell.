---
title: How to Crop PDF Pages and Trim Margins Without Losing Text
description: Trim white margins or keep only a chosen area of every PDF page with a live preview, and learn why cropping hides content instead of deleting it.
excerpt: Crop PDF pages by dragging a box or typing margins, apply it to all or some pages, and understand why cropping is not a way to hide sensitive content.
imageAlt: A PDF page with a crop frame trimming the white margins on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: crop-pdf
tools: crop-pdf, redact-pdf, rotate-pdf, extract-pdf-pages, scan-to-pdf, compress-pdf
ctaHeading: Try it yourself
cta: Open <tool_crop_pdf>Crop PDF</tool_crop_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Wide white margins waste space on a phone screen, shrink the text when you print a handout, and make a scanned page look like a photograph of a table. Cropping removes what you do not need from view and lets the content fill the page.

This guide explains how to crop PDF pages with a live preview, how to apply the same crop to many pages, and the most important thing to understand about cropping: it hides what is outside the box, it does not delete it.

:::takeaways
- Cropping changes the visible area of each page. The content outside it is hidden, not removed.
- Select the area to keep by dragging a box or typing margins, and watch the live preview.
- The crop is applied as a share of each page, so pages of different sizes are trimmed proportionally.
- Do not use cropping to hide sensitive information. Use Redact PDF for that.
- Check several pages after cropping, because layouts can differ from page to page.
:::

## When cropping helps

- A scanned document has thick black or grey borders from the scanner.
- A report exported from a spreadsheet has huge empty margins around a small table.
- You want to read a two-page spread, a slide or an article on a small screen.
- A form portal wants a page with the content as large as possible.
- You are preparing a handout and want the text to print larger.

Cropping is also the right tool when the page is the wrong shape for its content, for example a wide landscape table placed on a portrait page.

## How to crop a PDF in your browser

<tool_crop_pdf>Crop PDF</tool_crop_pdf> works inside your browser tab, so the file is read from your device. The steps:

1. Open the tool and add your PDF (up to 100 MB). Unlock it first if it is password-protected.
2. Pick a page to preview.
3. Drag the crop box over the area you want to keep, or type the margins to trim.
4. Choose which pages to crop: all of them or a selection.
5. Crop and download the new PDF.

## Dragging versus typing margins

Dragging is intuitive: you see the page and draw a frame around what matters. Typing margins is better when you want precision or the same result on several documents, for example 10 percent off each side.

You can combine both: drag roughly, then correct the numbers. Leave a little breathing room around the content. A crop that touches the edge of the text looks cramped, and printing can cut off the outermost millimetres.

## Pages of different sizes

The crop is stored as a share of each page, not as a fixed size in millimetres. That means the same proportions are applied to every page you choose, so pages of different sizes are trimmed by the same percentage. It works well for documents whose pages are all alike, such as scans from one machine.

It works less well when pages differ in layout. A document with one portrait page and one landscape page can come out oddly. In that case, crop the groups separately by choosing the pages for each run, or <tool_rotate_pdf>rotate</tool_rotate_pdf> the odd pages first so that all pages have the same orientation, as described in <post_how-to-rotate-pdf-pages-permanently>our rotation guide</post_how-to-rotate-pdf-pages-permanently>.

## Cropping hides, it does not delete

This is the point people most often get wrong. A PDF page has a visible area, called the crop box, and the content may extend beyond it. Cropping only changes that visible area. The text and pictures outside the box are still inside the file, and a PDF editor can bring them back.

Consequences:

- Cropping does not make the file smaller in any meaningful way.
- You must not rely on cropping to hide a name, an account number or a signature. Anybody can restore it.
- If you need the content outside the box to be gone for good, use <tool_redact_pdf>Redact PDF</tool_redact_pdf>, which rebuilds redacted pages as pictures so the hidden content does not exist in the result. Our guide to <post_how-to-redact-a-pdf-properly>redacting a PDF properly</post_how-to-redact-a-pdf-properly> explains the workflow.

For the same reason, cropping is safe for cosmetic work and unsafe for confidentiality.

## Cropping scans

Scans benefit most from cropping, because they often have shadows and borders at the edges. A few tips:

- Crop slightly inside the paper edge so no dark line remains.
- Keep a small margin of white around the text.
- If the scan itself is crooked, cropping cannot straighten it. Rescan it, or fix it before turning pictures into a PDF.

If the scan is made from photographs, <tool_scan_to_pdf>Scan to PDF</tool_scan_to_pdf> can turn them into clean pages with consistent size, and our guide to <post_convert-images-to-pdf>converting images to PDF</post_convert-images-to-pdf> explains the options.

## Keeping a few pages only

Sometimes the real aim is not a different margin but fewer pages. Use <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> to keep only the pages you need, and crop afterwards. Fewer pages and tighter margins together also reduce the work for the reader.

## What to check after cropping

- Is any text cut off at an edge? Look at the first, the last and a dense middle page.
- Do page numbers and footers still show?
- Are pages with different layouts all acceptable?
- Is the file still the size you expect? If it is large because of images, run <tool_compress_pdf>Compress PDF</tool_compress_pdf>.

## Common mistakes to avoid

- Cropping away a page number or footer without noticing.
- Using cropping to hide confidential content.
- Applying one crop to pages that have very different layouts.
- Cropping too tightly, so printed pages lose their outer edge.
- Overwriting the original file instead of saving a new one.

## A quick checklist

1. Preview a representative page and draw the crop box.
2. Leave a small margin around the content.
3. Apply to all pages only if they share a layout.
4. Check the first, a middle and the last page.
5. Keep the original, and use Redact PDF when content must really disappear.

:::faq Frequently asked questions
Q: Is the cropped-away content deleted?
A: No. Cropping changes the visible area of each page, but the content outside it is still inside the file. Do not rely on cropping to hide sensitive information.

Q: What happens if my pages have different sizes?
A: The same proportions are applied to every page you choose, so pages of different sizes are trimmed by the same percentage.

Q: Can I crop only some pages?
A: Yes. Choose which pages to crop before you download the result.

Q: Will cropping make my PDF smaller?
A: Not meaningfully, because the hidden content stays in the file. Use Compress PDF if you need a smaller file.

Q: Can I crop a password-protected PDF?
A: Not directly. Unlock it first, then crop the unlocked copy.

Q: Is my file uploaded?
A: No. The tool runs inside your browser, so the PDF stays on your device.
:::
