---
title: URL Encoding Explained: Percent Signs, Spaces and Symbols
description: Understand why web addresses turn spaces into %20, how component and full URL encoding differ, when a plus sign means a space and how to decode a messy link.
excerpt: A clear guide to URL encoding: what percent encoding is, which characters are reserved, why accented letters become long codes, how to encode a query value and how to fix common link errors.
imageAlt: A web address with special characters being converted into percent codes on a teal background
published: 2026-10-30
publishAt: 2026-10-30T22:15:00+05:00
updated: 2026-10-30
tool: url-encoder-decoder
tools: url-encoder-decoder, html-encoder-decoder, base64-encoder-decoder, qr-code-generator, regex-tester, json-formatter
ctaHeading: Try it yourself
cta: Open <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder>, or browse all of the <all_developer>developer tools</all_developer>.
---

Sooner or later, a web address that you copy shows up with strange codes in it. A space has become %20, a letter with an accent has turned into a string of percent signs and digits, and a link that worked yesterday now returns an error because of a character that should not be there. This is URL encoding, also called percent encoding, and it is the way that addresses carry characters that are not allowed to appear as they are.

This guide explains why it exists, which characters are affected, how the component and full URL modes differ, when a plus sign stands for a space and how to decode a link so that you can read it.

:::takeaways
- A web address can only contain a limited set of characters. Everything else is written as a percent sign followed by two hexadecimal digits.
- A space becomes %20, and a letter such as é becomes %C3%A9 because it is stored as several bytes.
- Use Component mode for a single value, such as a search term, and Full URL mode for a whole address that has to keep its structure.
- In form data, a plus sign can stand for a space. The tool has options for both ways.
- Decoding fails on malformed sequences, such as a lone percent sign.
:::

## Why addresses need encoding

An address has a structure. Slashes separate the parts of a path, a question mark starts the query, ampersands separate values in the query, equals signs join names to values and a hash sign marks a position in the page. Those characters have a job, so they cannot also be used as ordinary text.

Suppose you search for the phrase rock and roll, and the search term goes into a link. A space would end the address in many places, and an ampersand in the term would be read as the start of a new value. To avoid confusion, characters that are not safe are replaced with a percent sign and the code of the character.

The rule is simple: take the character, write its bytes in hexadecimal and put a percent sign in front of each byte.

## Examples

Plain letters, digits and a few symbols such as the hyphen, the underscore, the full stop and the tilde are safe and stay as they are. Everything else is encoded.

- A space becomes %20.
- An ampersand becomes %26.
- An equals sign becomes %3D.
- A slash becomes %2F, when it is encoded at all.
- A letter with an accent such as é becomes %C3%A9, because it takes two bytes in UTF-8.
- A letter from another script, such as an Urdu or Chinese letter, takes three bytes, so it becomes three codes, for example %E4%B8%AD for a Chinese character.
- An emoji takes four bytes.

That is why a short word in Urdu can make a very long address: every letter turns into several codes. The result is correct, even if it looks messy, and browsers show the readable form in the address bar while sending the encoded one.

## Component or full URL

<tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> has two scopes, and choosing the right one is the main decision.

Component mode encodes everything that is not safe, including the characters that give an address its structure. Use it for a single value that goes into a link: a search term, a name, a file name or an email address in a query. The phrase a b&c=d becomes a%20b%26c%3Dd, so that nothing in it can be mistaken for structure.

Full URL mode leaves the structure alone. The slashes, the question mark, the ampersands and the equals signs stay as they are, and only characters that cannot appear anywhere in an address are encoded, such as spaces and non-English letters. Use it when you have a whole address that contains a space or an accent and you want a version that can be pasted safely.

A common mistake is to encode a whole address in component mode. The slashes and the colon become codes, and the address stops working. The opposite mistake is to put a value into a link in full mode, so that an ampersand inside the value splits it in two.

## Plus signs and spaces

There are two conventions for spaces. In a path, a space is %20. In form data, which is what a browser sends when you submit a search form, a space can be written as a plus sign. Both appear in real addresses, which is confusing.

The tool lets you choose. When you encode, there is an option to use a plus sign for spaces, which matches form encoding. When you decode, there is an option to treat a plus sign as a space. If a decoded link shows plus signs where you expected spaces, switch the option on. If it shows spaces where you expected a real plus sign, such as in a phone number, switch it off.

