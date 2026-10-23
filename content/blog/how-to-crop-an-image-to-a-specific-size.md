---
title: How to Crop an Image to an Exact Size or Aspect Ratio
description: Crop a photo to an exact region or a fixed aspect ratio with a live preview, fine-tune the position with pixel values and choose the output format.
excerpt: Learn to crop pictures for profile photos, thumbnails and print: pick an aspect ratio, set exact X, Y, width and height in pixels, and keep the quality.
imageAlt: A photo with a crop frame and corner handles on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: image-cropper
tools: image-cropper, image-resizer, image-rotator, image-compressor, image-format-converter, image-flipper
ctaHeading: Try it yourself
cta: Open <tool_image_cropper>Crop Image</tool_image_cropper>, or browse all of the <all_image>image tools</all_image>.
---

A photo almost never has the right shape for where it is going. A profile picture needs a square, a video thumbnail needs a wide frame, a passport photo needs a particular proportion, and a banner needs a long strip. Cropping cuts away what you do not need and leaves the part that matters, in the shape the destination wants.

This guide explains how to crop an image in your browser, how aspect ratios work, how to use exact pixel values for precision and how to avoid the mistakes that make a cropped picture look cramped or blurry.

:::takeaways
- Cropping keeps the original pixels of the area you choose; it does not shrink or blur them.
- Choose a fixed aspect ratio, or leave it free, and drag the crop box over the picture.
- Type X, Y, width and height in pixels for exact control. Y and X can be set anywhere inside the picture.
- Crop first, then resize, because it keeps the most detail.
- JPG and WebP results are saved at a high, fixed quality; PNG is lossless.
:::

## What cropping does

An image is a grid of pixels. Cropping selects a rectangle of that grid and discards everything outside it. Nothing inside the rectangle is changed, so there is no loss of quality from the crop itself. The picture simply becomes smaller in pixel dimensions.

This is different from resizing, which changes how many pixels the picture has and therefore needs to invent or merge pixels. If you need both, crop first and resize afterwards with <tool_image_resizer>Resize Image</tool_image_resizer>; <post_how-to-resize-an-image-without-losing-quality>our resizing guide</post_how-to-resize-an-image-without-losing-quality> explains pixels, percentages and quality. Our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> explains why that order keeps more detail.

## How to crop in your browser

<tool_image_cropper>Crop Image</tool_image_cropper> works inside your browser tab, so your picture is read from your device.

1. Open the tool and add an image (up to 25 MB).
2. Pick an aspect ratio, or leave it free.
3. Drag the crop box, or drag its handles, until it frames what you want.
4. Fine-tune the position and size with the numeric fields.
5. Choose the output format, or keep the same as the original.
6. Press Crop and download the result.

The tool shows the original size, so you always know how much room you have.

## Aspect ratios

An aspect ratio describes the shape of a rectangle as width to height. Common ones:

- 1:1, a square, for profile pictures and many social posts.
- 4:3 and 3:2, the classic photo shapes.
- 16:9, wide frames for video thumbnails and slides.
- 9:16, tall frames for phone stories.
- A free ratio, when you just want to cut away part of a picture.

With a ratio selected, the crop box keeps that shape as you resize it, and typing a new width or height adjusts the other one to match. Choose free when the destination does not care about the shape.

## Exact values in pixels

The numeric fields show the position and size of the box in pixels of the original picture:

- X is the distance from the left edge.
- Y is the distance from the top edge.
- Width and Height are the size of the box.

Type exact values when a form tells you precisely what it wants, such as 600 by 800 pixels, or when you need to crop several pictures in the same way. You can place the box anywhere inside the picture: if you type a position that would push the box outside, the box shrinks so it stays inside, and with a locked ratio it keeps its shape.

A tip: set the aspect ratio first, then the width, then adjust X and Y to position the box. This way the numbers cooperate instead of fighting each other.

## Composition: what to keep

A crop is a creative decision. A few guidelines help:

- Leave breathing room. A face cropped tightly at the chin and forehead looks uncomfortable.
- Place the subject off centre for landscapes and wide frames. The rule of thirds is a good starting point.
- For profile pictures, keep the eyes in the upper third and make sure the face will still be recognisable at a small size.
- Remove distractions at the edges, such as part of a stranger or a bright object.
- If the subject must be centred, as in an ID photo, check the requirements of the form first.

## Quality and format

Cropping never reduces the quality of the pixels you keep, but saving the result in a lossy format applies compression once more. For JPG and WebP, the tool uses a high, fixed quality, so normal use shows no visible loss. PNG is lossless. You can choose a different output format, for example PNG to keep sharp edges, or keep the original format.

If you need a smaller file after cropping, run <tool_image_compressor>Compress Image</tool_image_compressor>, and to change the format, <tool_image_format_converter>Convert Image Format</tool_image_format_converter> does it. Our guide to <post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> helps you choose.

## Before and after cropping

Two tools often help around a crop:

- If the photo is sideways or tilted by a quarter turn, use <tool_image_rotator>Rotate Image</tool_image_rotator> first, then crop. Rotating after cropping can leave you with the wrong part of the picture.
- If the picture is mirrored, such as a selfie, <tool_image_flipper>Flip Image</tool_image_flipper> corrects it.

The crop tool handles one image at a time, which is right for careful framing. For many pictures that only need resizing to the same width, use the resizer instead.

## Limits to know

- One image at a time, up to 25 MB.
- Animated images use the first frame only.
- The crop works on the visible picture. Camera metadata such as location is not kept in the result.

## Common mistakes to avoid

- Cropping very tightly and then enlarging the result, which makes it soft.
- Choosing a ratio that does not match the destination, so the platform crops it again automatically and cuts off the wrong part.
- Forgetting to rotate before cropping.
- Overwriting the original. Keep the uncropped file in case you need a different framing.
- Ignoring the output format. PNG for sharp graphics and JPG for photographs are the usual choices.

## A quick checklist

1. Check what shape and pixel size the destination wants.
2. Rotate or flip the picture first if needed.
3. Select an aspect ratio, then frame the subject.
4. Fine-tune with pixel values and look at the preview.
5. Choose the output format and download. Keep the original.

:::faq Frequently asked questions
Q: Does cropping reduce quality?
A: Cropping keeps the original pixels. JPG and WebP results are saved at a high fixed quality, so normal use shows no visible loss.

Q: Can I crop to an exact pixel size?
A: Yes. Type the width and height in pixels, and set X and Y to position the box. With a locked aspect ratio, the box keeps its shape.

Q: Why does the box shrink when I enter a large position?
A: The crop box must stay inside the picture. If the position you type would push it outside, the box becomes smaller so that it fits.

Q: Can I crop several images at once?
A: No. Cropping needs individual framing, so the tool works on one image at a time.

Q: Is my picture uploaded?
A: No. The tool runs inside your browser, so the image stays on your device.

Q: What happens to animated pictures?
A: Animated images use the first frame.
:::
