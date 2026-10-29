---
title: How to Write and Preview Markdown With Live HTML Output
description: Learn the Markdown basics for headings, lists, links, tables and code, see a safe live preview and copy clean HTML for your page, README or documentation.
excerpt: A practical Markdown guide: the syntax you need, how a live preview helps you catch mistakes, how GitHub-style tables and task lists work and why the preview is sanitized.
imageAlt: Plain text on the left turning into a formatted page on the right on a teal background
published: 2026-10-29
updated: 2026-10-29
tool: markdown-previewer
tools: markdown-previewer, html-encoder-decoder, text-cleaner, word-counter, text-diff-checker, regex-tester
ctaHeading: Try it yourself
cta: Open <tool_markdown_previewer>Markdown Previewer</tool_markdown_previewer>, or browse all of the <all_developer>developer tools</all_developer>.
---

Markdown is a way of writing formatted text using only plain characters. You put a hash sign before a line to make it a heading, a hyphen before a line to make it a list item and asterisks around a word to make it bold. The file stays readable as plain text, and a program turns it into a nicely formatted page.

It is the standard for README files, project documentation, notes and many blogs, because it is fast to write and works everywhere. This guide covers the syntax you need, explains how a live preview helps, shows how to get clean HTML out of your text and explains why the preview is safe.

:::takeaways
- Markdown uses simple characters such as hash signs, hyphens and asterisks to describe headings, lists and emphasis.
- A live preview shows mistakes as you type, before you publish.
- The previewer supports GitHub-flavoured Markdown, including tables, task lists and strikethrough.
- The generated HTML is sanitized before it is shown, so scripts and event handlers are removed.
- You can copy either the Markdown or the generated HTML.
:::

## Why Markdown

Word processors hide their formatting inside a complex file. Markdown keeps it visible, in the text itself. That brings real advantages.

- It is fast. Your hands stay on the keyboard and you never search for a toolbar button.
- It is portable. The text opens in any editor, on any system, and will still open in twenty years.
- It works with version control. Because it is plain text, you can compare versions line by line.
- It converts to many formats, such as HTML, PDF and word processor documents.

The trade-off is that you must remember a small set of symbols, which a preview helps with.

## The syntax you need

A short list covers most documents.

- Headings: one to six hash signs at the start of a line, followed by a space. One hash is the biggest heading and six is the smallest.
- Paragraphs: separate them with an empty line.
- Bold: put two asterisks on each side of the text. Italic: one asterisk on each side.
- Bullet lists: start each line with a hyphen and a space. Numbered lists: start each line with a number, a full stop and a space.
- Links: put the link text in square brackets and the address in round brackets right after it.
- Pictures: the same as a link, with an exclamation mark in front.
- Quotes: start the line with a greater-than sign.
- Code: put a word between single backticks, or put several lines between two lines of three backticks.
- A horizontal line: three hyphens on a line of their own.

Indenting a list item by two or four spaces makes a nested list. A line break inside a paragraph needs two spaces at the end of the line, or a blank line to start a new paragraph.

## Tables, task lists and strikethrough

The previewer understands GitHub-flavoured Markdown, which adds a few useful features.

- Tables are written with vertical bars between the columns, and a line of hyphens under the header row.
- Task lists are bullet lists where each item starts with a pair of square brackets, empty for open tasks and with an x for finished ones.
- Strikethrough is written by putting two tildes on each side of the text.
- Web addresses that you type in plain text are turned into links automatically.

It does not support extensions such as maths formulas or diagrams. If you need those, check that the system where you will publish supports them, and test there.

## How to use the previewer

<tool_markdown_previewer>Markdown Previewer</tool_markdown_previewer> works inside your browser tab, so your text stays on your device.

1. Write or paste your Markdown on the left.
2. Watch the rendered result on the right as you type.
3. Copy the Markdown, or copy the generated HTML.

