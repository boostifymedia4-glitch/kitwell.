---
title: How to Convert SVG to PNG, JPG or WebP at Any Size
description: Turn SVG logos and icons into sharp PNG, JPG or WebP images at the exact size you need, and learn why an SVG can look different once it is exported.
excerpt: A practical guide to exporting SVG files as PNG, JPG or WebP: how scale and width work, how to keep transparency, why fonts go missing and which size to choose for each use.
imageAlt: A vector shape being turned into a picture file on a teal background
published: 2026-10-25
updated: 2026-10-25
tool: svg-converter
tools: svg-converter, image-resizer, image-compressor, png-to-webp, image-format-converter, enlarge-image
ctaHeading: Try it yourself
cta: Open <tool_svg_converter>SVG to PNG / JPG</tool_svg_converter>, or browse all of the <all_image>image tools</all_image>.
---

SVG is the format of logos, icons, charts and illustrations. It describes shapes with numbers instead of storing pixels, so it stays sharp at any size and the files are tiny. The trouble starts when you have to hand an SVG to a place that only accepts pictures: a social network, an email program, a slide deck, a print shop form or a marketplace listing.

This guide explains how to turn an SVG into a PNG, JPG or WebP in your browser, how to choose the size, how to keep a transparent background and what to do when the exported picture does not match the original.

:::takeaways
- An SVG is drawn as a picture at the size you choose, so a large export is as crisp as a small one.
- Choose PNG when you need transparency, JPG for the smallest file with a solid background and WebP for web pages.
- Fonts, images and styles that are linked from outside the SVG are not loaded, so embed them or turn text into shapes.
- Check the final size in pixels and compress the result if it will go on a web page.
- Scripts inside an SVG do not run during conversion.
:::

## What an SVG is, and why you sometimes need a picture

An SVG file is text. It lists shapes, curves, colours and text, and the program that opens it draws them. Because nothing is stored as pixels, you can enlarge the drawing to the size of a billboard and the edges stay sharp.

Pictures such as PNG, JPG and WebP store a fixed grid of pixels. They are accepted almost everywhere, which is why a conversion is often needed. Many upload forms do not accept SVG at all, email programs may block it and some design programs import it unevenly. Turning the SVG into a picture at the right size solves all of that, and our guide to <post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> explains how the picture formats differ.

## Which output format to choose

<tool_svg_converter>SVG to PNG / JPG</tool_svg_converter> can export three formats.

- PNG keeps transparency and has no loss of detail. It is the right choice for logos and icons that will sit on different backgrounds.
- JPG makes small files but cannot store transparency, so transparent areas become a solid background. Use it for illustrations with a background and for places that only accept JPG.
- WebP gives small files for web pages and also supports transparency, if the browser can create it.

If you are not sure, export a PNG first. You can convert it later with <tool_image_format_converter>Convert Image Format</tool_image_format_converter> or <tool_png_to_webp>PNG to WebP</tool_png_to_webp>.

## How to convert an SVG

The conversion runs inside your browser tab, so the files stay on your device.

1. Open the tool and add one or more SVG files. You can add up to 20 files at once, each up to 25 MB.
2. Choose PNG, JPG or WebP.
3. Choose the output size, either as a scale or as an exact width.
4. Convert and download the results one by one or together.

Before you start, think about where the picture will be used, because that decides the size. The next section explains how to pick it.

## Choosing the size

Because the SVG is redrawn at the size you choose, you can ask for any size without losing sharpness. Choose by use:

- For a web page, export at the size it is shown, and at twice that size if the page serves sharp pictures to high-density screens.
- For a social profile picture or a marketplace listing, check the size the platform asks for and export exactly that width.
- For a presentation, 1920 pixels wide is enough for a full slide.
- For print, work out the size in pixels from the printed size and the print resolution, and export at that width.

The converter limits the output to 16,000 pixels per side, which is plenty for almost all uses. A scale such as 2x or 4x is the quickest way to get a larger version of the same drawing, and it is as crisp as the 1x version.

If an SVG has no width and height written in it, the tool uses its viewBox, and if neither exists it falls back to 300 by 150 pixels. When a result comes out in an odd size, set the width yourself.

## Keeping a transparent background

PNG and WebP can hold transparent areas, so a logo exported from SVG keeps its clear background and sits cleanly on a coloured page. JPG cannot, so a transparent area becomes a solid colour.

Always check a transparent export on the background where it will be used. White edges around a logo on a dark page are a sign that the picture was saved with a solid background somewhere along the way.

## Why the picture can look different from the SVG

Browsers do not support every SVG feature, and the converter draws the SVG the same way a browser does. The most common surprises are:

- Missing fonts. If the SVG uses a font that is installed on the designer's computer but is not embedded in the file, the browser replaces it with a default font.
- Linked pictures. An SVG can point to a picture on the web or on a disk. Linked pictures and styles are not loaded during conversion, so they are missing in the result.
- Filters and effects that a particular program adds, which not every browser draws in the same way.

The fix is to make the SVG self-contained before you convert it. In your design program, convert text to outlines or paths, embed any pictures inside the file and save again. After that, the picture looks the same everywhere.

## Safety of SVG files

An SVG can contain scripts, which is why websites are careful about uploads. During conversion the SVG is drawn as a picture, so scripts inside it do not run. You can still open files you did not make, but keep the usual caution about where files come from.

## After the conversion: size and quality

A large PNG can be heavy. If the picture will go on a web page, resize it to the displayed size and compress it. <tool_image_compressor>Compress Image</tool_image_compressor> reduces the file size, and our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> explains how to hit a target size.

If you need a different pixel size later, <tool_image_resizer>Resize Image</tool_image_resizer> makes the picture smaller. Making a picture bigger from pixels is different from exporting the SVG at a bigger size: <tool_enlarge_image>Enlarge Image</tool_enlarge_image> can enlarge pictures smoothly but cannot add missing detail, so always go back to the SVG for a larger version when you can.

Watermarks and logos are a common next step. Our guide to <post_how-to-add-a-watermark-to-photos>adding a watermark to photos</post_how-to-add-a-watermark-to-photos> shows how to stamp an exported logo onto many pictures at once.

## Common mistakes to avoid

- Exporting at a small size and then enlarging the picture. Export at the size you need instead.
- Choosing JPG for a logo that needs a transparent background.
- Forgetting that fonts must be embedded or converted to shapes.
- Using a very large export on a web page, which slows the page down.
- Not checking the result on the background where it will be used.

## A quick checklist

1. Make the SVG self-contained: embed pictures and convert text to shapes.
2. Choose PNG for transparency, JPG for a solid background, WebP for the web.
3. Set the width you need, or a scale such as 2x.
4. Convert, then check the result on its final background.
5. Compress the picture if it will be used on a web page.

:::faq Frequently asked questions
Q: Will the image stay sharp at large sizes?
A: Yes. The SVG is drawn at the size you choose, so a 4x export is as crisp as a 1x one.

Q: Why does my SVG look different after conversion?
A: Browsers do not support every SVG feature, and SVGs that rely on external fonts or images fall back to defaults. Embed fonts and images inside the SVG for the best result.

Q: Is it safe to open SVG files here?
A: Yes. The SVG is drawn as a picture, so scripts inside it do not run.

Q: Which size limits apply?
A: Each file can be up to 25 MB, you can convert 20 files at once and the output is limited to 16,000 pixels per side.

Q: Can I keep a transparent background?
A: Yes, choose PNG or WebP. JPG cannot store transparency, so transparent areas become a solid colour.
:::
