---
title: How to Reduce Image Size in KB Without Blurry Results
description: Get a photo under an upload limit such as 200 KB or 1 MB. Learn how dimensions, format and quality work together, and how to check the result.
excerpt: Shrink a photo to a target file size by combining the right format, quality and dimensions, without turning it into a blurry mess.
imageAlt: A large photo shrinking into a small file size badge on a teal background
published: 2026-10-15
tool: image-compressor
tools: image-compressor, image-resizer, png-to-jpg, jpg-to-webp, webp-to-jpg, images-to-pdf, compress-pdf
ctaHeading: Compress an image now
cta: Open <tool_image_compressor>Compress Image</tool_image_compressor>, or browse all of the <all_image>image tools</all_image>.
---

An application form that accepts photos “up to 200 KB”. A shop that rejects product images over 1 MB. A website that slows down because every picture is 4 MB. Phone cameras produce files far larger than most websites and forms want, and “make it smaller” is one of the most common image jobs there is.

The problem is doing it without wrecking the picture. This guide explains the three things that decide file size, in the order you should adjust them, so you reach your target with the least visible damage.

:::takeaways
- File size depends on three things: dimensions (pixels), format and quality. Change dimensions first; the compressor uses a fixed, balanced quality.
- JPG and WebP compress photos far better than PNG, which is lossless.
- Most upload limits do not need a full-size photo: a width of 1,200 to 2,000 pixels is usually plenty on screen.
- Check the result at the size it will be used, and keep your original.
:::

## What makes an image file large

A photo is a grid of pixels, and each pixel needs data. A 12-megapixel phone photo has about 12 million pixels, so even compressed it often weighs 3 to 6 MB. Three things control the final size:

1. Dimensions. Halving the width and height leaves a quarter of the pixels, which cuts the size by a lot. This is the most powerful setting and usually the least visible one, because screens rarely show a photo at full camera resolution.
2. Format. JPG and WebP use lossy compression made for photographs. PNG is lossless and keeps every pixel exactly, which is ideal for logos and screenshots but gives large files for photos.
3. Quality. For lossy formats, quality trades detail for size. Lowering it removes fine detail, and below a certain point blocky artefacts and blur appear. Kitwell’s Compress Image uses one balanced quality and has no quality slider, so you control the size with the dimensions and the format.

## The order that works best

Most people go straight to a quality slider and lower it until the file fits, which is why their pictures end up blurry. A better order is:

1. Reduce the dimensions to the size you actually need.
2. Switch to a better format for photos, such as JPG or WebP.
3. Only if the file is still too large, reduce the dimensions a little more.

Each step costs less visible quality than lowering the quality itself, so you only use the later ones if the earlier ones were not enough.

## How to do it in your browser

<tool_image_compressor>Compress Image</tool_image_compressor> works inside your browser, so your pictures are not uploaded. You can add up to 20 images at a time, each up to 25 MB.

1. Add your images.
2. Choose the output format. For photos, JPG or WebP is a good start.
3. Optionally set a maximum width or height. This is the setting that does the heavy lifting.
4. Press Compress. The tool shows the size before and after, so you can see the saving for every image.
5. Download the results, and keep your original files unchanged.

If the file is still too large, lower the maximum width a little and run it again from the original, not from the compressed copy. If the tool reports that the result was not smaller, it keeps your original file; reduce the dimensions to get a smaller one.

## Choosing dimensions

Pick the size from where the image will be shown, not from what the camera produced:

- A picture inside a web page or blog post rarely needs to be wider than about 1,200 to 2,000 pixels.
- A profile picture or avatar often needs only a few hundred pixels on each side.
- An image that will be printed needs more pixels than one that will only be seen on a screen.
- Many forms and portals state exact pixel sizes next to the file size limit. Follow them.

To set an exact width and height, or a percentage, use <tool_image_resizer>Resize Image</tool_image_resizer>. Keep the aspect-ratio lock on so the picture is not stretched. Resizing and compressing together gives the best result for the least quality loss.

## Choosing the format

- Photographs: JPG is the safe, universal choice. WebP gives smaller files at similar quality, but the receiving system must accept it.
- Screenshots, logos and graphics with sharp edges or flat colours: PNG keeps them crisp. If the file is too large, convert it to JPG or WebP, accepting some softness around edges.
- Images with a transparent background: PNG and WebP keep transparency. JPG cannot, so transparent areas are filled with white.

If you need a specific format, <tool_png_to_jpg>PNG to JPG</tool_png_to_jpg> and <tool_jpg_to_webp>JPG to WebP</tool_jpg_to_webp> convert with a balanced fixed quality. Our guide to <post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> explains when each is the right choice. If a site does not accept WebP, <tool_webp_to_jpg>WebP to JPG</tool_webp_to_jpg> converts it back.

## Aiming for a specific size, such as 100 KB or 200 KB

There is no way to say “make this exactly 200 KB” in one move, but a short routine gets you there:

1. Set the maximum width to about 1,600 pixels and the format to JPG.
2. Compress and read the new size.
3. If it is still over, drop the width to 1,200 and compress again from the original.
4. If it is far under the limit, raise the width a little for a sharper picture.
5. Stop as soon as the file fits. Anything smaller than necessary just costs quality.

## How to judge the result

Open the compressed image at the size it will actually be used. A picture that looks perfect when shrunk to a thumbnail can show blocky patches or smeared edges at full size. Look at fine detail: faces, text in the picture and areas of smooth gradient, such as a sky, which show compression first.

If you see banding or blocks, choose a larger maximum width, or keep the original dimensions and accept a bigger file.

## Things to keep in mind

- Compression removes the camera information stored in the file, such as the location and date, and colour profiles. This is useful for privacy, but it also means colours can shift slightly on some screens.
- Do not compress an image repeatedly. Every lossy round loses detail, so always start from the original.
- Animated GIF or WebP files are converted using their first frame only.
- Output from JPG or WebP shrinks best. PNG output is lossless and may not shrink at all.

## Pictures that end up in a PDF

If your images are going into a document, compress them before you build it, or compress the finished file. <tool_images_to_pdf>Images to PDF</tool_images_to_pdf> builds the PDF, and <tool_compress_pdf>Compress PDF</tool_compress_pdf> shrinks it afterwards. Our guide to <post_convert-images-to-pdf>converting images to PDF</post_convert-images-to-pdf> covers the page size and order.

:::faq Frequently asked questions
Q: Does compressing an image reduce its quality?
A: With JPG and WebP, yes, a little: you trade fine detail for a smaller file. With the tool’s balanced quality and a sensible size, the difference is rarely visible at the size the picture is used.

Q: What is the best format for a small file size?
A: For photos, WebP or JPG. PNG is lossless and usually the largest. Use PNG only when you need sharp edges or transparency.

Q: Are my images uploaded when I compress them?
A: No. The tool works inside your browser, so the pictures stay on your device.

Q: Why did my PNG not get smaller?
A: PNG is lossless, so compressing it with PNG output may save little or nothing. Choose JPG or WebP as the output, or reduce the dimensions. When a file cannot be made smaller, the tool keeps your original.

Q: How many images can I compress at once?
A: Up to 20 per batch, each up to 25 MB, to keep your browser responsive.
:::
