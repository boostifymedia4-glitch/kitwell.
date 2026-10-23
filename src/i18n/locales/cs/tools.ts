import type { ToolTextMap } from '../../toolText';

const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG na PNG',
    description: 'Převeďte fotografie JPG a JPEG na bezeztrátové obrázky PNG jedním kliknutím.',
    metaDescription: 'Převeďte JPG na PNG online zdarma. Hromadný převod fotografií JPEG na PNG přímo v prohlížeči, bez nahrávání a bez registrace.',
    steps: [
      'Přetáhněte jeden nebo více souborů JPG do nástroje, nebo je vyberte ze zařízení.',
      'Zkontrolujte náhledy a stiskněte Převést.',
      'Stáhněte jednotlivé soubory PNG, nebo vše najednou jako ZIP.',
    ],
    faq: [
      {
        q: 'Zlepší se převodem z JPG na PNG kvalita?',
        a: 'Ne. JPG je ztrátový formát, takže detaily zahozené při uložení JPG už nelze obnovit. PNG pouze uloží aktuální pixely bez dalších ztrát, což se hodí pro úpravy nebo práci s průhledností.',
      },
      {
        q: 'Proč je soubor PNG větší než JPG?',
        a: 'PNG je bezeztrátový a fotografie obvykle ukládá méně úsporně než JPG. Pokud je důležitější velikost souboru než přesné pixely, použijte JPG nebo WebP.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  "png-to-jpg": {
    name: "PNG na JPG",
    description: "Převeďte obrázky PNG na menší soubory JPG jedním kliknutím.",
    metaDescription: "Převádějte PNG na JPG online zdarma. Průhledné oblasti se vyplní bílou. Zpracování ve vašem prohlížeči.",
    steps: [
      "Přidejte své soubory PNG.",
      "Průhledné oblasti se vyplní bílou, protože JPG neumí ukládat průhlednost.",
      "Klikněte na Převést a stáhněte výsledky.",
    ],
    faq: [
      { q: "Co se stane s průhlednými oblastmi?", a: "JPG nemá průhlednost, takže se průhledné pixely vyplní bílou." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Průhledné oblasti se vyplní bílou, protože JPG neumí ukládat průhlednost.",
    ],
  },
  "jpg-to-webp": {
    name: "JPG na WebP",
    description: "Převeďte fotografie JPG na moderní WebP pro menší soubory a rychlejší stránky.",
    metaDescription: "Převádějte JPG na WebP online zdarma. Zmenšete fotografie pro web s vyváženou pevnou kvalitou, zpracováno ve vašem prohlížeči.",
    steps: [
      "Přidejte své soubory JPG.",
      "Není co nastavovat: nástroj používá pro soubor WebP vyváženou kvalitu.",
      "Převeďte a stáhněte.",
    ],
    faq: [
      { q: "Je WebP menší než JPG?", a: "Obvykle o 20–35 % menší při podobné vizuální kvalitě, výsledek ale závisí na obrázku." },
      { q: "Podporuje WebP každý prohlížeč?", a: "Všechny současné hlavní prohlížeče umí WebP zobrazit. Kódování WebP v prohlížeči podporují Chrome, Edge, Firefox a novější Safari; pokud to ten váš neumí, nástroj vám to řekne, místo aby vytvořil chybný soubor." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Váš prohlížeč musí podporovat kódování WebP; nepodporované prohlížeče zobrazí chybu.",
    ],
  },
  "png-to-webp": {
    name: "PNG na WebP",
    description: "Převeďte obrázky PNG na WebP a zachovejte průhlednost při zlomku velikosti.",
    metaDescription: "Převádějte PNG na WebP online zdarma. Zachovává průhlednost, zmenšuje soubor a běží celé ve vašem prohlížeči.",
    steps: [
      "Přidejte své soubory PNG.",
      "Není co nastavovat: nástroj používá pro soubor WebP vyváženou kvalitu.",
      "Převeďte a stáhněte.",
    ],
    faq: [
      { q: "Zachová se průhlednost?", a: "Ano. WebP podporuje alfa kanál, takže průhledné PNG zůstanou průhledné." },
      { q: "Mohu získat bezeztrátový výsledek?", a: "Nástroj kóduje WebP s vysokou vyváženou kvalitou. Prohlížeče kódují WebP ztrátově, takže pokud potřebujete matematicky přesnou kopii, použijte PNG." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Váš prohlížeč musí podporovat kódování WebP; nepodporované prohlížeče zobrazí chybu.",
    ],
  },
  "webp-to-jpg": {
    name: "WebP na JPG",
    description: "Převeďte obrázky WebP na široce kompatibilní soubory JPG.",
    metaDescription: "Převádějte WebP na JPG online zdarma. Ať obrázky WebP fungují všude, převedené lokálně ve vašem prohlížeči.",
    steps: [
      "Přidejte své soubory WebP.",
      "Průhledné oblasti se vyplní bílou, protože JPG neumí ukládat průhlednost.",
      "Převeďte a stáhněte.",
    ],
    faq: [
      { q: "Proč převádět WebP na JPG?", a: "Některý starší software, e-mailoví klienti a formuláře pro nahrávání stále WebP odmítají. JPG se přijímá téměř všude." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Průhledné oblasti se vyplní bílou, protože JPG neumí ukládat průhlednost.",
    ],
  },
  'webp-to-png': {
    name: 'WebP na PNG',
    description: 'Převeďte obrázky WebP na bezeztrátové PNG se zachováním průhlednosti.',
    metaDescription: 'Převeďte WebP na PNG online zdarma. Zachová průhlednost a celé to běží ve vašem prohlížeči, bez nahrávání souborů.',
    steps: [
      'Přidejte své soubory WebP.',
      'Stiskněte Převést.',
      'Stáhněte soubory PNG.',
    ],
    faq: [
      {
        q: 'Zachová se průhlednost?',
        a: 'Ano. PNG podporuje průhlednost, takže alfa kanál z WebP se přenese.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  "image-compressor": {
    name: "Komprimovat obrázek",
    description: "Zmenšete velikost souboru obrázku a podívejte se na přesnou úsporu.",
    metaDescription: "Komprimujte obrázky JPG, PNG a WebP online zdarma. Volitelně omezte rozměry a porovnejte velikosti souborů. Běží ve vašem prohlížeči.",
    steps: [
      "Přidejte své obrázky.",
      "Zvolte výstupní formát a případně maximální šířku nebo výšku.",
      "Komprimujte, porovnejte velikosti před a po a stáhněte.",
    ],
    faq: [
      { q: "Jak kompresor zmenšuje velikost?", a: "Obrázek znovu zakóduje s pevnou vyváženou kvalitou a může ho také zmenšit. Výstup PNG je bezeztrátový, takže se zmenší, jen když zároveň snížíte rozměry." },
      { q: "Co když je výsledek větší než originál?", a: "To se může stát u již optimalizovaných souborů. Nástroj pak ponechá původní soubor beze změny a řekne vám to." },
      { q: "Zachovají se data EXIF nebo o poloze?", a: "Ne. Opětovné kódování přes canvas odstraní metadata EXIF, například model fotoaparátu a polohu GPS, což je před sdílením fotografie často žádoucí. Barevné profily se také nezachovají." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Nejlepší výsledky dává výstup JPG nebo WebP; výstup PNG je bezeztrátový a nemusí se zmenšit.",
    ],
  },
  'image-resizer': {
    name: 'Změnit velikost obrázku',
    description: 'Změňte velikost obrázků na přesný počet pixelů nebo procent při zachování poměru stran.',
    metaDescription: 'Změňte velikost obrázků online zdarma. Nastavte přesnou šířku a výšku nebo procenta, zachovejte poměr stran a stáhněte JPG, PNG nebo WebP.',
    steps: [
      'Přidejte jeden nebo více obrázků.',
      'Zvolte pixely nebo procenta a zadejte novou velikost. Ponechte zapnutý zámek poměru stran, aby se obrázek nezdeformoval.',
      'Změňte velikost a stáhněte.',
    ],
    faq: [
      {
        q: 'Mohu obrázek zvětšit?',
        a: 'Ano, ale zvětšením nelze přidat detaily, takže výsledek bude vypadat měkčeji. Nejlepší kvality dosáhnete zmenšováním.',
      },
      {
        q: 'Jaká je maximální výstupní velikost?',
        a: 'Prohlížeče omezují velikost canvasu. Tento nástroj omezuje výstup na 16 000 px na stranu a zhruba 100 megapixelů.',
      },
      {
        q: 'Zachovají se data EXIF nebo údaje o poloze?',
        a: 'Ne. Při opětovném kódování přes canvas se metadata EXIF, například model fotoaparátu a poloha GPS, zahodí, což je před sdílením fotky často žádoucí. Barevné profily se také nezachovají.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Výstup je omezen na 16 000 px na stranu.',
    ],
  },
  "image-cropper": {
    name: "Oříznout obrázek",
    description: "Ořízněte obrázek na přesnou oblast nebo pevný poměr stran s živým náhledem.",
    metaDescription: "Ořezávejte obrázky online zdarma. Zvolte pevný poměr stran nebo zadejte přesné hodnoty v pixelech s živým náhledem. Zpracováno ve vašem prohlížeči.",
    steps: [
      "Přidejte obrázek.",
      "Zvolte poměr stran nebo přetáhněte ořezový rámeček a poté dolaďte polohu a velikost v číselných polích.",
      "Klikněte na Oříznout a stáhněte.",
    ],
    faq: [
      { q: "Snižuje ořez kvalitu?", a: "Ořez zachovává původní pixely. Výsledky JPG a WebP se ukládají s vysokou pevnou kvalitou, takže při běžném použití není vidět žádná ztráta." },
    ],
    limits: [
      "Vždy jeden obrázek.",
      "Nejvýše 25 MB na soubor.",
      "Animované obrázky používají první snímek.",
    ],
  },
  'image-rotator': {
    name: 'Otočit obrázek',
    description: 'Otočte obrázky o 90°, 180°, 270° nebo o libovolný vlastní úhel.',
    metaDescription: 'Otáčejte obrázky online zdarma. Otočte fotografie o 90, 180 nebo 270 stupňů, případně o vlastní úhel, přímo ve vašem prohlížeči.',
    steps: [
      'Přidejte své obrázky.',
      'Zvolte otočení nebo zadejte vlastní úhel.',
      'Použijte a stáhněte.',
    ],
    faq: [
      {
        q: 'Co se stane při otočení o jiný než pravý úhel?',
        a: 'Plátno se zvětší tak, aby se do něj otočený obrázek vešel. U výstupu JPG se prázdné rohy vyplní zvolenou barvou pozadí; PNG a WebP je ponechají průhledné.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  'image-flipper': {
    name: 'Překlopit obrázek',
    description: 'Zrcadlově překlopte obrázky vodorovně nebo svisle.',
    metaDescription: 'Překlopte obrázky vodorovně nebo svisle online zdarma. Zrcadlení fotografií ve vašem prohlížeči, bez nahrávání.',
    steps: [
      'Přidejte své obrázky.',
      'Zvolte vodorovné, svislé nebo obojí překlopení.',
      'Použijte a stáhněte.',
    ],
    faq: [
      {
        q: 'Jaký je rozdíl mezi vodorovným a svislým překlopením?',
        a: 'Vodorovné překlopení zrcadlí vlevo a vpravo, jako zrcadlo. Svislé překlopení obrátí obrázek vzhůru nohama podle vodorovné osy.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  "image-format-converter": {
    name: "Převést formát obrázku",
    description: "Převádějte mezi JPG, PNG a WebP jedním flexibilním nástrojem.",
    metaDescription: "Převádějte obrázky mezi JPG, PNG a WebP online zdarma. Zvolte výstupní formát, zpracováno ve vašem prohlížeči.",
    steps: [
      "Přidejte obrázky v libovolném podporovaném formátu.",
      "Zvolte výstupní formát.",
      "Převeďte a stáhněte.",
    ],
    faq: [
      { q: "Jaké formáty mohu použít?", a: "Vstup: JPG, PNG, WebP, GIF, BMP a AVIF, pokud je váš prohlížeč umí dekódovat. Výstup: JPG, PNG a WebP." },
      { q: "A HEIC nebo TIFF?", a: "Prohlížeče neumí HEIC ani TIFF nativně dekódovat, takže zatím nejsou podporovány." },
    ],
    limits: [
      "Animované soubory GIF nebo WebP se převádějí jen podle prvního snímku.",
      "Nejvýše 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal svižný.",
      "Metadata EXIF a vložené barevné profily se nezachovají.",
      "Soubory HEIC/HEIF, TIFF a RAW nejsou podporovány.",
    ],
  },
  'image-to-base64': {
    name: 'Obrázek na Base64',
    description: 'Zakódujte obrázek jako datové URI v Base64 pro CSS, HTML nebo JSON.',
    metaDescription: 'Převeďte obrázek na řetězec Base64 nebo datové URI online zdarma. Zkopírujte hotové úryvky HTML a CSS. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte obrázek.',
      'Zvolte styl výstupu: datové URI, čisté Base64, HTML <img> nebo CSS.',
      'Zkopírujte výsledek.',
    ],
    faq: [
      {
        q: 'Kdy použít obrázky v Base64?',
        a: 'Pro drobné ikony v CSS nebo e-mailech, kde je jeden požadavek navíc dražší než zhruba 33% nárůst velikosti. U velkých fotografií se tomu vyhněte.',
      },
    ],
    limits: [
      'Maximálně 5 MB na obrázek, protože text Base64 je velmi dlouhý.',
      'Vždy jen jeden obrázek.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 na obrázek',
    description: 'Dekódujte řetězec Base64 nebo datové URI zpět na obrázek ke stažení.',
    metaDescription: 'Převeďte řetězec Base64 nebo datové URI na obrázek online zdarma. Zobrazte náhled a stáhněte dekódovaný obrázek PNG, JPG, WebP nebo GIF.',
    steps: [
      'Vložte řetězec Base64 nebo úplné datové URI.',
      'Obrázek se okamžitě dekóduje a zobrazí se jeho náhled.',
      'Stáhněte obrázek.',
    ],
    faq: [
      {
        q: 'Potřebuji předponu „data:image/png;base64,“?',
        a: 'Ne. Bez předpony nástroj pozná formát podle signatury souboru (PNG, JPG, GIF, WebP).',
      },
      {
        q: 'Proč se zobrazuje chyba?',
        a: 'Řetězec je pravděpodobně zkrácený, obsahuje nadbytečné znaky, nebo to není obrázek. Data SVG se zde z bezpečnostních důvodů také odmítají.',
      },
    ],
    limits: [
      'Podporuje PNG, JPG, GIF a WebP. SVG se záměrně nevykresluje.',
      'Maximálně 10 MB dekódovaných dat.',
    ],
  },
  'image-color-picker': {
    name: 'Výběr barev z obrázku',
    description: 'Vyberte přesné barvy z libovolného obrázku a získejte jeho dominantní paletu.',
    metaDescription: 'Vybírejte barvy z obrázku online zdarma. Kliknutím na libovolný pixel získáte hodnoty HEX, RGB a HSL a také paletu dominantních barev.',
    steps: [
      'Přidejte obrázek.',
      'Kliknutím nebo klepnutím kamkoli na obrázek (nebo pomocí šipek) odeberete vzorek pixelu.',
      'Zkopírujte hodnotu HEX, RGB nebo HSL, případně barvu z vygenerované palety.',
    ],
    faq: [
      {
        q: 'Jak se počítá paleta?',
        a: 'Obrázek se zmenší a jeho barvy se seskupí do skupin; zobrazí se nejčastější z nich. Jde o přiblížení dominantních barev, nikoli o vyčerpávající seznam.',
      },
    ],
    limits: [
      'Vždy jen jeden obrázek.',
      'Barvy se odebírají ze zobrazených pixelů sRGB; barevné profily se ignorují.',
    ],
  },
  'image-watermark': {
    name: 'Vodoznak do obrázku',
    description: 'Přidejte textový nebo logový vodoznak na mnoho obrázků najednou, jednotlivě nebo dlaždicově.',
    metaDescription: 'Přidejte vodoznak do obrázků online zdarma. Hromadně vložte text nebo logo do fotografií JPG, PNG a WebP, s nastavením průhlednosti a polohy. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte své obrázky.',
      'Zvolte text nebo logo a nastavte jeho velikost, průhlednost, polohu a rozložení.',
      'Použijte vodoznak a stáhněte výsledky nebo soubor ZIP.',
    ],
    faq: [
      {
        q: 'Mohu použít urdštinu nebo jiné abecedy?',
        a: 'Ano. Vodoznaky v obrázcích používají písma vašeho zařízení, takže funguje každé písmo, které váš systém umí zobrazit.',
      },
      {
        q: 'Změní se mé originály?',
        a: 'Ne. Kopie s vodoznakem se ukládají jako nové soubory.',
      },
      {
        q: 'Zachovají se data EXIF nebo údaje o poloze?',
        a: 'Ne. Při opětovném kódování přes canvas se metadata EXIF, například model fotoaparátu a poloha GPS, zahodí, což je před sdílením fotky často žádoucí. Barevné profily se také nezachovají.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Soubory s logem: PNG, JPG nebo WebP, do 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG na PNG / JPG',
    description: 'Převeďte vektorovou grafiku SVG na obrázky PNG, JPG nebo WebP v libovolné velikosti.',
    metaDescription: 'Převeďte SVG na PNG nebo JPG online zdarma. Zvolte měřítko nebo přesnou šířku pro ostrý výsledek; PNG zachová průhlednost. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory SVG.',
      'Zvolte PNG, JPG nebo WebP a výstupní velikost.',
      'Převeďte a stáhněte.',
    ],
    faq: [
      {
        q: 'Zůstane obrázek ostrý i ve velkých velikostech?',
        a: 'Ano. SVG se vykreslí ve zvolené velikosti, takže export 4× je stejně ostrý jako export 1×.',
      },
      {
        q: 'Proč vypadá moje SVG jinak?',
        a: 'Prohlížeče nepodporují všechny funkce SVG a soubory SVG závislé na externích písmech nebo obrázcích se vrátí k výchozím hodnotám. Pro nejlepší výsledek vložte písma a obrázky přímo do SVG.',
      },
      {
        q: 'Je bezpečné zde otevírat soubory SVG?',
        a: 'Ano. SVG se vykresluje jako obrázek, takže skripty uvnitř se nespouštějí.',
      },
    ],
    limits: [
      'Maximálně 25 MB na soubor a 20 souborů v dávce.',
      'Písma, obrázky a styly odkazované zvenčí SVG se nenačítají.',
      'SVG bez udané velikosti použije atribut viewBox, nebo 300 × 150 px, pokud není nastaveno ani jedno.',
    ],
  },
  'enlarge-image': {
    name: 'Zvětšit obrázek',
    description: 'Zvětšete obrázky hladkým a ostrým převzorkováním, 2× až 4× nebo na zadanou šířku.',
    metaDescription: 'Zvětšete obrázky online zdarma. Zvětšení JPG, PNG a WebP 2×, 3×, 4× nebo na přesnou šířku převzorkováním Lanczos a volitelným doostřením.',
    steps: [
      'Přidejte své obrázky.',
      'Zvolte násobek nebo cílovou šířku a zda se má obrázek doostřit.',
      'Zvětšete a stáhněte.',
    ],
    faq: [
      {
        q: 'Je to zvětšování pomocí AI?',
        a: 'Ne. Používá kvalitní převzorkování, které zvětšené obrázky vyhladí a vyčistí, ale nedokáže vymyslet chybějící detaily. Velmi malé nebo rozmazané fotografie budou stále působit měkce.',
      },
      {
        q: 'Jak velký může být výsledek?',
        a: 'Až 16 000 px na stranu a zhruba 100 megapixelů, podle toho, co váš prohlížeč zvládne.',
      },
      {
        q: 'Zachovají se data EXIF nebo údaje o poloze?',
        a: 'Ne. Při opětovném kódování přes canvas se metadata EXIF, například model fotoaparátu a poloha GPS, zahodí, což je před sdílením fotky často žádoucí. Barevné profily se také nezachovají.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Nepřidává detaily, takže nejde o zvětšování pomocí AI.',
      'Výstup je omezen na 16 000 px na stranu.',
    ],
  },
  'blur-image-area': {
    name: 'Rozmazat nebo pixelovat oblast',
    description: 'Skryjte obličeje, značky nebo soukromé údaje rozmazáním, pixelací nebo zakrytím oblastí.',
    metaDescription: 'Rozmažte nebo pixelujte část obrázku online zdarma. Nakreslete rámečky přes obličeje, registrační značky nebo text a skryjte je přímo ve vašem prohlížeči.',
    steps: [
      'Přidejte obrázek.',
      'Přetažením po obrázku nakreslete rámečky přes to, co chcete skrýt.',
      'Zvolte rozmazání, pixelaci nebo černý rámeček, použijte ho a stáhněte.',
    ],
    faq: [
      {
        q: 'Je rozmazání bezpečné pro citlivé údaje?',
        a: 'Pro cokoli, co musí zůstat soukromé, například čísla dokladů nebo registrační značky, použijte černý rámeček. Rozmazání a pixelaci lze někdy částečně vrátit zpět.',
      },
      {
        q: 'Najde nástroj obličeje automaticky?',
        a: 'Ne. Rámečky kreslíte sami. Automatické rozpoznávání vyžaduje velký model AI, který není součástí nástroje.',
      },
      {
        q: 'Mohu si to rozmyslet?',
        a: 'Ano. Před použitím můžete rámečky odebrat nebo nakreslit znovu. Původní soubor se nikdy nezmění.',
      },
      {
        q: 'Zachovají se data EXIF nebo údaje o poloze?',
        a: 'Ne. Při opětovném kódování přes canvas se metadata EXIF, například model fotoaparátu a poloha GPS, zahodí, což je před sdílením fotky často žádoucí. Barevné profily se také nezachovají.',
      },
    ],
    limits: [
      'Vždy jen jeden obrázek, maximálně 25 MB.',
      'Oblasti se vybírají ručně; rozpoznávání obličejů neexistuje.',
      'U animovaných obrázků se použije první snímek.',
    ],
  },
  'qr-code-scanner': {
    name: 'Čtečka QR kódů',
    description: 'Čtěte kódy QR z fotografií a snímků obrazovky a zjistěte přesně, co obsahují.',
    metaDescription: 'Naskenujte kód QR z obrázku online zdarma. Nahrajte fotku nebo snímek obrazovky a přečtěte odkaz, text nebo údaje o Wi-Fi. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte jeden nebo více obrázků obsahujících kód QR.',
      'Kód se přečte automaticky.',
      'Zkopírujte výsledek, nebo po zkontrolování otevřete odkaz.',
    ],
    faq: [
      {
        q: 'Umí skenovat fotoaparátem?',
        a: 'Zatím ne. Tento nástroj čte kódy QR ze souborů s obrázky. Na telefonu kód vyfoťte a fotku zde vyberte, nebo použijte aplikaci fotoaparátu.',
      },
      {
        q: 'Je bezpečné otevírat naskenované odkazy?',
        a: 'Nejprve zkontrolujte adresu. Zobrazí se celý odkaz a odsud lze otevřít jen webové odkazy (http nebo https). Odkazy se skripty a daty se nikdy neotevírají.',
      },
      {
        q: 'Proč nebyl nalezen žádný kód?',
        a: 'Kód může být rozmazaný, oříznutý, příliš malý nebo málo kontrastní. Zkuste ostřejší a bližší snímek, na kterém je celý kód s jasným okrajem kolem.',
      },
    ],
    limits: [
      'Až 10 obrázků, každý do 25 MB.',
      'Z každého obrázku se přečte jeden kód.',
      'Pouze standardní kódy QR; jiné čárové kódy nejsou podporovány.',
    ],
  },
  'gif-maker': {
    name: 'Tvorba GIFů',
    description: 'Vytvořte z obrázků animovaný GIF s vlastním časováním, velikostí a opakováním.',
    metaDescription: 'Vytvořte animovaný GIF z obrázků online zdarma. Změňte pořadí snímků, nastavte prodlevu, velikost a opakování a stáhněte GIF. Vytvořeno ve vašem prohlížeči.',
    steps: [
      'Přidejte dva nebo více obrázků (nebo jediný pro nepohyblivý GIF).',
      'Přetažením je seřaďte, nastavte, jak dlouho se každý snímek zobrazí, a zvolte velikost, opakování a barvy.',
      'Vytvořte GIF, zobrazte jeho náhled a stáhněte.',
    ],
    faq: [
      {
        q: 'Proč je můj GIF tak velký?',
        a: 'GIF ukládá každý snímek jako obrázek omezený na 256 barev. Soubor zmenší méně snímků, menší šířka i méně barev. Velikost nástroj zobrazí hned po vytvoření GIFu.',
      },
      {
        q: 'Mohu zachovat průhledné oblasti?',
        a: 'Ano, zapněte volbu „Zachovat průhledné oblasti“ u obrázků PNG nebo WebP s průhledností. Průhlednost v GIFu je u každého pixelu buď zapnutá, nebo vypnutá, takže měkké okraje zostří.',
      },
    ],
    limits: [
      'Až 100 snímků; čím větší snímky, tím více paměti váš prohlížeč potřebuje.',
      'GIF je omezen na 256 barev na snímek, takže fotografie mohou vypadat zrnitě.',
      'Z animovaných vstupů (GIF, WebP) se použije pouze první snímek.',
    ],
  },
  'photo-editor': {
    name: 'Fotoeditor',
    description: 'Upravte fotografii, použijte filtry, otočte, ořízněte a přidejte text, s živým náhledem.',
    metaDescription: 'Bezplatný online fotoeditor. Upravte barvy, použijte filtry, otočte, narovnejte, ořízněte a přidejte text, pak stáhněte PNG, JPG nebo WebP. Soukromě ve vašem prohlížeči.',
    steps: [
      'Přidejte fotografii.',
      'Na kartách upravte barvy, použijte filtr, otočte nebo oříznete a přidejte text. Náhled se průběžně aktualizuje.',
      'Zvolte formát a stáhněte upravenou fotografii.',
    ],
    faq: [
      {
        q: 'Změní se původní soubor?',
        a: 'Ne. Váš soubor se nikdy nemění; upravený obrázek se vytvoří jako nové stažení.',
      },
      {
        q: 'Ztrácí se při exportu kvalita?',
        a: 'PNG zachová každý pixel. JPG a WebP jsou ztrátové; při kvalitě 90 nebo vyšší budou fotografie vypadat stejně. Úpravy se použijí v plné velikosti obrázku, nikoli ve velikosti náhledu.',
      },
    ],
    limits: [
      'Vždy jen jedna fotografie, do 25 MB a zhruba 50 megapixelů.',
      'Úpravy se použijí v pevném pořadí: otočení a oříznutí, úpravy barev, rozmazání a doostření, vinětace a nakonec text.',
      'Údaje EXIF, například poloha, se do upraveného obrázku nekopírují.',
      'Žádné vrstvy, štětce ani funkce AI.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG na PDF',
    description: 'Převeďte fotografie JPG na PDF, jeden obrázek na stránku.',
    metaDescription: 'Převeďte JPG na PDF online zdarma. Zvolte velikost stránky, orientaci a okraje. Data JPEG se vkládají bez opětovné komprese.',
    steps: [
      'Přidejte své soubory JPG a pořadí nastavte přetažením nebo šipkami.',
      'Zvolte velikost stránky, orientaci a okraj.',
      'Vytvořte PDF a stáhněte ho.',
    ],
    faq: [
      {
        q: 'Sníží se kvalita obrázku?',
        a: 'Ne. Soubory JPG se do PDF vkládají tak, jak jsou, bez opětovné komprese.',
      },
    ],
    limits: [
      'Maximálně 25 MB na obrázek a 100 obrázků v jednom PDF.',
      'Zde se přijímají jen obrázky JPG; pro smíšené formáty použijte Obrázky na PDF.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG na PDF',
    description: 'Převeďte obrázky PNG na PDF se zachováním průhlednosti.',
    metaDescription: 'Převeďte PNG na PDF online zdarma. Zvolte velikost stránky a okraje; průhlednost se zachová. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory PNG a nastavte jejich pořadí.',
      'Zvolte velikost stránky, orientaci a okraj.',
      'Vytvořte PDF a stáhněte ho.',
    ],
    faq: [
      {
        q: 'Zachová se průhlednost?',
        a: 'Ano. Obrázky PNG se vkládají s alfa kanálem, takže průhledné oblasti zobrazují bílou stránku pod sebou.',
      },
    ],
    limits: [
      'Maximálně 25 MB na obrázek a 100 obrázků v jednom PDF.',
      'Zde se přijímají jen obrázky PNG; pro smíšené formáty použijte Obrázky na PDF.',
    ],
  },
  'images-to-pdf': {
    name: 'Obrázky na PDF',
    description: 'Spojte obrázky JPG a PNG do jediného PDF ve vámi zvoleném pořadí.',
    metaDescription: 'Spojte více obrázků do jednoho PDF online zdarma. Změňte pořadí stránek, zvolte velikost stránky a okraje. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte obrázky JPG a PNG (můžete jich přetáhnout několik najednou).',
      'Změňte jejich pořadí a zvolte velikost stránky, orientaci a okraj.',
      'Vytvořte PDF a stáhněte ho.',
    ],
    faq: [
      {
        q: 'Které formáty obrázků fungují?',
        a: 'JPG a PNG se vkládají přímo. WebP, GIF a BMP se nejprve převedou na PNG, pokud je váš prohlížeč umí dekódovat.',
      },
      {
        q: 'Co dělá volba „Podle obrázku“?',
        a: 'Každá stránka má velikost svého obrázku, takže se nic nezmenšuje ani nedoplňuje. Pro standardní stránky dokumentu zvolte A4 nebo Letter.',
      },
    ],
    limits: [
      'Maximálně 25 MB na obrázek a 100 obrázků v jednom PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Sloučit PDF',
    description: 'Spojte několik souborů PDF do jednoho dokumentu ve zvoleném pořadí.',
    metaDescription: 'Sloučte soubory PDF online zdarma. Spojte více PDF do jednoho, změňte jejich pořadí a ihned stáhněte. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte dva nebo více souborů PDF.',
      'Pomocí šipek je seřaďte do požadovaného pořadí.',
      'Sloučte a stáhněte výsledné PDF.',
    ],
    faq: [
      {
        q: 'Zachovají se záložky a formulářová pole?',
        a: 'Stránky se kopírují s viditelným obsahem a odkazy. Záložky na úrovni dokumentu a data interaktivních formulářů se nepřenášejí.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Záložky/osnovy a formulářová pole zdrojových souborů se nesloučí.',
    ],
  },
  'split-pdf': {
    name: 'Rozdělit PDF',
    description: 'Rozdělte PDF podle rozsahů stránek, na jednotlivé stránky nebo na části pevné velikosti.',
    metaDescription: 'Rozdělte PDF online zdarma. Oddělte podle rozsahů stránek, po jedné stránce nebo po N stránkách a stáhněte jako ZIP. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte způsob dělení: vlastní rozsahy jako 1-3, 4-6, každá stránka zvlášť, nebo po N stránkách.',
      'Rozdělte a stáhněte části jednotlivě nebo jako ZIP.',
    ],
    faq: [
      {
        q: 'Jak zapsat rozsahy?',
        a: 'Výstupní soubory oddělujte čárkami. Každý soubor může být rozsah (1-3), jedna stránka (5), nebo kombinace oddělená plusem (1-2+7). Příklad: 1-3, 4-6, 7+9.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
    ],
  },
  'rotate-pdf': {
    name: 'Otočit PDF',
    description: 'Otočte jednotlivé stránky nebo celé PDF s náhledy miniatur.',
    metaDescription: 'Otáčejte stránky PDF online zdarma. Otočte jednotlivé nebo všechny stránky o 90, 180 nebo 270 stupňů a uložte nové PDF. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF; jeho stránky se zobrazí jako miniatury.',
      'Otočte jednotlivé stránky, nebo všechny najednou.',
      'Uložte otočené PDF.',
    ],
    faq: [
      {
        q: 'Je otočení trvalé?',
        a: 'Ukládá se do nového PDF jako atribut otočení stránky. Obsah stránky se nepřekresluje, takže se nic neztratí.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Extrakce stránek z PDF',
    description: 'Vyberte z PDF potřebné stránky a uložte je jako nový dokument.',
    metaDescription: 'Extrahujte stránky z PDF online zdarma. Vyberte stránky vizuálně nebo podle rozsahu a uložte nové PDF. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Kliknutím na miniatury stránky vyberte, nebo zadejte rozsah, například 1-3, 8.',
      'Extrahujte a stáhněte nové PDF.',
    ],
    faq: [
      {
        q: 'Mohu tento nástroj použít k odstranění stránek?',
        a: 'Ano. Vyberte stránky, které chcete ponechat, a extrahujte je; ostatní se do nového souboru nedostanou.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Změna pořadí stránek PDF',
    description: 'Přeskupte, odeberte a otočte stránky vizuálně a výsledek uložte.',
    metaDescription: 'Změňte pořadí stránek PDF online zdarma. Stránky přetáhněte nebo přesuňte, odeberte ty nepotřebné a uložte nové PDF. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF; jeho stránky se zobrazí jako miniatury.',
      'Přetažením stránek nebo tlačítky se šipkami změňte jejich pořadí. Nepotřebné stránky odeberte.',
      'Uložte PDF s novým pořadím.',
    ],
    faq: [
      {
        q: 'Mohu pořadí měnit pomocí klávesnice?',
        a: 'Ano. Použijte tlačítka pro posun dříve a později u každé stránky.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF na JPG',
    description: 'Vykreslete stránky PDF jako obrázky JPG ve zvoleném rozlišení.',
    metaDescription: 'Převeďte PDF na JPG online zdarma. Vykreslete všechny stránky nebo jejich výběr až v 300 DPI a stáhněte ZIP. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte rozlišení a případně i stránky, které se mají převést.',
      'Převeďte a stáhněte obrázky jednotlivě nebo jako ZIP.',
    ],
    faq: [
      {
        q: 'Jaké rozlišení zvolit?',
        a: '150 DPI se hodí pro obrazovku, 300 DPI pro tisk. Vyšší hodnoty vytvářejí větší obrázky a vyžadují více paměti.',
      },
      {
        q: 'Vykreslují se stránky přesně?',
        a: 'Vykreslování používá knihovnu PDF.js od Mozilly, která zvládá většinu PDF dobře. Neobvyklá písma nebo pokročilá grafika se mohou od jiných prohlížečů mírně lišit.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Každá stránka je omezena na zhruba 50 megapixelů.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF na PNG',
    description: 'Vykreslete stránky PDF jako ostré bezeztrátové obrázky PNG.',
    metaDescription: 'Převeďte PDF na PNG online zdarma. Vykreslete stránky až v 300 DPI jako bezeztrátové obrázky a stáhněte ZIP. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte rozlišení a stránky.',
      'Převeďte a stáhněte obrázky jednotlivě nebo jako ZIP.',
    ],
    faq: [
      {
        q: 'Proč zvolit PNG místo JPG?',
        a: 'PNG zůstává ostré na textu a perokresbě a podporuje průhlednost. Soubory jsou větší než JPG.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Každá stránka je omezena na zhruba 50 megapixelů.',
    ],
  },
  'pdf-viewer': {
    name: 'Prohlížeč PDF',
    description: 'Otevřete a čtěte PDF soukromě ve vašem prohlížeči, s přiblížením a navigací po stránkách.',
    metaDescription: 'Prohlížejte soubory PDF online zdarma. Přibližujte, přeskakujte na stránky a čtěte dokumenty v prohlížeči, aniž by se kamkoli nahrávaly.',
    steps: [
      'Přidejte PDF.',
      'Procházejte posouváním nebo ovládacími prvky stránek.',
      'Podle potřeby přibližte nebo oddalte.',
    ],
    faq: [
      {
        q: 'Mohu zde PDF upravovat nebo anotovat?',
        a: 'Ne. Jde o prohlížeč jen pro čtení. K otočení, změně pořadí nebo extrakci stránek použijte nástroje pro stránky.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Pouze pro čtení: bez anotací, vyplňování formulářů a vyhledávání v textu.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Prohlížeč metadat PDF',
    description: 'Prohlédněte si název, autora, data vytvoření, počet stránek, velikosti stránek a verzi PDF.',
    metaDescription: 'Zobrazte metadata PDF online zdarma. Zjistěte název, autora, producenta, data, počet stránek a jejich velikosti, aniž byste soubor nahrávali.',
    steps: [
      'Přidejte PDF.',
      'Prohlédněte si vlastnosti dokumentu.',
      'Podrobnosti v případě potřeby zkopírujte jako JSON.',
    ],
    faq: [
      {
        q: 'Proč některá metadata chybí?',
        a: 'Mnoho souborů PDF nenastavuje všechna pole. Zobrazí se jen pole, která jsou v souboru skutečně uložena.',
      },
      {
        q: 'Mohu metadata odstranit?',
        a: 'Tento nástroj metadata pouze čte. Soubor nemění.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Pouze pro čtení: metadata zde nelze upravovat ani odebírat.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Odebrat stránky z PDF',
    description: 'Odstraňte nepotřebné stránky a zbytek uložte jako nové PDF.',
    metaDescription: 'Odeberte stránky z PDF online zdarma. Vyberte stránky vizuálně nebo podle rozsahu, odstraňte je a stáhněte zbytek. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF; jeho stránky se zobrazí jako miniatury.',
      'Klikněte na stránky, které chcete odstranit, nebo zadejte rozsah, například 2, 5-7.',
      'Odeberte je a stáhněte nové PDF.',
    ],
    faq: [
      {
        q: 'Změní se můj původní soubor?',
        a: 'Ne. Získáte nové PDF bez vybraných stránek. Původní soubor zůstane beze změny.',
      },
      {
        q: 'Mohu odebrat všechny stránky?',
        a: 'Ne. Alespoň jedna stránka musí zůstat.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
    ],
  },
  'add-page-numbers': {
    name: 'Přidat čísla stránek',
    description: 'Očíslujte stránky PDF s vlastní polohou, formátem a stylem.',
    metaDescription: 'Přidejte čísla stránek do PDF online zdarma. Zvolte polohu, formát například „Strana 1 z 10“, počáteční číslo a velikost písma. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte, kam se čísla umístí, jejich formát a které stránky se mají číslovat.',
      'Přidejte čísla a stáhněte PDF.',
    ],
    faq: [
      {
        q: 'Mohu přeskočit titulní stranu?',
        a: 'Ano. Nastavte „První číslovaná stránka“ na 2 a pak zvolte, jaké číslo se na ní má zobrazit.',
      },
      {
        q: 'Funguje to i na otočených stránkách?',
        a: 'Ano. Čísla se umísťují vzhledem k tomu, co vidíte na obrazovce, včetně otočených stránek.',
      },
      {
        q: 'Které písmo se používá?',
        a: 'Helvetica, která pokrývá číslice a latinku.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Čísla se kreslí nad každou stránku, nikdy ne pod stávající obsah.',
      'Používá vestavěné písmo Helvetica.',
    ],
  },
  'watermark-pdf': {
    name: 'Vodoznak do PDF',
    description: 'Vložte text nebo obrázek přes stránky PDF s nastavitelnou průhledností a úhlem.',
    metaDescription: 'Přidejte vodoznak do PDF online zdarma. Vložte text nebo obrázek na střed či dlaždicově, s vlastní průhledností a otočením. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte textový nebo obrázkový vodoznak a nastavte jeho velikost, průhlednost, úhel a rozložení.',
      'Použijte ho na všechny stránky nebo na výběr a stáhněte.',
    ],
    faq: [
      {
        q: 'Lze vodoznak odstranit?',
        a: 'Kreslí se přes stránku a nejde o bezpečnostní prvek. Kdokoli s editorem PDF ho může odstranit. Pro silnější ochranu ho zkombinujte s nástrojem Chránit PDF heslem.',
      },
      {
        q: 'Mohu použít urdštinu, arabštinu nebo jiné abecedy?',
        a: 'Ne jako psaný text, protože vestavěná písma PDF pokrývají jen latinku. Vytvořte průhledný PNG se svým textem a použijte volbu s obrázkem.',
      },
      {
        q: 'Je vodoznak před textem stránky, nebo za ním?',
        a: 'Před ním. Snižte průhlednost, aby stránka zůstala čitelná.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Textové vodoznaky podporují jen latinku, číslice a běžné symboly.',
      'Obrázky pro vodoznak: PNG nebo JPG, do 5 MB.',
      'Vodoznak se kreslí nad stávající obsah stránky.',
    ],
  },
  'crop-pdf': {
    name: 'Oříznout PDF',
    description: 'Ořízněte okraje nebo ponechte vybranou oblast na každé stránce, s živým náhledem stránky.',
    metaDescription: 'Ořezávejte stránky PDF online zdarma. Přetáhněte ořezový rámeček na náhledu stránky nebo zadejte okraje a použijte je na všechny či vybrané stránky. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF a vyberte stránku pro náhled.',
      'Přetažením rámečku nebo zadáním okrajů vyberte oblast, která se má ponechat.',
      'Zvolte, které stránky se mají oříznout, a stáhněte.',
    ],
    faq: [
      {
        q: 'Odstraní se oříznutý obsah?',
        a: 'Ne. Oříznutí mění viditelnou oblast každé stránky, ale obsah mimo ni zůstává v souboru. Nespoléhejte na oříznutí při skrývání citlivých informací.',
      },
      {
        q: 'Co když mají stránky různou velikost?',
        a: 'Stejné proporce se použijí na každou zvolenou stránku, takže se stránky různých velikostí ořežou o stejné procento.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Oříznutí obsah skryje, ale neodstraní.',
      'Oblast oříznutí je podíl každé stránky, nikoli pevná velikost v milimetrech.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Upravit metadata PDF',
    description: 'Změňte název, autora, předmět a klíčová slova PDF, nebo odeberte všechna metadata.',
    metaDescription: 'Upravte metadata PDF online zdarma. Změňte název, autora, předmět a klíčová slova, nebo odstraňte všechny vlastnosti dokumentu. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF; jeho aktuální vlastnosti se vyplní.',
      'Upravte pole, nebo zvolte Odebrat všechna metadata.',
      'Uložte a stáhněte aktualizované PDF.',
    ],
    faq: [
      {
        q: 'Co odebere volba „Odebrat všechna metadata“?',
        a: 'Informace o dokumentu (název, autor, předmět, klíčová slova, tvůrce, producent a data) a vložená metadata XMP. Text stránek, obrázky ani komentáře se nemění.',
      },
      {
        q: 'Proč metadata upravovat?',
        a: 'Abyste opravili chybný název zobrazený na kartách prohlížeče a ve výsledcích vyhledávání, uvedli správného autora nebo odstranili osobní údaje před sdílením souboru.',
      },
      {
        q: 'Podporuje i text mimo latinku?',
        a: 'Ano. Názvy a autoři v urdštině, arabštině, čínštině a dalších písmech se ukládají správně.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Mění se jen vlastnosti na úrovni dokumentu. Komentáře, data formulářů a obsah stránek zůstávají beze změny.',
    ],
  },
  "protect-pdf": {
    name: "Chránit PDF",
    description: "Zamkněte PDF heslem pomocí šifrování AES-256.",
    metaDescription: "Chraňte PDF heslem online zdarma. Šifrování AES-256 probíhá ve vašem prohlížeči; váš soubor ani heslo se nikdy nenahrávají.",
    steps: [
      "Přidejte PDF.",
      "Dvakrát zadejte heslo a zvolte, co smějí čtenáři dělat (tisknout, kopírovat, upravovat).",
      "Chraňte ho a stáhněte zašifrovanou kopii.",
    ],
    faq: [
      { q: "Jak silná je ochrana?", a: "Soubory jsou šifrovány AES-256, nejsilnějším standardním šifrováním PDF. V praxi bezpečnost závisí na vašem heslu: použijte dlouhé, které nepoužíváte nikde jinde." },
      { q: "Co když heslo zapomenu?", a: "Nelze ho obnovit a neexistuje obnovení hesla. Původní soubor a heslo uchovejte na bezpečném místě." },
      { q: "Jsou možnosti tisku, kopírování a úprav vynucovány?", a: "Jsou to požadavky, které většina programů pro PDF respektuje, ale nejsou neprolomitelné. Soubor skutečně chrání heslo." },
    ],
    limits: [
      "Nejvýše 100 MB na PDF.",
      "Hesla: až 127 standardních znaků (písmena, číslice a symboly).",
      "PDF, které už má heslo, je třeba nejprve odemknout.",
      "Velmi staré čtečky PDF (z doby před rokem 2008) nemusí soubory AES-256 otevřít.",
    ],
  },
  'unlock-pdf': {
    name: 'Odemknout PDF',
    description: 'Odstraňte heslo z PDF, ke kterému máte přístup, aby se otevíralo bez omezení.',
    metaDescription: 'Odemkněte PDF chráněné heslem online zdarma. Zadejte heslo a uložte nechráněnou kopii; zpracování probíhá ve vašem prohlížeči a nic se nenahrává.',
    steps: [
      'Přidejte chráněné PDF.',
      'Pokud se zobrazí výzva, zadejte heslo. PDF, která jen omezují tisk nebo kopírování, heslo nepotřebují.',
      'Stáhněte odemčenou kopii.',
    ],
    faq: [
      {
        q: 'Odemkne nástroj PDF, když zapomenu heslo?',
        a: 'Ne. Tento nástroj hesla nikdy neuhaduje ani neláme. Ochranu odstraní, jen když zadáte správné heslo, nebo když soubor pouze omezuje akce, například tisk.',
      },
      {
        q: 'Je to povoleno?',
        a: 'Používejte ho jen na soubory, které vlastníte nebo k jejichž otevření máte oprávnění. Za použití výsledku odpovídáte vy.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'Podporuje standardní ochranu PDF heslem (RC4 a AES).',
      'Digitální podpis po opětovném uložení souboru přestane být platný.',
      'Soubory chráněné certifikátem nebo DRM nejsou podporovány.',
    ],
  },
  'extract-pdf-text': {
    name: 'Extrahovat text z PDF',
    description: 'Zkopírujte z PDF všechen vybratelný text, stránku po stránce.',
    metaDescription: 'Extrahujte text z PDF online zdarma. Získejte vybratelný text všech stránek nebo jejich rozsahu, zkopírujte ho nebo uložte jako .txt. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF.',
      'Zvolte všechny stránky nebo rozsah a zda se mají označit konce stránek.',
      'Zkopírujte text, nebo ho stáhněte jako soubor .txt.',
    ],
    faq: [
      {
        q: 'Proč je výsledek prázdný?',
        a: 'PDF je pravděpodobně sken, tedy obrázek textu, nikoli skutečný text. K jeho přečtení je potřeba OCR (rozpoznávání textu), které tento nástroj neprovádí.',
      },
      {
        q: 'Zachová se rozvržení?',
        a: 'Řádky a odstavce se rekonstruují co nejlépe, ale sloupce, tabulky a poznámky pod čarou se mohou objevit v jiném pořadí.',
      },
      {
        q: 'Otevře nástroj PDF chráněná heslem?',
        a: 'Ne. Šifrované PDF se rozpozná a zamítne s jasnou zprávou. Nejprve z něj odstraňte heslo naším nástrojem Odemknout PDF.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'PDF chráněná heslem (šifrovaná) nejsou podporována.',
      'Velmi velká nebo složitá PDF závisejí na paměti vašeho zařízení.',
      'Extrahuje se jen skutečný text; naskenované stránky vyžadují OCR.',
      'Pořadí čtení se řídí PDF a u složitých rozvržení se může lišit od vizuálního pořadí.',
    ],
  },
  "compress-pdf": {
    name: "Komprimovat PDF",
    description: "Zmenšete PDF opětovnou kompresí jeho obrázků, zatímco text zůstane vybratelný.",
    metaDescription: "Komprimujte PDF online zdarma. Zvolte extrémní, doporučenou nebo slabou kompresi pro zmenšení souboru při zachování vybratelného textu. Běží ve vašem prohlížeči.",
    steps: [
      "Přidejte své PDF.",
      "Zvolte extrémní, doporučenou nebo slabou kompresi. Text zůstane vybratelný; znovu se komprimují jen obrázky.",
      "Komprimujte, zkontrolujte ušetřenou velikost a stáhněte výsledek.",
    ],
    faq: [
      { q: "Proč se moje PDF skoro nezmenšilo?", a: "Nástroj znovu komprimuje obrázky JPEG, takže nejvíc pomáhá u PDF plných fotografií nebo skenů. PDF, které je většinou text nebo má obrázky již malé, se příliš zmenšit nedá. Když nelze nic ušetřit, nástroj to řekne a vrátí vám původní soubor místo většího." },
      { q: "Zhorší se kvalita?", a: "Obrázky ztratí trochu detailů výměnou za velikost; slabá komprese je nechá téměř beze změny a extrémní je viditelně změkčí. Text a vektorová grafika se nedotýkají, takže text zůstane vybratelný a prohledávatelný." },
    ],
    limits: [
      "Znovu se komprimují jen vložené obrázky JPEG. Obrázky ve stylu PNG (Flate), písma a další obsah zůstávají beze změny.",
      "Barvy znovu komprimovaných obrázků se mohou velmi mírně posunout.",
      "Nejvýše 100 MB na PDF. PDF chráněná heslem je třeba nejprve odemknout.",
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Rozpoznejte text v naskenovaných PDF (anglicky) a získejte PDF s možností vyhledávání.',
    metaDescription: 'OCR PDF online zdarma. Rozpoznejte anglický text v naskenovaných PDF a stáhněte PDF s možností vyhledávání nebo čistý text. Modul OCR běží lokálně ve vašem prohlížeči.',
    steps: [
      'Přidejte naskenované PDF.',
      'Zvolte stránky a kvalitu. Stránky, které už obsahují vybratelný text, lze přeskočit.',
      'Spusťte OCR, zkontrolujte rozpoznaný text a stáhněte PDF s možností vyhledávání nebo textový soubor.',
    ],
    faq: [
      {
        q: 'Které jazyky jsou podporovány?',
        a: 'Zatím pouze angličtina. Text v jiných jazycích se přečte chybně. Další jazyky lze přidat později, aniž by se změnil způsob fungování nástroje.',
      },
      {
        q: 'Jak je přesné?',
        a: 'Nejlépe fungují čisté, rovné skeny tištěného textu v rozlišení 200 až 300 DPI. Rukopis, velmi drobné písmo, málo kontrastní nebo zkosené stránky vedou k více chybám. Důležitá čísla vždy zkontrolujte.',
      },
    ],
    limits: [
      'Pouze angličtina. Rukopis se nerozpoznává spolehlivě.',
      'Původní stránky zůstávají přesně tak, jak jsou; přidá se neviditelná textová vrstva, aby bylo možné v textu vyhledávat a kopírovat ho.',
      'OCR je u velkých dokumentů pomalé (několik sekund na stránku). První spuštění také načte modul (zhruba 3 MB).',
      'Maximálně 100 MB na PDF. Velmi velké stránky mohou být odmítnuty na ochranu vašeho prohlížeče.',
    ],
  },
  'sign-pdf': {
    name: 'Podepsat PDF',
    description: 'Nakreslete, napište nebo nahrajte podpis a umístěte ho na stránky PDF.',
    metaDescription: 'Podepište PDF online zdarma. Nakreslete, napište nebo nahrajte podpis, umístěte ho na libovolné stránky a stáhněte podepsané PDF. Vizuální podpis ve vašem prohlížeči.',
    steps: [
      'Přidejte PDF, které potřebujete podepsat.',
      'Vytvořte podpis nakreslením, napsáním jména nebo nahráním obrázku.',
      'Přetáhněte podpis na správné místo na stránce, zvolte, na které stránky se vloží, a stáhněte podepsané PDF.',
    ],
    faq: [
      {
        q: 'Je to právně závazný digitální podpis?',
        a: 'Jde o vizuální podpis: obrázek vašeho podpisu umístěný na stránce. Není to kryptografický digitální podpis, nemá certifikát a nemůže prokázat, kdo podepsal, ani odhalit pozdější změny. Zda bude přijat, záleží na tom, kdo ho požaduje. Některé organizace vyžadují certifikované služby elektronického podpisu.',
      },
    ],
    limits: [
      'Pouze vizuální podpis: bez certifikátu, bez časového razítka, bez detekce manipulace.',
      'Podpis se umístí jako obrázek nad stránku; nevyplňuje formulářové pole pro podpis.',
      'Maximálně 100 MB na PDF. PDF chráněná heslem je nutné nejprve odemknout.',
    ],
  },
  "fill-pdf-forms": {
    name: "Vyplnit formuláře PDF",
    description: "Vyplňte textová pole, zaškrtávací políčka a nabídky formuláře PDF, nebo pište do jakéhokoli PDF.",
    metaDescription: "Vyplňujte formuláře PDF online zdarma. Pište do polí, zaškrtávejte políčka a vybírejte možnosti ve vyplnitelném PDF a stáhněte ho jako upravitelné nebo zploštělé. Ve vašem prohlížeči.",
    steps: [
      "Přidejte formulář PDF. Do PDF bez polí můžete psát kliknutím na stránku.",
      "Vyplňte pole uvedená pod názvem souboru. Pole jsou seskupena podle stránek.",
      "Zvolte, zda formulář zůstane upravitelný, nebo se zploští, a stáhněte vyplněné PDF.",
    ],
    faq: [
      { q: "Moje PDF nezobrazuje žádná pole. Proč?", a: "PDF nemá skutečná pole formuláře, například jde o sken nebo formulář, který je jen obrázek. Můžete přesto kliknout na stránku tam, kam má text přijít, napsat ho a uložit kopii s vepsaným textem. Pole formulářů XFA (některé úřední a bankovní formuláře) nelze vyplnit." },
      { q: "Co dělá zploštění?", a: "Zploštění vpálí vaše odpovědi do stránky a odstraní pole formuláře, takže odpovědi už nelze upravovat. Použijte ho pro kopii, kterou odesíláte; upravitelnou kopii si nechte pro sebe." },
    ],
    limits: [
      "Text může používat latinku, číslice a běžné symboly (písmo formuláře nemá jiné abecedy).",
      "Pole podpisu a tlačítka se zobrazí, ale nelze je vyplnit; pro podpisy použijte Podepsat PDF.",
      "Formuláře XFA (dynamické): pole nelze vyplnit, ale do stránek můžete psát.",
      "Text napsaný do PDF bez polí se zapíše do stránky a později ho nelze upravit.",
      "Nejvýše 100 MB na PDF.",
    ],
  },
  'redact-pdf': {
    name: 'Začernit PDF',
    description: 'Natrvalo začerněte text a oblasti: začerněné stránky se znovu sestaví jako obrázky.',
    metaDescription: 'Začerněte PDF online zdarma. Začerněte jména, čísla a oblasti tak, aby byl text pod nimi skutečně odstraněn, nejen zakryt. Běží ve vašem prohlížeči; nic se nenahrává.',
    steps: [
      'Přidejte PDF a vyberte stránku.',
      'Nakreslete rámečky přes to, co má zmizet, nebo vyhledejte slova, e-maily a čísla a označte je automaticky.',
      'Použijte začernění a stáhněte. Před sdílením výsledek vždy zkontrolujte.',
    ],
    faq: [
      {
        q: 'Je skrytý text opravdu odstraněn?',
        a: 'Ano. Každá stránka se začerněním se znovu sestaví jako obrázek s vykreslenými černými rámečky, takže text a objekty pod nimi v novém souboru neexistují. Černý obdélník nakreslený přes text, jak to dělá řada nástrojů, by text ponechal vybratelný. Stránky, které jste nezačernili, se kopírují beze změny.',
      },
      {
        q: 'Proč na začerněných stránkách nelze vybírat text?',
        a: 'Protože jsou to nyní obrázky. Tak se podkladový obsah ničí. Pokud potřebujete text s možností vyhledávání, spusťte poté OCR PDF; začerněná slova zůstanou černá.',
      },
      {
        q: 'Najde všechny shody automaticky?',
        a: 'Vyhledávání označí shody, které leží v rámci jednoho řádku textu. Fráze, kterou PDF rozdělí na části, nebo text, který je součástí obrázku, mohou uniknout. Zkontrolujte každou stránku a podle potřeby nakreslete rámečky ručně.',
      },
    ],
    limits: [
      'Začerněné stránky se změní na obrázky: na těchto stránkách není vybratelný text, odkazy ani formulářová pole.',
      'Automatické vyhledávání funguje jen na vybratelném textu a jen v rámci jednoho úseku textu; naskenované stránky vyžadují ruční kreslení rámečků.',
      'Vlastnosti dokumentu (název, autor…) se z výsledku odeberou, pokud je nezvolíte ponechat.',
      'Maximálně 100 MB na PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Porovnat PDF',
    description: 'Zjistěte, co se mezi dvěma PDF změnilo: textové rozdíly a zvýrazněné stránky.',
    metaDescription: 'Porovnejte dva soubory PDF online zdarma. Zobrazte přidaná a odebraná slova stránku po stránce a zvýrazněte vizuální rozdíly mezi verzemi. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte původní a upravené PDF.',
      'Porovnejte je: stránky se zobrazí s počtem přidaných a odebraných slov.',
      'Otevřete stránku a přečtěte si změny textu, nebo přepněte na vizuální zobrazení a uvidíte změněné oblasti červeně.',
    ],
    faq: [
      {
        q: 'Co ukazuje porovnání textu?',
        a: 'U každé stránky slova, která byla mezi původním a upraveným dokumentem přidána (zeleně) a odebrána (červeně), přičemž nezměněný text je sbalený. Stránky se párují podle čísla.',
      },
      {
        q: 'A co naskenovaná PDF?',
        a: 'Skeny nemají vybratelný text, takže porovnání textu nic nenajde. Použijte vizuální porovnání, nebo na oba soubory nejprve spusťte OCR PDF.',
      },
    ],
    limits: [
      'Stránky se porovnávají podle čísla: pokud byla vložena stránka, další stránky se zobrazí jako změněné.',
      'Vizuální porovnání vykresluje každou stránku v rozlišení obrazovky; drobné rozdíly pod touto úrovní se nemusí zobrazit.',
      'Porovnává se až 100 stránek na soubor. PDF chráněná heslem je nutné nejprve odemknout.',
    ],
  },
  'word-counter': {
    name: 'Počítadlo slov',
    description: 'Počítejte slova, znaky a věty a odhadněte dobu čtení během psaní.',
    metaDescription: 'Bezplatné online počítadlo slov. Okamžitě spočítá slova, znaky, věty a odstavce a odhadne dobu čtení a přednesu.',
    steps: [
      'Napište nebo vložte svůj text.',
      'Sledujte živé statistiky nad editorem.',
      'Tlačítkem Vymazat začněte znovu.',
    ],
    faq: [
      {
        q: 'Jak se počítají slova?',
        a: 'Slovo je libovolná posloupnost znaků oddělená mezerami. Slova s pomlčkou se počítají jako jedno a čísla se počítají jako slova.',
      },
      {
        q: 'Jak se počítá doba čtení?',
        a: 'Doba čtení předpokládá 238 slov za minutu a doba přednesu 150 slov za minutu, což jsou typické průměry pro dospělé.',
      },
    ],
    limits: [
      'Počty vycházejí z mezer, takže jazyky psané bez mezer (například čínština nebo japonština) zobrazí jedno slovo na každý souvislý úsek textu.',
    ],
  },
  'character-counter': {
    name: 'Počítadlo znaků',
    description: 'Počítejte znaky s mezerami i bez nich a kontrolujte text vůči běžným limitům délky.',
    metaDescription: 'Bezplatné online počítadlo znaků. Spočítá znaky s mezerami i bez nich, bajty a řádky a zkontroluje limity pro příspěvky, meta značky a SMS.',
    steps: [
      'Napište nebo vložte svůj text.',
      'Přečtěte si součty a ukazatele limitů.',
      'Upravujte text, dokud se nevejde.',
    ],
    faq: [
      {
        q: 'Počítají se emotikony jako jeden znak?',
        a: 'Ano. Počítadlo počítá viditelné znaky (grafémové shluky), takže emotikon se počítá jako jeden, i když zabírá několik bajtů.',
      },
      {
        q: 'Proč se mé limity SMS liší?',
        a: 'Délka SMS závisí na kódování. Zprávy se znaky mimo latinku nebo s emotikony mají kratší limit než zde uváděných 160 znaků.',
      },
    ],
    limits: [
      'Zobrazené limity jsou běžná doporučení a časem se mění; aktuální pravidlo si ověřte u každé platformy.',
    ],
  },
  'case-converter': {
    name: 'Převodník velikosti písmen',
    description: 'Převeďte text na velká, malá, titulková, větná, camel, snake, kebab a další písmena.',
    metaDescription: 'Bezplatný online převodník velikosti písmen. Změňte text na VELKÁ, malá, Titulková, Větná, camelCase, snake_case, kebab-case a další.',
    steps: [
      'Vložte svůj text.',
      'Zvolte požadovanou velikost písmen.',
      'Zkopírujte převedený výsledek.',
    ],
    faq: [
      {
        q: 'Zvládá titulková velikost malá slova?',
        a: 'Ano. Krátká slova, například „a“, „of“ a „the“, zůstávají malými písmeny, pokud nezačínají nebo nekončí text.',
      },
    ],
    limits: [
      'Titulková velikost se řídí běžnými anglickými stylovými pravidly a nemusí vyhovovat každé jazykové příručce.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Odebrat duplicitní řádky',
    description: 'Odstraňte z seznamu opakující se řádky při zachování původního pořadí.',
    metaDescription: 'Bezplatný online nástroj na odebrání duplicitních řádků. Smaže opakované řádky ze seznamů, s volbami pro velikost písmen, mezery a prázdné řádky.',
    steps: [
      'Vložte svůj seznam, jednu položku na řádek.',
      'Zvolte, zda záleží na velikosti písmen a mezerách.',
      'Zkopírujte výsledek bez duplicit.',
    ],
    faq: [
      {
        q: 'Která kopie duplicity se ponechá?',
        a: 'Ponechá se první výskyt a pozdější se odeberou, takže se zachová původní pořadí.',
      },
    ],
    limits: [
      'Pracuje pouze s celými řádky.',
    ],
  },
  'text-sorter': {
    name: 'Řazení textu',
    description: 'Seřaďte řádky abecedně, číselně, podle délky nebo náhodně.',
    metaDescription: 'Bezplatné online řazení textu. Seřaďte řádky A–Z, Z–A, číselně, podle délky nebo je zamíchejte, s ignorováním velikosti písmen a přirozeným řazením.',
    steps: [
      'Vložte své řádky.',
      'Zvolte způsob řazení a možnosti.',
      'Zkopírujte seřazený seznam.',
    ],
    faq: [
      {
        q: 'Co je přirozené řazení?',
        a: 'Přirozené řazení porovnává čísla uvnitř textu podle hodnoty, takže „item2“ je před „item10“.',
      },
    ],
    limits: [
      'Abecední řazení používá pravidla jazykového nastavení vašeho prohlížeče.',
    ],
  },
  'text-cleaner': {
    name: 'Čištění textu',
    description: 'Ořízněte mezery, sloučte mezery, odeberte prázdné řádky a odstraňte neviditelné znaky.',
    metaDescription: 'Bezplatné online čištění textu. Odstraní z vloženého textu nadbytečné mezery, prázdné řádky, zalomení řádků, neviditelné znaky a typografické uvozovky.',
    steps: [
      'Vložte svůj text.',
      'Zaškrtněte potřebné možnosti čištění.',
      'Zkopírujte vyčištěný text.',
    ],
    faq: [
      {
        q: 'Co jsou neviditelné znaky?',
        a: 'Mezery nulové šířky, měkké spojovníky a značky pořadí bajtů se často dostanou do textu při kopírování z webových stránek a mohou rozbít kód nebo porovnávání.',
      },
    ],
    limits: [
      'Operace se provádějí v pevném pořadí; pokud potřebujete jiné pořadí, spusťte nástroj dvakrát.',
    ],
  },
  'text-diff-checker': {
    name: 'Porovnání textů',
    description: 'Porovnejte dva texty a zjistěte přesně, které řádky a slova se změnily.',
    metaDescription: 'Bezplatné online porovnání textů. Porovnejte dvě verze textu vedle sebe a zvýrazněte přidané, odebrané a změněné řádky nebo slova.',
    steps: [
      'Vložte původní text vlevo a změněný text vpravo.',
      'Zvolte porovnávání po řádcích nebo po slovech.',
      'Prohlédněte si zvýrazněné změny.',
    ],
    faq: [
      {
        q: 'Jaký je rozdíl mezi režimem řádků a slov?',
        a: 'Režim řádků označí celé změněné řádky. Režim slov zvýrazní přesná slova v textu, což se hodí pro souvislý text.',
      },
    ],
    limits: [
      'Velmi rozsáhlé vstupy (nad zhruba 200 000 znaků) mohou být pomalé.',
    ],
  },
  'json-formatter': {
    name: 'Formátovač JSON',
    description: 'Naformátujte JSON s vlastním odsazením a řazením klíčů.',
    metaDescription: 'Bezplatný online formátovač JSON. Přehledně naformátujte JSON s 2 nebo 4 mezerami či tabulátory, seřaďte klíče a zobrazte přesná místa chyb.',
    steps: [
      'Vložte svůj JSON.',
      'Zvolte odsazení a řazení.',
      'Zkopírujte nebo stáhněte naformátovaný výsledek.',
    ],
    faq: [
      {
        q: 'Proč nástroj můj JSON odmítá?',
        a: 'Striktní JSON nepovoluje komentáře, koncové čárky ani jednoduché uvozovky. Chybová zpráva ukazuje řádek a sloupec problému.',
      },
    ],
    limits: [
      'Čísla větší než 2^53 ztrácejí přesnost, protože je prohlížeč zpracovává jako čísla s plovoucí desetinnou čárkou.',
    ],
  },
  'json-validator': {
    name: 'Validátor JSON',
    description: 'Zkontrolujte, zda je JSON platný, a zjistěte přesný řádek a sloupec každé chyby.',
    metaDescription: 'Bezplatný online validátor JSON. Zkontrolujte syntaxi JSON a najděte přesný řádek a sloupec chyb, spolu se shrnutím struktury.',
    steps: [
      'Vložte svůj JSON.',
      'Okamžitě uvidíte, zda je platný.',
      'Opravte nahlášenou chybu a zkontrolujte znovu.',
    ],
    faq: [
      {
        q: 'Ověřuje se podle schématu JSON Schema?',
        a: 'Ne. Kontroluje se pouze syntaxe: zda je text správně utvořený JSON.',
      },
    ],
    limits: [
      'Pouze validace syntaxe; validace podle JSON Schema není součástí.',
    ],
  },
  'json-minifier': {
    name: 'Minifikátor JSON',
    description: 'Odeberte z JSON mezery, aby byl co nejkompaktnější.',
    metaDescription: 'Bezplatný online minifikátor JSON. Odstraní z JSON mezery a zmenší přenášená data a zobrazí, kolik bajtů jste ušetřili.',
    steps: [
      'Vložte svůj JSON.',
      'Zobrazí se minifikovaný výstup s ušetřenou velikostí.',
      'Zkopírujte nebo stáhněte.',
    ],
    faq: [
      {
        q: 'Mění minifikace data?',
        a: 'Ne. Odebírají se jen nepodstatné mezery; klíče, hodnoty a pořadí zůstávají beze změny.',
      },
    ],
    limits: [
      'Čísla větší než 2^53 ztrácejí přesnost, protože je prohlížeč zpracovává jako čísla s plovoucí desetinnou čárkou.',
    ],
  },
  'xml-formatter': {
    name: 'Formátovač XML',
    description: 'Přehledně naformátujte nebo minifikujte XML a odhalte nespárované či neuzavřené značky.',
    metaDescription: 'Bezplatný online formátovač XML. Zpřehledněte nebo minifikujte XML s nastavitelným odsazením a odhalte nespárované či neuzavřené značky.',
    steps: [
      'Vložte své XML.',
      'Zvolte Formátovat nebo Minifikovat a odsazení.',
      'Zkopírujte výsledek.',
    ],
    faq: [
      {
        q: 'Jak důkladně se XML ověřuje?',
        a: 'Nástroj kontroluje vnořování značek, neuzavřené značky a neukončené komentáře nebo sekce CDATA. Neověřuje podle schématu DTD ani XSD.',
      },
    ],
    limits: [
      'Pouze strukturální kontroly; bez validace DTD nebo XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Kodér / dekodér URL',
    description: 'Kódujte nebo dekódujte URL a hodnoty v řetězci dotazu procentovým kódováním.',
    metaDescription: 'Bezplatný online kodér a dekodér URL. Zakódujte text pro URL procentovým kódováním nebo dekódujte zakódované řetězce, pro celá URL i jednotlivé části.',
    steps: [
      'Zvolte Kódovat nebo Dekódovat.',
      'Vložte svůj text nebo URL.',
      'Zkopírujte výsledek.',
    ],
    faq: [
      {
        q: 'Část, nebo celé URL?',
        a: 'Použijte Část pro jednu hodnotu, například parametr dotazu; kóduje znaky jako / ? & =. Použijte Celé URL, pokud má zůstat struktura URL nedotčená.',
      },
    ],
    limits: [
      'Dekódování selže u poškozených procentových sekvencí, například osamoceného %.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Kodér / dekodér HTML',
    description: 'Převeďte speciální znaky na entity HTML, nebo entity dekódujte zpět na text.',
    metaDescription: 'Bezplatný online kodér a dekodér HTML. Převeďte znaky <, >, & a uvozovky na entity HTML, nebo dekódujte pojmenované i číselné entity.',
    steps: [
      'Zvolte Kódovat nebo Dekódovat.',
      'Vložte svůj text.',
      'Zkopírujte výsledek.',
    ],
    faq: [
      {
        q: 'Zajistí kódování bezpečnost uživatelského vstupu pro HTML?',
        a: 'Převod pěti speciálních znaků učiní text bezpečným uvnitř obsahu prvků HTML a v atributech v uvozovkách. V jiných kontextech nenahrazuje pořádnou šablonovací knihovnu nebo sanitizér.',
      },
    ],
    limits: [
      'Dekódování podporuje běžné pojmenované entity a všechny číselné entity.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Kodér / dekodér Base64',
    description: 'Zakódujte text do Base64 nebo dekódujte Base64 zpět na text, s plnou podporou UTF-8.',
    metaDescription: 'Bezplatný online kodér a dekodér Base64. Převádějte text na Base64 a zpět s podporou UTF-8 a volitelnou abecedou bezpečnou pro URL.',
    steps: [
      'Zvolte Kódovat nebo Dekódovat.',
      'Vložte svůj text.',
      'Zkopírujte výsledek.',
    ],
    faq: [
      {
        q: 'Je Base64 šifrování?',
        a: 'Ne. Base64 je kódování, nikoli šifrování. Dekódovat ho může kdokoli, proto ho nikdy nepoužívejte k ochraně tajemství.',
      },
      {
        q: 'Co je Base64 bezpečné pro URL?',
        a: 'Zamění + a / za - a _ a vynechá doplňkové znaky =, aby se hodnota mohla bezpečně vyskytovat v URL a názvech souborů.',
      },
    ],
    limits: [
      'Pro data obrázků použijte Obrázek na Base64 a Base64 na obrázek.',
    ],
  },
  'regex-tester': {
    name: 'Tester regulárních výrazů',
    description: 'Testujte regulární výrazy JavaScriptu se živým zvýrazněním shod a zachycujícími skupinami.',
    metaDescription: 'Bezplatný online tester regulárních výrazů pro JavaScript. Zobrazuje živé shody, zachycující i pojmenované skupiny a náhled nahrazení.',
    steps: [
      'Zadejte vzor a zvolte příznaky.',
      'Vložte text k otestování.',
      'Prohlédněte si shody, skupiny a náhled nahrazení.',
    ],
    faq: [
      {
        q: 'Který dialekt regulárních výrazů se používá?',
        a: 'Regulární výrazy JavaScriptu (ECMAScript), tak jak je implementuje váš prohlížeč. PCRE, Python a další dialekty se v některých funkcích liší.',
      },
      {
        q: 'Proč se při některých vzorech stránka zasekne?',
        a: 'Vzory s vnořeným opakováním mohou způsobit katastrofální zpětné prohledávání. Hledání běží v pracovním vlákně na pozadí a po 1,5 sekundě se zastaví, takže vzor mimo kontrolu stránku nezablokuje, ale vzorům jako (a+)+ byste se přesto měli vyhýbat.',
      },
    ],
    limits: [
      'Pouze syntaxe regulárních výrazů JavaScriptu.',
      'Hledání se zastaví po 5 000 shodách nebo po 1,5 sekundě.',
    ],
  },
  'markdown-previewer': {
    name: 'Náhled Markdownu',
    description: 'Pište Markdown a vedle něj sledujte bezpečný, vyčištěný živý náhled.',
    metaDescription: 'Bezplatný online náhled Markdownu. Pište Markdown ve stylu GitHubu, sledujte živý vyčištěný náhled HTML a zkopírujte výsledné HTML.',
    steps: [
      'Napište nebo vložte Markdown vlevo.',
      'Vpravo uvidíte vykreslený výsledek.',
      'Zkopírujte Markdown nebo vygenerované HTML.',
    ],
    faq: [
      {
        q: 'Je náhled bezpečný?',
        a: 'Ano. Vygenerované HTML se před zobrazením vyčistí knihovnou DOMPurify, takže se skripty a obslužné rutiny událostí odstraní.',
      },
    ],
    limits: [
      'Markdown ve stylu GitHubu přes knihovnu marked; bez rozšíření pro matematiku a diagramy.',
    ],
  },
  'password-generator': {
    name: 'Generátor hesel',
    description: 'Vytvářejte silná hesla: zcela náhodná, nebo zapamatovatelná postavená na jménech a slovech.',
    metaDescription: 'Bezplatný generátor hesel: zcela náhodná hesla nebo hesla na bázi jmen jako Nvidia132@Star s náhodnými čísly, velkými písmeny a symboly. Běží ve vašem prohlížeči.',
    steps: [
      'Zvolte styl: Jméno + slovo pro zapamatovatelné heslo, nebo Zcela náhodné pro maximální bezpečnost.',
      'Nastavte délku, počet hesel a typy znaků, které se mají použít.',
      'Zkopírujte heslo a uložte si ho do správce hesel.',
    ],
    faq: [
      {
        q: 'Je heslo jako Tesla2026#Tech bezpečné?',
        a: 'Je lepší než obyčejné slovo, ale slabší než náhodný text. Útočník může vycházet ze seznamů známých jmen, takže skutečná síla vychází z počtu možností, který se uvádí v bitech. Hesla na bázi jmen používejte pro málo důležité účty a zcela náhodná pro e-mail, bankovnictví a správce hesel.',
      },
      {
        q: 'Proč jen několik symbolů?',
        a: 'Generovaná hesla používají jen čtyři symboly @ # $ *, protože je přijímá téměř každý web a snadno se píšou na jakékoli klávesnici.',
      },
      {
        q: 'Jak dlouhé by heslo mělo být?',
        a: 'Pro důležité účty alespoň 16 znaků. Délka je důležitější než složitost.',
      },
    ],
    limits: [
      'Hesla na bázi jmen se snáze pamatují, ale jsou slabší než zcela náhodná. Zobrazená síla předpokládá útočníka, který ví, jak jsou vytvořena.',
      'Databáze slov je vybraný seznam jmen v latince; není to seznam nejpoužívanějších hesel.',
      'Odhad síly vychází z počtu možných kombinací, nikoli z databází uniklých hesel.',
    ],
  },
  'uuid-generator': {
    name: 'Generátor UUID',
    description: 'Generujte hromadně náhodné UUID verze 4 s možnostmi formátu.',
    metaDescription: 'Bezplatný online generátor UUID. Vytvářejte hromadně náhodná UUID v4, velkými písmeny, bez spojovníků nebo ve složených závorkách, s kryptografickou náhodností.',
    steps: [
      'Zvolte počet UUID a formát.',
      'Vygenerujte.',
      'Zkopírujte seznam.',
    ],
    faq: [
      {
        q: 'Mohou se dvě UUID shodovat?',
        a: 'UUID verze 4 mají 122 náhodných bitů, takže pravděpodobnost kolize je v praxi zanedbatelná.',
      },
    ],
    limits: [
      'Generují se pouze UUID verze 4 (náhodná).',
    ],
  },
  'timestamp-converter': {
    name: 'Převodník časových razítek',
    description: 'Převádějte časová razítka Unix na čitelná data a zpět, v libovolném časovém pásmu.',
    metaDescription: 'Bezplatný online převodník časových razítek Unix. Převeďte sekundy nebo milisekundy epochy na data v UTC a místním čase a data zpět na časová razítka.',
    steps: [
      'Zadejte časové razítko Unix nebo vyberte datum.',
      'Přečtěte si výsledek v UTC, ve svém místním pásmu a ve formátu ISO 8601.',
      'Zkopírujte libovolnou hodnotu.',
    ],
    faq: [
      {
        q: 'Sekundy, nebo milisekundy?',
        a: 'Časová razítka s 13 nebo více číslicemi se považují za milisekundy, kratší za sekundy. Můžete to přepsat ručně.',
      },
    ],
    limits: [
      'Podporovaný rozsah odpovídá rozsahu dat v JavaScriptu: zhruba roky -271821 až 275760.',
    ],
  },
  'color-converter': {
    name: 'Převodník barev',
    description: 'Převádějte barvy mezi HEX, RGB, HSL a HSV, s živým náhledem a kontrolou kontrastu.',
    metaDescription: 'Bezplatný online převodník barev. Převádějte hodnoty HEX, RGB, HSL a HSV, zobrazte náhled barvy a zkontrolujte poměry kontrastu podle WCAG.',
    steps: [
      'Zadejte barvu v libovolném formátu nebo použijte výběr barvy.',
      'Sledujte, jak se aktualizují všechny formáty.',
      'Zkopírujte potřebnou hodnotu.',
    ],
    faq: [
      {
        q: 'Co ukazuje kontrola kontrastu?',
        a: 'Zobrazí poměr kontrastu podle WCAG mezi barvou a bílým a černým textem, což pomáhá vybrat čitelné kombinace.',
      },
    ],
    limits: [
      'Pouze sRGB; barevné prostory CSS Color 4, například LAB, LCH a Display-P3, nejsou podporovány.',
      'Hodnoty průhlednosti (alfa) se přijímají, ale ignorují.',
    ],
  },
  'qr-code-generator': {
    name: 'Generátor QR kódů',
    description: 'Vytvářejte kódy QR pro odkazy, text, Wi-Fi, e-mail nebo telefonní čísla jako PNG nebo SVG.',
    metaDescription: 'Bezplatný generátor kódů QR. Vytvořte kódy QR pro URL, text, Wi-Fi, e-mail a telefonní čísla a stáhněte je jako PNG nebo SVG. Vytvořeno ve vašem prohlížeči.',
    steps: [
      'Zvolte, co má kód obsahovat, a vyplňte podrobnosti.',
      'Podle potřeby upravte velikost, barvy a opravu chyb.',
      'Stáhněte PNG nebo SVG a před tiskem kód vyzkoušejte telefonem.',
    ],
    faq: [
      {
        q: 'Vyprší platnost kódů?',
        a: 'Ne. Jde o statické kódy: data jsou uložena přímo v kódu, takže fungují navždy a nic se nesleduje.',
      },
      {
        q: 'Jakou úroveň opravy chyb zvolit?',
        a: 'Pro většinu použití se hodí Střední. Zvolte Kvartil nebo Vysokou, pokud se kód může zašpinit nebo poškodit, ale vyšší úrovně činí kód hustším a hůře čitelným v malých velikostech.',
      },
      {
        q: 'Mohu kódy používat komerčně?',
        a: 'Ano. Standard kódu QR je otevřený a kódy vytvořené zde nemají od nás žádné poplatky, vodoznaky ani sledování.',
      },
    ],
    limits: [
      'Pouze statické kódy: bez sledování skenování a bez upravitelných kódů.',
      'Velmi dlouhý text vytvoří hustý kód, který se špatně skenuje, proto ho držte krátký.',
      'Nejlépe se skenují tmavé barvy na světlém podkladu se silným kontrastem.',
    ],
  },
  "scan-to-pdf": {
    name: "Sken do PDF",
    description: "Přeměňte fotky nebo skeny papírových stránek na jedno PDF s volitelným čištěním pro lepší čitelnost.",
    metaDescription: "Sken do PDF online: spojte fotky nebo skeny papírových stránek do jednoho PDF, nastavte pořadí stránek a vyrovnejte stíny v režimu černobílého dokumentu.",
    steps: [
      "Přidejte fotky nebo skeny stránek, případně pořiďte fotku, pokud to váš telefon nebo tablet podporuje.",
      "Seřaďte stránky a vyberte velikost stránky a styl čištění.",
      "Vytvořte PDF a stáhněte je.",
    ],
    faq: [
      { q: "Rozpozná nástroj text na stránce?", a: "Ne. Sken do PDF mění obrázky na stránky PDF a může je vyčistit, ale text zůstává součástí obrázku. Aby se v něm dalo vyhledávat, pusťte výsledek přes OCR PDF." },
      { q: "Mohu použít fotoaparát telefonu?", a: "Na telefonech a tabletech, jejichž prohlížeč to podporuje, tlačítko „Vyfotit“ otevře fotoaparát. Jinak vyberte fotky, které už máte uložené v zařízení." },
      { q: "Co dělají styly čištění?", a: "„Originál“ zachová barvy. „Odstíny šedi“ odstraní barvu. „Černobílý dokument“ změní stránku na čistě černý text na bílém papíře a vyrovná stíny a nerovnoměrné osvětlení, což se hodí pro tištěné stránky a poznámky, ne pro fotografie." },
    ],
    limits: [
      "Nejvýše 25 MB na obrázek a 100 obrázků na PDF.",
      "Velké fotky se zmenší přibližně na velikost A4 při 300 dpi, aby PDF zůstalo malé.",
      "Některé formáty telefonů, například HEIC, prohlížeče přečíst neumějí; uložte je nejprve jako JPG.",
    ],
  },
  "html-to-pdf": {
    name: "HTML do PDF",
    description: "Převeďte soubor HTML nebo vložený HTML na PDF s textem, který lze vybírat.",
    metaDescription: "HTML do PDF online: převeďte soubor HTML nebo vložený kód HTML na PDF se skutečným, vybratelným textem, nadpisy, seznamy, tabulkami a vloženými obrázky.",
    steps: [
      "Vyberte soubor HTML nebo vložte své HTML.",
      "Vyberte velikost stránky.",
      "Převeďte a stáhněte PDF.",
    ],
    faq: [
      { q: "Mohu zadat adresu webové stránky?", a: "Ne. Načítání jiných webů by vyžadovalo odeslání adresy na server a stránka se bez svých stylů málokdy převede dobře. Uložte stránku v prohlížeči jako soubor HTML a použijte tento soubor, nebo vložte její HTML." },
      { q: "Bude PDF vypadat jako webová stránka?", a: "Ne, ne přesně. Nástroj čte strukturu dokumentu (nadpisy, odstavce, seznamy, tabulky, odkazy, tučný a kurzivní text a vložené obrázky) a sestaví z ní jednoduchý dokument. Styly CSS, skripty, webová písma, sloupce a umístěné prvky se neuplatní." },
      { q: "Je bezpečné převádět HTML, kterému nedůvěřuji?", a: "HTML se čte jako neaktivní text: skripty se nespouštějí a z internetu se nic nenačítá. Používají se jen obrázky vložené přímo v HTML." },
      { q: "Jaké jazyky a písma jsou v PDF podporovány?", a: "PDF se vytváří písmem Noto Sans, které pokrývá latinku (včetně polských, českých, rumunských a tureckých písmen), cyrilici, řečtinu, vietnamštinu a dévanágarí. Arabský, hebrejský, thajský, čínský, japonský a korejský text zatím podporován není: tyto znaky se zobrazí jako otazníky a nástroj vám sdělí, kolika se to týkalo. Původní písma dokumentu se nezachovají." },
    ],
    limits: [
      "Nejvýše 10 MB HTML.",
      "Zahrnuty jsou jen obrázky vložené v HTML (adresy data:); obrázky a styly načítané z jiných webů se přeskočí, nestahují se.",
      "Skripty, formuláře, rámce, canvas, video a grafika SVG se nepřevádějí.",
    ],
  },
  "word-to-pdf": {
    name: "Word do PDF",
    description: "Převeďte dokument Wordu (DOCX) do PDF se zachováním nadpisů, seznamů, tabulek a obrázků.",
    metaDescription: "Word do PDF online: převeďte dokument DOCX na PDF s vybratelným textem, nadpisy, seznamy, tabulkami, odkazy a obrázky. Soubor se převádí ve vašem prohlížeči.",
    steps: [
      "Vyberte soubor DOCX.",
      "Vyberte velikost stránky nebo ponechte tu z dokumentu.",
      "Převeďte a stáhněte PDF.",
    ],
    faq: [
      { q: "Bude PDF vypadat přesně jako dokument ve Wordu?", a: "Ne. Kitwell nepoužívá Microsoft Word ani LibreOffice. Čte obsah a strukturu dokumentu a sám je sestaví, takže se písma, mezery a zalomení stránek od Wordu liší. Výsledek před odesláním zkontrolujte." },
      { q: "Co se převádí a co ne?", a: "Převádí se: text s tučným písmem, kurzívou, podtržením a odkazy, nadpisy, odrážkové a číslované seznamy, tabulky, obrázky JPEG a PNG, zalomení řádků a stránek, zarovnání a orientace stránky. Nepřevádí se: záhlaví a zápatí, poznámky pod čarou, textová pole, rovnice, grafy, tvary a obrázky v jiných formátech." },
      { q: "Mohu převést starý soubor .doc?", a: "Ne. Otevřete jej ve Wordu a nejprve uložte jako soubor DOCX." },
      { q: "Jaké jazyky a písma jsou v PDF podporovány?", a: "PDF se vytváří písmem Noto Sans, které pokrývá latinku (včetně polských, českých, rumunských a tureckých písmen), cyrilici, řečtinu, vietnamštinu a dévanágarí. Arabský, hebrejský, thajský, čínský, japonský a korejský text zatím podporován není: tyto znaky se zobrazí jako otazníky a nástroj vám sdělí, kolika se to týkalo. Původní písma dokumentu se nezachovají." },
    ],
    limits: [
      "Pouze soubory DOCX, nejvýše 50 MB. Staré soubory .doc a dokumenty chráněné heslem nejsou podporovány.",
      "Rozvržení je přibližné: sloupce, obtékání textu kolem obrázků, záhlaví, zápatí a poznámky pod čarou se nereprodukují.",
      "Písma originálu jsou nahrazena písmem Noto Sans.",
    ],
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint do PDF",
    description: "Převeďte prezentaci PowerPointu (PPTX) do PDF s jednou stránkou na snímek.",
    metaDescription: "PowerPoint do PDF online: převeďte prezentaci PPTX na PDF s jednou stránkou na snímek se zachováním velikosti snímku, textu, obrázků a jednoduchých tvarů. Přímo ve vašem prohlížeči.",
    steps: [
      "Vyberte soubor PPTX.",
      "Převeďte jej.",
      "Zkontrolujte stránky a stáhněte PDF.",
    ],
    faq: [
      { q: "Budou snímky vypadat přesně jako v PowerPointu?", a: "Ne přesně. Kitwell vykresluje každý snímek z jeho textových polí, obrázků, jednoduchých tvarů a tabulek. Písma, přechody, stíny, efekty a přesné přizpůsobení textu se liší. PDF si vždy před použitím projděte." },
      { q: "Co se nepřevádí?", a: "Grafy, SmartArt, video a zvuk, animace a přechody, poznámky řečníka, přechody barev, čáry a spojnice a obrázky v jiných formátech než JPEG a PNG. Nástroj vám sdělí, kolik prvků bylo vynecháno." },
      { q: "Mohu převést starý soubor .ppt?", a: "Ne. Otevřete jej v PowerPointu a nejprve uložte jako soubor PPTX." },
      { q: "Jaké jazyky a písma jsou v PDF podporovány?", a: "PDF se vytváří písmem Noto Sans, které pokrývá latinku (včetně polských, českých, rumunských a tureckých písmen), cyrilici, řečtinu, vietnamštinu a dévanágarí. Arabský, hebrejský, thajský, čínský, japonský a korejský text zatím podporován není: tyto znaky se zobrazí jako otazníky a nástroj vám sdělí, kolika se to týkalo. Původní písma dokumentu se nezachovají." },
    ],
    limits: [
      "Pouze soubory PPTX, nejvýše 100 MB a 300 snímků. Staré soubory .ppt a prezentace chráněné heslem nejsou podporovány.",
      "Každý snímek se stane stránkou s vlastní velikostí a orientací snímku.",
      "Text, který se nevejde do pole, se zmenší, nejvýše na polovinu velikosti.",
    ],
  },
  "excel-to-pdf": {
    name: "Excel do PDF",
    description: "Převeďte sešit Excelu (XLSX) do PDF, kde se každý viditelný list stane tabulkou.",
    metaDescription: "Excel do PDF online: převeďte sešit XLSX na PDF, v němž je každý viditelný list tabulkou uložených hodnot, čísel a dat. Přímo ve vašem prohlížeči.",
    steps: [
      "Vyberte soubor XLSX.",
      "Převeďte jej.",
      "Zkontrolujte tabulky a stáhněte PDF.",
    ],
    faq: [
      { q: "Počítají se vzorce?", a: "Ne. PDF zobrazuje hodnoty, které Excel uložil do souboru. Pokud buňka se vzorcem nemá uloženou hodnotu, zůstane prázdná a nástroj vás na to upozorní; otevřete soubor v Excelu, nechte jej přepočítat, uložte jej a převeďte znovu." },
      { q: "Bude to vypadat jako rozvržení tisku v Excelu?", a: "Ne. Každý viditelný list se stane jednoduchou tabulkou přizpůsobenou šířce stránky. Barvy buněk, sloučené buňky, šířky sloupců, grafy, obrázky, oblasti tisku a zalomení stránek se nezachovají." },
      { q: "Mohu převést starý soubor .xls?", a: "Ne. Otevřete jej v Excelu a nejprve uložte jako soubor XLSX." },
      { q: "Jaké jazyky a písma jsou v PDF podporovány?", a: "PDF se vytváří písmem Noto Sans, které pokrývá latinku (včetně polských, českých, rumunských a tureckých písmen), cyrilici, řečtinu, vietnamštinu a dévanágarí. Arabský, hebrejský, thajský, čínský, japonský a korejský text zatím podporován není: tyto znaky se zobrazí jako otazníky a nástroj vám sdělí, kolika se to týkalo. Původní písma dokumentu se nezachovají." },
    ],
    limits: [
      "Pouze soubory XLSX, nejvýše 50 MB. Staré soubory .xls a sešity chráněné heslem nejsou podporovány.",
      "Nejvýše 5 000 řádků a 60 sloupců na list; co přesahuje, se vynechá a nástroj to oznámí.",
      "Skryté listy se přeskakují.",
    ],
  },
  "pdf-to-markdown": {
    name: "PDF do Markdownu",
    description: "Přeměňte text PDF na soubor Markdown s nadpisy, odstavci a seznamy.",
    metaDescription: "PDF do Markdownu online: extrahujte text z PDF a stáhněte jej jako soubor Markdown (.md) s nadpisy, odstavci a seznamy. Funguje ve vašem prohlížeči.",
    steps: [
      "Vyberte PDF.",
      "Zvolte, zda se mají odstranit opakující se záhlaví, zápatí a čísla stránek.",
      "Převeďte, zkontrolujte výsledek a stáhněte soubor .md.",
    ],
    faq: [
      { q: "Jak se poznají nadpisy a seznamy?", a: "Nadpisy jsou řádky většího písma než běžný text, seznamy jsou řádky začínající odrážkou nebo číslem a odstavce se oddělují podle mezer mezi řádky. Je to dobrý odhad, ne záruka, proto výsledek zkontrolujte." },
      { q: "Proč je výsledek u mého skenovaného PDF prázdný?", a: "Sken je obrázek stránky a neobsahuje žádný text k extrakci. Nejprve spusťte OCR PDF, aby se přidala textová vrstva, a poté převeďte výsledek." },
      { q: "Co tabulky, sloupce a obrázky?", a: "Tabulky a sloupce se nerekonstruují: jejich text se objeví jako běžné řádky, pokud možno v pořadí čtení. Obrázky, odkazy, tučný a kurzivní text, poznámky pod čarou a rovnice se nepřenášejí." },
    ],
    limits: [
      "Nejvýše 100 MB na PDF. PDF chráněná heslem je třeba nejprve odemknout.",
      "Převádí se jen text, který je v PDF skutečným textem; skenované stránky nejprve potřebují OCR PDF.",
      "Struktura se odhaduje z velikosti písma a mezer a u složitých rozvržení může být chybná.",
    ],
  },
  "repair-pdf": {
    name: "Oprava PDF",
    description: "Zkuste opravit PDF, které se neotevře, znovu sestavením jeho vnitřní struktury.",
    metaDescription: "Oprava PDF online: znovu sestavte strukturu poškozeného PDF, které se neotevře, například s porušenou tabulkou křížových odkazů nebo useknutým koncem. Funguje ve vašem prohlížeči.",
    steps: [
      "Vyberte poškozené PDF.",
      "Spusťte opravu.",
      "Pokud nástroj vytvořil soubor, zkontrolujte jej a stáhněte.",
    ],
    faq: [
      { q: "Jaké druhy poškození lze opravit?", a: "Poškození struktury souboru: chybějící nebo chybný rejstřík objektů (tabulka křížových odkazů), chybějící trailer, nesmysly před začátkem nebo porušený seznam stránek. Pokud byl soubor useknut, lze obnovit stránky uložené před useknutím." },
      { q: "Co nelze obnovit?", a: "Obsah, který už v souboru není. Chybějící nebo poškozené stránky, obrázky či písma nelze vrátit a některé soubory jsou nezachranitelné. Nástroj vám sdělí, kolik stránek zachoval, a řekne to, když nedokáže vytvořit použitelný soubor; nikdy nenabízí stažení souboru, který nevytvořil." },
      { q: "A když se moje PDF otevře normálně?", a: "Pak není co opravovat. Nástroj vám to sdělí a nabídne vyčištěnou kopii souboru." },
    ],
    limits: [
      "Nejvýše 100 MB na PDF. PDF chráněná heslem je třeba nejprve odemknout.",
      "Poškození uvnitř komprimovaných proudů objektů tento nástroj obnovit neumí.",
      "Opravený soubor může mít méně stránek než originál a po rozsáhlé opravě se může změnit pořadí stránek.",
    ],
  },
  "pdf-to-pdfa": {
    name: "PDF na PDF/A",
    description: "Připravte PDF jako PDF/A (1b, 2b, 2u, 3b, 3u nebo 4) pro archivaci se zachováním textu nebo s obrázky stránek.",
    metaDescription: "PDF na PDF/A online: připravte PDF jako PDF/A-1b, 2b, 2u, 3b, 3u nebo 4 pro archivaci, s označením PDF/A, metadaty a barevným profilem. Pokud je to možné, zachová text. Běží ve vašem prohlížeči.",
    steps: [
      "Vyberte PDF. Soubor chráněný heslem je třeba nejprve odemknout.",
      "Zvolte verzi PDF/A a poté způsob převodu: zachovat text a písma, nebo převést stránky na obrázky.",
      "Proveďte převod, přečtěte si, co se stalo, a stáhněte soubor PDF/A.",
    ],
    faq: [
      { q: "Je výsledek certifikovaný soubor PDF/A?", a: "Ne. Kitwell připraví vaše PDF ve zvolené verzi PDF/A a svou práci zkontroluje podle pravidel, která používá. Testovací soubory převedené tímto způsobem prošly validátorem veraPDF, ale samotný nástroj v prohlížeči úplný validátor PDF/A neobsahuje. Pokud musíte prokázat shodu, zkontrolujte soubor validátorem, například veraPDF." },
      { q: "Kterou verzi PDF/A zvolit?", a: "PDF/A-2b je nejrozšířenější a výchozí. PDF/A-1b je nejstarší a nejpřísnější: nepovoluje průhlednost ani vrstvy. Verze „u“ (2u, 3u) navíc zaručují, že lze text spolehlivě kopírovat, proto vyžadují, aby každé písmo mělo mapování textu. PDF/A-3b má stejná pravidla jako 2b a PDF/A-4 je nejnovější, založené na PDF 2.0. Úrovně „a“ (1a, 2a, 3a) vyžadují označkovanou strukturu dokumentu, kterou nelze vytvořit automaticky, a 4e a 4f jsou pro 3D a přiložené soubory, takže se nenabízejí." },
      { q: "Jaký je rozdíl mezi dvěma způsoby převodu?", a: "„Zachovat text a písma“ mění jen strukturu a metadata souboru, takže text zůstane vybratelný. Funguje jen tehdy, když jsou všechna písma vložená a soubor nepoužívá barvy CMYK. „Převést stránky na obrázky“ vykreslí každou stránku jako obrázek a z nich sestaví nové PDF/A. To funguje vždy, ale text už nelze vybírat a soubor je větší." },
      { q: "Proč bylo moje PDF odmítnuto, když jsem zvolil zachování textu?", a: "PDF/A vyžaduje, aby bylo každé písmo vloženo do souboru, a nepovoluje barvy CMYK bez profilu CMYK, kompresi LZW ani anotace bez vzhledu. PDF/A-1b navíc odmítá průhlednost, vrstvy a obrázky JPEG 2000 a verze „u“ a PDF/A-4 potřebují mapování textu pro každé písmo. To nelze opravit bez změny stránek, takže nástroj vypíše, co našel, místo aby předstíral výsledek. Stále můžete použít režim obrázků." },
      { q: "Co nástroj v souboru mění?", a: "Přidá označení PDF/A a metadata XMP, barevný profil sRGB jako výstupní záměr a identifikátor souboru. Odstraní JavaScript, zakázané akce, přílohy, nadbytečné informace o dokumentu a nastavení anotací, které PDF/A nepovoluje." },
    ],
    limits: [
      "Nejvýše 100 MB na PDF. PDF chráněná heslem je třeba nejprve odemknout, protože soubor PDF/A nesmí být šifrovaný.",
      "„Zachovat text a písma“ funguje jen tehdy, když jsou všechna písma vložená a soubor nemá barvy CMYK ani kompresi LZW.",
      "Převod stránek na obrázky je omezen na 200 stránek. Text už nelze vybírat a soubor je větší.",
      "Výsledek připraví Kitwell a zkontroluje podle pravidel, která používá; ve vašem prohlížeči ho neověřuje úplný validátor PDF/A.",
      "Dostupné verze: PDF/A-1b, 2b, 2u, 3b, 3u a 4. Úrovně „a“ (označkované PDF) a 4e/4f se nenabízejí.",
    ],
  },
};
export default tools;