Use the preview to catch the usual slips: a heading without a space after the hash signs, a list that is not recognised because there is no empty line above it, a table that falls apart because a column is missing or a link with a missing bracket.

## Why the preview is safe

Markdown can contain raw HTML, and HTML can contain scripts. If a previewer showed everything it received, pasting a text from an unknown source could run code in your browser.

The previewer sanitizes the generated HTML with a well-known library before displaying it. Scripts, event handlers and other dangerous parts are removed, and only safe markup remains. That means you can paste untrusted text to see how it looks without risk.

The same rule applies to your own site. If you turn user-written Markdown into HTML, always sanitize the result, because the conversion itself does not make it safe.

## Getting clean HTML

Copying the generated HTML is useful when a page, an email template or a content system wants HTML and not Markdown. Paste the HTML into the place where it belongs, and add your own styling there.

If the HTML contains characters that must be escaped, for example when you show a code sample inside another HTML page, <tool_html_encoder_decoder>HTML Encoder / Decoder</tool_html_encoder_decoder> converts the special characters into entities and back. The idea of escaping appears again in our guide to <post_how-to-format-and-validate-xml>formatting and validating XML</post_how-to-format-and-validate-xml>.

## From and to other formats

You may already have content in another format.

- A PDF can be turned into Markdown, so you can edit it as text. Our guide to <post_how-to-convert-pdf-to-markdown>converting PDF to Markdown</post_how-to-convert-pdf-to-markdown> explains what is kept and what is guessed.
- HTML can be turned into a PDF to share a finished page. Our guide to <post_how-to-convert-html-to-pdf>converting HTML to PDF</post_how-to-convert-html-to-pdf> shows how.

Pictures inside a Markdown document are linked, not stored in the text. Make sure that they are sized well before you link them. Small pictures can be enlarged smoothly, as our guide to <post_how-to-enlarge-an-image-without-blur>enlarging an image without blur</post_how-to-enlarge-an-image-without-blur> explains.

## Writing habits that help

A few habits keep Markdown documents clean.

1. Use one top-level heading for the title, then second-level headings for the sections.
2. Keep lines of a paragraph together, and leave an empty line between blocks.
3. Use the same marker for all bullet lists in a document.
4. Give every picture a description, which helps people who use screen readers.
5. Keep an eye on length. <tool_word_counter>Word Counter</tool_word_counter> shows words and reading time, and our guide to <post_how-to-count-words-and-characters-online>counting words and characters</post_how-to-count-words-and-characters-online> explains the numbers.

When text comes from another program, it often arrives with curly quotes, double spaces and invisible characters. <tool_text_cleaner>Text Cleaner</tool_text_cleaner> removes them before you paste, and <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker> shows what changed between two versions of a document.

## Common mistakes to avoid

- Forgetting the space after the hash signs in a heading.
- Forgetting the empty line before a list or a table.
- Mixing tabs and spaces in nested lists.
- Pasting HTML from an unknown source into a page without sanitizing it.
- Writing a table without the line of hyphens under the header.
- Assuming that every platform supports the same extras.

## A quick checklist

1. Start with a title and clear section headings.
2. Check the preview for headings, lists, tables and links.
3. Make sure every picture has a description.
4. Copy the HTML only if your destination needs it.
5. Test the final text on the platform where it will be published.

:::faq Frequently asked questions
Q: Is the preview safe?
A: Yes. Generated HTML is sanitized with DOMPurify before display, so scripts and event handlers are removed.

Q: Which Markdown flavour is supported?
A: GitHub-flavoured Markdown, through the marked library. It does not include math or diagram extensions.

Q: Can I copy the HTML?
A: Yes. You can copy either the Markdown or the generated HTML.

Q: Does it support tables and task lists?
A: Yes. GitHub-style tables, task lists and strikethrough are supported.

Q: Why is my list not shown as a list?
A: Usually there is no empty line above it, or the marker is not followed by a space.
:::
