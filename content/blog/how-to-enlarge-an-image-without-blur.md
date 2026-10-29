---
title: How to Enlarge an Image Without Making It Look Blurry
description: Make a small picture bigger with smooth resampling, choose a factor or an exact width, sharpen slightly and learn what enlarging can and cannot fix.
excerpt: A realistic guide to enlarging images: how resampling works, when 2x or 4x looks good, why detail cannot be invented, how sharpening helps and when to go back to the source instead.
imageAlt: A small picture growing into a larger one with smooth edges on a teal background
published: 2026-10-29
updated: 2026-10-29
tool: enlarge-image
tools: enlarge-image, image-resizer, image-compressor, photo-editor, svg-converter, image-format-converter
ctaHeading: Try it yourself
cta: Open <tool_enlarge_image>Enlarge Image</tool_enlarge_image>, or browse all of the <all_image>image tools</all_image>.
---

Sooner or later you have a picture that is too small. A logo from an old email, a product photo from a supplier, a screenshot that must fill a banner, a photo that a printer says is too small. The obvious fix is to make it bigger, and the obvious result is a soft, blocky picture.

You cannot add detail that was never captured, but you can enlarge a picture cleanly and make the best of what it has. This guide explains how enlarging works, how to choose the factor, how sharpening helps and when it is better to go back to the original.

:::takeaways
- Enlarging uses resampling: it creates new pixels by blending the neighbours. It does not invent real detail.
- Small, clean pictures enlarge better than blurry or heavily compressed ones.
- A factor of 2x usually looks fine. 4x makes weaknesses much more visible.
- A touch of sharpening can restore some crispness, and too much creates halos.
- If you have the original, such as a vector file or a bigger photo, use it instead.
:::

## What happens when you enlarge a picture

A picture is a grid of pixels. To make it twice as wide and twice as high, the program needs four times as many pixels. It has to create the missing ones, and it does so by looking at the pixels around each new spot and blending them. This is called resampling or interpolation.

Good resampling gives smooth edges and no blocky squares. But it only works with the information that exists. If a picture shows a licence plate as a smudge of six pixels, enlarging it produces a larger smudge, not readable letters. That is why a very small or blurry picture still looks soft after enlarging, however good the method is.

<tool_enlarge_image>Enlarge Image</tool_enlarge_image> uses high-quality resampling. It is not AI upscaling, which means it does not guess missing detail with a trained model. The result is smooth and clean, and honest about what the picture contains.

## When enlarging works well

Some pictures enlarge nicely.

- Pictures that are already sharp and clean, with little compression damage.
- Graphics with flat colours and clear edges, such as simple logos and icons.
- Pictures that will be seen from a distance or at a modest size, such as backgrounds.
- Enlargements of a factor of two or less.

And some do not.

- Small thumbnails.
- Photos with heavy JPG compression, where blocky patches and halos get bigger too.
- Screenshots of text. Enlarged text looks fuzzy because the original shapes were drawn with few pixels.
- Faces and fine detail that were never captured.

If you are unsure, enlarge a copy and look at it at the size where it will be used. A picture that looks soft on a large monitor can look fine on a phone.

## How to enlarge an image

The tool runs inside your browser tab, so the picture stays on your device.

1. Open the tool and add your pictures. You can add up to 20 files at once, each up to 25 MB.
2. Choose how to enlarge: by a factor, from 2x up to 4x, or to a target width. A target width must be larger than the original width.
3. Decide whether to sharpen slightly.
4. Choose the output format and quality, then enlarge and download.

The size of the result is shown next to the file, so you can see the new pixels at once. The output is limited to 16,000 pixels per side and about 100 megapixels, depending on what your browser can handle.

## Choosing a factor or a width

A factor is the quickest way to scale a picture, and a target width is better when you have a requirement.

- Use 2x for a general improvement. It doubles each side and quadruples the pixels.
- Use 3x or 4x only for pictures that are very clean or that will be seen small, because every weakness grows too.
- Use a target width when a form, a printer or a platform tells you a minimum size, such as a profile picture that must be at least 1000 pixels wide.

