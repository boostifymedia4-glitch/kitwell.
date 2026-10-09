import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  'err.unknown': 'unbekannter Fehler',

  // File validation
  'err.files.limit': 'Das Limit von {max} Dateien ist erreicht.',
  'err.files.unsupportedType': 'Nicht unterstützter Dateityp. Zulässig: {types}.',
  'err.files.empty': 'Die Datei ist leer.',
  'err.files.tooLarge': 'Zu groß ({size}). Maximal {max}.',
  'err.files.onlyOne': 'Es kann nur eine Datei gleichzeitig verwendet werden.',

  // JSON
  'err.json.badUnicode': 'Ungültige Unicode-Escape-Sequenz',
  'err.json.badEscape': 'Ungültige Escape-Sequenz in Zeichenkette',
  'err.json.controlChar': 'Nicht maskiertes Steuerzeichen in Zeichenkette (für Zeilenumbrüche \\n verwenden)',
  'err.json.unterminatedString': 'Nicht abgeschlossene Zeichenkette',
  'err.json.invalidNumber': 'Ungültige Zahl',
  'err.json.unexpectedEnd': 'Unerwartetes Ende des JSON',
  'err.json.trailingComma': 'Ein abschließendes Komma ist in JSON nicht erlaubt',
  'err.json.propertyName': 'Ein Eigenschaftsname in doppelten Anführungszeichen wird erwartet',
  'err.json.doubleQuotes': 'Zeichenketten müssen doppelte Anführungszeichen verwenden',
  'err.json.unexpectedChar': 'Unerwartetes Zeichen "{char}"',
  'err.json.trailingContent': 'Unerwarteter Inhalt nach dem Ende des JSON-Werts',
  'err.json.empty': 'Geben Sie JSON ein, um fortzufahren.',
  'err.json.invalid': 'Ungültiges JSON',

  // XML
  'err.xml.empty': 'Geben Sie XML ein, um fortzufahren.',
  'err.xml.unterminatedComment': 'Nicht abgeschlossener Kommentar',
  'err.xml.unterminatedPi': 'Nicht abgeschlossene Verarbeitungsanweisung',
  'err.xml.unterminatedDeclaration': 'Nicht abgeschlossene Deklaration',
  'err.xml.unterminatedAttribute': 'Nicht abgeschlossener Attributwert',
  'err.xml.unterminatedTag': 'Nicht abgeschlossenes Tag',
  'err.xml.unexpectedClosing': 'Unerwartetes schließendes Tag </{name}>',
  'err.xml.mismatched': 'Nicht passendes schließendes Tag: erwartet </{expected}>, gefunden </{found}>',
  'err.xml.invalidTagName': 'Ungültiger Tag-Name "{name}"',
  'err.xml.unclosedTag': 'Nicht geschlossenes Tag <{name}>',
  'err.xml.noElement': 'Kein XML-Element gefunden',
  'err.xml.singleRoot': 'Ein XML-Dokument muss genau ein Wurzelelement haben',
  'err.xml.strayText': 'Text außerhalb des Wurzelelements ist nicht erlaubt',

  // Developer tools
  'err.dev.malformedPercent': 'Der Text enthält eine fehlerhafte Prozent-Sequenz (zum Beispiel ein „%“, auf das keine zwei Hexadezimalziffern folgen).',
  'err.dev.badBase64': 'Das ist kein gültiges Base64. Prüfen Sie auf fehlende, überzählige oder nicht unterstützte Zeichen.',
  'err.dev.notUtf8': 'Die dekodierten Daten sind kein gültiger UTF-8-Text. Es könnten Binärdaten wie ein Bild sein.',
  'err.dev.noCharType': 'Wählen Sie mindestens eine Zeichenart aus.',
  'err.dev.timestampFormat': 'Geben Sie eine Anzahl von Sekunden oder Millisekunden seit 1970-01-01 UTC ein.',
  'err.dev.timestampRange': 'Dieser Zeitstempel liegt außerhalb des unterstützten Datumsbereichs.',
  'err.regex.invalid': 'Ungültiger regulärer Ausdruck',
  'err.regex.timeout': 'Dieses Muster hat zu lange gebraucht und wurde gestoppt. Es könnte katastrophales Backtracking verursachen (zum Beispiel verschachtelte Wiederholungen wie (a+)+).',

  // GIF
  'err.gif.noImages': 'Fügen Sie mindestens ein Bild hinzu.',
  'err.gif.tooManyFrames': 'Ein GIF kann höchstens {max} Einzelbilder haben.',
  'err.gif.sizeNotInteger': 'Die GIF-Größe muss eine ganze Zahl von Pixeln sein.',
  'err.gif.tooLarge': 'Das GIF ist zu groß.',
  'err.gif.tooLargeToBuild': 'Dieses GIF wäre zu groß, als dass Ihr Browser es erstellen könnte. Verwenden Sie eine kleinere Größe oder weniger Einzelbilder.',
  'err.gif.colours': 'Wählen Sie 16, 32, 64, 128 oder 256 Farben.',
  'err.gif.frameMismatch': 'Ein Einzelbild passt nicht zur GIF-Größe.',
  'err.gif.notGif': 'Keine GIF-Datei.',
  'err.gif.damaged': 'Die GIF-Daten sind beschädigt.',
  'err.gif.incomplete': 'Die GIF-Daten sind unvollständig.',

  // Images
  'err.image.processingFailed': 'Verarbeitung fehlgeschlagen.',
  'err.image.noCanvas': 'Es konnte keine Zeichenfläche erstellt werden. Das Bild ist möglicherweise zu groß für dieses Gerät.',
  'err.image.resultTooBig': 'Das Ergebnis wäre {width} × {height} px groß und damit größer, als dieses Browser-Tool sicher erstellen kann (max. {max} px pro Seite).',
  'err.image.watermarkTooSmall': 'Das Wasserzeichen ist zu klein zum Kacheln. Verwenden Sie eine größere Größe oder ein einzelnes Zeichen.',
  'err.image.notLarger': 'Wählen Sie eine Größe, die über dem Original liegt. Mit dem Bildgrößen-Tool können Sie Bilder verkleinern.',
  'err.image.notSvg': 'Diese Datei sieht nicht wie ein SVG-Bild aus.',
  'err.image.svgFailed': 'Dieses SVG konnte nicht gezeichnet werden. Es ist möglicherweise ungültig oder nutzt Funktionen, die Browser nicht unterstützen.',
  'err.image.encodeFailed': 'Der Browser konnte dieses Bild nicht kodieren.',
  'err.image.formatUnsupported': 'Ihr Browser kann keine {format}-Bilder speichern. Versuchen Sie ein anderes Ausgabeformat oder eine aktuelle Version von Chrome, Edge oder Firefox.',
  'err.image.unreadable': 'Diese Datei konnte nicht als Bild gelesen werden. Sie ist möglicherweise beschädigt oder hat ein nicht unterstütztes Format.',

  // OCR
  'err.ocr.engineStart': 'Die OCR-Engine konnte nicht gestartet werden. Laden Sie die Seite neu und versuchen Sie es erneut; falls es weiter fehlschlägt, unterstützt Ihr Browser möglicherweise kein WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Wählen Sie Großbuchstaben, Kleinbuchstaben oder beides.',
  'err.passwords.length': 'Wählen Sie eine Länge zwischen {min} und {max}.',
  'err.passwords.chooseCategory': 'Wählen Sie mindestens eine Wortkategorie.',
  'err.passwords.cannotBuild': 'Mit diesen Einstellungen konnte kein namensbasiertes Passwort erstellt werden. Versuchen Sie eine andere Länge oder aktivieren Sie Zahlen oder Symbole.',

  // QR codes
  'err.qr.noText': 'Geben Sie zuerst einen Text oder Link ein.',
  'err.qr.tooMuchData': 'Das sind zu viele Daten für einen QR-Code bei dieser Fehlerkorrekturstufe. Kürzen Sie den Text oder wählen Sie eine niedrigere Stufe.',
  'err.qr.badColours': 'Wählen Sie gültige Farben.',
  'err.qr.wifiName': 'Geben Sie den Netzwerknamen ein.',
  'err.qr.wifiPassword': 'Geben Sie das WLAN-Passwort ein oder wählen Sie „Kein Passwort“.',
  'err.qr.email': 'Geben Sie eine gültige E-Mail-Adresse ein.',
  'err.qr.phone': 'Geben Sie eine Telefonnummer aus Ziffern ein, optional mit einem führenden +.',
  'err.qr.unreadableImage': 'Dieses Bild konnte nicht gelesen werden. Es ist möglicherweise zu groß für dieses Gerät.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Es kann nur eine PDF gleichzeitig verwendet werden.',
  'err.pdf.unreadable': 'Diese Datei konnte nicht als PDF gelesen werden. Sie ist möglicherweise beschädigt oder gar keine PDF.',
  'err.pdf.passwordProtected': 'Diese PDF ist passwortgeschützt. Entfernen Sie das Passwort zuerst mit unserem Tool „PDF entsperren“ und versuchen Sie es dann erneut.',
  'err.pdf.pageMissing': 'Seite {page} existiert in diesem Dokument nicht.',
  'err.pdf.noCanvas': 'Ihr Browser konnte für diese Seite keine Zeichenfläche erstellen.',
  'err.pdf.encodePage': 'Der Browser konnte diese Seite nicht als Bild kodieren.',
  'err.pdf.encodePageImage': 'Der Browser konnte ein Seitenbild nicht kodieren.',
  'err.pdf.renderTooLarge': 'Diese Seite ist zu groß, um sie in der gewählten Auflösung darzustellen. Versuchen Sie einen niedrigeren DPI-Wert.',
  'err.pdf.previewTooLarge': 'Diese Seite ist zu groß für eine Vorschau.',
  'err.pdf.flattenTooLarge': 'Eine Seite ist zu groß, um sie in dieser Qualität zu verarbeiten. Wählen Sie eine niedrigere Qualitätseinstellung.',
  'err.pdf.compareSize': 'Beide Bilder müssen dieselbe Größe haben.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Fügen Sie mindestens zwei PDF-Dateien zum Zusammenfügen hinzu.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'Datei {n}',
  'err.pdf.selectPage': 'Wählen Sie mindestens eine Seite aus.',
  'err.pdf.selectedPageMissing': 'Eine ausgewählte Seite existiert in dieser PDF nicht.',
  'err.pdf.enterPages': 'Geben Sie die gewünschten Seiten ein, zum Beispiel 1-3, 5.',
  'err.pdf.enterRanges': 'Geben Sie die Bereiche für jede Ausgabedatei ein, zum Beispiel 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" ist keine gültige Seite und kein gültiger Bereich.',
  'err.pdf.rangeOutside.one': '"{token}" liegt außerhalb dieses Dokuments, das {count} Seite hat.',
  'err.pdf.rangeOutside.other': '"{token}" liegt außerhalb dieses Dokuments, das {count} Seiten hat.',
  'err.pdf.rangeBackwards': '"{token}" ist rückwärts angegeben. Schreiben Sie Bereiche von niedrig nach hoch, wie {example}.',
  'err.pdf.noImages': 'Fügen Sie mindestens ein Bild hinzu.',
  'err.pdf.imageEmbed': 'Eines der Bilder konnte nicht eingebettet werden. Es ist möglicherweise beschädigt oder nutzt eine nicht unterstützte Variante.',

  // PDF: editing
  'err.pdf.latinOnly': 'Hier können nur lateinische Buchstaben, Ziffern und gängige Symbole verwendet werden, da die integrierten Schriften von PDF keine anderen Alphabete enthalten.',
  'err.pdf.badColour': 'Wählen Sie eine gültige Farbe.',
  'err.pdf.badPages': 'Wählen Sie gültige Seiten.',
  'err.pdf.numberFirst': 'Die erste zu nummerierende Seite muss zwischen 1 und {count} liegen.',
  'err.pdf.numberLast': 'Die letzte zu nummerierende Seite muss zwischen {from} und {count} liegen.',
  'err.pdf.numberStart': 'Beginnen Sie die Nummerierung mit einer ganzen Zahl von 0 bis 99.999.',
  'err.pdf.fontSize72': 'Die Schriftgröße muss zwischen 6 und 72 liegen.',
  'err.pdf.fontSize300': 'Die Schriftgröße muss zwischen 6 und 300 liegen.',
  'err.pdf.margin': 'Der Rand muss zwischen 0 und 200 liegen.',
  'err.pdf.opacity': 'Die Deckkraft muss zwischen 5 % und 100 % liegen.',
  'err.pdf.angle': 'Der Winkel muss zwischen -180 und 180 Grad liegen.',
  'err.pdf.watermarkText': 'Geben Sie den Wasserzeichentext ein.',
  'err.pdf.watermarkLength': 'Der Wasserzeichentext darf höchstens 100 Zeichen lang sein.',
  'err.pdf.imageScale': 'Die Bildgröße muss zwischen 5 % und 100 % der Seitenbreite liegen.',
  'err.pdf.watermarkImage': 'Das Wasserzeichenbild konnte nicht gelesen werden. Verwenden Sie eine gültige PNG- oder JPG-Datei.',
  'err.pdf.watermarkTile': 'Das Wasserzeichen ist zu klein zum Kacheln. Verwenden Sie eine größere Größe oder das zentrierte Layout.',
  'err.pdf.cropOutside': 'Wählen Sie einen Zuschneidebereich innerhalb der Seite.',
  'err.pdf.cropSmall': 'Der Zuschneidebereich auf Seite {page} ist zu klein.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Geben Sie ein Passwort ein.',
  'err.pdf.passwordLength': 'Das Passwort darf höchstens 127 Zeichen lang sein.',
  'err.pdf.passwordChars': 'Verwenden Sie im Passwort nur Standardbuchstaben, Ziffern und Symbole, damit jedes PDF-Programm die Datei öffnen kann.',
  'err.pdf.alreadyPassword': 'Diese PDF ist bereits passwortgeschützt. Entsperren Sie sie zuerst mit dem Tool „PDF entsperren“.',
  'err.pdf.alreadyProtected': 'Diese PDF ist bereits geschützt. Entsperren Sie sie zuerst mit dem Tool „PDF entsperren“.',
  'err.pdf.unlockUnsupported': 'Diese PDF konnte nicht entsperrt werden. Sie nutzt möglicherweise eine nicht unterstützte Art von Schutz.',
  'err.pdf.wrongPassword': 'Dieses Passwort ist nicht korrekt.',
  'err.pdf.unlockDamaged': 'Diese PDF konnte nicht entsperrt werden. Sie ist möglicherweise beschädigt.',

  // PDF: forms
  'err.pdf.formRead': 'Die Formularfelder in dieser PDF konnten nicht gelesen werden. Die Datei nutzt möglicherweise eine ungewöhnliche Formularstruktur.',
  'err.pdf.formFieldChar': 'Der Wert von „{name}“ enthält ein Zeichen, das die Schrift des Formulars nicht darstellen kann. Verwenden Sie in diesem Feld einfache lateinische Buchstaben, Ziffern und gängige Symbole.',
  'err.pdf.formNoField': 'Das Feld „{name}“ existiert in dieser PDF nicht.',
  'err.pdf.formMaxLength': '„{name}“ erlaubt höchstens {max} Zeichen.',
  'err.pdf.formFillFailed': '„{name}“ konnte nicht ausgefüllt werden: {message}.',
  'err.pdf.formChar': 'Ein Feld enthält ein Zeichen, das die Schrift des Formulars nicht darstellen kann. Verwenden Sie einfache lateinische Buchstaben, Ziffern und gängige Symbole.',
  'err.pdf.formSaveFailed': 'Das ausgefüllte Formular konnte nicht gespeichert werden: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Markieren Sie mindestens einen Bereich oder Suchbegriff zum Schwärzen.',
  'err.pdf.signNoPlacement': 'Wählen Sie, wo die Signatur platziert werden soll.',
  'err.pdf.signImageUnreadable': 'Das Signaturbild konnte nicht gelesen werden. Zeichnen, tippen oder laden Sie eine PNG- oder JPG-Signatur hoch.',
  'err.pdf.signOutside': 'Die Signatur muss auf die Seite passen.',
} as PartialMessages;
