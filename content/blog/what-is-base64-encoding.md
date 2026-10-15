---
title: What Is Base64 Encoding? Uses, Limits and Examples
description: Learn what Base64 is, why it makes data a third larger, where it is used and why it is not encryption, and how to encode and decode in your browser.
excerpt: Base64 turns any data into plain text characters. Learn where it is used, what it costs and what it is not: a way to keep secrets.
imageAlt: Binary ones and zeros turning into a string of letters and digits on a teal background
published: 2026-10-15
tool: base64-encoder-decoder
tools: base64-encoder-decoder, image-to-base64, base64-to-image, url-encoder-decoder, json-formatter, html-encoder-decoder
ctaHeading: Encode or decode now
cta: Open <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder>, or browse all of the <all_developer>developer tools</all_developer>.
---

You open an email source, an API response or a CSS file and meet a long run of letters and digits ending in one or two equals signs. That is probably Base64. It shows up in web pages, tokens, configuration files and email attachments, usually without anyone explaining what it is.

This guide explains Base64 in plain language: what problem it solves, how it works, what it costs, and the most important thing to remember about it, which is that it is encoding, not encryption.

:::takeaways
- Base64 represents any data using only 64 safe text characters, so it can travel through systems built for text.
- The encoded text is about 33% larger than the original data.
- It is not encryption: anyone can decode it, so never use it to hide a secret.
- Text, and images through the dedicated tools, can be encoded and decoded in your browser without uploading anything.
:::

## The problem Base64 solves

Many systems were designed to carry text, not raw bytes. Email, parts of URLs, JSON and HTML can break, or alter data, when they meet arbitrary binary values such as an image or a file. Control characters get stripped, line breaks get changed, and bytes that are not valid text get mangled.

Base64 avoids the problem by translating any sequence of bytes into a limited alphabet of 64 characters that every text system handles safely: the capital letters, the lowercase letters, the digits, plus and slash. The result is plain text that can be copied, pasted, stored in JSON or placed in an email without damage, and later turned back into the exact original bytes.

## How it works, in short

Base64 takes the data three bytes at a time. Three bytes are 24 bits, which it splits into four groups of 6 bits. Each 6-bit group is a number from 0 to 63, and each number is mapped to one character of the alphabet. Three bytes in, four characters out.

When the data does not divide evenly by three, the end is padded with one or two equals signs. That is why many Base64 strings finish with = or ==. A variant called URL-safe Base64 swaps plus and slash for minus and underscore, so the text can sit inside a web address, and often leaves out the padding.

## Why the result is bigger

Four characters for every three bytes means the output is about one third larger than the input, plus a little for padding and any line breaks. A 300 KB image becomes roughly 400 KB of text. This is the price of using only safe characters, and it is the main reason not to Base64-encode large files when you can avoid it.

## Where you meet Base64

- Images and fonts embedded directly in HTML or CSS as data URIs, which start with data: followed by a type and base64.
- Email attachments, which are encoded so they can travel inside text messages.
- Web tokens such as JWTs, whose parts use the URL-safe variant.
- HTTP basic authentication headers, where the username and password are encoded, not protected.
- Binary values stored inside JSON or XML, which cannot hold raw bytes.
- Certificates and keys in text formats.

## Base64 is not encryption

This point causes real security mistakes. Base64 is a public, reversible way of writing data. Anyone can decode it in a second, with no key or password. Encoding a password or a token in Base64 hides nothing.

If something must stay secret, it needs real encryption, or better, it should never be put in the page, URL or message at all. If you see Base64 in a header or a configuration file, assume that whoever can read the file can read the value.

## How to encode and decode text in your browser

<tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> works entirely in your browser, so what you paste is not sent to a server. It handles the full range of text, including accented letters, scripts such as Arabic, Chinese or Cyrillic, and emoji, because it encodes text as UTF-8 first.

1. Choose Encode or Decode.
2. Paste your text.
3. Copy the result.

If decoding fails, the input is not valid Base64. Common causes are stray spaces or line breaks, a missing character, or text that is actually URL-safe Base64 using minus and underscore. Remove surrounding whitespace and check the ending first.

## Images and Base64

An image can be turned into a Base64 string and back. <tool_image_to_base64>Image to Base64</tool_image_to_base64> produces the text you can place in HTML or CSS, and <tool_base64_to_image>Base64 to Image</tool_base64_to_image> turns such a string back into a picture you can save. This is handy for tiny icons you want to embed to save a request. For anything larger than a few kilobytes, a normal image file is better: it loads separately, can be cached by the browser and does not add a third to its size inside your page. If the picture is too heavy to embed, shrink it first; our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> shows how.

## Base64, URL encoding and JSON

These three are often confused, but they solve different problems:

- Base64 turns arbitrary bytes into safe text.
- URL encoding, also called percent-encoding, makes text safe to place inside a web address, replacing unsafe characters with a percent sign and two digits. <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> does it.
- JSON is a structure for data. A JSON string can hold a Base64 value, and our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json> shows how to keep it valid.

Text that contains HTML special characters is a fourth case, handled by <tool_html_encoder_decoder>HTML Encoder / Decoder</tool_html_encoder_decoder>.

## Common mistakes

- Treating Base64 as a way to keep a password or token private.
- Embedding large images as Base64 in a page, which bloats it and cannot be cached separately.
- Forgetting that the data grows by about a third when you store or send it.
- Copying a string with a line break or space in the middle, which makes decoding fail.
- Mixing the standard and URL-safe alphabets and then wondering why a decoder rejects the text.

:::faq Frequently asked questions
Q: Is Base64 a form of encryption?
A: No. It is an encoding that anyone can reverse without a key. Never use it to protect a secret.

Q: Why does Base64 make data bigger?
A: It uses four text characters for every three bytes of data, so the output is about 33% larger than the input.

Q: What do the equals signs at the end mean?
A: They are padding. They fill the last group when the data length is not a multiple of three bytes, so you will see one or two of them at the end of many strings.

Q: Can Base64 handle non-English text and emoji?
A: Yes. The text is converted to UTF-8 bytes before it is encoded, so any language and emoji can be encoded and decoded correctly.

Q: Is my text uploaded when I use the tool?
A: No. The encoding and decoding happen in your browser and nothing is sent to a server.
:::
