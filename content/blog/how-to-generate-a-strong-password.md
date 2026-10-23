---
title: How to Generate a Strong Password and Actually Remember It
description: What makes a password strong, why length beats complexity, when to use random or name-based passwords and how to store them safely with a manager.
excerpt: Learn how password strength is measured, how long a password should be, the difference between fully random and memorable passwords and how to keep them safe.
imageAlt: A key and a long password field with dots on a teal background
published: 2026-10-23
updated: 2026-10-23
tool: password-generator
tools: password-generator, protect-pdf, uuid-generator, qr-code-generator, base64-encoder-decoder, text-cleaner
ctaHeading: Try it yourself
cta: Open <tool_password_generator>Password Generator</tool_password_generator>, or browse all of the <all_developer>developer tools</all_developer>.
---

Most account breaches do not involve clever hacking. They involve a password that was easy to guess, reused on several sites, or leaked from one site and tried on the others. Choosing a good password is the cheapest security measure there is, and yet it is where most of us take shortcuts, because strong passwords are hard to remember.

This guide explains how password strength works, how long a password should be, when a memorable password is acceptable and when only a fully random one will do, and how to store passwords so you never have to remember them all.

:::takeaways
- Length matters more than complexity. Aim for at least 16 characters for important accounts.
- A password is only as strong as the number of possibilities an attacker would have to try.
- Use fully random passwords for email, banking and your password manager; name-based passwords are for low-risk accounts.
- Never reuse a password. One leak should not open every door.
- Store passwords in a password manager, protected by one very strong password.
:::

## How strength is measured

An attacker who does not know your password has to guess it. Strength is the number of guesses required, and it is usually expressed in bits. Each bit doubles the number of possibilities. A password with 40 bits of strength needs about a trillion guesses on average, while one with 80 bits needs a number so large that guessing is unrealistic with current technology.

Strength depends on two things: how many characters the password has, and how many different symbols each character could be. A random password of 16 characters drawn from letters, digits and symbols has far more possibilities than a short one with the same alphabet, which is why length wins.

Computers make guesses at enormous speed, especially when a leaked list of hashed passwords is attacked offline. A password that survives a casual human guess may still fall in minutes to an automated attack.

## Complexity rules are not the point

Websites love rules: one capital, one digit, one symbol. People satisfy them with predictable patterns, such as a capital letter at the start, a number at the end and an exclamation mark. Attackers know these patterns, so Password1! is weak despite meeting every rule.

What helps is unpredictability and length. A string of four random words is stronger than a short jumble of symbols, and a long random string is stronger still. This is why the guidance from security agencies has shifted from complexity towards length and unique passwords.

## Two styles of generated password

<tool_password_generator>Password Generator</tool_password_generator> offers two styles, because security and memorability pull in different directions.

- Fully random: the maximum strength for its length. You cannot remember it, and that is fine, because a password manager will.
- Name plus word: a more memorable pattern built on names and words, with digits and a symbol. It is easier to type and recall, but weaker, because an attacker who knows how such passwords are built can start from lists of names.

The tool shows the estimated strength in bits, so you can compare. The estimate is based on the number of possible combinations, assuming an attacker who knows how the password was built. It does not use breach databases.

Use name-based passwords for low-risk accounts, such as a forum you rarely visit. For email, banking and the master password of your password manager, use fully random ones. Email is especially important: whoever controls your email can reset almost every other password.

## How to generate a password in your browser

The tool runs inside your browser tab, so the password is created on your device and not sent anywhere.

1. Open the tool and choose a style.
2. Set the length, how many passwords you need and which character types to include.
3. Generate and look at the strength shown.
4. Copy a password and save it in a password manager.

Generated passwords use only four symbols, the at sign, the hash, the dollar sign and the asterisk. They are accepted by almost every website and easy to type on any keyboard. The limited alphabet slightly reduces the strength per character, so a few extra characters of length more than make up for it.

## How long should a password be?

- At least 16 characters for important accounts: email, banking, cloud storage, your password manager.
- 12 to 14 characters for ordinary accounts, if the site limits length.
- As long as the site allows for anything that protects money or identity.

If a website refuses long passwords, it is a sign of poor security practice on their side; use the longest it allows and turn on two-factor authentication.

## Keeping passwords safe

A strong password is useless if it is stored badly. Good habits:

- Use a password manager. It generates, stores and fills passwords, so you only remember one master password. The master password should be long and unique; a passphrase of several random words is a good approach.
- Never reuse a password. If a site is breached, attackers try the same email and password on other sites.
- Turn on two-factor authentication wherever it is offered, especially for email.
- Do not email passwords to yourself or keep them in a notes file on your desktop.
- Change a password when a service reports a breach.
- Do not share a password by chat. Use a sharing feature of the password manager, or a temporary password that the person changes at once.

## Passwords for files

When you protect a file, the same rules apply, and the consequences are worse because there is often no reset. If you encrypt a PDF with <tool_protect_pdf>Protect PDF</tool_protect_pdf>, the file’s strength depends on your password, and if you lose it the file cannot be opened. Our guide to <post_password-protect-and-unlock-a-pdf>protecting and unlocking a PDF</post_password-protect-and-unlock-a-pdf> explains what encryption does and does not enforce. Store the password in your manager at the moment you create it.

## Other things that look like passwords

Not every secret is a password. For identifiers that must be unique but not secret, <tool_uuid_generator>UUID Generator</tool_uuid_generator> makes random identifiers. For a Wi-Fi guest network, generate a strong password and put it into a code with <tool_qr_code_generator>QR Code Generator</tool_qr_code_generator>; our guide to <post_how-to-create-a-qr-code>creating a QR code</post_how-to-create-a-qr-code> explains how and warns about printing secrets in public. Encoding a password with Base64 does not protect it; see <post_what-is-base64-encoding>what is Base64 encoding</post_what-is-base64-encoding> for why encoding is not encryption.

## Common mistakes to avoid

- Reusing one password across sites.
- Choosing a pattern of capital, word, digit and symbol and believing it is strong.
- Using personal details such as birthdays, pet names or phone numbers.
- Storing passwords in a plain text file or in a browser without a master password.
- Forgetting two-factor authentication on the email account.

## A quick checklist

1. Choose fully random passwords for important accounts.
2. Make them at least 16 characters long.
3. Save each one in a password manager the moment you create it.
4. Use a unique password for every account.
5. Turn on two-factor authentication for email and money.

:::faq Frequently asked questions
Q: Is a password like Tesla2026#Tech safe?
A: It is better than a plain word, but weaker than random text. Anyone guessing can start from lists of well-known names, so the real strength comes from the number of possibilities, shown as bits. Use name-based passwords for low-risk accounts and fully random ones for email, banking and password managers.

Q: Why does the generator use only a few symbols?
A: Generated passwords use only the four symbols @ # $ * because they are accepted by almost every website and are easy to type on any keyboard.

Q: How many characters should a password have?
A: At least 16 characters for important accounts. Length matters more than complexity.

Q: Are the passwords stored or sent anywhere?
A: No. They are generated inside your browser and are not stored or sent by the tool. Save the one you use in a password manager.

Q: Does the strength estimate use breach databases?
A: No. It is based on the number of possible combinations, not on lists of leaked passwords.

Q: Should I change my passwords regularly?
A: Change a password when you have reason to think it was exposed, for example after a breach notice. Regular changes of strong, unique passwords add little.
:::
