---
title: How to Scan a QR Code From an Image or Screenshot Safely
description: Read a QR code from a photo or screenshot, see what it really contains before you open it, and learn how to spot unsafe links and fix codes that will not scan.
excerpt: A practical guide to scanning QR codes from pictures: what the tool shows, how Wi-Fi, email and link codes differ, how to check a link before you open it and what to do when no code is found.
imageAlt: A phone screenshot with a QR code being read and its link shown for checking on a teal background
published: 2026-10-29
updated: 2026-10-29
tool: qr-code-scanner
tools: qr-code-scanner, qr-code-generator, image-cropper, enlarge-image, url-encoder-decoder, password-generator
ctaHeading: Try it yourself
cta: Open <tool_qr_code_scanner>QR Code Scanner</tool_qr_code_scanner>, or browse all of the <all_image>image tools</all_image>.
---

QR codes are printed on posters, parcels, receipts, menus, tickets and bills, and they are sent by email and chat as pictures. Usually you point a phone camera at one. But sometimes the code is already a picture: a screenshot someone sent you, a photo you took earlier or a code on your computer screen. Then you need to read it from the file.

This guide shows how to read QR codes from images in your browser, what the result tells you, how to check a link before you open it and how to deal with codes that will not scan.

:::takeaways
- The scanner reads QR codes from image files, such as photos and screenshots, not from a live camera.
- It shows what the code contains, such as a web link, a Wi-Fi network, an email address, a phone number, an SMS or plain text.
- Only web links that start with http or https can be opened from the tool, and script or data links are never opened.
- Always read the full address before you open a link from a code.
- If no code is found, use a sharper, closer picture that shows the whole code with a clear margin.
:::

## When you need to scan from an image

There are many everyday cases.

- A friend sends a screenshot of a Wi-Fi code, and you want the password.
- A ticket or boarding pass arrives as a PDF or picture, and you want to see what the code contains.
- You photographed a poster earlier and want the link now.
- A code on your own screen, in a web page or a document, cannot be scanned by the same device.
- You want to check what a code contains before you let a phone open it.

In all of these, reading the code from the image is the easiest way, and it lets you look at the content before anything happens.

## How to scan a QR code from an image

The tool works inside your browser tab, so the pictures stay on your device.

1. Open the tool and add one or more images that contain a QR code. Photos and screenshots both work. You can add up to 10 images, each up to 25 MB.
2. The code is read automatically.
3. Read the result, then copy the text or open the link after checking it.

One code is read per image. If an image shows several codes, crop it so that each picture holds one, using <tool_image_cropper>Crop Image</tool_image_cropper>. Standard QR codes are supported. Other barcodes, such as the ones on products, are not.

On a phone, the tool cannot use the camera directly. Take a photo of the code, then choose that photo in the tool, or use your camera app for a live scan.

## What the result tells you

<tool_qr_code_scanner>QR Code Scanner</tool_qr_code_scanner> does not just show raw text. It recognises the type of content and shows it in a clear way.

- A web link, shown in full, with buttons to copy it or open it.
- A Wi-Fi network, with the network name, the security type, whether it is hidden and the password. The password is hidden at first, and you can show or copy it.
- An email address, with the subject and message if the code contains them.
- A phone number or an SMS.
- Plain text.
- A script or data link, which is shown as text only and is never opened from the tool.

This view is the main advantage over scanning with a camera app, which often jumps straight to the action. Here you read first, then decide.

## Check a link before you open it

Links in QR codes can be dangerous, in the same way as links in emails. Criminals stick fake codes over real ones on parking meters, posters and tables, and send codes by email to avoid text filters. A few habits protect you.

1. Read the whole address, not only the beginning. The important part is the domain name, which is the text just before the first single slash.
2. Look for look-alikes: a letter replaced by a similar one, an extra word or a different ending, such as a well-known name followed by something unexpected.
3. Be careful with shortened links. A short link hides the real address. If you must follow one, think about whether you trust the person who gave it to you.
4. Never enter a password, a card number or a code on a page that you reached from an unexpected QR code.
5. For payments, check the name of the recipient in your own payment app before you confirm.

