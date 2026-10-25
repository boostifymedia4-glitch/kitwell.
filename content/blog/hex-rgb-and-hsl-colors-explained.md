---
title: HEX, RGB and HSL Colors Explained With a Contrast Check
description: Learn how HEX, RGB, HSL and HSV colours work, convert between them, pick exact colours from an image and check text contrast against accessibility rules.
excerpt: A clear guide to colour codes: what HEX, RGB, HSL and HSV mean, how to convert between them, how to sample a colour from a picture and how to check contrast for readable text.
imageAlt: Colour swatches with hexadecimal codes next to a colour wheel on a teal background
published: 2026-10-25
updated: 2026-10-25
tool: color-converter
tools: color-converter, image-color-picker, qr-code-generator, svg-converter, photo-editor, markdown-previewer
ctaHeading: Try it yourself
cta: Open <tool_color_converter>Color Converter</tool_color_converter>, or browse all of the <all_developer>developer tools</all_developer>.
---

Every colour on a screen is written down as numbers. Designers hand developers a code such as 0f766e. A style guide lists a colour as rgb with three values. A design tool shows hue, saturation and lightness. All of them describe the same colour, but each form is useful for a different job.

This guide explains the most common colour formats, shows how to convert between them, how to take an exact colour from a picture and how to check that text on a coloured background is easy to read.

:::takeaways
- HEX, RGB, HSL and HSV are different ways to write the same colour on a screen.
- HEX and RGB describe how much red, green and blue light to mix. HSL and HSV describe hue, strength and brightness, which is easier for people to adjust.
- The contrast ratio between text and background decides whether text is readable. WCAG asks for at least 4.5 to 1 for normal text.
- You can take exact colours from any picture with a colour picker.
- Screens use the sRGB colour space for most web work, and print uses a different system.
:::

## How screens make colours

A screen mixes red, green and blue light. Each of the three channels has a strength from 0, which is off, to 255, which is full. Mixing the three gives about 16.7 million possible colours.

All the common formats describe this mix. They only differ in the way the numbers are written. Learning to read two or three of them lets you move between design tools, style sheets and code without guessing.

## HEX codes

A HEX code is a hash sign followed by six characters. The first two characters give red, the next two green and the last two blue. Each pair is a number from 00 to ff written in base 16, where ff is 255.

So the code for pure red is ff0000, pure green is 00ff00, white is ffffff and black is 000000. The teal used on this site is 0f766e: red 0f is 15, green 76 is 118 and blue 6e is 110. A short form with three characters, such as fff for white, exists when each pair repeats.

HEX is compact and everywhere in web design, which is why designers paste it into chats and documents.

## RGB

RGB writes the same three numbers in plain decimal. The teal above is rgb(15, 118, 110). It is easy to read when you want to see the mix and to compute with, for example to lighten a colour by adding to each channel.

Some systems add a fourth value for opacity. The converter accepts such values but ignores the opacity, because it works with solid colours.

## HSL and HSV

HSL stands for hue, saturation and lightness. HSV stands for hue, saturation and value, and it is used by many colour pickers.

- Hue is the position on the colour wheel, in degrees from 0 to 360. Red is 0, green is about 120 and blue is about 240.
- Saturation is how strong the colour is, from grey at 0 percent to full colour at 100 percent.
- Lightness in HSL, or value in HSV, is how bright it is.

These are the friendliest formats for people, because they match how we think. To make a colour lighter, raise the lightness. To make it duller, lower the saturation. To build a palette of matching shades, keep the hue and change the lightness in steps. The orange with HEX ff8000 is hsl(30, 100%, 50%) and hsv(30, 100%, 100%), and the converter shows all of these at once.

## Converting between formats

<tool_color_converter>Color Converter</tool_color_converter> accepts a colour in any of these forms, or from a picker, and updates every other format at the same time. It works in your browser tab, so nothing leaves your device.

1. Type a colour such as a HEX code, an rgb value or an hsl value, or choose it with the picker.
2. Read the HEX, RGB, HSL and HSV values and the live preview.
3. Copy the one you need.

