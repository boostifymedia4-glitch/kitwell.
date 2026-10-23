---
title: How to Rotate PDF Pages and Save the Change Permanently
description: Fix sideways or upside-down pages in a PDF, rotate one page or all of them, and save the new orientation so it stays that way in every viewer.
excerpt: Rotate single pages or the whole PDF with thumbnail previews, learn why scans arrive sideways and how to save the rotation so it sticks.
imageAlt: A sideways PDF page being turned upright with a curved arrow on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: rotate-pdf
tools: rotate-pdf, reorder-pdf-pages, crop-pdf, extract-pdf-pages, merge-pdf, scan-to-pdf
ctaHeading: Try it yourself
cta: Open <tool_rotate_pdf>Rotate PDF</tool_rotate_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Almost everyone has opened a PDF and found a page lying on its side. It happens with scans from office copiers, with photos turned into documents and with files assembled from several sources. Your viewer lets you rotate the view, but the next person who opens the file sees the same sideways page again, because the rotation was only a viewing setting.

This guide explains how to fix the orientation for good: rotate individual pages or the whole document, save a new PDF, and avoid the small traps that make a rotated page look wrong later.

:::takeaways
- Rotating the view in a PDF reader is temporary. Saving a rotated copy makes the change permanent.
- You can rotate one page, several pages or all pages, in steps of 90 degrees.
- The rotation is stored as a page attribute, so the page content is not redrawn and nothing is lost.
- Mixed portrait and landscape pages are normal; rotate only the ones that are wrong.
- Always check each page after saving, because a page rotated twice ends up upside down.
:::

## Why pages end up sideways

A PDF page has a size and a rotation setting. Many things can leave the rotation wrong:

- A scanner or copier feeds the paper in landscape and records it that way.
- A phone photo of a document is stored as a landscape picture and placed on the page without turning it.
- A document is built from files that were created in different orientations.
- Somebody rotated the page only in their viewer and never saved it.

None of this affects the text or pictures themselves. Only the angle at which the page is shown is wrong, which is why it can be fixed without any loss of quality.

## How to rotate a PDF in your browser

<tool_rotate_pdf>Rotate PDF</tool_rotate_pdf> shows every page as a thumbnail, so you can see the effect before you save. It runs in your browser, so the file is read from your device.

1. Open the tool and add your PDF (up to 100 MB). Unlock it first if it is password-protected.
2. Wait for the thumbnails to appear.
3. Rotate individual pages with the buttons next to each thumbnail, or rotate all pages at once.
4. Look at every thumbnail. A page that was rotated by mistake can be turned back.
5. Save the rotated PDF and download it.

## What “permanent” means here

A PDF stores a rotation value for every page, a multiple of 90 degrees. The tool changes that value in the new file. The page content is not redrawn and not converted to pictures, so text stays selectable, links keep working and the file size barely changes.

The new file is a copy. Your original is untouched, which is useful if you rotate the wrong pages and want to start again. Save the result under a new name, for example scan-rotated.pdf.

## Rotating one page, some pages or all pages

- One wrong page: rotate just that thumbnail. This is the most common case in a scanned stack.
- Every page wrong in the same way, for example a whole landscape scan: use the option that rotates all pages at once.
- A mix: rotate the groups separately. It is quicker to rotate all pages first and then turn back the few that were already correct.

Direction matters. A page that is lying on its left side needs a quarter turn to the right, and an upside-down page needs a half turn. If you click the wrong way, simply turn the page again until the thumbnail looks right.

## Rotating is not the same as cropping or reordering

Three operations are easy to confuse:

- Rotate changes the angle of a page.
- <tool_crop_pdf>Crop PDF</tool_crop_pdf> changes the visible area of a page, for example to trim a wide white margin (see <post_how-to-crop-pdf-pages>how to crop PDF pages</post_how-to-crop-pdf-pages>).
- <tool_reorder_pdf_pages>Reorder PDF Pages</tool_reorder_pdf_pages> changes the position of pages in the document.

A badly scanned page may need more than one of them. Rotate first, so you can see what you are working with, and crop or reorder afterwards. If a document needs only some of its pages, <tool_extract_pdf_pages>Extract PDF Pages</tool_extract_pdf_pages> can pick them out.

## Preventing sideways pages in the first place

- Scan documents in the orientation of the paper, and check the preview before sending the scan.
- When you photograph pages, hold the phone parallel to the paper and use the same orientation for every page.
- When you build a PDF from pictures, use a tool that lets you set the page orientation. Our guide to <post_convert-images-to-pdf>converting images to PDF</post_convert-images-to-pdf> explains how, and <tool_scan_to_pdf>Scan to PDF</tool_scan_to_pdf> offers automatic or fixed orientation.
- When you combine files with <tool_merge_pdf>Merge PDF</tool_merge_pdf>, check the result page by page. Our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> lists the other things to look at.

## What to check after saving

Open the new file in a normal viewer and scroll through it, not only the pages you touched:

- Are all pages upright?
- Did a page that was already correct get rotated by the “all pages” option?
- Are pages that are meant to be landscape, such as a wide table, still landscape?
- Do the page numbers or headers read the right way up?

If a page is still wrong, run the tool again on the new file. Rotations add up, so a page turned right twice is upside down.

## Common mistakes to avoid

- Relying on the viewer’s rotate button and sending the file without saving the change.
- Rotating all pages when only a few were wrong.
- Rotating the same page twice and not noticing.
- Judging the result from the first page only.
- Overwriting the original instead of saving a new copy.

## A quick checklist

1. Add the PDF and wait for the thumbnails.
2. Rotate only the pages that are wrong, or all pages when they all are.
3. Check every thumbnail before saving.
4. Save, download and scroll through the result.
5. Keep the original until you are sure the new file is right.

:::faq Frequently asked questions
Q: Is the rotation really saved in the file?
A: Yes. The tool writes the new rotation into a new PDF. It opens the right way up in any viewer, not only in the one you used.

Q: Does rotating a PDF reduce its quality?
A: No. The page content is not redrawn, only the page’s rotation value changes. Text stays selectable and pictures keep their quality.

Q: Can I rotate only some pages?
A: Yes. Rotate individual thumbnails, or rotate all pages at once when they all need the same change.

Q: Can I rotate by a small angle to straighten a crooked scan?
A: No. Pages turn in steps of 90 degrees. A scan that is slightly crooked needs to be scanned again or straightened in an image editor before it is turned into a PDF.

Q: Can I rotate a password-protected PDF?
A: Not directly. Unlock it first, then rotate the unlocked copy.

Q: Is my file uploaded?
A: No. The tool works inside your browser, so the PDF stays on your device.
:::