If the address contains long strings of percent signs, it is encoded. <tool_url_encoder_decoder>URL Encoder / Decoder</tool_url_encoder_decoder> decodes the address into readable text so you can see where it really leads.

Only web links that start with http or https can be opened from the scanner, and script or data links are never opened. This removes one kind of trick, but it does not make a link safe. You still decide whether to open it.

## Wi-Fi codes

A Wi-Fi code contains the network name, the security type and the password. When you scan it from an image, you can read the password and type it on a device that cannot scan, such as a laptop or a TV.

A password in a code is visible to anyone who sees the picture. Share Wi-Fi codes only with people you trust, and do not post a picture of a Wi-Fi code with a main network password on social media. If you create such codes yourself, use a separate guest network with its own password. <tool_password_generator>Password Generator</tool_password_generator> makes a strong one, and our guide to <post_how-to-generate-a-strong-password>generating a strong password</post_how-to-generate-a-strong-password> explains how to choose it.

## When no code is found

The message that no code was found usually has a simple cause. Try these in order.

1. Use a sharper picture. A blurred code cannot be read.
2. Make sure the whole code is visible, including the empty border around it, called the quiet zone. Cropped edges stop the scan.
3. Crop away everything except the code. <tool_image_cropper>Crop Image</tool_image_cropper> helps, and our guide to <post_how-to-crop-an-image-to-a-specific-size>cropping an image to a specific size</post_how-to-crop-an-image-to-a-specific-size> explains how.
4. If the code is very small in the picture, enlarge it. <tool_enlarge_image>Enlarge Image</tool_enlarge_image> makes the picture bigger and smoother, although it cannot make a blurred code sharp. Our guide to <post_how-to-enlarge-an-image-without-blur>enlarging an image without blur</post_how-to-enlarge-an-image-without-blur> explains the limits.
5. Check the contrast. A code with light modules on a dark background, a gradient across it or a busy photograph behind it is harder to read.
6. Make sure it really is a QR code. Other barcodes are not supported.

## Making your own codes readable

If you make codes yourself, you can avoid most of these problems. Use dark modules on a light background, keep the border, do not crop the code, print it large enough and test it before you distribute it. <tool_qr_code_generator>QR Code Generator</tool_qr_code_generator> creates static codes for links, text, Wi-Fi, email and phone numbers, and our guide to <post_how-to-create-a-qr-code>creating a QR code</post_how-to-create-a-qr-code> covers size, colours and error correction.

## Keeping a record of scanned codes

If you scan many codes, for example for an event or an inventory, keep the results in a list. Copy each result into one document, then clean the list. Our guide to <post_how-to-sort-lines-and-remove-duplicates>sorting lines and removing duplicates</post_how-to-sort-lines-and-remove-duplicates> shows how to remove repeated entries and sort what is left.

## Common mistakes to avoid

- Opening a link from a code before reading the full address.
- Trusting a code that was stuck on top of another one.
- Scanning a cropped picture that cuts off the border of the code.
- Sharing a picture of a Wi-Fi code for your main network.
- Expecting the tool to read product barcodes.
- Entering passwords on a page that you reached from an unexpected code.

## A quick checklist

1. Add a sharp picture that shows the whole code with its border.
2. Read the result and the type of content.
3. Check the domain name of any link before you open it.
4. Keep Wi-Fi passwords private, and use a guest network for visitors.
5. If nothing is found, crop, enlarge or retake the picture.

:::faq Frequently asked questions
Q: Can it scan with my camera?
A: Not yet. This tool reads QR codes from image files. On a phone, take a photo of the code and choose it here, or use your camera app.

Q: Is it safe to open scanned links?
A: Check the address first. The full link is shown, and only web (http or https) links can be opened from here. Script and data links are never opened.

Q: Why was no code found?
A: The code may be blurry, cropped, too small or low in contrast. Try a sharper, closer image that shows the whole code with a clear margin around it.

Q: How many images can I add?
A: Up to 10 images, 25 MB each, and one code is read per image.

Q: Does it read normal barcodes?
A: No. Only standard QR codes are supported, not other barcodes.
:::
