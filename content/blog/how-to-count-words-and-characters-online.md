---
title: How to Count Words and Characters and Check Length Limits
description: Count words, characters, bytes and reading time, and check your text against limits for page titles, meta descriptions, social posts and SMS messages.
excerpt: Learn how word and character counts really work, why emoji and bytes change the totals, and how to keep titles, meta descriptions, posts and text messages inside their limits.
imageAlt: A text document with a counter showing words and characters on a teal background
published: 2026-10-25
updated: 2026-10-25
tool: word-counter
tools: word-counter, character-counter, text-cleaner, case-converter, remove-duplicate-lines, text-diff-checker
ctaHeading: Try it yourself
cta: Open <tool_word_counter>Word Counter</tool_word_counter>, or browse all of the <all_text>text tools</all_text>.
---

Almost every piece of writing has a number attached to it. A school essay must be 800 words. A page title should fit in the search results. A post on a social network stops at a fixed number of characters, and a text message is split into several parts when it grows too long. Counting by hand is slow and unreliable, and the counts that different programs show do not always agree.

This guide explains how words and characters are counted, why the totals sometimes differ, which limits are worth knowing and how to check your text in your browser before you publish or send it.

:::takeaways
- A word is a run of characters separated by spaces or line breaks. Hyphenated words count as one.
- Characters, characters without spaces and bytes are three different numbers. Emoji and non-Latin letters use more bytes than plain letters.
- Reading time uses about 238 words per minute and speaking time about 150 words per minute.
- Length limits for titles, descriptions and posts are guidelines that platforms change, so check the current rule.
- Clean pasted text first, because invisible characters and extra spaces can change a count.
:::

## Why counts matter

Word counts decide whether an assignment is accepted, whether an article fits its slot and whether a translation is priced fairly. Character counts decide whether a headline is cut off with three dots, whether a meta description shows in full and whether a message fits in one SMS.

Counting also helps you write better. A paragraph of 200 words is easy to read; one of 600 words probably needs to be split. A page title that is far too long loses its ending in search results, and a title that is too short wastes space that could carry a useful keyword.

## How words are counted

<tool_word_counter>Word Counter</tool_word_counter> follows the rule that most programs use: a word is any run of characters separated by whitespace, meaning spaces, tabs and line breaks. This has a few consequences.

- A hyphenated word such as well-known counts as one word.
- A number such as 2026 counts as one word.
- Two words joined by a slash, such as and/or, count as one word because there is no space between them.
- A dash with spaces around it counts as a word of its own, because it is separated by whitespace.

Other tools may use slightly different rules. A word processor might treat a dash with spaces differently, and a database might split on punctuation. If an editor, a client or a school gives you a limit, count with the same program they use, and keep a small margin.

## Characters, characters without spaces and bytes

A character count looks simple, but there are three useful versions of it.

1. Characters, which includes spaces and punctuation. This is the number most platforms use for their limits.
2. Characters without spaces, which some translation and writing jobs use.
3. Bytes, which is the amount of storage the text needs when saved as UTF-8.

For plain English letters, one character is one byte. Letters with accents, Arabic, Chinese and Urdu letters and emoji need two, three or four bytes each. That is why a short message full of emoji can be small in characters and still large in bytes.

<tool_character_counter>Character Counter</tool_character_counter> shows all of these, plus the number of lines. It counts what you see, so an emoji counts as one character even though it is made of several pieces behind the scenes.

## Reading time and speaking time

A word count is more useful when it is turned into time. The word counter estimates reading time at about 238 words per minute and speaking time at about 150 words per minute. These are typical averages for adults, not rules.

Use reading time to decide whether an article will feel short or long. Use speaking time to plan a talk or a video script: a five-minute video needs roughly 750 words, and a ten-minute talk about 1,500. Read the script aloud once and time yourself, because pauses, slides and questions change the real figure.

## Length limits worth knowing

The character counter has bars for common limits, so you can see at a glance whether your text fits. The usual guideline values are:

- A page title in search results: about 60 characters.
- A meta description: about 160 characters.
- A post on X: 280 characters.
- A single SMS in the basic GSM-7 alphabet: 160 characters.
- An Instagram caption: 2,200 characters.

