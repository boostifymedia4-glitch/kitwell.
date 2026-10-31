---
title: How to Change Text Case: Upper, Lower, Title and camelCase
description: Convert text to uppercase, lowercase, title case, sentence case and developer styles such as camelCase, snake_case and kebab-case, and learn which one fits where.
excerpt: A practical guide to changing text case: when to use title or sentence case, how the title case rules treat small words, what the programmer styles are for and how to avoid typical mistakes.
imageAlt: The same sentence shown in several letter cases next to a case switch on a teal background
published: 2026-10-30
publishAt: 2026-10-30T20:30:00+05:00
updated: 2026-10-30
tool: case-converter
tools: case-converter, text-cleaner, word-counter, remove-duplicate-lines, text-sorter, regex-tester
ctaHeading: Try it yourself
cta: Open <tool_case_converter>Case Converter</tool_case_converter>, or browse all of the <all_text>text tools</all_text>.
---

Everyone has typed a line with the caps lock key on, or pasted a headline in capital letters and wished to turn it back. Writers need title case for headings and sentence case for body text. Developers need names in camelCase, snake_case or kebab-case. Retyping all of this by hand is slow and invites mistakes, and a case converter does it in one click.

This guide explains the common case styles, shows which one to choose for which job, describes the rules behind title case and sorts out the habits that cause trouble.

:::takeaways
- Case styles change only capital and small letters, not the words themselves.
- Title case keeps short words such as a, of and the in lowercase unless they start or end the text.
- Sentence case capitalises the first word of a sentence and proper names are not detected automatically.
- camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE are naming styles for programmers.
- Languages without capital letters, such as Urdu, Arabic and Chinese, are not changed by case conversion.
:::

## The case styles

<tool_case_converter>Case Converter</tool_case_converter> offers ten styles. They fall into two groups.

For writing:

- UPPERCASE turns every letter into a capital.
- lowercase turns every letter into a small letter.
- Title Case capitalises the main words of a heading.
- Sentence case capitalises the first letter of each sentence.
- tOGGLE cASE swaps every letter to the opposite case, which is mostly useful to repair text typed with the caps lock key on.

For naming things in code and files:

- camelCase joins words without spaces and capitalises every word except the first, as in theLordOfTheRings.
- PascalCase does the same and also capitalises the first word, as in TheLordOfTheRings.
- snake_case writes small letters with underscores between the words.
- kebab-case writes small letters with hyphens between the words.
- CONSTANT_CASE writes capitals with underscores, which is the usual style for fixed values in many programming languages.

## How to convert text

The tool works inside your browser tab, so your text stays on your device.

1. Paste or type your text.
2. Choose the case you want.
3. Copy the converted result, or download it.

The result appears at once, and you can try another style without pasting the text again. If the text is long, convert it in one go rather than line by line.

## Title case and small words

Title case is the least obvious of the writing styles, because it follows rules. In English headings, the main words are capitalised, while short connecting words stay in lowercase. The converter keeps short words such as a, of and the in lowercase, unless they are the first or last word of the text, which follows common English style.

So the lord of the rings becomes The Lord of the Rings, with of and the in the middle left alone and The at the start capitalised.

Be aware that there is no single rule for title case. Style guides disagree about words such as with, from and between, and about how to treat the word after a colon. The converter follows common English style and may not match your style guide in every case. If you write for a publisher or a school that has its own rules, check the result.

Names and acronyms are another limit. The tool does not know that a word is a brand or a place. A product name written as iPhone or a word like USB can lose its intended capitals, so check them after conversion.

## Sentence case

Sentence case capitalises the first word of each sentence and leaves the rest in lowercase. It is the right choice for body text, for subtitles, for button labels in many modern interfaces and for headings in a plainer style.

It cannot recognise proper names. A name in the middle of a sentence, such as Karachi, becomes lowercase if you convert a whole paragraph from capitals. The fix is to proofread the result and restore names by hand, or to convert only the parts that need it.

