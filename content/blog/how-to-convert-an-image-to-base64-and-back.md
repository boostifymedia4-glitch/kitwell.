---
title: How to Convert an Image to Base64 and Back Again
description: Turn a picture into a Base64 data URI for HTML, CSS or JSON, decode a Base64 string back into an image file, and learn when embedding pictures is a good idea.
excerpt: A practical guide to Base64 images: what a data URI is, the four output styles, the 33 percent size cost, when embedding helps, how to decode a string and why SVG data is rejected.
imageAlt: A picture turning into a long string of characters and back on a teal background
published: 2026-10-30
updated: 2026-10-30
tool: image-to-base64
tools: image-to-base64, base64-to-image, base64-encoder-decoder, image-compressor, image-resizer, svg-converter
ctaHeading: Try it yourself
cta: Open <tool_image_to_base64>Image to Base64</tool_image_to_base64>, or browse all of the <all_image>image tools</all_image>.
---

A picture on a web page is normally a separate file that the browser fetches with its own request. Sometimes that is inconvenient. You may want one self-contained file, an email template with a small logo that cannot be blocked, a style sheet with an icon built in or a JSON message that carries a picture along with its data. For these cases, a picture can be written as text and placed directly in the code.

The text form is Base64. This guide explains how to turn a picture into Base64, how to turn a Base64 string back into a picture, what it costs and when it is a good idea.

:::takeaways
- Base64 writes the bytes of a picture as plain text, so it can sit inside HTML, CSS or JSON.
- A data URI is the Base64 text with a short prefix that tells the browser the file type.
- The text is about 33 percent larger than the picture, so use it for small images only.
- You can choose the output style: a data URI, raw Base64, an HTML image tag or a CSS rule.
- Base64 is an encoding, not encryption. Anyone can decode it.
:::

## What Base64 and a data URI are

Pictures are binary files, made of bytes that are not safe to paste into most text formats. Base64 solves this by writing every group of three bytes as four ordinary characters: capital and small letters, digits, the plus sign and the slash. The result is plain text that can travel anywhere that text can.

A data URI is a Base64 string with a short front part that says what it is. It begins with the word data, then the type of file, then the word base64, and then the encoded text. A browser that meets a data URI in a picture tag or a style rule decodes it and shows the picture without making any extra request.

Our guide to <post_what-is-base64-encoding>Base64 encoding</post_what-is-base64-encoding> explains the encoding itself in more depth, and <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> handles ordinary text.

## When embedding a picture makes sense

Embedding saves a request, but it costs size. It is a good fit when:

- The picture is tiny, such as an icon, a loading indicator or a small logo, where an extra request costs more than the 33 percent increase.
- You need one file that works alone, such as an email template or a single-page document.
- A picture must be carried inside data, such as a JSON message or a configuration file.
- Linked pictures might be blocked or not found.

It is a poor fit for large photos. The text is bigger than the picture file, the browser cannot cache it separately and every page that includes it carries the full text again. For large pictures, use a normal link.

## How to turn an image into Base64

<tool_image_to_base64>Image to Base64</tool_image_to_base64> runs inside your browser tab, so the picture stays on your device.

1. Open the tool and add a picture. It accepts one image at a time, up to 5 MB.
2. Choose the output style: a data URI, raw Base64, an HTML image tag or a CSS rule.
3. Copy the result.

The four styles fit four jobs.

- Data URI is the full string with its prefix, ready to put in a picture source or a style rule.
- Raw Base64 is the encoded text alone, for systems that add the prefix themselves, such as many APIs.
- The HTML image tag is a complete tag that you can paste into a page or an email.
- The CSS rule is a background image declaration for a style sheet.

## Make the picture small first

Because the text is a third larger than the file, every kilobyte counts. Before you encode, make the picture as small as it can reasonably be.

