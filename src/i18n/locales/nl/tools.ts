import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG naar PNG',
    description: 'Zet JPG- en JPEG-foto’s met één klik om naar verliesvrije PNG-afbeeldingen.',
    metaDescription: 'Zet JPG gratis online om naar PNG. Converteer JPEG-foto’s in batch naar PNG, rechtstreeks in je browser, zonder upload en zonder account.',
    steps: [
      'Sleep een of meer JPG-bestanden naar de tool, of kies ze op je apparaat.',
      'Bekijk de voorbeelden en klik op Converteren.',
      'Download elke PNG, of download alles als ZIP.',
    ],
    faq: [
      { q: 'Wordt de kwaliteit beter als ik JPG naar PNG omzet?', a: 'Nee. JPG is verliesgevend, dus detail dat bij het opslaan van de JPG is weggegooid, kun je niet terugkrijgen. PNG slaat de huidige pixels gewoon zonder verder verlies op, wat handig is voor bewerken of werk met transparantie.' },
      { q: 'Waarom is de PNG groter dan de JPG?', a: 'PNG is verliesvrij en slaat foto’s meestal minder efficiënt op dan JPG. Gebruik JPG of WebP als de bestandsgrootte belangrijker is dan exacte pixels.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG naar JPG',
    description: 'Maak van PNG-afbeeldingen kleinere JPG-bestanden met instelbare kwaliteit.',
    metaDescription: 'Zet PNG gratis online om naar JPG. Kies de kwaliteit en de achtergrondkleur voor transparante afbeeldingen. Verwerkt in je browser.',
    steps: [
      'Voeg je PNG-bestanden toe.',
      'Stel de JPG-kwaliteit in en de achtergrondkleur waarmee transparante delen worden gevuld.',
      'Klik op Converteren en download de resultaten.',
    ],
    faq: [
      { q: 'Wat gebeurt er met transparante delen?', a: 'JPG kent geen transparantie, dus transparante pixels worden gevuld met de achtergrondkleur die je kiest (standaard wit).' },
      { q: 'Welke kwaliteitsinstelling moet ik gebruiken?', a: '80–90 is voor de meeste afbeeldingen een goede balans. Onder ongeveer 60 worden compressieartefacten zichtbaar op tekst en scherpe randen.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Transparantie wordt platgemaakt op een effen kleur, omdat JPG die niet kan opslaan.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG naar WebP',
    description: 'Zet JPG-foto’s om naar modern WebP voor kleinere bestanden en snellere pagina’s.',
    metaDescription: 'Zet JPG gratis online om naar WebP. Maak foto’s kleiner voor het web met instelbare kwaliteit, lokaal verwerkt in je browser.',
    steps: [
      'Voeg je JPG-bestanden toe.',
      'Kies een WebP-kwaliteit (80 is een verstandige standaard).',
      'Converteer en download.',
    ],
    faq: [
      { q: 'Is WebP kleiner dan JPG?', a: 'Meestal 20–35% kleiner bij een vergelijkbare beeldkwaliteit, al hangt het resultaat van de afbeelding af.' },
      { q: 'Ondersteunt elke browser WebP?', a: 'Alle huidige grote browsers kunnen WebP weergeven. WebP maken in de browser wordt ondersteund in Chrome, Edge, Firefox en recente versies van Safari; als jouw browser dat niet kan, meldt de tool dat in plaats van een foutief bestand te maken.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Je browser moet WebP-codering ondersteunen; in niet-ondersteunde browsers verschijnt een foutmelding.',
    ],
  },
  'png-to-webp': {
    name: 'PNG naar WebP',
    description: 'Zet PNG-afbeeldingen om naar WebP en behoud de transparantie in een fractie van de grootte.',
    metaDescription: 'Zet PNG gratis online om naar WebP. Behoudt transparantie, verkleint het bestand en draait volledig in je browser.',
    steps: [
      'Voeg je PNG-bestanden toe.',
      'Kies de WebP-kwaliteit.',
      'Converteer en download.',
    ],
    faq: [
      { q: 'Blijft de transparantie behouden?', a: 'Ja. WebP ondersteunt een alfakanaal, dus transparante PNG’s blijven transparant.' },
      { q: 'Kan ik een verliesvrij resultaat krijgen?', a: 'Stel de kwaliteit in op 100 voor de hoogste getrouwheid. Browsers coderen WebP verliesgevend, dus gebruik PNG als je een wiskundig exacte kopie nodig hebt.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Je browser moet WebP-codering ondersteunen; in niet-ondersteunde browsers verschijnt een foutmelding.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP naar JPG',
    description: 'Zet WebP-afbeeldingen om naar breed compatibele JPG-bestanden.',
    metaDescription: 'Zet WebP gratis online om naar JPG. Zorg dat WebP-afbeeldingen overal werken, lokaal geconverteerd in je browser.',
    steps: [
      'Voeg je WebP-bestanden toe.',
      'Stel de kwaliteit en de achtergrondkleur voor transparante delen in.',
      'Converteer en download.',
    ],
    faq: [
      { q: 'Waarom WebP naar JPG omzetten?', a: 'Sommige oudere software, e-mailprogramma’s en uploadformulieren weigeren WebP nog. JPG wordt bijna overal geaccepteerd.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Transparantie wordt platgemaakt op een effen kleur, omdat JPG die niet kan opslaan.',
    ],
  },
  'webp-to-png': {
    name: 'WebP naar PNG',
    description: 'Zet WebP-afbeeldingen om naar verliesvrije PNG en behoud de transparantie.',
    metaDescription: 'Zet WebP gratis online om naar PNG. Behoudt transparantie en draait volledig in je browser, zonder upload.',
    steps: [
      'Voeg je WebP-bestanden toe.',
      'Klik op Converteren.',
      'Download de PNG-bestanden.',
    ],
    faq: [
      { q: 'Blijft de transparantie behouden?', a: 'Ja. PNG ondersteunt transparantie, dus de alfa van de WebP wordt overgenomen.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
    ],
  },
  'image-compressor': {
    name: 'Afbeeldingen comprimeren',
    description: 'Verklein de bestandsgrootte van afbeeldingen met instelbare kwaliteit en zie precies hoeveel je bespaart.',
    metaDescription: 'Comprimeer JPG-, PNG- en WebP-afbeeldingen gratis online. Pas de kwaliteit aan, beperk eventueel de afmetingen en vergelijk bestandsgroottes. Draait in je browser.',
    steps: [
      'Voeg je afbeeldingen toe.',
      'Kies een uitvoerformaat en een kwaliteit, en eventueel een maximale breedte of hoogte.',
      'Comprimeer, vergelijk de groottes voor en na, en download.',
    ],
    faq: [
      { q: 'Hoe maakt de compressor het bestand kleiner?', a: 'Hij codeert de afbeelding opnieuw met de gekozen kwaliteit en kan hem ook verkleinen. PNG-uitvoer is verliesvrij en wordt dus alleen kleiner als je ook de afmetingen verlaagt.' },
      { q: 'Wat als het resultaat groter is dan het origineel?', a: 'Dat kan gebeuren bij al geoptimaliseerde bestanden. De tool geeft dat aan, zodat je liever het origineel kunt houden.' },
      { q: 'Blijven EXIF- of locatiegegevens bewaard?', a: 'Nee. Opnieuw coderen via een canvas verwijdert EXIF-metagegevens zoals cameramodel en GPS-locatie, wat vaak precies is wat je wilt voordat je een foto deelt. Kleurprofielen blijven ook niet behouden.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'De beste resultaten krijg je met JPG- of WebP-uitvoer; PNG-uitvoer is verliesvrij en wordt mogelijk niet kleiner.',
    ],
  },
  'image-resizer': {
    name: 'Afbeeldingen verkleinen',
    description: 'Wijzig het formaat van afbeeldingen op exacte pixels of in procenten, met behoud van de verhoudingen.',
    metaDescription: 'Wijzig gratis online het formaat van afbeeldingen. Stel exacte breedte en hoogte of een percentage in, behoud de verhoudingen en download JPG, PNG of WebP.',
    steps: [
      'Voeg een of meer afbeeldingen toe.',
      'Kies pixels of een percentage en voer het nieuwe formaat in. Laat de vergrendeling van de beeldverhouding aan staan om vervorming te voorkomen.',
      'Pas het formaat aan en download.',
    ],
    faq: [
      { q: 'Kan ik een afbeelding vergroten?', a: 'Ja, maar vergroten voegt geen detail toe, dus het resultaat ziet er zachter uit. Verkleinen geeft de beste kwaliteit.' },
      { q: 'Wat is de maximale uitvoergrootte?', a: 'Browsers beperken de canvasgrootte. Deze tool begrenst de uitvoer op 16.000 px per zijde en ongeveer 100 megapixels.' },
      { q: 'Blijven EXIF- of locatiegegevens bewaard?', a: 'Nee. Opnieuw coderen via een canvas verwijdert EXIF-metagegevens zoals cameramodel en GPS-locatie, wat vaak precies is wat je wilt voordat je een foto deelt. Kleurprofielen blijven ook niet behouden.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'De uitvoer is begrensd op 16.000 px per zijde.',
    ],
  },
  'image-cropper': {
    name: 'Afbeelding bijsnijden',
    description: 'Snijd een afbeelding bij tot een exact gebied of een vaste beeldverhouding, met live voorbeeld.',
    metaDescription: 'Snijd afbeeldingen gratis online bij. Kies een vaste beeldverhouding of stel exacte pixelwaarden in met een live voorbeeld. Verwerkt in je browser.',
    steps: [
      'Voeg een afbeelding toe.',
      'Kies een beeldverhouding of sleep het uitsnedekader, en stem de positie en grootte af met de numerieke velden.',
      'Klik op Bijsnijden en download.',
    ],
    faq: [
      { q: 'Vermindert bijsnijden de kwaliteit?', a: 'Bijsnijden behoudt de originele pixels. De kwaliteit verandert alleen als je opslaat als JPG of WebP met een lagere kwaliteitsinstelling.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Eén afbeelding tegelijk.',
      'Maximaal 25 MB per bestand.',
      'Geanimeerde afbeeldingen gebruiken het eerste frame.',
    ],
  },
  'image-rotator': {
    name: 'Afbeelding roteren',
    description: 'Roteer afbeeldingen met 90°, 180°, 270° of een willekeurige hoek.',
    metaDescription: 'Roteer afbeeldingen gratis online. Draai foto’s 90, 180 of 270 graden, of met een eigen hoek, direct in je browser.',
    steps: [
      'Voeg je afbeeldingen toe.',
      'Kies een rotatie of typ een eigen hoek.',
      'Pas toe en download.',
    ],
    faq: [
      { q: 'Wat gebeurt er bij rotaties die geen rechte hoek zijn?', a: 'Het canvas wordt groter zodat de gedraaide afbeelding erin past. Bij JPG-uitvoer worden de lege hoeken gevuld met de gekozen achtergrond; PNG en WebP houden ze transparant.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
    ],
  },
  'image-flipper': {
    name: 'Afbeelding spiegelen',
    description: 'Spiegel afbeeldingen horizontaal of verticaal.',
    metaDescription: 'Spiegel afbeeldingen gratis online horizontaal of verticaal. Spiegel foto’s in je browser, zonder upload.',
    steps: [
      'Voeg je afbeeldingen toe.',
      'Kies horizontaal, verticaal of beide.',
      'Pas toe en download.',
    ],
    faq: [
      { q: 'Wat is het verschil tussen horizontaal en verticaal spiegelen?', a: 'Horizontaal spiegelen verwisselt links en rechts, zoals in een spiegel. Verticaal spiegelen zet de afbeelding ondersteboven langs de horizontale as.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
    ],
  },
  'image-format-converter': {
    name: 'Afbeeldingsformaat converteren',
    description: 'Converteer tussen JPG, PNG en WebP met één flexibele tool.',
    metaDescription: 'Converteer afbeeldingen gratis online tussen JPG, PNG en WebP. Kies het uitvoerformaat en de kwaliteit, lokaal verwerkt in je browser.',
    steps: [
      'Voeg afbeeldingen in een ondersteund formaat toe.',
      'Kies het uitvoerformaat en de kwaliteit.',
      'Converteer en download.',
    ],
    faq: [
      { q: 'Welke formaten kan ik gebruiken?', a: 'Invoer: JPG, PNG, WebP, GIF, BMP en AVIF als je browser ze kan decoderen. Uitvoer: JPG, PNG en WebP.' },
      { q: 'En HEIC of TIFF?', a: 'Browsers kunnen HEIC of TIFF niet standaard decoderen, dus die worden nog niet ondersteund.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'HEIC/HEIF-, TIFF- en RAW-bestanden worden niet ondersteund.',
    ],
  },
  'image-to-base64': {
    name: 'Afbeelding naar Base64',
    description: 'Codeer een afbeelding als Base64-data-URI voor CSS, HTML of JSON.',
    metaDescription: 'Zet een afbeelding gratis online om naar een Base64-tekenreeks of data-URI. Kopieer kant-en-klare HTML- en CSS-fragmenten. Draait in je browser.',
    steps: [
      'Voeg een afbeelding toe.',
      'Kies de uitvoerstijl: data-URI, ruwe Base64, HTML <img> of CSS.',
      'Kopieer het resultaat.',
    ],
    faq: [
      { q: 'Wanneer gebruik ik Base64-afbeeldingen?', a: 'Voor kleine pictogrammen in CSS of e-mail, waar een extra verzoek meer kost dan de ongeveer 33% grotere omvang. Vermijd het bij grote foto’s.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Maximaal 5 MB per afbeelding, omdat Base64-tekst erg groot wordt.',
      'Eén afbeelding tegelijk.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 naar afbeelding',
    description: 'Decodeer een Base64-tekenreeks of data-URI terug naar een downloadbare afbeelding.',
    metaDescription: 'Zet een Base64-tekenreeks of data-URI gratis online om naar een afbeelding. Bekijk een voorbeeld en download de gedecodeerde PNG, JPG, WebP of GIF.',
    steps: [
      'Plak een Base64-tekenreeks of een volledige data-URI.',
      'De afbeelding wordt direct gedecodeerd en weergegeven als voorbeeld.',
      'Download de afbeelding.',
    ],
    faq: [
      { q: 'Heb ik het voorvoegsel "data:image/png;base64," nodig?', a: 'Nee. Zonder voorvoegsel herkent de tool het formaat aan de bestandssignatuur (PNG, JPG, GIF, WebP).' },
      { q: 'Waarom krijg ik een foutmelding?', a: 'De tekenreeks is waarschijnlijk afgekapt, bevat extra tekens of is geen afbeelding. SVG-gegevens worden hier om veiligheidsredenen ook geweigerd.' },
    ],
    limits: [
      'Ondersteunt PNG, JPG, GIF en WebP. SVG wordt bewust niet weergegeven.',
      'Maximaal 10 MB aan gedecodeerde gegevens.',
    ],
  },
  'image-color-picker': {
    name: 'Kleurkiezer voor afbeeldingen',
    description: 'Kies exacte kleuren uit elke afbeelding en haal het dominante kleurenpalet eruit.',
    metaDescription: 'Kies gratis online kleuren uit een afbeelding. Klik op een pixel voor HEX-, RGB- en HSL-waarden en haal een palet van dominante kleuren op.',
    steps: [
      'Voeg een afbeelding toe.',
      'Klik of tik ergens op de afbeelding (of gebruik de pijltjestoetsen) om een pixel te bemonsteren.',
      'Kopieer de HEX-, RGB- of HSL-waarde, of kopieer uit het uitgelezen palet.',
    ],
    faq: [
      { q: 'Hoe wordt het palet berekend?', a: 'De afbeelding wordt verkleind bemonsterd en de kleuren worden in groepen verdeeld; de meest voorkomende groepen worden getoond. Het is een benadering van de dominante kleuren, geen volledige lijst.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Eén afbeelding tegelijk.',
      'Kleuren worden bemonsterd uit de weergegeven sRGB-pixels; kleurprofielen worden genegeerd.',
    ],
  },
  'image-watermark': {
    name: 'Watermerk op afbeelding',
    description: 'Voeg een tekst- of logowatermerk toe aan veel afbeeldingen tegelijk, enkel of herhaald.',
    metaDescription: 'Voeg gratis online een watermerk toe aan afbeeldingen. Plaats tekst of een logo op JPG-, PNG- en WebP-foto’s in bulk, met dekking en positie. Draait in je browser.',
    steps: [
      'Voeg je afbeeldingen toe.',
      'Kies tekst of een logo en stel de grootte, dekking, positie en indeling in.',
      'Pas het toe en download de resultaten of een ZIP.',
    ],
    faq: [
      { q: 'Kan ik Urdu of andere alfabetten gebruiken?', a: 'Ja. Watermerken op afbeeldingen gebruiken de lettertypen van je apparaat, dus elk schrift dat je systeem kan tonen, werkt.' },
      { q: 'Verandert het mijn originelen?', a: 'Nee. Van een watermerk voorziene kopieën worden als nieuwe bestanden opgeslagen.' },
      { q: 'Blijven EXIF- of locatiegegevens bewaard?', a: 'Nee. Opnieuw coderen via een canvas verwijdert EXIF-metagegevens zoals cameramodel en GPS-locatie, wat vaak precies is wat je wilt voordat je een foto deelt. Kleurprofielen blijven ook niet behouden.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Logobestanden: PNG, JPG of WebP, tot 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG naar PNG / JPG',
    description: 'Zet SVG-vectorafbeeldingen om naar PNG-, JPG- of WebP-afbeeldingen op elk formaat.',
    metaDescription: 'Zet SVG gratis online om naar PNG of JPG. Kies een schaal of exacte breedte voor scherpe resultaten; PNG behoudt transparantie. Draait in je browser.',
    steps: [
      'Voeg je SVG-bestanden toe.',
      'Kies PNG, JPG of WebP en het uitvoerformaat.',
      'Converteer en download.',
    ],
    faq: [
      { q: 'Blijft de afbeelding scherp op grote formaten?', a: 'Ja. De SVG wordt getekend op het formaat dat je kiest, dus een export op 4× is net zo scherp als een op 1×.' },
      { q: 'Waarom ziet mijn SVG er anders uit?', a: 'Browsers ondersteunen niet elke SVG-functie, en SVG’s die op externe lettertypen of afbeeldingen leunen, vallen terug op standaardwaarden. Sluit lettertypen en afbeeldingen in de SVG zelf in voor het beste resultaat.' },
      { q: 'Is het veilig om SVG-bestanden hier te openen?', a: 'Ja. De SVG wordt als afbeelding getekend, dus scripts erin worden niet uitgevoerd.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Maximaal 25 MB per bestand en 20 bestanden per batch.',
      'Lettertypen, afbeeldingen en stijlen die van buiten de SVG worden gekoppeld, worden niet geladen.',
      'Een SVG zonder formaat gebruikt zijn viewBox, of 300 × 150 px als geen van beide is ingesteld.',
    ],
  },
  'enlarge-image': {
    name: 'Afbeelding vergroten',
    description: 'Maak afbeeldingen groter met vloeiende, scherpe herbemonstering, 2× tot 4× of tot een vaste breedte.',
    metaDescription: 'Vergroot afbeeldingen gratis online. Schaal JPG, PNG en WebP op naar 2×, 3×, 4× of een exacte breedte met Lanczos-herbemonstering en optionele verscherping.',
    steps: [
      'Voeg je afbeeldingen toe.',
      'Kies een factor of een doelbreedte, en of je wilt verscherpen.',
      'Vergroot en download.',
    ],
    faq: [
      { q: 'Is dit AI-opschaling?', a: 'Nee. Het gebruikt hoogwaardige herbemonstering, waardoor vergrote afbeeldingen vloeiend en schoon worden, maar het kan geen ontbrekend detail verzinnen. Zeer kleine of wazige foto’s blijven er zacht uitzien.' },
      { q: 'Hoe groot kan het resultaat worden?', a: 'Tot 16.000 px per zijde en ongeveer 100 megapixels, afhankelijk van wat je browser aankan.' },
      { q: 'Blijven EXIF- of locatiegegevens bewaard?', a: 'Nee. Opnieuw coderen via een canvas verwijdert EXIF-metagegevens zoals cameramodel en GPS-locatie, wat vaak precies is wat je wilt voordat je een foto deelt. Kleurprofielen blijven ook niet behouden.' },
    ],
    limits: [
      'Geanimeerde GIF- of WebP-bestanden worden alleen met hun eerste frame geconverteerd.',
      'Maximaal 25 MB per bestand en 20 bestanden per batch, zodat je browser soepel blijft werken.',
      'EXIF-metagegevens en ingesloten kleurprofielen blijven niet behouden.',
      'Er wordt geen detail toegevoegd, dus het is geen AI-opschaling.',
      'De uitvoer is begrensd op 16.000 px per zijde.',
    ],
  },
  'blur-image-area': {
    name: 'Gebied vervagen of pixeleren',
    description: 'Verberg gezichten, kentekens of privédetails door gebieden te vervagen, te pixeleren of af te dekken.',
    metaDescription: 'Vervaag of pixeleer gratis online een deel van een afbeelding. Teken kaders over gezichten, kentekens of tekst en verberg ze, direct in je browser.',
    steps: [
      'Voeg een afbeelding toe.',
      'Sleep over de afbeelding om kaders te tekenen om wat je wilt verbergen.',
      'Kies vervagen, pixeleren of een zwart vak, pas het toe en download.',
    ],
    faq: [
      { q: 'Is vervagen veilig voor gevoelige details?', a: 'Gebruik voor alles wat privé moet blijven, zoals identiteitsnummers of kentekens, het zwarte vak. Vervaging en pixelering kunnen soms deels ongedaan worden gemaakt.' },
      { q: 'Vindt het automatisch gezichten?', a: 'Nee. Je tekent de kaders zelf. Automatische herkenning vraagt een groot AI-model dat niet is meegeleverd.' },
      { q: 'Kan ik me bedenken?', a: 'Ja. Verwijder of teken kaders opnieuw voordat je toepast. Je oorspronkelijke bestand wordt nooit gewijzigd.' },
      { q: 'Blijven EXIF- of locatiegegevens bewaard?', a: 'Nee. Opnieuw coderen via een canvas verwijdert EXIF-metagegevens zoals cameramodel en GPS-locatie, wat vaak precies is wat je wilt voordat je een foto deelt. Kleurprofielen blijven ook niet behouden.' },
    ],
    limits: [
      'Eén afbeelding tegelijk, tot 25 MB.',
      'Gebieden worden met de hand gekozen; er is geen gezichtsherkenning.',
      'Geanimeerde afbeeldingen gebruiken het eerste frame.',
    ],
  },
  'qr-code-scanner': {
    name: 'QR-code scanner',
    description: 'Lees QR-codes uit foto’s en screenshots en zie precies wat ze bevatten.',
    metaDescription: 'Scan gratis online een QR-code uit een afbeelding. Upload een foto of screenshot om de link, tekst of wifigegevens te lezen. Draait in je browser.',
    steps: [
      'Voeg een of meer afbeeldingen met een QR-code toe.',
      'De code wordt automatisch gelezen.',
      'Kopieer het resultaat, of open een link nadat je hem hebt gecontroleerd.',
    ],
    faq: [
      { q: 'Kan ik scannen met mijn camera?', a: 'Nog niet. Deze tool leest QR-codes uit afbeeldingsbestanden. Maak op een telefoon een foto van de code en kies die hier, of gebruik je camera-app.' },
      { q: 'Is het veilig om gescande links te openen?', a: 'Controleer eerst het adres. De volledige link wordt getoond en alleen weblinks (http of https) kunnen vanaf hier worden geopend. Script- en datalinks worden nooit geopend.' },
      { q: 'Waarom is er geen code gevonden?', a: 'De code kan wazig, afgesneden, te klein of te contrastarm zijn. Probeer een scherpere, dichterbij genomen afbeelding die de hele code toont met een duidelijke rand eromheen.' },
      { q: 'Worden mijn afbeeldingen geüpload?', a: 'Nee. De afbeelding wordt in je browser gelezen en deze tool stuurt hem nergens naartoe.' },
    ],
    limits: [
      'Maximaal 10 afbeeldingen, elk 25 MB.',
      'Er wordt één code per afbeelding gelezen.',
      'Alleen standaard QR-codes; andere streepjescodes worden niet ondersteund.',
    ],
  },
  'gif-maker': {
    name: 'GIF maken',
    description: 'Maak van je afbeeldingen een geanimeerde GIF met eigen timing, formaat en herhaling.',
    metaDescription: 'Maak gratis online een geanimeerde GIF van afbeeldingen. Wijzig de volgorde van frames, stel de vertraging per frame in, kies formaat en herhaling en download de GIF. Gemaakt in je browser.',
    steps: [
      'Voeg twee of meer afbeeldingen toe (of één voor een stilstaande GIF).',
      'Sleep ze in de juiste volgorde, stel in hoe lang elk frame zichtbaar is en kies het formaat, de herhaling en de kleuren.',
      'Maak de GIF, bekijk het voorbeeld en download.',
    ],
    faq: [
      { q: 'Waarom is mijn GIF zo groot?', a: 'GIF’s slaan elk frame op als een afbeelding die beperkt is tot 256 kleuren. Minder frames, een kleinere breedte en minder kleuren maken het bestand allemaal kleiner. De tool toont de grootte zodra de GIF is gemaakt.' },
      { q: 'Kan ik transparante delen behouden?', a: 'Ja, zet "Transparante delen behouden" aan voor PNG- of WebP-afbeeldingen met transparantie. GIF-transparantie staat per pixel aan of uit, dus zachte randen worden hard.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Maximaal 100 frames; hoe groter de frames, hoe meer geheugen je browser nodig heeft.',
      'GIF’s zijn beperkt tot 256 kleuren per frame, dus foto’s kunnen korrelig ogen.',
      'Geanimeerde invoer (GIF, WebP) levert alleen zijn eerste frame.',
    ],
  },
  'photo-editor': {
    name: 'Fotobewerker',
    description: 'Pas een foto aan, geef hem een filter, roteer, snijd bij en voeg tekst toe, met live voorbeeld.',
    metaDescription: 'Gratis online fotobewerker. Pas kleuren aan, pas filters toe, roteer, rechtzet, snijd bij en voeg tekst toe en download een PNG, JPG of WebP. Privé, in je browser.',
    steps: [
      'Voeg een foto toe.',
      'Gebruik de tabbladen om kleuren aan te passen, een filter toe te passen, te roteren of bij te snijden en tekst toe te voegen. Het voorbeeld wordt direct bijgewerkt.',
      'Kies het formaat en download je bewerkte foto.',
    ],
    faq: [
      { q: 'Wordt het originele bestand gewijzigd?', a: 'Nee. Je bestand wordt nooit aangepast; de bewerkte afbeelding wordt als nieuwe download gemaakt.' },
      { q: 'Gaat er kwaliteit verloren bij het exporteren?', a: 'PNG behoudt elke pixel. JPG en WebP zijn verliesgevend; gebruik een kwaliteit van 90 of hoger om foto’s er hetzelfde uit te laten zien. Bewerkingen worden toegepast op het volledige formaat van je afbeelding, niet op het formaat van het voorbeeld.' },
      { q: 'Worden mijn afbeeldingen naar een server geüpload?', a: 'Nee. De afbeelding wordt door je browser gedecodeerd en opnieuw gecodeerd met de Canvas API. Deze tool stuurt het bestand nergens naartoe.' },
    ],
    limits: [
      'Eén foto tegelijk, tot 25 MB en ongeveer 50 megapixels.',
      'Bewerkingen worden in een vaste volgorde toegepast: roteren en bijsnijden, kleuraanpassingen, vervagen en verscherpen, vignet en daarna tekst.',
      'EXIF-gegevens zoals de locatie worden niet naar de bewerkte afbeelding gekopieerd.',
      'Geen lagen, penselen of AI-functies.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG naar PDF',
    description: 'Zet JPG-foto’s om naar een pdf, met één afbeelding per pagina.',
    metaDescription: 'Zet JPG gratis online om naar PDF. Kies paginaformaat, afdrukstand en marges. JPEG-gegevens worden ingesloten zonder hercompressie.',
    steps: [
      'Voeg je JPG-bestanden toe en bepaal de volgorde door te slepen of de pijlen te gebruiken.',
      'Kies het paginaformaat, de afdrukstand en de marge.',
      'Maak de pdf en download hem.',
    ],
    faq: [
      { q: 'Gaat de beeldkwaliteit achteruit?', a: 'Nee. JPG-bestanden worden ongewijzigd in de pdf ingesloten, zonder hercompressie.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Maximaal 25 MB per afbeelding en 100 afbeeldingen per pdf.',
      'Hier worden alleen JPG-afbeeldingen geaccepteerd; gebruik Afbeeldingen naar PDF voor gemengde formaten.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG naar PDF',
    description: 'Zet PNG-afbeeldingen om naar een pdf, met behoud van transparantie.',
    metaDescription: 'Zet PNG gratis online om naar PDF. Kies paginaformaat en marges; transparantie blijft behouden. Draait in je browser.',
    steps: [
      'Voeg je PNG-bestanden toe en bepaal de volgorde.',
      'Kies het paginaformaat, de afdrukstand en de marge.',
      'Maak de pdf en download hem.',
    ],
    faq: [
      { q: 'Blijft de transparantie behouden?', a: 'Ja. PNG-afbeeldingen worden met hun alfakanaal ingesloten, dus transparante delen tonen de witte pagina erachter.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Maximaal 25 MB per afbeelding en 100 afbeeldingen per pdf.',
      'Hier worden alleen PNG-afbeeldingen geaccepteerd; gebruik Afbeeldingen naar PDF voor gemengde formaten.',
    ],
  },
  'images-to-pdf': {
    name: 'Afbeeldingen naar PDF',
    description: 'Combineer JPG- en PNG-afbeeldingen tot één pdf in de volgorde die jij kiest.',
    metaDescription: 'Combineer gratis online meerdere afbeeldingen tot één pdf. Wijzig de paginavolgorde, kies paginaformaat en marges. Verwerkt in je browser.',
    steps: [
      'Voeg JPG- en PNG-afbeeldingen toe (sleep er meerdere tegelijk neer).',
      'Wijzig de volgorde en kies paginaformaat, afdrukstand en marge.',
      'Maak de pdf en download hem.',
    ],
    faq: [
      { q: 'Welke afbeeldingsformaten werken?', a: 'JPG en PNG worden rechtstreeks ingesloten. WebP, GIF en BMP worden eerst naar PNG omgezet als je browser ze kan decoderen.' },
      { q: 'Wat doet "Aanpassen aan afbeelding"?', a: 'Elke pagina krijgt het formaat van zijn afbeelding, dus er wordt niets geschaald of opgevuld. Kies A4 of Letter voor standaard documentpagina’s.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Maximaal 25 MB per afbeelding en 100 afbeeldingen per pdf.',
    ],
  },
  'merge-pdf': {
    name: 'PDF samenvoegen',
    description: 'Voeg meerdere pdf-bestanden samen tot één document in de volgorde die jij kiest.',
    metaDescription: 'Voeg pdf-bestanden gratis online samen. Combineer meerdere pdf’s tot één, wijzig de volgorde en download direct. Verwerkt in je browser.',
    steps: [
      'Voeg twee of meer pdf-bestanden toe.',
      'Zet ze met de pijlen in de gewenste volgorde.',
      'Voeg samen en download de gecombineerde pdf.',
    ],
    faq: [
      { q: 'Blijven bladwijzers en formuliervelden behouden?', a: 'Pagina’s worden gekopieerd met hun zichtbare inhoud en links. Bladwijzers op documentniveau en interactieve formuliergegevens worden niet meegenomen.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Bladwijzers/inhoudsopgaven en formuliervelden van de bronbestanden worden niet samengevoegd.',
    ],
  },
  'split-pdf': {
    name: 'PDF splitsen',
    description: 'Splits een pdf op paginabereik, in losse pagina’s of in delen van vaste grootte.',
    metaDescription: 'Splits een pdf gratis online. Verdeel op paginabereik, elke pagina of elke N pagina’s en download als ZIP. Draait in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies hoe je splitst: eigen bereiken zoals 1-3, 4-6, elke pagina of elke N pagina’s.',
      'Splits en download de delen afzonderlijk of als ZIP.',
    ],
    faq: [
      { q: 'Hoe schrijf ik bereiken op?', a: 'Scheid uitvoerbestanden met komma’s. Elk bestand kan een bereik (1-3), een enkele pagina (5) of een combinatie zijn, gescheiden door een plusteken (1-2+7). Voorbeeld: 1-3, 4-6, 7+9.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
    ],
  },
  'rotate-pdf': {
    name: 'PDF roteren',
    description: 'Roteer losse pagina’s of de hele pdf, met miniatuurvoorbeelden.',
    metaDescription: 'Roteer pdf-pagina’s gratis online. Draai losse pagina’s of alle pagina’s 90, 180 of 270 graden en sla een nieuwe pdf op. Draait in je browser.',
    steps: [
      'Voeg een pdf toe; de pagina’s verschijnen als miniaturen.',
      'Roteer losse pagina’s, of roteer alles tegelijk.',
      'Sla de geroteerde pdf op.',
    ],
    faq: [
      { q: 'Is de rotatie blijvend?', a: 'Ze wordt in de nieuwe pdf opgeslagen als een paginarotatie-attribuut. De paginainhoud wordt niet opnieuw getekend, dus er gaat niets verloren.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
    ],
  },
  'extract-pdf-pages': {
    name: 'PDF-pagina’s extraheren',
    description: 'Kies de pagina’s die je nodig hebt uit een pdf en sla ze op als nieuw document.',
    metaDescription: 'Extraheer gratis online pagina’s uit een pdf. Selecteer pagina’s visueel of op bereik en sla een nieuwe pdf op. Verwerkt in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Klik op paginaminiaturen om ze te selecteren, of typ een bereik zoals 1-3, 8.',
      'Extraheer en download de nieuwe pdf.',
    ],
    faq: [
      { q: 'Kan ik hiermee pagina’s verwijderen?', a: 'Ja. Selecteer de pagina’s die je wilt houden en extraheer ze; de rest blijft buiten het nieuwe bestand.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'PDF-pagina’s herschikken',
    description: 'Herschik, verwijder en roteer pagina’s visueel en sla het resultaat op.',
    metaDescription: 'Wijzig gratis online de volgorde van pdf-pagina’s. Sleep of verplaats pagina’s, verwijder pagina’s die je niet nodig hebt en sla een nieuwe pdf op. Draait in je browser.',
    steps: [
      'Voeg een pdf toe; de pagina’s verschijnen als miniaturen.',
      'Sleep pagina’s, of gebruik de pijlknoppen, om de volgorde te wijzigen. Verwijder pagina’s die je niet nodig hebt.',
      'Sla de herschikte pdf op.',
    ],
    faq: [
      { q: 'Kan ik herschikken met het toetsenbord?', a: 'Ja. Gebruik de knoppen voor eerder en later verplaatsen bij elke pagina.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF naar JPG',
    description: 'Render pdf-pagina’s als JPG-afbeeldingen op de resolutie die je kiest.',
    metaDescription: 'Zet PDF gratis online om naar JPG. Render elke pagina of een selectie op maximaal 300 DPI en download een ZIP. Draait in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies de resolutie en eventueel welke pagina’s je wilt converteren.',
      'Converteer en download de afbeeldingen afzonderlijk of als ZIP.',
    ],
    faq: [
      { q: 'Welke resolutie moet ik kiezen?', a: '150 DPI is geschikt voor schermen; 300 DPI voor afdrukken. Hogere waarden geven grotere afbeeldingen en vragen meer geheugen.' },
      { q: 'Worden pagina’s nauwkeurig weergegeven?', a: 'De weergave gebruikt PDF.js van Mozilla, dat de meeste pdf’s goed aankan. Ongebruikelijke lettertypen of geavanceerde graphics kunnen iets afwijken van andere viewers.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Elke pagina is begrensd op ongeveer 50 megapixels.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF naar PNG',
    description: 'Render pdf-pagina’s als scherpe, verliesvrije PNG-afbeeldingen.',
    metaDescription: 'Zet PDF gratis online om naar PNG. Render pagina’s op maximaal 300 DPI als verliesvrije afbeeldingen en download een ZIP. Draait in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies de resolutie en de pagina’s.',
      'Converteer en download de afbeeldingen afzonderlijk of als ZIP.',
    ],
    faq: [
      { q: 'Waarom PNG kiezen boven JPG?', a: 'PNG blijft scherp bij tekst en lijntekeningen en ondersteunt transparantie. De bestanden zijn groter dan JPG.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Elke pagina is begrensd op ongeveer 50 megapixels.',
    ],
  },
  'pdf-viewer': {
    name: 'PDF-viewer',
    description: 'Open en lees een pdf privé in je browser, met zoomen en paginanavigatie.',
    metaDescription: 'Bekijk pdf-bestanden gratis online. Zoom, spring naar een pagina en lees documenten in je browser zonder ze ergens te uploaden.',
    steps: [
      'Voeg een pdf toe.',
      'Scrol of gebruik de paginabediening om te navigeren.',
      'Zoom in of uit zoals nodig.',
    ],
    faq: [
      { q: 'Kan ik de pdf hier bewerken of van aantekeningen voorzien?', a: 'Nee. Dit is een viewer die alleen leest. Gebruik de paginatools om pagina’s te roteren, te herschikken of te extraheren.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Alleen lezen: geen aantekeningen, formulieren invullen of tekst zoeken.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'PDF-metagegevens bekijken',
    description: 'Bekijk de titel, auteur, aanmaakdatums, het aantal pagina’s, de paginaformaten en de versie van een pdf.',
    metaDescription: 'Bekijk pdf-metagegevens gratis online. Zie titel, auteur, producent, datums, aantal pagina’s en paginaformaten zonder het bestand te uploaden.',
    steps: [
      'Voeg een pdf toe.',
      'Bekijk de documenteigenschappen.',
      'Kopieer de gegevens als JSON als je ze nodig hebt.',
    ],
    faq: [
      { q: 'Waarom ontbreken sommige metagegevens?', a: 'Veel pdf’s stellen niet elk veld in. Alleen velden die echt in het bestand staan, worden getoond.' },
      { q: 'Kan ik metagegevens verwijderen?', a: 'Deze tool leest metagegevens alleen. Het bestand wordt niet gewijzigd.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Alleen lezen: metagegevens kunnen hier niet worden bewerkt of verwijderd.',
    ],
  },
  'remove-pdf-pages': {
    name: 'PDF-pagina’s verwijderen',
    description: 'Verwijder de pagina’s die je niet nodig hebt en sla de rest op als nieuwe pdf.',
    metaDescription: 'Verwijder gratis online pagina’s uit een pdf. Selecteer pagina’s visueel of op bereik, verwijder ze en download de rest. Verwerkt in je browser.',
    steps: [
      'Voeg een pdf toe; de pagina’s verschijnen als miniaturen.',
      'Klik op de pagina’s die je wilt verwijderen, of typ een bereik zoals 2, 5-7.',
      'Verwijder ze en download de nieuwe pdf.',
    ],
    faq: [
      { q: 'Wordt mijn oorspronkelijke bestand gewijzigd?', a: 'Nee. Je krijgt een nieuwe pdf zonder de geselecteerde pagina’s. Je origineel blijft zoals het was.' },
      { q: 'Kan ik alle pagina’s verwijderen?', a: 'Nee. Er moet minstens één pagina overblijven.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
    ],
  },
  'add-page-numbers': {
    name: 'Paginanummers toevoegen',
    description: 'Nummer de pagina’s van een pdf met een positie, notatie en stijl naar keuze.',
    metaDescription: 'Voeg gratis online paginanummers toe aan een pdf. Kies de positie, een notatie zoals “Pagina 1 van 10”, het beginnummer en de lettergrootte. Draait in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies waar de nummers komen, hun notatie en welke pagina’s genummerd worden.',
      'Voeg de nummers toe en download de pdf.',
    ],
    faq: [
      { q: 'Kan ik de voorpagina overslaan?', a: 'Ja. Stel “Eerste pagina om te nummeren” in op 2 en kies daarna welk nummer die pagina moet tonen.' },
      { q: 'Werkt het ook op geroteerde pagina’s?', a: 'Ja. Nummers worden geplaatst ten opzichte van wat je op het scherm ziet, ook bij geroteerde pagina’s.' },
      { q: 'Welk lettertype wordt gebruikt?', a: 'Helvetica, dat cijfers en Latijnse letters dekt.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Nummers worden bovenop elke pagina getekend, nooit achter bestaande inhoud.',
      'Gebruikt het ingebouwde lettertype Helvetica.',
    ],
  },
  'watermark-pdf': {
    name: 'Watermerk op PDF',
    description: 'Plaats tekst of een afbeelding over je pdf-pagina’s, met instelbare dekking en hoek.',
    metaDescription: 'Voeg gratis online een watermerk toe aan een pdf. Plaats tekst of een afbeelding, gecentreerd of herhaald, met eigen dekking en rotatie. Verwerkt in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies een tekst- of afbeeldingswatermerk en stel de grootte, dekking, hoek en indeling in.',
      'Pas het toe op alle pagina’s of een selectie en download.',
    ],
    faq: [
      { q: 'Kan het watermerk worden verwijderd?', a: 'Het wordt bovenop de pagina getekend en is geen beveiligingsfunctie. Wie een pdf-editor heeft, kan het verwijderen. Combineer het met PDF beveiligen voor sterkere bescherming.' },
      { q: 'Kan ik Urdu, Arabisch of andere alfabetten gebruiken?', a: 'Niet als getypte tekst, omdat de ingebouwde lettertypen van pdf alleen Latijnse letters dekken. Maak een transparante PNG van je tekst en gebruik in plaats daarvan de afbeeldingsoptie.' },
      { q: 'Staat het watermerk voor of achter de paginatekst?', a: 'Ervoor. Verlaag de dekking zodat de pagina leesbaar blijft.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Tekstwatermerken ondersteunen alleen Latijnse letters, cijfers en gangbare symbolen.',
      'Watermerkafbeeldingen: PNG of JPG, tot 5 MB.',
      'Het merk wordt bovenop de bestaande paginainhoud getekend.',
    ],
  },
  'crop-pdf': {
    name: 'PDF bijsnijden',
    description: 'Snijd marges weg of behoud op elke pagina een gekozen gebied, met live paginavoorbeeld.',
    metaDescription: 'Snijd pdf-pagina’s gratis online bij. Sleep een uitsnedekader op een paginavoorbeeld of typ marges en pas het toe op alle of geselecteerde pagina’s. Draait in je browser.',
    steps: [
      'Voeg een pdf toe en kies een pagina voor het voorbeeld.',
      'Sleep het kader of typ marges om het gebied te selecteren dat je wilt houden.',
      'Kies welke pagina’s je wilt bijsnijden en download.',
    ],
    faq: [
      { q: 'Wordt de weggesneden inhoud verwijderd?', a: 'Nee. Bijsnijden verandert het zichtbare gebied van elke pagina, maar de inhoud daarbuiten zit nog steeds in het bestand. Vertrouw er niet op dat bijsnijden gevoelige informatie verbergt.' },
      { q: 'Wat als mijn pagina’s verschillende formaten hebben?', a: 'Dezelfde verhoudingen worden toegepast op elke gekozen pagina, dus pagina’s van verschillende formaten worden met hetzelfde percentage bijgesneden.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Bijsnijden verbergt inhoud; het verwijdert die niet.',
      'Het uitsnedegebied is een deel van elke pagina, geen vast formaat in millimeters.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'PDF-metagegevens bewerken',
    description: 'Wijzig de titel, auteur, het onderwerp en de trefwoorden van een pdf, of verwijder alle metagegevens.',
    metaDescription: 'Bewerk pdf-metagegevens gratis online. Wijzig titel, auteur, onderwerp en trefwoorden, of wis alle documenteigenschappen. Verwerkt in je browser.',
    steps: [
      'Voeg een pdf toe; de huidige eigenschappen worden ingevuld.',
      'Bewerk de velden, of kies Alle metagegevens verwijderen.',
      'Sla op en download de bijgewerkte pdf.',
    ],
    faq: [
      { q: 'Wat verwijdert “Alle metagegevens verwijderen”?', a: 'De documentinformatie (titel, auteur, onderwerp, trefwoorden, maker, producent en datums) en de ingesloten XMP-metagegevens. De paginatekst, afbeeldingen en opmerkingen blijven ongemoeid.' },
      { q: 'Waarom metagegevens bewerken?', a: 'Om een verkeerde titel te herstellen die in browsertabbladen en zoekresultaten staat, om de juiste auteur te vermelden, of om persoonlijke gegevens te verwijderen voordat je een bestand deelt.' },
      { q: 'Ondersteunt het niet-Latijnse tekst?', a: 'Ja. Titels en auteurs in Urdu, Arabisch, Chinees en andere schriften worden correct opgeslagen.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Alleen eigenschappen op documentniveau worden gewijzigd. Opmerkingen, formuliergegevens en paginainhoud blijven zoals ze zijn.',
    ],
  },
  'protect-pdf': {
    name: 'PDF beveiligen',
    description: 'Vergrendel een pdf met een wachtwoord via AES-256-versleuteling.',
    metaDescription: 'Beveilig een pdf gratis online met een wachtwoord. AES-256-versleuteling gebeurt in je browser; je bestand en wachtwoord worden nooit geüpload.',
    steps: [
      'Voeg een pdf toe.',
      'Typ twee keer een wachtwoord en kies wat lezers mogen doen (afdrukken, kopiëren, bewerken).',
      'Beveilig hem en download de versleutelde kopie.',
    ],
    faq: [
      { q: 'Hoe sterk is de beveiliging?', a: 'Bestanden worden versleuteld met AES-256, de sterkste standaard voor pdf-versleuteling. In de praktijk hangt de veiligheid af van je wachtwoord: kies een lang wachtwoord dat je nergens anders gebruikt.' },
      { q: 'Wat als ik het wachtwoord vergeet?', a: 'Het kan niet worden hersteld. Er wordt niets opgeslagen of verstuurd en er is geen reset. Bewaar je originele bestand en het wachtwoord op een veilige plek.' },
      { q: 'Worden de opties voor afdrukken, kopiëren en bewerken afgedwongen?', a: 'Het zijn verzoeken die de meeste pdf-programma’s respecteren, maar ze zijn niet onbreekbaar. Het wachtwoord is wat het bestand echt beschermt.' },
      { q: 'Wordt mijn wachtwoord geüpload?', a: 'Nee. De versleuteling gebeurt in je browser.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Wachtwoorden: tot 127 standaardtekens (letters, cijfers en symbolen).',
      'Een pdf die al een wachtwoord heeft, moet eerst worden ontgrendeld.',
      'Zeer oude pdf-lezers (van vóór ongeveer 2008) openen AES-256-bestanden mogelijk niet.',
    ],
  },
  'unlock-pdf': {
    name: 'PDF ontgrendelen',
    description: 'Verwijder het wachtwoord van een pdf waartoe je toegang hebt, zodat hij vrij opent.',
    metaDescription: 'Ontgrendel een met een wachtwoord beveiligde pdf gratis online. Voer het wachtwoord in om een onbeveiligde kopie op te slaan, verwerkt in je browser en nooit geüpload.',
    steps: [
      'Voeg de beveiligde pdf toe.',
      'Voer het wachtwoord in als erom wordt gevraagd. Pdf’s die alleen afdrukken of kopiëren beperken, hebben er geen nodig.',
      'Download de ontgrendelde kopie.',
    ],
    faq: [
      { q: 'Kan het een pdf ontgrendelen als ik het wachtwoord ben vergeten?', a: 'Nee. Deze tool raadt of kraakt nooit wachtwoorden. Hij verwijdert de beveiliging alleen als je het juiste wachtwoord geeft, of als het bestand slechts acties zoals afdrukken beperkt.' },
      { q: 'Is dit toegestaan?', a: 'Gebruik het alleen op bestanden die van jou zijn of die je mag openen. Jij bent verantwoordelijk voor hoe je het resultaat gebruikt.' },
      { q: 'Wordt mijn wachtwoord geüpload?', a: 'Nee. Alles gebeurt in je browser.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Ondersteunt standaard pdf-wachtwoordbeveiliging (RC4 en AES).',
      'Een digitale handtekening wordt ongeldig zodra het bestand opnieuw wordt opgeslagen.',
      'Bestanden met certificaatgebaseerde beveiliging of DRM worden niet ondersteund.',
    ],
  },
  'extract-pdf-text': {
    name: 'Tekst uit PDF extraheren',
    description: 'Kopieer alle selecteerbare tekst uit een pdf, pagina voor pagina.',
    metaDescription: 'Extraheer gratis online tekst uit een pdf. Haal de selecteerbare tekst van elke pagina of een bereik op, kopieer hem of sla hem op als .txt. Draait in je browser.',
    steps: [
      'Voeg een pdf toe.',
      'Kies alle pagina’s of een bereik, en of je pagina-einden wilt markeren.',
      'Kopieer de tekst of download hem als .txt-bestand.',
    ],
    faq: [
      { q: 'Waarom is het resultaat leeg?', a: 'De pdf is waarschijnlijk een scan, dus een afbeelding van tekst in plaats van echte tekst. Om hem te lezen is OCR (tekstherkenning) nodig, wat deze tool niet doet.' },
      { q: 'Blijft de opmaak behouden?', a: 'Regels en alinea’s worden zo goed mogelijk opnieuw opgebouwd, maar kolommen, tabellen en voetnoten kunnen in een andere volgorde uitkomen.' },
      { q: 'Kan het met een wachtwoord beveiligde pdf’s openen?', a: 'Nee. Versleutelde pdf’s worden herkend en met een duidelijke melding geweigerd. Verwijder eerst het wachtwoord met onze tool PDF ontgrendelen.' },
    ],
    limits: [
      'Maximaal 100 MB per pdf.',
      'Met een wachtwoord beveiligde (versleutelde) pdf’s worden niet ondersteund.',
      'Zeer grote of complexe pdf’s hangen af van het geheugen van je apparaat.',
      'Alleen echte tekst wordt geëxtraheerd; gescande pagina’s hebben OCR nodig.',
      'De leesvolgorde volgt de pdf en kan bij complexe opmaak afwijken van de visuele volgorde.',
    ],
  },
  'compress-pdf': {
    name: 'PDF comprimeren',
    description: 'Maak een pdf kleiner door de afbeeldingen opnieuw te comprimeren terwijl de tekst selecteerbaar blijft.',
    metaDescription: 'Comprimeer een pdf gratis online. Comprimeer ingesloten afbeeldingen opnieuw om het bestand kleiner te maken terwijl tekst selecteerbaar blijft, of maak pagina’s plat voor het kleinste bestand. Draait in je browser.',
    steps: [
      'Voeg je pdf toe.',
      'Kies hoe je comprimeert en hoe sterk: de standaardmodus houdt tekst selecteerbaar en comprimeert alleen afbeeldingen opnieuw.',
      'Comprimeer, controleer hoeveel je hebt bespaard en download het resultaat.',
    ],
    faq: [
      { q: 'Waarom is mijn pdf nauwelijks kleiner geworden?', a: 'De standaardmodus comprimeert JPEG-afbeeldingen opnieuw, dus het helpt het meest bij pdf’s vol foto’s of scans. Een pdf die vooral uit tekst bestaat, of waarvan de afbeeldingen al klein zijn, kan niet veel krimpen. De tool meldt het als er niets bespaard kon worden, in plaats van te doen alsof.' },
      { q: 'Wordt de kwaliteit slechter?', a: 'Afbeeldingen verliezen wat detail in ruil voor grootte; Licht houdt ze bijna ongewijzigd en Sterk maakt ze zichtbaar zachter. Tekst en vectorafbeeldingen worden in de standaardmodus niet aangeraakt. De modus “Maximaal” maakt van elke pagina een afbeelding, waardoor tekst niet meer kan worden geselecteerd of doorzocht.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Alleen ingesloten JPEG-afbeeldingen worden opnieuw gecomprimeerd. Afbeeldingen in PNG-stijl (Flate), lettertypen en andere inhoud blijven zoals ze zijn.',
      'De modus Maximaal zet elke pagina om in een afbeelding: tekst, links en formuliervelden werken niet meer en het bestand kan niet worden doorzocht.',
      'De kleuren van opnieuw gecomprimeerde afbeeldingen kunnen heel licht verschuiven.',
      'Maximaal 100 MB per pdf. Met een wachtwoord beveiligde pdf’s moeten eerst worden ontgrendeld.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Herken de tekst in gescande pdf’s (Engels) en krijg een doorzoekbare pdf.',
    metaDescription: 'OCR op pdf gratis online. Herken Engelse tekst in gescande pdf’s en download een doorzoekbare pdf of platte tekst. De OCR-engine draait lokaal in je browser.',
    steps: [
      'Voeg een gescande pdf toe.',
      'Kies de pagina’s en de kwaliteit. Pagina’s die al selecteerbare tekst bevatten, kunnen worden overgeslagen.',
      'Voer OCR uit, controleer de herkende tekst en download de doorzoekbare pdf of een tekstbestand.',
    ],
    faq: [
      { q: 'Welke talen worden ondersteund?', a: 'Voorlopig alleen Engels. Tekst in andere talen wordt verkeerd gelezen. Er kunnen later meer talen worden toegevoegd zonder dat de werking van de tool verandert.' },
      { q: 'Wordt mijn document naar een OCR-dienst gestuurd?', a: 'Nee. De herkenningsengine (Tesseract, gecompileerd naar WebAssembly) en de Engelse gegevens worden vanaf deze website aangeboden en draaien in je browser. Het document wordt niet geüpload.' },
      { q: 'Hoe nauwkeurig is het?', a: 'Schone, rechte scans van gedrukte tekst op 200 tot 300 DPI werken het best. Handschrift, zeer kleine letters, pagina’s met weinig contrast of scheve pagina’s geven meer fouten. Controleer belangrijke getallen altijd.' },
    ],
    limits: [
      'Alleen Engels. Handschrift wordt niet betrouwbaar herkend.',
      'De originele pagina’s blijven precies zoals ze zijn; er wordt een onzichtbare tekstlaag toegevoegd zodat de tekst kan worden doorzocht en gekopieerd.',
      'OCR is langzaam bij grote documenten (enkele seconden per pagina). De eerste keer wordt ook de engine geladen (ongeveer 3 MB).',
      'Maximaal 100 MB per pdf. Zeer grote pagina’s kunnen worden geweigerd om je browser te beschermen.',
    ],
  },
  'sign-pdf': {
    name: 'PDF ondertekenen',
    description: 'Teken, typ of upload een handtekening en plaats die op je pdf-pagina’s.',
    metaDescription: 'Onderteken een pdf gratis online. Teken, typ of upload je handtekening, plaats hem op elke pagina en download de ondertekende pdf. Visuele handtekening, in je browser.',
    steps: [
      'Voeg de pdf toe die je wilt ondertekenen.',
      'Maak je handtekening door hem te tekenen, je naam te typen of een afbeelding te uploaden.',
      'Sleep de handtekening naar de juiste plek op de pagina, kies welke pagina’s hem krijgen en download de ondertekende pdf.',
    ],
    faq: [
      { q: 'Is dit een juridisch bindende digitale handtekening?', a: 'Het is een visuele handtekening: een afbeelding van je handtekening op de pagina. Het is geen cryptografische digitale handtekening, heeft geen certificaat en kan niet aantonen wie heeft ondertekend of latere wijzigingen opsporen. Of het wordt geaccepteerd, hangt af van wie erom vraagt. Sommige organisaties eisen gecertificeerde e-handtekeningdiensten.' },
      { q: 'Wordt mijn handtekening ergens opgeslagen?', a: 'Nee. Hij wordt in je browser gemaakt, alleen voor dit bestand gebruikt en vergeten zodra je de pagina verlaat of opnieuw laadt.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Alleen een visuele handtekening: geen certificaat, geen tijdstempel, geen detectie van manipulatie.',
      'De handtekening wordt als afbeelding bovenop de pagina geplaatst; hij vult geen handtekeningveld in een formulier.',
      'Maximaal 100 MB per pdf. Met een wachtwoord beveiligde pdf’s moeten eerst worden ontgrendeld.',
    ],
  },
  'fill-pdf-forms': {
    name: 'PDF-formulieren invullen',
    description: 'Vul de tekstvakken, selectievakjes en menu’s van een invulbaar pdf-formulier in.',
    metaDescription: 'Vul pdf-formulieren gratis online in. Typ in velden, vink selectievakjes aan en kies opties in een invulbare pdf en download hem bewerkbaar of vlakgemaakt. In je browser.',
    steps: [
      'Voeg een invulbaar pdf-formulier toe.',
      'Vul de velden in die onder de bestandsnaam staan. Velden zijn per pagina gegroepeerd.',
      'Kies of het formulier bewerkbaar blijft of wordt vlakgemaakt en download de ingevulde pdf.',
    ],
    faq: [
      { q: 'Mijn pdf toont geen velden. Waarom?', a: 'Alleen pdf’s met echte formuliervelden kunnen hier worden ingevuld. Een formulier dat alleen een afbeelding of gewone tekst is, heeft geen velden; gebruik PDF ondertekenen om een handtekening te plaatsen, of de tool Watermerk op PDF om tekst toe te voegen. Formulieren gemaakt met XFA (sommige overheids- en bankformulieren) worden niet ondersteund.' },
      { q: 'Wat doet vlakmaken?', a: 'Vlakmaken brandt je antwoorden in de pagina en verwijdert de formuliervelden, zodat de antwoorden niet meer te bewerken zijn. Gebruik het voor de kopie die je verstuurt; bewaar zelf een bewerkbare kopie.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Tekst kan Latijnse letters, cijfers en gangbare symbolen bevatten (het formulierlettertype heeft geen andere alfabetten).',
      'Handtekeningvelden en knoppen worden getoond maar kunnen niet worden ingevuld; gebruik PDF ondertekenen voor handtekeningen.',
      'XFA-formulieren (dynamisch) worden niet ondersteund.',
      'Maximaal 100 MB per pdf.',
    ],
  },
  'redact-pdf': {
    name: 'PDF censureren',
    description: 'Maak tekst en gebieden definitief zwart: gecensureerde pagina’s worden opnieuw opgebouwd als afbeeldingen.',
    metaDescription: 'Censureer een pdf gratis online. Maak namen, nummers en gebieden zwart zodat de tekst eronder echt wordt verwijderd, niet alleen bedekt. Draait in je browser; er wordt niets geüpload.',
    steps: [
      'Voeg je pdf toe en kies een pagina.',
      'Teken kaders over wat moet verdwijnen, of zoek naar woorden, e-mailadressen en nummers om ze automatisch te markeren.',
      'Pas de censuur toe en download. Controleer het resultaat altijd voordat je het deelt.',
    ],
    faq: [
      { q: 'Wordt de verborgen tekst echt verwijderd?', a: 'Ja. Elke pagina met censuur wordt opnieuw opgebouwd als afbeelding waarin de zwarte vlakken zijn geschilderd, dus de tekst en objecten eronder bestaan niet meer in het nieuwe bestand. Een zwarte rechthoek bovenop tekst, zoals veel tools doen, laat de tekst selecteerbaar. Pagina’s die je niet hebt gecensureerd, worden ongewijzigd gekopieerd.' },
      { q: 'Waarom kan ik op gecensureerde pagina’s geen tekst meer selecteren?', a: 'Omdat die pagina’s nu afbeeldingen zijn. Zo wordt de onderliggende inhoud vernietigd. Gebruik daarna OCR PDF als je doorzoekbare tekst nodig hebt; de gecensureerde woorden blijven zwart.' },
      { q: 'Vindt het automatisch elke overeenkomst?', a: 'Zoeken markeert overeenkomsten die binnen één tekstregel staan. Een zin die een pdf in stukken splitst, of tekst die deel uitmaakt van een afbeelding, kan worden gemist. Controleer elke pagina en teken waar nodig handmatig kaders.' },
    ],
    limits: [
      'Gecensureerde pagina’s worden afbeeldingen: op die pagina’s geen selecteerbare tekst, links of formuliervelden meer.',
      'Automatisch zoeken werkt alleen op selecteerbare tekst en alleen binnen één tekstfragment; gescande pagina’s vragen om met de hand getekende kaders.',
      'Documenteigenschappen (titel, auteur…) worden uit het resultaat verwijderd, tenzij je ervoor kiest ze te behouden.',
      'Maximaal 100 MB per pdf.',
    ],
  },
  'compare-pdf': {
    name: 'PDF vergelijken',
    description: 'Zie wat er tussen twee pdf’s is veranderd: tekstverschillen en gemarkeerde pagina’s.',
    metaDescription: 'Vergelijk twee pdf-bestanden gratis online. Zie pagina voor pagina toegevoegde en verwijderde woorden en markeer visuele verschillen tussen versies. Verwerkt in je browser.',
    steps: [
      'Voeg de originele pdf en de herziene pdf toe.',
      'Vergelijk ze: de pagina’s worden opgesomd met het aantal toegevoegde en verwijderde woorden.',
      'Open een pagina om de tekstwijzigingen te lezen, of schakel over naar de visuele weergave om gewijzigde gebieden in rood te zien.',
    ],
    faq: [
      { q: 'Wat toont de tekstvergelijking?', a: 'Per pagina de woorden die tussen het originele en het herziene document zijn toegevoegd (groen) en verwijderd (rood), met de ongewijzigde tekst ingeklapt. Pagina’s worden op nummer gekoppeld.' },
      { q: 'En gescande pdf’s?', a: 'Scans hebben geen selecteerbare tekst, dus de tekstvergelijking vindt niets. Gebruik de visuele vergelijking, of voer eerst OCR PDF uit op beide bestanden.' },
      { q: 'Wordt mijn pdf ergens geüpload?', a: 'Nee. De pdf wordt door je browser gelezen en herschreven. Deze tool stuurt het bestand niet naar een server.' },
    ],
    limits: [
      'Pagina’s worden op nummer vergeleken: als er een pagina is ingevoegd, lijken latere pagina’s gewijzigd.',
      'De visuele vergelijking rendert elke pagina op schermresolutie; kleinere verschillen daaronder worden mogelijk niet getoond.',
      'Tot 100 pagina’s per bestand worden vergeleken. Met een wachtwoord beveiligde pdf’s moeten eerst worden ontgrendeld.',
    ],
  },
  'word-counter': {
    name: 'Woordenteller',
    description: 'Tel woorden, tekens en zinnen en schat de leestijd terwijl je typt.',
    metaDescription: 'Gratis online woordenteller. Tel direct woorden, tekens, zinnen en alinea’s en schat de lees- en spreektijd.',
    steps: [
      'Typ of plak je tekst.',
      'Lees de live statistieken boven de editor.',
      'Gebruik Wissen om opnieuw te beginnen.',
    ],
    faq: [
      { q: 'Hoe worden woorden geteld?', a: 'Een woord is elke reeks tekens gescheiden door witruimte. Woorden met een koppelteken tellen als één en getallen tellen als woorden.' },
      { q: 'Hoe wordt de leestijd berekend?', a: 'De leestijd gaat uit van 238 woorden per minuut en de spreektijd van 150 woorden per minuut, wat gangbare gemiddelden voor volwassenen zijn.' },
    ],
    limits: [
      'De tellingen zijn gebaseerd op witruimte, dus talen die zonder spaties worden geschreven (zoals Chinees of Japans) tonen één woord per tekstblok.',
    ],
  },
  'character-counter': {
    name: 'Tekenteller',
    description: 'Tel tekens met en zonder spaties en controleer tekst aan de hand van gangbare lengtelimieten.',
    metaDescription: 'Gratis online tekenteller. Tel tekens met en zonder spaties, bytes en regels en controleer de limieten voor berichten, metatags en sms.',
    steps: [
      'Typ of plak je tekst.',
      'Lees de totalen en de limietbalken.',
      'Pas je tekst aan tot hij past.',
    ],
    faq: [
      { q: 'Tellen emoji als één teken?', a: 'Ja. De teller telt zichtbare tekens (grafeemclusters), dus een emoji telt als één, ook al gebruikt hij meerdere bytes.' },
      { q: 'Waarom wijken mijn sms-limieten af?', a: 'De sms-lengte hangt af van de codering. Berichten met niet-Latijnse tekens of emoji hebben een kortere limiet dan de referentie van 160 tekens die hier wordt getoond.' },
    ],
    limits: [
      'De getoonde limieten zijn gangbare richtlijnen en veranderen na verloop van tijd; controleer bij elk platform de huidige regel.',
    ],
  },
  'case-converter': {
    name: 'Hoofdletterconverter',
    description: 'Zet tekst om naar hoofdletters, kleine letters, titelvorm, zinsvorm, camel, snake, kebab en meer.',
    metaDescription: 'Gratis online hoofdletterconverter. Zet tekst om naar HOOFDLETTERS, kleine letters, Titelvorm, Zinsvorm, camelCase, snake_case, kebab-case en meer.',
    steps: [
      'Plak je tekst.',
      'Kies de gewenste schrijfwijze.',
      'Kopieer het geconverteerde resultaat.',
    ],
    faq: [
      { q: 'Houdt de titelvorm rekening met kleine woorden?', a: 'Ja. Korte woorden zoals "a", "of" en "the" blijven klein, tenzij ze het begin of einde van de tekst vormen.' },
    ],
    limits: [
      'De titelvorm volgt gangbare Engelse stijlregels en past mogelijk niet bij elke stijlgids.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Dubbele regels verwijderen',
    description: 'Verwijder herhaalde regels uit een lijst met behoud van de oorspronkelijke volgorde.',
    metaDescription: 'Gratis online tool om dubbele regels te verwijderen. Wis herhaalde regels uit lijsten, met opties voor hoofdletters, witruimte en lege regels.',
    steps: [
      'Plak je lijst, één item per regel.',
      'Kies of hoofdletters en witruimte meetellen.',
      'Kopieer het resultaat zonder dubbelen.',
    ],
    faq: [
      { q: 'Welke kopie van een dubbele regel blijft behouden?', a: 'De eerste voorkomende regel blijft staan en latere worden verwijderd, zodat je oorspronkelijke volgorde behouden blijft.' },
    ],
    limits: [
      'Werkt alleen op hele regels.',
    ],
  },
  'text-sorter': {
    name: 'Tekstsorteerder',
    description: 'Sorteer regels alfabetisch, numeriek, op lengte of willekeurig.',
    metaDescription: 'Gratis online tekstsorteerder. Sorteer regels A–Z, Z–A, numeriek, op lengte of schud ze door elkaar, met hoofdletterongevoelige en natuurlijke volgorde.',
    steps: [
      'Plak je regels.',
      'Kies een sorteermethode en opties.',
      'Kopieer de gesorteerde lijst.',
    ],
    faq: [
      { q: 'Wat is natuurlijke sortering?', a: 'Bij natuurlijke sortering worden getallen binnen de tekst op waarde vergeleken, dus "item2" komt vóór "item10".' },
    ],
    limits: [
      'Alfabetisch sorteren gebruikt de taalregels van je browser.',
    ],
  },
  'text-cleaner': {
    name: 'Tekstopschoner',
    description: 'Verwijder overtollige witruimte, voeg spaties samen, verwijder lege regels en haal onzichtbare tekens weg.',
    metaDescription: 'Gratis online tekstopschoner. Verwijder extra spaties, lege regels, regeleinden, onzichtbare tekens en slimme aanhalingstekens uit geplakte tekst.',
    steps: [
      'Plak je tekst.',
      'Vink de opschoonopties aan die je nodig hebt.',
      'Kopieer de opgeschoonde tekst.',
    ],
    faq: [
      { q: 'Wat zijn onzichtbare tekens?', a: 'Spaties met nulbreedte, zachte afbreekstreepjes en byte-ordermarkeringen sluipen er vaak in bij het kopiëren van webpagina’s en kunnen code of vergelijkingen laten mislukken.' },
    ],
    limits: [
      'De bewerkingen worden in een vaste volgorde toegepast; voer de tool twee keer uit als je een andere volgorde nodig hebt.',
    ],
  },
  'text-diff-checker': {
    name: 'Tekstvergelijker',
    description: 'Vergelijk twee teksten en zie precies welke regels en woorden zijn veranderd.',
    metaDescription: 'Gratis online tekstvergelijker. Vergelijk twee versies van een tekst naast elkaar en markeer toegevoegde, verwijderde en gewijzigde regels of woorden.',
    steps: [
      'Plak de originele tekst links en de gewijzigde tekst rechts.',
      'Kies regel- of woordvergelijking.',
      'Bekijk de gemarkeerde wijzigingen.',
    ],
    faq: [
      { q: 'Wat is het verschil tussen de regel- en woordmodus?', a: 'De regelmodus markeert hele regels die zijn veranderd. De woordmodus markeert de exacte woorden binnen de tekst, wat beter past bij lopende tekst.' },
    ],
    limits: [
      'Zeer grote invoer (meer dan ongeveer 200.000 tekens) kan traag zijn.',
    ],
  },
  'json-formatter': {
    name: 'JSON-formatter',
    description: 'Maak JSON leesbaar met inspringing en sleutelsortering naar keuze.',
    metaDescription: 'Gratis online JSON-formatter en beautifier. Maak JSON leesbaar met 2 of 4 spaties of tabs, sorteer sleutels en zie de precieze plek van fouten.',
    steps: [
      'Plak je JSON.',
      'Kies de inspringing en sortering.',
      'Kopieer of download het opgemaakte resultaat.',
    ],
    faq: [
      { q: 'Wordt mijn JSON naar een server gestuurd?', a: 'Nee. Parsen en opmaken gebeuren in je browser met de ingebouwde JSON-parser.' },
      { q: 'Waarom wordt mijn JSON geweigerd?', a: 'Strikte JSON staat geen opmerkingen, afsluitende komma’s of enkele aanhalingstekens toe. De foutmelding toont de regel en kolom van het probleem.' },
    ],
    limits: [
      'Getallen groter dan 2^53 verliezen nauwkeurigheid, omdat de browser ze als drijvendekommagetal parseert.',
    ],
  },
  'json-validator': {
    name: 'JSON-validator',
    description: 'Controleer of JSON geldig is en krijg de exacte regel en kolom van elke fout.',
    metaDescription: 'Gratis online JSON-validator. Controleer de JSON-syntaxis en vind de exacte regel en kolom van fouten, met een samenvatting van de structuur.',
    steps: [
      'Plak je JSON.',
      'Zie direct of hij geldig is.',
      'Herstel de gemelde fout en controleer opnieuw.',
    ],
    faq: [
      { q: 'Valideert dit tegen een JSON-schema?', a: 'Nee. Het controleert alleen de syntaxis: of de tekst goed gevormde JSON is.' },
    ],
    limits: [
      'Alleen syntaxisvalidatie; JSON-schemavalidatie is niet inbegrepen.',
    ],
  },
  'json-minifier': {
    name: 'JSON-minifier',
    description: 'Verwijder witruimte uit JSON om het zo compact mogelijk te maken.',
    metaDescription: 'Gratis online JSON-minifier. Haal witruimte uit JSON om payloads te verkleinen en zie hoeveel bytes je hebt bespaard.',
    steps: [
      'Plak je JSON.',
      'De geminificeerde uitvoer verschijnt met de bespaarde grootte.',
      'Kopieer of download hem.',
    ],
    faq: [
      { q: 'Verandert minificeren de gegevens?', a: 'Nee. Alleen overbodige witruimte wordt verwijderd; sleutels, waarden en volgorde blijven ongewijzigd.' },
    ],
    limits: [
      'Getallen groter dan 2^53 verliezen nauwkeurigheid, omdat de browser ze als drijvendekommagetal parseert.',
    ],
  },
  'xml-formatter': {
    name: 'XML-formatter',
    description: 'Maak XML leesbaar of compact en spoor niet-passende of niet-gesloten tags op.',
    metaDescription: 'Gratis online XML-formatter. Maak XML mooi leesbaar of compact met instelbare inspringing en spoor niet-passende of niet-gesloten tags op.',
    steps: [
      'Plak je XML.',
      'Kies Opmaken of Minificeren en de inspringing.',
      'Kopieer het resultaat.',
    ],
    faq: [
      { q: 'Hoe grondig wordt de XML gevalideerd?', a: 'De tool controleert de nesting van tags, niet-gesloten tags en niet-afgesloten opmerkingen of CDATA. Hij valideert niet tegen een DTD- of XSD-schema.' },
    ],
    limits: [
      'Alleen structurele controles; geen DTD- of XSD-validatie.',
    ],
  },
  'url-encoder-decoder': {
    name: 'URL-encoder / -decoder',
    description: 'Codeer of decodeer URL’s en waarden van querystrings met procentcodering.',
    metaDescription: 'Gratis online URL-encoder en -decoder. Codeer tekst voor URL’s met procentcodering of decodeer gecodeerde tekenreeksen, voor volledige URL’s of losse onderdelen.',
    steps: [
      'Kies Coderen of Decoderen.',
      'Plak je tekst of URL.',
      'Kopieer het resultaat.',
    ],
    faq: [
      { q: 'Onderdeel of volledige URL?', a: 'Gebruik Onderdeel voor één waarde, zoals een queryparameter; dat codeert tekens als / ? & =. Gebruik Volledige URL om de URL-structuur intact te laten.' },
    ],
    limits: [
      'Decoderen mislukt bij ongeldige procentreeksen, zoals een los %.',
    ],
  },
  'html-encoder-decoder': {
    name: 'HTML-encoder / -decoder',
    description: 'Zet speciale tekens om naar HTML-entiteiten of decodeer entiteiten terug naar tekst.',
    metaDescription: 'Gratis online HTML-encoder en -decoder. Zet <, >, & en aanhalingstekens om naar HTML-entiteiten, of decodeer benoemde en numerieke entiteiten.',
    steps: [
      'Kies Coderen of Decoderen.',
      'Plak je tekst.',
      'Kopieer het resultaat.',
    ],
    faq: [
      { q: 'Maakt coderen gebruikersinvoer veilig voor HTML?', a: 'Het omzetten van de vijf speciale tekens maakt tekst veilig binnen de inhoud van HTML-elementen en tussen aanhalingstekens geplaatste attributen. Het vervangt in andere contexten geen goede sjabloonbibliotheek of sanitizer.' },
    ],
    limits: [
      'Decoderen ondersteunt de gangbare benoemde entiteiten plus alle numerieke entiteiten.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Base64-encoder / -decoder',
    description: 'Codeer tekst naar Base64 of decodeer Base64 terug naar tekst, met volledige UTF-8-ondersteuning.',
    metaDescription: 'Gratis online Base64-encoder en -decoder. Zet tekst om naar Base64 en terug, met UTF-8-ondersteuning en een optioneel URL-veilig alfabet.',
    steps: [
      'Kies Coderen of Decoderen.',
      'Plak je tekst.',
      'Kopieer het resultaat.',
    ],
    faq: [
      { q: 'Is Base64 versleuteling?', a: 'Nee. Base64 is een codering, geen versleuteling. Iedereen kan het decoderen, dus gebruik het nooit om geheimen te beschermen.' },
      { q: 'Wat is URL-veilige Base64?', a: 'Het vervangt + en / door - en _ en laat de opvulling met = weg, zodat de waarde veilig in URL’s en bestandsnamen past.' },
    ],
    limits: [
      'Gebruik voor afbeeldingsgegevens Afbeelding naar Base64 en Base64 naar afbeelding.',
    ],
  },
  'regex-tester': {
    name: 'Regex-tester',
    description: 'Test reguliere expressies in JavaScript met live markering van overeenkomsten en capture-groepen.',
    metaDescription: 'Gratis online regex-tester voor JavaScript. Zie live overeenkomsten, capture-groepen en benoemde groepen en bekijk een voorbeeld van vervangingen.',
    steps: [
      'Voer een patroon in en kies de vlaggen.',
      'Plak de tekst om te testen.',
      'Bekijk overeenkomsten, groepen en het voorbeeld van de vervanging.',
    ],
    faq: [
      { q: 'Welke regex-variant wordt gebruikt?', a: 'Reguliere expressies in JavaScript (ECMAScript), zoals je browser ze implementeert. PCRE, Python en andere varianten verschillen op sommige punten.' },
      { q: 'Waarom loopt mijn pagina vast bij sommige patronen?', a: 'Patronen met geneste herhaling kunnen catastrofaal teruglopen (backtracking). Het zoeken draait in een achtergrondworker en stopt na 1,5 seconde, zodat een op hol geslagen patroon de pagina niet kan laten vastlopen, maar je moet patronen als (a+)+ toch vermijden.' },
    ],
    limits: [
      'Alleen JavaScript-regexsyntaxis.',
      'Het zoeken stopt na 5.000 overeenkomsten of 1,5 seconde.',
    ],
  },
  'markdown-previewer': {
    name: 'Markdown-voorbeeld',
    description: 'Schrijf Markdown en zie ernaast een veilig, gesaneerd live voorbeeld.',
    metaDescription: 'Gratis online Markdown-voorbeeld. Schrijf Markdown in GitHub-stijl en zie een live gesaneerd HTML-voorbeeld, en kopieer daarna de HTML.',
    steps: [
      'Schrijf of plak Markdown links.',
      'Zie het resultaat rechts.',
      'Kopieer de Markdown of de gegenereerde HTML.',
    ],
    faq: [
      { q: 'Is het voorbeeld veilig?', a: 'Ja. Gegenereerde HTML wordt vóór weergave gesaneerd met DOMPurify, zodat scripts en event handlers worden verwijderd.' },
    ],
    limits: [
      'Markdown in GitHub-stijl via de bibliotheek marked; geen wiskunde- of diagramextensies.',
    ],
  },
  'password-generator': {
    name: 'Wachtwoordgenerator',
    description: 'Maak sterke wachtwoorden: volledig willekeurig, of goed te onthouden wachtwoorden op basis van namen en woorden.',
    metaDescription: 'Gratis wachtwoordgenerator: volledig willekeurige wachtwoorden, of wachtwoorden op basis van namen zoals Nvidia132@Star met willekeurige cijfers, hoofdletters en symbolen. Draait in je browser.',
    steps: [
      'Kies een stijl: Naam + woord voor iets wat je kunt onthouden, of Volledig willekeurig voor maximale veiligheid.',
      'Stel de lengte in, hoeveel wachtwoorden je nodig hebt en welke soorten tekens erin mogen.',
      'Kopieer een wachtwoord en bewaar het in een wachtwoordmanager.',
    ],
    faq: [
      { q: 'Worden gegenereerde wachtwoorden ergens opgeslagen of verstuurd?', a: 'Nee. Wachtwoorden worden in je browser gegenereerd met crypto.getRandomValues en worden nooit verzonden of opgeslagen.' },
      { q: 'Is een wachtwoord als Tesla2026#Tech veilig?', a: 'Het is beter dan een los woord, maar zwakker dan willekeurige tekst. Iemand die gokt, kan beginnen bij lijsten met bekende namen, dus de echte sterkte zit in het aantal mogelijkheden, getoond in bits. Gebruik wachtwoorden op basis van namen voor accounts met weinig risico en volledig willekeurige voor e-mail, bankieren en wachtwoordmanagers.' },
      { q: 'Waarom maar een paar symbolen?', a: 'Gegenereerde wachtwoorden gebruiken alleen de vier symbolen @ # $ * omdat bijna elke website ze accepteert en ze op elk toetsenbord makkelijk te typen zijn.' },
      { q: 'Hoe lang moet een wachtwoord zijn?', a: 'Minstens 16 tekens voor belangrijke accounts. Lengte telt zwaarder dan complexiteit.' },
    ],
    limits: [
      'Wachtwoorden op basis van namen zijn makkelijker te onthouden maar zwakker dan volledig willekeurige. De getoonde sterkte gaat uit van een aanvaller die weet hoe ze zijn opgebouwd.',
      'De woordendatabase is een samengestelde lijst met namen in Latijnse letters; het is geen lijst van de meest gebruikte wachtwoorden.',
      'De sterkteschatting is gebaseerd op mogelijke combinaties, niet op databases met gelekte wachtwoorden.',
    ],
  },
  'uuid-generator': {
    name: 'UUID-generator',
    description: 'Genereer in bulk willekeurige UUID’s van versie 4 met opmaakopties.',
    metaDescription: 'Gratis online UUID-generator. Maak in bulk willekeurige v4-UUID’s, in hoofdletters, zonder koppeltekens of met accolades, met cryptografische willekeur.',
    steps: [
      'Kies hoeveel UUID’s en het formaat.',
      'Genereer.',
      'Kopieer de lijst.',
    ],
    faq: [
      { q: 'Kunnen twee UUID’s botsen?', a: 'UUID’s van versie 4 hebben 122 willekeurige bits, dus de kans op een botsing is in de praktijk te verwaarlozen.' },
    ],
    limits: [
      'Alleen UUID’s van versie 4 (willekeurig) worden gegenereerd.',
    ],
  },
  'timestamp-converter': {
    name: 'Tijdstempelconverter',
    description: 'Zet Unix-tijdstempels om naar leesbare datums en terug, in elke tijdzone.',
    metaDescription: 'Gratis online Unix-tijdstempelconverter. Zet epoch-seconden of -milliseconden om naar datums in UTC en lokale tijd, en datums terug naar tijdstempels.',
    steps: [
      'Voer een Unix-tijdstempel in of kies een datum.',
      'Lees het resultaat in UTC, je lokale tijdzone en ISO 8601.',
      'Kopieer een waarde.',
    ],
    faq: [
      { q: 'Seconden of milliseconden?', a: 'Tijdstempels met 13 of meer cijfers worden als milliseconden behandeld, kortere als seconden. Je kunt dit handmatig aanpassen.' },
    ],
    limits: [
      'Het ondersteunde bereik is dat van JavaScript-datums: grofweg de jaren -271821 tot 275760.',
    ],
  },
  'color-converter': {
    name: 'Kleurconverter',
    description: 'Zet kleuren om tussen HEX, RGB, HSL en HSV, met live voorbeeld en contrastcontrole.',
    metaDescription: 'Gratis online kleurconverter. Zet HEX-, RGB-, HSL- en HSV-waarden om, bekijk de kleur en controleer WCAG-contrastverhoudingen.',
    steps: [
      'Voer een kleur in een willekeurig formaat in of gebruik de kiezer.',
      'Zie alle formaten meebewegen.',
      'Kopieer de waarde die je nodig hebt.',
    ],
    faq: [
      { q: 'Wat toont de contrastcontrole?', a: 'Ze toont de WCAG-contrastverhouding van de kleur ten opzichte van witte en zwarte tekst, wat helpt bij het kiezen van leesbare combinaties.' },
    ],
    limits: [
      'Alleen sRGB; CSS Color 4-ruimten zoals LAB, LCH en Display-P3 worden niet ondersteund.',
      'Transparantiewaarden (alfa) worden geaccepteerd maar genegeerd.',
    ],
  },
  'qr-code-generator': {
    name: 'QR-codegenerator',
    description: 'Maak QR-codes voor links, tekst, wifi, e-mail of telefoonnummers, als PNG of SVG.',
    metaDescription: 'Gratis QR-codegenerator. Maak QR-codes voor URL’s, tekst, wifi, e-mail en telefoonnummers en download ze als PNG of SVG. Gemaakt in je browser.',
    steps: [
      'Kies wat de code moet bevatten en vul de gegevens in.',
      'Pas indien gewenst de grootte, kleuren en foutcorrectie aan.',
      'Download de PNG of SVG en test hem met je telefoon voordat je hem afdrukt.',
    ],
    faq: [
      { q: 'Verlopen de codes?', a: 'Nee. Dit zijn statische codes: de gegevens zitten in de code zelf, dus ze werken eeuwig en er wordt niets gevolgd.' },
      { q: 'Welk foutcorrectieniveau moet ik kiezen?', a: 'Gemiddeld past bij de meeste toepassingen. Kies Kwartiel of Hoog als de code vuil of beschadigd kan raken, maar hogere niveaus maken de code dichter en moeilijker te scannen op kleine formaten.' },
      { q: 'Mag ik de codes commercieel gebruiken?', a: 'Ja. De QR-codestandaard is open en codes die hier worden gemaakt, dragen geen kosten, watermerken of tracking van ons.' },
      { q: 'Worden mijn gegevens ergens naartoe gestuurd?', a: 'Nee. De code wordt in je browser gegenereerd en wifiwachtwoorden die je invoert, blijven op je apparaat.' },
    ],
    limits: [
      'Alleen statische codes: geen scantracking en geen bewerkbare codes.',
      'Zeer lange tekst geeft een dichte code die moeilijk te scannen is, dus houd het kort.',
      'Donkere kleuren op licht met sterk contrast scannen het best.',
    ],
  },
};
export default tools;
