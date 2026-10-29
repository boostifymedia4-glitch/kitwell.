---
title: What Is a UUID and How to Generate One in Bulk
description: Learn what a UUID is, why version 4 random identifiers almost never collide, how to choose the format and how to generate up to a thousand of them at once.
excerpt: A clear guide to UUIDs: what the pattern means, how version 4 works, how likely a collision really is, when to use a UUID instead of a counter and how to generate them in your browser.
imageAlt: A long unique identifier made of hexadecimal groups on a teal background
published: 2026-10-29
updated: 2026-10-29
tool: uuid-generator
tools: uuid-generator, timestamp-converter, json-formatter, password-generator, base64-encoder-decoder, text-sorter
ctaHeading: Try it yourself
cta: Open <tool_uuid_generator>UUID Generator</tool_uuid_generator>, or browse all of the <all_developer>developer tools</all_developer>.
---

Every database row, uploaded file, order and user needs a name that no other row, file, order or user has. The simplest idea is a counter: 1, 2, 3 and so on. A counter works well until two systems have to create records at the same time, or data from two places has to be merged. Then two different things end up with the same number.

A UUID solves this. It is a long identifier that can be created anywhere, at any time, without asking a central system, and still be unique. This guide explains what a UUID looks like, how version 4 is made, how safe it is, when to use one and how to generate them in your browser.

:::takeaways
- A UUID is a 128-bit identifier, usually written as 32 hexadecimal characters in five groups separated by hyphens.
- Version 4 UUIDs are random. They have 122 random bits, so a collision is negligible in practice.
- You can create identifiers without a central counter, which makes UUIDs ideal for systems that work in many places at once.
- UUIDs are identifiers, not secrets. Do not use them as passwords or access tokens.
- The generator makes version 4 UUIDs only, with options for case, hyphens and braces.
:::

## What a UUID looks like

A UUID, which stands for universally unique identifier, is written like this: 123e4567-e89b-42d3-a456-426614174000. It has 32 characters from 0 to 9 and a to f, split into five groups of 8, 4, 4, 4 and 12 characters.

Behind the text is a 128-bit number. That is a number with more than 38 digits, which is far more than the number of grains of sand on Earth. Some systems write the same number in capital letters, without hyphens or wrapped in braces, and all of these forms mean the same identifier.

The name GUID is the same idea, used mostly in Microsoft systems.

## The versions

UUIDs come in versions. A few characters inside the identifier tell which version it is.

- Version 1 is built from the time and the address of the machine.
- Version 3 and 5 are made from a name by hashing it, so the same name always gives the same UUID.
- Version 4 is made from random numbers.
- Newer versions add time-ordered designs that sort well in databases.

Version 4 is by far the most used, because it needs no information about the machine and no clock. The third group always begins with the digit 4, and the fourth group begins with 8, 9, a or b. You can check any identifier you receive by looking at those two spots.

<tool_uuid_generator>UUID Generator</tool_uuid_generator> makes version 4 UUIDs only.

## How safe is a random UUID

A version 4 UUID has 122 random bits, because six of the 128 bits are used for the version and variant. That gives about 5 times ten to the power of 36 possible values.

The chance that two randomly made identifiers are the same is so small that it is negligible in practice. To have even a one in a billion chance of one repeat, you would have to create about 100 trillion UUIDs. For any real application, such as a database with millions or billions of rows, you can treat version 4 UUIDs as unique.

This relies on the random numbers being good. The tool uses your browser's built-in secure random generator, which is made for exactly this purpose. A poor random generator, such as one that always starts from the same seed, breaks the guarantee.

## When to use a UUID

UUIDs are a good choice when:

- Several systems create records independently, for example mobile apps that work offline and sync later.
- You merge data from different sources, and counters from each source would clash.
- You want identifiers that are hard to guess one by one, so a user cannot simply change a number in an address to see another record. This is not security by itself, but it avoids accidental exposure.
- You need an identifier before you save the record, for example to name an upload.

A plain counter is still better when you need short, human-friendly numbers, such as an invoice number or a ticket number. People can read, say and remember 4021, and nobody wants to read out a UUID over the phone.