Treat these as guidelines. Search engines cut titles and descriptions by pixel width, not by character count, so a title with many wide letters is cut sooner than one with narrow letters. Platforms also change their limits from time to time. When a limit really matters, look up the current rule and leave a few characters of margin.

SMS has an extra detail. The 160-character figure applies only to messages that use the basic alphabet. If a message contains emoji or letters outside that alphabet, the limit per message drops, and a long message is split into several parts that are billed separately.

## Clean the text before you count it

Text copied from web pages, PDFs and chat apps often carries extras: double spaces, empty lines, curly quotes and invisible characters such as zero-width spaces. Some of these change the count, and some break code or comparisons later.

<tool_text_cleaner>Text Cleaner</tool_text_cleaner> removes them. You can trim spaces at the start and end of lines, collapse repeated spaces, remove invisible characters, delete empty lines, join lines into one paragraph, replace curly quotes with straight ones and strip HTML tags. Tick the options you need and copy the result. If the text came from a scanned document, run it through <post_ocr-scanned-pdf-searchable>OCR</post_ocr-scanned-pdf-searchable> first, because a scan has no text to count until it is recognised.

When the same cleanup has to be repeated on many lines, a pattern does the job faster than clicking options. Our guide to <post_how-to-test-regular-expressions>testing regular expressions</post_how-to-test-regular-expressions> shows how to find and replace text by pattern.

## Fix the case and remove repeats

Two more small tools save time when you prepare text for publishing. <tool_case_converter>Case Converter</tool_case_converter> changes a headline to title case, sentence case or capitals in one click, and it also produces camel case, snake case and kebab case for developers. Title case keeps short words such as of and the in lowercase unless they start or end the text, which follows common English style.

<tool_remove_duplicate_lines>Remove Duplicate Lines</tool_remove_duplicate_lines> is useful for keyword lists, email lists and any list where the same item appears twice. It keeps the first copy of every line and preserves your order. You can choose to ignore case and whitespace, and to drop empty lines.

## Compare two versions of a text

When an editor sends back a changed draft, the quickest way to see what changed is a comparison. <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker> shows added and removed lines, or added and removed words in word mode, which suits prose. Paste the original on one side and the new version on the other. Our guide to <post_how-to-compare-two-pdf-files>comparing two PDF files</post_how-to-compare-two-pdf-files> covers the same idea for documents that are not plain text.

After a comparison you can count both versions and see how much longer or shorter the new one is.

## Languages written without spaces

The word rule depends on spaces, so it does not suit every language. Chinese and Japanese are written without spaces between words, so a whole sentence counts as one long run. For these languages, the number of characters is the more useful figure, and it is also the figure that translators and platforms usually use.

Urdu, Arabic and Persian use spaces between words, so word counts work, but the shape of letters changes with their position in a word. The tools count the letters you see, not the different forms of each letter.

## Common mistakes to avoid

- Counting with a different tool than the one your client uses.
- Forgetting that spaces count as characters in most limits.
- Pasting text with hidden characters and trusting the number without cleaning it.
- Writing a meta description right up to the limit, then finding that it is cut off on some screens.
- Using the SMS limit for messages that contain emoji.
- Counting a text that still contains the headings, captions and notes that the limit does not cover.

## A quick checklist

1. Paste your text into the counter and read words, characters and bytes.
2. Clean the text if it came from a web page or a PDF.
3. Check the limit bar for the place where the text will be used.
4. Leave a small margin below the limit.
5. Read the text aloud once to check the time and the flow.

:::faq Frequently asked questions
Q: How are words counted?
A: A word is any run of characters separated by whitespace. Hyphenated words count as one, and numbers count as words.

Q: Are emoji counted as one character?
A: Yes. The character counter counts visible characters, so an emoji counts as one even though it uses several bytes.

Q: How is reading time calculated?
A: Reading time assumes 238 words per minute and speaking time 150 words per minute, which are typical averages for adults.

Q: Why do my SMS limits differ?
A: SMS length depends on the encoding. Messages with non-Latin characters or emoji use a shorter limit than the 160-character reference shown in the tool.

Q: Can I count Chinese or Japanese text?
A: Yes, but the word count will show one word per run of text, because these languages are written without spaces. Use the character count instead.
:::
