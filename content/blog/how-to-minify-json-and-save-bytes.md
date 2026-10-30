---
title: How to Minify JSON and Check How Many Bytes You Save
description: Remove whitespace from JSON, see the exact bytes saved, learn when minifying helps compared with gzip compression and avoid the large-number precision trap.
excerpt: A practical guide to JSON minification: what is removed, what stays the same, how much you really save, how it relates to gzip and Brotli, and the large-number trap to avoid.
imageAlt: Curly braces being squeezed into a smaller block of text on a teal background
published: 2026-10-30
updated: 2026-10-30
tool: json-minifier
tools: json-minifier, json-formatter, json-validator, text-diff-checker, base64-encoder-decoder, text-cleaner
ctaHeading: Try it yourself
cta: Open <tool_json_minifier>JSON Minifier</tool_json_minifier>, or browse all of the <all_developer>developer tools</all_developer>.
---

JSON is the language that web services use to talk to each other. It is readable because it is written with line breaks and indentation, and those line breaks and spaces are for people only. A program that reads JSON does not need any of them. When the same data is sent millions of times, those extra characters add up to real bandwidth and real waiting time.

Minifying JSON removes everything that is not needed and leaves the data as short as it can be. This guide explains what changes and what does not, how much you can expect to save, how minifying relates to compression and how to avoid the one trap that can change your numbers.

:::takeaways
- Minifying removes only insignificant whitespace. Keys, values and their order stay the same.
- The tool shows the size saved, so you can see the real effect for your data.
- Minified JSON is hard to read, so keep a formatted copy for editing and a minified copy for sending.
- Compression such as gzip or Brotli shrinks JSON far more than minifying, and the two work well together.
- Numbers larger than 2 to the power of 53 lose precision when a browser parses them.
:::

## What minifying does

Take a small piece of JSON written for people. Each key sits on its own line, indented with spaces, with a space after every colon and a line break after every comma. The same data minified is one line, with no indentation, no spaces after colons and no line breaks.

The meaning is identical. A program that reads one reads the other in exactly the same way, because the extra whitespace sits between the parts of the data and carries no information.

What minifying does not touch:

- The names of keys and the order in which they appear.
- The values, including numbers, true, false and null.
- The text inside quotation marks. Spaces inside a string are part of the string and stay.

So minifying is safe. It is a change in appearance, not in content.

## How to minify JSON

<tool_json_minifier>JSON Minifier</tool_json_minifier> works inside your browser tab, so your data stays on your device.

1. Paste your JSON into the box.
2. The minified output appears at once, with the size saved.
3. Copy it or download it.

If the text is not valid JSON, the tool tells you instead of producing a result. The usual causes are a comment, a trailing comma or single quotes, none of which strict JSON allows. <tool_json_validator>JSON Validator</tool_json_validator> reports the line and column of the problem, and our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json> explains the common errors.

## How much will you save

The saving depends on how your data was written.

- JSON formatted with deep indentation has a lot of whitespace, and minifying can remove a large share of it, sometimes a quarter of the size or more.
- Data that was already compact, such as the output of most programs, has little to remove, and the saving can be close to nothing.
- Very long strings, such as text or encoded pictures, hardly change, since the whitespace was never the main part.

The tool shows the exact number of bytes saved, so you do not have to guess. Try it with a typical response from your own service before you decide that it is worth the effort.

## Minifying and compression are different things

Many people think of minifying as the main way to shrink JSON. In practice, compression does far more.

Web servers can compress JSON with gzip or Brotli before they send it. Compression finds repeated patterns, and JSON, with its repeated key names, compresses very well, often to a small fraction of its size. Indentation compresses well too, because runs of spaces are an easy pattern. So after compression, the difference between formatted and minified JSON shrinks.

That does not make minifying useless. It still reduces what has to be compressed and parsed, it helps where compression is not available, such as data stored in a limited field or sent in a URL, and it costs nothing. The best approach is to do both: minify, then let the server compress.

## When minifying is worth it

Minifying is a good idea when:

- The data is sent to browsers or phones on slow connections.
- It is stored in a place with a size limit, such as a configuration field or a cookie-sized value.
- It is embedded in a page or a script.
- A limit on the length of a message applies.

It is not worth it when people have to read the data. Configuration files, documentation and examples are better left formatted. A good habit is to keep one formatted file as the source of truth and to make the minified version from it when you publish.

## Reading minified JSON again

Minified JSON is one long line, which is hard to read and hard to compare. When you have to look inside it, turn it back into readable form with <tool_json_formatter>JSON Formatter</tool_json_formatter>, which adds indentation and can sort keys.

To see what changed between two versions of a minified file, format both in the same way first, then compare them with <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker>. Two long lines compared directly tell you almost nothing, while two formatted versions show exactly which values differ.

## Special cases

Some situations need extra care.

- JSON that contains encoded pictures or files. The long encoded text hardly shrinks when you minify. Our guide to <post_what-is-base64-encoding>Base64 encoding</post_what-is-base64-encoding> explains why it grows, and <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> converts text.
- JSON that contains dates. Dates are usually text or timestamps and are not changed. Our guide to <post_unix-timestamps-explained>Unix timestamps</post_unix-timestamps-explained> explains how to read them.
- JSON that you copied from a web page or a document, with curly quotes, invisible characters or extra spaces around it. Clean it first with <tool_text_cleaner>Text Cleaner</tool_text_cleaner>, because these characters are not valid JSON.
- Data from tools that produce JSON, such as the properties of a PDF. Our guide to <post_how-to-view-pdf-properties-and-metadata>viewing PDF properties and metadata</post_how-to-view-pdf-properties-and-metadata> shows one example that you can copy as JSON.

## The large number trap

JSON itself has no limit for the size of a number, but the browser that parses it does. JavaScript stores numbers as floating point values, which hold whole numbers exactly only up to 2 to the power of 53, about nine quadrillion. A larger number is rounded to the nearest value it can store, and its last digits can change.

Identifiers from some databases and services are larger than that. If you minify, or format, JSON that contains one in a browser, the digits can change without any warning. If exactness matters, store such identifiers as text in quotation marks, and minify them with a tool that keeps the original text.

## Common mistakes to avoid

- Minifying a file that people must edit, and losing the readable copy.
- Expecting a large saving from data that was already compact.
- Treating minifying as a replacement for server compression.
- Forgetting that numbers above 2 to the power of 53 lose precision.
- Minifying text that is not valid JSON, such as a file with comments.
- Comparing two minified files instead of formatting them first.

## A quick checklist

1. Validate the JSON first, so errors are found before you minify.
2. Minify and read the number of bytes saved.
3. Keep a formatted copy as the source.
4. Let your server compress the result with gzip or Brotli.
5. Store very large identifiers as text.

:::faq Frequently asked questions
Q: Does minifying change the data?
A: No. Only insignificant whitespace is removed. Keys, values and order are unchanged.

Q: Why do large numbers change?
A: Numbers larger than 2 to the power of 53 lose precision because the browser parses them as floating point.

Q: Is minifying the same as compressing?
A: No. Minifying removes whitespace. Compression such as gzip or Brotli works on top and shrinks the data much further.

Q: Why does the tool show an error?
A: The text is probably not valid JSON, for example because of a comment, a trailing comma or single quotes.

Q: Can I make minified JSON readable again?
A: Yes. Paste it into the JSON formatter to add indentation.
:::
