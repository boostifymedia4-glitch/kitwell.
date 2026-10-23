---
title: How to Resize an Image Without Losing Quality
description: Resize photos by exact pixels or percentage while keeping the aspect ratio. Learn why shrinking works better than enlarging and how to choose a size.
excerpt: A practical guide to resizing pictures for web, email and print: pixels versus percentage, the aspect-ratio lock, batch resizing and what happens to quality.
imageAlt: A photo being scaled down with arrows pointing inward on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: image-resizer
tools: image-resizer, image-cropper, image-compressor, enlarge-image, image-format-converter, image-rotator
ctaHeading: Try it yourself
cta: Open <tool_image_resizer>Resize Image</tool_image_resizer>, or browse all of the <all_image>image tools</all_image>.
---

Phone cameras take pictures that are far larger than most screens need. A 12-megapixel photo is about 4,000 pixels wide, while a web page might show it at 800 pixels, and an email client at even less. Sending the full picture wastes bandwidth, slows pages and often breaks upload limits. Resizing brings the picture down to the size it will actually be shown at.

This guide explains how resizing works, the difference between pixels and percentages, why the aspect-ratio lock matters, how to resize many pictures at once and why shrinking is safe while enlarging is not.

:::takeaways
- Resizing changes the pixel dimensions of a picture, which usually reduces file size a great deal.
- Shrinking gives the best quality; enlarging cannot add detail and makes pictures look softer.
- Keep the aspect-ratio lock on, or the picture will be stretched.
- Enter exact pixels when a form tells you the size, or a percentage when you simply want it smaller.
- You can resize several pictures at once, up to 20 per batch.
:::

## What resizing really does

A picture is a grid of pixels. Making it smaller means combining groups of pixels into one, which is a form of averaging. Done with good resampling, the result looks clean because the eye cannot see the detail that was thrown away at the smaller size. This is why shrinking is nearly always safe.

Making a picture larger works the other way: the program has to invent new pixels between the existing ones. It can only guess, so the result looks smooth but soft. No resizing tool can add real detail that the camera never captured. If you must enlarge, expect softness, and see our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> for the opposite direction. <tool_enlarge_image>Enlarge Image</tool_enlarge_image> uses better resampling for upscaling, but even it cannot invent real detail.

## Pixels or percentage?

<tool_image_resizer>Resize Image</tool_image_resizer> offers two ways to describe the new size:

- Pixels: you enter the width or the height, and the other follows from the aspect ratio. Use this when a destination specifies a size, such as 1,200 pixels wide for a blog or 600 by 600 for an avatar.
- Percentage: you scale the picture by a share, for example 50 percent. Use this when you do not care about exact numbers and simply want everything smaller.

Percentages are handy for batches in which the pictures differ in size: every one is reduced by the same share.

## How to resize in your browser

The tool works inside your browser tab, so the pictures are read from your device.

1. Open the tool and add one or more images (up to 20 per batch, each up to 25 MB).
2. Choose pixels or percentage and enter the new size.
3. Keep the aspect-ratio lock on to avoid distortion.
4. Choose the output quality for JPG or WebP if you need to.
5. Press Resize and download the results, individually or as a ZIP.

The result shows the new dimensions in the file name, so you can tell the versions apart.

## The aspect-ratio lock

The aspect ratio is the proportion between width and height. When the lock is on, changing one dimension changes the other automatically so the picture keeps its shape. Turn the lock off only when you really want to change the shape, for example to make a picture fit exactly into a fixed frame. Most of the time, the lock should stay on; a stretched face or a squashed circle is easy to spot and hard to excuse.

If the picture needs another shape, crop it rather than stretching it. <tool_image_cropper>Crop Image</tool_image_cropper> lets you choose an aspect ratio and cut to that shape. Our guide to <post_how-to-crop-an-image-to-a-specific-size>cropping an image to an exact size</post_how-to-crop-an-image-to-a-specific-size> explains how, and why you should crop before you resize.

## Choosing a size

Think about where the picture will be shown:

- A blog or article picture rarely needs to be wider than about 1,200 to 2,000 pixels.
- An email picture can be around 800 to 1,200 pixels wide.
- A profile picture or avatar needs a few hundred pixels.
- A print picture needs many more pixels than a screen picture. As a rule, 300 pixels per inch of print size gives a sharp result.
- A thumbnail needs only a small fraction of the original.

If a screen is sharp, pictures on it benefit from about twice the displayed size, because many phones and laptops pack more than one physical pixel into each displayed pixel. For a picture shown 600 pixels wide, a width of 1,200 gives a crisp result on those screens.

## Limits of the tool

Browsers cap the size of the canvas they can work with. The tool limits output to 16,000 pixels on each side and about 100 megapixels. Each file can be up to 25 MB, and a batch holds up to 20 files, which keeps the browser responsive. Animated GIF or WebP files are processed using their first frame.

## Quality, format and metadata

Resizing re-encodes the picture, which has consequences:

- JPG and WebP outputs have a quality setting. A medium-high value keeps pictures sharp while saving space.
- PNG output is lossless, so it keeps every pixel but can remain large. Use it for graphics with sharp edges.
- Re-encoding drops EXIF metadata, such as the camera model and the GPS location, and colour profiles. That is often what you want before sharing a photo online, but colours can shift slightly on some screens.

If you need the picture as another format, for example because a site rejects WebP, our guide to <post_how-to-convert-webp-to-jpg>converting WebP to JPG</post_how-to-convert-webp-to-jpg> helps. To switch the format at the same time, use <tool_image_format_converter>Convert Image Format</tool_image_format_converter>. Our guide to <post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> explains how to choose. For a smaller file at the same dimensions, <tool_image_compressor>Compress Image</tool_image_compressor> is the right tool.

## Orientation first

If a picture lies on its side, rotate it before resizing with <tool_image_rotator>Rotate Image</tool_image_rotator>. Resizing a sideways picture and rotating afterwards works too, but it is easy to end up with the dimensions the wrong way round.

## Common mistakes to avoid

- Enlarging a small picture and expecting it to be sharp.
- Turning the aspect-ratio lock off by accident, so the picture is stretched.
- Resizing the same picture repeatedly. Always start again from the original.
- Using a percentage when a form wants exact pixels.
- Resizing before cropping, which wastes pixels you then throw away.

## A quick checklist

1. Find out the size the destination needs.
2. Crop and rotate first, then resize.
3. Keep the aspect-ratio lock on.
4. Shrink rather than enlarge whenever possible.
5. Keep the original file and check the result at the size it will be shown.

:::faq Frequently asked questions
Q: Can I enlarge an image?
A: Yes, but enlarging cannot add detail, so the result will look softer. Downscaling gives the best quality.

Q: What is the maximum output size?
A: Browsers limit canvas size. This tool caps output at 16,000 px per side and about 100 megapixels.

Q: Is EXIF or location data kept?
A: No. Re-encoding through a canvas drops EXIF metadata such as camera model and GPS location, which is often what you want before sharing a photo. Colour profiles are also not preserved.

Q: Can I resize many pictures at once?
A: Yes, up to 20 files per batch, each up to 25 MB.

Q: Should I use pixels or a percentage?
A: Use pixels when a destination specifies a size and a percentage when you just want everything smaller by the same share.

Q: Are my pictures uploaded?
A: No. The tool runs inside your browser, so the files stay on your device.
:::
