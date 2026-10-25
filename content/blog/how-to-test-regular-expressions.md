---
title: How to Test Regular Expressions With Live Matches
description: Learn the basics of regular expressions, test patterns against sample text, read capture groups and flags, and avoid patterns that freeze your browser.
excerpt: A beginner-friendly guide to regular expressions: patterns, flags, groups and replacements, a short list of useful patterns and how to avoid slow, runaway patterns.
imageAlt: A search pattern highlighting matches inside lines of text on a teal background
published: 2026-10-25
updated: 2026-10-25
tool: regex-tester
tools: regex-tester, text-cleaner, text-diff-checker, remove-duplicate-lines, json-formatter, url-encoder-decoder
ctaHeading: Try it yourself
cta: Open <tool_regex_tester>Regex Tester</tool_regex_tester>, or browse all of the <all_developer>developer tools</all_developer>.
---

A regular expression, often shortened to regex, is a compact way to describe a pattern in text. With one line you can find every date in a document, check that a field looks like a phone number, pull the numbers out of a log file or rewrite a thousand lines in one go.

The syntax looks strange at first, and it is easy to get a pattern almost right. Testing it against real sample text, with the matches highlighted, is the fastest way to learn and to avoid mistakes. This guide explains the building blocks, shows how to read matches and groups, and explains how to stay clear of patterns that run forever.

:::takeaways
- A regex describes a pattern. The tool highlights every match in your sample text as you type.
- Parentheses create groups, and the tool lists what each group captured.
- Flags change the behaviour: global, ignore case, multiline, dot matches newline and unicode.
- The tool uses JavaScript regular expressions, which differ in a few details from other languages.
- Patterns with nested repetition can run for a very long time, so the tool stops them after 1.5 seconds.
:::

## What a regular expression is

A regex is a small program written as text. Most characters match themselves, so the pattern cat matches the letters c, a and t in that order. The power comes from special symbols that match classes of characters, repeat things or mark positions.

People use regular expressions in editors, in programming languages, on the command line and in form validation. The same ideas appear everywhere, which is why learning them once pays off for years.

## The building blocks

These pieces cover most everyday patterns.

- A dot matches any single character except a line break.
- A backslash with d matches a digit, with w a letter, digit or underscore, and with s a space or tab. The capital versions mean the opposite.
- A plus sign means one or more of the previous item, a star means zero or more, and a question mark means zero or one.
- Curly braces set an exact count, so the pattern for four digits is a digit symbol followed by braces with the number 4.
- A caret matches the start of a line and a dollar sign the end of it.
- A backslash with b matches a word boundary, the edge between a word and the space around it.
- A vertical bar means or, so the pattern cat or dog is written with a bar between the two words.
- Parentheses group items together and capture what they matched.

Put them together and you can describe a date as four digits, a hyphen, two digits, a hyphen and two digits. Each piece is simple. The skill is in combining them.

## How to test a pattern

<tool_regex_tester>Regex Tester</tool_regex_tester> works inside your browser tab, so your sample text stays on your device.

1. Type your pattern in the pattern box, without the slashes that some programs write around it.
2. Choose the flags you need.
3. Paste the text to test.
4. Read the highlighted matches and the table that lists every match with its position.
5. Open the replacement preview to see what the text would look like after a find and replace.

Start with a small sample that contains both the lines you want to match and some that you do not. A good test set includes the easy cases, the edge cases and a few lines that should be ignored.

## Flags

Flags change how the whole pattern behaves. The tool offers these.

- Global finds every match instead of stopping at the first one. You usually want it on.
- Ignore case treats capital and small letters as the same.
- Multiline makes the caret and the dollar sign match at the start and end of every line, not only of the whole text.
- Dot matches newline lets the dot cross line breaks.
- Unicode makes the engine understand characters outside the basic range, such as emoji and letters from many alphabets.

When a pattern works on one line but fails on a long text, the cause is usually the multiline or the global flag.

## Groups and replacements

Parentheses turn part of a pattern into a group. The table in the tool shows what each group captured in each match, which is the quickest way to check that a pattern splits text the way you intended.

Take the pattern with three groups for a year, a month and a day, built from digits and hyphens. On the text 2026-10-25 the first group holds the year, the second the month and the third the day. In a replacement, you can refer to these groups by number, so you can reorder them. A replacement that writes group three, then group two, then group one, separated by slashes, turns the date into day, month and year.

