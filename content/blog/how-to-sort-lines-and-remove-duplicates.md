---
title: How to Sort Lines and Remove Duplicates From Any List
description: Sort a list A to Z, by number or by length, shuffle it, and remove repeated lines while keeping your order. A clear guide for email lists, keywords and data.
excerpt: Learn how to sort lines alphabetically, numerically, naturally or by length, how to remove duplicate lines without losing order, and how to clean a list before you use it.
imageAlt: A list of lines being sorted and merged into one clean list on a teal background
published: 2026-10-29
updated: 2026-10-29
tool: text-sorter
tools: text-sorter, remove-duplicate-lines, case-converter, text-cleaner, word-counter, text-diff-checker
ctaHeading: Try it yourself
cta: Open <tool_text_sorter>Text Sorter</tool_text_sorter>, or browse all of the <all_text>text tools</all_text>.
---

Lists are everywhere: a column of email addresses, a set of keywords, product names pasted from a spreadsheet, a to-do list, a folder of file names, a stack of links collected from many places. Left alone, they are messy. The same item appears twice, the order makes no sense and a few lines are empty. Cleaning a list by hand is slow, and a long list makes mistakes almost certain.

This guide shows how to sort a list in several ways, how to remove repeated lines without disturbing the order, and how to prepare a list so that the result is correct and ready to use.

:::takeaways
- You can sort lines alphabetically, in reverse, by the first number in a line, by line length, in reverse order or at random.
- Natural order puts item2 before item10, which is what people expect.
- Removing duplicates keeps the first copy of each line and preserves your order.
- Decide first whether capital letters and extra spaces should count as differences.
- Clean empty lines and stray spaces before you sort, so they do not end up at the top of the list.
:::

## Why sorting and de-duplicating matter

A sorted list is easier to read, easier to check and easier to compare with another list. If you want to know whether a name is on a list of two hundred, a sorted list lets you find it in seconds. A list without repeats is also the right input for many jobs: a mailing list should not send the same person two messages, a keyword list should not count a word twice and a list of links should not contain the same page five times.

The same ideas apply to files and data. A sorted list of file names shows which files are missing, and a list without repeats shows how many different items you really have.

## Ways to sort

<tool_text_sorter>Text Sorter</tool_text_sorter> offers several methods. Each is useful in a different situation.

1. Alphabetical, A to Z, which is the usual choice for names and words.
2. Reverse alphabetical, Z to A.
3. Numeric, which sorts by the first number found in each line. It suits lines such as prices, scores or ranks.
4. By line length, shortest first, which is handy for spotting very short or very long entries.
5. Reverse current order, which simply flips the list upside down.
6. Shuffle randomly, which is useful for drawing names, mixing quiz questions or testing.

Choose the method, and the sorted list appears below your input, ready to copy.

## Natural order, case and empty lines

Three options change how the sort behaves.

- Natural order compares numbers inside text by their value. A plain alphabetical sort puts item10 before item2, because the character 1 comes before 2. Natural order puts item2 before item10, the way a person would count. Use it for file names, chapters, versions and anything with numbers inside.
- Ignore case treats capital and small letters as the same, so Apple and apple sort together. Without it, many systems put all capital letters before small letters.
- Remove empty lines drops blank lines, so they do not collect at the start of the result.

Alphabetical sorting follows your browser's locale rules, which means that letters with accents are placed according to your language settings. If you need a strict order for a program, test a few lines with accents to check the result.

## How to sort a list

The tool works inside your browser tab, so your list stays on your device.

1. Paste your list with one item per line.
2. Choose the sort method.
3. Tick the options you need: ignore case, natural order and remove empty lines.
4. Copy the sorted list, or download it.

If the order is not what you expected, change one option at a time. The most common surprise is numbers sorted as text, which natural order fixes.

## Removing duplicate lines

<tool_remove_duplicate_lines>Remove Duplicate Lines</tool_remove_duplicate_lines> removes repeated lines and keeps your original order. The first copy of every line stays, and later copies are removed. That is different from sorting, where repeated lines would simply sit next to each other. Keeping the order matters when the position of a line carries meaning, such as a ranked list or a list in the order of importance.

The tool shows how many lines were kept and how many duplicates were removed, so you can check the result against what you expected. It has three options:

- Ignore case, so that Apple and apple count as the same line.
- Trim whitespace, so that a line with a space at the end counts the same as one without.
- Remove empty lines.

Without these options, lines that look the same to a person can differ for the computer. The most common cause is a space at the end of a line, which you cannot see.

## Clean first, then sort

Lists copied from emails, web pages and spreadsheets often carry extras: double spaces, empty lines, curly quotes and invisible characters. These make two identical items look different, and they spoil sorting. <tool_text_cleaner>Text Cleaner</tool_text_cleaner> removes them with a few tick boxes: it trims spaces, collapses repeated spaces, removes invisible characters and deletes empty lines.

A good order of work is:

1. Clean the text.
2. Remove duplicates, with ignore case and trim whitespace switched on.
3. Sort the result.
4. Count the lines, and compare with the number you expected.

If your list mixes capital and small letters in a messy way, <tool_case_converter>Case Converter</tool_case_converter> can put every line into the same case before you compare them. For counting lines, words and characters, see our guide to <post_how-to-count-words-and-characters-online>counting words and characters</post_how-to-count-words-and-characters-online>.

## Compare two lists

A common task is to find out what changed between two versions of a list: which names were added, and which were removed. Sort both lists in the same way, then paste them into <tool_text_diff_checker>Text Diff Checker</tool_text_diff_checker>. Sorting first matters, because a comparison goes line by line, and two lists in a different order look completely different even if they hold the same items.

For lists that are too irregular to clean with options alone, a pattern can do the job. Our guide to <post_how-to-test-regular-expressions>testing regular expressions</post_how-to-test-regular-expressions> shows how to find and replace lines by pattern.

## Lists of identifiers and links

Two kinds of lists need extra care.

- Lists of random identifiers, such as the ones made by a UUID generator, rarely contain repeats, but sorting them makes it easy to spot a mistake and to compare two exports. Our guide to <post_what-is-a-uuid-and-how-to-generate-one>UUIDs</post_what-is-a-uuid-and-how-to-generate-one> explains what they are.
- Lists of web addresses often repeat the same page with and without a trailing slash, or with different tracking parts. Decide what counts as the same address, normalise the list and then remove duplicates.

## Common mistakes to avoid

- Sorting before removing empty lines and stray spaces.
- Forgetting that numbers sort as text unless you choose numeric or natural order.
- Removing duplicates with case-sensitive matching when you wanted them treated as the same.
- Sorting a list whose order carries meaning, such as a ranked list, and losing the original order. Keep a copy.
- Comparing two lists that are sorted differently.

## A quick checklist

1. Keep a copy of the original list.
2. Clean the text: spaces, empty lines and invisible characters.
3. Remove duplicates, choosing whether case and spaces count.
4. Sort with the method that fits: alphabetical, natural, numeric or by length.
5. Count the lines and check the result.

:::faq Frequently asked questions
Q: What is natural sorting?
A: Natural sorting compares embedded numbers by value, so item2 comes before item10.

Q: Which copy of a duplicate is kept?
A: The first occurrence is kept and later ones are removed, so your original order is preserved.

Q: Can I sort by number?
A: Yes. The numeric method sorts by the first number found in each line.

Q: Does sorting use my language rules?
A: Alphabetical sorting uses your browser's locale rules, so letters with accents follow your language settings.

Q: Can I shuffle a list?
A: Yes. Choose shuffle randomly, and use shuffle again if you want a new order.
:::
