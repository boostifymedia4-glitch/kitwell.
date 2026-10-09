import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'Da JPG a PNG',
    description: 'Converti foto JPG e JPEG in immagini PNG senza perdita con un clic.',
    metaDescription: 'Converti JPG in PNG online gratis. Converti più foto JPEG in PNG direttamente nel browser, senza caricamento e senza registrazione.',
    steps: [
      'Trascina uno o più file JPG sullo strumento oppure sceglili dal tuo dispositivo.',
      'Controlla le anteprime, poi premi Converti.',
      'Scarica ogni PNG oppure scarica tutto come ZIP.',
    ],
    faq: [
      { q: 'Convertire da JPG a PNG migliora la qualità?', a: 'No. Il JPG è con perdita, quindi i dettagli scartati al momento del salvataggio non si possono recuperare. Il PNG si limita a memorizzare i pixel attuali senza ulteriori perdite, il che è utile per la modifica o per lavorare con la trasparenza.' },
      { q: 'Perché il PNG è più grande del JPG?', a: 'Il PNG è senza perdita e di solito memorizza le fotografie in modo meno efficiente del JPG. Usa JPG o WebP quando le dimensioni del file contano più dei pixel esatti.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
    ],
  },
  'png-to-jpg': {
    name: 'Da PNG a JPG',
    description: 'Trasforma le immagini PNG in file JPG più leggeri con qualità regolabile.',
    metaDescription: 'Converti PNG in JPG online gratis. Scegli la qualità e il colore di sfondo per le immagini trasparenti. Elaborazione nel browser.',
    steps: [
      'Aggiungi i tuoi file PNG.',
      'Imposta la qualità del JPG e il colore di sfondo con cui riempire le eventuali aree trasparenti.',
      'Premi Converti e scarica i risultati.',
    ],
    faq: [
      { q: 'Cosa succede alle aree trasparenti?', a: 'Il JPG non supporta la trasparenza, quindi i pixel trasparenti vengono riempiti con il colore di sfondo che scegli (bianco per impostazione predefinita).' },
      { q: 'Quale impostazione di qualità devo usare?', a: 'Un valore tra 80 e 90 è un buon compromesso per la maggior parte delle immagini. Sotto circa 60 gli artefatti di compressione diventano visibili su testo e bordi netti.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'La trasparenza viene appiattita su un colore pieno perché il JPG non può memorizzarla.',
    ],
  },
  'jpg-to-webp': {
    name: 'Da JPG a WebP',
    description: 'Converti le foto JPG nel moderno WebP per file più leggeri e pagine più veloci.',
    metaDescription: 'Converti JPG in WebP online gratis. Riduci le foto per il web con qualità regolabile, elaborate in locale nel tuo browser.',
    steps: [
      'Aggiungi i tuoi file JPG.',
      'Scegli la qualità WebP (80 è un valore predefinito sensato).',
      'Converti e scarica.',
    ],
    faq: [
      { q: 'Il WebP è più leggero del JPG?', a: 'In genere dal 20 al 35% più leggero a parità di qualità visiva, anche se il risultato dipende dall’immagine.' },
      { q: 'Tutti i browser supportano il WebP?', a: 'Tutti i principali browser attuali sono in grado di visualizzare il WebP. La codifica WebP nel browser è supportata in Chrome, Edge, Firefox e nelle versioni recenti di Safari; se il tuo non la supporta, lo strumento te lo segnala invece di produrre un file errato.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'Il tuo browser deve supportare la codifica WebP; i browser non compatibili mostrano un errore.',
    ],
  },
  'png-to-webp': {
    name: 'Da PNG a WebP',
    description: 'Converti le immagini PNG in WebP mantenendo la trasparenza con una frazione delle dimensioni.',
    metaDescription: 'Converti PNG in WebP online gratis. Mantiene la trasparenza, riduce le dimensioni del file e funziona interamente nel tuo browser.',
    steps: [
      'Aggiungi i tuoi file PNG.',
      'Scegli la qualità WebP.',
      'Converti e scarica.',
    ],
    faq: [
      { q: 'La trasparenza viene mantenuta?', a: 'Sì. Il WebP supporta il canale alfa, quindi i PNG trasparenti restano trasparenti.' },
      { q: 'Posso ottenere un risultato senza perdita?', a: 'Imposta la qualità su 100 per la massima fedeltà. I browser codificano il WebP con perdita, quindi usa il PNG se ti serve una copia matematicamente esatta.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'Il tuo browser deve supportare la codifica WebP; i browser non compatibili mostrano un errore.',
    ],
  },
  'webp-to-jpg': {
    name: 'Da WebP a JPG',
    description: 'Converti le immagini WebP in file JPG compatibili con quasi tutto.',
    metaDescription: 'Converti WebP in JPG online gratis. Rendi le immagini WebP utilizzabili ovunque, convertite in locale nel tuo browser.',
    steps: [
      'Aggiungi i tuoi file WebP.',
      'Imposta la qualità e il colore di sfondo per le aree trasparenti.',
      'Converti e scarica.',
    ],
    faq: [
      { q: 'Perché convertire da WebP a JPG?', a: 'Alcuni software meno recenti, client di posta e moduli di caricamento rifiutano ancora il WebP. Il JPG è accettato quasi ovunque.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'La trasparenza viene appiattita su un colore pieno perché il JPG non può memorizzarla.',
    ],
  },
  'webp-to-png': {
    name: 'Da WebP a PNG',
    description: 'Converti le immagini WebP in PNG senza perdita mantenendo la trasparenza.',
    metaDescription: 'Converti WebP in PNG online gratis. Mantiene la trasparenza e funziona interamente nel tuo browser, senza caricamento.',
    steps: [
      'Aggiungi i tuoi file WebP.',
      'Premi Converti.',
      'Scarica i file PNG.',
    ],
    faq: [
      { q: 'La trasparenza viene mantenuta?', a: 'Sì. Il PNG supporta la trasparenza, quindi l’alfa del WebP viene riportato nel nuovo file.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
    ],
  },
  'image-compressor': {
    name: 'Comprimi immagini',
    description: 'Riduci le dimensioni delle immagini con qualità regolabile e vedi il risparmio esatto.',
    metaDescription: 'Comprimi immagini JPG, PNG e WebP online gratis. Regola la qualità, limita facoltativamente le dimensioni e confronta il peso dei file. Nel browser.',
    steps: [
      'Aggiungi le tue immagini.',
      'Scegli un formato di output e la qualità, e se vuoi una larghezza o altezza massima.',
      'Comprimi, confronta le dimensioni prima e dopo, poi scarica.',
    ],
    faq: [
      { q: 'Come fa il compressore a ridurre le dimensioni?', a: 'Ricodifica l’immagine con la qualità che scegli e può anche ridimensionarla. L’output PNG è senza perdita, quindi si riduce solo se diminuisci anche le dimensioni in pixel.' },
      { q: 'E se il risultato è più grande dell’originale?', a: 'Può succedere con file già ottimizzati. Lo strumento lo segnala, così puoi tenere l’originale.' },
      { q: 'I dati EXIF o di posizione vengono conservati?', a: 'No. La ricodifica tramite canvas elimina i metadati EXIF, come il modello della fotocamera e la posizione GPS, che spesso è proprio ciò che serve prima di condividere una foto. Anche i profili colore non vengono conservati.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'I risultati migliori si ottengono con output JPG o WebP; l’output PNG è senza perdita e potrebbe non ridursi.',
    ],
  },
  'image-resizer': {
    name: 'Ridimensiona immagini',
    description: 'Ridimensiona le immagini in pixel esatti o in percentuale mantenendo le proporzioni.',
    metaDescription: 'Ridimensiona immagini online gratis. Imposta larghezza e altezza esatte o una percentuale, mantieni le proporzioni e scarica JPG, PNG o WebP.',
    steps: [
      'Aggiungi una o più immagini.',
      'Scegli pixel o percentuale e inserisci la nuova dimensione. Lascia attivo il blocco delle proporzioni per evitare distorsioni.',
      'Ridimensiona e scarica.',
    ],
    faq: [
      { q: 'Posso ingrandire un’immagine?', a: 'Sì, ma l’ingrandimento non può aggiungere dettaglio, quindi il risultato apparirà più sfocato. La riduzione offre la qualità migliore.' },
      { q: 'Qual è la dimensione massima dell’output?', a: 'I browser limitano le dimensioni del canvas. Questo strumento limita l’output a 16.000 px per lato e a circa 100 megapixel.' },
      { q: 'I dati EXIF o di posizione vengono conservati?', a: 'No. La ricodifica tramite canvas elimina i metadati EXIF, come il modello della fotocamera e la posizione GPS, che spesso è proprio ciò che serve prima di condividere una foto. Anche i profili colore non vengono conservati.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'L’output è limitato a 16.000 px per lato.',
    ],
  },
  'image-cropper': {
    name: 'Ritaglia immagine',
    description: 'Ritaglia un’immagine su un’area esatta o con proporzioni fisse, con anteprima in tempo reale.',
    metaDescription: 'Ritaglia immagini online gratis. Scegli proporzioni fisse o imposta valori in pixel esatti con anteprima in tempo reale. Elaborazione nel browser.',
    steps: [
      'Aggiungi un’immagine.',
      'Scegli le proporzioni o trascina il riquadro di ritaglio, poi regola con precisione posizione e dimensioni con i campi numerici.',
      'Premi Ritaglia e scarica.',
    ],
    faq: [
      { q: 'Ritagliare riduce la qualità?', a: 'Il ritaglio mantiene i pixel originali. La qualità cambia solo se salvi in JPG o WebP con un’impostazione di qualità più bassa.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Una sola immagine alla volta.',
      'Massimo 25 MB per file.',
      'Le immagini animate usano il primo fotogramma.',
    ],
  },
  'image-rotator': {
    name: 'Ruota immagine',
    description: 'Ruota le immagini di 90°, 180°, 270° o di qualsiasi angolo personalizzato.',
    metaDescription: 'Ruota immagini online gratis. Ruota le foto di 90, 180 o 270 gradi, oppure di un angolo personalizzato, direttamente nel browser.',
    steps: [
      'Aggiungi le tue immagini.',
      'Scegli una rotazione oppure digita un angolo personalizzato.',
      'Applica e scarica.',
    ],
    faq: [
      { q: 'Cosa succede con le rotazioni diverse dagli angoli retti?', a: 'Il canvas si allarga per contenere l’immagine ruotata. Per l’output JPG gli angoli vuoti vengono riempiti con lo sfondo scelto; PNG e WebP li mantengono trasparenti.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
    ],
  },
  'image-flipper': {
    name: 'Capovolgi immagine',
    description: 'Specchia le immagini in orizzontale o in verticale.',
    metaDescription: 'Capovolgi immagini in orizzontale o in verticale online gratis. Specchia le foto nel browser, senza caricamento.',
    steps: [
      'Aggiungi le tue immagini.',
      'Scegli orizzontale, verticale oppure entrambi.',
      'Applica e scarica.',
    ],
    faq: [
      { q: 'Qual è la differenza tra capovolgimento orizzontale e verticale?', a: 'Il capovolgimento orizzontale specchia sinistra e destra, come uno specchio. Il capovolgimento verticale rovescia l’immagine sottosopra lungo il suo asse orizzontale.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
    ],
  },
  'image-format-converter': {
    name: 'Convertitore di formato immagine',
    description: 'Converti tra JPG, PNG e WebP con un unico strumento flessibile.',
    metaDescription: 'Converti immagini tra JPG, PNG e WebP online gratis. Scegli il formato di output e la qualità, con elaborazione locale nel browser.',
    steps: [
      'Aggiungi immagini in qualsiasi formato supportato.',
      'Scegli il formato di output e la qualità.',
      'Converti e scarica.',
    ],
    faq: [
      { q: 'Quali formati posso usare?', a: 'Input: JPG, PNG, WebP, GIF, BMP e AVIF se il tuo browser è in grado di decodificarli. Output: JPG, PNG e WebP.' },
      { q: 'E per HEIC o TIFF?', a: 'I browser non possono decodificare HEIC o TIFF in modo nativo, quindi per ora non sono supportati.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'I file HEIC/HEIF, TIFF e RAW non sono supportati.',
    ],
  },
  'image-to-base64': {
    name: 'Da immagine a Base64',
    description: 'Codifica un’immagine come data URI Base64 per CSS, HTML o JSON.',
    metaDescription: 'Converti un’immagine in una stringa Base64 o in un data URI online gratis. Copia snippet HTML e CSS già pronti. Funziona nel browser.',
    steps: [
      'Aggiungi un’immagine.',
      'Scegli lo stile di output: data URI, Base64 puro, <img> HTML o CSS.',
      'Copia il risultato.',
    ],
    faq: [
      { q: 'Quando conviene usare immagini Base64?', a: 'Per piccole icone in CSS o nelle e-mail, dove una richiesta aggiuntiva costa più dell’aumento di dimensioni di circa il 33%. Evitale per le foto grandi.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Massimo 5 MB per immagine, perché il testo Base64 diventa molto grande.',
      'Una sola immagine alla volta.',
    ],
  },
  'base64-to-image': {
    name: 'Da Base64 a immagine',
    description: 'Decodifica una stringa Base64 o un data URI in un’immagine scaricabile.',
    metaDescription: 'Converti una stringa Base64 o un data URI in un’immagine online gratis. Visualizza l’anteprima e scarica il PNG, JPG, WebP o GIF decodificato.',
    steps: [
      'Incolla una stringa Base64 o un data URI completo.',
      'L’immagine viene decodificata e mostrata subito in anteprima.',
      'Scarica l’immagine.',
    ],
    faq: [
      { q: 'Mi serve il prefisso «data:image/png;base64,»?', a: 'No. Senza prefisso lo strumento riconosce il formato dalla firma del file (PNG, JPG, GIF, WebP).' },
      { q: 'Perché ricevo un errore?', a: 'Probabilmente la stringa è troncata, contiene caratteri in più oppure non è un’immagine. Anche i dati SVG vengono rifiutati qui per sicurezza.' },
    ],
    limits: [
      'Supporta PNG, JPG, GIF e WebP. L’SVG non viene visualizzato intenzionalmente.',
      'Massimo 10 MB di dati decodificati.',
    ],
  },
  'image-color-picker': {
    name: 'Selettore colori da immagine',
    description: 'Preleva colori esatti da qualsiasi immagine ed estraine la tavolozza dominante.',
    metaDescription: 'Preleva i colori da un’immagine online gratis. Fai clic su un pixel per ottenere i valori HEX, RGB e HSL ed estrai una tavolozza dei colori dominanti.',
    steps: [
      'Aggiungi un’immagine.',
      'Fai clic o tocca un punto qualsiasi (oppure usa i tasti freccia) per campionare un pixel.',
      'Copia il valore HEX, RGB o HSL, oppure copia dalla tavolozza estratta.',
    ],
    faq: [
      { q: 'Come viene calcolata la tavolozza?', a: 'L’immagine viene ridotta di risoluzione e i suoi colori vengono raggruppati in intervalli; vengono mostrati quelli più frequenti. È un’approssimazione dei colori dominanti, non un elenco completo.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Una sola immagine alla volta.',
      'I colori vengono campionati dai pixel sRGB visualizzati; i profili colore vengono ignorati.',
    ],
  },
  'image-watermark': {
    name: 'Filigrana per immagini',
    description: 'Aggiungi una filigrana di testo o con logo a molte immagini insieme, singola o a mosaico.',
    metaDescription: 'Aggiungi una filigrana alle immagini online gratis. Applica testo o logo a foto JPG, PNG e WebP in blocco, con opacità e posizione. Nel browser.',
    steps: [
      'Aggiungi le tue immagini.',
      'Scegli testo o logo, poi imposta dimensione, opacità, posizione e disposizione.',
      'Applicala e scarica i risultati oppure uno ZIP.',
    ],
    faq: [
      { q: 'Posso usare l’urdu o altri alfabeti?', a: 'Sì. Le filigrane delle immagini usano i font del tuo dispositivo, quindi funziona qualsiasi scrittura che il tuo sistema sia in grado di mostrare.' },
      { q: 'Modifica i miei originali?', a: 'No. Le copie con filigrana vengono salvate come nuovi file.' },
      { q: 'I dati EXIF o di posizione vengono conservati?', a: 'No. La ricodifica tramite canvas elimina i metadati EXIF, come il modello della fotocamera e la posizione GPS, che spesso è proprio ciò che serve prima di condividere una foto. Anche i profili colore non vengono conservati.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'File del logo: PNG, JPG o WebP, fino a 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'Da SVG a PNG / JPG',
    description: 'Trasforma la grafica vettoriale SVG in immagini PNG, JPG o WebP di qualsiasi dimensione.',
    metaDescription: 'Converti SVG in PNG o JPG online gratis. Scegli una scala o una larghezza esatta per risultati nitidi; il PNG mantiene la trasparenza. Nel browser.',
    steps: [
      'Aggiungi i tuoi file SVG.',
      'Scegli PNG, JPG o WebP e la dimensione di output.',
      'Converti e scarica.',
    ],
    faq: [
      { q: 'L’immagine resterà nitida anche a dimensioni grandi?', a: 'Sì. L’SVG viene disegnato alla dimensione che scegli, quindi un’esportazione 4× è nitida quanto una 1×.' },
      { q: 'Perché il mio SVG appare diverso?', a: 'I browser non supportano tutte le funzioni SVG e gli SVG che si affidano a font o immagini esterni ricadono sui valori predefiniti. Incorpora font e immagini nell’SVG per ottenere il risultato migliore.' },
      { q: 'È sicuro aprire file SVG qui?', a: 'Sì. L’SVG viene disegnato come immagine, quindi gli script al suo interno non vengono eseguiti.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Massimo 25 MB per file e 20 file per volta.',
      'Font, immagini e stili collegati dall’esterno dell’SVG non vengono caricati.',
      'Un SVG senza dimensioni usa il suo viewBox, oppure 300 × 150 px se non è impostato nessuno dei due.',
    ],
  },
  'enlarge-image': {
    name: 'Ingrandisci immagine',
    description: 'Ingrandisci le immagini con un ricampionamento morbido e nitido, da 2× a 4× o fino a una larghezza stabilita.',
    metaDescription: 'Ingrandisci immagini online gratis. Scala JPG, PNG e WebP di 2×, 3×, 4× o a una larghezza esatta con ricampionamento Lanczos e nitidezza opzionale.',
    steps: [
      'Aggiungi le tue immagini.',
      'Scegli un fattore o una larghezza di destinazione e se applicare la nitidezza.',
      'Ingrandisci e scarica.',
    ],
    faq: [
      { q: 'Si tratta di upscaling con IA?', a: 'No. Usa un ricampionamento di alta qualità, che rende le immagini ingrandite morbide e pulite ma non può inventare i dettagli mancanti. Le foto molto piccole o sfocate resteranno comunque poco nitide.' },
      { q: 'Quanto può essere grande il risultato?', a: 'Fino a 16.000 px per lato e circa 100 megapixel, a seconda di ciò che il tuo browser riesce a gestire.' },
      { q: 'I dati EXIF o di posizione vengono conservati?', a: 'No. La ricodifica tramite canvas elimina i metadati EXIF, come il modello della fotocamera e la posizione GPS, che spesso è proprio ciò che serve prima di condividere una foto. Anche i profili colore non vengono conservati.' },
    ],
    limits: [
      'Le GIF o WebP animate vengono convertite usando solo il primo fotogramma.',
      'Massimo 25 MB per file e 20 file per volta, per mantenere reattivo il browser.',
      'I metadati EXIF e i profili colore incorporati non vengono conservati.',
      'Non aggiunge dettagli, quindi non è upscaling con IA.',
      'L’output è limitato a 16.000 px per lato.',
    ],
  },
  'blur-image-area': {
    name: 'Sfoca o pixelizza area',
    description: 'Nascondi volti, targhe o dettagli privati sfocando, pixelizzando o coprendo alcune aree.',
    metaDescription: 'Sfoca o pixelizza una parte di un’immagine online gratis. Disegna riquadri su volti, targhe o testo e nascondili, direttamente nel browser.',
    steps: [
      'Aggiungi un’immagine.',
      'Trascina sull’immagine per disegnare dei riquadri sopra ciò che vuoi nascondere.',
      'Scegli sfocatura, pixelizzazione o riquadro nero, applica e scarica.',
    ],
    faq: [
      { q: 'La sfocatura è sicura per i dettagli sensibili?', a: 'Per tutto ciò che deve restare privato, come numeri di documento o targhe, usa il riquadro nero. La sfocatura e la pixelizzazione a volte possono essere in parte annullate.' },
      { q: 'Trova i volti automaticamente?', a: 'No. I riquadri li disegni tu. Il rilevamento automatico richiede un grande modello di IA che non è incluso.' },
      { q: 'Posso cambiare idea?', a: 'Sì. Rimuovi o ridisegna i riquadri prima di applicare. Il tuo file originale non viene mai modificato.' },
      { q: 'I dati EXIF o di posizione vengono conservati?', a: 'No. La ricodifica tramite canvas elimina i metadati EXIF, come il modello della fotocamera e la posizione GPS, che spesso è proprio ciò che serve prima di condividere una foto. Anche i profili colore non vengono conservati.' },
    ],
    limits: [
      'Una sola immagine alla volta, fino a 25 MB.',
      'Le aree si scelgono a mano; non c’è il rilevamento dei volti.',
      'Le immagini animate usano il primo fotogramma.',
    ],
  },
  'qr-code-scanner': {
    name: 'Scanner di codici QR',
    description: 'Leggi i codici QR da foto e schermate e vedi esattamente cosa contengono.',
    metaDescription: 'Scansiona un codice QR da un’immagine online gratis. Carica una foto o una schermata per leggerne il link, il testo o i dati Wi-Fi. Nel browser.',
    steps: [
      'Aggiungi una o più immagini che contengono un codice QR.',
      'Il codice viene letto automaticamente.',
      'Copia il risultato oppure apri un link dopo averlo controllato.',
    ],
    faq: [
      { q: 'Può scansionare con la fotocamera?', a: 'Non ancora. Questo strumento legge i codici QR da file immagine. Su un telefono, scatta una foto del codice e sceglila qui, oppure usa l’app della fotocamera.' },
      { q: 'È sicuro aprire i link scansionati?', a: 'Controlla prima l’indirizzo. Viene mostrato il link completo e da qui si possono aprire solo link web (http o https). I link di script e di dati non vengono mai aperti.' },
      { q: 'Perché non è stato trovato nessun codice?', a: 'Il codice potrebbe essere sfocato, tagliato, troppo piccolo o poco contrastato. Prova con un’immagine più nitida e ravvicinata che mostri tutto il codice con un margine libero intorno.' },
      { q: 'Le mie immagini vengono caricate?', a: 'No. L’immagine viene letta nel tuo browser e questo strumento non la invia da nessuna parte.' },
    ],
    limits: [
      'Fino a 10 immagini, 25 MB ciascuna.',
      'Viene letto un solo codice per immagine.',
      'Solo codici QR standard; gli altri codici a barre non sono supportati.',
    ],
  },
  'gif-maker': {
    name: 'Creatore di GIF',
    description: 'Trasforma le tue immagini in una GIF animata con tempi, dimensioni e ripetizione personalizzati.',
    metaDescription: 'Crea una GIF animata dalle immagini online gratis. Riordina i fotogrammi, imposta il ritardo, scegli dimensioni e ripetizione e scarica la GIF. Nel browser.',
    steps: [
      'Aggiungi due o più immagini (o una sola per una GIF fissa).',
      'Trascinale nell’ordine voluto, imposta per quanto tempo si vede ogni fotogramma e scegli dimensioni, ripetizione e colori.',
      'Crea la GIF, guarda l’anteprima e scarica.',
    ],
    faq: [
      { q: 'Perché la mia GIF è così pesante?', a: 'Le GIF memorizzano ogni fotogramma come immagine limitata a 256 colori. Meno fotogrammi, una larghezza minore e meno colori riducono tutti il file. Lo strumento mostra le dimensioni non appena la GIF è creata.' },
      { q: 'Posso mantenere le aree trasparenti?', a: 'Sì, attiva «Mantieni le aree trasparenti» per immagini PNG o WebP con trasparenza. La trasparenza della GIF è attiva o disattivata per ogni pixel, quindi i bordi sfumati diventano netti.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Fino a 100 fotogrammi; più i fotogrammi sono grandi, più memoria serve al browser.',
      'Le GIF sono limitate a 256 colori per fotogramma, quindi le foto possono apparire granulose.',
      'Gli input animati (GIF, WebP) contribuiscono solo con il primo fotogramma.',
    ],
  },
  'photo-editor': {
    name: 'Editor di foto',
    description: 'Regola, filtra, ruota, ritaglia e aggiungi testo a una foto, con anteprima in tempo reale.',
    metaDescription: 'Editor di foto online gratuito. Regola i colori, applica filtri, ruota, raddrizza, ritaglia e aggiungi testo, poi scarica PNG, JPG o WebP. Privato, nel browser.',
    steps: [
      'Aggiungi una foto.',
      'Usa le schede per regolare i colori, applicare un filtro, ruotare o ritagliare e aggiungere testo. L’anteprima si aggiorna mentre lavori.',
      'Scegli il formato e scarica la foto modificata.',
    ],
    faq: [
      { q: 'Il file originale viene modificato?', a: 'No. Il tuo file non viene mai modificato; l’immagine modificata viene creata come nuovo download.' },
      { q: 'L’esportazione fa perdere qualità?', a: 'Il PNG mantiene ogni pixel. JPG e WebP sono con perdita; usa una qualità di 90 o superiore per mantenere le foto identiche. Le modifiche vengono applicate alla dimensione intera dell’immagine, non a quella dell’anteprima.' },
      { q: 'Le mie immagini vengono caricate su un server?', a: 'No. L’immagine viene decodificata e ricodificata dal tuo browser tramite l’API Canvas. Questo strumento non invia il file da nessuna parte.' },
    ],
    limits: [
      'Una sola foto alla volta, fino a 25 MB e circa 50 megapixel.',
      'Le modifiche vengono applicate in un ordine fisso: rotazione e ritaglio, regolazioni del colore, sfocatura e nitidezza, vignettatura, poi testo.',
      'I dettagli EXIF, come la posizione, non vengono copiati nell’immagine modificata.',
      'Niente livelli, pennelli o funzioni di IA.',
    ],
  },
  'jpg-to-pdf': {
    name: 'Da JPG a PDF',
    description: 'Trasforma le foto JPG in un PDF, un’immagine per pagina.',
    metaDescription: 'Converti JPG in PDF online gratis. Scegli formato pagina, orientamento e margini. I dati JPEG vengono incorporati senza ricompressione.',
    steps: [
      'Aggiungi i tuoi file JPG e trascinali, o usa le frecce, per stabilirne l’ordine.',
      'Scegli il formato della pagina, l’orientamento e il margine.',
      'Crea il PDF e scaricalo.',
    ],
    faq: [
      { q: 'La qualità dell’immagine peggiora?', a: 'No. I file JPG vengono incorporati nel PDF così come sono, senza ricompressione.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Massimo 25 MB per immagine e 100 immagini per PDF.',
      'Qui sono accettate solo immagini JPG; usa Da immagini a PDF per i formati misti.',
    ],
  },
  'png-to-pdf': {
    name: 'Da PNG a PDF',
    description: 'Trasforma le immagini PNG in un PDF mantenendo la trasparenza.',
    metaDescription: 'Converti PNG in PDF online gratis. Scegli formato pagina e margini; la trasparenza viene mantenuta. Funziona nel browser.',
    steps: [
      'Aggiungi i tuoi file PNG e imposta l’ordine.',
      'Scegli il formato della pagina, l’orientamento e il margine.',
      'Crea il PDF e scaricalo.',
    ],
    faq: [
      { q: 'La trasparenza viene mantenuta?', a: 'Sì. Le immagini PNG vengono incorporate con il loro canale alfa, quindi le aree trasparenti mostrano il bianco della pagina dietro di esse.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Massimo 25 MB per immagine e 100 immagini per PDF.',
      'Qui sono accettate solo immagini PNG; usa Da immagini a PDF per i formati misti.',
    ],
  },
  'images-to-pdf': {
    name: 'Da immagini a PDF',
    description: 'Riunisci immagini JPG e PNG in un unico PDF nell’ordine che scegli.',
    metaDescription: 'Unisci più immagini in un unico PDF online gratis. Riordina le pagine, scegli formato pagina e margini. Elaborazione nel browser.',
    steps: [
      'Aggiungi immagini JPG e PNG (puoi trascinarne più di una insieme).',
      'Riordinale e scegli formato pagina, orientamento e margine.',
      'Crea il PDF e scaricalo.',
    ],
    faq: [
      { q: 'Quali formati di immagine funzionano?', a: 'JPG e PNG vengono incorporati direttamente. WebP, GIF e BMP vengono prima convertiti in PNG se il tuo browser è in grado di decodificarli.' },
      { q: 'Cosa fa «Adatta all’immagine»?', a: 'Ogni pagina assume le dimensioni della sua immagine, quindi nulla viene scalato o riempito. Scegli A4 o Letter per pagine di documento standard.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Massimo 25 MB per immagine e 100 immagini per PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Unisci PDF',
    description: 'Combina più file PDF in un unico documento nell’ordine che scegli.',
    metaDescription: 'Unisci file PDF online gratis. Combina più PDF in uno solo, riordinali e scarica subito. Elaborazione nel browser.',
    steps: [
      'Aggiungi due o più file PDF.',
      'Disponili nell’ordine che vuoi usando le frecce.',
      'Unisci e scarica il PDF combinato.',
    ],
    faq: [
      { q: 'I segnalibri e i campi dei moduli vengono conservati?', a: 'Le pagine vengono copiate con il loro contenuto visibile e i link. I segnalibri a livello di documento e i dati interattivi dei moduli non vengono riportati.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'I segnalibri/strutture e i campi dei moduli dei file di origine non vengono uniti.',
    ],
  },
  'split-pdf': {
    name: 'Dividi PDF',
    description: 'Dividi un PDF per intervalli di pagine, in pagine singole o in blocchi di dimensione fissa.',
    metaDescription: 'Dividi un PDF online gratis. Separa per intervalli di pagine, ogni pagina o ogni N pagine e scarica come ZIP. Funziona nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli come dividere: intervalli personalizzati come 1-3, 4-6, ogni pagina oppure ogni N pagine.',
      'Dividi e scarica le parti singolarmente o come ZIP.',
    ],
    faq: [
      { q: 'Come si scrivono gli intervalli?', a: 'Separa i file di output con le virgole. Ogni file può essere un intervallo (1-3), una singola pagina (5) o una combinazione separata da un più (1-2+7). Esempio: 1-3, 4-6, 7+9.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
    ],
  },
  'rotate-pdf': {
    name: 'Ruota PDF',
    description: 'Ruota singole pagine o l’intero PDF, con anteprime in miniatura.',
    metaDescription: 'Ruota le pagine di un PDF online gratis. Ruota pagine singole o tutte di 90, 180 o 270 gradi e salva un nuovo PDF. Funziona nel browser.',
    steps: [
      'Aggiungi un PDF; le sue pagine compaiono come miniature.',
      'Ruota le singole pagine oppure ruotale tutte insieme.',
      'Salva il PDF ruotato.',
    ],
    faq: [
      { q: 'La rotazione è permanente?', a: 'Viene memorizzata nel nuovo PDF come attributo di rotazione della pagina. Il contenuto della pagina non viene ridisegnato, quindi non si perde nulla.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Estrai pagine PDF',
    description: 'Scegli le pagine che ti servono da un PDF e salvale come nuovo documento.',
    metaDescription: 'Estrai pagine da un PDF online gratis. Seleziona le pagine visivamente o per intervallo e salva un nuovo PDF. Elaborazione nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Fai clic sulle miniature delle pagine per selezionarle, oppure digita un intervallo come 1-3, 8.',
      'Estrai e scarica il nuovo PDF.',
    ],
    faq: [
      { q: 'Posso usarlo per eliminare pagine?', a: 'Sì. Seleziona le pagine che vuoi tenere ed estraile; le altre restano fuori dal nuovo file.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Riordina pagine PDF',
    description: 'Riordina, rimuovi e ruota le pagine in modo visivo, poi salva il risultato.',
    metaDescription: 'Riordina le pagine di un PDF online gratis. Trascina o sposta le pagine, elimina quelle che non ti servono e salva un nuovo PDF. Nel browser.',
    steps: [
      'Aggiungi un PDF; le sue pagine compaiono come miniature.',
      'Trascina le pagine, oppure usa i pulsanti freccia, per cambiarne l’ordine. Rimuovi le pagine che non ti servono.',
      'Salva il PDF riordinato.',
    ],
    faq: [
      { q: 'Posso riordinare con la tastiera?', a: 'Sì. Usa i pulsanti per spostare prima e spostare dopo su ogni pagina.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
    ],
  },
  'pdf-to-jpg': {
    name: 'Da PDF a JPG',
    description: 'Trasforma le pagine di un PDF in immagini JPG alla risoluzione che scegli.',
    metaDescription: 'Converti PDF in JPG online gratis. Trasforma tutte le pagine o una selezione fino a 300 DPI e scarica uno ZIP. Funziona nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli la risoluzione e, se vuoi, quali pagine convertire.',
      'Converti e scarica le immagini singolarmente o come ZIP.',
    ],
    faq: [
      { q: 'Quale risoluzione devo scegliere?', a: '150 DPI vanno bene per gli schermi; 300 DPI per la stampa. Valori più alti creano immagini più grandi e richiedono più memoria.' },
      { q: 'Le pagine vengono rese con precisione?', a: 'Il rendering usa PDF.js di Mozilla, che gestisce bene la maggior parte dei PDF. Font insoliti o grafica avanzata possono differire leggermente da altri visualizzatori.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Ogni pagina è limitata a circa 50 megapixel.',
    ],
  },
  'pdf-to-png': {
    name: 'Da PDF a PNG',
    description: 'Trasforma le pagine di un PDF in immagini PNG nitide e senza perdita.',
    metaDescription: 'Converti PDF in PNG online gratis. Trasforma le pagine fino a 300 DPI in immagini senza perdita e scarica uno ZIP. Funziona nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli la risoluzione e le pagine.',
      'Converti e scarica le immagini singolarmente o come ZIP.',
    ],
    faq: [
      { q: 'Perché scegliere il PNG invece del JPG?', a: 'Il PNG resta nitido su testo e grafica al tratto e supporta la trasparenza. I file sono più grandi del JPG.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Ogni pagina è limitata a circa 50 megapixel.',
    ],
  },
  'pdf-viewer': {
    name: 'Visualizzatore PDF',
    description: 'Apri e leggi un PDF in privato nel browser, con zoom e navigazione tra le pagine.',
    metaDescription: 'Visualizza file PDF online gratis. Ingrandisci, vai a una pagina e leggi i documenti nel browser senza caricarli da nessuna parte.',
    steps: [
      'Aggiungi un PDF.',
      'Scorri o usa i controlli di pagina per spostarti.',
      'Ingrandisci o riduci lo zoom secondo necessità.',
    ],
    faq: [
      { q: 'Posso modificare o annotare il PDF qui?', a: 'No. Questo è un visualizzatore di sola lettura. Usa gli strumenti per le pagine per ruotare, riordinare o estrarre pagine.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Sola lettura: nessuna annotazione, compilazione di moduli o ricerca nel testo.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Visualizzatore metadati PDF',
    description: 'Controlla titolo, autore, date di creazione, numero di pagine, dimensioni delle pagine e versione di un PDF.',
    metaDescription: 'Visualizza i metadati di un PDF online gratis. Vedi titolo, autore, produttore, date, numero e dimensioni delle pagine senza caricare il file.',
    steps: [
      'Aggiungi un PDF.',
      'Controlla le proprietà del documento.',
      'Copia i dettagli come JSON se ti servono.',
    ],
    faq: [
      { q: 'Perché mancano alcuni metadati?', a: 'Molti PDF non impostano tutti i campi. Vengono mostrati solo i campi effettivamente memorizzati nel file.' },
      { q: 'Posso rimuovere i metadati?', a: 'Questo strumento si limita a leggere i metadati. Non modifica il file.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Sola lettura: qui i metadati non possono essere modificati né rimossi.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Rimuovi pagine PDF',
    description: 'Elimina le pagine che non ti servono e salva il resto come nuovo PDF.',
    metaDescription: 'Rimuovi pagine da un PDF online gratis. Seleziona le pagine visivamente o per intervallo, eliminale e scarica il resto. Elaborazione nel browser.',
    steps: [
      'Aggiungi un PDF; le sue pagine compaiono come miniature.',
      'Fai clic sulle pagine da eliminare, oppure digita un intervallo come 2, 5-7.',
      'Rimuovile e scarica il nuovo PDF.',
    ],
    faq: [
      { q: 'Modifica il mio file originale?', a: 'No. Ottieni un nuovo PDF senza le pagine selezionate. L’originale resta com’era.' },
      { q: 'Posso rimuovere tutte le pagine?', a: 'No. Deve restare almeno una pagina.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
    ],
  },
  'add-page-numbers': {
    name: 'Aggiungi numeri di pagina',
    description: 'Numera le pagine di un PDF scegliendo posizione, formato e stile.',
    metaDescription: 'Aggiungi i numeri di pagina a un PDF online gratis. Scegli la posizione, un formato come «Pagina 1 di 10», il numero iniziale e la dimensione del testo. Nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli dove collocare i numeri, il loro formato e quali pagine numerare.',
      'Aggiungi i numeri e scarica il PDF.',
    ],
    faq: [
      { q: 'Posso saltare la copertina?', a: 'Sì. Imposta «Prima pagina da numerare» su 2, poi scegli quale numero deve mostrare.' },
      { q: 'Funziona sulle pagine ruotate?', a: 'Sì. I numeri vengono posizionati rispetto a ciò che vedi sullo schermo, comprese le pagine ruotate.' },
      { q: 'Quale font viene usato?', a: 'Helvetica, che copre cifre e lettere latine.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'I numeri vengono disegnati sopra ogni pagina, mai dietro il contenuto esistente.',
      'Usa il font Helvetica integrato.',
    ],
  },
  'watermark-pdf': {
    name: 'Filigrana per PDF',
    description: 'Applica un testo o un’immagine sulle pagine del PDF con opacità e angolo regolabili.',
    metaDescription: 'Aggiungi una filigrana a un PDF online gratis. Applica testo o un’immagine, al centro o a mosaico, con opacità e rotazione personalizzate. Nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli una filigrana di testo o di immagine, poi imposta dimensione, opacità, angolo e disposizione.',
      'Applicala a tutte le pagine o a una selezione, poi scarica.',
    ],
    faq: [
      { q: 'La filigrana si può rimuovere?', a: 'È disegnata sopra la pagina e non è una funzione di sicurezza. Chiunque abbia un editor PDF può rimuoverla. Per una protezione più forte, abbinala a Proteggi PDF.' },
      { q: 'Posso usare l’urdu, l’arabo o altri alfabeti?', a: 'Non come testo digitato, perché i font integrati del PDF coprono solo le lettere latine. Crea un PNG trasparente con il tuo testo e usa invece l’opzione immagine.' },
      { q: 'La filigrana sta davanti o dietro al testo della pagina?', a: 'Davanti. Riduci l’opacità in modo che la pagina resti leggibile.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Le filigrane di testo supportano solo lettere latine, cifre e simboli comuni.',
      'Immagini per la filigrana: PNG o JPG, fino a 5 MB.',
      'Il segno viene disegnato sopra il contenuto esistente della pagina.',
    ],
  },
  'crop-pdf': {
    name: 'Ritaglia PDF',
    description: 'Elimina i margini o mantieni un’area scelta su ogni pagina, con anteprima in tempo reale.',
    metaDescription: 'Ritaglia le pagine di un PDF online gratis. Trascina un riquadro di ritaglio sull’anteprima o digita i margini, poi applicalo a tutte le pagine o a quelle scelte. Nel browser.',
    steps: [
      'Aggiungi un PDF e scegli una pagina da visualizzare in anteprima.',
      'Trascina il riquadro o digita i margini per selezionare l’area da mantenere.',
      'Scegli quali pagine ritagliare, poi scarica.',
    ],
    faq: [
      { q: 'Il contenuto ritagliato viene eliminato?', a: 'No. Il ritaglio cambia l’area visibile di ogni pagina, ma il contenuto al di fuori resta comunque dentro il file. Non affidarti al ritaglio per nascondere informazioni sensibili.' },
      { q: 'E se le mie pagine hanno dimensioni diverse?', a: 'Le stesse proporzioni vengono applicate a tutte le pagine che scegli, quindi le pagine di dimensioni diverse vengono ritagliate della stessa percentuale.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Il ritaglio nasconde il contenuto; non lo elimina.',
      'L’area di ritaglio è una quota di ogni pagina, non una dimensione fissa in millimetri.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Modifica metadati PDF',
    description: 'Cambia titolo, autore, oggetto e parole chiave di un PDF, oppure rimuovi tutti i metadati.',
    metaDescription: 'Modifica i metadati di un PDF online gratis. Cambia titolo, autore, oggetto e parole chiave, oppure elimina tutte le proprietà del documento. Nel browser.',
    steps: [
      'Aggiungi un PDF; le sue proprietà attuali vengono compilate.',
      'Modifica i campi oppure scegli Rimuovi tutti i metadati.',
      'Salva e scarica il PDF aggiornato.',
    ],
    faq: [
      { q: 'Cosa rimuove «Rimuovi tutti i metadati»?', a: 'Le informazioni del documento (titolo, autore, oggetto, parole chiave, creatore, produttore e date) e i metadati XMP incorporati. Non tocca il testo delle pagine, le immagini o i commenti.' },
      { q: 'Perché modificare i metadati?', a: 'Per correggere un titolo sbagliato mostrato nelle schede del browser e nei risultati di ricerca, per indicare l’autore giusto o per eliminare i dati personali prima di condividere un file.' },
      { q: 'Supporta il testo non latino?', a: 'Sì. Titoli e autori in urdu, arabo, cinese e altre scritture vengono salvati correttamente.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Vengono modificate solo le proprietà a livello di documento. Commenti, dati dei moduli e contenuto delle pagine restano invariati.',
    ],
  },
  'protect-pdf': {
    name: 'Proteggi PDF',
    description: 'Blocca un PDF con una password usando la cifratura AES-256.',
    metaDescription: 'Proteggi un PDF con una password online gratis. La cifratura AES-256 avviene nel tuo browser; il file e la password non vengono mai caricati.',
    steps: [
      'Aggiungi un PDF.',
      'Digita una password due volte e scegli cosa possono fare i lettori (stampare, copiare, modificare).',
      'Proteggilo e scarica la copia cifrata.',
    ],
    faq: [
      { q: 'Quanto è forte la protezione?', a: 'I file vengono cifrati con AES-256, la cifratura PDF standard più forte. In pratica la sicurezza dipende dalla tua password: usane una lunga che non utilizzi altrove.' },
      { q: 'E se dimentico la password?', a: 'Non può essere recuperata. Nulla viene memorizzato o inviato da nessuna parte e non esiste un ripristino. Conserva il file originale e la password in un luogo sicuro.' },
      { q: 'Le opzioni di stampa, copia e modifica sono imposte?', a: 'Sono richieste che la maggior parte dei programmi PDF rispetta, ma non sono inviolabili. Ciò che protegge davvero il file è la password.' },
      { q: 'La mia password viene caricata?', a: 'No. La cifratura avviene nel tuo browser.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'Password: fino a 127 caratteri standard (lettere, cifre e simboli).',
      'Un PDF che ha già una password deve prima essere sbloccato.',
      'I lettori PDF molto vecchi (precedenti al 2008 circa) potrebbero non aprire i file AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Sblocca PDF',
    description: 'Rimuovi la password da un PDF a cui hai accesso, così si apre liberamente.',
    metaDescription: 'Sblocca un PDF protetto da password online gratis. Inserisci la password per salvare una copia non protetta, elaborata nel browser e mai caricata.',
    steps: [
      'Aggiungi il PDF protetto.',
      'Inserisci la sua password, se richiesta. I PDF che limitano solo la stampa o la copia non ne richiedono.',
      'Scarica la copia sbloccata.',
    ],
    faq: [
      { q: 'Può sbloccare un PDF se ho dimenticato la password?', a: 'No. Questo strumento non indovina né viola mai le password. Rimuove la protezione solo quando fornisci la password corretta, oppure quando il file si limita a restringere azioni come la stampa.' },
      { q: 'È consentito?', a: 'Usalo solo su file di tua proprietà o che hai il permesso di aprire. Sei responsabile di come usi il risultato.' },
      { q: 'La mia password viene caricata?', a: 'No. Tutto avviene nel tuo browser.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'Supporta la protezione standard con password dei PDF (RC4 e AES).',
      'Una firma digitale diventa non valida dopo il nuovo salvataggio del file.',
      'I file protetti da certificato o da DRM non sono supportati.',
    ],
  },
  'extract-pdf-text': {
    name: 'Estrai testo da PDF',
    description: 'Copia tutto il testo selezionabile di un PDF, pagina per pagina.',
    metaDescription: 'Estrai il testo da un PDF online gratis. Ottieni il testo selezionabile di ogni pagina o di un intervallo, poi copialo o salvalo come .txt. Nel browser.',
    steps: [
      'Aggiungi un PDF.',
      'Scegli tutte le pagine o un intervallo e se segnare i cambi di pagina.',
      'Copia il testo oppure scaricalo come file .txt.',
    ],
    faq: [
      { q: 'Perché il risultato è vuoto?', a: 'Probabilmente il PDF è una scansione, cioè un’immagine di testo e non testo vero. Per leggerla serve l’OCR (riconoscimento del testo), che questo strumento non esegue.' },
      { q: 'L’impaginazione viene mantenuta?', a: 'Righe e paragrafi vengono ricostruiti al meglio, ma colonne, tabelle e note a piè di pagina potrebbero uscire in un ordine diverso.' },
      { q: 'Può aprire PDF protetti da password?', a: 'No. I PDF cifrati vengono rilevati e rifiutati con un messaggio chiaro. Rimuovi prima la password con il nostro strumento Sblocca PDF.' },
    ],
    limits: [
      'Massimo 100 MB per PDF.',
      'I PDF protetti da password (cifrati) non sono supportati.',
      'I PDF molto grandi o complessi dipendono dalla memoria del tuo dispositivo.',
      'Viene estratto solo il testo vero; le pagine scansionate richiedono l’OCR.',
      'L’ordine di lettura segue il PDF e nelle impaginazioni complesse può differire dall’ordine visivo.',
    ],
  },
  'compress-pdf': {
    name: 'Comprimi PDF',
    description: 'Riduci le dimensioni di un PDF ricomprimendone le immagini, mentre il testo resta selezionabile.',
    metaDescription: 'Comprimi PDF online gratis. Ricomprimi le immagini incorporate per ridurre il peso mantenendo il testo selezionabile, oppure appiattisci le pagine per il file più piccolo.',
    steps: [
      'Aggiungi il tuo PDF.',
      'Scegli come comprimerlo e con quale intensità: l’impostazione predefinita mantiene il testo selezionabile e ricomprime solo le immagini.',
      'Comprimi, controlla lo spazio risparmiato e scarica il risultato.',
    ],
    faq: [
      { q: 'Perché il mio PDF si è ridotto di pochissimo?', a: 'La modalità standard ricomprime le immagini JPEG, quindi aiuta di più con i PDF pieni di foto o scansioni. Un PDF composto soprattutto da testo, o con immagini già piccole, non può ridursi molto. Lo strumento ti avvisa quando non ha potuto risparmiare nulla invece di far finta di niente.' },
      { q: 'La qualità peggiorerà?', a: 'Le immagini perdono un po’ di dettaglio in cambio di dimensioni minori; Leggera le mantiene quasi invariate e Forte le rende visibilmente più morbide. Testo e grafica vettoriale non vengono toccati nella modalità standard. La modalità «Massima» trasforma ogni pagina in un’immagine, quindi il testo non può più essere selezionato né cercato.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Vengono ricompresse solo le immagini JPEG incorporate. Le immagini di tipo PNG (Flate), i font e gli altri contenuti restano invariati.',
      'La modalità Massima converte ogni pagina in un’immagine: testo, link e campi dei moduli smettono di funzionare e il file non è più ricercabile.',
      'I colori delle immagini ricompresse possono variare leggermente.',
      'Massimo 100 MB per PDF. I PDF protetti da password devono prima essere sbloccati.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Riconosci il testo nei PDF scansionati (inglese) e ottieni un PDF ricercabile.',
    metaDescription: 'OCR di PDF online gratis. Riconosci il testo inglese nei PDF scansionati e scarica un PDF ricercabile o il testo semplice. Il motore OCR funziona nel browser.',
    steps: [
      'Aggiungi un PDF scansionato.',
      'Scegli le pagine e la qualità. Le pagine che contengono già testo selezionabile possono essere saltate.',
      'Avvia l’OCR, controlla il testo riconosciuto e scarica il PDF ricercabile o un file di testo.',
    ],
    faq: [
      { q: 'Quali lingue sono supportate?', a: 'Per ora solo l’inglese. Il testo in altre lingue verrà letto in modo errato. In futuro si potranno aggiungere altre lingue senza cambiare il funzionamento dello strumento.' },
      { q: 'Il mio documento viene inviato a un servizio OCR?', a: 'No. Il motore di riconoscimento (Tesseract, compilato in WebAssembly) e i suoi dati per l’inglese sono forniti da questo sito web ed eseguiti nel tuo browser. Il documento non viene caricato.' },
      { q: 'Quanto è accurato?', a: 'Funzionano meglio le scansioni pulite e dritte di testo stampato a 200-300 DPI. La scrittura a mano, i caratteri molto piccoli e le pagine poco contrastate o storte producono più errori. Controlla sempre i numeri importanti.' },
    ],
    limits: [
      'Solo inglese. La scrittura a mano non viene riconosciuta in modo affidabile.',
      'Le pagine originali restano esattamente come sono; viene aggiunto uno strato di testo invisibile in modo che il testo possa essere cercato e copiato.',
      'L’OCR è lento sui documenti grandi (diversi secondi per pagina). Il primo avvio carica anche il motore (circa 3 MB).',
      'Massimo 100 MB per PDF. Le pagine molto grandi possono essere rifiutate per proteggere il browser.',
    ],
  },
  'sign-pdf': {
    name: 'Firma PDF',
    description: 'Disegna, digita o carica una firma e collocala sulle pagine del PDF.',
    metaDescription: 'Firma un PDF online gratis. Disegna, digita o carica la tua firma, collocala su qualsiasi pagina e scarica il PDF firmato. Firma visiva, nel browser.',
    steps: [
      'Aggiungi il PDF da firmare.',
      'Crea la tua firma disegnandola, digitando il tuo nome o caricando un’immagine.',
      'Trascina la firma nel punto giusto della pagina, scegli quali pagine la ricevono e scarica il PDF firmato.',
    ],
    faq: [
      { q: 'È una firma digitale legalmente vincolante?', a: 'È una firma visiva: un’immagine della tua firma collocata sulla pagina. Non è una firma digitale crittografica, non ha un certificato e non può dimostrare chi ha firmato né rilevare modifiche successive. L’accettazione dipende da chi la richiede. Alcune organizzazioni richiedono servizi di firma elettronica certificati.' },
      { q: 'La mia firma viene memorizzata da qualche parte?', a: 'No. Viene creata nel tuo browser, usata solo per questo file e dimenticata quando esci o ricarichi la pagina.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Solo firma visiva: nessun certificato, nessuna marca temporale, nessun rilevamento di manomissioni.',
      'La firma viene collocata come immagine sopra la pagina; non compila un campo firma del modulo.',
      'Massimo 100 MB per PDF. I PDF protetti da password devono prima essere sbloccati.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Compila moduli PDF',
    description: 'Compila caselle di testo, caselle di controllo e menu di un modulo PDF compilabile.',
    metaDescription: 'Compila moduli PDF online gratis. Scrivi nei campi, seleziona le caselle e scegli le opzioni in un PDF compilabile, poi scaricalo modificabile o appiattito. Nel browser.',
    steps: [
      'Aggiungi un modulo PDF compilabile.',
      'Compila i campi elencati sotto il nome del file. I campi sono raggruppati per pagina.',
      'Scegli se mantenere il modulo modificabile o appiattirlo, poi scarica il PDF compilato.',
    ],
    faq: [
      { q: 'Il mio PDF non mostra nessun campo. Perché?', a: 'Qui si possono compilare solo i PDF con veri campi modulo. Un modulo che è solo un’immagine o testo semplice non ha campi; usa Firma PDF per collocare una firma, oppure lo strumento Filigrana per aggiungere testo. I moduli creati con XFA (alcuni moduli di enti pubblici e banche) non sono supportati.' },
      { q: 'Cosa fa l’appiattimento?', a: 'L’appiattimento imprime le tue risposte nella pagina e rimuove i campi del modulo, quindi le risposte non possono più essere modificate. Usalo per la copia che invii; tieni per te una copia modificabile.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Il testo può usare lettere latine, cifre e simboli comuni (il font del modulo non ha altri alfabeti).',
      'I campi firma e i pulsanti vengono mostrati ma non possono essere compilati; usa Firma PDF per le firme.',
      'I moduli XFA (dinamici) non sono supportati.',
      'Massimo 100 MB per PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Oscura PDF',
    description: 'Oscura testo e aree in modo definitivo: le pagine oscurate vengono ricostruite come immagini.',
    metaDescription: 'Oscura un PDF online gratis. Cancella con il nero nomi, numeri e aree in modo che il testo sottostante sia davvero rimosso, non solo coperto. Nel browser; nulla viene caricato.',
    steps: [
      'Aggiungi il tuo PDF e scegli una pagina.',
      'Disegna dei riquadri su ciò che deve sparire, oppure cerca parole, e-mail e numeri per segnarli automaticamente.',
      'Applica le oscurature e scarica. Controlla sempre il risultato prima di condividerlo.',
    ],
    faq: [
      { q: 'Il testo nascosto viene davvero rimosso?', a: 'Sì. Ogni pagina con un’oscuratura viene ricostruita come immagine con i riquadri neri dipinti sopra, quindi il testo e gli oggetti sottostanti non esistono nel nuovo file. Un rettangolo nero disegnato sopra il testo, come fanno molti strumenti, lascerebbe il testo selezionabile. Le pagine che non hai oscurato vengono copiate invariate.' },
      { q: 'Perché non riesco più a selezionare il testo sulle pagine oscurate?', a: 'Perché quelle pagine ora sono immagini. È così che il contenuto sottostante viene distrutto. Esegui poi OCR PDF se ti serve testo ricercabile; le parole oscurate restano nere.' },
      { q: 'Trova automaticamente tutte le corrispondenze?', a: 'La ricerca segna le corrispondenze che si trovano all’interno di una singola riga di testo. Una frase che un PDF divide in pezzi, oppure un testo che fa parte di un’immagine, potrebbe sfuggire. Controlla ogni pagina e disegna i riquadri a mano dove serve.' },
    ],
    limits: [
      'Le pagine oscurate diventano immagini: su quelle pagine non ci sono testo selezionabile, link o campi dei moduli.',
      'La ricerca automatica funziona solo sul testo selezionabile e solo all’interno di un singolo tratto di testo; le pagine scansionate richiedono riquadri disegnati a mano.',
      'Le proprietà del documento (titolo, autore…) vengono rimosse dal risultato a meno che tu non scelga di mantenerle.',
      'Massimo 100 MB per PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Confronta PDF',
    description: 'Scopri cosa è cambiato tra due PDF: differenze nel testo e pagine evidenziate.',
    metaDescription: 'Confronta due file PDF online gratis. Vedi le parole aggiunte e rimosse pagina per pagina ed evidenzia le differenze visive tra le versioni. Nel browser.',
    steps: [
      'Aggiungi il PDF originale e il PDF rivisto.',
      'Confrontali: le pagine vengono elencate con il numero di parole aggiunte e rimosse.',
      'Apri una pagina per leggere le modifiche al testo, oppure passa alla vista visiva per vedere in rosso le aree modificate.',
    ],
    faq: [
      { q: 'Cosa mostra il confronto del testo?', a: 'Per ogni pagina, le parole aggiunte (in verde) e rimosse (in rosso) tra il documento originale e quello rivisto, con il testo invariato compresso. Le pagine vengono abbinate per numero.' },
      { q: 'E i PDF scansionati?', a: 'Le scansioni non hanno testo selezionabile, quindi il confronto del testo non trova nulla. Usa il confronto visivo, oppure esegui prima OCR PDF su entrambi i file.' },
      { q: 'Il mio PDF viene caricato da qualche parte?', a: 'No. Il PDF viene letto e riscritto dal tuo browser. Questo strumento non invia il file a un server.' },
    ],
    limits: [
      'Le pagine vengono confrontate per numero: se è stata inserita una pagina, quelle successive risulteranno modificate.',
      'Il confronto visivo rende ogni pagina alla risoluzione dello schermo; differenze minime al di sotto di questa potrebbero non comparire.',
      'Vengono confrontate fino a 100 pagine per file. I PDF protetti da password devono prima essere sbloccati.',
    ],
  },
  'word-counter': {
    name: 'Conta parole',
    description: 'Conta parole, caratteri e frasi e stima il tempo di lettura mentre scrivi.',
    metaDescription: 'Contaparole online gratuito. Conta parole, caratteri, frasi e paragrafi e stima subito il tempo di lettura e di esposizione orale.',
    steps: [
      'Scrivi o incolla il tuo testo.',
      'Leggi le statistiche in tempo reale sopra l’editor.',
      'Usa Cancella per ricominciare.',
    ],
    faq: [
      { q: 'Come vengono contate le parole?', a: 'Una parola è qualsiasi sequenza di caratteri separata da spazi. Le parole con il trattino contano come una e i numeri contano come parole.' },
      { q: 'Come viene calcolato il tempo di lettura?', a: 'Il tempo di lettura presuppone 238 parole al minuto e il tempo di esposizione orale 150 parole al minuto, che sono medie tipiche per gli adulti.' },
    ],
    limits: [
      'I conteggi si basano sugli spazi, quindi per le lingue scritte senza spazi (come cinese o giapponese) verrà mostrata una parola per ogni sequenza di testo.',
    ],
  },
  'character-counter': {
    name: 'Conta caratteri',
    description: 'Conta i caratteri con e senza spazi e controlla il testo rispetto ai limiti di lunghezza più comuni.',
    metaDescription: 'Conta caratteri online gratuito. Conta i caratteri con e senza spazi, byte e righe e controlla i limiti per post, meta tag e SMS.',
    steps: [
      'Scrivi o incolla il tuo testo.',
      'Leggi i totali e le barre dei limiti.',
      'Modifica il testo finché non rientra nei limiti.',
    ],
    faq: [
      { q: 'Le emoji contano come un solo carattere?', a: 'Sì. Il contatore conta i caratteri visibili (cluster di grafemi), quindi un’emoji conta come uno anche se usa più byte.' },
      { q: 'Perché i limiti degli SMS sono diversi?', a: 'La lunghezza degli SMS dipende dalla codifica. I messaggi con caratteri non latini o emoji hanno un limite più basso rispetto al riferimento di 160 caratteri mostrato qui.' },
    ],
    limits: [
      'I limiti mostrati sono indicazioni comuni e cambiano nel tempo; controlla la regola attuale di ogni piattaforma.',
    ],
  },
  'case-converter': {
    name: 'Cambia maiuscole e minuscole',
    description: 'Converti il testo in maiuscolo, minuscolo, iniziali maiuscole, stile frase, camel, snake, kebab e altro.',
    metaDescription: 'Convertitore di maiuscole e minuscole online gratuito. Trasforma il testo in MAIUSCOLO, minuscolo, Iniziali Maiuscole, camelCase, snake_case, kebab-case e altro.',
    steps: [
      'Incolla il tuo testo.',
      'Scegli lo stile di maiuscole che ti serve.',
      'Copia il risultato convertito.',
    ],
    faq: [
      { q: 'Le iniziali maiuscole gestiscono le parole brevi?', a: 'Sì. Le parole brevi come «a», «of» e «the» restano minuscole, a meno che non aprano o chiudano il testo.' },
    ],
    limits: [
      'Le iniziali maiuscole seguono le regole di stile comuni dell’inglese e potrebbero non adattarsi a ogni guida di stile.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Rimuovi righe duplicate',
    description: 'Elimina le righe ripetute da un elenco mantenendo l’ordine originale.',
    metaDescription: 'Rimozione di righe duplicate online gratuita. Elimina le righe ripetute dagli elenchi, con opzioni per maiuscole, spazi e righe vuote.',
    steps: [
      'Incolla il tuo elenco, un elemento per riga.',
      'Scegli se maiuscole/minuscole e spazi contano.',
      'Copia il risultato senza duplicati.',
    ],
    faq: [
      { q: 'Quale copia di un duplicato viene mantenuta?', a: 'Viene mantenuta la prima occorrenza e quelle successive vengono rimosse, così l’ordine originale è conservato.' },
    ],
    limits: [
      'Funziona solo su righe intere.',
    ],
  },
  'text-sorter': {
    name: 'Ordina testo',
    description: 'Ordina le righe in ordine alfabetico, numerico, per lunghezza o in modo casuale.',
    metaDescription: 'Ordinatore di testo online gratuito. Ordina le righe A–Z, Z–A, in modo numerico, per lunghezza o mescolale, anche senza distinzione tra maiuscole e minuscole e con ordinamento naturale.',
    steps: [
      'Incolla le tue righe.',
      'Scegli un metodo di ordinamento e le opzioni.',
      'Copia l’elenco ordinato.',
    ],
    faq: [
      { q: 'Che cos’è l’ordinamento naturale?', a: 'L’ordinamento naturale confronta i numeri contenuti nel testo in base al loro valore, quindi «item2» viene prima di «item10».' },
    ],
    limits: [
      'L’ordinamento alfabetico usa le regole della lingua impostata nel tuo browser.',
    ],
  },
  'text-cleaner': {
    name: 'Pulisci testo',
    description: 'Elimina gli spazi ai bordi, riduci gli spazi multipli, rimuovi le righe vuote e i caratteri invisibili.',
    metaDescription: 'Pulizia del testo online gratuita. Rimuovi spazi in eccesso, righe vuote, interruzioni di riga, caratteri invisibili e virgolette tipografiche dal testo incollato.',
    steps: [
      'Incolla il tuo testo.',
      'Seleziona le opzioni di pulizia che ti servono.',
      'Copia il testo pulito.',
    ],
    faq: [
      { q: 'Che cosa sono i caratteri invisibili?', a: 'Spazi a larghezza zero, trattini opzionali e marcatori di ordine dei byte (BOM) si insinuano spesso quando si copia dalle pagine web e possono rompere il codice o i confronti.' },
    ],
    limits: [
      'Le operazioni vengono applicate in un ordine fisso; esegui lo strumento due volte se ti serve una sequenza diversa.',
    ],
  },
  'text-diff-checker': {
    name: 'Confronta testi',
    description: 'Confronta due testi e vedi esattamente quali righe e parole sono cambiate.',
    metaDescription: 'Confronto di testi online gratuito. Confronta due versioni di un testo affiancate ed evidenzia le righe o le parole aggiunte, rimosse e modificate.',
    steps: [
      'Incolla il testo originale a sinistra e il testo modificato a destra.',
      'Scegli il confronto per righe o per parole.',
      'Controlla le modifiche evidenziate.',
    ],
    faq: [
      { q: 'Qual è la differenza tra la modalità per righe e quella per parole?', a: 'La modalità per righe segna le righe intere che sono cambiate. La modalità per parole evidenzia le parole esatte all’interno del testo, ed è più adatta alla prosa.' },
    ],
    limits: [
      'Input molto grandi (oltre circa 200.000 caratteri) possono essere lenti.',
    ],
  },
  'json-formatter': {
    name: 'Formattatore JSON',
    description: 'Formatta e rendi leggibile il JSON scegliendo l’indentazione e l’ordinamento delle chiavi.',
    metaDescription: 'Formattatore JSON online gratuito. Rendi leggibile il JSON con 2 o 4 spazi o tabulazioni, ordina le chiavi e vedi la posizione precisa degli errori.',
    steps: [
      'Incolla il tuo JSON.',
      'Scegli indentazione e ordinamento.',
      'Copia o scarica il risultato formattato.',
    ],
    faq: [
      { q: 'Il mio JSON viene inviato a un server?', a: 'No. L’analisi e la formattazione avvengono nel tuo browser con il parser JSON integrato.' },
      { q: 'Perché rifiuta il mio JSON?', a: 'Il JSON rigoroso non ammette commenti, virgole finali o apici singoli. Il messaggio di errore indica la riga e la colonna del problema.' },
    ],
    limits: [
      'I numeri maggiori di 2^53 perdono precisione perché il browser li analizza come virgola mobile.',
    ],
  },
  'json-validator': {
    name: 'Validatore JSON',
    description: 'Controlla se un JSON è valido e ottieni la riga e la colonna esatte di ogni errore.',
    metaDescription: 'Validatore JSON online gratuito. Controlla la sintassi del JSON e trova la riga e la colonna esatte degli errori, con un riepilogo della struttura.',
    steps: [
      'Incolla il tuo JSON.',
      'Vedi subito se è valido.',
      'Correggi l’eventuale errore segnalato e controlla di nuovo.',
    ],
    faq: [
      { q: 'Convalida anche rispetto a uno JSON Schema?', a: 'No. Controlla solo la sintassi: se il testo è un JSON ben formato.' },
    ],
    limits: [
      'Solo convalida della sintassi; la convalida con JSON Schema non è inclusa.',
    ],
  },
  'json-minifier': {
    name: 'Minificatore JSON',
    description: 'Rimuovi gli spazi dal JSON per renderlo il più compatto possibile.',
    metaDescription: 'Minificatore JSON online gratuito. Elimina gli spazi dal JSON per ridurre i dati trasmessi e vedi quanti byte hai risparmiato.',
    steps: [
      'Incolla il tuo JSON.',
      'L’output minificato compare insieme allo spazio risparmiato.',
      'Copialo o scaricalo.',
    ],
    faq: [
      { q: 'La minificazione modifica i dati?', a: 'No. Vengono rimossi solo gli spazi non significativi; chiavi, valori e ordine restano invariati.' },
    ],
    limits: [
      'I numeri maggiori di 2^53 perdono precisione perché il browser li analizza come virgola mobile.',
    ],
  },
  'xml-formatter': {
    name: 'Formattatore XML',
    description: 'Rendi leggibile o minifica l’XML e individua i tag non corrispondenti o non chiusi.',
    metaDescription: 'Formattatore XML online gratuito. Rendi leggibile o minifica l’XML con indentazione regolabile e rileva i tag non corrispondenti o non chiusi.',
    steps: [
      'Incolla il tuo XML.',
      'Scegli Formatta o Minifica e l’indentazione.',
      'Copia il risultato.',
    ],
    faq: [
      { q: 'Quanto a fondo viene convalidato l’XML?', a: 'Lo strumento controlla l’annidamento dei tag, i tag non chiusi e i commenti o le sezioni CDATA non terminati. Non convalida rispetto a uno schema DTD o XSD.' },
    ],
    limits: [
      'Solo controlli strutturali; nessuna convalida DTD o XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Codifica / decodifica URL',
    description: 'Codifica o decodifica con la percentuale gli URL e i valori delle stringhe di query.',
    metaDescription: 'Codifica e decodifica URL online gratuita. Codifica il testo con la percentuale per gli URL o decodifica le stringhe codificate, per URL completi o singoli componenti.',
    steps: [
      'Scegli Codifica o Decodifica.',
      'Incolla il tuo testo o URL.',
      'Copia il risultato.',
    ],
    faq: [
      { q: 'Componente o URL completo?', a: 'Usa Componente per un singolo valore, come un parametro di query; codifica caratteri come / ? & =. Usa URL completo per lasciare intatta la struttura dell’URL.' },
    ],
    limits: [
      'La decodifica non riesce con sequenze di percentuale malformate, come un % isolato.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Codifica / decodifica HTML',
    description: 'Trasforma i caratteri speciali in entità HTML oppure decodifica le entità in testo.',
    metaDescription: 'Codifica e decodifica HTML online gratuita. Converti <, >, & e le virgolette in entità HTML, oppure decodifica le entità con nome e numeriche.',
    steps: [
      'Scegli Codifica o Decodifica.',
      'Incolla il tuo testo.',
      'Copia il risultato.',
    ],
    faq: [
      { q: 'La codifica rende sicuro l’input dell’utente per l’HTML?', a: 'La conversione dei cinque caratteri speciali rende il testo sicuro all’interno del contenuto degli elementi HTML e degli attributi tra virgolette. Non sostituisce una libreria di template o un sanitizzatore adeguati in altri contesti.' },
    ],
    limits: [
      'La decodifica supporta le entità con nome più comuni e tutte le entità numeriche.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Codifica / decodifica Base64',
    description: 'Codifica il testo in Base64 o decodifica il Base64 in testo, con pieno supporto UTF-8.',
    metaDescription: 'Codifica e decodifica Base64 online gratuita. Converti il testo in Base64 e viceversa, con supporto UTF-8 e alfabeto sicuro per gli URL opzionale.',
    steps: [
      'Scegli Codifica o Decodifica.',
      'Incolla il tuo testo.',
      'Copia il risultato.',
    ],
    faq: [
      { q: 'Il Base64 è una cifratura?', a: 'No. Il Base64 è una codifica, non una cifratura. Chiunque può decodificarlo, quindi non usarlo mai per proteggere dei segreti.' },
      { q: 'Che cos’è il Base64 sicuro per gli URL?', a: 'Sostituisce + e / con - e _ ed elimina il riempimento =, in modo che il valore possa stare senza problemi negli URL e nei nomi dei file.' },
    ],
    limits: [
      'Per i dati di immagini usa Da immagine a Base64 e Da Base64 a immagine.',
    ],
  },
  'regex-tester': {
    name: 'Tester di regex',
    description: 'Prova le espressioni regolari JavaScript con evidenziazione delle corrispondenze in tempo reale e gruppi di cattura.',
    metaDescription: 'Tester di regex online gratuito per JavaScript. Vedi in tempo reale corrispondenze, gruppi di cattura e gruppi con nome, e visualizza l’anteprima delle sostituzioni.',
    steps: [
      'Inserisci un pattern e scegli i flag.',
      'Incolla il testo da provare.',
      'Controlla le corrispondenze, i gruppi e l’anteprima della sostituzione.',
    ],
    faq: [
      { q: 'Quale dialetto di regex viene usato?', a: 'Le espressioni regolari JavaScript (ECMAScript), così come implementate dal tuo browser. PCRE, Python e altri dialetti differiscono in alcune funzioni.' },
      { q: 'Perché la mia pagina si blocca con alcuni pattern?', a: 'I pattern con ripetizioni annidate possono generare un backtracking catastrofico. La ricerca viene eseguita in un worker in background e viene interrotta dopo 1,5 secondi, quindi un pattern fuori controllo non può bloccare la pagina, ma conviene comunque evitare pattern come (a+)+.' },
    ],
    limits: [
      'Solo sintassi regex di JavaScript.',
      'La ricerca si interrompe dopo 5.000 corrispondenze o 1,5 secondi.',
    ],
  },
  'markdown-previewer': {
    name: 'Anteprima Markdown',
    description: 'Scrivi in Markdown e vedi accanto un’anteprima in tempo reale, sicura e ripulita.',
    metaDescription: 'Anteprima Markdown online gratuita. Scrivi Markdown in stile GitHub e vedi un’anteprima HTML ripulita in tempo reale, poi copia l’HTML.',
    steps: [
      'Scrivi o incolla il Markdown a sinistra.',
      'Vedi il risultato renderizzato a destra.',
      'Copia il Markdown o l’HTML generato.',
    ],
    faq: [
      { q: 'L’anteprima è sicura?', a: 'Sì. L’HTML generato viene ripulito con DOMPurify prima di essere mostrato, quindi script e gestori di eventi vengono rimossi.' },
    ],
    limits: [
      'Markdown in stile GitHub tramite la libreria marked; nessuna estensione per formule o diagrammi.',
    ],
  },
  'password-generator': {
    name: 'Generatore di password',
    description: 'Crea password robuste: completamente casuali, oppure facili da ricordare basate su nomi e parole.',
    metaDescription: 'Generatore di password gratuito: password completamente casuali, oppure basate su nomi come Nvidia132@Star con numeri, maiuscole e simboli casuali. Nel browser.',
    steps: [
      'Scegli uno stile: Nome + parola per qualcosa di memorizzabile, oppure Completamente casuale per la massima sicurezza.',
      'Imposta la lunghezza, quante password ti servono e quali tipi di caratteri includere.',
      'Copia una password e conservala in un gestore di password.',
    ],
    faq: [
      { q: 'Le password generate vengono memorizzate o inviate da qualche parte?', a: 'No. Le password vengono generate nel tuo browser con crypto.getRandomValues e non vengono mai trasmesse né salvate.' },
      { q: 'Una password come Tesla2026#Tech è sicura?', a: 'È meglio di una semplice parola, ma più debole di un testo casuale. Chi cerca di indovinare può partire da elenchi di nomi noti, quindi la vera robustezza deriva dal numero di possibilità, mostrato in bit. Usa le password basate su nomi per account a basso rischio e quelle completamente casuali per e-mail, banca e gestori di password.' },
      { q: 'Perché solo pochi simboli?', a: 'Le password generate usano solo i quattro simboli @ # $ * perché sono accettati da quasi tutti i siti web e sono facili da digitare su qualsiasi tastiera.' },
      { q: 'Quanto deve essere lunga una password?', a: 'Almeno 16 caratteri per gli account importanti. La lunghezza conta più della complessità.' },
    ],
    limits: [
      'Le password basate su nomi sono più facili da ricordare ma più deboli di quelle completamente casuali. La robustezza mostrata presuppone un aggressore che sa come sono costruite.',
      'Il database di parole è un elenco curato di nomi in lettere latine; non è un elenco delle password più usate.',
      'La stima della robustezza si basa sulle combinazioni possibili, non sui database di violazioni.',
    ],
  },
  'uuid-generator': {
    name: 'Generatore di UUID',
    description: 'Genera UUID casuali di versione 4 in blocco con opzioni di formato.',
    metaDescription: 'Generatore di UUID online gratuito. Crea UUID v4 casuali in blocco, in maiuscolo, senza trattini o con le graffe, usando casualità crittografica.',
    steps: [
      'Scegli quanti UUID generare e il formato.',
      'Genera.',
      'Copia l’elenco.',
    ],
    faq: [
      { q: 'Due UUID possono coincidere?', a: 'Gli UUID di versione 4 hanno 122 bit casuali, quindi la probabilità di una collisione è trascurabile nella pratica.' },
    ],
    limits: [
      'Vengono generati solo UUID di versione 4 (casuali).',
    ],
  },
  'timestamp-converter': {
    name: 'Convertitore di timestamp',
    description: 'Converti i timestamp Unix in date leggibili e viceversa, in qualsiasi fuso orario.',
    metaDescription: 'Convertitore di timestamp Unix online gratuito. Converti secondi o millisecondi epoch in date in UTC e ora locale, e le date di nuovo in timestamp.',
    steps: [
      'Inserisci un timestamp Unix o scegli una data.',
      'Leggi il risultato in UTC, nel tuo fuso locale e in ISO 8601.',
      'Copia il valore che ti serve.',
    ],
    faq: [
      { q: 'Secondi o millisecondi?', a: 'I timestamp con 13 o più cifre vengono trattati come millisecondi, quelli più brevi come secondi. Puoi cambiare questa impostazione manualmente.' },
    ],
    limits: [
      'L’intervallo supportato è quello delle date JavaScript: all’incirca dall’anno -271821 all’anno 275760.',
    ],
  },
  'color-converter': {
    name: 'Convertitore di colori',
    description: 'Converti i colori tra HEX, RGB, HSL e HSV, con anteprima in tempo reale e controllo del contrasto.',
    metaDescription: 'Convertitore di colori online gratuito. Converti valori HEX, RGB, HSL e HSV, visualizza l’anteprima del colore e controlla i rapporti di contrasto WCAG.',
    steps: [
      'Inserisci un colore in qualsiasi formato o usa il selettore.',
      'Guarda aggiornarsi ogni formato.',
      'Copia il valore che ti serve.',
    ],
    faq: [
      { q: 'Cosa mostra il controllo del contrasto?', a: 'Mostra il rapporto di contrasto WCAG del colore rispetto al testo bianco e nero, il che ti aiuta a scegliere combinazioni leggibili.' },
    ],
    limits: [
      'Solo sRGB; gli spazi CSS Color 4 come LAB, LCH e Display-P3 non sono supportati.',
      'I valori di trasparenza (alfa) vengono accettati ma ignorati.',
    ],
  },
  'qr-code-generator': {
    name: 'Generatore di codici QR',
    description: 'Crea codici QR per link, testo, Wi-Fi, e-mail o numeri di telefono, in PNG o SVG.',
    metaDescription: 'Generatore di codici QR gratuito. Crea codici QR per URL, testo, Wi-Fi, e-mail e numeri di telefono e scaricali in PNG o SVG. Creati nel browser.',
    steps: [
      'Scegli cosa deve contenere il codice e compila i dettagli.',
      'Se vuoi, regola dimensione, colori e correzione degli errori.',
      'Scarica il PNG o l’SVG e provalo con il telefono prima di stamparlo.',
    ],
    faq: [
      { q: 'I codici scadono?', a: 'No. Questi sono codici statici: i dati sono memorizzati nel codice stesso, quindi funzionano per sempre e nulla viene tracciato.' },
      { q: 'Quale livello di correzione degli errori devo scegliere?', a: 'Il livello Medio va bene per la maggior parte degli usi. Scegli Quartile o Alto se il codice potrebbe sporcarsi o danneggiarsi, ma i livelli più alti rendono il codice più denso e più difficile da scansionare a dimensioni piccole.' },
      { q: 'Posso usare i codici a fini commerciali?', a: 'Sì. Lo standard dei codici QR è aperto e i codici creati qui non comportano costi, filigrane o tracciamento da parte nostra.' },
      { q: 'I miei dati vengono inviati da qualche parte?', a: 'No. Il codice viene generato nel tuo browser e le password Wi-Fi che inserisci restano sul tuo dispositivo.' },
    ],
    limits: [
      'Solo codici statici: nessun tracciamento delle scansioni e nessun codice modificabile.',
      'Un testo molto lungo produce un codice denso e difficile da scansionare, quindi mantienilo breve.',
      'I colori scuri su sfondo chiaro con forte contrasto si scansionano meglio.',
    ],
  },
};
export default tools;