The replacement preview shows the result before you use the pattern anywhere else, which saves you from damaging a large file.

## Patterns worth keeping

A few patterns appear again and again.

- Lines that are empty or contain only spaces: a caret, optional spaces and a dollar sign.
- Two or more spaces in a row: a space followed by a plus sign, which you replace with a single space.
- A number with optional decimals: digits, then an optional group made of a dot and more digits.
- A whole word, so that cat does not match inside catalogue: the word with a word boundary on each side.
- Spaces at the end of a line: spaces followed by a dollar sign.

For plain cleanup, you may not need a pattern at all. <tool_text_cleaner>Text Cleaner</tool_text_cleaner> removes extra spaces, empty lines and invisible characters with a few tick boxes, and <tool_remove_duplicate_lines>Remove Duplicate Lines</tool_remove_duplicate_lines> removes repeated lines. Our guide to <post_how-to-count-words-and-characters-online>counting words and characters</post_how-to-count-words-and-characters-online> uses the same tools to prepare text.

## Be careful with validation

Regular expressions are tempting for checking emails, phone numbers and addresses, but the real rules are complicated. A short pattern for an email address will accept some addresses that are wrong and reject some that are right. Use a regex as a quick first check, and rely on a confirmation email or a proper library for anything important.

For structured data, a pattern is the wrong tool. Do not try to pull values out of JSON or XML with a regex. Format and read them with a proper tool instead, such as <tool_json_formatter>JSON Formatter</tool_json_formatter>, and see our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json>.

## Patterns that can freeze your browser

Some patterns are dangerous. If a pattern has a repetition inside another repetition, and the text almost matches but not quite, the engine can try an enormous number of combinations. This is called catastrophic backtracking. A classic example is a group repeated with a plus sign inside another plus sign.

Such patterns can freeze a page for seconds or minutes. The tool runs matching in a background worker and stops after 1.5 seconds, or after 5,000 matches, so a runaway pattern cannot freeze the page. If you see the warning, make the pattern simpler: remove the nested repetition, be more specific about what may repeat or add an anchor.

The same advice protects your own programs. A pattern that is safe on short test text can still be slow on long input from users.

## Differences between regex flavours

The tool uses JavaScript regular expressions, as built into your browser. Most everyday syntax is the same in Python, PHP, Java and others, but there are differences: some features exist in one language and not another, and the details of escaping and replacements change. When you move a pattern to another language, test it there too.

## Related tasks

Regex also helps with data you copy between tools. <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker> compares the text before and after a replacement, so you can confirm that only the intended lines changed. If your pattern works on links, <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> shows how special characters are written in an address.

Dates and times are another common target. Instead of cutting dates out with patterns, you may find it easier to convert them to numbers. Our guide to <post_unix-timestamps-explained>Unix timestamps</post_unix-timestamps-explained> explains how.

## Common mistakes to avoid

- Forgetting the global flag and wondering why only one match is found.
- Using the dot when you mean a literal dot, which has to be escaped with a backslash.
- Making a pattern greedy when you want the shortest match.
- Using one big pattern when two simple ones are clearer.
- Trusting a short email pattern as a complete validation.
- Testing only on the examples that should match and not on those that should not.

## A quick checklist

1. Write a small test text with matches and non-matches.
2. Build the pattern in small steps and watch the highlights.
3. Check the groups table and the replacement preview.
4. Keep patterns simple and avoid nested repetition.
5. Test the pattern again in the language where you will use it.

:::faq Frequently asked questions
Q: Which regex flavour is used?
A: JavaScript (ECMAScript) regular expressions, as implemented by your browser. PCRE, Python and other flavours differ in some features.

Q: Why does my page freeze on some patterns?
A: Patterns with nested repetition can backtrack catastrophically. Matching runs in a background worker and is stopped after 1.5 seconds, so a runaway pattern cannot freeze the page, but you should still avoid patterns with a repeated group inside another repetition.

Q: How many matches does the tool show?
A: Matching stops after 5,000 matches or 1.5 seconds.

Q: Do I type the slashes around the pattern?
A: No. Enter the pattern without the surrounding slashes and choose the flags separately.

Q: Can I preview a find and replace?
A: Yes. The replacement preview shows the text after the replacement, and you can use captured groups in it.
:::
