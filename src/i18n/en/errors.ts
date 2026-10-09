/** Messages thrown by the libraries in src/lib (shown to people when a file or setting is not valid). Keys are `<area>.<name>`; values are the English source text. */
export const errors = {
  // Generic
  'err.generic': 'Something went wrong. Please try again.',
  'err.unknown': 'unknown error',

  // File validation
  'err.files.limit': 'Limit of {max} files reached.',
  'err.files.unsupportedType': 'Unsupported file type. Accepted: {types}.',
  'err.files.empty': 'The file is empty.',
  'err.files.tooLarge': 'Too large ({size}). Maximum is {max}.',
  'err.files.onlyOne': 'Only one file can be used at a time.',

  // JSON
  'err.json.badUnicode': 'Invalid unicode escape',
  'err.json.badEscape': 'Invalid escape sequence in string',
  'err.json.controlChar': 'Unescaped control character in string (use \\n for line breaks)',
  'err.json.unterminatedString': 'Unterminated string',
  'err.json.invalidNumber': 'Invalid number',
  'err.json.unexpectedEnd': 'Unexpected end of JSON',
  'err.json.trailingComma': 'Trailing comma is not allowed in JSON',
  'err.json.propertyName': 'Expected a property name in double quotes',
  'err.json.doubleQuotes': 'Strings must use double quotes',
  'err.json.unexpectedChar': 'Unexpected character "{char}"',
  'err.json.trailingContent': 'Unexpected content after the end of the JSON value',
  'err.json.empty': 'Enter some JSON to continue.',
  'err.json.invalid': 'Invalid JSON',

  // XML
  'err.xml.empty': 'Enter some XML to continue.',
  'err.xml.unterminatedComment': 'Unterminated comment',
  'err.xml.unterminatedPi': 'Unterminated processing instruction',
  'err.xml.unterminatedDeclaration': 'Unterminated declaration',
  'err.xml.unterminatedAttribute': 'Unterminated attribute value',
  'err.xml.unterminatedTag': 'Unterminated tag',
  'err.xml.unexpectedClosing': 'Unexpected closing tag </{name}>',
  'err.xml.mismatched': 'Mismatched closing tag: expected </{expected}> but found </{found}>',
  'err.xml.invalidTagName': 'Invalid tag name "{name}"',
  'err.xml.unclosedTag': 'Unclosed tag <{name}>',
  'err.xml.noElement': 'No XML element found',
  'err.xml.singleRoot': 'An XML document must have a single root element',
  'err.xml.strayText': 'Text is not allowed outside the root element',

  // Developer tools
  'err.dev.malformedPercent': 'The text contains a malformed percent sequence (for example a "%" not followed by two hex digits).',
  'err.dev.badBase64': 'This is not valid Base64. Check for missing, extra or unsupported characters.',
  'err.dev.notUtf8': 'The decoded data is not valid UTF-8 text. It may be binary data such as an image.',
  'err.dev.noCharType': 'Select at least one character type.',
  'err.dev.timestampFormat': 'Enter a number of seconds or milliseconds since 1970-01-01 UTC.',
  'err.dev.timestampRange': 'That timestamp is outside the supported date range.',
  'err.regex.invalid': 'Invalid regular expression',
  'err.regex.timeout': 'This pattern took too long to run and was stopped. It may cause catastrophic backtracking (for example nested repetition like (a+)+).',

  // GIF
  'err.gif.noImages': 'Add at least one image.',
  'err.gif.tooManyFrames': 'A GIF can have at most {max} frames.',
  'err.gif.sizeNotInteger': 'The GIF size must be a whole number of pixels.',
  'err.gif.tooLarge': 'The GIF is too large.',
  'err.gif.tooLargeToBuild': 'This GIF would be too large for your browser to build. Use a smaller size or fewer frames.',
  'err.gif.colours': 'Choose 16, 32, 64, 128 or 256 colours.',
  'err.gif.frameMismatch': 'A frame does not match the GIF size.',
  'err.gif.notGif': 'Not a GIF file.',
  'err.gif.damaged': 'The GIF data is damaged.',
  'err.gif.incomplete': 'The GIF data is incomplete.',

  // Images
  'err.image.processingFailed': 'Processing failed.',
  'err.image.noCanvas': 'Could not create a drawing surface. The image may be too large for this device.',
  'err.image.resultTooBig': 'The result would be {width} × {height} px, which is larger than this browser tool can safely create (max {max} px per side).',
  'err.image.watermarkTooSmall': 'The watermark is too small to tile. Use a larger size or a single mark.',
  'err.image.notLarger': 'Choose a size larger than the original. Use the Image Resizer to make images smaller.',
  'err.image.notSvg': 'This file does not look like an SVG image.',
  'err.image.svgFailed': 'This SVG could not be drawn. It may be invalid or use features browsers do not support.',
  'err.image.encodeFailed': 'The browser could not encode this image.',
  'err.image.formatUnsupported': 'Your browser cannot save {format} images. Try a different output format or a current version of Chrome, Edge or Firefox.',
  'err.image.unreadable': 'This file could not be read as an image. It may be corrupted or in an unsupported format.',

  // OCR
  'err.ocr.engineStart': 'The OCR engine could not be started. Reload the page and try again; if it keeps failing, your browser may not support WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Choose uppercase letters, lowercase letters, or both.',
  'err.passwords.length': 'Choose a length between {min} and {max}.',
  'err.passwords.chooseCategory': 'Choose at least one word category.',
  'err.passwords.cannotBuild': 'A name-based password could not be built with these settings. Try a different length or turn numbers or symbols on.',

  // QR codes
  'err.qr.noText': 'Enter some text or a link first.',
  'err.qr.tooMuchData': 'That is too much data for a QR code at this error-correction level. Shorten the text or choose a lower level.',
  'err.qr.badColours': 'Choose valid colours.',
  'err.qr.wifiName': 'Enter the network name.',
  'err.qr.wifiPassword': 'Enter the Wi-Fi password, or choose “No password”.',
  'err.qr.email': 'Enter a valid email address.',
  'err.qr.phone': 'Enter a phone number using digits, with an optional leading +.',
  'err.qr.unreadableImage': 'Could not read this image. It may be too large for this device.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Only one PDF can be used at a time.',
  'err.pdf.unreadable': 'This file could not be read as a PDF. It may be corrupted or not a PDF at all.',
  'err.pdf.passwordProtected': 'This PDF is password-protected. Remove the password with our Unlock PDF tool first, then try again.',
  'err.pdf.pageMissing': 'Page {page} does not exist in this document.',
  'err.pdf.noCanvas': 'Your browser could not create a drawing surface for this page.',
  'err.pdf.encodePage': 'The browser could not encode this page as an image.',
  'err.pdf.encodePageImage': 'The browser could not encode a page image.',
  'err.pdf.renderTooLarge': 'This page is too large to render at the chosen resolution. Try a lower DPI.',
  'err.pdf.previewTooLarge': 'This page is too large to preview.',
  'err.pdf.flattenTooLarge': 'A page is too large to process at this quality. Choose a lower quality setting.',
  'err.pdf.compareSize': 'Both images must have the same size.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Add at least two PDF files to merge.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'File {n}',
  'err.pdf.selectPage': 'Select at least one page.',
  'err.pdf.selectedPageMissing': 'A selected page does not exist in this PDF.',
  'err.pdf.enterPages': 'Enter the pages you want, for example 1-3, 5.',
  'err.pdf.enterRanges': 'Enter the ranges for each output file, for example 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" is not a valid page or range.',
  'err.pdf.rangeOutside.one': '"{token}" is outside this document, which has {count} page.',
  'err.pdf.rangeOutside.other': '"{token}" is outside this document, which has {count} pages.',
  'err.pdf.rangeBackwards': '"{token}" is backwards. Write ranges from low to high, like {example}.',
  'err.pdf.noImages': 'Add at least one image.',
  'err.pdf.imageEmbed': 'One of the images could not be embedded. It may be corrupted or use an unsupported variant.',

  // PDF: editing
  'err.pdf.latinOnly': 'Only Latin letters, digits and common symbols can be used here, because PDF’s built-in fonts do not include other alphabets.',
  'err.pdf.badColour': 'Choose a valid colour.',
  'err.pdf.badPages': 'Choose valid pages.',
  'err.pdf.numberFirst': 'The first page to number must be between 1 and {count}.',
  'err.pdf.numberLast': 'The last page to number must be between {from} and {count}.',
  'err.pdf.numberStart': 'Start numbering at a whole number from 0 to 99,999.',
  'err.pdf.fontSize72': 'Font size must be between 6 and 72.',
  'err.pdf.fontSize300': 'Font size must be between 6 and 300.',
  'err.pdf.margin': 'Margin must be between 0 and 200.',
  'err.pdf.opacity': 'Opacity must be between 5% and 100%.',
  'err.pdf.angle': 'Angle must be between -180 and 180 degrees.',
  'err.pdf.watermarkText': 'Enter the watermark text.',
  'err.pdf.watermarkLength': 'Watermark text can be at most 100 characters.',
  'err.pdf.imageScale': 'Image size must be between 5% and 100% of the page width.',
  'err.pdf.watermarkImage': 'The watermark image could not be read. Use a valid PNG or JPG file.',
  'err.pdf.watermarkTile': 'The watermark is too small to tile. Use a larger size or the centred layout.',
  'err.pdf.cropOutside': 'Choose a crop area inside the page.',
  'err.pdf.cropSmall': 'The crop area is too small on page {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Enter a password.',
  'err.pdf.passwordLength': 'The password can be at most 127 characters.',
  'err.pdf.passwordChars': 'Use only standard letters, digits and symbols in the password so every PDF reader can open the file.',
  'err.pdf.alreadyPassword': 'This PDF is already password-protected. Unlock it first with the Unlock PDF tool.',
  'err.pdf.alreadyProtected': 'This PDF is already protected. Unlock it first with the Unlock PDF tool.',
  'err.pdf.unlockUnsupported': 'This PDF could not be unlocked. It may use an unsupported kind of protection.',
  'err.pdf.wrongPassword': 'That password is not correct.',
  'err.pdf.unlockDamaged': 'This PDF could not be unlocked. It may be damaged.',

  // PDF: forms
  'err.pdf.formRead': 'The form fields in this PDF could not be read. The file may use an unusual form structure.',
  'err.pdf.formFieldChar': 'The value of “{name}” contains a character that the form’s font cannot display. Use plain Latin letters, digits and common symbols in this field.',
  'err.pdf.formNoField': 'The field “{name}” does not exist in this PDF.',
  'err.pdf.formMaxLength': '“{name}” allows at most {max} characters.',
  'err.pdf.formFillFailed': '“{name}” could not be filled: {message}.',
  'err.pdf.formChar': 'A field contains a character that the form’s font cannot display. Use plain Latin letters, digits and common symbols.',
  'err.pdf.formSaveFailed': 'The filled form could not be saved: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Mark at least one area or search term to redact.',
  'err.pdf.signNoPlacement': 'Choose where the signature should go.',
  'err.pdf.signImageUnreadable': 'The signature image could not be read. Draw, type or upload a PNG or JPG signature.',
  'err.pdf.signOutside': 'The signature must fit inside the page.',
} as Record<string, string>;
