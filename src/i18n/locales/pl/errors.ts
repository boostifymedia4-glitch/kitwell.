import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Coś poszło nie tak. Spróbuj ponownie.',
  'err.unknown': 'nieznany błąd',

  // File validation
  'err.files.limit': 'Osiągnięto limit plików: {max}.',
  'err.files.unsupportedType': 'Nieobsługiwany typ pliku. Akceptowane: {types}.',
  'err.files.empty': 'Plik jest pusty.',
  'err.files.tooLarge': 'Za duży ({size}). Maksymalny rozmiar to {max}.',
  'err.files.onlyOne': 'Można używać tylko jednego pliku naraz.',

  // JSON
  'err.json.badUnicode': 'Nieprawidłowa sekwencja unicode',
  'err.json.badEscape': 'Nieprawidłowa sekwencja ucieczki w ciągu znaków',
  'err.json.controlChar': 'Nieoznaczony znak sterujący w ciągu znaków (użyj \\n dla podziałów wierszy)',
  'err.json.unterminatedString': 'Niezakończony ciąg znaków',
  'err.json.invalidNumber': 'Nieprawidłowa liczba',
  'err.json.unexpectedEnd': 'Nieoczekiwany koniec JSON',
  'err.json.trailingComma': 'Końcowy przecinek nie jest dozwolony w JSON',
  'err.json.propertyName': 'Oczekiwano nazwy właściwości w podwójnych cudzysłowach',
  'err.json.doubleQuotes': 'Ciągi znaków muszą używać podwójnych cudzysłowów',
  'err.json.unexpectedChar': 'Nieoczekiwany znak „{char}”',
  'err.json.trailingContent': 'Nieoczekiwana treść po zakończeniu wartości JSON',
  'err.json.empty': 'Wpisz kod JSON, aby kontynuować.',
  'err.json.invalid': 'Nieprawidłowy JSON',

  // XML
  'err.xml.empty': 'Wpisz kod XML, aby kontynuować.',
  'err.xml.unterminatedComment': 'Niezakończony komentarz',
  'err.xml.unterminatedPi': 'Niezakończona instrukcja przetwarzania',
  'err.xml.unterminatedDeclaration': 'Niezakończona deklaracja',
  'err.xml.unterminatedAttribute': 'Niezakończona wartość atrybutu',
  'err.xml.unterminatedTag': 'Niezakończony znacznik',
  'err.xml.unexpectedClosing': 'Nieoczekiwany znacznik zamykający </{name}>',
  'err.xml.mismatched': 'Niepasujący znacznik zamykający: oczekiwano </{expected}>, a znaleziono </{found}>',
  'err.xml.invalidTagName': 'Nieprawidłowa nazwa znacznika „{name}”',
  'err.xml.unclosedTag': 'Niezamknięty znacznik <{name}>',
  'err.xml.noElement': 'Nie znaleziono elementu XML',
  'err.xml.singleRoot': 'Dokument XML musi mieć jeden element główny',
  'err.xml.strayText': 'Tekst poza elementem głównym jest niedozwolony',

  // Developer tools
  'err.dev.malformedPercent': 'Tekst zawiera nieprawidłową sekwencję procentową (na przykład znak „%” niepoprzedzający dwóch cyfr szesnastkowych).',
  'err.dev.badBase64': 'To nie jest prawidłowy Base64. Sprawdź, czy nie brakuje znaków, nie ma nadmiarowych lub nieobsługiwanych znaków.',
  'err.dev.notUtf8': 'Zdekodowane dane nie są prawidłowym tekstem UTF-8. Mogą to być dane binarne, na przykład obraz.',
  'err.dev.noCharType': 'Wybierz co najmniej jeden rodzaj znaków.',
  'err.dev.timestampFormat': 'Wpisz liczbę sekund lub milisekund od 1970-01-01 UTC.',
  'err.dev.timestampRange': 'Ten znacznik czasu wykracza poza obsługiwany zakres dat.',
  'err.regex.invalid': 'Nieprawidłowe wyrażenie regularne',
  'err.regex.timeout': 'Wykonanie tego wzorca trwało zbyt długo i zostało zatrzymane. Może powodować katastrofalne nawroty (na przykład zagnieżdżone powtórzenia, jak (a+)+).',

  // GIF
  'err.gif.noImages': 'Dodaj co najmniej jeden obraz.',
  'err.gif.tooManyFrames': 'GIF może mieć co najwyżej klatek: {max}.',
  'err.gif.sizeNotInteger': 'Rozmiar GIF-a musi być całkowitą liczbą pikseli.',
  'err.gif.tooLarge': 'GIF jest za duży.',
  'err.gif.tooLargeToBuild': 'Ten GIF byłby zbyt duży, aby przeglądarka mogła go utworzyć. Użyj mniejszego rozmiaru lub mniejszej liczby klatek.',
  'err.gif.colours': 'Wybierz 16, 32, 64, 128 lub 256 kolorów.',
  'err.gif.frameMismatch': 'Klatka nie pasuje do rozmiaru GIF-a.',
  'err.gif.notGif': 'To nie jest plik GIF.',
  'err.gif.damaged': 'Dane GIF są uszkodzone.',
  'err.gif.incomplete': 'Dane GIF są niekompletne.',

  // Images
  'err.image.processingFailed': 'Przetwarzanie nie powiodło się.',
  'err.image.noCanvas': 'Nie udało się utworzyć powierzchni rysowania. Obraz może być zbyt duży dla tego urządzenia.',
  'err.image.resultTooBig': 'Wynik miałby wymiary {width} × {height} px, czyli więcej, niż to narzędzie przeglądarkowe może bezpiecznie utworzyć (maks. {max} px na bok).',
  'err.image.watermarkTooSmall': 'Znak wodny jest zbyt mały, aby go powielić na całej powierzchni. Użyj większego rozmiaru lub pojedynczego znaku.',
  'err.image.notLarger': 'Wybierz rozmiar większy niż oryginał. Aby zmniejszyć obrazy, użyj narzędzia Zmień rozmiar obrazu.',
  'err.image.notSvg': 'Ten plik nie wygląda na obraz SVG.',
  'err.image.svgFailed': 'Nie udało się narysować tego SVG. Może być nieprawidłowy lub używać funkcji nieobsługiwanych przez przeglądarki.',
  'err.image.encodeFailed': 'Przeglądarka nie mogła zakodować tego obrazu.',
  'err.image.formatUnsupported': 'Twoja przeglądarka nie może zapisywać obrazów {format}. Spróbuj użyć innego formatu wyjściowego lub aktualnej wersji Chrome, Edge albo Firefox.',
  'err.image.unreadable': 'Nie udało się odczytać tego pliku jako obrazu. Może być uszkodzony lub mieć nieobsługiwany format.',

  // OCR
  'err.ocr.engineStart': 'Nie udało się uruchomić silnika OCR. Odśwież stronę i spróbuj ponownie; jeśli problem się powtarza, Twoja przeglądarka może nie obsługiwać WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Wybierz wielkie litery, małe litery lub oba rodzaje.',
  'err.passwords.length': 'Wybierz długość od {min} do {max}.',
  'err.passwords.chooseCategory': 'Wybierz co najmniej jedną kategorię słów.',
  'err.passwords.cannotBuild': 'Nie udało się utworzyć hasła opartego na imieniu przy tych ustawieniach. Spróbuj innej długości lub włącz cyfry albo symbole.',

  // QR codes
  'err.qr.noText': 'Najpierw wpisz tekst lub link.',
  'err.qr.tooMuchData': 'To zbyt dużo danych dla kodu QR na tym poziomie korekcji błędów. Skróć tekst lub wybierz niższy poziom.',
  'err.qr.badColours': 'Wybierz prawidłowe kolory.',
  'err.qr.wifiName': 'Wpisz nazwę sieci.',
  'err.qr.wifiPassword': 'Wpisz hasło Wi-Fi lub wybierz „Bez hasła”.',
  'err.qr.email': 'Wpisz prawidłowy adres e-mail.',
  'err.qr.phone': 'Wpisz numer telefonu składający się z cyfr, z opcjonalnym znakiem + na początku.',
  'err.qr.unreadableImage': 'Nie udało się odczytać tego obrazu. Może być zbyt duży dla tego urządzenia.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Można używać tylko jednego pliku PDF naraz.',
  'err.pdf.unreadable': 'Nie udało się odczytać tego pliku jako PDF. Może być uszkodzony lub w ogóle nie być plikiem PDF.',
  'err.pdf.passwordProtected': 'Ten PDF jest chroniony hasłem. Najpierw usuń hasło naszym narzędziem Odblokuj PDF, a potem spróbuj ponownie.',
  'err.pdf.pageMissing': 'Strona {page} nie istnieje w tym dokumencie.',
  'err.pdf.noCanvas': 'Przeglądarka nie mogła utworzyć powierzchni rysowania dla tej strony.',
  'err.pdf.encodePage': 'Przeglądarka nie mogła zakodować tej strony jako obrazu.',
  'err.pdf.encodePageImage': 'Przeglądarka nie mogła zakodować obrazu strony.',
  'err.pdf.renderTooLarge': 'Ta strona jest zbyt duża, aby wyrenderować ją w wybranej rozdzielczości. Spróbuj niższego DPI.',
  'err.pdf.previewTooLarge': 'Ta strona jest zbyt duża, aby wyświetlić jej podgląd.',
  'err.pdf.flattenTooLarge': 'Strona jest zbyt duża, aby przetworzyć ją w tej jakości. Wybierz niższe ustawienie jakości.',
  'err.pdf.compareSize': 'Oba obrazy muszą mieć ten sam rozmiar.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Dodaj co najmniej dwa pliki PDF do scalenia.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'Plik {n}',
  'err.pdf.selectPage': 'Wybierz co najmniej jedną stronę.',
  'err.pdf.selectedPageMissing': 'Wybrana strona nie istnieje w tym PDF-ie.',
  'err.pdf.enterPages': 'Wpisz potrzebne strony, na przykład 1-3, 5.',
  'err.pdf.enterRanges': 'Wpisz zakresy dla każdego pliku wynikowego, na przykład 1-3, 4-6.',
  'err.pdf.badRange': '„{token}” nie jest prawidłową stroną ani zakresem.',
  'err.pdf.rangeOutside.one': '„{token}” wykracza poza ten dokument, który ma {count} stronę.',
  'err.pdf.rangeOutside.few': '„{token}” wykracza poza ten dokument, który ma {count} strony.',
  'err.pdf.rangeOutside.many': '„{token}” wykracza poza ten dokument, który ma {count} stron.',
  'err.pdf.rangeOutside.other': '„{token}” wykracza poza ten dokument, który ma {count} strony.',
  'err.pdf.rangeBackwards': '„{token}” jest odwrócony. Zapisuj zakresy od mniejszej do większej liczby, na przykład {example}.',
  'err.pdf.noImages': 'Dodaj co najmniej jeden obraz.',
  'err.pdf.imageEmbed': 'Nie udało się osadzić jednego z obrazów. Może być uszkodzony lub używać nieobsługiwanego wariantu.',

  // PDF: editing
  'err.pdf.latinOnly': 'Można tu używać tylko liter łacińskich, cyfr i popularnych symboli, ponieważ wbudowane czcionki PDF nie zawierają innych alfabetów.',
  'err.pdf.badColour': 'Wybierz prawidłowy kolor.',
  'err.pdf.badPages': 'Wybierz prawidłowe strony.',
  'err.pdf.numberFirst': 'Pierwsza numerowana strona musi mieścić się między 1 a {count}.',
  'err.pdf.numberLast': 'Ostatnia numerowana strona musi mieścić się między {from} a {count}.',
  'err.pdf.numberStart': 'Rozpocznij numerowanie od liczby całkowitej od 0 do 99 999.',
  'err.pdf.fontSize72': 'Rozmiar czcionki musi mieścić się między 6 a 72.',
  'err.pdf.fontSize300': 'Rozmiar czcionki musi mieścić się między 6 a 300.',
  'err.pdf.margin': 'Margines musi mieścić się między 0 a 200.',
  'err.pdf.opacity': 'Krycie musi mieścić się między 5% a 100%.',
  'err.pdf.angle': 'Kąt musi mieścić się między -180 a 180 stopni.',
  'err.pdf.watermarkText': 'Wpisz tekst znaku wodnego.',
  'err.pdf.watermarkLength': 'Tekst znaku wodnego może mieć co najwyżej 100 znaków.',
  'err.pdf.imageScale': 'Rozmiar obrazu musi wynosić od 5% do 100% szerokości strony.',
  'err.pdf.watermarkImage': 'Nie udało się odczytać obrazu znaku wodnego. Użyj prawidłowego pliku PNG lub JPG.',
  'err.pdf.watermarkTile': 'Znak wodny jest zbyt mały, aby go powielić na całej powierzchni. Użyj większego rozmiaru lub układu wyśrodkowanego.',
  'err.pdf.cropOutside': 'Wybierz obszar przycięcia wewnątrz strony.',
  'err.pdf.cropSmall': 'Obszar przycięcia na stronie {page} jest zbyt mały.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Wpisz hasło.',
  'err.pdf.passwordLength': 'Hasło może mieć co najwyżej 127 znaków.',
  'err.pdf.passwordChars': 'Używaj w haśle tylko standardowych liter, cyfr i symboli, aby każdy czytnik PDF mógł otworzyć plik.',
  'err.pdf.alreadyPassword': 'Ten PDF jest już chroniony hasłem. Najpierw odblokuj go narzędziem Odblokuj PDF.',
  'err.pdf.alreadyProtected': 'Ten PDF jest już zabezpieczony. Najpierw odblokuj go narzędziem Odblokuj PDF.',
  'err.pdf.unlockUnsupported': 'Nie udało się odblokować tego PDF-a. Może używać nieobsługiwanego rodzaju zabezpieczenia.',
  'err.pdf.wrongPassword': 'To hasło jest nieprawidłowe.',
  'err.pdf.unlockDamaged': 'Nie udało się odblokować tego PDF-a. Może być uszkodzony.',

  // PDF: forms
  'err.pdf.formRead': 'Nie udało się odczytać pól formularza w tym PDF-ie. Plik może używać nietypowej struktury formularza.',
  'err.pdf.formFieldChar': 'Wartość pola „{name}” zawiera znak, którego czcionka formularza nie może wyświetlić. Używaj w tym polu zwykłych liter łacińskich, cyfr i popularnych symboli.',
  'err.pdf.formNoField': 'Pole „{name}” nie istnieje w tym PDF-ie.',
  'err.pdf.formMaxLength': 'Pole „{name}” pozwala na co najwyżej {max} znaków.',
  'err.pdf.formFillFailed': 'Nie udało się wypełnić pola „{name}”: {message}.',
  'err.pdf.formChar': 'Pole zawiera znak, którego czcionka formularza nie może wyświetlić. Używaj zwykłych liter łacińskich, cyfr i popularnych symboli.',
  'err.pdf.formSaveFailed': 'Nie udało się zapisać wypełnionego formularza: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Zaznacz co najmniej jeden obszar lub szukaną frazę do zaczernienia.',
  'err.pdf.signNoPlacement': 'Wybierz, gdzie ma się znaleźć podpis.',
  'err.pdf.signImageUnreadable': 'Nie udało się odczytać obrazu podpisu. Narysuj, wpisz lub wgraj podpis w formacie PNG albo JPG.',
  'err.pdf.signOutside': 'Podpis musi mieścić się wewnątrz strony.',
} as PartialMessages;
