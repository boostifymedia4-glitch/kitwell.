---
title: How to Create a QR Code for Links, Wi-Fi, Email and Text
description: Make static QR codes for links, Wi-Fi, email and phone numbers, choose size, colours and error correction, and test them before printing.
excerpt: A practical guide to QR codes: what static codes are, how to pick error correction, which colours scan best, how large to print them and how to avoid unreadable codes.
imageAlt: A QR code on a card being scanned by a phone on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: qr-code-generator
tools: qr-code-generator, qr-code-scanner, password-generator, url-encoder-decoder, image-compressor, image-to-base64
ctaHeading: Try it yourself
cta: Open <tool_qr_code_generator>QR Code Generator</tool_qr_code_generator>, or browse all of the <all_developer>developer tools</all_developer>.
---

A QR code is the quickest way to move something from paper or a screen into a phone: a menu link on a restaurant table, Wi-Fi details on a guest card, a website address on a poster, a phone number on a business card. People point the camera, tap the notification and they are there, without typing.

Making one is easy; making one that scans reliably is the part that needs a little care. This guide explains what a QR code contains, how to choose size, colours and error correction, how to create codes for different purposes and how to test them before they are printed.

:::takeaways
- A static QR code stores its data in the pattern itself. It never expires and nothing is tracked.
- Keep the content short. Long text makes a dense code that is hard to scan.
- Dark-on-light colours with strong contrast scan best.
- Medium error correction suits most uses; choose higher levels for codes that may get dirty or damaged.
- Always test the printed code with at least two phones before you distribute it.
:::

## What is inside a QR code

A QR code is a square pattern of dark and light modules. The pattern encodes a string of characters, plus extra data used to repair errors. When your phone scans it, it decodes the string and decides what to do: open a link, join a Wi-Fi network, start an email or show text.

A static code carries its data directly. There is no company in between, no redirect, no counter and no expiry date. If you print it today, it works as long as the data is valid. A dynamic code, which many paid services sell, points to a short address on their server so the destination can change and scans can be counted; that is a different product, and it stops working when the subscription ends. Static codes made here are the opposite: permanent and untracked.

## What you can encode

<tool_qr_code_generator>QR Code Generator</tool_qr_code_generator> offers common types:

- A link, so scanning opens a web page.
- Plain text.
- Wi-Fi details, so guests can join a network without typing the password.
- An email address with an optional subject and message.
- A phone number, so scanning starts a call.

For links, use the full address including https://. If the address contains unusual characters, <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> helps you check the encoding. Keep the address short: a short link makes a simpler code that scans from further away.

If the code contains a Wi-Fi password, remember that anybody who sees the printed code can read it. For a guest network that is fine, but never print the password of your main network in a public place. Use <tool_password_generator>Password Generator</tool_password_generator> to make a strong password for a separate guest network; our guide to <post_how-to-generate-a-strong-password>generating a strong password</post_how-to-generate-a-strong-password> explains how long it should be.

## How to create a code in your browser

The tool runs inside your browser tab, so what you type stays on your device.

1. Open the tool and choose what the code should contain.
2. Fill in the details.
3. Adjust the size, colours and error correction if you wish.
4. Download the PNG or SVG.
5. Test it with your phone before printing.

PNG is a picture with a fixed size, fine for screens and small prints (<post_jpg-vs-png-vs-webp>JPG, PNG and WebP</post_jpg-vs-png-vs-webp> compares picture formats). SVG is a vector file that scales without any blur, so choose SVG for posters, signs and anything printed large.

## Size and quiet zone

A code that is too small cannot be read. As a rule of thumb, a code should be at least about 2 by 2 centimetres on paper, and larger when people scan from a distance: the scanning distance should be about ten times the width of the code. A poster read from two metres needs a code about 20 centimetres wide.

Leave an empty border around the code, called the quiet zone, of at least four modules. Do not place text or pictures against the code, and do not crop it. Scanners use the border to find the edges.

## Colours and contrast

Scanners look for the difference between dark and light modules. The best choice is black on white, and any dark colour on a light background works. Problems appear when:

- The light colour is not light enough, or the dark colour is not dark enough.
- The colours are inverted, so the modules are light on a dark background. Many phones read this, but not all scanners do.
- A busy photograph sits behind the code.
- A gradient crosses the code and changes contrast from one corner to another.

If you use brand colours, check the contrast and test with several phones.

## Error correction

QR codes include redundancy so they can be read even when part of them is damaged or hidden. You can choose how much:

- Low and Medium keep the code simple and are fine for clean screens and paper.
- Quartile and High allow for dirt, wear or a small logo in the centre, but they make the code denser, which means it needs more space to remain readable.

Medium suits most uses. Choose Quartile or High if the code will be on a sticker outdoors, on a product or on a surface that gets scratched. Higher levels make the code denser and harder to scan at small sizes, so enlarge the print if you raise the level.

## Testing before printing

Testing takes two minutes and saves reprints:

1. Scan the code from your screen with the phone’s camera, not only with the app that made it.
2. Scan the printed proof from the real distance it will be used at.
3. Try an iPhone and an Android phone, and a cheaper older model if you can.
4. Check that the result is what you intended, for example that the link opens and goes to the right page.
5. Try in poor light.

You can also check a code with <tool_qr_code_scanner>QR Code Scanner</tool_qr_code_scanner>, which reads a picture of a code and shows its content.

## Safety for people who scan

Treat codes you find in public with the same caution as links in email. Criminals paste fake codes over genuine ones on parking meters and posters. If you put codes in public places, make them hard to cover, and tell people what they link to. If you scan one, look at the address your phone shows before you tap.

## Common mistakes to avoid

- Encoding long text and getting a dense code that nobody can scan.
- Printing too small, or cropping the quiet zone.
- Low contrast or inverted colours.
- Never testing the printed code.
- Putting a private Wi-Fi password in a public place.

## A quick checklist

1. Keep the content short and complete, with https:// for links.
2. Use dark on light colours with strong contrast.
3. Choose Medium error correction unless the code will be damaged.
4. Use SVG for large prints and leave a border around the code.
5. Test the printed code with two phones.

:::faq Frequently asked questions
Q: Do the codes expire?
A: No. These are static codes: the data is stored in the code itself, so they work forever and nothing is tracked.

Q: Which error-correction level should I choose?
A: Medium suits most uses. Choose Quartile or High if the code may get dirty or damaged, but higher levels make the code denser and harder to scan at small sizes.

Q: Can I use the codes commercially?
A: Yes. The QR code standard is open, and codes made here carry no fees, watermarks or tracking from us.

Q: Should I download PNG or SVG?
A: PNG is fine for screens and small prints. Choose SVG for large prints, because it scales without blur.

Q: Can I track how many people scan my code?
A: No. These are static codes without scan tracking.

Q: Is my data uploaded?
A: No. The code is created inside your browser, so what you type stays on your device.
:::
