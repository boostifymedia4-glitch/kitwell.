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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG na JPG',
    description: 'Změňte obrázky PNG na menší soubory JPG s nastavitelnou kvalitou.',
    metaDescription: 'Převeďte PNG na JPG online zdarma. Zvolte kvalitu a barvu pozadí pro průhledné obrázky. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory PNG.',
      'Nastavte kvalitu JPG a barvu pozadí, kterou se vyplní průhledné oblasti.',
      'Stiskněte Převést a stáhněte výsledky.',
    ],
    faq: [
      {
        q: 'Co se stane s průhlednými oblastmi?',
        a: 'JPG průhlednost nepodporuje, proto se průhledné pixely vyplní zvolenou barvou pozadí (ve výchozím nastavení bílou).',
      },
      {
        q: 'Jakou kvalitu mám nastavit?',
        a: 'Pro většinu obrázků je dobrým kompromisem 80–90. Pod hodnotou asi 60 jsou na textu a ostrých hranách vidět kompresní artefakty.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Průhlednost se slije do jednobarevného pozadí, protože ji JPG neumí uložit.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG na WebP',
    description: 'Převeďte fotografie JPG na moderní WebP pro menší soubory a rychlejší stránky.',
    metaDescription: 'Převeďte JPG na WebP online zdarma. Zmenšete fotografie pro web s nastavitelnou kvalitou, zpracování probíhá lokálně ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory JPG.',
      'Zvolte kvalitu WebP (rozumnou výchozí hodnotou je 80).',
      'Převeďte a stáhněte.',
    ],
    faq: [
      {
        q: 'Je WebP menší než JPG?',
        a: 'Obvykle o 20–35 % menší při srovnatelné vizuální kvalitě, výsledek ale závisí na konkrétním obrázku.',
      },
      {
        q: 'Podporuje WebP každý prohlížeč?',
        a: 'Všechny současné hlavní prohlížeče umějí WebP zobrazit. Kódování WebP v prohlížeči podporují Chrome, Edge, Firefox a novější Safari; pokud to váš prohlížeč neumí, nástroj vám to oznámí, místo aby vytvořil chybný soubor.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Váš prohlížeč musí podporovat kódování WebP; nepodporované prohlížeče zobrazí chybu.',
    ],
  },
  'png-to-webp': {
    name: 'PNG na WebP',
    description: 'Převeďte obrázky PNG na WebP se zachováním průhlednosti a zlomkem velikosti.',
    metaDescription: 'Převeďte PNG na WebP online zdarma. Zachová průhlednost, zmenší soubory a celé to běží přímo ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory PNG.',
      'Zvolte kvalitu WebP.',
      'Převeďte a stáhněte.',
    ],
    faq: [
      {
        q: 'Zachová se průhlednost?',
        a: 'Ano. WebP podporuje alfa kanál, takže průhledné PNG zůstanou průhledné.',
      },
      {
        q: 'Mohu získat bezeztrátový výsledek?',
        a: 'Pro nejvyšší věrnost nastavte kvalitu na 100. Prohlížeče kódují WebP ztrátově, proto použijte PNG, pokud potřebujete matematicky přesnou kopii.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Váš prohlížeč musí podporovat kódování WebP; nepodporované prohlížeče zobrazí chybu.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP na JPG',
    description: 'Převeďte obrázky WebP na široce kompatibilní soubory JPG.',
    metaDescription: 'Převeďte WebP na JPG online zdarma. Zajistěte, aby obrázky WebP fungovaly všude, převod probíhá lokálně ve vašem prohlížeči.',
    steps: [
      'Přidejte své soubory WebP.',
      'Nastavte kvalitu a barvu pozadí pro průhledné oblasti.',
      'Převeďte a stáhněte.',
    ],
    faq: [
      {
        q: 'Proč převádět WebP na JPG?',
        a: 'Některé starší programy, e-mailoví klienti a nahrávací formuláře WebP stále odmítají. JPG se přijímá téměř všude.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Průhlednost se slije do jednobarevného pozadí, protože ji JPG neumí uložit.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  'image-compressor': {
    name: 'Komprimovat obrázky',
    description: 'Zmenšete velikost obrázků nastavitelnou kvalitou a zjistěte přesnou úsporu.',
    metaDescription: 'Komprimujte obrázky JPG, PNG a WebP online zdarma. Upravte kvalitu, případně omezte rozměry a porovnejte velikosti souborů. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte své obrázky.',
      'Zvolte výstupní formát a kvalitu, případně i maximální šířku nebo výšku.',
      'Zkomprimujte, porovnejte velikosti před a po a stáhněte výsledek.',
    ],
    faq: [
      {
        q: 'Jak nástroj zmenšuje velikost?',
        a: 'Obrázek znovu zakóduje ve zvolené kvalitě a může jej i zmenšit. Výstup PNG je bezeztrátový, takže se zmenší, jen když zároveň snížíte rozměry.',
      },
      {
        q: 'Co když je výsledek větší než originál?',
        a: 'To se může stát u už optimalizovaných souborů. Nástroj to označí, abyste mohli raději ponechat originál.',
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
      'Nejlepších výsledků dosáhnete s výstupem JPG nebo WebP; výstup PNG je bezeztrátový a nemusí se zmenšit.',
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
  'image-cropper': {
    name: 'Oříznout obrázek',
    description: 'Ořízněte obrázek na přesnou oblast nebo pevný poměr stran s živým náhledem.',
    metaDescription: 'Ořezávejte obrázky online zdarma. Zvolte pevný poměr stran nebo přesné hodnoty v pixelech s živým náhledem. Zpracování probíhá ve vašem prohlížeči.',
    steps: [
      'Přidejte obrázek.',
      'Zvolte poměr stran nebo přetáhněte ořezový rámeček a pak jemně upravte polohu a velikost v číselných polích.',
      'Stiskněte Oříznout a stáhněte.',
    ],
    faq: [
      {
        q: 'Snižuje oříznutí kvalitu?',
        a: 'Oříznutí zachovává původní pixely. Kvalita se změní jen tehdy, když uložíte jako JPG nebo WebP s nižším nastavením kvality.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Vždy jen jeden obrázek.',
      'Maximálně 25 MB na soubor.',
      'U animovaných obrázků se použije první snímek.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
    ],
  },
  'image-format-converter': {
    name: 'Převodník formátů obrázků',
    description: 'Převádějte mezi JPG, PNG a WebP jedním univerzálním nástrojem.',
    metaDescription: 'Převádějte obrázky mezi JPG, PNG a WebP online zdarma. Zvolte výstupní formát a kvalitu, zpracování probíhá lokálně ve vašem prohlížeči.',
    steps: [
      'Přidejte obrázky v libovolném podporovaném formátu.',
      'Zvolte výstupní formát a kvalitu.',
      'Převeďte a stáhněte.',
    ],
    faq: [
      {
        q: 'Které formáty mohu použít?',
        a: 'Vstup: JPG, PNG, WebP, GIF, BMP a AVIF, pokud je váš prohlížeč umí dekódovat. Výstup: JPG, PNG a WebP.',
      },
      {
        q: 'A co HEIC nebo TIFF?',
        a: 'Prohlížeče neumějí HEIC ani TIFF nativně dekódovat, proto zatím nejsou podporovány.',
      },
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
      },
    ],
    limits: [
      'Animované soubory GIF nebo WebP se převádějí pouze z prvního snímku.',
      'Maximálně 25 MB na soubor a 20 souborů v dávce, aby prohlížeč zůstal responzivní.',
      'Metadata EXIF a vložené barevné profily se nezachovají.',
      'Soubory HEIC/HEIF, TIFF a RAW nejsou podporovány.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky?',
        a: 'Ne. Obrázek se čte ve vašem prohlížeči a tento nástroj ho nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrávají se moje obrázky na server?',
        a: 'Ne. Obrázek dekóduje a znovu zakóduje váš prohlížeč pomocí rozhraní Canvas API. Tento nástroj soubor nikam neodesílá.',
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
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
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
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
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
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
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
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
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
  'protect-pdf': {
    name: 'Chránit PDF heslem',
    description: 'Zamkněte PDF heslem pomocí šifrování AES-256.',
    metaDescription: 'Chraňte PDF heslem online zdarma. Šifrování AES-256 probíhá ve vašem prohlížeči; soubor ani heslo se nikdy nenahrávají.',
    steps: [
      'Přidejte PDF.',
      'Dvakrát zadejte heslo a zvolte, co smějí čtenáři dělat (tisknout, kopírovat, upravovat).',
      'Zabezpečte ho a stáhněte zašifrovanou kopii.',
    ],
    faq: [
      {
        q: 'Jak silná je ochrana?',
        a: 'Soubory se šifrují pomocí AES-256, nejsilnějšího standardního šifrování PDF. V praxi závisí bezpečnost na vašem heslu: použijte dlouhé heslo, které nepoužíváte nikde jinde.',
      },
      {
        q: 'Co když heslo zapomenu?',
        a: 'Nelze ho obnovit. Nic se neukládá ani neodesílá a neexistuje žádné obnovení hesla. Uschovejte si původní soubor i heslo na bezpečném místě.',
      },
      {
        q: 'Jsou volby tisku, kopírování a úprav vynucovány?',
        a: 'Jde o požadavky, které většina programů pro PDF respektuje, ale nejsou neprolomitelné. Soubor skutečně chrání heslo.',
      },
      {
        q: 'Nahrává se moje heslo?',
        a: 'Ne. Šifrování probíhá ve vašem prohlížeči.',
      },
    ],
    limits: [
      'Maximálně 100 MB na PDF.',
      'Hesla: až 127 standardních znaků (písmena, číslice a symboly).',
      'PDF, které už heslo má, je nutné nejprve odemknout.',
      'Velmi staré čtečky PDF (z doby před rokem 2008) nemusí soubory AES-256 otevřít.',
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
      {
        q: 'Nahrává se moje heslo?',
        a: 'Ne. Vše probíhá ve vašem prohlížeči.',
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
  'compress-pdf': {
    name: 'Komprimovat PDF',
    description: 'Zmenšete PDF opětovnou kompresí jeho obrázků, přičemž text zůstane vybratelný.',
    metaDescription: 'Komprimujte PDF online zdarma. Opětovná komprese vložených obrázků zmenší soubor a text zůstane vybratelný, nebo stránky převeďte na obrázky pro nejmenší soubor. Běží ve vašem prohlížeči.',
    steps: [
      'Přidejte své PDF.',
      'Zvolte způsob a sílu komprese: výchozí režim ponechá text vybratelný a znovu komprimuje jen obrázky.',
      'Zkomprimujte, zkontrolujte ušetřenou velikost a stáhněte výsledek.',
    ],
    faq: [
      {
        q: 'Proč se moje PDF skoro nezmenšilo?',
        a: 'Standardní režim znovu komprimuje obrázky JPEG, takže nejvíc pomáhá u PDF plných fotografií nebo skenů. PDF, které je většinou text, nebo jehož obrázky jsou už malé, se příliš zmenšit nedá. Nástroj vám řekne, když nic neušetřil, a nic nepředstírá.',
      },
      {
        q: 'Zhorší se kvalita?',
        a: 'Obrázky přijdou výměnou za velikost o část detailů; Lehká komprese je zachová téměř beze změny a Silná je viditelně změkčí. Text a vektorová grafika se ve standardním režimu nemění. Režim „Maximální“ změní každou stránku na obrázek, takže text už nelze vybírat ani v něm vyhledávat.',
      },
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
      },
    ],
    limits: [
      'Znovu se komprimují pouze vložené obrázky JPEG. Obrázky ve stylu PNG (Flate), písma a další obsah zůstávají beze změny.',
      'Maximální režim převede každou stránku na obrázek: text, odkazy a formulářová pole přestanou fungovat a v souboru nelze vyhledávat.',
      'Barvy znovu komprimovaných obrázků se mohou velmi nepatrně posunout.',
      'Maximálně 100 MB na PDF. PDF chráněná heslem je nutné nejprve odemknout.',
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
        q: 'Odesílá se můj dokument službě OCR?',
        a: 'Ne. Rozpoznávací modul (Tesseract zkompilovaný do WebAssembly) a jeho anglická data se poskytují z tohoto webu a běží uvnitř vašeho prohlížeče. Dokument se nenahrává.',
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
      {
        q: 'Ukládá se můj podpis někam?',
        a: 'Ne. Vytváří se ve vašem prohlížeči, používá se jen pro tento soubor a po opuštění nebo opětovném načtení stránky se zapomene.',
      },
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
      },
    ],
    limits: [
      'Pouze vizuální podpis: bez certifikátu, bez časového razítka, bez detekce manipulace.',
      'Podpis se umístí jako obrázek nad stránku; nevyplňuje formulářové pole pro podpis.',
      'Maximálně 100 MB na PDF. PDF chráněná heslem je nutné nejprve odemknout.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Vyplnit formuláře PDF',
    description: 'Vyplňte textová pole, zaškrtávací políčka a nabídky ve vyplnitelném formuláři PDF.',
    metaDescription: 'Vyplňujte formuláře PDF online zdarma. Pište do polí, zaškrtávejte políčka a vybírejte možnosti ve vyplnitelném PDF a stáhněte ho jako upravitelné nebo sloučené. Ve vašem prohlížeči.',
    steps: [
      'Přidejte vyplnitelný formulář PDF.',
      'Vyplňte pole uvedená pod názvem souboru. Pole jsou seskupena podle stránek.',
      'Zvolte, zda formulář zůstane upravitelný, nebo se zploští, a stáhněte vyplněné PDF.',
    ],
    faq: [
      {
        q: 'Moje PDF nezobrazuje žádná pole. Proč?',
        a: 'Zde lze vyplnit jen PDF se skutečnými formulářovými poli. Formulář, který je jen obrázek nebo prostý text, pole nemá; k umístění podpisu použijte Podepsat PDF a k přidání textu nástroj Vodoznak. Formuláře vytvořené pomocí XFA (některé formuláře úřadů a bank) nejsou podporovány.',
      },
      {
        q: 'Co dělá zploštění?',
        a: 'Zploštění vypálí vaše odpovědi do stránky a odstraní formulářová pole, takže odpovědi už nelze upravovat. Použijte ho pro kopii, kterou odesíláte; upravitelnou kopii si ponechte pro sebe.',
      },
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
      },
    ],
    limits: [
      'Text může obsahovat latinku, číslice a běžné symboly (písmo formuláře jiné abecedy nemá).',
      'Pole pro podpis a tlačítka se zobrazí, ale nelze je vyplnit; pro podpisy použijte Podepsat PDF.',
      'Formuláře XFA (dynamické) nejsou podporovány.',
      'Maximálně 100 MB na PDF.',
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
      {
        q: 'Nahrává se moje PDF někam?',
        a: 'Ne. PDF čte a znovu zapisuje váš prohlížeč. Tento nástroj soubor na server neodesílá.',
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
        q: 'Odesílá se můj JSON na server?',
        a: 'Ne. Zpracování a formátování probíhá ve vašem prohlížeči pomocí vestavěného parseru JSON.',
      },
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
        q: 'Ukládají se vygenerovaná hesla nebo se někam odesílají?',
        a: 'Ne. Hesla se generují ve vašem prohlížeči pomocí crypto.getRandomValues a nikdy se nepřenášejí ani neukládají.',
      },
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
      {
        q: 'Odesílají se moje data někam?',
        a: 'Ne. Kód se generuje ve vašem prohlížeči a hesla k Wi-Fi, která zadáte, zůstávají ve vašem zařízení.',
      },
    ],
    limits: [
      'Pouze statické kódy: bez sledování skenování a bez upravitelných kódů.',
      'Velmi dlouhý text vytvoří hustý kód, který se špatně skenuje, proto ho držte krátký.',
      'Nejlépe se skenují tmavé barvy na světlém podkladu se silným kontrastem.',
    ],
  },
};
export default tools;