## Programmer styles and where they are used

Naming styles exist because most programming languages do not allow spaces in names. Each community has its habits.

- camelCase is common for variables and functions in JavaScript and Java.
- PascalCase is common for class names and components.
- snake_case is common in Python, Ruby and database column names.
- kebab-case is common for file names, web addresses and style sheet classes.
- CONSTANT_CASE is common for settings and fixed values.

The converter turns a phrase typed with spaces into any of these, which is handy when you want to name a file, a column or a function from a sentence. It saves you from pressing the shift key in the right places.

For web addresses, kebab-case is a good habit. Hyphens separate words clearly, and the result is readable and easy to share. Our guide to <post_url-encoding-explained>URL encoding</post_url-encoding-explained> explains what happens to other characters in an address.

## Scripts without capital letters

Case is a feature of some alphabets only. Latin, Greek and Cyrillic have capital letters. Urdu, Arabic, Persian, Hindi, Chinese, Japanese and Korean do not, so converting text in those scripts to uppercase or lowercase changes nothing. Mixed text works as expected: the Latin words in a sentence change, and the rest stays as it is.

## Clean the text first

Text that comes from a PDF, a web page or a chat often has double spaces, odd line breaks and invisible characters. These do not matter for case, but they matter for the next step. <tool_text_cleaner>Text Cleaner</tool_text_cleaner> removes them, and our guide to <post_how-to-extract-text-from-a-pdf>extracting text from a PDF</post_how-to-extract-text-from-a-pdf> shows where such text often comes from.

Two more tools complete a clean-up routine. <tool_remove_duplicate_lines>Remove Duplicate Lines</tool_remove_duplicate_lines> removes repeated lines, and it can ignore case, which is why you often convert a list to one case first. <tool_text_sorter>Text Sorter</tool_text_sorter> puts the list in order. Our guide to <post_how-to-sort-lines-and-remove-duplicates>sorting lines and removing duplicates</post_how-to-sort-lines-and-remove-duplicates> explains how to use them together.

## Find and replace by pattern

When you need to change the case of only some words, a pattern can select them. <tool_regex_tester>Regex Tester</tool_regex_tester> lets you test a pattern against your text before you use it, and our guide to <post_how-to-test-regular-expressions>testing regular expressions</post_how-to-test-regular-expressions> explains the basics.

## Checking length

Changing case does not change the length of a text, but it can change how it looks in a limited space. Capital letters are wider than small ones, so a title in capitals needs more room than the same title in lowercase. If a title must fit into a search result or a box, check it with <tool_word_counter>Word Counter</tool_word_counter> and read our guide to <post_how-to-count-words-and-characters-online>counting words and characters</post_how-to-count-words-and-characters-online>.

## Common mistakes to avoid

- Using all capitals for long text. It is harder to read and feels like shouting.
- Trusting automatic title case for names, brands and acronyms.
- Converting a whole paragraph to sentence case and losing the capital letters of names.
- Using camelCase in file names where a hyphenated name would be clearer.
- Expecting case conversion to change text in scripts without capital letters.
- Forgetting that a style guide may have different rules for small words.

## A quick checklist

1. Decide which style the place where you will use the text requires.
2. Clean the text if it came from a PDF, a page or a chat.
3. Convert, then read the result once from start to end.
4. Restore names, brands and acronyms.
5. Check the length if the text must fit a limited space.

:::faq Frequently asked questions
Q: Does Title Case handle small words?
A: Yes. Short words such as a, of and the stay lowercase unless they start or end the text.

Q: Which case styles are available?
A: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and tOGGLE cASE.

Q: Will it change Urdu or Arabic text?
A: No. These scripts have no capital letters, so case conversion leaves them as they are.

Q: Can it recognise names and brands?
A: No. After converting, check names, brands and acronyms and fix them by hand.

Q: Is title case the same everywhere?
A: No. Title case follows common English style rules and may not suit every style guide.
:::
