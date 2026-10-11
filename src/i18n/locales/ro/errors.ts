import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Ceva nu a funcționat. Vă rugăm să încercați din nou.',
  'err.unknown': 'eroare necunoscută',

  // File validation
  'err.files.limit': 'Limita de {max} fișiere a fost atinsă.',
  'err.files.unsupportedType': 'Tip de fișier neacceptat. Se acceptă: {types}.',
  'err.files.empty': 'Fișierul este gol.',
  'err.files.tooLarge': 'Prea mare ({size}). Maximul este {max}.',
  'err.files.onlyOne': 'Se poate folosi un singur fișier o dată.',

  // JSON
  'err.json.badUnicode': 'Secvență de escape Unicode nevalidă',
  'err.json.badEscape': 'Secvență de escape nevalidă în șir',
  'err.json.controlChar': 'Caracter de control fără escape în șir (folosiți \\n pentru întreruperi de rând)',
  'err.json.unterminatedString': 'Șir neterminat',
  'err.json.invalidNumber': 'Număr nevalid',
  'err.json.unexpectedEnd': 'Sfârșit neașteptat al JSON-ului',
  'err.json.trailingComma': 'Virgula finală nu este permisă în JSON',
  'err.json.propertyName': 'Se aștepta un nume de proprietate între ghilimele duble',
  'err.json.doubleQuotes': 'Șirurile trebuie să folosească ghilimele duble',
  'err.json.unexpectedChar': 'Caracter neașteptat „{char}”',
  'err.json.trailingContent': 'Conținut neașteptat după sfârșitul valorii JSON',
  'err.json.empty': 'Introduceți niște JSON pentru a continua.',
  'err.json.invalid': 'JSON nevalid',

  // XML
  'err.xml.empty': 'Introduceți niște XML pentru a continua.',
  'err.xml.unterminatedComment': 'Comentariu neterminat',
  'err.xml.unterminatedPi': 'Instrucțiune de procesare neterminată',
  'err.xml.unterminatedDeclaration': 'Declarație neterminată',
  'err.xml.unterminatedAttribute': 'Valoare de atribut neterminată',
  'err.xml.unterminatedTag': 'Etichetă neterminată',
  'err.xml.unexpectedClosing': 'Etichetă de închidere neașteptată </{name}>',
  'err.xml.mismatched': 'Etichetă de închidere nepotrivită: se aștepta </{expected}>, dar s-a găsit </{found}>',
  'err.xml.invalidTagName': 'Nume de etichetă nevalid „{name}”',
  'err.xml.unclosedTag': 'Etichetă neînchisă <{name}>',
  'err.xml.noElement': 'Nu a fost găsit niciun element XML',
  'err.xml.singleRoot': 'Un document XML trebuie să aibă un singur element rădăcină',
  'err.xml.strayText': 'Textul nu este permis în afara elementului rădăcină',

  // Developer tools
  'err.dev.malformedPercent': 'Textul conține o secvență procentuală incorectă (de exemplu un „%” care nu este urmat de două cifre hexazecimale).',
  'err.dev.badBase64': 'Acesta nu este Base64 valid. Verificați dacă există caractere lipsă, în plus sau neacceptate.',
  'err.dev.notUtf8': 'Datele decodate nu sunt text UTF-8 valid. Pot fi date binare, cum ar fi o imagine.',
  'err.dev.noCharType': 'Selectați cel puțin un tip de caractere.',
  'err.dev.timestampFormat': 'Introduceți un număr de secunde sau milisecunde de la 1970-01-01 UTC.',
  'err.dev.timestampRange': 'Acest marcaj temporal este în afara intervalului de date acceptat.',
  'err.regex.invalid': 'Expresie regulată nevalidă',
  'err.regex.timeout': 'Acest model a rulat prea mult și a fost oprit. Poate provoca backtracking catastrofal (de exemplu repetiții imbricate precum (a+)+).',

  // GIF
  'err.gif.noImages': 'Adăugați cel puțin o imagine.',
  'err.gif.tooManyFrames': 'Un GIF poate avea cel mult {max} cadre.',
  'err.gif.sizeNotInteger': 'Dimensiunea GIF-ului trebuie să fie un număr întreg de pixeli.',
  'err.gif.tooLarge': 'GIF-ul este prea mare.',
  'err.gif.tooLargeToBuild': 'Acest GIF ar fi prea mare pentru a fi creat de browserul dvs. Folosiți o dimensiune mai mică sau mai puține cadre.',
  'err.gif.colours': 'Alegeți 16, 32, 64, 128 sau 256 de culori.',
  'err.gif.frameMismatch': 'Un cadru nu se potrivește cu dimensiunea GIF-ului.',
  'err.gif.notGif': 'Nu este un fișier GIF.',
  'err.gif.damaged': 'Datele GIF sunt deteriorate.',
  'err.gif.incomplete': 'Datele GIF sunt incomplete.',

  // Images
  'err.image.processingFailed': 'Procesarea a eșuat.',
  'err.image.noCanvas': 'Nu s-a putut crea o suprafață de desenare. Imaginea poate fi prea mare pentru acest dispozitiv.',
  'err.image.resultTooBig': 'Rezultatul ar fi de {width} × {height} px, ceea ce depășește ce poate crea în siguranță acest instrument din browser (maximum {max} px pe latură).',
  'err.image.watermarkTooSmall': 'Filigranul este prea mic pentru a fi repetat. Folosiți o dimensiune mai mare sau un singur semn.',
  'err.image.notLarger': 'Alegeți o dimensiune mai mare decât originalul. Folosiți Redimensionare imagine pentru a micșora imaginile.',
  'err.image.notSvg': 'Acest fișier nu pare a fi o imagine SVG.',
  'err.image.svgFailed': 'Acest SVG nu a putut fi desenat. Poate fi nevalid sau poate folosi funcții neacceptate de browsere.',
  'err.image.encodeFailed': 'Browserul nu a putut codifica această imagine.',
  'err.image.formatUnsupported': 'Browserul dvs. nu poate salva imagini {format}. Încercați alt format de ieșire sau o versiune actuală de Chrome, Edge sau Firefox.',
  'err.image.unreadable': 'Acest fișier nu a putut fi citit ca imagine. Poate fi corupt sau într-un format neacceptat.',

  // OCR
  'err.ocr.engineStart': 'Motorul OCR nu a putut fi pornit. Reîncărcați pagina și încercați din nou; dacă eșuează în continuare, este posibil ca browserul dvs. să nu accepte WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Alegeți litere mari, litere mici sau ambele.',
  'err.passwords.length': 'Alegeți o lungime între {min} și {max}.',
  'err.passwords.chooseCategory': 'Alegeți cel puțin o categorie de cuvinte.',
  'err.passwords.cannotBuild': 'O parolă bazată pe nume nu a putut fi creată cu aceste setări. Încercați o altă lungime sau activați cifrele ori simbolurile.',

  // QR codes
  'err.qr.noText': 'Introduceți mai întâi un text sau un link.',
  'err.qr.tooMuchData': 'Sunt prea multe date pentru un cod QR la acest nivel de corecție a erorilor. Scurtați textul sau alegeți un nivel mai scăzut.',
  'err.qr.badColours': 'Alegeți culori valide.',
  'err.qr.wifiName': 'Introduceți numele rețelei.',
  'err.qr.wifiPassword': 'Introduceți parola Wi-Fi sau alegeți „Fără parolă”.',
  'err.qr.email': 'Introduceți o adresă de e-mail validă.',
  'err.qr.phone': 'Introduceți un număr de telefon folosind cifre, cu un + opțional la început.',
  'err.qr.unreadableImage': 'Această imagine nu a putut fi citită. Poate fi prea mare pentru acest dispozitiv.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Se poate folosi un singur PDF o dată.',
  'err.pdf.unreadable': 'Acest fișier nu a putut fi citit ca PDF. Poate fi corupt sau poate să nu fie deloc un PDF.',
  'err.pdf.passwordProtected': 'Acest PDF este protejat cu parolă. Eliminați mai întâi parola cu instrumentul nostru Deblocare PDF, apoi încercați din nou.',
  'err.pdf.pageMissing': 'Pagina {page} nu există în acest document.',
  'err.pdf.noCanvas': 'Browserul dvs. nu a putut crea o suprafață de desenare pentru această pagină.',
  'err.pdf.encodePage': 'Browserul nu a putut codifica această pagină ca imagine.',
  'err.pdf.encodePageImage': 'Browserul nu a putut codifica o imagine de pagină.',
  'err.pdf.renderTooLarge': 'Această pagină este prea mare pentru a fi randată la rezoluția aleasă. Încercați un DPI mai mic.',
  'err.pdf.previewTooLarge': 'Această pagină este prea mare pentru previzualizare.',
  'err.pdf.flattenTooLarge': 'O pagină este prea mare pentru a fi procesată la această calitate. Alegeți o setare de calitate mai mică.',
  'err.pdf.compareSize': 'Ambele imagini trebuie să aibă aceeași dimensiune.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Adăugați cel puțin două fișiere PDF pentru îmbinare.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'Fișierul {n}',
  'err.pdf.selectPage': 'Selectați cel puțin o pagină.',
  'err.pdf.selectedPageMissing': 'O pagină selectată nu există în acest PDF.',
  'err.pdf.enterPages': 'Introduceți paginile dorite, de exemplu 1-3, 5.',
  'err.pdf.enterRanges': 'Introduceți intervalele pentru fiecare fișier de ieșire, de exemplu 1-3, 4-6.',
  'err.pdf.badRange': '„{token}” nu este o pagină sau un interval valid.',
  'err.pdf.rangeOutside.one': '„{token}” se află în afara acestui document, care are {count} pagină.',
  'err.pdf.rangeOutside.few': '„{token}” se află în afara acestui document, care are {count} pagini.',
  'err.pdf.rangeOutside.other': '„{token}” se află în afara acestui document, care are {count} de pagini.',
  'err.pdf.rangeBackwards': '„{token}” este în ordine inversă. Scrieți intervalele de la mic la mare, de exemplu {example}.',
  'err.pdf.noImages': 'Adăugați cel puțin o imagine.',
  'err.pdf.imageEmbed': 'Una dintre imagini nu a putut fi încorporată. Poate fi coruptă sau poate folosi o variantă neacceptată.',

  // PDF: editing
  'err.pdf.latinOnly': 'Aici pot fi folosite doar litere latine, cifre și simboluri uzuale, deoarece fonturile încorporate ale PDF-ului nu includ alte alfabete.',
  'err.pdf.badColour': 'Alegeți o culoare validă.',
  'err.pdf.badPages': 'Alegeți pagini valide.',
  'err.pdf.numberFirst': 'Prima pagină de numerotat trebuie să fie între 1 și {count}.',
  'err.pdf.numberLast': 'Ultima pagină de numerotat trebuie să fie între {from} și {count}.',
  'err.pdf.numberStart': 'Începeți numerotarea de la un număr întreg între 0 și 99.999.',
  'err.pdf.fontSize72': 'Dimensiunea fontului trebuie să fie între 6 și 72.',
  'err.pdf.fontSize300': 'Dimensiunea fontului trebuie să fie între 6 și 300.',
  'err.pdf.margin': 'Marginea trebuie să fie între 0 și 200.',
  'err.pdf.opacity': 'Opacitatea trebuie să fie între 5% și 100%.',
  'err.pdf.angle': 'Unghiul trebuie să fie între -180 și 180 de grade.',
  'err.pdf.watermarkText': 'Introduceți textul filigranului.',
  'err.pdf.watermarkLength': 'Textul filigranului poate avea cel mult 100 de caractere.',
  'err.pdf.imageScale': 'Dimensiunea imaginii trebuie să fie între 5% și 100% din lățimea paginii.',
  'err.pdf.watermarkImage': 'Imaginea filigranului nu a putut fi citită. Folosiți un fișier PNG sau JPG valid.',
  'err.pdf.watermarkTile': 'Filigranul este prea mic pentru a fi repetat. Folosiți o dimensiune mai mare sau aspectul centrat.',
  'err.pdf.cropOutside': 'Alegeți o zonă de decupare în interiorul paginii.',
  'err.pdf.cropSmall': 'Zona de decupare este prea mică pe pagina {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Introduceți o parolă.',
  'err.pdf.passwordLength': 'Parola poate avea cel mult 127 de caractere.',
  'err.pdf.passwordChars': 'Folosiți în parolă doar litere, cifre și simboluri standard, astfel încât orice cititor PDF să poată deschide fișierul.',
  'err.pdf.alreadyPassword': 'Acest PDF este deja protejat cu parolă. Deblocați-l mai întâi cu instrumentul Deblocare PDF.',
  'err.pdf.alreadyProtected': 'Acest PDF este deja protejat. Deblocați-l mai întâi cu instrumentul Deblocare PDF.',
  'err.pdf.unlockUnsupported': 'Acest PDF nu a putut fi deblocat. Poate folosi un tip de protecție neacceptat.',
  'err.pdf.wrongPassword': 'Parola nu este corectă.',
  'err.pdf.unlockDamaged': 'Acest PDF nu a putut fi deblocat. Poate fi deteriorat.',

  // PDF: forms
  'err.pdf.formRead': 'Câmpurile de formular din acest PDF nu au putut fi citite. Fișierul poate folosi o structură de formular neobișnuită.',
  'err.pdf.formFieldChar': 'Valoarea câmpului „{name}” conține un caracter pe care fontul formularului nu îl poate afișa. Folosiți în acest câmp litere latine simple, cifre și simboluri uzuale.',
  'err.pdf.formNoField': 'Câmpul „{name}” nu există în acest PDF.',
  'err.pdf.formMaxLength': '„{name}” permite cel mult {max} caractere.',
  'err.pdf.formFillFailed': '„{name}” nu a putut fi completat: {message}.',
  'err.pdf.formChar': 'Un câmp conține un caracter pe care fontul formularului nu îl poate afișa. Folosiți litere latine simple, cifre și simboluri uzuale.',
  'err.pdf.formSaveFailed': 'Formularul completat nu a putut fi salvat: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Marcați cel puțin o zonă sau un termen de căutare de cenzurat.',
  'err.pdf.signNoPlacement': 'Alegeți unde să fie plasată semnătura.',
  'err.pdf.signImageUnreadable': 'Imaginea semnăturii nu a putut fi citită. Desenați, tastați sau încărcați o semnătură PNG sau JPG.',
  'err.pdf.signOutside': 'Semnătura trebuie să încapă în pagină.',
} as PartialMessages;