Colour spaces beyond sRGB, such as LAB, LCH and Display-P3, are not supported. For ordinary web and app work, sRGB is the right choice.

## Picking a colour from a picture

Sometimes the colour you need is not written down anywhere, only visible in a logo, a photo or a screenshot. <tool_image_color_picker>Pick Color from Image</tool_image_color_picker> lets you click on any point of a picture, or move with the arrow keys for fine control, and shows its HEX, RGB and HSL values with a copy button for each. It can also pick a colour from anywhere on your screen when your browser supports it.

The tool also extracts a palette of dominant colours, which is a quick start for matching a page to a photo or a logo. It samples the colours that are shown, in sRGB, and ignores embedded colour profiles, so a result can differ slightly from what a design program with colour management shows.

To improve a picture before you take colours from it, <tool_photo_editor>Photo Editor</tool_photo_editor> adjusts brightness and colour, and our guide to <post_how-to-edit-a-photo-in-your-browser>editing a photo in your browser</post_how-to-edit-a-photo-in-your-browser> explains the steps.

## Checking contrast for readable text

A colour that looks good can still make text hard to read. The Web Content Accessibility Guidelines, known as WCAG, measure this with a contrast ratio between the text colour and the background colour, from 1 to 1 for no difference up to 21 to 1 for black on white.

The common targets are:

- Normal text: at least 4.5 to 1 for level AA, and 7 to 1 for the stricter level AAA.
- Large text, which means roughly 18 points or 14 points bold: at least 3 to 1 for AA and 4.5 to 1 for AAA.

The converter shows the ratio of your colour against white text and against black text, with a pass or fail for each level. The orange ff8000, for example, has a ratio of about 2.5 to 1 against white, which fails, and about 8.3 to 1 against black, which passes. So black text is the right choice on that orange, even though white text looks tempting.

Check every combination that carries information: buttons, links, labels and warnings. Do not rely on colour alone to tell something, since some people cannot tell certain colours apart.

## Colours in other places

Colours matter outside web pages too.

- In exported graphics. When you turn a logo into a picture, our guide to <post_how-to-convert-svg-to-png>converting SVG to PNG</post_how-to-convert-svg-to-png> explains how to keep its colours and transparency.
- In QR codes. Scanners need strong contrast between dark and light modules, and <tool_qr_code_generator>QR Code Generator</tool_qr_code_generator> lets you choose colours, so check the contrast before you print. Our guide to <post_how-to-create-a-qr-code>creating a QR code</post_how-to-create-a-qr-code> covers it.
- In documents written in Markdown, where <tool_markdown_previewer>Markdown Previewer</tool_markdown_previewer> shows how colours and styles look when rendered.

## Screens and print differ

Screens mix light, and printers mix ink, usually cyan, magenta, yellow and black. Colours that glow on a screen, such as a bright electric blue, often cannot be reproduced in print and come out duller. If something will be printed, ask the printer which colour system and profile to use, and check a proof.

## Common mistakes to avoid

- Forgetting the hash sign in a HEX code in a style sheet.
- Choosing text colours by eye without checking contrast.
- Relying on colour alone to show errors or status.
- Expecting the same colour on every screen. Brightness, settings and colour profiles change what you see.
- Using a screen colour for print without checking a proof.

## A quick checklist

1. Choose a base colour and note its HEX value.
2. Convert it to HSL, then create lighter and darker shades by changing lightness.
3. Check the contrast of every text and background pair.
4. Take colours from pictures with a picker instead of guessing.
5. Test the result on more than one screen.

:::faq Frequently asked questions
Q: What does the contrast check show?
A: It shows the WCAG contrast ratio of the colour against white and black text, which helps you choose readable combinations.

Q: Which colour formats does the converter understand?
A: HEX, RGB, HSL and HSV, and you can also choose a colour with the picker.

Q: Are transparency values supported?
A: Transparency (alpha) values are accepted but ignored.

Q: Does the converter support colour spaces such as LAB, LCH or Display-P3?
A: No. It works with sRGB only.

Q: Can I pick a colour from a photo?
A: Yes. Use the image colour picker to click on any point and copy its HEX, RGB or HSL value.
:::