1. Resize it to the size it will be shown. A logo shown at 64 pixels does not need to be 1000 pixels wide. <tool_image_resizer>Resize Image</tool_image_resizer> does it, and our guide to <post_how-to-resize-an-image-without-losing-quality>resizing an image without losing quality</post_how-to-resize-an-image-without-losing-quality> explains how.
2. Compress it with <tool_image_compressor>Compress Image</tool_image_compressor>. Our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> shows how to reach a target size.
3. For logos and icons, consider SVG, which is already text and is often smaller than any picture format. If you need a picture version, <tool_svg_converter>SVG to PNG / JPG</tool_svg_converter> exports one at the exact size.

A tiny icon of two kilobytes becomes about 2.7 kilobytes of text, which is a fair trade. A photo of 800 kilobytes becomes more than a megabyte of text, which is rarely sensible.

## How to turn Base64 back into an image

The reverse is just as easy.

1. Open <tool_base64_to_image>Base64 to Image</tool_base64_to_image> and paste a Base64 string or a full data URI.
2. The picture is decoded and previewed at once.
3. Download it as a file.

You do not need the prefix. Without it, the tool detects the format from the first bytes of the file, which identify PNG, JPG, GIF and WebP pictures. It supports those four formats, with up to 10 MB of decoded data.

## When decoding fails

If the tool shows an error, the cause is usually one of these.

- The string was cut off when it was copied, so it is incomplete. Base64 strings can be very long, and some programs shorten them on screen.
- It contains extra characters, such as line breaks, quotation marks or the surrounding code, that are not part of the encoded text. Copy only the Base64 part.
- It is not an image at all. It might be a PDF, a font or plain text that is also written in Base64.
- It is SVG data. SVG pictures are rejected here for safety, because an SVG can contain scripts. If you need the picture, open the SVG in a controlled place or convert it to PNG.

## Safety and privacy

Base64 is not secret. It hides nothing, and anybody can decode it in seconds. Do not embed a private picture and assume that it is protected.

Pictures also carry hidden details such as the camera and the place where a photo was taken. When you encode a photo that you are about to publish, check what it contains. Our guide to <post_how-to-remove-metadata-from-photos-and-pdfs>removing metadata from photos and PDFs</post_how-to-remove-metadata-from-photos-and-pdfs> explains what to look for.

Never paste Base64 strings from sources you do not trust into code that you run. A string is only data, but what you do with it afterwards matters.

## Where Base64 pictures appear

You meet them in many places: in email templates, in single-file web pages, in style sheets for small icons, in API messages that carry avatars or signatures and in saved documents. If the picture comes inside a JSON message and you want to keep the message small, our guide to <post_how-to-minify-json-and-save-bytes>minifying JSON</post_how-to-minify-json-and-save-bytes> explains what can and cannot be shrunk. The long encoded text will stay long, and only the whitespace around it can go.

## Common mistakes to avoid

- Embedding large photos, which makes pages heavy.
- Forgetting that the text is about a third bigger than the file.
- Copying only part of a long Base64 string.
- Pasting the prefix twice or including quotation marks.
- Treating Base64 as encryption.
- Embedding a picture before making it small.

## A quick checklist

1. Make the picture as small as possible first.
2. Choose the output style that matches the place where you will paste it.
3. Use embedding only for small pictures, not for large photos.
4. When decoding, copy only the Base64 part and check that it is complete.
5. Remember that Base64 hides nothing.

:::faq Frequently asked questions
Q: When should I use Base64 images?
A: For tiny icons in CSS or emails where an extra request costs more than the roughly 33 percent size increase. Avoid it for large photos.

Q: Do I need the data prefix to decode an image?
A: No. Without a prefix the tool detects the format from the file signature, for PNG, JPG, GIF and WebP.

Q: Why do I get an error when decoding?
A: The string is probably truncated, contains extra characters, or is not an image. SVG data is also rejected here for safety.

Q: What are the size limits?
A: Image to Base64 accepts one image of up to 5 MB, and Base64 to Image decodes up to 10 MB of data.

Q: Is Base64 a way to hide a picture?
A: No. It is an encoding, not encryption, and anyone can decode it.
:::
