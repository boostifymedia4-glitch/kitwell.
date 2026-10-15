---
title: How to Format and Validate JSON: A Practical Guide
description: Learn the rules of valid JSON and the mistakes that break it, then format, validate and minify JSON in your browser with exact line and column errors.
excerpt: Fix broken JSON quickly. See the syntax rules, the most common errors and how to pretty-print, validate and minify JSON.
imageAlt: A block of curly-brace JSON code being aligned into neat indented lines on a teal background
published: 2026-10-15
tool: json-formatter
tools: json-formatter, json-validator, json-minifier, url-encoder-decoder, base64-encoder-decoder, text-diff-checker
ctaHeading: Format your JSON now
cta: Open <tool_json_formatter>JSON Formatter</tool_json_formatter>, or browse all of the <all_developer>developer tools</all_developer>.
---

An API returns one long line of brackets and quotes. A config file will not load and the error says only “unexpected token”. A colleague pastes a JSON snippet into a chat and it has lost half its structure. JSON is simple, but it is strict, and a single stray character breaks the whole document.

This guide covers the rules that matter, the mistakes behind most errors, and a quick workflow for formatting, checking and shrinking JSON in your browser, with nothing uploaded to a server.

:::takeaways
- JSON allows only double-quoted strings and keys, no trailing commas and no comments.
- A validator tells you the exact line and column of the first error, which is usually enough to fix it.
- Format (pretty-print) JSON to read it and minify it to send it; neither changes the data.
- Numbers larger than 2 to the power of 53 lose precision when a browser parses them.
:::

## What JSON is

JSON, short for JavaScript Object Notation, is a plain-text format for structured data. It has six kinds of value: objects in curly braces, arrays in square brackets, strings, numbers, true or false, and null. Objects hold key and value pairs; arrays hold ordered lists.

Because it is plain text, it works everywhere: web APIs, configuration files, app settings, exports from databases and tools. That portability is why everyone uses it, and why a small mistake in a hand-edited file causes so much trouble.

## The rules that cause most errors

JSON looks like JavaScript, but its rules are stricter. Almost every “invalid JSON” message traces back to one of these:

- Keys and strings must use double quotes. Single quotes and unquoted keys are not valid.
- No trailing commas. A comma after the last item of an object or array breaks the document.
- No comments. JSON has no comment syntax, so lines starting with // or blocks in slashes and asterisks are errors.
- Values must be one of the six types. undefined, NaN and Infinity are not valid JSON values.
- Strings must escape special characters. A quote inside a string needs a backslash, and a raw line break inside a string is not allowed; write it as \n.
- Brackets and braces must match. Every opening one needs its closing partner, in the right order.

## Validate: find the exact problem

<tool_json_validator>JSON Validator</tool_json_validator> checks whether your text is valid JSON and, if it is not, points to the exact line and column of the error. Paste the document, read the message and fix it, then check again.

Two tips make this faster:

- The reported position is where the parser noticed the problem, which can be just after the real mistake. If the line looks fine, check the line above, especially for a missing comma or a missing closing quote.
- Fix one error at a time. A single missing bracket can produce confusing messages further down, and most of them disappear once the first is fixed.

The validator checks syntax only. It tells you whether the JSON is well-formed, not whether it has the fields your application expects. Checking against a JSON Schema is not included.

## Format: make it readable

<tool_json_formatter>JSON Formatter</tool_json_formatter> adds line breaks and indentation so that nested structures become easy to scan. You can choose the indentation and sort the keys alphabetically.

1. Paste your JSON.
2. Choose the indentation, for example two spaces, and whether to sort keys.
3. Copy the formatted result or download it.

Sorting keys is useful when you want to compare two documents, because the same data then appears in the same order. It changes only the order of keys in objects, not the order of array items, and it does not change any values. If you want to see exactly what differs between two versions, paste both into <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker> after formatting them the same way.

## Minify: make it small

<tool_json_minifier>JSON Minifier</tool_json_minifier> does the opposite of formatting. It removes all whitespace that is not needed, which makes the text smaller for sending over a network or storing in a field. The data stays exactly the same, so you can format it again at any time.

Use formatted JSON for reading and editing, and minified JSON for sending and storing. Do not try to read minified output by eye; format it first.

## Large numbers and other surprises

JavaScript, and therefore the browser, stores numbers as 64-bit floating-point values. Integers larger than 2 to the power of 53, about 9 quadrillion, cannot all be represented exactly. If your JSON contains such an id or a very long number, parsing and re-printing it can change the last digits. When ids are that long, treat them as strings in the JSON.

Other things to watch for:

- Duplicate keys in the same object are allowed by the syntax but unreliable, because programs differ in which value they keep.
- Dates have no special type in JSON. They are usually strings in a standard format, so their meaning depends on the agreement between sender and receiver.
- Special characters and non-Latin text are fine. JSON is Unicode text, and the tools handle it correctly.

## A quick workflow for broken JSON

1. Paste it into the JSON Validator and read the message.
2. Fix the first error, usually a quote, a comma or a bracket.
3. Repeat until the validator reports valid JSON.
4. Format it so you can read the structure.
5. Minify it again if you need the compact version.

## Related tasks

JSON often travels inside other text. Query-string values and URLs need percent-encoding, which <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> handles, and binary or awkward text is often wrapped in Base64. Our guide to <post_what-is-base64-encoding>what Base64 encoding is</post_what-is-base64-encoding> explains when and why, and <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> converts it in your browser.

## Embedded pictures make JSON heavy

Some JSON files carry images as Base64 text. Because Base64 is about a third larger than the original data, a few large pictures can make a file huge. Shrink the pictures before encoding them; our guide to <post_reduce-image-size-in-kb>reducing image size in KB</post_reduce-image-size-in-kb> shows how.

## Privacy

All three JSON tools run in your browser. What you paste is parsed on your device and is not sent to a server. Even so, avoid pasting live credentials, tokens or personal data into any tool you do not control, and remove them from samples you share.

:::faq Frequently asked questions
Q: Why is my JSON invalid when it looks fine?
A: The usual causes are single quotes instead of double quotes, a trailing comma, a comment, or an unquoted key. The validator shows the exact line and column of the first error.

Q: Does formatting JSON change the data?
A: No. Formatting only changes whitespace, and sorting changes the order of keys in objects. Values and array order stay the same.

Q: Can JSON have comments?
A: No. Standard JSON has no comment syntax. If a file with comments is accepted by some program, that program supports an extended format, not JSON itself.

Q: What is the difference between formatting and minifying?
A: Formatting adds indentation and line breaks for readability. Minifying removes unneeded whitespace to make the text smaller. The content is identical.

Q: Is my JSON uploaded when I use these tools?
A: No. The tools run in your browser, so the text stays on your device.
:::
