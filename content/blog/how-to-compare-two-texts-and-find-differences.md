---
title: How to compare two texts and find the differences
description: Paste two versions of a text, clause, list or code snippet and see what was added, removed or changed. Learn line and word modes and how to clean text first.
excerpt: A practical guide to comparing two texts online: when a diff helps, how line and word modes differ, how to ignore whitespace, how to prepare the text and how to read the result.
imageAlt: Two text columns with highlighted added and removed lines on a teal background
published: 2026-11-05
updated: 2026-11-05
category: tutorials
tool: text-diff-checker
tools: text-diff-checker, text-cleaner, word-counter, remove-duplicate-lines, case-converter, json-formatter
ctaHeading: Try it yourself
cta: Open <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker>, or browse all of the <all_text>text tools</all_text>.
---

Two versions of a document look almost the same, and you need to know exactly what changed. Maybe a colleague edited a contract clause, a client sent a new price list, a configuration file behaves differently on two servers or you simply cannot remember what you rewrote in your essay. Reading both versions side by side is slow and tiring, and the eye misses small changes such as a single number or a missing word.

A text comparison tool, often called a diff checker, does this work in a second. This guide shows how to use one well, how to choose between line and word modes and how to avoid the common traps that make a comparison noisy.

:::takeaways
- A diff shows what was added, what was removed and what stayed the same between two texts.
- Use line mode for lists, code and settings, and word mode for sentences and paragraphs.
- Differences in spaces and line endings can hide the real changes. Ignoring whitespace removes that noise.
- Clean and format both texts in the same way before you compare them.
- The Kitwell tool works in your browser and limits the input to 200,000 characters.
:::

## When a comparison helps

A diff is useful whenever two pieces of text should be almost identical.

- Contracts, policies and terms, where a small change can matter a lot.
- Drafts of articles, essays and reports.
- Lists of names, emails, products or prices from two dates.
- Configuration files, scripts and data files.
- Translations and subtitles, to see what changed after a review.
- Answers copied from two sources, to check whether they really match.

In all of these, the question is the same: what is different, and is it what I expected?

## How to compare two texts

<tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker> runs inside your browser tab, so the text stays on your device.

1. Open the tool and paste the original text on one side and the changed text on the other.
2. Choose the mode, Lines or Words.
3. Decide whether to ignore whitespace.
4. Read the result. Added text and removed text are marked, and the unchanged parts stay plain.

Each side can hold a large amount of text, and the tool has a limit of 200,000 characters. For very large files, compare the part you care about.

## Lines or words

The mode decides what counts as one unit of change.

In Lines mode, a whole line is either the same or different. If one word changes inside a line, the whole line is marked as removed and a new line as added. This suits things that are naturally one item per line: lists, logs, code, settings and CSV rows.

In Words mode, the comparison goes word by word, so a changed word inside a sentence is marked on its own. This suits paragraphs, contracts and essays, where the line breaks are only a result of how the text was wrapped.

A good habit is to start with Lines to get the overview and switch to Words to see exactly what changed inside the lines that differ.

## Ignore whitespace when it is noise

Two texts can look the same and still differ in invisible ways: an extra space at the end of a line, a tab instead of spaces, or a different line ending from another system. Without help, the tool marks all of these as changes, and the important differences drown in the noise.

Turn on the option to ignore whitespace when you care about the words and not the layout. Turn it off when whitespace matters, for example in a file where indentation has a meaning, or when you want to prove that two texts are exactly the same.

## Prepare the text first

Garbage in, noise out. A few minutes of preparation make a comparison far more useful.

- Remove extra spaces, tabs and empty lines. <tool_text_cleaner>Text Cleaner</tool_text_cleaner> does this in one pass, and our guide to <post_how-to-sort-lines-and-remove-duplicates>sorting lines and removing duplicates</post_how-to-sort-lines-and-remove-duplicates> covers related clean-up.
- Sort lists in the same order, so the comparison does not report every moved item as a change.
- Remove repeated lines with <tool_remove_duplicate_lines>Remove Duplicate Lines</tool_remove_duplicate_lines> if the lists contain duplicates that you do not care about.
- Make the capital letters consistent if they should not matter. <tool_case_converter>Case Converter</tool_case_converter> turns both texts into the same case.
- For data in JSON, format both versions first. A minified file is a single line, and a comparison of two long lines tells you almost nothing. <tool_json_formatter>JSON Formatter</tool_json_formatter> puts each value on its own line, and our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json> explains how. The same applies to XML, which our guide to <post_how-to-format-and-validate-xml>formatting and validating XML</post_how-to-format-and-validate-xml> covers.

Our comparison of <post_json-vs-xml-which-format-should-you-use>JSON and XML</post_json-vs-xml-which-format-should-you-use> explains why the format of the data decides how you prepare it.

## How to read the result

The result usually has three kinds of content.

- Added text, which exists only in the changed version.
- Removed text, which exists only in the original.
- Unchanged text, which is the same in both.

Read the marked parts first and ask whether each one is intended. Pay special attention to small changes: numbers, dates, names, negations such as not, and units. These are the ones that people overlook when reading by eye and that cost the most when they are wrong.

If a block appears as removed in one place and added in another, the text was moved. Most simple diff tools show a move as a removal plus an addition, so look at both before you decide that something is missing.

## Counting changes

Sometimes you do not need the details, only the size of the change. <tool_word_counter>Word Counter</tool_word_counter> tells you how many words each version has, which is a quick way to see whether a text grew or shrank. Our guide to <post_how-to-count-words-and-characters-online>counting words and characters online</post_how-to-count-words-and-characters-online> explains how words are counted and why different programs can give slightly different numbers.

## Comparing PDFs

If your two versions are PDF files, you can compare the text inside them. First copy the text out of each PDF, then compare the two texts. Our guide to <post_how-to-compare-two-pdf-files>comparing two PDF files</post_how-to-compare-two-pdf-files> shows the whole process, including what a text comparison cannot see, such as a change in a picture or in the layout.

## Privacy and good habits

Contracts and drafts are often private. A tool that runs in your browser tab keeps the text on your device, which is a good reason to prefer it for sensitive material. Still, close the tab when you are finished, and do not paste secrets such as passwords or keys into any tool unless you need to.

Keep the original text. A diff tells you what changed, but it does not keep a history, so save both versions with clear names and dates.

## Common mistakes to avoid

- Comparing text with different line endings or extra spaces and treating the noise as real changes.
- Comparing minified data instead of formatting it first.
- Comparing unsorted lists and getting a long list of moves.
- Using Lines mode for paragraphs, where a single word marks the whole line.
- Trusting the colours without reading the changes.
- Forgetting that a text comparison does not see pictures or layout.

## A quick checklist

1. Clean both texts and put them in the same form.
2. Pick Lines for lists and settings, Words for sentences.
3. Ignore whitespace unless it matters.
4. Read every marked change, especially numbers and negations.
5. Save both versions.

:::faq Frequently asked questions
Q: What is the difference between Lines and Words mode?
A: Lines mode marks a whole line as changed if anything in it changed. Words mode marks only the changed words. Use Lines for lists and code, and Words for paragraphs.

Q: Why does the tool show changes when the texts look identical?
A: The difference may be invisible, such as extra spaces, tabs or different line endings. Turn on the option to ignore whitespace to hide these.

Q: Is there a size limit?
A: Yes. The tool limits the input to 200,000 characters.

Q: Is my text uploaded anywhere?
A: The comparison runs in your browser tab, so the text stays on your device.

Q: Can I compare two PDF files?
A: You can compare the text inside them after you extract it. A text comparison does not see changes in pictures or layout.
:::
