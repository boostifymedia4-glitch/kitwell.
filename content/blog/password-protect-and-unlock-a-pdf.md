---
title: How to Password-Protect and Unlock a PDF Safely
description: Lock a PDF with AES-256 encryption, choose what readers may do, and unlock a file you own. Learn how passwords and permissions differ and what the limits are.
excerpt: Learn how to protect a PDF with a strong password, how permissions differ from passwords, and how to unlock a file you have the password for.
imageAlt: A PDF document with a padlock being closed, on a teal background
published: 2026-10-15
tool: protect-pdf
tools: protect-pdf, unlock-pdf, password-generator, merge-pdf, sign-pdf, compress-pdf
ctaHeading: Protect your PDF now
cta: Open <tool_protect_pdf>Protect PDF</tool_protect_pdf>, or browse all of the <all_pdf>PDF tools</all_pdf>.
---

Payslips, medical letters, contracts, scans of identity documents: some PDFs should not be readable by whoever happens to find the attachment. A password is the simplest protection there is, and it travels with the file wherever it goes.

This guide explains how to protect a PDF with a password in your browser, how a password differs from permissions such as “no printing”, how to choose a password worth having, and how to remove protection from a file you own.

:::takeaways
- A document password stops anyone without it from opening the PDF; permissions only restrict actions such as printing or copying.
- Protect PDF uses AES-256 encryption, and everything runs in your browser, so the file and the password are not uploaded.
- Choose a long, unique password and share it through a different channel than the file.
- Unlock PDF removes a password only when you provide the correct one; it never guesses passwords.
:::

## Passwords and permissions are different things

A PDF can have two kinds of protection, and people often mix them up:

- A password to open. Without it the file cannot be read at all. This is real protection: the content is encrypted.
- Permissions. The file opens freely, but the reader program is asked not to allow printing, copying text or editing. These restrictions depend on the program obeying them, so treat them as a polite request, not as a lock.

If the content must stay private, you need a password to open. Permissions are for convenience, for example to discourage casual copying of a document you are sharing widely.

## How to protect a PDF in your browser

<tool_protect_pdf>Protect PDF</tool_protect_pdf> runs inside your browser tab. The document is read from your device, encrypted there and returned as a download.

1. Open the tool and add your PDF (up to 100 MB). If it already has a password, unlock it first.
2. Type the password twice to avoid typing mistakes.
3. Choose what readers may do: print, copy or edit.
4. Press Protect and download the encrypted copy.
5. Open the new file and check that it asks for the password before you send it.

Passwords can be up to 127 standard characters, made of letters, digits and symbols.

## Choosing a password that is worth having

Encryption is only as strong as the password. A short or guessable password can be tried automatically at enormous speed, however good the encryption.

- Length beats cleverness. A password of 14 or more characters is far harder to guess than a short one with symbols.
- Do not use names, birthdays, phone numbers or common words on their own.
- Never reuse a password you use elsewhere.
- Use a password manager to store it, instead of writing it in the email that carries the file.

If you want a strong random password, <tool_password_generator>Password Generator</tool_password_generator> creates one in your browser using a cryptographic random source, and does not store or send it.

## How to send a protected PDF safely

The protection is only useful if the password does not travel next to the file. Send the PDF by email and the password by a different channel, such as a phone call or a messaging app. If the recipient needs it later, do not resend both together.

Tell the recipient that they need a reader that supports modern encryption. AES-256 files open in current PDF programs and browsers, but very old readers, from before about 2008, may not open them.

## How to unlock a PDF

If you know the password and want a copy that opens without it, use <tool_unlock_pdf>Unlock PDF</tool_unlock_pdf>:

1. Add the protected PDF.
2. Enter its password if asked. A PDF that only restricts printing or copying needs no password to open.
3. Download the unlocked copy.

It supports standard PDF protection, including RC4 and AES encryption.

## What Unlock PDF cannot do

Be clear about the limits so you do not waste time:

- It does not crack or guess passwords. Without the correct password, a PDF that is encrypted for opening stays closed.
- It does not support certificate-based or rights-managed files.
- If a file carried a digital signature, re-saving it invalidates the signature, because the document has changed.

Unlocking is meant for your own files, for example when you changed your mind about a password or must merge, edit or compress a protected PDF. Always respect the rights of whoever created the document.

## When you need to unlock before another step

Many tools cannot read an encrypted PDF. If you want to join protected files, remove the password first with Unlock PDF, then use <tool_merge_pdf>Merge PDF</tool_merge_pdf>; our guide to <post_how-to-merge-pdf-files>merging PDF files</post_how-to-merge-pdf-files> covers the rest. The same goes for compressing: unlock, compress, and protect again at the end. Our guide to <post_compress-pdf-without-losing-quality>compressing a PDF without losing quality</post_compress-pdf-without-losing-quality> explains the compression step.

The best order for a document you send is: edit, merge or compress first, sign if needed, and protect last. If you need a signature on the document, see <post_sign-a-pdf-without-printing>how to sign a PDF without printing</post_sign-a-pdf-without-printing>, because Sign PDF cannot open a password-protected file.

## Common mistakes

- Sending the password in the same email as the file.
- Using a short, guessable password such as a name plus a year.
- Forgetting the password. There is no recovery: keep it in a password manager.
- Protecting a file and then deleting the unprotected original without checking that the protected one opens.
- Assuming “no copying” permissions stop a determined person. Only a password to open protects the content.

:::faq Frequently asked questions
Q: Is AES-256 encryption secure?
A: AES-256 is a strong, widely used standard. In practice, the password is the weak point, so the strength of your password decides how safe the file is.

Q: Is my PDF or password uploaded when I protect it?
A: No. Protect PDF runs in your browser, so the file and the password stay on your device.

Q: Can I remove a password from a PDF if I forgot it?
A: No. Unlock PDF needs the correct password and does not guess passwords. If you have lost it, the file cannot be opened by this tool.

Q: Why will my protected PDF not open on an old device?
A: AES-256 requires a reasonably modern PDF reader. Very old programs, from before about 2008, may not support it. Use a current browser or reader.

Q: What is the difference between protecting and signing a PDF?
A: Protecting controls who can open or use the file. Signing places a signature on it. They are separate steps, and signing is best done before you protect the file.
:::