A real plus sign inside a value must be written as %2B, so that it is not read as a space.

## How to encode and decode

The tool works inside your browser tab, so your text stays on your device.

1. Choose Encode or Decode.
2. Choose the scope, Component or Full URL, and the plus sign option if it applies.
3. Paste your text or address.
4. Copy the result.

There is also a button that moves the result into the input, which is handy when you want to check that a round trip returns the original text.

## Decoding a messy link

To read a link that is full of codes, paste it and choose Decode. It turns the codes back into letters, so that you can see the search terms, file names and names that it carries. This is useful when you receive a long tracking link, when you want to check where an address really leads or when an error message shows an encoded address.

Decoding fails if the text contains a malformed sequence, for example a lone percent sign, or a percent sign followed by characters that are not hexadecimal digits. The tool then tells you that the text cannot be decoded. Look for a percent sign that is not part of a code. Often the link was cut off when it was copied.

Be careful with double encoding. If a program encodes text that was already encoded, each percent sign becomes %25, and the result looks like %2520 for a space. If you see %25 everywhere, decode twice and check which step encoded it again.

## Links, codes and pictures

A few related places where encoding matters.

- QR codes. A link inside a QR code should be encoded correctly, since a space or a stray symbol makes the code lead nowhere. Our guide to <post_how-to-create-a-qr-code>creating a QR code</post_how-to-create-a-qr-code> explains how to test a code, and <tool_qr_code_generator>QR Code Generator</tool_qr_code_generator> makes it.
- HTML pages. Inside a page, special characters in text are written differently, as entities such as &amp;. That is a different encoding for a different job, and <tool_html_encoder_decoder>HTML Encoder / Decoder</tool_html_encoder_decoder> handles it. Our guide to <post_how-to-format-and-validate-xml>formatting and validating XML</post_how-to-format-and-validate-xml> shows the same idea in XML.
- Data in text form. Base64 encodes binary data into safe characters, which is another way to carry data in a link or a message. Our guide to <post_what-is-base64-encoding>Base64 encoding</post_what-is-base64-encoding> explains it, and <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> converts text.

## Readable addresses for your own site

If you build a site, choose addresses that need no encoding. Use lowercase letters, digits and hyphens between words, with no spaces or accents. Our guide to <post_how-to-change-text-case-online>changing text case online</post_how-to-change-text-case-online> shows how to turn a title into a hyphenated name in one click. Readable addresses are easier to share, to read aloud and to check.

## Finding encoded text with patterns

To search a long log or a list of links for encoded sequences, you can use a pattern, such as a percent sign followed by two hexadecimal digits. <tool_regex_tester>Regex Tester</tool_regex_tester> lets you try it, and our guide to <post_how-to-test-regular-expressions>testing regular expressions</post_how-to-test-regular-expressions> explains the basics. If the links come inside a data file, <tool_json_formatter>JSON Formatter</tool_json_formatter> makes it readable first.

## Common mistakes to avoid

- Encoding a whole address in component mode and breaking it.
- Putting a value with an ampersand into a link without encoding it.
- Confusing %20 and the plus sign for spaces.
- Encoding something twice and getting %25 in the result.
- Decoding text that contains a lone percent sign.
- Using spaces and accents in the names of your own pages when you can avoid them.

## A quick checklist

1. For one value, use component mode. For a whole address, use full URL mode.
2. Decide whether spaces should be %20 or plus signs.
3. Encode only once.
4. Decode a link to read it before you trust it.
5. Choose simple lowercase addresses for your own pages.

:::faq Frequently asked questions
Q: Component or full URL?
A: Use Component for a single value such as a query parameter. It encodes characters like slash, question mark, ampersand and equals sign. Use Full URL to leave the URL structure intact.

Q: Why does decoding fail?
A: The text probably contains a malformed percent sequence, such as a lone percent sign.

Q: Why does a letter with an accent turn into several codes?
A: Such letters take more than one byte in UTF-8, and each byte is written as a percent sign and two digits.

Q: What is the difference between %20 and a plus sign?
A: Both can stand for a space. %20 is used in paths, and a plus sign is used in form data. The tool has options for both.

Q: How do I write a real plus sign in a value?
A: Write it as %2B, so that it is not read as a space.
:::
