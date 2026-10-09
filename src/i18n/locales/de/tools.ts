import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG in PNG',
    description: 'Wandeln Sie JPG- und JPEG-Fotos mit einem Klick in verlustfreie PNG-Bilder um.',
    metaDescription: 'JPG kostenlos online in PNG umwandeln. JPEG-Fotos als Stapel direkt im Browser konvertieren, ohne Upload und ohne Anmeldung.',
    steps: [
      'Ziehen Sie eine oder mehrere JPG-Dateien auf das Tool oder wählen Sie sie auf Ihrem Gerät aus.',
      'Prüfen Sie die Vorschau und klicken Sie dann auf „Umwandeln“.',
      'Laden Sie jedes PNG einzeln herunter oder alles zusammen als ZIP-Datei.',
    ],
    faq: [
      {
        q: 'Verbessert die Umwandlung von JPG in PNG die Qualität?',
        a: 'Nein. JPG arbeitet verlustbehaftet, daher lassen sich Details, die beim Speichern des JPG verworfen wurden, nicht wiederherstellen. PNG speichert die vorhandenen Pixel lediglich ohne weiteren Verlust, was für Bearbeitung oder Arbeiten mit Transparenz nützlich ist.',
      },
      {
        q: 'Warum ist das PNG größer als das JPG?',
        a: 'PNG ist verlustfrei und speichert Fotos meist weniger effizient als JPG. Nutzen Sie JPG oder WebP, wenn die Dateigröße wichtiger ist als exakte Pixel.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG in JPG',
    description: 'Wandeln Sie PNG-Bilder in kleinere JPG-Dateien mit einstellbarer Qualität um.',
    metaDescription: 'PNG kostenlos online in JPG umwandeln. Wählen Sie Qualität und Hintergrundfarbe für transparente Bilder. Verarbeitung im Browser.',
    steps: [
      'Fügen Sie Ihre PNG-Dateien hinzu.',
      'Legen Sie die JPG-Qualität und die Hintergrundfarbe fest, mit der transparente Bereiche gefüllt werden.',
      'Klicken Sie auf „Umwandeln“ und laden Sie die Ergebnisse herunter.',
    ],
    faq: [
      {
        q: 'Was passiert mit transparenten Bereichen?',
        a: 'JPG unterstützt keine Transparenz, daher werden transparente Pixel mit der von Ihnen gewählten Hintergrundfarbe gefüllt (standardmäßig Weiß).',
      },
      {
        q: 'Welche Qualitätseinstellung sollte ich verwenden?',
        a: '80–90 ist für die meisten Bilder ein guter Kompromiss. Unter etwa 60 werden Kompressionsartefakte an Text und scharfen Kanten sichtbar.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Transparenz wird auf eine einfarbige Fläche reduziert, weil JPG sie nicht speichern kann.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG in WebP',
    description: 'Wandeln Sie JPG-Fotos in das moderne WebP-Format um – für kleinere Dateien und schnellere Seiten.',
    metaDescription: 'JPG kostenlos online in WebP umwandeln. Fotos für das Web mit einstellbarer Qualität verkleinern, lokal in Ihrem Browser verarbeitet.',
    steps: [
      'Fügen Sie Ihre JPG-Dateien hinzu.',
      'Wählen Sie eine WebP-Qualität (80 ist ein sinnvoller Standardwert).',
      'Umwandeln und herunterladen.',
    ],
    faq: [
      {
        q: 'Ist WebP kleiner als JPG?',
        a: 'In der Regel 20–35 % kleiner bei ähnlicher visueller Qualität, wobei das Ergebnis vom Bild abhängt.',
      },
      {
        q: 'Unterstützt jeder Browser WebP?',
        a: 'Alle aktuellen gängigen Browser können WebP anzeigen. Das Kodieren von WebP im Browser wird von Chrome, Edge, Firefox und neueren Safari-Versionen unterstützt; kann Ihr Browser das nicht, teilt Ihnen das Tool dies mit, statt eine fehlerhafte Datei zu erzeugen.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Ihr Browser muss das Kodieren von WebP unterstützen; andernfalls wird eine Fehlermeldung angezeigt.',
    ],
  },
  'png-to-webp': {
    name: 'PNG in WebP',
    description: 'Wandeln Sie PNG-Bilder in WebP um und behalten Sie die Transparenz bei einem Bruchteil der Größe.',
    metaDescription: 'PNG kostenlos online in WebP umwandeln. Die Transparenz bleibt erhalten, die Dateigröße sinkt, alles läuft vollständig in Ihrem Browser.',
    steps: [
      'Fügen Sie Ihre PNG-Dateien hinzu.',
      'Wählen Sie die WebP-Qualität.',
      'Umwandeln und herunterladen.',
    ],
    faq: [
      {
        q: 'Bleibt die Transparenz erhalten?',
        a: 'Ja. WebP unterstützt einen Alphakanal, daher bleiben transparente PNGs transparent.',
      },
      {
        q: 'Kann ich ein verlustfreies Ergebnis erhalten?',
        a: 'Stellen Sie die Qualität auf 100 für die höchste Genauigkeit. Browser kodieren WebP verlustbehaftet; nutzen Sie daher PNG, wenn Sie eine mathematisch exakte Kopie benötigen.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Ihr Browser muss das Kodieren von WebP unterstützen; andernfalls wird eine Fehlermeldung angezeigt.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP in JPG',
    description: 'Wandeln Sie WebP-Bilder in weit verbreitet kompatible JPG-Dateien um.',
    metaDescription: 'WebP kostenlos online in JPG umwandeln. So funktionieren WebP-Bilder überall – lokal in Ihrem Browser konvertiert.',
    steps: [
      'Fügen Sie Ihre WebP-Dateien hinzu.',
      'Legen Sie Qualität und Hintergrundfarbe für transparente Bereiche fest.',
      'Umwandeln und herunterladen.',
    ],
    faq: [
      {
        q: 'Warum WebP in JPG umwandeln?',
        a: 'Manche ältere Software, E-Mail-Programme und Upload-Formulare lehnen WebP noch ab. JPG wird fast überall akzeptiert.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Transparenz wird auf eine einfarbige Fläche reduziert, weil JPG sie nicht speichern kann.',
    ],
  },
  'webp-to-png': {
    name: 'WebP in PNG',
    description: 'Wandeln Sie WebP-Bilder in verlustfreies PNG um und behalten Sie die Transparenz.',
    metaDescription: 'WebP kostenlos online in PNG umwandeln. Die Transparenz bleibt erhalten, alles läuft vollständig in Ihrem Browser ohne Upload.',
    steps: [
      'Fügen Sie Ihre WebP-Dateien hinzu.',
      'Klicken Sie auf „Umwandeln“.',
      'Laden Sie die PNG-Dateien herunter.',
    ],
    faq: [
      {
        q: 'Bleibt die Transparenz erhalten?',
        a: 'Ja. PNG unterstützt Transparenz, daher wird der Alphakanal der WebP-Datei übernommen.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
    ],
  },
  'image-compressor': {
    name: 'Bilder komprimieren',
    description: 'Verkleinern Sie die Dateigröße von Bildern mit einstellbarer Qualität und sehen Sie die genaue Ersparnis.',
    metaDescription: 'JPG-, PNG- und WebP-Bilder kostenlos online komprimieren. Qualität einstellen, Abmessungen optional begrenzen und Dateigrößen vergleichen. Läuft im Browser.',
    steps: [
      'Fügen Sie Ihre Bilder hinzu.',
      'Wählen Sie ein Ausgabeformat und die Qualität sowie optional eine maximale Breite oder Höhe.',
      'Komprimieren, die Größen vor und nach der Komprimierung vergleichen und herunterladen.',
    ],
    faq: [
      {
        q: 'Wie verkleinert der Kompressor die Datei?',
        a: 'Er kodiert das Bild mit der von Ihnen gewählten Qualität neu und kann es zusätzlich verkleinern. Die Ausgabe als PNG ist verlustfrei und wird daher nur kleiner, wenn Sie auch die Abmessungen verringern.',
      },
      {
        q: 'Was, wenn das Ergebnis größer ist als das Original?',
        a: 'Das kann bei bereits optimierten Dateien vorkommen. Das Tool weist darauf hin, damit Sie stattdessen das Original behalten können.',
      },
      {
        q: 'Bleiben EXIF- oder Standortdaten erhalten?',
        a: 'Nein. Beim Neukodieren über ein Canvas gehen EXIF-Metadaten wie Kameramodell und GPS-Standort verloren, was vor dem Teilen eines Fotos oft gewünscht ist. Auch Farbprofile bleiben nicht erhalten.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Die besten Ergebnisse erzielen Sie mit JPG- oder WebP-Ausgabe; die PNG-Ausgabe ist verlustfrei und wird eventuell nicht kleiner.',
    ],
  },
  'image-resizer': {
    name: 'Bildgröße ändern',
    description: 'Ändern Sie die Größe von Bildern auf exakte Pixelwerte oder in Prozent und behalten Sie das Seitenverhältnis bei.',
    metaDescription: 'Bildgröße kostenlos online ändern. Genaue Breite und Höhe oder einen Prozentwert festlegen, Seitenverhältnis beibehalten und als JPG, PNG oder WebP herunterladen.',
    steps: [
      'Fügen Sie ein oder mehrere Bilder hinzu.',
      'Wählen Sie Pixel oder Prozent und geben Sie die neue Größe ein. Lassen Sie die Sperre des Seitenverhältnisses aktiviert, um Verzerrungen zu vermeiden.',
      'Größe ändern und herunterladen.',
    ],
    faq: [
      {
        q: 'Kann ich ein Bild vergrößern?',
        a: 'Ja, aber beim Vergrößern entstehen keine zusätzlichen Details, das Ergebnis wirkt daher weicher. Beim Verkleinern ist die Qualität am besten.',
      },
      {
        q: 'Wie groß darf das Ergebnis höchstens sein?',
        a: 'Browser begrenzen die Canvas-Größe. Dieses Tool begrenzt die Ausgabe auf 16.000 px pro Seite und etwa 100 Megapixel.',
      },
      {
        q: 'Bleiben EXIF- oder Standortdaten erhalten?',
        a: 'Nein. Beim Neukodieren über ein Canvas gehen EXIF-Metadaten wie Kameramodell und GPS-Standort verloren, was vor dem Teilen eines Fotos oft gewünscht ist. Auch Farbprofile bleiben nicht erhalten.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Die Ausgabe ist auf 16.000 px pro Seite begrenzt.',
    ],
  },
  'image-cropper': {
    name: 'Bilder zuschneiden',
    description: 'Schneiden Sie ein Bild auf einen exakten Bereich oder ein festes Seitenverhältnis zu – mit Live-Vorschau.',
    metaDescription: 'Bilder kostenlos online zuschneiden. Wählen Sie ein festes Seitenverhältnis oder genaue Pixelwerte mit Live-Vorschau. Verarbeitung im Browser.',
    steps: [
      'Fügen Sie ein Bild hinzu.',
      'Wählen Sie ein Seitenverhältnis oder ziehen Sie den Zuschneiderahmen und passen Sie Position und Größe anschließend über die Zahlenfelder genau an.',
      'Klicken Sie auf „Zuschneiden“ und laden Sie das Ergebnis herunter.',
    ],
    faq: [
      {
        q: 'Verringert das Zuschneiden die Qualität?',
        a: 'Beim Zuschneiden bleiben die Original-Pixel erhalten. Die Qualität ändert sich nur, wenn Sie als JPG oder WebP mit niedrigerer Qualitätseinstellung speichern.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Jeweils ein Bild.',
      'Höchstens 25 MB pro Datei.',
      'Bei animierten Bildern wird das erste Einzelbild verwendet.',
    ],
  },
  'image-rotator': {
    name: 'Bilder drehen',
    description: 'Drehen Sie Bilder um 90°, 180°, 270° oder einen beliebigen Winkel.',
    metaDescription: 'Bilder kostenlos online drehen. Fotos um 90, 180 oder 270 Grad oder um einen eigenen Winkel direkt im Browser drehen.',
    steps: [
      'Fügen Sie Ihre Bilder hinzu.',
      'Wählen Sie eine Drehung oder geben Sie einen eigenen Winkel ein.',
      'Anwenden und herunterladen.',
    ],
    faq: [
      {
        q: 'Was passiert bei Drehungen um andere Winkel als 90°?',
        a: 'Das Canvas wird so vergrößert, dass das gedrehte Bild hineinpasst. Bei JPG-Ausgabe werden die leeren Ecken mit dem gewählten Hintergrund gefüllt; bei PNG und WebP bleiben sie transparent.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
    ],
  },
  'image-flipper': {
    name: 'Bilder spiegeln',
    description: 'Spiegeln Sie Bilder horizontal oder vertikal.',
    metaDescription: 'Bilder kostenlos online horizontal oder vertikal spiegeln. Fotos im Browser spiegeln, ohne Upload.',
    steps: [
      'Fügen Sie Ihre Bilder hinzu.',
      'Wählen Sie horizontal, vertikal oder beides.',
      'Anwenden und herunterladen.',
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen horizontalem und vertikalem Spiegeln?',
        a: 'Beim horizontalen Spiegeln werden links und rechts vertauscht, wie bei einem Spiegel. Beim vertikalen Spiegeln steht das Bild an seiner horizontalen Achse gespiegelt auf dem Kopf.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
    ],
  },
  'image-format-converter': {
    name: 'Bildformat-Konverter',
    description: 'Konvertieren Sie zwischen JPG, PNG und WebP mit einem einzigen flexiblen Tool.',
    metaDescription: 'Bilder kostenlos online zwischen JPG, PNG und WebP konvertieren. Wählen Sie Ausgabeformat und Qualität, lokal in Ihrem Browser verarbeitet.',
    steps: [
      'Fügen Sie Bilder in einem beliebigen unterstützten Format hinzu.',
      'Wählen Sie Ausgabeformat und Qualität.',
      'Umwandeln und herunterladen.',
    ],
    faq: [
      {
        q: 'Welche Formate kann ich verwenden?',
        a: 'Eingabe: JPG, PNG, WebP, GIF, BMP und AVIF, sofern Ihr Browser sie dekodieren kann. Ausgabe: JPG, PNG und WebP.',
      },
      {
        q: 'Und HEIC oder TIFF?',
        a: 'Browser können HEIC oder TIFF nicht nativ dekodieren, daher werden diese Formate noch nicht unterstützt.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'HEIC/HEIF-, TIFF- und RAW-Dateien werden nicht unterstützt.',
    ],
  },
  'image-to-base64': {
    name: 'Bild in Base64',
    description: 'Kodieren Sie ein Bild als Base64-Data-URI für CSS, HTML oder JSON.',
    metaDescription: 'Ein Bild kostenlos online in einen Base64-String oder eine Data-URI umwandeln. Fertige HTML- und CSS-Snippets kopieren. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein Bild hinzu.',
      'Wählen Sie die Ausgabeform: Data-URI, reines Base64, HTML-<img> oder CSS.',
      'Kopieren Sie das Ergebnis.',
    ],
    faq: [
      {
        q: 'Wann sollte ich Base64-Bilder verwenden?',
        a: 'Für winzige Icons in CSS oder E-Mails, bei denen eine zusätzliche Anfrage mehr kostet als die Größenzunahme von rund 33 %. Bei großen Fotos sollten Sie darauf verzichten.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Höchstens 5 MB pro Bild, da Base64-Text sehr groß wird.',
      'Jeweils ein Bild.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 in Bild',
    description: 'Dekodieren Sie einen Base64-String oder eine Data-URI zurück in ein herunterladbares Bild.',
    metaDescription: 'Einen Base64-String oder eine Data-URI kostenlos online in ein Bild umwandeln. Das dekodierte PNG, JPG, WebP oder GIF ansehen und herunterladen.',
    steps: [
      'Fügen Sie einen Base64-String oder eine vollständige Data-URI ein.',
      'Das Bild wird sofort dekodiert und als Vorschau angezeigt.',
      'Laden Sie das Bild herunter.',
    ],
    faq: [
      {
        q: 'Brauche ich das Präfix „data:image/png;base64,“?',
        a: 'Nein. Ohne Präfix erkennt das Tool das Format anhand der Dateisignatur (PNG, JPG, GIF, WebP).',
      },
      {
        q: 'Warum erhalte ich eine Fehlermeldung?',
        a: 'Der String ist wahrscheinlich abgeschnitten, enthält überzählige Zeichen oder ist kein Bild. SVG-Daten werden hier aus Sicherheitsgründen ebenfalls abgelehnt.',
      },
    ],
    limits: [
      'Unterstützt PNG, JPG, GIF und WebP. SVG wird absichtlich nicht dargestellt.',
      'Höchstens 10 MB dekodierte Daten.',
    ],
  },
  'image-color-picker': {
    name: 'Farbwähler für Bilder',
    description: 'Wählen Sie exakte Farben aus einem beliebigen Bild aus und extrahieren Sie dessen dominante Palette.',
    metaDescription: 'Farben aus einem Bild kostenlos online auswählen. Klicken Sie auf einen beliebigen Pixel für HEX-, RGB- und HSL-Werte und extrahieren Sie eine Palette der dominanten Farben.',
    steps: [
      'Fügen Sie ein Bild hinzu.',
      'Klicken oder tippen Sie an eine beliebige Stelle im Bild (oder nutzen Sie die Pfeiltasten), um einen Pixel auszuwählen.',
      'Kopieren Sie den HEX-, RGB- oder HSL-Wert oder einen Wert aus der extrahierten Palette.',
    ],
    faq: [
      {
        q: 'Wie wird die Palette berechnet?',
        a: 'Das Bild wird verkleinert abgetastet und seine Farben werden in Gruppen eingeteilt; angezeigt werden die häufigsten Gruppen. Das ist eine Annäherung an die dominanten Farben, keine vollständige Liste.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Jeweils ein Bild.',
      'Die Farben werden aus den angezeigten sRGB-Pixeln entnommen; Farbprofile werden ignoriert.',
    ],
  },
  'image-watermark': {
    name: 'Wasserzeichen für Bilder',
    description: 'Fügen Sie vielen Bildern auf einmal ein Text- oder Logo-Wasserzeichen hinzu, einzeln oder gekachelt.',
    metaDescription: 'Bildern kostenlos online ein Wasserzeichen hinzufügen. Text oder Logo auf JPG-, PNG- und WebP-Fotos im Stapel aufbringen, mit Deckkraft und Position. Läuft im Browser.',
    steps: [
      'Fügen Sie Ihre Bilder hinzu.',
      'Wählen Sie Text oder ein Logo und legen Sie dann Größe, Deckkraft, Position und Anordnung fest.',
      'Wenden Sie es an und laden Sie die Ergebnisse oder eine ZIP-Datei herunter.',
    ],
    faq: [
      {
        q: 'Kann ich Urdu oder andere Schriften verwenden?',
        a: 'Ja. Bild-Wasserzeichen verwenden die Schriftarten Ihres Geräts, daher funktioniert jede Schrift, die Ihr System darstellen kann.',
      },
      {
        q: 'Werden meine Originale verändert?',
        a: 'Nein. Die markierten Kopien werden als neue Dateien gespeichert.',
      },
      {
        q: 'Bleiben EXIF- oder Standortdaten erhalten?',
        a: 'Nein. Beim Neukodieren über ein Canvas gehen EXIF-Metadaten wie Kameramodell und GPS-Standort verloren, was vor dem Teilen eines Fotos oft gewünscht ist. Auch Farbprofile bleiben nicht erhalten.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Logo-Dateien: PNG, JPG oder WebP, bis zu 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG in PNG / JPG',
    description: 'Wandeln Sie SVG-Vektorgrafiken in beliebiger Größe in PNG-, JPG- oder WebP-Bilder um.',
    metaDescription: 'SVG kostenlos online in PNG oder JPG umwandeln. Wählen Sie einen Maßstab oder eine genaue Breite für scharfe Ergebnisse; PNG behält die Transparenz. Läuft im Browser.',
    steps: [
      'Fügen Sie Ihre SVG-Dateien hinzu.',
      'Wählen Sie PNG, JPG oder WebP und die Ausgabegröße.',
      'Umwandeln und herunterladen.',
    ],
    faq: [
      {
        q: 'Bleibt das Bild auch bei großen Abmessungen scharf?',
        a: 'Ja. Das SVG wird in der von Ihnen gewählten Größe gezeichnet, daher ist ein 4×-Export genauso scharf wie ein 1×-Export.',
      },
      {
        q: 'Warum sieht mein SVG anders aus?',
        a: 'Browser unterstützen nicht jede SVG-Funktion, und SVGs, die auf externe Schriftarten oder Bilder angewiesen sind, greifen auf Standardwerte zurück. Betten Sie Schriftarten und Bilder für das beste Ergebnis direkt im SVG ein.',
      },
      {
        q: 'Ist es sicher, SVG-Dateien hier zu öffnen?',
        a: 'Ja. Das SVG wird als Bild gezeichnet, daher werden darin enthaltene Skripte nicht ausgeführt.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel.',
      'Von außerhalb des SVG verknüpfte Schriftarten, Bilder und Stile werden nicht geladen.',
      'Ein SVG ohne Größenangabe verwendet seine viewBox oder 300 × 150 px, falls keines von beidem gesetzt ist.',
    ],
  },
  'enlarge-image': {
    name: 'Bilder vergrößern',
    description: 'Machen Sie Bilder mit weicher, scharfer Neuberechnung größer: 2× bis 4× oder auf eine feste Breite.',
    metaDescription: 'Bilder kostenlos online vergrößern. JPG, PNG und WebP per Lanczos-Neuberechnung und optionalem Schärfen auf 2×, 3×, 4× oder eine genaue Breite hochskalieren.',
    steps: [
      'Fügen Sie Ihre Bilder hinzu.',
      'Wählen Sie einen Faktor oder eine Zielbreite und ob geschärft werden soll.',
      'Vergrößern und herunterladen.',
    ],
    faq: [
      {
        q: 'Ist das KI-Hochskalierung?',
        a: 'Nein. Es verwendet eine hochwertige Neuberechnung der Pixel, die vergrößerte Bilder weich und sauber wirken lässt, aber keine fehlenden Details erfinden kann. Sehr kleine oder unscharfe Fotos wirken weiterhin weich.',
      },
      {
        q: 'Wie groß darf das Ergebnis werden?',
        a: 'Bis zu 16.000 px pro Seite und etwa 100 Megapixel, abhängig davon, was Ihr Browser bewältigen kann.',
      },
      {
        q: 'Bleiben EXIF- oder Standortdaten erhalten?',
        a: 'Nein. Beim Neukodieren über ein Canvas gehen EXIF-Metadaten wie Kameramodell und GPS-Standort verloren, was vor dem Teilen eines Fotos oft gewünscht ist. Auch Farbprofile bleiben nicht erhalten.',
      },
    ],
    limits: [
      'Animierte GIF- oder WebP-Dateien werden nur anhand ihres ersten Einzelbilds umgewandelt.',
      'Höchstens 25 MB pro Datei und 20 Dateien pro Stapel, damit Ihr Browser reaktionsfähig bleibt.',
      'EXIF-Metadaten und eingebettete Farbprofile bleiben nicht erhalten.',
      'Es fügt keine Details hinzu und ist daher keine KI-Hochskalierung.',
      'Die Ausgabe ist auf 16.000 px pro Seite begrenzt.',
    ],
  },
  'blur-image-area': {
    name: 'Bereich verwischen oder verpixeln',
    description: 'Verbergen Sie Gesichter, Kennzeichen oder private Details durch Verwischen, Verpixeln oder Abdecken von Bereichen.',
    metaDescription: 'Teile eines Bildes kostenlos online verwischen oder verpixeln. Ziehen Sie Rahmen über Gesichter, Kennzeichen oder Text und verbergen Sie sie direkt im Browser.',
    steps: [
      'Fügen Sie ein Bild hinzu.',
      'Ziehen Sie im Bild Rahmen über die Stellen, die Sie verbergen möchten.',
      'Wählen Sie Verwischen, Verpixeln oder einen schwarzen Balken, wenden Sie es an und laden Sie das Ergebnis herunter.',
    ],
    faq: [
      {
        q: 'Ist Verwischen für sensible Details sicher?',
        a: 'Für alles, was privat bleiben muss, etwa Ausweisnummern oder Kennzeichen, verwenden Sie den schwarzen Balken. Verwischen und Verpixeln lassen sich manchmal teilweise rückgängig machen.',
      },
      {
        q: 'Werden Gesichter automatisch erkannt?',
        a: 'Nein. Sie ziehen die Rahmen selbst. Eine automatische Erkennung erfordert ein großes KI-Modell, das nicht enthalten ist.',
      },
      {
        q: 'Kann ich es mir anders überlegen?',
        a: 'Ja. Entfernen Sie Rahmen oder zeichnen Sie sie neu, bevor Sie die Änderung anwenden. Ihre Originaldatei wird nie verändert.',
      },
      {
        q: 'Bleiben EXIF- oder Standortdaten erhalten?',
        a: 'Nein. Beim Neukodieren über ein Canvas gehen EXIF-Metadaten wie Kameramodell und GPS-Standort verloren, was vor dem Teilen eines Fotos oft gewünscht ist. Auch Farbprofile bleiben nicht erhalten.',
      },
    ],
    limits: [
      'Jeweils ein Bild, bis zu 25 MB.',
      'Die Bereiche werden von Hand ausgewählt; es gibt keine Gesichtserkennung.',
      'Bei animierten Bildern wird das erste Einzelbild verwendet.',
    ],
  },
  'qr-code-scanner': {
    name: 'QR-Code-Scanner',
    description: 'Lesen Sie QR-Codes aus Fotos und Screenshots und sehen Sie genau, was sie enthalten.',
    metaDescription: 'Einen QR-Code kostenlos online aus einem Bild scannen. Laden Sie ein Foto oder einen Screenshot hoch, um Link, Text oder WLAN-Daten zu lesen. Läuft im Browser.',
    steps: [
      'Fügen Sie ein oder mehrere Bilder mit einem QR-Code hinzu.',
      'Der Code wird automatisch gelesen.',
      'Kopieren Sie das Ergebnis oder öffnen Sie einen Link, nachdem Sie ihn geprüft haben.',
    ],
    faq: [
      {
        q: 'Kann ich mit meiner Kamera scannen?',
        a: 'Noch nicht. Dieses Tool liest QR-Codes aus Bilddateien. Machen Sie auf dem Smartphone ein Foto des Codes und wählen Sie es hier aus, oder nutzen Sie Ihre Kamera-App.',
      },
      {
        q: 'Ist es sicher, gescannte Links zu öffnen?',
        a: 'Prüfen Sie zuerst die Adresse. Der vollständige Link wird angezeigt, und von hier aus lassen sich nur Web-Links (http oder https) öffnen. Skript- und Daten-Links werden nie geöffnet.',
      },
      {
        q: 'Warum wurde kein Code gefunden?',
        a: 'Der Code ist möglicherweise unscharf, abgeschnitten, zu klein oder kontrastarm. Versuchen Sie es mit einem schärferen, näheren Bild, das den ganzen Code mit klarem Rand zeigt.',
      },
      {
        q: 'Werden meine Bilder hochgeladen?',
        a: 'Nein. Das Bild wird in Ihrem Browser gelesen, und dieses Tool sendet es nirgendwohin.',
      },
    ],
    limits: [
      'Bis zu 10 Bilder mit je 25 MB.',
      'Pro Bild wird ein Code gelesen.',
      'Nur Standard-QR-Codes; andere Barcodes werden nicht unterstützt.',
    ],
  },
  'gif-maker': {
    name: 'GIF-Ersteller',
    description: 'Machen Sie aus Ihren Bildern ein animiertes GIF mit eigenem Timing, eigener Größe und Wiederholung.',
    metaDescription: 'Ein animiertes GIF aus Bildern kostenlos online erstellen. Einzelbilder neu anordnen, Verzögerung pro Bild, Größe und Wiederholung festlegen und das GIF herunterladen. Im Browser erstellt.',
    steps: [
      'Fügen Sie zwei oder mehr Bilder hinzu (oder nur eins für ein statisches GIF).',
      'Ziehen Sie sie in die gewünschte Reihenfolge, legen Sie fest, wie lange jedes Einzelbild angezeigt wird, und wählen Sie Größe, Wiederholung und Farben.',
      'Erstellen Sie das GIF, sehen Sie sich die Vorschau an und laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Warum ist mein GIF so groß?',
        a: 'GIFs speichern jedes Einzelbild als Bild mit höchstens 256 Farben. Weniger Einzelbilder, eine geringere Breite und weniger Farben verkleinern die Datei. Das Tool zeigt die Größe an, sobald das GIF erstellt ist.',
      },
      {
        q: 'Kann ich transparente Bereiche behalten?',
        a: 'Ja, aktivieren Sie „Transparente Bereiche beibehalten“ für PNG- oder WebP-Bilder mit Transparenz. Die Transparenz bei GIF ist pro Pixel entweder an oder aus, weshalb weiche Kanten hart werden.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Bis zu 100 Einzelbilder; je größer die Einzelbilder, desto mehr Arbeitsspeicher benötigt Ihr Browser.',
      'GIFs sind auf 256 Farben pro Einzelbild begrenzt, daher können Fotos körnig wirken.',
      'Animierte Eingaben (GIF, WebP) liefern nur ihr erstes Einzelbild.',
    ],
  },
  'photo-editor': {
    name: 'Fotoeditor',
    description: 'Passen Sie ein Foto an, wenden Sie Filter an, drehen und schneiden Sie es zu und fügen Sie Text hinzu – mit Live-Vorschau.',
    metaDescription: 'Kostenloser Online-Fotoeditor. Farben anpassen, Filter anwenden, drehen, ausrichten, zuschneiden und Text hinzufügen, dann als PNG, JPG oder WebP herunterladen. Privat, im Browser.',
    steps: [
      'Fügen Sie ein Foto hinzu.',
      'Nutzen Sie die Registerkarten, um Farben anzupassen, einen Filter anzuwenden, zu drehen oder zuzuschneiden und Text hinzuzufügen. Die Vorschau aktualisiert sich laufend.',
      'Wählen Sie das Format und laden Sie Ihr bearbeitetes Foto herunter.',
    ],
    faq: [
      {
        q: 'Wird die Originaldatei verändert?',
        a: 'Nein. Ihre Datei wird nie verändert; das bearbeitete Bild entsteht als neuer Download.',
      },
      {
        q: 'Geht beim Exportieren Qualität verloren?',
        a: 'PNG behält jeden Pixel. JPG und WebP sind verlustbehaftet; verwenden Sie eine Qualität von 90 oder höher, damit Fotos unverändert aussehen. Bearbeitungen werden in der vollen Größe Ihres Bildes angewendet, nicht in der Größe der Vorschau.',
      },
      {
        q: 'Werden meine Bilder auf einen Server hochgeladen?',
        a: 'Nein. Das Bild wird von Ihrem Browser mit der Canvas-API dekodiert und neu kodiert. Dieses Tool sendet die Datei nirgendwohin.',
      },
    ],
    limits: [
      'Jeweils ein Foto, bis zu 25 MB und etwa 50 Megapixel.',
      'Bearbeitungen werden in fester Reihenfolge angewendet: Drehen und Zuschneiden, Farbanpassungen, Weichzeichnen und Schärfen, Vignette, dann Text.',
      'EXIF-Angaben wie der Standort werden nicht in das bearbeitete Bild übernommen.',
      'Keine Ebenen, Pinsel oder KI-Funktionen.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG in PDF',
    description: 'Wandeln Sie JPG-Fotos in ein PDF um, ein Bild pro Seite.',
    metaDescription: 'JPG kostenlos online in PDF umwandeln. Seitengröße, Ausrichtung und Ränder wählen. JPEG-Daten werden ohne erneute Komprimierung eingebettet.',
    steps: [
      'Fügen Sie Ihre JPG-Dateien hinzu und legen Sie per Ziehen oder mit den Pfeilen ihre Reihenfolge fest.',
      'Wählen Sie Seitengröße, Ausrichtung und Rand.',
      'Erstellen Sie das PDF und laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Sinkt die Bildqualität?',
        a: 'Nein. JPG-Dateien werden unverändert und ohne erneute Komprimierung in das PDF eingebettet.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Höchstens 25 MB pro Bild und 100 Bilder pro PDF.',
      'Hier werden nur JPG-Bilder akzeptiert; für gemischte Formate nutzen Sie „Bilder in PDF“.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG in PDF',
    description: 'Wandeln Sie PNG-Bilder in ein PDF um und behalten Sie die Transparenz.',
    metaDescription: 'PNG kostenlos online in PDF umwandeln. Seitengröße und Ränder wählen; die Transparenz bleibt erhalten. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie Ihre PNG-Dateien hinzu und legen Sie ihre Reihenfolge fest.',
      'Wählen Sie Seitengröße, Ausrichtung und Rand.',
      'Erstellen Sie das PDF und laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Bleibt die Transparenz erhalten?',
        a: 'Ja. PNG-Bilder werden mit ihrem Alphakanal eingebettet, sodass transparente Bereiche die weiße Seite dahinter zeigen.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Höchstens 25 MB pro Bild und 100 Bilder pro PDF.',
      'Hier werden nur PNG-Bilder akzeptiert; für gemischte Formate nutzen Sie „Bilder in PDF“.',
    ],
  },
  'images-to-pdf': {
    name: 'Bilder in PDF',
    description: 'Fügen Sie JPG- und PNG-Bilder in der gewünschten Reihenfolge zu einem einzigen PDF zusammen.',
    metaDescription: 'Mehrere Bilder kostenlos online zu einem PDF zusammenfügen. Seiten neu anordnen, Seitengröße und Ränder wählen. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie JPG- und PNG-Bilder hinzu (auch mehrere auf einmal).',
      'Ordnen Sie sie neu an und wählen Sie Seitengröße, Ausrichtung und Rand.',
      'Erstellen Sie das PDF und laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Welche Bildformate funktionieren?',
        a: 'JPG und PNG werden direkt eingebettet. WebP, GIF und BMP werden zuvor in PNG umgewandelt, sofern Ihr Browser sie dekodieren kann.',
      },
      {
        q: 'Was bewirkt „An Bild anpassen“?',
        a: 'Jede Seite erhält die Größe ihres Bildes, sodass nichts skaliert oder aufgefüllt wird. Wählen Sie A4 oder Letter für übliche Dokumentseiten.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Höchstens 25 MB pro Bild und 100 Bilder pro PDF.',
    ],
  },
  'merge-pdf': {
    name: 'PDF zusammenführen',
    description: 'Führen Sie mehrere PDF-Dateien in der gewünschten Reihenfolge zu einem Dokument zusammen.',
    metaDescription: 'PDF-Dateien kostenlos online zusammenführen. Mehrere PDFs zu einem vereinen, neu anordnen und sofort herunterladen. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie zwei oder mehr PDF-Dateien hinzu.',
      'Bringen Sie sie mit den Pfeilen in die gewünschte Reihenfolge.',
      'Zusammenführen und das kombinierte PDF herunterladen.',
    ],
    faq: [
      {
        q: 'Bleiben Lesezeichen und Formularfelder erhalten?',
        a: 'Seiten werden mit ihrem sichtbaren Inhalt und ihren Links kopiert. Lesezeichen auf Dokumentebene und interaktive Formulardaten werden nicht übernommen.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Lesezeichen/Gliederungen und Formularfelder der Quelldateien werden nicht zusammengeführt.',
    ],
  },
  'split-pdf': {
    name: 'PDF teilen',
    description: 'Teilen Sie ein PDF nach Seitenbereichen, in Einzelseiten oder in Abschnitte fester Größe.',
    metaDescription: 'Ein PDF kostenlos online teilen. Nach Seitenbereichen, jede Seite oder alle N Seiten trennen und als ZIP herunterladen. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie, wie geteilt werden soll: eigene Bereiche wie 1-3, 4-6, jede Seite oder alle N Seiten.',
      'Teilen und die Teile einzeln oder als ZIP herunterladen.',
    ],
    faq: [
      {
        q: 'Wie schreibe ich Bereiche?',
        a: 'Trennen Sie die Ausgabedateien durch Kommas. Jede Datei kann ein Bereich (1-3), eine einzelne Seite (5) oder eine Mischung sein, getrennt durch ein Pluszeichen (1-2+7). Beispiel: 1-3, 4-6, 7+9.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
    ],
  },
  'rotate-pdf': {
    name: 'PDF drehen',
    description: 'Drehen Sie einzelne Seiten oder das gesamte PDF – mit Miniaturvorschau.',
    metaDescription: 'PDF-Seiten kostenlos online drehen. Einzelne oder alle Seiten um 90, 180 oder 270 Grad drehen und ein neues PDF speichern. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu; seine Seiten erscheinen als Miniaturen.',
      'Drehen Sie einzelne Seiten oder alle auf einmal.',
      'Speichern Sie das gedrehte PDF.',
    ],
    faq: [
      {
        q: 'Ist die Drehung dauerhaft?',
        a: 'Sie wird im neuen PDF als Seitendrehungsattribut gespeichert. Der Seiteninhalt wird nicht neu gezeichnet, daher geht nichts verloren.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
    ],
  },
  'extract-pdf-pages': {
    name: 'PDF-Seiten extrahieren',
    description: 'Wählen Sie die benötigten Seiten aus einem PDF aus und speichern Sie sie als neues Dokument.',
    metaDescription: 'Seiten aus einem PDF kostenlos online extrahieren. Seiten visuell oder per Bereich auswählen und ein neues PDF speichern. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Klicken Sie auf Seitenminiaturen, um sie auszuwählen, oder geben Sie einen Bereich wie 1-3, 8 ein.',
      'Extrahieren und das neue PDF herunterladen.',
    ],
    faq: [
      {
        q: 'Kann ich damit Seiten löschen?',
        a: 'Ja. Wählen Sie die Seiten aus, die Sie behalten möchten, und extrahieren Sie sie; die übrigen bleiben in der neuen Datei weg.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'PDF-Seiten neu anordnen',
    description: 'Ordnen Sie Seiten visuell neu an, entfernen und drehen Sie sie und speichern Sie das Ergebnis.',
    metaDescription: 'PDF-Seiten kostenlos online neu anordnen. Seiten ziehen oder verschieben, nicht benötigte Seiten löschen und ein neues PDF speichern. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu; seine Seiten erscheinen als Miniaturen.',
      'Ziehen Sie Seiten oder nutzen Sie die Pfeiltasten, um die Reihenfolge zu ändern. Entfernen Sie nicht benötigte Seiten.',
      'Speichern Sie das neu angeordnete PDF.',
    ],
    faq: [
      {
        q: 'Kann ich per Tastatur neu anordnen?',
        a: 'Ja. Nutzen Sie die Schaltflächen „Nach vorn“ und „Nach hinten“ bei jeder Seite.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF in JPG',
    description: 'Stellen Sie PDF-Seiten in der gewählten Auflösung als JPG-Bilder dar.',
    metaDescription: 'PDF kostenlos online in JPG umwandeln. Jede Seite oder eine Auswahl mit bis zu 300 DPI rendern und als ZIP herunterladen. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie die Auflösung und optional, welche Seiten umgewandelt werden sollen.',
      'Umwandeln und die Bilder einzeln oder als ZIP herunterladen.',
    ],
    faq: [
      {
        q: 'Welche Auflösung sollte ich wählen?',
        a: '150 DPI eignen sich für Bildschirme, 300 DPI für den Druck. Höhere Werte erzeugen größere Bilder und benötigen mehr Arbeitsspeicher.',
      },
      {
        q: 'Werden die Seiten originalgetreu dargestellt?',
        a: 'Die Darstellung nutzt PDF.js von Mozilla, das die meisten PDFs gut verarbeitet. Ungewöhnliche Schriftarten oder aufwendige Grafiken können leicht von anderen Anzeigeprogrammen abweichen.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Jede Seite ist auf etwa 50 Megapixel begrenzt.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF in PNG',
    description: 'Stellen Sie PDF-Seiten als scharfe, verlustfreie PNG-Bilder dar.',
    metaDescription: 'PDF kostenlos online in PNG umwandeln. Seiten mit bis zu 300 DPI als verlustfreie Bilder rendern und als ZIP herunterladen. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie Auflösung und Seiten.',
      'Umwandeln und die Bilder einzeln oder als ZIP herunterladen.',
    ],
    faq: [
      {
        q: 'Warum PNG statt JPG wählen?',
        a: 'PNG bleibt bei Text und Strichzeichnungen scharf und unterstützt Transparenz. Die Dateien sind größer als bei JPG.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Jede Seite ist auf etwa 50 Megapixel begrenzt.',
    ],
  },
  'pdf-viewer': {
    name: 'PDF-Viewer',
    description: 'Öffnen und lesen Sie ein PDF privat in Ihrem Browser – mit Zoom und Seitennavigation.',
    metaDescription: 'PDF-Dateien kostenlos online ansehen. Zoomen, zu einer Seite springen und Dokumente im Browser lesen, ohne sie irgendwohin hochzuladen.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Scrollen Sie oder nutzen Sie die Seitensteuerung zum Navigieren.',
      'Vergrößern oder verkleinern Sie die Ansicht nach Bedarf.',
    ],
    faq: [
      {
        q: 'Kann ich das PDF hier bearbeiten oder kommentieren?',
        a: 'Nein. Dies ist ein reiner Viewer. Nutzen Sie die Seitentools, um Seiten zu drehen, neu anzuordnen oder zu extrahieren.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Nur Lesezugriff: keine Anmerkungen, kein Ausfüllen von Formularen und keine Textsuche.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'PDF-Metadaten anzeigen',
    description: 'Prüfen Sie Titel, Autor, Erstellungsdaten, Seitenzahl, Seitengrößen und Version eines PDFs.',
    metaDescription: 'PDF-Metadaten kostenlos online anzeigen. Titel, Autor, Ersteller, Datumsangaben, Seitenzahl und Seitengrößen ansehen, ohne die Datei hochzuladen.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Sehen Sie sich die Dokumenteigenschaften an.',
      'Kopieren Sie die Angaben bei Bedarf als JSON.',
    ],
    faq: [
      {
        q: 'Warum fehlen manche Metadaten?',
        a: 'Viele PDFs setzen nicht jedes Feld. Angezeigt werden nur Felder, die tatsächlich in der Datei gespeichert sind.',
      },
      {
        q: 'Kann ich Metadaten entfernen?',
        a: 'Dieses Tool liest Metadaten nur aus. Es verändert die Datei nicht.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Nur Lesezugriff: Metadaten können hier weder bearbeitet noch entfernt werden.',
    ],
  },
  'remove-pdf-pages': {
    name: 'PDF-Seiten entfernen',
    description: 'Löschen Sie nicht benötigte Seiten und speichern Sie den Rest als neues PDF.',
    metaDescription: 'Seiten aus einem PDF kostenlos online entfernen. Seiten visuell oder per Bereich auswählen, löschen und den Rest herunterladen. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu; seine Seiten erscheinen als Miniaturen.',
      'Klicken Sie auf die Seiten, die Sie löschen möchten, oder geben Sie einen Bereich wie 2, 5-7 ein.',
      'Entfernen Sie sie und laden Sie das neue PDF herunter.',
    ],
    faq: [
      {
        q: 'Verändert es meine Originaldatei?',
        a: 'Nein. Sie erhalten ein neues PDF ohne die ausgewählten Seiten. Ihr Original bleibt unverändert.',
      },
      {
        q: 'Kann ich alle Seiten entfernen?',
        a: 'Nein. Mindestens eine Seite muss erhalten bleiben.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
    ],
  },
  'add-page-numbers': {
    name: 'Seitenzahlen hinzufügen',
    description: 'Nummerieren Sie die Seiten eines PDFs nach Wunsch mit Position, Format und Stil.',
    metaDescription: 'Einem PDF kostenlos online Seitenzahlen hinzufügen. Position, ein Format wie „Seite 1 von 10“, Startnummer und Schriftgröße wählen. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie, wo die Zahlen stehen, ihr Format und welche Seiten nummeriert werden.',
      'Fügen Sie die Zahlen hinzu und laden Sie das PDF herunter.',
    ],
    faq: [
      {
        q: 'Kann ich das Deckblatt überspringen?',
        a: 'Ja. Setzen Sie „Erste zu nummerierende Seite“ auf 2 und wählen Sie dann, welche Zahl dort angezeigt werden soll.',
      },
      {
        q: 'Funktioniert es auch bei gedrehten Seiten?',
        a: 'Ja. Die Zahlen werden relativ zu dem platziert, was Sie auf dem Bildschirm sehen, auch bei gedrehten Seiten.',
      },
      {
        q: 'Welche Schriftart wird verwendet?',
        a: 'Helvetica, die Ziffern und lateinische Buchstaben abdeckt.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Die Zahlen werden über jede Seite gezeichnet, nie hinter vorhandene Inhalte.',
      'Verwendet die integrierte Schriftart Helvetica.',
    ],
  },
  'watermark-pdf': {
    name: 'PDF-Wasserzeichen',
    description: 'Stempeln Sie Text oder ein Bild mit einstellbarer Deckkraft und einstellbarem Winkel über Ihre PDF-Seiten.',
    metaDescription: 'Einem PDF kostenlos online ein Wasserzeichen hinzufügen. Text oder Bild zentriert oder gekachelt aufstempeln, mit eigener Deckkraft und Drehung. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie ein Text- oder Bild-Wasserzeichen und legen Sie dann Größe, Deckkraft, Winkel und Anordnung fest.',
      'Wenden Sie es auf alle Seiten oder eine Auswahl an und laden Sie das Ergebnis herunter.',
    ],
    faq: [
      {
        q: 'Lässt sich das Wasserzeichen entfernen?',
        a: 'Es wird über die Seite gezeichnet und ist keine Sicherheitsfunktion. Jeder mit einem PDF-Editor kann es entfernen. Für stärkeren Schutz kombinieren Sie es mit „PDF schützen“.',
      },
      {
        q: 'Kann ich Urdu, Arabisch oder andere Schriften verwenden?',
        a: 'Nicht als getippten Text, da die integrierten PDF-Schriftarten nur lateinische Buchstaben abdecken. Erstellen Sie ein transparentes PNG Ihres Textes und verwenden Sie stattdessen die Bildoption.',
      },
      {
        q: 'Liegt das Wasserzeichen vor oder hinter dem Seitentext?',
        a: 'Davor. Verringern Sie die Deckkraft, damit die Seite lesbar bleibt.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Text-Wasserzeichen unterstützen nur lateinische Buchstaben, Ziffern und gängige Symbole.',
      'Wasserzeichen-Bilder: PNG oder JPG, bis zu 5 MB.',
      'Das Zeichen wird über den vorhandenen Seiteninhalt gezeichnet.',
    ],
  },
  'crop-pdf': {
    name: 'PDF zuschneiden',
    description: 'Schneiden Sie Ränder ab oder behalten Sie auf jeder Seite einen gewählten Bereich – mit Live-Seitenvorschau.',
    metaDescription: 'PDF-Seiten kostenlos online zuschneiden. Einen Zuschneiderahmen auf der Seitenvorschau ziehen oder Ränder eingeben und auf alle oder ausgewählte Seiten anwenden. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu und wählen Sie eine Seite für die Vorschau aus.',
      'Ziehen Sie den Rahmen oder geben Sie Ränder ein, um den Bereich festzulegen, der erhalten bleibt.',
      'Wählen Sie, welche Seiten zugeschnitten werden, und laden Sie das Ergebnis herunter.',
    ],
    faq: [
      {
        q: 'Wird der abgeschnittene Inhalt gelöscht?',
        a: 'Nein. Beim Zuschneiden ändert sich der sichtbare Bereich jeder Seite, aber der Inhalt außerhalb davon befindet sich weiterhin in der Datei. Verlassen Sie sich nicht auf das Zuschneiden, um sensible Informationen zu verbergen.',
      },
      {
        q: 'Was ist, wenn meine Seiten unterschiedlich groß sind?',
        a: 'Die gleichen Proportionen werden auf jede ausgewählte Seite angewendet, sodass Seiten unterschiedlicher Größe um denselben Prozentsatz beschnitten werden.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Das Zuschneiden verbirgt Inhalte, es löscht sie nicht.',
      'Der Zuschneidebereich ist ein Anteil jeder Seite, keine feste Größe in Millimetern.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'PDF-Metadaten bearbeiten',
    description: 'Ändern Sie Titel, Autor, Betreff und Schlüsselwörter eines PDFs oder entfernen Sie alle Metadaten.',
    metaDescription: 'PDF-Metadaten kostenlos online bearbeiten. Titel, Autor, Betreff und Schlüsselwörter ändern oder alle Dokumenteigenschaften entfernen. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu; seine aktuellen Eigenschaften werden eingetragen.',
      'Bearbeiten Sie die Felder oder wählen Sie „Alle Metadaten entfernen“.',
      'Speichern Sie das aktualisierte PDF und laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Was entfernt „Alle Metadaten entfernen“?',
        a: 'Die Dokumentinformationen (Titel, Autor, Betreff, Schlüsselwörter, Ersteller, Producer und Datumsangaben) sowie die eingebetteten XMP-Metadaten. Seitentext, Bilder und Kommentare bleiben unberührt.',
      },
      {
        q: 'Warum Metadaten bearbeiten?',
        a: 'Um einen falschen Titel zu korrigieren, der in Browser-Tabs und Suchergebnissen erscheint, den richtigen Autor anzugeben oder persönliche Angaben vor dem Weitergeben einer Datei zu entfernen.',
      },
      {
        q: 'Werden nichtlateinische Texte unterstützt?',
        a: 'Ja. Titel und Autoren in Urdu, Arabisch, Chinesisch und anderen Schriften werden korrekt gespeichert.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Es werden nur Eigenschaften auf Dokumentebene geändert. Kommentare, Formulardaten und Seiteninhalt bleiben unverändert.',
    ],
  },
  'protect-pdf': {
    name: 'PDF schützen',
    description: 'Sperren Sie ein PDF mit einem Passwort per AES-256-Verschlüsselung.',
    metaDescription: 'Ein PDF kostenlos online mit einem Passwort schützen. Die AES-256-Verschlüsselung erfolgt in Ihrem Browser; Datei und Passwort werden nie hochgeladen.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Geben Sie ein Passwort zweimal ein und legen Sie fest, was Leser dürfen (drucken, kopieren, bearbeiten).',
      'Schützen Sie das PDF und laden Sie die verschlüsselte Kopie herunter.',
    ],
    faq: [
      {
        q: 'Wie stark ist der Schutz?',
        a: 'Dateien werden mit AES-256 verschlüsselt, der stärksten Standardverschlüsselung für PDFs. In der Praxis hängt die Sicherheit von Ihrem Passwort ab: Verwenden Sie ein langes, das Sie nirgendwo sonst nutzen.',
      },
      {
        q: 'Was ist, wenn ich das Passwort vergesse?',
        a: 'Es lässt sich nicht wiederherstellen. Nichts wird gespeichert oder irgendwohin gesendet, und es gibt keine Zurücksetzung. Bewahren Sie Ihre Originaldatei und das Passwort an einem sicheren Ort auf.',
      },
      {
        q: 'Werden die Optionen zum Drucken, Kopieren und Bearbeiten durchgesetzt?',
        a: 'Es sind Vorgaben, die die meisten PDF-Programme beachten, aber sie sind nicht unumgehbar. Was die Datei wirklich schützt, ist das Passwort.',
      },
      {
        q: 'Wird mein Passwort hochgeladen?',
        a: 'Nein. Die Verschlüsselung erfolgt in Ihrem Browser.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwörter: bis zu 127 Standardzeichen (Buchstaben, Ziffern und Symbole).',
      'Ein PDF, das bereits ein Passwort hat, muss zuerst entsperrt werden.',
      'Sehr alte PDF-Reader (von vor etwa 2008) öffnen AES-256-Dateien eventuell nicht.',
    ],
  },
  'unlock-pdf': {
    name: 'PDF entsperren',
    description: 'Entfernen Sie das Passwort von einem PDF, auf das Sie Zugriff haben, damit es frei geöffnet werden kann.',
    metaDescription: 'Ein passwortgeschütztes PDF kostenlos online entsperren. Geben Sie das Passwort ein, um eine ungeschützte Kopie zu speichern – im Browser verarbeitet und nie hochgeladen.',
    steps: [
      'Fügen Sie das geschützte PDF hinzu.',
      'Geben Sie bei Aufforderung sein Passwort ein. PDFs, die nur das Drucken oder Kopieren einschränken, benötigen keines.',
      'Laden Sie die entsperrte Kopie herunter.',
    ],
    faq: [
      {
        q: 'Kann es ein PDF entsperren, wenn ich das Passwort vergessen habe?',
        a: 'Nein. Dieses Tool errät oder knackt niemals Passwörter. Es entfernt den Schutz nur, wenn Sie das richtige Passwort angeben oder die Datei lediglich Aktionen wie das Drucken einschränkt.',
      },
      {
        q: 'Ist das erlaubt?',
        a: 'Verwenden Sie es nur für Dateien, die Ihnen gehören oder die Sie öffnen dürfen. Sie sind dafür verantwortlich, wie Sie das Ergebnis verwenden.',
      },
      {
        q: 'Wird mein Passwort hochgeladen?',
        a: 'Nein. Alles geschieht in Ihrem Browser.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Unterstützt den üblichen PDF-Passwortschutz (RC4 und AES).',
      'Eine digitale Signatur wird ungültig, sobald die Datei erneut gespeichert wird.',
      'Zertifikatsbasierte oder per DRM geschützte Dateien werden nicht unterstützt.',
    ],
  },
  'extract-pdf-text': {
    name: 'Text aus PDF extrahieren',
    description: 'Kopieren Sie den gesamten auswählbaren Text aus einem PDF, Seite für Seite.',
    metaDescription: 'Text aus einem PDF kostenlos online extrahieren. Den auswählbaren Text jeder Seite oder eines Bereichs abrufen, kopieren oder als .txt speichern. Läuft in Ihrem Browser.',
    steps: [
      'Fügen Sie ein PDF hinzu.',
      'Wählen Sie alle Seiten oder einen Bereich und ob Seitenumbrüche markiert werden sollen.',
      'Kopieren Sie den Text oder laden Sie ihn als .txt-Datei herunter.',
    ],
    faq: [
      {
        q: 'Warum ist das Ergebnis leer?',
        a: 'Das PDF ist wahrscheinlich ein Scan, also ein Bild von Text statt echtem Text. Um ihn zu lesen, ist OCR (Texterkennung) nötig, was dieses Tool nicht leistet.',
      },
      {
        q: 'Bleibt das Layout erhalten?',
        a: 'Zeilen und Absätze werden so gut wie möglich rekonstruiert, aber Spalten, Tabellen und Fußnoten können in anderer Reihenfolge erscheinen.',
      },
      {
        q: 'Kann es passwortgeschützte PDFs öffnen?',
        a: 'Nein. Verschlüsselte PDFs werden erkannt und mit einer eindeutigen Meldung abgelehnt. Entfernen Sie zuerst das Passwort mit unserem Tool „PDF entsperren“.',
      },
    ],
    limits: [
      'Höchstens 100 MB pro PDF.',
      'Passwortgeschützte (verschlüsselte) PDFs werden nicht unterstützt.',
      'Bei sehr großen oder komplexen PDFs kommt es auf den Arbeitsspeicher Ihres Geräts an.',
      'Es wird nur echter Text extrahiert; gescannte Seiten benötigen OCR.',
      'Die Lesereihenfolge folgt dem PDF und kann bei komplexen Layouts von der visuellen Reihenfolge abweichen.',
    ],
  },
  'compress-pdf': {
    name: 'PDF komprimieren',
    description: 'Verkleinern Sie ein PDF, indem seine Bilder neu komprimiert werden, während der Text auswählbar bleibt.',
    metaDescription: 'PDF kostenlos online komprimieren. Eingebettete Bilder neu komprimieren, um die Dateigröße zu senken, während der Text auswählbar bleibt, oder Seiten für die kleinste Datei zusammenfassen. Läuft im Browser.',
    steps: [
      'Fügen Sie Ihr PDF hinzu.',
      'Wählen Sie, wie und wie stark komprimiert wird: Standardmäßig bleibt der Text auswählbar und nur Bilder werden neu komprimiert.',
      'Komprimieren, die gesparte Größe prüfen und das Ergebnis herunterladen.',
    ],
    faq: [
      {
        q: 'Warum wurde mein PDF kaum kleiner?',
        a: 'Der Standardmodus komprimiert JPEG-Bilder neu und hilft daher am meisten bei PDFs voller Fotos oder Scans. Ein PDF, das überwiegend aus Text besteht oder dessen Bilder bereits klein sind, lässt sich kaum verkleinern. Das Tool teilt Ihnen mit, wenn es nichts einsparen konnte, statt etwas vorzutäuschen.',
      },
      {
        q: 'Wird die Qualität schlechter?',
        a: 'Bilder verlieren zugunsten der Größe etwas an Detail; „Leicht“ hält sie fast unverändert, „Stark“ macht sie sichtbar weicher. Text und Vektorgrafiken bleiben im Standardmodus unberührt. Der Modus „Maximal“ verwandelt jede Seite in ein Bild, sodass Text nicht mehr ausgewählt oder durchsucht werden kann.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Nur eingebettete JPEG-Bilder werden neu komprimiert. Bilder im PNG-Stil (Flate), Schriftarten und andere Inhalte bleiben unverändert.',
      'Der Modus „Maximal“ wandelt jede Seite in ein Bild um: Text, Links und Formularfelder funktionieren dann nicht mehr, und die Datei lässt sich nicht durchsuchen.',
      'Die Farben neu komprimierter Bilder können sich minimal verschieben.',
      'Höchstens 100 MB pro PDF. Passwortgeschützte PDFs müssen zuerst entsperrt werden.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR für PDF',
    description: 'Erkennen Sie den Text in gescannten PDFs (Englisch) und erhalten Sie ein durchsuchbares PDF.',
    metaDescription: 'OCR für PDF kostenlos online. Englischen Text in gescannten PDFs erkennen und ein durchsuchbares PDF oder reinen Text herunterladen. Die OCR-Engine läuft lokal in Ihrem Browser.',
    steps: [
      'Fügen Sie ein gescanntes PDF hinzu.',
      'Wählen Sie die Seiten und die Qualität. Seiten, die bereits auswählbaren Text enthalten, können übersprungen werden.',
      'Starten Sie die OCR, prüfen Sie den erkannten Text und laden Sie das durchsuchbare PDF oder eine Textdatei herunter.',
    ],
    faq: [
      {
        q: 'Welche Sprachen werden unterstützt?',
        a: 'Vorerst nur Englisch. Text in anderen Sprachen wird falsch gelesen. Weitere Sprachen können später ergänzt werden, ohne dass sich die Bedienung des Tools ändert.',
      },
      {
        q: 'Wird mein Dokument an einen OCR-Dienst gesendet?',
        a: 'Nein. Die Erkennungs-Engine (Tesseract, kompiliert zu WebAssembly) und ihre englischen Daten werden von dieser Website bereitgestellt und laufen in Ihrem Browser. Das Dokument wird nicht hochgeladen.',
      },
      {
        q: 'Wie genau ist sie?',
        a: 'Saubere, gerade Scans von gedrucktem Text mit 200 bis 300 DPI funktionieren am besten. Handschrift, sehr kleine Schrift sowie kontrastarme oder schiefe Seiten führen zu mehr Fehlern. Prüfen Sie wichtige Zahlen immer nach.',
      },
    ],
    limits: [
      'Nur Englisch. Handschrift wird nicht zuverlässig erkannt.',
      'Die Originalseiten bleiben genau so erhalten, wie sie sind; eine unsichtbare Textebene wird hinzugefügt, damit der Text durchsucht und kopiert werden kann.',
      'OCR ist bei großen Dokumenten langsam (mehrere Sekunden pro Seite). Beim ersten Start wird zudem die Engine geladen (etwa 3 MB).',
      'Höchstens 100 MB pro PDF. Sehr große Seiten werden eventuell abgelehnt, um Ihren Browser zu schützen.',
    ],
  },
  'sign-pdf': {
    name: 'PDF signieren',
    description: 'Zeichnen, tippen oder laden Sie eine Signatur hoch und platzieren Sie sie auf Ihren PDF-Seiten.',
    metaDescription: 'Ein PDF kostenlos online signieren. Signatur zeichnen, tippen oder hochladen, auf beliebigen Seiten platzieren und das signierte PDF herunterladen. Visuelle Signatur, in Ihrem Browser.',
    steps: [
      'Fügen Sie das PDF hinzu, das Sie signieren müssen.',
      'Erstellen Sie Ihre Signatur, indem Sie sie zeichnen, Ihren Namen tippen oder ein Bild hochladen.',
      'Ziehen Sie die Signatur an die richtige Stelle auf der Seite, wählen Sie, welche Seiten sie erhalten, und laden Sie das signierte PDF herunter.',
    ],
    faq: [
      {
        q: 'Ist das eine rechtsverbindliche digitale Signatur?',
        a: 'Es ist eine visuelle Signatur: ein Bild Ihrer Unterschrift, das auf der Seite platziert wird. Es ist keine kryptografische digitale Signatur, hat kein Zertifikat und kann weder belegen, wer unterschrieben hat, noch spätere Änderungen erkennen. Ob sie akzeptiert wird, hängt davon ab, wer sie verlangt. Manche Organisationen verlangen zertifizierte E-Signatur-Dienste.',
      },
      {
        q: 'Wird meine Signatur irgendwo gespeichert?',
        a: 'Nein. Sie wird in Ihrem Browser erstellt, nur für diese Datei verwendet und vergessen, sobald Sie die Seite verlassen oder neu laden.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Nur visuelle Signatur: kein Zertifikat, kein Zeitstempel, keine Manipulationserkennung.',
      'Die Signatur wird als Bild über die Seite gelegt; sie füllt kein Signaturfeld des Formulars aus.',
      'Höchstens 100 MB pro PDF. Passwortgeschützte PDFs müssen zuerst entsperrt werden.',
    ],
  },
  'fill-pdf-forms': {
    name: 'PDF-Formulare ausfüllen',
    description: 'Füllen Sie Textfelder, Kontrollkästchen und Menüs eines ausfüllbaren PDF-Formulars aus.',
    metaDescription: 'PDF-Formulare kostenlos online ausfüllen. In Felder tippen, Kontrollkästchen anhaken und Optionen in einem ausfüllbaren PDF wählen, dann bearbeitbar oder reduziert herunterladen. In Ihrem Browser.',
    steps: [
      'Fügen Sie ein ausfüllbares PDF-Formular hinzu.',
      'Füllen Sie die unter dem Dateinamen aufgelisteten Felder aus. Die Felder sind nach Seiten gruppiert.',
      'Wählen Sie, ob das Formular bearbeitbar bleiben oder reduziert werden soll, und laden Sie das ausgefüllte PDF herunter.',
    ],
    faq: [
      {
        q: 'Mein PDF zeigt keine Felder. Warum?',
        a: 'Hier lassen sich nur PDFs mit echten Formularfeldern ausfüllen. Ein Formular, das nur ein Bild oder einfacher Text ist, hat keine Felder; nutzen Sie „PDF signieren“, um eine Signatur zu platzieren, oder das Wasserzeichen-Tool, um Text hinzuzufügen. Mit XFA erstellte Formulare (einige Behörden- und Bankformulare) werden nicht unterstützt.',
      },
      {
        q: 'Was bewirkt das Reduzieren?',
        a: 'Beim Reduzieren werden Ihre Antworten in die Seite eingebrannt und die Formularfelder entfernt, sodass die Antworten nicht mehr bearbeitet werden können. Nutzen Sie es für die Kopie, die Sie versenden; behalten Sie für sich selbst eine bearbeitbare Kopie.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Der Text darf lateinische Buchstaben, Ziffern und gängige Symbole enthalten (die Formularschrift deckt keine anderen Alphabete ab).',
      'Signaturfelder und Schaltflächen werden angezeigt, lassen sich aber nicht ausfüllen; nutzen Sie „PDF signieren“ für Signaturen.',
      'XFA-Formulare (dynamisch) werden nicht unterstützt.',
      'Höchstens 100 MB pro PDF.',
    ],
  },
  'redact-pdf': {
    name: 'PDF schwärzen',
    description: 'Schwärzen Sie Text und Bereiche endgültig: Geschwärzte Seiten werden als Bilder neu aufgebaut.',
    metaDescription: 'PDF kostenlos online schwärzen. Namen, Zahlen und Bereiche schwärzen, sodass der darunterliegende Text wirklich entfernt und nicht nur verdeckt ist. Läuft im Browser; nichts wird hochgeladen.',
    steps: [
      'Fügen Sie Ihr PDF hinzu und wählen Sie eine Seite aus.',
      'Ziehen Sie Rahmen über alles, was verschwinden muss, oder suchen Sie nach Wörtern, E-Mail-Adressen und Zahlen, um sie automatisch zu markieren.',
      'Wenden Sie die Schwärzungen an und laden Sie das Ergebnis herunter. Prüfen Sie das Ergebnis immer, bevor Sie es weitergeben.',
    ],
    faq: [
      {
        q: 'Wird der verborgene Text wirklich entfernt?',
        a: 'Ja. Jede Seite mit einer Schwärzung wird als Bild mit den aufgemalten schwarzen Kästen neu aufgebaut, sodass der darunterliegende Text und die Objekte in der neuen Datei nicht mehr existieren. Ein schwarzes Rechteck über dem Text, wie es viele Tools zeichnen, würde den Text auswählbar lassen. Seiten, die Sie nicht geschwärzt haben, werden unverändert kopiert.',
      },
      {
        q: 'Warum kann ich auf geschwärzten Seiten keinen Text mehr auswählen?',
        a: 'Weil diese Seiten jetzt Bilder sind. So wird der darunterliegende Inhalt zerstört. Führen Sie anschließend „OCR für PDF“ aus, wenn Sie durchsuchbaren Text benötigen; die geschwärzten Wörter bleiben schwarz.',
      },
      {
        q: 'Findet es automatisch jeden Treffer?',
        a: 'Die Suche markiert Treffer, die in einer einzelnen Textzeile stehen. Eine Wortfolge, die ein PDF in Teile zerlegt, oder Text, der Teil eines Bildes ist, wird möglicherweise übersehen. Prüfen Sie jede Seite und ziehen Sie bei Bedarf Rahmen von Hand.',
      },
    ],
    limits: [
      'Geschwärzte Seiten werden zu Bildern: Auf diesen Seiten gibt es keinen auswählbaren Text, keine Links und keine Formularfelder mehr.',
      'Die automatische Suche funktioniert nur bei auswählbarem Text und nur innerhalb eines Textabschnitts; bei gescannten Seiten müssen Sie Rahmen von Hand ziehen.',
      'Dokumenteigenschaften (Titel, Autor …) werden aus dem Ergebnis entfernt, sofern Sie sie nicht behalten möchten.',
      'Höchstens 100 MB pro PDF.',
    ],
  },
  'compare-pdf': {
    name: 'PDFs vergleichen',
    description: 'Sehen Sie, was sich zwischen zwei PDFs geändert hat: Textunterschiede und hervorgehobene Seiten.',
    metaDescription: 'Zwei PDF-Dateien kostenlos online vergleichen. Hinzugefügte und entfernte Wörter seitenweise sehen und visuelle Unterschiede zwischen Versionen hervorheben. Verarbeitung in Ihrem Browser.',
    steps: [
      'Fügen Sie das Original-PDF und das überarbeitete PDF hinzu.',
      'Vergleichen Sie sie: Die Seiten werden mit der Anzahl hinzugefügter und entfernter Wörter aufgelistet.',
      'Öffnen Sie eine Seite, um die Textänderungen zu lesen, oder wechseln Sie zur visuellen Ansicht, um geänderte Bereiche in Rot zu sehen.',
    ],
    faq: [
      {
        q: 'Was zeigt der Textvergleich?',
        a: 'Für jede Seite die Wörter, die zwischen Original und überarbeitetem Dokument hinzugefügt (grün) und entfernt (rot) wurden, wobei unveränderter Text eingeklappt wird. Die Seiten werden nach Nummer zugeordnet.',
      },
      {
        q: 'Und gescannte PDFs?',
        a: 'Scans enthalten keinen auswählbaren Text, daher findet der Textvergleich nichts. Nutzen Sie den visuellen Vergleich oder führen Sie zuvor „OCR für PDF“ auf beiden Dateien aus.',
      },
      {
        q: 'Wird mein PDF irgendwohin hochgeladen?',
        a: 'Nein. Das PDF wird von Ihrem Browser gelesen und neu geschrieben. Dieses Tool sendet die Datei nicht an einen Server.',
      },
    ],
    limits: [
      'Die Seiten werden nach Nummer verglichen: Wurde eine Seite eingefügt, erscheinen die folgenden Seiten als geändert.',
      'Der visuelle Vergleich stellt jede Seite in Bildschirmauflösung dar; winzige Unterschiede darunter werden eventuell nicht angezeigt.',
      'Pro Datei werden bis zu 100 Seiten verglichen. Passwortgeschützte PDFs müssen zuerst entsperrt werden.',
    ],
  },
  'word-counter': {
    name: 'Wortzähler',
    description: 'Zählen Sie Wörter, Zeichen und Sätze und schätzen Sie die Lesezeit schon beim Tippen.',
    metaDescription: 'Kostenloser Online-Wortzähler. Wörter, Zeichen, Sätze und Absätze zählen und Lese- und Sprechzeit sofort schätzen.',
    steps: [
      'Tippen oder fügen Sie Ihren Text ein.',
      'Lesen Sie die Live-Statistik über dem Editor ab.',
      'Mit „Leeren“ beginnen Sie von vorn.',
    ],
    faq: [
      {
        q: 'Wie werden Wörter gezählt?',
        a: 'Ein Wort ist jede Zeichenfolge, die durch Leerraum getrennt ist. Wörter mit Bindestrich zählen als eins, und Zahlen zählen als Wörter.',
      },
      {
        q: 'Wie wird die Lesezeit berechnet?',
        a: 'Die Lesezeit geht von 238 Wörtern pro Minute aus, die Sprechzeit von 150 Wörtern pro Minute; das sind typische Durchschnittswerte für Erwachsene.',
      },
    ],
    limits: [
      'Die Zählung beruht auf Leerraum; bei Sprachen, die ohne Leerzeichen geschrieben werden (etwa Chinesisch oder Japanisch), wird daher ein Wort pro Textabschnitt angezeigt.',
    ],
  },
  'character-counter': {
    name: 'Zeichenzähler',
    description: 'Zählen Sie Zeichen mit und ohne Leerzeichen und prüfen Sie Texte anhand gängiger Längenbegrenzungen.',
    metaDescription: 'Kostenloser Online-Zeichenzähler. Zeichen mit und ohne Leerzeichen, Bytes und Zeilen zählen und Grenzen für Beiträge, Meta-Tags und SMS prüfen.',
    steps: [
      'Tippen oder fügen Sie Ihren Text ein.',
      'Lesen Sie die Summen und die Grenzbalken ab.',
      'Passen Sie Ihren Text an, bis er passt.',
    ],
    faq: [
      {
        q: 'Werden Emojis als ein Zeichen gezählt?',
        a: 'Ja. Der Zähler zählt sichtbare Zeichen (Graphem-Cluster), sodass ein Emoji als eins gilt, obwohl es mehrere Bytes belegt.',
      },
      {
        q: 'Warum weichen meine SMS-Grenzen ab?',
        a: 'Die SMS-Länge hängt von der Kodierung ab. Nachrichten mit nichtlateinischen Zeichen oder Emojis haben eine kürzere Grenze als die hier gezeigte Referenz von 160 Zeichen.',
      },
    ],
    limits: [
      'Die angezeigten Grenzen sind gängige Richtwerte und ändern sich mit der Zeit; prüfen Sie bei jeder Plattform die aktuelle Regel.',
    ],
  },
  'case-converter': {
    name: 'Groß-/Kleinschreibung ändern',
    description: 'Wandeln Sie Text in Großbuchstaben, Kleinbuchstaben, Titel-, Satz-, Camel-, Snake-, Kebab-Schreibweise und mehr um.',
    metaDescription: 'Kostenloser Online-Konverter für Groß- und Kleinschreibung. Text in GROSSBUCHSTABEN, Kleinbuchstaben, Title Case, Sentence case, camelCase, snake_case, kebab-case und mehr ändern.',
    steps: [
      'Fügen Sie Ihren Text ein.',
      'Wählen Sie die gewünschte Schreibweise.',
      'Kopieren Sie das umgewandelte Ergebnis.',
    ],
    faq: [
      {
        q: 'Berücksichtigt Title Case kleine Wörter?',
        a: 'Ja. Kurze Wörter wie „a“, „of“ und „the“ bleiben klein, außer sie stehen am Anfang oder Ende des Textes.',
      },
    ],
    limits: [
      'Title Case folgt gängigen englischen Stilregeln und passt möglicherweise nicht zu jedem Styleguide.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Doppelte Zeilen entfernen',
    description: 'Entfernen Sie wiederholte Zeilen aus einer Liste und behalten Sie die ursprüngliche Reihenfolge bei.',
    metaDescription: 'Kostenloses Online-Tool zum Entfernen doppelter Zeilen. Wiederholte Zeilen aus Listen löschen, mit Optionen für Groß-/Kleinschreibung, Leerraum und leere Zeilen.',
    steps: [
      'Fügen Sie Ihre Liste ein, ein Eintrag pro Zeile.',
      'Wählen Sie, ob Groß-/Kleinschreibung und Leerraum eine Rolle spielen.',
      'Kopieren Sie das Ergebnis ohne Duplikate.',
    ],
    faq: [
      {
        q: 'Welches Exemplar eines Duplikats bleibt erhalten?',
        a: 'Das erste Vorkommen bleibt erhalten, spätere werden entfernt, sodass Ihre ursprüngliche Reihenfolge bewahrt wird.',
      },
    ],
    limits: [
      'Funktioniert nur mit ganzen Zeilen.',
    ],
  },
  'text-sorter': {
    name: 'Text sortieren',
    description: 'Sortieren Sie Zeilen alphabetisch, numerisch, nach Länge oder zufällig.',
    metaDescription: 'Kostenloses Online-Tool zum Sortieren von Text. Zeilen von A–Z, Z–A, numerisch, nach Länge sortieren oder mischen, mit Ignorieren der Groß-/Kleinschreibung und natürlicher Sortierung.',
    steps: [
      'Fügen Sie Ihre Zeilen ein.',
      'Wählen Sie eine Sortiermethode und Optionen.',
      'Kopieren Sie die sortierte Liste.',
    ],
    faq: [
      {
        q: 'Was ist natürliche Sortierung?',
        a: 'Bei der natürlichen Sortierung werden enthaltene Zahlen nach ihrem Wert verglichen, sodass „item2“ vor „item10“ steht.',
      },
    ],
    limits: [
      'Die alphabetische Sortierung verwendet die Gebietsschemaregeln Ihres Browsers.',
    ],
  },
  'text-cleaner': {
    name: 'Text bereinigen',
    description: 'Entfernen Sie überflüssigen Leerraum, fassen Sie Leerzeichen zusammen, löschen Sie leere Zeilen und unsichtbare Zeichen.',
    metaDescription: 'Kostenloses Online-Tool zum Bereinigen von Text. Überflüssige Leerzeichen, leere Zeilen, Zeilenumbrüche, unsichtbare Zeichen und typografische Anführungszeichen aus eingefügtem Text entfernen.',
    steps: [
      'Fügen Sie Ihren Text ein.',
      'Haken Sie die gewünschten Bereinigungsoptionen an.',
      'Kopieren Sie den bereinigten Text.',
    ],
    faq: [
      {
        q: 'Was sind unsichtbare Zeichen?',
        a: 'Zero-Width-Leerzeichen, weiche Trennstriche und Byte-Order-Marks schleichen sich oft beim Kopieren von Webseiten ein und können Code oder Vergleiche stören.',
      },
    ],
    limits: [
      'Die Vorgänge werden in fester Reihenfolge angewendet; führen Sie das Tool zweimal aus, wenn Sie eine andere Reihenfolge benötigen.',
    ],
  },
  'text-diff-checker': {
    name: 'Textvergleich',
    description: 'Vergleichen Sie zwei Texte und sehen Sie genau, welche Zeilen und Wörter sich geändert haben.',
    metaDescription: 'Kostenloser Online-Textvergleich. Zwei Textversionen nebeneinander vergleichen und hinzugefügte, entfernte und geänderte Zeilen oder Wörter hervorheben.',
    steps: [
      'Fügen Sie links den Originaltext und rechts den geänderten Text ein.',
      'Wählen Sie den Zeilen- oder Wortvergleich.',
      'Prüfen Sie die hervorgehobenen Änderungen.',
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen Zeilen- und Wortmodus?',
        a: 'Der Zeilenmodus markiert ganze Zeilen, die sich geändert haben. Der Wortmodus hebt die genauen Wörter im Text hervor, was sich für Fließtext eignet.',
      },
    ],
    limits: [
      'Sehr große Eingaben (über etwa 200.000 Zeichen) können langsam sein.',
    ],
  },
  'json-formatter': {
    name: 'JSON-Formatierer',
    description: 'Formatieren Sie JSON übersichtlich – mit wählbarer Einrückung und Schlüsselsortierung.',
    metaDescription: 'Kostenloser Online-JSON-Formatierer. JSON mit 2 oder 4 Leerzeichen oder Tabs einrücken, Schlüssel sortieren und genaue Fehlerstellen sehen.',
    steps: [
      'Fügen Sie Ihr JSON ein.',
      'Wählen Sie Einrückung und Sortierung.',
      'Kopieren Sie das formatierte Ergebnis oder laden Sie es herunter.',
    ],
    faq: [
      {
        q: 'Wird mein JSON an einen Server gesendet?',
        a: 'Nein. Das Parsen und Formatieren erfolgt in Ihrem Browser mit dem integrierten JSON-Parser.',
      },
      {
        q: 'Warum wird mein JSON abgelehnt?',
        a: 'Striktes JSON erlaubt keine Kommentare, keine abschließenden Kommas und keine einfachen Anführungszeichen. Die Fehlermeldung nennt Zeile und Spalte des Problems.',
      },
    ],
    limits: [
      'Zahlen über 2^53 verlieren an Genauigkeit, weil der Browser sie als Gleitkommazahlen einliest.',
    ],
  },
  'json-validator': {
    name: 'JSON-Validator',
    description: 'Prüfen Sie, ob JSON gültig ist, und erhalten Sie bei Fehlern die genaue Zeile und Spalte.',
    metaDescription: 'Kostenloser Online-JSON-Validator. JSON-Syntax prüfen und die genaue Zeile und Spalte von Fehlern finden, mit einer Zusammenfassung der Struktur.',
    steps: [
      'Fügen Sie Ihr JSON ein.',
      'Sehen Sie sofort, ob es gültig ist.',
      'Beheben Sie gemeldete Fehler und prüfen Sie erneut.',
    ],
    faq: [
      {
        q: 'Wird gegen ein JSON-Schema validiert?',
        a: 'Nein. Es wird nur die Syntax geprüft: ob der Text wohlgeformtes JSON ist.',
      },
    ],
    limits: [
      'Nur Syntaxprüfung; die Validierung gegen ein JSON-Schema ist nicht enthalten.',
    ],
  },
  'json-minifier': {
    name: 'JSON-Minifizierer',
    description: 'Entfernen Sie Leerraum aus JSON, um es so kompakt wie möglich zu machen.',
    metaDescription: 'Kostenloser Online-JSON-Minifizierer. Leerraum aus JSON entfernen, um Daten zu verkleinern, und sehen, wie viele Bytes Sie gespart haben.',
    steps: [
      'Fügen Sie Ihr JSON ein.',
      'Die minifizierte Ausgabe erscheint mit der eingesparten Größe.',
      'Kopieren Sie sie oder laden Sie sie herunter.',
    ],
    faq: [
      {
        q: 'Verändert das Minifizieren die Daten?',
        a: 'Nein. Es wird nur überflüssiger Leerraum entfernt; Schlüssel, Werte und Reihenfolge bleiben unverändert.',
      },
    ],
    limits: [
      'Zahlen über 2^53 verlieren an Genauigkeit, weil der Browser sie als Gleitkommazahlen einliest.',
    ],
  },
  'xml-formatter': {
    name: 'XML-Formatierer',
    description: 'Formatieren oder minifizieren Sie XML und erkennen Sie nicht passende oder nicht geschlossene Tags.',
    metaDescription: 'Kostenloser Online-XML-Formatierer. XML mit einstellbarer Einrückung verschönern oder minifizieren und nicht passende oder nicht geschlossene Tags erkennen.',
    steps: [
      'Fügen Sie Ihr XML ein.',
      'Wählen Sie „Formatieren“ oder „Minifizieren“ und die Einrückung.',
      'Kopieren Sie das Ergebnis.',
    ],
    faq: [
      {
        q: 'Wie gründlich wird das XML validiert?',
        a: 'Das Tool prüft die Verschachtelung der Tags, nicht geschlossene Tags sowie nicht beendete Kommentare oder CDATA. Es validiert nicht gegen ein DTD- oder XSD-Schema.',
      },
    ],
    limits: [
      'Nur Strukturprüfungen; keine DTD- oder XSD-Validierung.',
    ],
  },
  'url-encoder-decoder': {
    name: 'URL-Kodierer / -Dekodierer',
    description: 'Kodieren oder dekodieren Sie URLs und Query-String-Werte per Prozentkodierung.',
    metaDescription: 'Kostenloser Online-URL-Kodierer und -Dekodierer. Text für URLs prozentkodieren oder kodierte Strings dekodieren, für vollständige URLs oder einzelne Komponenten.',
    steps: [
      'Wählen Sie „Kodieren“ oder „Dekodieren“.',
      'Fügen Sie Ihren Text oder Ihre URL ein.',
      'Kopieren Sie das Ergebnis.',
    ],
    faq: [
      {
        q: 'Komponente oder vollständige URL?',
        a: 'Verwenden Sie „Komponente“ für einen einzelnen Wert wie einen Query-Parameter; dabei werden Zeichen wie / ? & = kodiert. Mit „Vollständige URL“ bleibt die URL-Struktur erhalten.',
      },
    ],
    limits: [
      'Das Dekodieren schlägt bei fehlerhaften Prozentfolgen wie einem einzelnen % fehl.',
    ],
  },
  'html-encoder-decoder': {
    name: 'HTML-Kodierer / -Dekodierer',
    description: 'Maskieren Sie Sonderzeichen als HTML-Entitäten oder wandeln Sie Entitäten zurück in Text.',
    metaDescription: 'Kostenloser Online-HTML-Kodierer und -Dekodierer. <, >, & und Anführungszeichen als HTML-Entitäten maskieren oder benannte und numerische Entitäten dekodieren.',
    steps: [
      'Wählen Sie „Kodieren“ oder „Dekodieren“.',
      'Fügen Sie Ihren Text ein.',
      'Kopieren Sie das Ergebnis.',
    ],
    faq: [
      {
        q: 'Macht das Kodieren Benutzereingaben sicher für HTML?',
        a: 'Das Maskieren der fünf Sonderzeichen macht Text innerhalb von HTML-Elementinhalten und in Anführungszeichen stehenden Attributen sicher. In anderen Zusammenhängen ersetzt es keine geeignete Template-Bibliothek und keinen Sanitizer.',
      },
    ],
    limits: [
      'Das Dekodieren unterstützt die gängigen benannten Entitäten sowie alle numerischen Entitäten.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Base64-Kodierer / -Dekodierer',
    description: 'Kodieren Sie Text in Base64 oder dekodieren Sie Base64 zurück in Text – mit vollständiger UTF-8-Unterstützung.',
    metaDescription: 'Kostenloser Online-Base64-Kodierer und -Dekodierer. Text in Base64 und zurück umwandeln, mit UTF-8-Unterstützung und optionalem URL-sicherem Alphabet.',
    steps: [
      'Wählen Sie „Kodieren“ oder „Dekodieren“.',
      'Fügen Sie Ihren Text ein.',
      'Kopieren Sie das Ergebnis.',
    ],
    faq: [
      {
        q: 'Ist Base64 eine Verschlüsselung?',
        a: 'Nein. Base64 ist eine Kodierung, keine Verschlüsselung. Jeder kann es dekodieren, nutzen Sie es daher nie zum Schutz von Geheimnissen.',
      },
      {
        q: 'Was ist URL-sicheres Base64?',
        a: 'Dabei werden + und / durch - und _ ersetzt und das Auffüllzeichen = entfällt, sodass der Wert sicher in URLs und Dateinamen stehen kann.',
      },
    ],
    limits: [
      'Für Bilddaten nutzen Sie „Bild in Base64“ und „Base64 in Bild“.',
    ],
  },
  'regex-tester': {
    name: 'Regex-Tester',
    description: 'Testen Sie reguläre JavaScript-Ausdrücke mit Live-Hervorhebung der Treffer und Erfassungsgruppen.',
    metaDescription: 'Kostenloser Online-Regex-Tester für JavaScript. Live-Treffer, Erfassungsgruppen und benannte Gruppen sehen und Ersetzungen in der Vorschau prüfen.',
    steps: [
      'Geben Sie ein Muster ein und wählen Sie Flags.',
      'Fügen Sie den zu testenden Text ein.',
      'Prüfen Sie Treffer, Gruppen und die Ersetzungsvorschau.',
    ],
    faq: [
      {
        q: 'Welche Regex-Variante wird verwendet?',
        a: 'Reguläre Ausdrücke in JavaScript (ECMAScript), wie Ihr Browser sie umsetzt. PCRE, Python und andere Varianten unterscheiden sich bei einigen Funktionen.',
      },
      {
        q: 'Warum friert meine Seite bei manchen Mustern ein?',
        a: 'Muster mit verschachtelten Wiederholungen können katastrophal viel Backtracking auslösen. Der Abgleich läuft in einem Hintergrund-Worker und wird nach 1,5 Sekunden gestoppt, sodass ein ausuferndes Muster die Seite nicht einfrieren kann; Muster wie (a+)+ sollten Sie dennoch vermeiden.',
      },
    ],
    limits: [
      'Nur JavaScript-Regex-Syntax.',
      'Der Abgleich stoppt nach 5.000 Treffern oder 1,5 Sekunden.',
    ],
  },
  'markdown-previewer': {
    name: 'Markdown-Vorschau',
    description: 'Schreiben Sie Markdown und sehen Sie daneben eine sichere, bereinigte Live-Vorschau.',
    metaDescription: 'Kostenlose Online-Markdown-Vorschau. GitHub-Markdown schreiben, eine bereinigte HTML-Live-Vorschau sehen und das HTML kopieren.',
    steps: [
      'Schreiben oder fügen Sie links Markdown ein.',
      'Sehen Sie rechts das dargestellte Ergebnis.',
      'Kopieren Sie das Markdown oder das erzeugte HTML.',
    ],
    faq: [
      {
        q: 'Ist die Vorschau sicher?',
        a: 'Ja. Das erzeugte HTML wird vor der Anzeige mit DOMPurify bereinigt, sodass Skripte und Event-Handler entfernt werden.',
      },
    ],
    limits: [
      'GitHub-Markdown über die Bibliothek marked; keine Erweiterungen für Formeln oder Diagramme.',
    ],
  },
  'password-generator': {
    name: 'Passwort-Generator',
    description: 'Erstellen Sie starke Passwörter: völlig zufällig oder einprägsam auf Basis von Namen und Wörtern.',
    metaDescription: 'Kostenloser Passwort-Generator: völlig zufällige Passwörter oder namensbasierte wie Nvidia132@Star mit zufälligen Zahlen, Großbuchstaben und Symbolen. Läuft in Ihrem Browser.',
    steps: [
      'Wählen Sie einen Stil: „Name + Wort“ für etwas Einprägsames oder „Völlig zufällig“ für maximale Sicherheit.',
      'Legen Sie die Länge, die Anzahl der Passwörter und die enthaltenen Zeichenarten fest.',
      'Kopieren Sie ein Passwort und bewahren Sie es in einem Passwortmanager auf.',
    ],
    faq: [
      {
        q: 'Werden erzeugte Passwörter gespeichert oder irgendwohin gesendet?',
        a: 'Nein. Passwörter werden in Ihrem Browser mit crypto.getRandomValues erzeugt und weder übertragen noch gespeichert.',
      },
      {
        q: 'Ist ein Passwort wie Tesla2026#Tech sicher?',
        a: 'Es ist besser als ein einfaches Wort, aber schwächer als zufälliger Text. Wer es errät, kann von Listen bekannter Namen ausgehen; die tatsächliche Stärke ergibt sich daher aus der Zahl der Möglichkeiten, angegeben in Bit. Verwenden Sie namensbasierte Passwörter für Konten mit geringem Risiko und völlig zufällige für E-Mail, Online-Banking und Passwortmanager.',
      },
      {
        q: 'Warum nur wenige Symbole?',
        a: 'Erzeugte Passwörter verwenden nur die vier Symbole @ # $ *, weil sie von fast jeder Website akzeptiert werden und sich auf jeder Tastatur leicht tippen lassen.',
      },
      {
        q: 'Wie lang sollte ein Passwort sein?',
        a: 'Für wichtige Konten mindestens 16 Zeichen. Die Länge zählt mehr als die Komplexität.',
      },
    ],
    limits: [
      'Namensbasierte Passwörter lassen sich leichter merken, sind aber schwächer als völlig zufällige. Die angezeigte Stärke geht von einem Angreifer aus, der weiß, wie sie aufgebaut sind.',
      'Die Wortdatenbank ist eine kuratierte Liste von Namen in lateinischer Schrift; sie ist keine Liste der am häufigsten verwendeten Passwörter.',
      'Die Stärkeschätzung beruht auf den möglichen Kombinationen, nicht auf Datenbanken mit Datenlecks.',
    ],
  },
  'uuid-generator': {
    name: 'UUID-Generator',
    description: 'Erzeugen Sie zufällige UUIDs der Version 4 in großer Zahl mit Formatoptionen.',
    metaDescription: 'Kostenloser Online-UUID-Generator. Zufällige v4-UUIDs in großer Zahl erstellen, in Großbuchstaben, ohne Bindestriche oder mit geschweiften Klammern, mit kryptografischer Zufälligkeit.',
    steps: [
      'Wählen Sie die Anzahl der UUIDs und das Format.',
      'Erzeugen.',
      'Kopieren Sie die Liste.',
    ],
    faq: [
      {
        q: 'Können zwei UUIDs kollidieren?',
        a: 'UUIDs der Version 4 haben 122 zufällige Bits, daher ist die Wahrscheinlichkeit einer Kollision in der Praxis vernachlässigbar.',
      },
    ],
    limits: [
      'Es werden nur UUIDs der Version 4 (zufällig) erzeugt.',
    ],
  },
  'timestamp-converter': {
    name: 'Zeitstempel-Konverter',
    description: 'Wandeln Sie Unix-Zeitstempel in lesbare Datumsangaben und zurück um, in jeder Zeitzone.',
    metaDescription: 'Kostenloser Online-Konverter für Unix-Zeitstempel. Epoch-Sekunden oder -Millisekunden in Datumsangaben in UTC und Ortszeit umwandeln und Datumsangaben zurück in Zeitstempel.',
    steps: [
      'Geben Sie einen Unix-Zeitstempel ein oder wählen Sie ein Datum.',
      'Lesen Sie das Ergebnis in UTC, Ihrer lokalen Zeitzone und ISO 8601 ab.',
      'Kopieren Sie einen beliebigen Wert.',
    ],
    faq: [
      {
        q: 'Sekunden oder Millisekunden?',
        a: 'Zeitstempel mit 13 oder mehr Ziffern werden als Millisekunden behandelt, kürzere als Sekunden. Sie können dies manuell überschreiben.',
      },
    ],
    limits: [
      'Der unterstützte Bereich ist der Bereich von JavaScript-Datumsangaben: etwa die Jahre -271821 bis 275760.',
    ],
  },
  'color-converter': {
    name: 'Farbkonverter',
    description: 'Wandeln Sie Farben zwischen HEX, RGB, HSL und HSV um – mit Live-Vorschau und Kontrastprüfung.',
    metaDescription: 'Kostenloser Online-Farbkonverter. HEX-, RGB-, HSL- und HSV-Werte umwandeln, die Farbe in der Vorschau ansehen und WCAG-Kontrastverhältnisse prüfen.',
    steps: [
      'Geben Sie eine Farbe in einem beliebigen Format ein oder nutzen Sie die Farbauswahl.',
      'Sehen Sie, wie sich alle Formate aktualisieren.',
      'Kopieren Sie den benötigten Wert.',
    ],
    faq: [
      {
        q: 'Was zeigt die Kontrastprüfung?',
        a: 'Sie zeigt das WCAG-Kontrastverhältnis der Farbe zu weißem und zu schwarzem Text, was bei der Wahl gut lesbarer Kombinationen hilft.',
      },
    ],
    limits: [
      'Nur sRGB; CSS-Color-4-Farbräume wie LAB, LCH und Display-P3 werden nicht unterstützt.',
      'Transparenzwerte (Alpha) werden akzeptiert, aber ignoriert.',
    ],
  },
  'qr-code-generator': {
    name: 'QR-Code-Generator',
    description: 'Erstellen Sie QR-Codes für Links, Text, WLAN, E-Mail oder Telefonnummern als PNG oder SVG.',
    metaDescription: 'Kostenloser QR-Code-Generator. QR-Codes für URLs, Text, WLAN, E-Mail und Telefonnummern erstellen und als PNG oder SVG herunterladen. In Ihrem Browser erstellt.',
    steps: [
      'Wählen Sie, was der Code enthalten soll, und tragen Sie die Details ein.',
      'Passen Sie auf Wunsch Größe, Farben und Fehlerkorrektur an.',
      'Laden Sie das PNG oder SVG herunter und testen Sie es vor dem Drucken mit Ihrem Smartphone.',
    ],
    faq: [
      {
        q: 'Laufen die Codes ab?',
        a: 'Nein. Es sind statische Codes: Die Daten stehen im Code selbst, daher funktionieren sie für immer und nichts wird verfolgt.',
      },
      {
        q: 'Welche Fehlerkorrekturstufe sollte ich wählen?',
        a: 'Mittel eignet sich für die meisten Zwecke. Wählen Sie „Quartil“ oder „Hoch“, wenn der Code verschmutzen oder beschädigt werden könnte; höhere Stufen machen den Code jedoch dichter und bei kleiner Größe schwerer scannbar.',
      },
      {
        q: 'Darf ich die Codes kommerziell nutzen?',
        a: 'Ja. Der QR-Code-Standard ist offen, und hier erstellte Codes enthalten keine Gebühren, Wasserzeichen oder Tracking von uns.',
      },
      {
        q: 'Werden meine Daten irgendwohin gesendet?',
        a: 'Nein. Der Code wird in Ihrem Browser erzeugt, und eingegebene WLAN-Passwörter bleiben auf Ihrem Gerät.',
      },
    ],
    limits: [
      'Nur statische Codes: kein Scan-Tracking und keine bearbeitbaren Codes.',
      'Sehr langer Text ergibt einen dichten, schwer scannbaren Code, halten Sie ihn daher kurz.',
      'Dunkle Farben auf hellem Grund mit starkem Kontrast lassen sich am besten scannen.',
    ],
  },
};
export default tools;
