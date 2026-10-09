import type { PartialMessages } from '../../en';

/** Translations of src/i18n/en/errors.ts. */
export default {
  // Generic
  'err.generic': 'Qualcosa è andato storto. Riprova.',
  'err.unknown': 'errore sconosciuto',

  // File validation
  'err.files.limit': 'Raggiunto il limite di {max} file.',
  'err.files.unsupportedType': 'Tipo di file non supportato. Tipi accettati: {types}.',
  'err.files.empty': 'Il file è vuoto.',
  'err.files.tooLarge': 'Troppo grande ({size}). Il massimo è {max}.',
  'err.files.onlyOne': 'È possibile usare un solo file alla volta.',

  // JSON
  'err.json.badUnicode': 'Sequenza di escape Unicode non valida',
  'err.json.badEscape': 'Sequenza di escape non valida nella stringa',
  'err.json.controlChar': 'Carattere di controllo senza escape nella stringa (usa \\n per gli a capo)',
  'err.json.unterminatedString': 'Stringa non terminata',
  'err.json.invalidNumber': 'Numero non valido',
  'err.json.unexpectedEnd': 'Fine del JSON inattesa',
  'err.json.trailingComma': 'In JSON non è consentita la virgola finale',
  'err.json.propertyName': 'Era previsto un nome di proprietà tra virgolette doppie',
  'err.json.doubleQuotes': 'Le stringhe devono usare le virgolette doppie',
  'err.json.unexpectedChar': 'Carattere inatteso "{char}"',
  'err.json.trailingContent': 'Contenuto inatteso dopo la fine del valore JSON',
  'err.json.empty': 'Inserisci del JSON per continuare.',
  'err.json.invalid': 'JSON non valido',

  // XML
  'err.xml.empty': 'Inserisci dell’XML per continuare.',
  'err.xml.unterminatedComment': 'Commento non terminato',
  'err.xml.unterminatedPi': 'Istruzione di elaborazione non terminata',
  'err.xml.unterminatedDeclaration': 'Dichiarazione non terminata',
  'err.xml.unterminatedAttribute': 'Valore dell’attributo non terminato',
  'err.xml.unterminatedTag': 'Tag non terminato',
  'err.xml.unexpectedClosing': 'Tag di chiusura inatteso </{name}>',
  'err.xml.mismatched': 'Tag di chiusura non corrispondente: era previsto </{expected}> ma è stato trovato </{found}>',
  'err.xml.invalidTagName': 'Nome del tag non valido "{name}"',
  'err.xml.unclosedTag': 'Tag non chiuso <{name}>',
  'err.xml.noElement': 'Nessun elemento XML trovato',
  'err.xml.singleRoot': 'Un documento XML deve avere un solo elemento radice',
  'err.xml.strayText': 'Il testo non è consentito fuori dall’elemento radice',

  // Developer tools
  'err.dev.malformedPercent': 'Il testo contiene una sequenza percentuale non valida (ad esempio un "%" non seguito da due cifre esadecimali).',
  'err.dev.badBase64': 'Questo non è Base64 valido. Controlla se mancano caratteri o se ce ne sono di aggiuntivi o non supportati.',
  'err.dev.notUtf8': 'I dati decodificati non sono testo UTF-8 valido. Potrebbero essere dati binari, come un’immagine.',
  'err.dev.noCharType': 'Seleziona almeno un tipo di carattere.',
  'err.dev.timestampFormat': 'Inserisci un numero di secondi o millisecondi trascorsi dal 1970-01-01 UTC.',
  'err.dev.timestampRange': 'Questo timestamp è fuori dall’intervallo di date supportato.',
  'err.regex.invalid': 'Espressione regolare non valida',
  'err.regex.timeout': 'L’esecuzione di questo schema ha richiesto troppo tempo ed è stata interrotta. Potrebbe causare un backtracking catastrofico (ad esempio una ripetizione annidata come (a+)+).',

  // GIF
  'err.gif.noImages': 'Aggiungi almeno un’immagine.',
  'err.gif.tooManyFrames': 'Una GIF può avere al massimo {max} fotogrammi.',
  'err.gif.sizeNotInteger': 'Le dimensioni della GIF devono essere un numero intero di pixel.',
  'err.gif.tooLarge': 'La GIF è troppo grande.',
  'err.gif.tooLargeToBuild': 'Questa GIF sarebbe troppo grande per essere creata dal tuo browser. Usa dimensioni più piccole o meno fotogrammi.',
  'err.gif.colours': 'Scegli 16, 32, 64, 128 o 256 colori.',
  'err.gif.frameMismatch': 'Un fotogramma non corrisponde alle dimensioni della GIF.',
  'err.gif.notGif': 'Non è un file GIF.',
  'err.gif.damaged': 'I dati della GIF sono danneggiati.',
  'err.gif.incomplete': 'I dati della GIF sono incompleti.',

  // Images
  'err.image.processingFailed': 'Elaborazione non riuscita.',
  'err.image.noCanvas': 'Impossibile creare una superficie di disegno. L’immagine potrebbe essere troppo grande per questo dispositivo.',
  'err.image.resultTooBig': 'Il risultato sarebbe di {width} × {height} px, più grande di quanto questo strumento del browser possa creare in sicurezza (max {max} px per lato).',
  'err.image.watermarkTooSmall': 'La filigrana è troppo piccola per essere ripetuta a mosaico. Usa una dimensione maggiore o un singolo segno.',
  'err.image.notLarger': 'Scegli una dimensione maggiore dell’originale. Usa Ridimensiona immagine per rimpicciolire le immagini.',
  'err.image.notSvg': 'Questo file non sembra un’immagine SVG.',
  'err.image.svgFailed': 'Non è stato possibile disegnare questo SVG. Potrebbe non essere valido o usare funzioni che i browser non supportano.',
  'err.image.encodeFailed': 'Il browser non è riuscito a codificare questa immagine.',
  'err.image.formatUnsupported': 'Il tuo browser non può salvare immagini {format}. Prova un altro formato di output o una versione recente di Chrome, Edge o Firefox.',
  'err.image.unreadable': 'Non è stato possibile leggere questo file come immagine. Potrebbe essere danneggiato o in un formato non supportato.',

  // OCR
  'err.ocr.engineStart': 'Non è stato possibile avviare il motore OCR. Ricarica la pagina e riprova; se continua a non funzionare, il tuo browser potrebbe non supportare WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Scegli le lettere maiuscole, le minuscole o entrambe.',
  'err.passwords.length': 'Scegli una lunghezza compresa tra {min} e {max}.',
  'err.passwords.chooseCategory': 'Scegli almeno una categoria di parole.',
  'err.passwords.cannotBuild': 'Con queste impostazioni non è stato possibile creare una password basata su un nome. Prova un’altra lunghezza o attiva numeri o simboli.',

  // QR codes
  'err.qr.noText': 'Inserisci prima del testo o un link.',
  'err.qr.tooMuchData': 'Sono troppi dati per un codice QR con questo livello di correzione degli errori. Accorcia il testo o scegli un livello più basso.',
  'err.qr.badColours': 'Scegli colori validi.',
  'err.qr.wifiName': 'Inserisci il nome della rete.',
  'err.qr.wifiPassword': 'Inserisci la password del Wi-Fi oppure scegli «Nessuna password».',
  'err.qr.email': 'Inserisci un indirizzo email valido.',
  'err.qr.phone': 'Inserisci un numero di telefono con le cifre, con un + iniziale facoltativo.',
  'err.qr.unreadableImage': 'Non è stato possibile leggere questa immagine. Potrebbe essere troppo grande per questo dispositivo.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'È possibile usare un solo PDF alla volta.',
  'err.pdf.unreadable': 'Non è stato possibile leggere questo file come PDF. Potrebbe essere danneggiato o non essere affatto un PDF.',
  'err.pdf.passwordProtected': 'Questo PDF è protetto da password. Rimuovi prima la password con il nostro strumento Sblocca PDF, poi riprova.',
  'err.pdf.pageMissing': 'La pagina {page} non esiste in questo documento.',
  'err.pdf.noCanvas': 'Il tuo browser non è riuscito a creare una superficie di disegno per questa pagina.',
  'err.pdf.encodePage': 'Il browser non è riuscito a codificare questa pagina come immagine.',
  'err.pdf.encodePageImage': 'Il browser non è riuscito a codificare l’immagine di una pagina.',
  'err.pdf.renderTooLarge': 'Questa pagina è troppo grande per essere resa alla risoluzione scelta. Prova con un DPI più basso.',
  'err.pdf.previewTooLarge': 'Questa pagina è troppo grande per l’anteprima.',
  'err.pdf.flattenTooLarge': 'Una pagina è troppo grande per essere elaborata con questa qualità. Scegli un’impostazione di qualità più bassa.',
  'err.pdf.compareSize': 'Le due immagini devono avere le stesse dimensioni.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Aggiungi almeno due file PDF da unire.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'File {n}',
  'err.pdf.selectPage': 'Seleziona almeno una pagina.',
  'err.pdf.selectedPageMissing': 'Una pagina selezionata non esiste in questo PDF.',
  'err.pdf.enterPages': 'Inserisci le pagine che vuoi, ad esempio 1-3, 5.',
  'err.pdf.enterRanges': 'Inserisci gli intervalli per ogni file di output, ad esempio 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" non è una pagina o un intervallo valido.',
  'err.pdf.rangeOutside.one': '"{token}" è fuori da questo documento, che ha {count} pagina.',
  'err.pdf.rangeOutside.many': '"{token}" è fuori da questo documento, che ha {count} pagine.',
  'err.pdf.rangeOutside.other': '"{token}" è fuori da questo documento, che ha {count} pagine.',
  'err.pdf.rangeBackwards': '"{token}" è al contrario. Scrivi gli intervalli dal più basso al più alto, come {example}.',
  'err.pdf.noImages': 'Aggiungi almeno un’immagine.',
  'err.pdf.imageEmbed': 'Non è stato possibile incorporare una delle immagini. Potrebbe essere danneggiata o usare una variante non supportata.',

  // PDF: editing
  'err.pdf.latinOnly': 'Qui si possono usare solo lettere latine, cifre e simboli comuni, perché i caratteri incorporati nel PDF non includono altri alfabeti.',
  'err.pdf.badColour': 'Scegli un colore valido.',
  'err.pdf.badPages': 'Scegli pagine valide.',
  'err.pdf.numberFirst': 'La prima pagina da numerare deve essere compresa tra 1 e {count}.',
  'err.pdf.numberLast': 'L’ultima pagina da numerare deve essere compresa tra {from} e {count}.',
  'err.pdf.numberStart': 'Inizia la numerazione da un numero intero da 0 a 99.999.',
  'err.pdf.fontSize72': 'La dimensione del carattere deve essere compresa tra 6 e 72.',
  'err.pdf.fontSize300': 'La dimensione del carattere deve essere compresa tra 6 e 300.',
  'err.pdf.margin': 'Il margine deve essere compreso tra 0 e 200.',
  'err.pdf.opacity': 'L’opacità deve essere compresa tra 5% e 100%.',
  'err.pdf.angle': 'L’angolo deve essere compreso tra -180 e 180 gradi.',
  'err.pdf.watermarkText': 'Inserisci il testo della filigrana.',
  'err.pdf.watermarkLength': 'Il testo della filigrana può avere al massimo 100 caratteri.',
  'err.pdf.imageScale': 'La dimensione dell’immagine deve essere compresa tra 5% e 100% della larghezza della pagina.',
  'err.pdf.watermarkImage': 'Non è stato possibile leggere l’immagine della filigrana. Usa un file PNG o JPG valido.',
  'err.pdf.watermarkTile': 'La filigrana è troppo piccola per essere ripetuta a mosaico. Usa una dimensione maggiore o la disposizione centrata.',
  'err.pdf.cropOutside': 'Scegli un’area di ritaglio all’interno della pagina.',
  'err.pdf.cropSmall': 'L’area di ritaglio è troppo piccola nella pagina {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Inserisci una password.',
  'err.pdf.passwordLength': 'La password può avere al massimo 127 caratteri.',
  'err.pdf.passwordChars': 'Usa nella password solo lettere, cifre e simboli standard, così ogni lettore PDF potrà aprire il file.',
  'err.pdf.alreadyPassword': 'Questo PDF è già protetto da password. Sbloccalo prima con lo strumento Sblocca PDF.',
  'err.pdf.alreadyProtected': 'Questo PDF è già protetto. Sbloccalo prima con lo strumento Sblocca PDF.',
  'err.pdf.unlockUnsupported': 'Non è stato possibile sbloccare questo PDF. Potrebbe usare un tipo di protezione non supportato.',
  'err.pdf.wrongPassword': 'La password non è corretta.',
  'err.pdf.unlockDamaged': 'Non è stato possibile sbloccare questo PDF. Potrebbe essere danneggiato.',

  // PDF: forms
  'err.pdf.formRead': 'Non è stato possibile leggere i campi del modulo di questo PDF. Il file potrebbe avere una struttura di modulo insolita.',
  'err.pdf.formFieldChar': 'Il valore di «{name}» contiene un carattere che il font del modulo non può visualizzare. In questo campo usa lettere latine semplici, cifre e simboli comuni.',
  'err.pdf.formNoField': 'Il campo «{name}» non esiste in questo PDF.',
  'err.pdf.formMaxLength': '«{name}» consente al massimo {max} caratteri.',
  'err.pdf.formFillFailed': 'Non è stato possibile compilare «{name}»: {message}.',
  'err.pdf.formChar': 'Un campo contiene un carattere che il font del modulo non può visualizzare. Usa lettere latine semplici, cifre e simboli comuni.',
  'err.pdf.formSaveFailed': 'Non è stato possibile salvare il modulo compilato: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Segna almeno un’area o un termine di ricerca da oscurare.',
  'err.pdf.signNoPlacement': 'Scegli dove deve andare la firma.',
  'err.pdf.signImageUnreadable': 'Non è stato possibile leggere l’immagine della firma. Disegna, digita o carica una firma in PNG o JPG.',
  'err.pdf.signOutside': 'La firma deve rientrare nella pagina.',
} as PartialMessages;