## What a UUID is not

A UUID is an identifier. It is not a secret.

- Do not use a UUID as a password. If you need a strong password, use a tool made for it. Our guide to <post_how-to-generate-a-strong-password>generating a strong password</post_how-to-generate-a-strong-password> explains how.
- Do not treat a UUID in a link as a lock. A link with a long random identifier is hard to guess, but anyone who gets the link can open it. Add real access control for private data.
- Do not use a UUID to carry information. Version 4 holds no time, no place and no meaning.

## How to generate UUIDs

The generator runs in your browser tab, so the identifiers are made on your device.

1. Open the tool and choose how many you want, from 1 to 1,000.
2. Choose the format: uppercase or lowercase, with or without hyphens, and with or without braces.
3. Generate. A new set appears each time.
4. Copy the list.

The formats exist because different systems expect different spellings. Many databases and programming languages use lowercase with hyphens. Some Windows tools use braces and capital letters. Check what the receiving system expects before you paste.

## Sorting and checking lists of UUIDs

When you export a list of identifiers, a few small tools help. <tool_text_sorter>Text Sorter</tool_text_sorter> puts a list in order, which makes it easier to compare two exports, and our guide to <post_how-to-sort-lines-and-remove-duplicates>sorting lines and removing duplicates</post_how-to-sort-lines-and-remove-duplicates> explains how to do it safely. Random UUIDs sort in no meaningful order, so sorting is only for comparison.

If you wonder whether a list of identifiers contains a repeat, removing duplicate lines will show it: the number of removed lines should be zero.

## UUIDs and time

A random UUID carries no time. If you need to know when a record was created, store a timestamp next to the identifier. Our guide to <post_unix-timestamps-explained>Unix timestamps</post_unix-timestamps-explained> explains how to store and read times, and <tool_timestamp_converter>Timestamp Converter</tool_timestamp_converter> converts them.

Some newer UUID versions put the time at the front, so that new identifiers sort after old ones. That helps database performance, since new rows are added at the end of an index instead of in random places. If you work with very large tables, look into those versions.

## Using UUIDs in files and data

UUIDs appear in JSON documents, in file names and in addresses. When you work with JSON, <tool_json_formatter>JSON Formatter</tool_json_formatter> makes a long list of objects readable, and our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json> covers the format. If you need to put an identifier into text that has strict character rules, <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> shows how data can be written with a small set of safe characters, and our guide to <post_what-is-base64-encoding>Base64 encoding</post_what-is-base64-encoding> explains why that works.

When you document identifiers for your team, a short note in Markdown is often enough. Our guide to <post_how-to-write-and-preview-markdown>writing and previewing Markdown</post_how-to-write-and-preview-markdown> shows how to do it.

## Common mistakes to avoid

- Using a UUID as a password or as proof that a person may open a private link.
- Storing UUIDs as long text when your database has a compact type for them, which wastes space.
- Mixing uppercase and lowercase forms of the same identifier, so that two copies look different.
- Expecting a version 4 UUID to show when it was created.
- Writing down UUIDs by hand, where a single wrong character makes them useless.

## A quick checklist

1. Decide whether you need a UUID or a short human-friendly number.
2. Generate version 4 UUIDs in the format your system expects.
3. Keep the same spelling everywhere: case, hyphens and braces.
4. Store the creation time in a separate field.
5. Use real access control for anything private.

:::faq Frequently asked questions
Q: Can two UUIDs collide?
A: Version 4 UUIDs have 122 random bits, so the chance of a collision is negligible in practice.

Q: Which UUID versions does the generator make?
A: Only version 4, the random kind.

Q: How many UUIDs can I generate at once?
A: From 1 to 1,000 per click, in your choice of case, with or without hyphens and with or without braces.

Q: Is a UUID a secret?
A: No. It is an identifier. Do not use it as a password or as the only protection for private data.

Q: What is the difference between a UUID and a GUID?
A: They are the same kind of identifier. GUID is the name used mostly in Microsoft systems.
:::
