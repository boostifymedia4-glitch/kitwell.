---
title: Unix Timestamps Explained: Convert Them to Dates and Back
description: Understand Unix timestamps in seconds and milliseconds, convert them to UTC, local time and ISO 8601 dates, and avoid the usual time zone mistakes.
excerpt: What a Unix timestamp is, how to tell seconds from milliseconds, how to read one as a date in any time zone and how to avoid the mistakes that make events appear at the wrong hour.
imageAlt: A clock face next to a long number representing a Unix timestamp on a teal background
published: 2026-10-25
updated: 2026-10-25
tool: timestamp-converter
tools: timestamp-converter, json-formatter, regex-tester, uuid-generator, base64-encoder-decoder, json-validator
ctaHeading: Try it yourself
cta: Open <tool_timestamp_converter>Timestamp Converter</tool_timestamp_converter>, or browse all of the <all_developer>developer tools</all_developer>.
---

If you have ever looked at a log file, a database export or an API response and seen a number like 1700000000 where a date should be, you have met a Unix timestamp. It is one of the most common ways for computers to store a moment in time, and it is short, easy to sort and the same all over the world.

The number is not friendly for people. This guide explains what it means, how to tell whether it counts seconds or milliseconds, how to turn it into a readable date in any time zone and how to avoid the mistakes that place an event at the wrong hour.

:::takeaways
- A Unix timestamp counts the seconds since 1 January 1970 at 00:00 UTC. It does not depend on a time zone.
- Timestamps with 13 or more digits are normally milliseconds, and shorter ones are seconds.
- The same timestamp shows different clock times in different time zones, but it is always the same moment.
- ISO 8601 is the clear way to write a date and time as text, for example 2023-11-14T22:13:20Z.
- Always store and send times in UTC, and convert to local time only when you show them to people.
:::

## What a Unix timestamp is

A Unix timestamp, also called epoch time or POSIX time, is the number of seconds that have passed since a fixed starting point: midnight UTC on 1 January 1970. That starting point is called the epoch. The timestamp 0 is that exact moment, and 86400, the number of seconds in a day, is one day later.

Because it is a single number, a timestamp is easy to store, to compare and to subtract. To know how long something took, subtract the start from the end. To sort events, sort the numbers. There are no months of different lengths, no daylight saving changes and no time zones to worry about.

## Seconds or milliseconds

Many systems count in seconds, and many others, including JavaScript and several databases, count in milliseconds. A timestamp in milliseconds is a thousand times larger.

A simple rule works for dates in the present era. A timestamp of 10 digits, such as 1700000000, is in seconds. A timestamp of 13 digits, such as 1700000000000, is in milliseconds. <tool_timestamp_converter>Timestamp Converter</tool_timestamp_converter> uses this rule automatically: values with 13 or more digits are treated as milliseconds and shorter ones as seconds. You can also choose seconds or milliseconds yourself when the automatic choice is wrong, for example for dates very far in the past or future.

If a date shows up in 1970, you have almost certainly fed milliseconds to something that expects seconds, or the other way round. If a date shows up thousands of years in the future, you have done the opposite.

## Reading a timestamp as a date

The converter turns a timestamp into three readable forms.

1. UTC, the universal reference time.
2. Your local time zone, taken from your device, or any other time zone that you choose from the list.
3. An ISO 8601 text, which is a standard way to write date and time.

As an example, the timestamp 1700000000 is 22:13:20 on 14 November 2023 in UTC. In a time zone five hours ahead of UTC, the same moment is 03:13:20 on 15 November, which is a different day on the calendar. Both are the same instant.

The tool also shows the current Unix time in seconds and milliseconds, which is handy when you need a timestamp for "now" in a test.

## Turning a date into a timestamp

The reverse works too. Pick a date and time, choose the time zone in which you mean it and read the timestamp. The time zone matters: 9 o'clock in one city is not 9 o'clock in another, so the same wall-clock time gives different timestamps.

This is useful when you need to set an expiry time, schedule something through an API or write a query that selects rows between two moments.

## ISO 8601, the clear text format

When a time has to be written as text, use ISO 8601. The date comes first with the year, then the month and the day, followed by a T and the time. A Z at the end means UTC, while an offset such as plus 05:00 shows the distance from UTC.

