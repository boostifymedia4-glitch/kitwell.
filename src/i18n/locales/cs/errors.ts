import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Něco se pokazilo. Zkuste to prosím znovu.',
  'err.unknown': 'neznámá chyba',

  // File validation
  'err.files.limit': 'Byl dosažen limit {max} souborů.',
  'err.files.unsupportedType': 'Nepodporovaný typ souboru. Povoleno: {types}.',
  'err.files.empty': 'Soubor je prázdný.',
  'err.files.tooLarge': 'Příliš velký ({size}). Maximum je {max}.',
  'err.files.onlyOne': 'Najednou lze použít pouze jeden soubor.',

  // JSON
  'err.json.badUnicode': 'Neplatná escape sekvence Unicode',
  'err.json.badEscape': 'Neplatná escape sekvence v řetězci',
  'err.json.controlChar': 'Neescapovaný řídicí znak v řetězci (pro zalomení řádku použijte \\n)',
  'err.json.unterminatedString': 'Neukončený řetězec',
  'err.json.invalidNumber': 'Neplatné číslo',
  'err.json.unexpectedEnd': 'Neočekávaný konec JSON',
  'err.json.trailingComma': 'Čárka na konci není v JSON povolena',
  'err.json.propertyName': 'Očekáván název vlastnosti v dvojitých uvozovkách',
  'err.json.doubleQuotes': 'Řetězce musí používat dvojité uvozovky',
  'err.json.unexpectedChar': 'Neočekávaný znak "{char}"',
  'err.json.trailingContent': 'Neočekávaný obsah za koncem hodnoty JSON',
  'err.json.empty': 'Pro pokračování zadejte JSON.',
  'err.json.invalid': 'Neplatný JSON',

  // XML
  'err.xml.empty': 'Pro pokračování zadejte XML.',
  'err.xml.unterminatedComment': 'Neukončený komentář',
  'err.xml.unterminatedPi': 'Neukončená zpracovávací instrukce',
  'err.xml.unterminatedDeclaration': 'Neukončená deklarace',
  'err.xml.unterminatedAttribute': 'Neukončená hodnota atributu',
  'err.xml.unterminatedTag': 'Neukončená značka',
  'err.xml.unexpectedClosing': 'Neočekávaná ukončovací značka </{name}>',
  'err.xml.mismatched': 'Nesprávná ukončovací značka: očekávána </{expected}>, nalezena </{found}>',
  'err.xml.invalidTagName': 'Neplatný název značky "{name}"',
  'err.xml.unclosedTag': 'Neuzavřená značka <{name}>',
  'err.xml.noElement': 'Nebyl nalezen žádný element XML',
  'err.xml.singleRoot': 'Dokument XML musí mít jediný kořenový element',
  'err.xml.strayText': 'Text mimo kořenový element není povolen',

  // Developer tools
  'err.dev.malformedPercent': 'Text obsahuje chybnou procentovou sekvenci (například „%“, za nímž nenásledují dvě hexadecimální číslice).',
  'err.dev.badBase64': 'Toto není platný Base64. Zkontrolujte chybějící, nadbytečné nebo nepodporované znaky.',
  'err.dev.notUtf8': 'Dekódovaná data nejsou platný text UTF-8. Mohou to být binární data, například obrázek.',
  'err.dev.noCharType': 'Vyberte alespoň jeden typ znaků.',
  'err.dev.timestampFormat': 'Zadejte počet sekund nebo milisekund od 1. 1. 1970 UTC.',
  'err.dev.timestampRange': 'Toto časové razítko je mimo podporovaný rozsah dat.',
  'err.regex.invalid': 'Neplatný regulární výraz',
  'err.regex.timeout': 'Provádění tohoto vzoru trvalo příliš dlouho a bylo zastaveno. Může způsobovat katastrofické backtrackování (například vnořené opakování jako (a+)+).',

  // GIF
  'err.gif.noImages': 'Přidejte alespoň jeden obrázek.',
  'err.gif.tooManyFrames': 'GIF může mít nejvýše {max} snímků.',
  'err.gif.sizeNotInteger': 'Velikost GIFu musí být celé číslo v pixelech.',
  'err.gif.tooLarge': 'GIF je příliš velký.',
  'err.gif.tooLargeToBuild': 'Tento GIF by byl pro váš prohlížeč příliš velký na vytvoření. Použijte menší velikost nebo méně snímků.',
  'err.gif.colours': 'Vyberte 16, 32, 64, 128 nebo 256 barev.',
  'err.gif.frameMismatch': 'Snímek neodpovídá velikosti GIFu.',
  'err.gif.notGif': 'Nejde o soubor GIF.',
  'err.gif.damaged': 'Data GIFu jsou poškozená.',
  'err.gif.incomplete': 'Data GIFu jsou neúplná.',

  // Images
  'err.image.processingFailed': 'Zpracování selhalo.',
  'err.image.noCanvas': 'Nepodařilo se vytvořit kreslicí plochu. Obrázek může být pro toto zařízení příliš velký.',
  'err.image.resultTooBig': 'Výsledek by měl {width} × {height} px, což je více, než může tento nástroj v prohlížeči bezpečně vytvořit (max. {max} px na stranu).',
  'err.image.watermarkTooSmall': 'Vodoznak je příliš malý na dlaždicové opakování. Použijte větší velikost nebo jediný vodoznak.',
  'err.image.notLarger': 'Vyberte větší velikost, než je původní. K zmenšení obrázků použijte nástroj Změnit velikost obrázku.',
  'err.image.notSvg': 'Tento soubor nevypadá jako obrázek SVG.',
  'err.image.svgFailed': 'Tento SVG se nepodařilo vykreslit. Může být neplatný nebo používat funkce, které prohlížeče nepodporují.',
  'err.image.encodeFailed': 'Prohlížeč nemohl tento obrázek zakódovat.',
  'err.image.formatUnsupported': 'Váš prohlížeč neumí ukládat obrázky {format}. Zkuste jiný výstupní formát nebo aktuální verzi Chrome, Edge či Firefoxu.',
  'err.image.unreadable': 'Tento soubor se nepodařilo přečíst jako obrázek. Může být poškozený nebo v nepodporovaném formátu.',

  // OCR
  'err.ocr.engineStart': 'Engine OCR se nepodařilo spustit. Načtěte stránku znovu a zkuste to znovu; pokud to stále selhává, váš prohlížeč možná nepodporuje WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Vyberte velká písmena, malá písmena, nebo obojí.',
  'err.passwords.length': 'Vyberte délku od {min} do {max}.',
  'err.passwords.chooseCategory': 'Vyberte alespoň jednu kategorii slov.',
  'err.passwords.cannotBuild': 'S tímto nastavením nelze vytvořit heslo založené na jménu. Zkuste jinou délku nebo zapněte čísla či symboly.',

  // QR codes
  'err.qr.noText': 'Nejprve zadejte text nebo odkaz.',
  'err.qr.tooMuchData': 'To je příliš mnoho dat pro QR kód při této úrovni korekce chyb. Zkraťte text nebo vyberte nižší úroveň.',
  'err.qr.badColours': 'Vyberte platné barvy.',
  'err.qr.wifiName': 'Zadejte název sítě.',
  'err.qr.wifiPassword': 'Zadejte heslo k Wi-Fi nebo vyberte „Bez hesla“.',
  'err.qr.email': 'Zadejte platnou e-mailovou adresu.',
  'err.qr.phone': 'Zadejte telefonní číslo pomocí číslic, volitelně s úvodním +.',
  'err.qr.unreadableImage': 'Tento obrázek se nepodařilo přečíst. Může být pro toto zařízení příliš velký.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Najednou lze použít pouze jedno PDF.',
  'err.pdf.unreadable': 'Tento soubor se nepodařilo přečíst jako PDF. Může být poškozený nebo vůbec nejde o PDF.',
  'err.pdf.passwordProtected': 'Toto PDF je chráněno heslem. Nejprve heslo odstraňte naším nástrojem Odemknout PDF a zkuste to znovu.',
  'err.pdf.pageMissing': 'Stránka {page} v tomto dokumentu neexistuje.',
  'err.pdf.noCanvas': 'Váš prohlížeč nemohl pro tuto stránku vytvořit kreslicí plochu.',
  'err.pdf.encodePage': 'Prohlížeč nemohl tuto stránku zakódovat jako obrázek.',
  'err.pdf.encodePageImage': 'Prohlížeč nemohl zakódovat obrázek stránky.',
  'err.pdf.renderTooLarge': 'Tato stránka je příliš velká na vykreslení ve zvoleném rozlišení. Zkuste nižší DPI.',
  'err.pdf.previewTooLarge': 'Tato stránka je příliš velká na náhled.',
  'err.pdf.flattenTooLarge': 'Stránka je příliš velká na zpracování v této kvalitě. Vyberte nižší kvalitu.',
  'err.pdf.compareSize': 'Oba obrázky musí mít stejnou velikost.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Ke sloučení přidejte alespoň dva soubory PDF.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'Soubor {n}',
  'err.pdf.selectPage': 'Vyberte alespoň jednu stránku.',
  'err.pdf.selectedPageMissing': 'Vybraná stránka v tomto PDF neexistuje.',
  'err.pdf.enterPages': 'Zadejte stránky, které chcete, například 1-3, 5.',
  'err.pdf.enterRanges': 'Zadejte rozsahy pro každý výstupní soubor, například 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" není platná stránka ani rozsah.',
  'err.pdf.rangeOutside.one': '"{token}" je mimo tento dokument, který má {count} stránku.',
  'err.pdf.rangeOutside.few': '"{token}" je mimo tento dokument, který má {count} stránky.',
  'err.pdf.rangeOutside.many': '"{token}" je mimo tento dokument, který má {count} stránky.',
  'err.pdf.rangeOutside.other': '"{token}" je mimo tento dokument, který má {count} stránek.',
  'err.pdf.rangeBackwards': '"{token}" je obráceně. Rozsahy pište od nižšího čísla k vyššímu, například {example}.',
  'err.pdf.noImages': 'Přidejte alespoň jeden obrázek.',
  'err.pdf.imageEmbed': 'Jeden z obrázků se nepodařilo vložit. Může být poškozený nebo používat nepodporovanou variantu.',

  // PDF: editing
  'err.pdf.latinOnly': 'Zde lze použít pouze latinku, číslice a běžné symboly, protože vestavěná písma PDF neobsahují jiné abecedy.',
  'err.pdf.badColour': 'Vyberte platnou barvu.',
  'err.pdf.badPages': 'Vyberte platné stránky.',
  'err.pdf.numberFirst': 'První číslovaná stránka musí být mezi 1 a {count}.',
  'err.pdf.numberLast': 'Poslední číslovaná stránka musí být mezi {from} a {count}.',
  'err.pdf.numberStart': 'Začněte číslovat celým číslem od 0 do 99 999.',
  'err.pdf.fontSize72': 'Velikost písma musí být mezi 6 a 72.',
  'err.pdf.fontSize300': 'Velikost písma musí být mezi 6 a 300.',
  'err.pdf.margin': 'Okraj musí být mezi 0 a 200.',
  'err.pdf.opacity': 'Neprůhlednost musí být mezi 5 % a 100 %.',
  'err.pdf.angle': 'Úhel musí být mezi -180 a 180 stupni.',
  'err.pdf.watermarkText': 'Zadejte text vodoznaku.',
  'err.pdf.watermarkLength': 'Text vodoznaku může mít nejvýše 100 znaků.',
  'err.pdf.imageScale': 'Velikost obrázku musí být mezi 5 % a 100 % šířky stránky.',
  'err.pdf.watermarkImage': 'Obrázek vodoznaku se nepodařilo přečíst. Použijte platný soubor PNG nebo JPG.',
  'err.pdf.watermarkTile': 'Vodoznak je příliš malý na dlaždicové opakování. Použijte větší velikost nebo rozložení na střed.',
  'err.pdf.cropOutside': 'Vyberte oblast ořezu uvnitř stránky.',
  'err.pdf.cropSmall': 'Oblast ořezu je na stránce {page} příliš malá.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Zadejte heslo.',
  'err.pdf.passwordLength': 'Heslo může mít nejvýše 127 znaků.',
  'err.pdf.passwordChars': 'V hesle používejte pouze běžná písmena, číslice a symboly, aby soubor otevřela každá čtečka PDF.',
  'err.pdf.alreadyPassword': 'Toto PDF je již chráněno heslem. Nejprve ho odemkněte nástrojem Odemknout PDF.',
  'err.pdf.alreadyProtected': 'Toto PDF je již chráněno. Nejprve ho odemkněte nástrojem Odemknout PDF.',
  'err.pdf.unlockUnsupported': 'Toto PDF se nepodařilo odemknout. Může používat nepodporovaný druh ochrany.',
  'err.pdf.wrongPassword': 'Toto heslo není správné.',
  'err.pdf.unlockDamaged': 'Toto PDF se nepodařilo odemknout. Může být poškozené.',

  // PDF: forms
  'err.pdf.formRead': 'Formulářová pole v tomto PDF se nepodařilo přečíst. Soubor může mít neobvyklou strukturu formuláře.',
  'err.pdf.formFieldChar': 'Hodnota pole „{name}“ obsahuje znak, který písmo formuláře nedokáže zobrazit. V tomto poli použijte běžnou latinku, číslice a běžné symboly.',
  'err.pdf.formNoField': 'Pole „{name}“ v tomto PDF neexistuje.',
  'err.pdf.formMaxLength': 'Pole „{name}“ povoluje nejvýše {max} znaků.',
  'err.pdf.formFillFailed': 'Pole „{name}“ se nepodařilo vyplnit: {message}.',
  'err.pdf.formChar': 'Pole obsahuje znak, který písmo formuláře nedokáže zobrazit. Použijte běžnou latinku, číslice a běžné symboly.',
  'err.pdf.formSaveFailed': 'Vyplněný formulář se nepodařilo uložit: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Označte alespoň jednu oblast nebo hledaný výraz k začernění.',
  'err.pdf.signNoPlacement': 'Vyberte, kam se má podpis umístit.',
  'err.pdf.signImageUnreadable': 'Obrázek podpisu se nepodařilo přečíst. Nakreslete, napište nebo nahrajte podpis ve formátu PNG nebo JPG.',
  'err.pdf.signOutside': 'Podpis se musí vejít na stránku.',
} as PartialMessages;