For print, work backwards. If a printer wants 300 dots per inch and the print will be 10 centimetres wide, you need about 1200 pixels across. If your picture is 600 pixels wide, a factor of 2 reaches that number, but the quality is still that of the 600-pixel original.

## Sharpening and quality

Enlarged pictures look a little soft because blending averages out edges. The option to sharpen slightly adds back some edge contrast. It is gentle on purpose.

You can add more sharpness afterwards if needed, but be careful. Too much sharpening produces bright outlines around objects, called halos, and makes noise and compression damage stand out. <tool_photo_editor>Photo Editor</tool_photo_editor> has a sharpen control and a live preview, and our guide to <post_how-to-edit-a-photo-in-your-browser>editing a photo in your browser</post_how-to-edit-a-photo-in-your-browser> explains the order in which edits are applied.

For JPG and WebP output, choose a high quality, since you do not want to add new compression damage to an enlarged picture. For JPG you can also set the background colour that fills transparent areas, because JPG cannot store transparency. PNG keeps every pixel and transparency, but makes bigger files.

## Use the source when you can

Enlarging is a last resort. If the source is better, use it.

- A logo or icon usually exists as a vector file. A vector file stays sharp at any size. Our guide to <post_how-to-convert-svg-to-png>converting SVG to PNG</post_how-to-convert-svg-to-png> explains how to export it at the exact size you need, and <tool_svg_converter>SVG to PNG / JPG</tool_svg_converter> does it in your browser.
- A photo may exist in a larger version on the camera, the phone or the cloud.
- A screenshot can be retaken on a larger screen, or at a higher zoom level.
- A scanned page can be scanned again at a higher resolution.

Ask the person who sent you the picture whether a larger version exists. That one question often saves a lot of work.

## After enlarging: size and format

An enlarged picture has many more pixels, so the file is much bigger. Check the size before you upload it. <tool_image_compressor>Compress Image</tool_image_compressor> reduces the file size, and our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> explains how to hit a target. If the result is larger than you need, <tool_image_resizer>Resize Image</tool_image_resizer> brings it down to an exact size, and our guide to <post_how-to-resize-an-image-without-losing-quality>resizing an image without losing quality</post_how-to-resize-an-image-without-losing-quality> covers that side.

If a platform wants a different format, <tool_image_format_converter>Convert Image Format</tool_image_format_converter> changes it. Remember that animated pictures use only their first frame.

## Enlarging pictures with codes

A common request is to enlarge a screenshot of a QR code that is too small to scan. A bigger picture can help the scanner, but only if the code is still clear: blurred modules stay blurred. Our guide to <post_how-to-scan-a-qr-code-from-an-image>scanning a QR code from an image</post_how-to-scan-a-qr-code-from-an-image> explains what to try.

## Common mistakes to avoid

- Expecting enlarging to bring back detail that was never there.
- Enlarging a picture four times when a smaller factor is enough.
- Sharpening too much and creating halos.
- Saving the result as a low-quality JPG.
- Forgetting that the file size grows fast.
- Not checking whether the original, or a vector version, is available.

## A quick checklist

1. Ask for a bigger original first.
2. Choose the smallest factor that does the job, or the exact target width.
3. Sharpen slightly, and check at the size where the picture will be used.
4. Export at a high quality, or as PNG if you will edit again.
5. Compress the result if it will go on a web page.

:::faq Frequently asked questions
Q: Is this AI upscaling?
A: No. It uses high-quality resampling, which makes enlarged images smooth and clean but cannot invent missing detail. Very small or blurry photos will still look soft.

Q: How large can the result be?
A: Up to 16,000 pixels per side and about 100 megapixels, depending on what your browser can handle.

Q: How many pictures can I enlarge at once?
A: Up to 20 files per batch, each up to 25 MB.

Q: Can I enlarge to an exact width?
A: Yes. Choose a target width, which must be larger than the width of the original.

Q: Does enlarging keep my camera and location details?
A: No. EXIF details and embedded colour profiles are not preserved.
:::