The order of year, month and day sorts correctly as plain text, and it avoids the confusion between formats such as 03/04/2026, which is the third of April in some countries and the fourth of March in others. Use it in file names, logs and data exchange.

## Time zones and daylight saving

Most mistakes with time come from time zones and daylight saving. A few rules prevent them.

- Store times in UTC or as timestamps, and convert only for display.
- Never store a local time without its zone. A time without a zone is ambiguous, especially during the hour that repeats when clocks go back.
- Use zone names such as Asia/Karachi or Europe/Berlin, not fixed offsets, when you need to show local time, because offsets change with daylight saving.
- Remember that some days have 23 or 25 hours in places that change their clocks.

The converter lets you view the same timestamp in any zone, which makes it a quick way to check what time an event happens for people in another country.

## Limits and the year 2038

Timestamps in JavaScript can describe dates from roughly the year minus 271821 to the year 275760, which is the range this converter supports. That is far more than anyone needs.

Older systems store the timestamp in a 32-bit signed number, which runs out on 19 January 2038 at 03:14:07 UTC. This is called the year 2038 problem. Modern software uses 64-bit numbers, so it is not a concern for new work, but you should know that old databases and embedded devices may still be affected.

## Where you meet timestamps

Timestamps appear in many places:

- API responses and JSON files, where fields such as created and expires hold numbers. <tool_json_formatter>JSON Formatter</tool_json_formatter> makes these files readable, and our guide to <post_how-to-format-and-validate-json>formatting and validating JSON</post_how-to-format-and-validate-json> explains how.
- Log files, where each line begins with a time.
- Login tokens, which often carry an expiry time. If you decode one, <tool_base64_encoder_decoder>Base64 Encoder / Decoder</tool_base64_encoder_decoder> helps you read its parts, and our guide to <post_what-is-base64-encoding>Base64 encoding</post_what-is-base64-encoding> explains why they look the way they do.
- Databases and spreadsheets, where a column of numbers can be read as dates.

If you have to cut timestamps out of a long log, <tool_regex_tester>Regex Tester</tool_regex_tester> helps you build a pattern for them. Timestamps are not the same as unique identifiers: if you need an identifier for a record, <tool_uuid_generator>UUID Generator</tool_uuid_generator> makes random ones.

## Checking your data

When a timestamp field lives inside a JSON file, check the file first. <tool_json_validator>JSON Validator</tool_json_validator> tells you the line and column of any error, so you can fix the file before you hunt for a time problem that is really a syntax problem.

Timestamps also appear in XML feeds and sitemaps, where dates are written as ISO 8601 text. Our guide to <post_how-to-format-and-validate-xml>formatting and validating XML</post_how-to-format-and-validate-xml> shows how to read those files.

Large numbers can cause trouble too. JavaScript stores numbers in a form that loses precision above a very large size, so a timestamp in nanoseconds can lose its last digits when parsed. Keep such values as text if exactness matters.

## Common mistakes to avoid

- Mixing up seconds and milliseconds.
- Storing local times without a time zone.
- Using a fixed offset instead of a zone name for a place that changes its clocks.
- Reading a timestamp on a computer with the wrong time zone and trusting the result.
- Writing dates in an ambiguous format instead of ISO 8601.

## A quick checklist

1. Count the digits: 10 means seconds and 13 means milliseconds.
2. Convert and check UTC first, then the local zone.
3. Write times as ISO 8601 text, with a Z or an offset.
4. Store UTC, and convert only when you show the time.
5. Test with a date near a daylight saving change.

:::faq Frequently asked questions
Q: Seconds or milliseconds?
A: Timestamps with 13 or more digits are treated as milliseconds, shorter ones as seconds. You can override this manually.

Q: What is the range of dates the converter supports?
A: The range of JavaScript dates: roughly years minus 271821 to 275760.

Q: Does a Unix timestamp depend on the time zone?
A: No. It counts seconds since 1970 in UTC. Only the way it is shown depends on the time zone.

Q: What is the year 2038 problem?
A: Systems that store the timestamp in a 32-bit signed number run out on 19 January 2038. Modern systems use 64-bit numbers.

Q: Can I see the current Unix time?
A: Yes. The tool shows the current time in seconds and in milliseconds.
:::
