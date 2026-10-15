import type { ToolTextMap } from '../../toolText';

const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG în PNG',
    description: 'Convertește fotografii JPG și JPEG în imagini PNG fără pierderi, dintr-un singur clic.',
    metaDescription: 'Convertește JPG în PNG online, gratuit. Transformă în lot fotografii JPEG în PNG direct în browser, fără încărcare și fără cont.',
    steps: [
      'Trage unul sau mai multe fișiere JPG în instrument sau alege-le de pe dispozitiv.',
      'Verifică previzualizările, apoi apasă Convertește.',
      'Descarcă fiecare PNG sau toate fișierele într-un ZIP.',
    ],
    faq: [
      { q: 'Se îmbunătățește calitatea prin conversia JPG în PNG?', a: 'Nu. JPG pierde informație la salvare, iar detaliile eliminate atunci nu mai pot fi recuperate. PNG doar păstrează pixelii actuali, fără alte pierderi, ceea ce este util pentru editare sau pentru lucrul cu transparența.' },
      { q: 'De ce este PNG-ul mai mare decât JPG-ul?', a: 'PNG este fără pierderi și stochează de obicei fotografiile mai puțin eficient decât JPG. Folosește JPG sau WebP atunci când dimensiunea fișierului contează mai mult decât pixelii exacți.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG în JPG',
    description: 'Transformă imaginile PNG în fișiere JPG mai mici, cu calitate reglabilă.',
    metaDescription: 'Convertește PNG în JPG online, gratuit. Alege calitatea și culoarea de fundal pentru imaginile transparente. Procesare în browser.',
    steps: [
      'Adaugă fișierele PNG.',
      'Setează calitatea JPG și culoarea de fundal folosită pentru zonele transparente.',
      'Apasă Convertește și descarcă rezultatele.',
    ],
    faq: [
      { q: 'Ce se întâmplă cu zonele transparente?', a: 'JPG nu acceptă transparența, așa că pixelii transparenți sunt umpluți cu culoarea de fundal aleasă (implicit alb).' },
      { q: 'Ce setare de calitate să folosesc?', a: 'Între 80 și 90 este un echilibru bun pentru majoritatea imaginilor. Sub aproximativ 60, artefactele de compresie devin vizibile pe text și pe marginile clare.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Transparența este aplatizată pe o culoare uniformă, deoarece JPG nu o poate stoca.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG în WebP',
    description: 'Convertește fotografii JPG în WebP modern, pentru fișiere mai mici și pagini mai rapide.',
    metaDescription: 'Convertește JPG în WebP online, gratuit. Micșorează fotografiile pentru web, cu calitate reglabilă, procesate local în browser.',
    steps: [
      'Adaugă fișierele JPG.',
      'Alege calitatea WebP (80 este o valoare implicită rezonabilă).',
      'Convertește și descarcă.',
    ],
    faq: [
      { q: 'Este WebP mai mic decât JPG?', a: 'De obicei cu 20–35% mai mic la o calitate vizuală similară, deși rezultatul depinde de imagine.' },
      { q: 'Toate browserele acceptă WebP?', a: 'Toate browserele principale actuale pot afișa WebP. Codificarea WebP în browser este acceptată în Chrome, Edge, Firefox și în versiunile recente de Safari; dacă al tău nu o poate face, instrumentul te anunță în loc să producă un fișier greșit.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Browserul trebuie să accepte codificarea WebP; browserele fără suport afișează o eroare.',
    ],
  },
  'png-to-webp': {
    name: 'PNG în WebP',
    description: 'Convertește imagini PNG în WebP, păstrând transparența, la o fracțiune din dimensiune.',
    metaDescription: 'Convertește PNG în WebP online, gratuit. Păstrează transparența, reduce dimensiunea fișierului și rulează integral în browser.',
    steps: [
      'Adaugă fișierele PNG.',
      'Alege calitatea WebP.',
      'Convertește și descarcă.',
    ],
    faq: [
      { q: 'Se păstrează transparența?', a: 'Da. WebP acceptă canal alfa, așa că PNG-urile transparente rămân transparente.' },
      { q: 'Pot obține un rezultat fără pierderi?', a: 'Setează calitatea la 100 pentru cea mai mare fidelitate. Browserele codifică WebP cu pierderi, așa că folosește PNG dacă ai nevoie de o copie identică matematic.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Browserul trebuie să accepte codificarea WebP; browserele fără suport afișează o eroare.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP în JPG',
    description: 'Convertește imagini WebP în fișiere JPG compatibile aproape peste tot.',
    metaDescription: 'Convertește WebP în JPG online, gratuit. Fă imaginile WebP utilizabile peste tot, convertite local în browserul tău.',
    steps: [
      'Adaugă fișierele WebP.',
      'Setează calitatea și culoarea de fundal pentru zonele transparente.',
      'Convertește și descarcă.',
    ],
    faq: [
      { q: 'De ce să convertesc WebP în JPG?', a: 'Unele programe mai vechi, clienți de e-mail și formulare de încărcare resping încă WebP. JPG este acceptat aproape peste tot.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Transparența este aplatizată pe o culoare uniformă, deoarece JPG nu o poate stoca.',
    ],
  },
  'webp-to-png': {
    name: 'WebP în PNG',
    description: 'Convertește imagini WebP în PNG fără pierderi, păstrând transparența.',
    metaDescription: 'Convertește WebP în PNG online, gratuit. Păstrează transparența și rulează integral în browser, fără încărcare.',
    steps: [
      'Adaugă fișierele WebP.',
      'Apasă Convertește.',
      'Descarcă fișierele PNG.',
    ],
    faq: [
      { q: 'Se păstrează transparența?', a: 'Da. PNG acceptă transparența, așa că valorile alfa din WebP sunt preluate.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
    ],
  },
  'image-compressor': {
    name: 'Compresor de imagini',
    description: 'Redu dimensiunea imaginilor cu calitate reglabilă și vezi exact cât economisești.',
    metaDescription: 'Comprimă imagini JPG, PNG și WebP online, gratuit. Ajustează calitatea, limitează opțional dimensiunile și compară mărimile. Rulează în browser.',
    steps: [
      'Adaugă imaginile.',
      'Alege formatul de ieșire și calitatea și, opțional, o lățime sau o înălțime maximă.',
      'Comprimă, compară dimensiunile dinainte și de după, apoi descarcă.',
    ],
    faq: [
      { q: 'Cum reduce compresorul dimensiunea?', a: 'Recodifică imaginea la calitatea aleasă și o poate și micșora. Ieșirea PNG este fără pierderi, așa că se reduce doar dacă micșorezi și dimensiunile.' },
      { q: 'Ce se întâmplă dacă rezultatul este mai mare decât originalul?', a: 'Se poate întâmpla la fișierele deja optimizate. Instrumentul te avertizează, ca să poți păstra originalul.' },
      { q: 'Se păstrează datele EXIF sau de locație?', a: 'Nu. Recodificarea printr-un canvas elimină metadatele EXIF, cum ar fi modelul aparatului și locația GPS, ceea ce este adesea exact ce îți dorești înainte de a trimite o fotografie. Nici profilurile de culoare nu sunt păstrate.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Cele mai bune rezultate se obțin cu ieșire JPG sau WebP; ieșirea PNG este fără pierderi și este posibil să nu se micșoreze.',
    ],
  },
  'image-resizer': {
    name: 'Redimensionare imagini',
    description: 'Redimensionează imaginile în pixeli exacți sau în procente, păstrând raportul de aspect.',
    metaDescription: 'Redimensionează imagini online, gratuit. Setează lățimea și înălțimea exacte sau un procent, păstrează raportul și descarcă JPG, PNG sau WebP.',
    steps: [
      'Adaugă una sau mai multe imagini.',
      'Alege pixeli sau procente și introdu noua dimensiune. Lasă blocarea raportului de aspect activă pentru a evita deformarea.',
      'Redimensionează și descarcă.',
    ],
    faq: [
      { q: 'Pot mări o imagine?', a: 'Da, dar mărirea nu poate adăuga detalii, așa că rezultatul va arăta mai neclar. Micșorarea oferă cea mai bună calitate.' },
      { q: 'Care este dimensiunea maximă de ieșire?', a: 'Browserele limitează dimensiunea canvasului. Acest instrument plafonează ieșirea la 16.000 px pe latură și aproximativ 100 de megapixeli.' },
      { q: 'Se păstrează datele EXIF sau de locație?', a: 'Nu. Recodificarea printr-un canvas elimină metadatele EXIF, cum ar fi modelul aparatului și locația GPS, ceea ce este adesea exact ce îți dorești înainte de a trimite o fotografie. Nici profilurile de culoare nu sunt păstrate.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Ieșirea este plafonată la 16.000 px pe latură.',
    ],
  },
  'image-cropper': {
    name: 'Decupare imagine',
    description: 'Decupează o imagine la o regiune exactă sau la un raport de aspect fix, cu previzualizare în timp real.',
    metaDescription: 'Decupează imagini online, gratuit. Alege un raport de aspect fix sau valori exacte în pixeli, cu previzualizare în timp real. Procesare în browser.',
    steps: [
      'Adaugă o imagine.',
      'Alege un raport de aspect sau trage cadrul de decupare, apoi ajustează fin poziția și dimensiunea din câmpurile numerice.',
      'Apasă Decupează și descarcă.',
    ],
    faq: [
      { q: 'Decuparea reduce calitatea?', a: 'Decuparea păstrează pixelii originali. Calitatea se schimbă doar dacă salvezi ca JPG sau WebP cu o setare de calitate mai mică.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'O singură imagine odată.',
      'Maximum 25 MB per fișier.',
      'Imaginile animate folosesc primul cadru.',
    ],
  },
  'image-rotator': {
    name: 'Rotire imagine',
    description: 'Rotește imaginile cu 90°, 180°, 270° sau cu orice unghi personalizat.',
    metaDescription: 'Rotește imagini online, gratuit. Întoarce fotografii cu 90, 180 sau 270 de grade ori cu un unghi personalizat, direct în browser.',
    steps: [
      'Adaugă imaginile.',
      'Alege o rotire sau introdu un unghi personalizat.',
      'Aplică și descarcă.',
    ],
    faq: [
      { q: 'Ce se întâmplă la rotirile cu unghiuri care nu sunt drepte?', a: 'Canvasul se mărește pentru a cuprinde imaginea rotită. La ieșirea JPG, colțurile goale se umplu cu fundalul ales; PNG și WebP le păstrează transparente.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
    ],
  },
  'image-flipper': {
    name: 'Oglindire imagine',
    description: 'Oglindește imaginile pe orizontală sau pe verticală.',
    metaDescription: 'Oglindește imagini pe orizontală sau pe verticală online, gratuit. Răstoarnă fotografii în browser, fără încărcare.',
    steps: [
      'Adaugă imaginile.',
      'Alege orizontal, vertical sau ambele.',
      'Aplică și descarcă.',
    ],
    faq: [
      { q: 'Care este diferența dintre oglindirea orizontală și cea verticală?', a: 'Oglindirea orizontală inversează stânga cu dreapta, ca într-o oglindă. Oglindirea verticală întoarce imaginea cu susul în jos, față de axa ei orizontală.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
    ],
  },
  'image-format-converter': {
    name: 'Convertor de format imagine',
    description: 'Convertește între JPG, PNG și WebP cu un singur instrument flexibil.',
    metaDescription: 'Convertește imagini între JPG, PNG și WebP online, gratuit. Alege formatul de ieșire și calitatea, procesate local în browser.',
    steps: [
      'Adaugă imagini în orice format acceptat.',
      'Alege formatul de ieșire și calitatea.',
      'Convertește și descarcă.',
    ],
    faq: [
      { q: 'Ce formate pot folosi?', a: 'Intrare: JPG, PNG, WebP, GIF, BMP și AVIF, dacă browserul le poate decodifica. Ieșire: JPG, PNG și WebP.' },
      { q: 'Dar HEIC sau TIFF?', a: 'Browserele nu pot decodifica nativ HEIC sau TIFF, așa că acestea nu sunt încă acceptate.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Fișierele HEIC/HEIF, TIFF și RAW nu sunt acceptate.',
    ],
  },
  'image-to-base64': {
    name: 'Imagine în Base64',
    description: 'Codifică o imagine ca URI de date Base64 pentru CSS, HTML sau JSON.',
    metaDescription: 'Convertește o imagine într-un șir Base64 sau URI de date online, gratuit. Copiază fragmente HTML și CSS gata de folosit. Rulează în browser.',
    steps: [
      'Adaugă o imagine.',
      'Alege stilul rezultatului: URI de date, Base64 simplu, HTML <img> sau CSS.',
      'Copiază rezultatul.',
    ],
    faq: [
      { q: 'Când să folosesc imagini Base64?', a: 'Pentru pictograme mici în CSS sau în e-mailuri, unde o cerere suplimentară costă mai mult decât creșterea de aproximativ 33% a dimensiunii. Evită-le pentru fotografii mari.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Maximum 5 MB per imagine, deoarece textul Base64 devine foarte mare.',
      'O singură imagine odată.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 în imagine',
    description: 'Decodifică un șir Base64 sau un URI de date înapoi într-o imagine descărcabilă.',
    metaDescription: 'Convertește un șir Base64 sau un URI de date într-o imagine online, gratuit. Previzualizează și descarcă PNG, JPG, WebP sau GIF decodat.',
    steps: [
      'Lipește un șir Base64 sau un URI de date complet.',
      'Imaginea este decodificată și previzualizată instantaneu.',
      'Descarcă imaginea.',
    ],
    faq: [
      { q: 'Am nevoie de prefixul „data:image/png;base64,”?', a: 'Nu. Fără prefix, instrumentul detectează formatul după semnătura fișierului (PNG, JPG, GIF, WebP).' },
      { q: 'De ce primesc o eroare?', a: 'Probabil șirul este trunchiat, conține caractere în plus sau nu este o imagine. Datele SVG sunt respinse aici și din motive de siguranță.' },
    ],
    limits: [
      'Acceptă PNG, JPG, GIF și WebP. SVG nu este afișat în mod intenționat.',
      'Maximum 10 MB de date decodificate.',
    ],
  },
  'image-color-picker': {
    name: 'Selector de culori din imagine',
    description: 'Alege culori exacte din orice imagine și extrage paleta ei dominantă.',
    metaDescription: 'Alege culori dintr-o imagine online, gratuit. Dă clic pe orice pixel pentru valori HEX, RGB și HSL și extrage o paletă de culori dominante.',
    steps: [
      'Adaugă o imagine.',
      'Dă clic sau atinge oriunde pe ea (sau folosește tastele săgeți) pentru a eșantiona un pixel.',
      'Copiază valoarea HEX, RGB sau HSL ori copiază din paleta extrasă.',
    ],
    faq: [
      { q: 'Cum este calculată paleta?', a: 'Imaginea este redusă ca rezoluție, iar culorile sunt grupate în intervale; sunt afișate cele mai frecvente. Este o aproximare a culorilor dominante, nu o listă exhaustivă.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'O singură imagine odată.',
      'Culorile sunt eșantionate din pixelii sRGB afișați; profilurile de culoare sunt ignorate.',
    ],
  },
  'image-watermark': {
    name: 'Filigran pentru imagini',
    description: 'Adaugă un filigran text sau logo pe mai multe imagini deodată, unic sau repetat.',
    metaDescription: 'Adaugă filigran pe imagini online, gratuit. Aplică text sau un logo pe fotografii JPG, PNG și WebP în lot, cu opacitate și poziție. Rulează în browser.',
    steps: [
      'Adaugă imaginile.',
      'Alege text sau un logo, apoi setează dimensiunea, opacitatea, poziția și aranjarea.',
      'Aplică-l și descarcă rezultatele sau un ZIP.',
    ],
    faq: [
      { q: 'Pot folosi urdu sau alte alfabete?', a: 'Da. Filigranele de pe imagini folosesc fonturile dispozitivului tău, așa că funcționează orice scriere pe care sistemul o poate afișa.' },
      { q: 'Se modifică originalele?', a: 'Nu. Copiile marcate sunt salvate ca fișiere noi.' },
      { q: 'Se păstrează datele EXIF sau de locație?', a: 'Nu. Recodificarea printr-un canvas elimină metadatele EXIF, cum ar fi modelul aparatului și locația GPS, ceea ce este adesea exact ce îți dorești înainte de a trimite o fotografie. Nici profilurile de culoare nu sunt păstrate.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Fișiere logo: PNG, JPG sau WebP, de până la 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG în PNG / JPG',
    description: 'Transformă grafica vectorială SVG în imagini PNG, JPG sau WebP la orice dimensiune.',
    metaDescription: 'Convertește SVG în PNG sau JPG online, gratuit. Alege o scară sau o lățime exactă pentru rezultate clare; PNG păstrează transparența. Rulează în browser.',
    steps: [
      'Adaugă fișierele SVG.',
      'Alege PNG, JPG sau WebP și dimensiunea de ieșire.',
      'Convertește și descarcă.',
    ],
    faq: [
      { q: 'Imaginea rămâne clară la dimensiuni mari?', a: 'Da. SVG-ul este desenat la dimensiunea pe care o alegi, așa că un export 4× este la fel de clar ca unul 1×.' },
      { q: 'De ce arată SVG-ul meu diferit?', a: 'Browserele nu acceptă toate funcțiile SVG, iar fișierele SVG care depind de fonturi sau imagini externe revin la valorile implicite. Încorporează fonturile și imaginile în SVG pentru cel mai bun rezultat.' },
      { q: 'Este sigur să deschid fișiere SVG aici?', a: 'Da. SVG-ul este desenat ca o imagine, așa că scripturile din el nu rulează.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Maximum 25 MB per fișier și 20 de fișiere per lot.',
      'Fonturile, imaginile și stilurile legate din exteriorul SVG-ului nu sunt încărcate.',
      'Un SVG fără dimensiune folosește viewBox sau, dacă lipsesc ambele, 300 × 150 px.',
    ],
  },
  'enlarge-image': {
    name: 'Mărire imagine',
    description: 'Mărește imaginile cu reeșantionare fină și clară, de la 2× la 4× sau la o lățime dată.',
    metaDescription: 'Mărește imagini online, gratuit. Scalează JPG, PNG și WebP de 2×, 3×, 4× sau la o lățime exactă, cu reeșantionare Lanczos și accentuare opțională.',
    steps: [
      'Adaugă imaginile.',
      'Alege un factor sau o lățime țintă și dacă vrei accentuare.',
      'Mărește și descarcă.',
    ],
    faq: [
      { q: 'Este mărire cu AI?', a: 'Nu. Folosește reeșantionare de înaltă calitate, care face imaginile mărite fine și curate, dar nu poate inventa detalii lipsă. Fotografiile foarte mici sau neclare vor rămâne totuși moi.' },
      { q: 'Cât de mare poate fi rezultatul?', a: 'Până la 16.000 px pe latură și aproximativ 100 de megapixeli, în funcție de ce poate gestiona browserul.' },
      { q: 'Se păstrează datele EXIF sau de locație?', a: 'Nu. Recodificarea printr-un canvas elimină metadatele EXIF, cum ar fi modelul aparatului și locația GPS, ceea ce este adesea exact ce îți dorești înainte de a trimite o fotografie. Nici profilurile de culoare nu sunt păstrate.' },
    ],
    limits: [
      'Fișierele GIF sau WebP animate sunt convertite folosind doar primul cadru.',
      'Maximum 25 MB per fișier și 20 de fișiere per lot, pentru ca browserul să rămână fluid.',
      'Metadatele EXIF și profilurile de culoare încorporate nu sunt păstrate.',
      'Nu adaugă detalii, deci nu este mărire cu AI.',
      'Ieșirea este plafonată la 16.000 px pe latură.',
    ],
  },
  'blur-image-area': {
    name: 'Estompare sau pixelare zonă',
    description: 'Ascunde fețe, numere de înmatriculare sau detalii private prin estompare, pixelare sau acoperire.',
    metaDescription: 'Estompează sau pixelează o parte dintr-o imagine online, gratuit. Desenează casete peste fețe, numere de înmatriculare sau text și ascunde-le în browser.',
    steps: [
      'Adaugă o imagine.',
      'Trage pe imagine pentru a desena casete peste ceea ce vrei să ascunzi.',
      'Alege estompare, pixelare sau o casetă neagră, aplică-l și descarcă.',
    ],
    faq: [
      { q: 'Este estomparea sigură pentru detalii sensibile?', a: 'Pentru orice trebuie să rămână privat, cum ar fi numere de identificare sau de înmatriculare, folosește caseta neagră. Estomparea și pixelarea pot fi uneori inversate parțial.' },
      { q: 'Găsește automat fețele?', a: 'Nu. Casetele le desenezi tu. Detecția automată necesită un model AI mare, care nu este inclus.' },
      { q: 'Mă pot răzgândi?', a: 'Da. Șterge sau redesenează casetele înainte de a aplica. Fișierul original nu este modificat niciodată.' },
      { q: 'Se păstrează datele EXIF sau de locație?', a: 'Nu. Recodificarea printr-un canvas elimină metadatele EXIF, cum ar fi modelul aparatului și locația GPS, ceea ce este adesea exact ce îți dorești înainte de a trimite o fotografie. Nici profilurile de culoare nu sunt păstrate.' },
    ],
    limits: [
      'O singură imagine odată, de până la 25 MB.',
      'Zonele se aleg manual; nu există detecție de fețe.',
      'Imaginile animate folosesc primul cadru.',
    ],
  },
  'qr-code-scanner': {
    name: 'Scanner de coduri QR',
    description: 'Citește coduri QR din fotografii și capturi de ecran și vezi exact ce conțin.',
    metaDescription: 'Scanează un cod QR dintr-o imagine online, gratuit. Încarcă o fotografie sau o captură de ecran pentru a citi linkul, textul sau datele Wi-Fi. Rulează în browser.',
    steps: [
      'Adaugă una sau mai multe imagini care conțin un cod QR.',
      'Codul este citit automat.',
      'Copiază rezultatul sau deschide un link după ce l-ai verificat.',
    ],
    faq: [
      { q: 'Pot scana cu camera?', a: 'Încă nu. Acest instrument citește coduri QR din fișiere imagine. Pe telefon, fotografiază codul și alege fotografia aici sau folosește aplicația camerei.' },
      { q: 'Este sigur să deschid linkurile scanate?', a: 'Verifică mai întâi adresa. Linkul complet este afișat, iar de aici pot fi deschise doar linkurile web (http sau https). Linkurile de tip script și de date nu sunt deschise niciodată.' },
      { q: 'De ce nu a fost găsit niciun cod?', a: 'Codul poate fi neclar, tăiat, prea mic sau cu contrast scăzut. Încearcă o imagine mai clară și mai apropiată, care arată tot codul, cu o margine liberă în jurul lui.' },
      { q: 'Imaginile mele sunt încărcate?', a: 'Nu. Imaginea este citită în browser, iar acest instrument nu o trimite nicăieri.' },
    ],
    limits: [
      'Până la 10 imagini, de câte 25 MB fiecare.',
      'Se citește un singur cod pe imagine.',
      'Doar coduri QR standard; alte coduri de bare nu sunt acceptate.',
    ],
  },
  'gif-maker': {
    name: 'Creator de GIF',
    description: 'Transformă-ți imaginile într-un GIF animat, cu durată, dimensiune și buclă personalizate.',
    metaDescription: 'Creează un GIF animat din imagini online, gratuit. Reordonează cadrele, setează întârzierea per cadru, alege dimensiunea și bucla, apoi descarcă GIF-ul. Creat în browser.',
    steps: [
      'Adaugă două sau mai multe imagini (sau doar una, pentru un GIF static).',
      'Trage-le în ordinea dorită, setează cât timp apare fiecare cadru și alege dimensiunea, bucla și culorile.',
      'Creează GIF-ul, previzualizează-l și descarcă-l.',
    ],
    faq: [
      { q: 'De ce este GIF-ul meu atât de mare?', a: 'GIF stochează fiecare cadru ca o imagine limitată la 256 de culori. Mai puține cadre, o lățime mai mică și mai puține culori reduc dimensiunea fișierului. Instrumentul afișează dimensiunea imediat ce GIF-ul este creat.' },
      { q: 'Pot păstra zonele transparente?', a: 'Da, activează „Păstrează zonele transparente” pentru imaginile PNG sau WebP cu transparență. Transparența GIF este activă sau inactivă pentru fiecare pixel, așa că marginile fine devin dure.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'Până la 100 de cadre; cu cât cadrele sunt mai mari, cu atât browserul are nevoie de mai multă memorie.',
      'GIF-urile sunt limitate la 256 de culori pe cadru, deci fotografiile pot arăta granulat.',
      'Fișierele animate (GIF, WebP) contribuie doar cu primul cadru.',
    ],
  },
  'photo-editor': {
    name: 'Editor foto',
    description: 'Ajustează, aplică filtre, rotește, decupează și adaugă text pe o fotografie, cu previzualizare în timp real.',
    metaDescription: 'Editor foto online gratuit. Ajustează culorile, aplică filtre, rotește, îndreaptă, decupează și adaugă text, apoi descarcă PNG, JPG sau WebP. Privat, în browser.',
    steps: [
      'Adaugă o fotografie.',
      'Folosește filele pentru a ajusta culorile, a aplica un filtru, a roti sau a decupa și a adăuga text. Previzualizarea se actualizează pe parcurs.',
      'Alege formatul și descarcă fotografia editată.',
    ],
    faq: [
      { q: 'Se modifică fișierul original?', a: 'Nu. Fișierul tău nu este modificat niciodată; imaginea editată este creată ca o descărcare nouă.' },
      { q: 'Se pierde calitate la export?', a: 'PNG păstrează fiecare pixel. JPG și WebP sunt cu pierderi; folosește o calitate de 90 sau mai mare ca fotografiile să arate la fel. Modificările se aplică la dimensiunea completă a imaginii, nu la cea din previzualizare.' },
      { q: 'Imaginile mele sunt încărcate pe un server?', a: 'Nu. Imaginea este decodificată și recodificată de browser cu ajutorul API-ului Canvas. Instrumentul nu trimite fișierul nicăieri.' },
    ],
    limits: [
      'O singură fotografie odată, de până la 25 MB și aproximativ 50 de megapixeli.',
      'Modificările se aplică într-o ordine fixă: rotire și decupare, ajustări de culoare, estompare și accentuare, vinietă, apoi text.',
      'Detaliile EXIF, cum ar fi locația, nu sunt copiate în imaginea editată.',
      'Fără straturi, pensule sau funcții AI.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG în PDF',
    description: 'Transformă fotografii JPG într-un PDF, cu câte o imagine pe pagină.',
    metaDescription: 'Convertește JPG în PDF online, gratuit. Alege dimensiunea paginii, orientarea și marginile. Datele JPEG sunt încorporate fără recomprimare.',
    steps: [
      'Adaugă fișierele JPG și trage-le sau folosește săgețile pentru a stabili ordinea.',
      'Alege dimensiunea paginii, orientarea și marginea.',
      'Creează PDF-ul și descarcă-l.',
    ],
    faq: [
      { q: 'Scade calitatea imaginii?', a: 'Nu. Fișierele JPG sunt încorporate în PDF așa cum sunt, fără recomprimare.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Maximum 25 MB per imagine și 100 de imagini per PDF.',
      'Aici sunt acceptate doar imagini JPG; folosește Imagini în PDF pentru formate mixte.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG în PDF',
    description: 'Transformă imagini PNG într-un PDF, păstrând transparența.',
    metaDescription: 'Convertește PNG în PDF online, gratuit. Alege dimensiunea paginii și marginile; transparența este păstrată. Rulează în browser.',
    steps: [
      'Adaugă fișierele PNG și stabilește ordinea lor.',
      'Alege dimensiunea paginii, orientarea și marginea.',
      'Creează PDF-ul și descarcă-l.',
    ],
    faq: [
      { q: 'Se păstrează transparența?', a: 'Da. Imaginile PNG sunt încorporate cu canalul alfa, așa că zonele transparente lasă să se vadă pagina albă din spate.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Maximum 25 MB per imagine și 100 de imagini per PDF.',
      'Aici sunt acceptate doar imagini PNG; folosește Imagini în PDF pentru formate mixte.',
    ],
  },
  'images-to-pdf': {
    name: 'Imagini în PDF',
    description: 'Combină imagini JPG și PNG într-un singur PDF, în ordinea aleasă de tine.',
    metaDescription: 'Combină mai multe imagini într-un singur PDF online, gratuit. Reordonează paginile, alege dimensiunea paginii și marginile. Procesare în browser.',
    steps: [
      'Adaugă imagini JPG și PNG (trage mai multe deodată).',
      'Reordonează-le și alege dimensiunea paginii, orientarea și marginea.',
      'Creează PDF-ul și descarcă-l.',
    ],
    faq: [
      { q: 'Ce formate de imagine funcționează?', a: 'JPG și PNG sunt încorporate direct. WebP, GIF și BMP sunt mai întâi convertite în PNG, dacă browserul le poate decodifica.' },
      { q: 'Ce face opțiunea „Potrivit imaginii”?', a: 'Fiecare pagină are dimensiunea imaginii sale, așa că nimic nu este scalat sau completat cu margini. Alege A4 sau Letter pentru pagini de document standard.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Maximum 25 MB per imagine și 100 de imagini per PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Îmbină PDF',
    description: 'Combină mai multe fișiere PDF într-un singur document, în ordinea aleasă de tine.',
    metaDescription: 'Îmbină fișiere PDF online, gratuit. Combină mai multe PDF-uri într-unul singur, reordonează-le și descarcă instantaneu. Procesare în browser.',
    steps: [
      'Adaugă două sau mai multe fișiere PDF.',
      'Pune-le în ordinea dorită cu ajutorul săgeților.',
      'Îmbină și descarcă PDF-ul combinat.',
    ],
    faq: [
      { q: 'Se păstrează marcajele și câmpurile de formular?', a: 'Paginile sunt copiate cu conținutul vizibil și cu linkurile. Marcajele la nivel de document și datele interactive din formulare nu sunt transferate.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Marcajele/structura și câmpurile de formular din fișierele sursă nu sunt îmbinate.',
    ],
  },
  'split-pdf': {
    name: 'Împarte PDF',
    description: 'Împarte un PDF după intervale de pagini, în pagini individuale sau în bucăți de dimensiune fixă.',
    metaDescription: 'Împarte un PDF online, gratuit. Separă după intervale de pagini, fiecare pagină sau la fiecare N pagini și descarcă ZIP-ul. Rulează în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege cum îl împarți: intervale personalizate, cum ar fi 1-3, 4-6, fiecare pagină sau la fiecare N pagini.',
      'Împarte și descarcă părțile individual sau într-un ZIP.',
    ],
    faq: [
      { q: 'Cum scriu intervalele?', a: 'Separă fișierele rezultate prin virgule. Fiecare fișier poate fi un interval (1-3), o singură pagină (5) sau o combinație separată prin plus (1-2+7). Exemplu: 1-3, 4-6, 7+9.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
    ],
  },
  'rotate-pdf': {
    name: 'Rotește PDF',
    description: 'Rotește pagini individuale sau întregul PDF, cu previzualizări în miniatură.',
    metaDescription: 'Rotește pagini PDF online, gratuit. Întoarce pagini individuale sau toate paginile cu 90, 180 sau 270 de grade și salvează un PDF nou. Rulează în browser.',
    steps: [
      'Adaugă un PDF; paginile apar ca miniaturi.',
      'Rotește pagini individuale sau rotește-le pe toate deodată.',
      'Salvează PDF-ul rotit.',
    ],
    faq: [
      { q: 'Rotirea este permanentă?', a: 'Este stocată în noul PDF ca atribut de rotire a paginii. Conținutul paginii nu este redesenat, deci nu se pierde nimic.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Extrage pagini PDF',
    description: 'Alege paginile de care ai nevoie dintr-un PDF și salvează-le ca document nou.',
    metaDescription: 'Extrage pagini dintr-un PDF online, gratuit. Selectează paginile vizual sau după interval și salvează un PDF nou. Procesare în browser.',
    steps: [
      'Adaugă un PDF.',
      'Dă clic pe miniaturile paginilor pentru a le selecta sau scrie un interval, cum ar fi 1-3, 8.',
      'Extrage și descarcă noul PDF.',
    ],
    faq: [
      { q: 'Îl pot folosi pentru a șterge pagini?', a: 'Da. Selectează paginile pe care vrei să le păstrezi și extrage-le; restul rămân în afara fișierului nou.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Reordonează paginile PDF',
    description: 'Rearanjează, elimină și rotește pagini vizual, apoi salvează rezultatul.',
    metaDescription: 'Reordonează paginile unui PDF online, gratuit. Trage sau mută pagini, șterge-le pe cele de care nu ai nevoie și salvează un PDF nou. Rulează în browser.',
    steps: [
      'Adaugă un PDF; paginile apar ca miniaturi.',
      'Trage paginile sau folosește butoanele cu săgeți pentru a le schimba ordinea. Elimină paginile de care nu ai nevoie.',
      'Salvează PDF-ul reordonat.',
    ],
    faq: [
      { q: 'Pot reordona de la tastatură?', a: 'Da. Folosește butoanele de mutare mai devreme și mai târziu de pe fiecare pagină.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF în JPG',
    description: 'Transformă paginile PDF în imagini JPG la rezoluția aleasă de tine.',
    metaDescription: 'Convertește PDF în JPG online, gratuit. Randează toate paginile sau o selecție la până la 300 DPI și descarcă un ZIP. Rulează în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege rezoluția și, opțional, ce pagini să fie convertite.',
      'Convertește și descarcă imaginile individual sau într-un ZIP.',
    ],
    faq: [
      { q: 'Ce rezoluție să aleg?', a: '150 DPI este potrivit pentru ecrane; 300 DPI pentru tipărire. Valorile mai mari creează imagini mai mari și necesită mai multă memorie.' },
      { q: 'Paginile sunt randate corect?', a: 'Randarea folosește PDF.js de la Mozilla, care se descurcă bine cu majoritatea PDF-urilor. Fonturile neobișnuite sau grafica avansată pot diferi ușor față de alte programe de vizualizare.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Fiecare pagină este plafonată la aproximativ 50 de megapixeli.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF în PNG',
    description: 'Transformă paginile PDF în imagini PNG clare, fără pierderi.',
    metaDescription: 'Convertește PDF în PNG online, gratuit. Randează paginile la până la 300 DPI ca imagini fără pierderi și descarcă un ZIP. Rulează în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege rezoluția și paginile.',
      'Convertește și descarcă imaginile individual sau într-un ZIP.',
    ],
    faq: [
      { q: 'De ce să aleg PNG în loc de JPG?', a: 'PNG rămâne clar la text și la desene în linii și acceptă transparența. Fișierele sunt mai mari decât JPG.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Fiecare pagină este plafonată la aproximativ 50 de megapixeli.',
    ],
  },
  'pdf-viewer': {
    name: 'Vizualizator PDF',
    description: 'Deschide și citește un PDF în mod privat în browser, cu zoom și navigare între pagini.',
    metaDescription: 'Vizualizează fișiere PDF online, gratuit. Mărește, sari la o pagină și citește documente în browser, fără să le încarci nicăieri.',
    steps: [
      'Adaugă un PDF.',
      'Derulează sau folosește comenzile de pagină pentru a naviga.',
      'Mărește sau micșorează după nevoie.',
    ],
    faq: [
      { q: 'Pot edita sau adnota PDF-ul aici?', a: 'Nu. Acesta este un vizualizator doar pentru citire. Folosește instrumentele pentru pagini pentru a roti, reordona sau extrage pagini.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Doar citire: fără adnotări, completarea formularelor sau căutare în text.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Vizualizator metadate PDF',
    description: 'Inspectează titlul, autorul, datele de creare, numărul de pagini, dimensiunile paginilor și versiunea unui PDF.',
    metaDescription: 'Vezi metadatele unui PDF online, gratuit. Consultă titlul, autorul, producătorul, datele, numărul de pagini și dimensiunile paginilor fără a încărca fișierul.',
    steps: [
      'Adaugă un PDF.',
      'Consultă proprietățile documentului.',
      'Copiază detaliile ca JSON, dacă ai nevoie de ele.',
    ],
    faq: [
      { q: 'De ce lipsesc unele metadate?', a: 'Multe PDF-uri nu completează toate câmpurile. Sunt afișate doar câmpurile stocate efectiv în fișier.' },
      { q: 'Pot elimina metadatele?', a: 'Acest instrument doar citește metadatele. Nu modifică fișierul.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Doar citire: metadatele nu pot fi editate sau eliminate aici.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Elimină pagini PDF',
    description: 'Șterge paginile de care nu ai nevoie și salvează restul ca PDF nou.',
    metaDescription: 'Elimină pagini dintr-un PDF online, gratuit. Selectează paginile vizual sau după interval, șterge-le și descarcă restul. Procesare în browser.',
    steps: [
      'Adaugă un PDF; paginile apar ca miniaturi.',
      'Dă clic pe paginile pe care vrei să le ștergi sau scrie un interval, cum ar fi 2, 5-7.',
      'Elimină-le și descarcă noul PDF.',
    ],
    faq: [
      { q: 'Se modifică fișierul meu original?', a: 'Nu. Primești un PDF nou, fără paginile selectate. Originalul rămâne neschimbat.' },
      { q: 'Pot elimina toate paginile?', a: 'Nu. Cel puțin o pagină trebuie să rămână.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
    ],
  },
  'add-page-numbers': {
    name: 'Adaugă numere de pagină',
    description: 'Numerotează paginile unui PDF, alegând poziția, formatul și stilul.',
    metaDescription: 'Adaugă numere de pagină într-un PDF online, gratuit. Alege poziția, un format precum „Pagina 1 din 10”, numărul de start și dimensiunea fontului. Rulează în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege unde se pun numerele, formatul lor și ce pagini se numerotează.',
      'Adaugă numerele și descarcă PDF-ul.',
    ],
    faq: [
      { q: 'Pot sări peste pagina de copertă?', a: 'Da. Setează „Prima pagină numerotată” la 2, apoi alege ce număr să afișeze.' },
      { q: 'Funcționează și pe pagini rotite?', a: 'Da. Numerele sunt plasate în funcție de ceea ce vezi pe ecran, inclusiv la paginile rotite.' },
      { q: 'Ce font este folosit?', a: 'Helvetica, care acoperă cifrele și literele latine.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Numerele sunt desenate deasupra fiecărei pagini, niciodată în spatele conținutului existent.',
      'Folosește fontul Helvetica încorporat.',
    ],
  },
  'watermark-pdf': {
    name: 'Filigran PDF',
    description: 'Aplică text sau o imagine pe paginile PDF-ului, cu opacitate și unghi reglabile.',
    metaDescription: 'Adaugă un filigran într-un PDF online, gratuit. Aplică text sau o imagine, centrat sau repetat, cu opacitate și rotire personalizate. Procesare în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege un filigran text sau imagine, apoi setează dimensiunea, opacitatea, unghiul și aranjarea.',
      'Aplică-l pe toate paginile sau pe o selecție, apoi descarcă.',
    ],
    faq: [
      { q: 'Poate fi eliminat filigranul?', a: 'Este desenat deasupra paginii și nu este o funcție de securitate. Oricine are un editor PDF îl poate elimina. Pentru o protecție mai puternică, combină-l cu Protejează PDF.' },
      { q: 'Pot folosi urdu, arabă sau alte alfabete?', a: 'Nu ca text tastat, deoarece fonturile încorporate în PDF acoperă doar literele latine. Creează un PNG transparent cu textul tău și folosește opțiunea cu imagine.' },
      { q: 'Filigranul este în fața sau în spatele textului paginii?', a: 'În față. Redu opacitatea pentru ca pagina să rămână lizibilă.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Filigranele text acceptă doar litere latine, cifre și simboluri uzuale.',
      'Imagini pentru filigran: PNG sau JPG, de până la 5 MB.',
      'Marcajul este desenat deasupra conținutului existent al paginii.',
    ],
  },
  'crop-pdf': {
    name: 'Decupează PDF',
    description: 'Taie marginile sau păstrează o zonă aleasă pe fiecare pagină, cu previzualizare în timp real a paginii.',
    metaDescription: 'Decupează pagini PDF online, gratuit. Trage o casetă de decupare pe previzualizarea paginii sau introdu marginile, apoi aplică-o pe toate paginile sau pe cele selectate.',
    steps: [
      'Adaugă un PDF și alege o pagină pentru previzualizare.',
      'Trage caseta sau introdu marginile pentru a selecta zona de păstrat.',
      'Alege paginile de decupat, apoi descarcă.',
    ],
    faq: [
      { q: 'Conținutul decupat este șters?', a: 'Nu. Decuparea schimbă zona vizibilă a fiecărei pagini, dar conținutul din afara ei rămâne în fișier. Nu te baza pe decupare pentru a ascunde informații sensibile.' },
      { q: 'Ce se întâmplă dacă paginile mele au dimensiuni diferite?', a: 'Aceleași proporții se aplică fiecărei pagini alese, așa că paginile de dimensiuni diferite sunt tăiate cu același procent.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Decuparea ascunde conținutul; nu îl șterge.',
      'Zona de decupare este o proporție din fiecare pagină, nu o dimensiune fixă în milimetri.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Editează metadatele PDF',
    description: 'Schimbă titlul, autorul, subiectul și cuvintele-cheie ale unui PDF sau elimină toate metadatele.',
    metaDescription: 'Editează metadatele unui PDF online, gratuit. Schimbă titlul, autorul, subiectul și cuvintele-cheie sau elimină toate proprietățile documentului. Procesare în browser.',
    steps: [
      'Adaugă un PDF; proprietățile lui actuale sunt completate.',
      'Editează câmpurile sau alege Elimină toate metadatele.',
      'Salvează și descarcă PDF-ul actualizat.',
    ],
    faq: [
      { q: 'Ce elimină „Elimină toate metadatele”?', a: 'Informațiile despre document (titlu, autor, subiect, cuvinte-cheie, creator, producător și date) și metadatele XMP încorporate. Nu atinge textul paginilor, imaginile sau comentariile.' },
      { q: 'De ce să editez metadatele?', a: 'Pentru a corecta un titlu greșit afișat în filele browserului și în rezultatele căutării, pentru a indica autorul corect sau pentru a elimina detaliile personale înainte de a trimite un fișier.' },
      { q: 'Acceptă text non-latin?', a: 'Da. Titlurile și autorii în urdu, arabă, chineză și alte scrieri sunt salvate corect.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Sunt modificate doar proprietățile la nivel de document. Comentariile, datele din formulare și conținutul paginilor rămân neschimbate.',
    ],
  },
  'protect-pdf': {
    name: 'Protejează PDF',
    description: 'Blochează un PDF cu o parolă, folosind criptare AES-256.',
    metaDescription: 'Protejează un PDF cu parolă online, gratuit. Criptarea AES-256 se face în browser; fișierul și parola ta nu sunt încărcate niciodată.',
    steps: [
      'Adaugă un PDF.',
      'Scrie parola de două ori și alege ce pot face cititorii (tipărire, copiere, editare).',
      'Protejează-l și descarcă copia criptată.',
    ],
    faq: [
      { q: 'Cât de puternică este protecția?', a: 'Fișierele sunt criptate cu AES-256, cel mai puternic standard de criptare PDF. În practică, siguranța depinde de parola ta: folosește una lungă, pe care nu o folosești în altă parte.' },
      { q: 'Ce fac dacă uit parola?', a: 'Nu poate fi recuperată. Nimic nu este stocat sau trimis nicăieri și nu există resetare. Păstrează fișierul original și parola într-un loc sigur.' },
      { q: 'Opțiunile de tipărire, copiere și editare sunt impuse?', a: 'Sunt solicitări pe care majoritatea programelor PDF le respectă, dar nu sunt imposibil de ocolit. Parola este cea care protejează cu adevărat fișierul.' },
      { q: 'Parola mea este încărcată?', a: 'Nu. Criptarea se face în browser.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'Parole: până la 127 de caractere standard (litere, cifre și simboluri).',
      'Un PDF care are deja o parolă trebuie deblocat mai întâi.',
      'Cititoarele PDF foarte vechi (de dinainte de aproximativ 2008) pot să nu deschidă fișierele AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Deblochează PDF',
    description: 'Elimină parola unui PDF la care ai acces, ca să se deschidă liber.',
    metaDescription: 'Deblochează un PDF protejat cu parolă online, gratuit. Introdu parola pentru a salva o copie neprotejată, procesată în browser și niciodată încărcată.',
    steps: [
      'Adaugă PDF-ul protejat.',
      'Introdu parola, dacă ți se cere. PDF-urile care doar restricționează tipărirea sau copierea nu au nevoie de ea.',
      'Descarcă copia deblocată.',
    ],
    faq: [
      { q: 'Poate debloca un PDF dacă am uitat parola?', a: 'Nu. Acest instrument nu ghicește și nu sparge niciodată parole. Elimină protecția doar când furnizezi parola corectă sau când fișierul doar restricționează acțiuni precum tipărirea.' },
      { q: 'Este permis acest lucru?', a: 'Folosește-l doar pe fișiere care îți aparțin sau pe care ai permisiunea să le deschizi. Ești responsabil pentru modul în care folosești rezultatul.' },
      { q: 'Parola mea este încărcată?', a: 'Nu. Totul se întâmplă în browser.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'Acceptă protecția standard cu parolă a PDF-urilor (RC4 și AES).',
      'O semnătură digitală devine invalidă după ce fișierul este salvat din nou.',
      'Fișierele protejate pe bază de certificat sau DRM nu sunt acceptate.',
    ],
  },
  'extract-pdf-text': {
    name: 'Extrage text din PDF',
    description: 'Copiază tot textul selectabil dintr-un PDF, pagină cu pagină.',
    metaDescription: 'Extrage text dintr-un PDF online, gratuit. Obține textul selectabil al fiecărei pagini sau al unui interval, apoi copiază-l sau salvează-l ca .txt. Rulează în browser.',
    steps: [
      'Adaugă un PDF.',
      'Alege toate paginile sau un interval și dacă să fie marcate sfârșiturile de pagină.',
      'Copiază textul sau descarcă-l ca fișier .txt.',
    ],
    faq: [
      { q: 'De ce este rezultatul gol?', a: 'PDF-ul este probabil o scanare, adică o imagine a textului, nu text real. Citirea lui necesită OCR (recunoașterea textului), pe care acest instrument nu o face.' },
      { q: 'Se păstrează aspectul?', a: 'Rândurile și paragrafele sunt reconstruite cât mai bine, dar coloanele, tabelele și notele de subsol pot apărea într-o altă ordine.' },
      { q: 'Poate deschide PDF-uri protejate cu parolă?', a: 'Nu. PDF-urile criptate sunt detectate și respinse cu un mesaj clar. Elimină mai întâi parola cu instrumentul nostru Deblochează PDF.' },
    ],
    limits: [
      'Maximum 100 MB per PDF.',
      'PDF-urile protejate cu parolă (criptate) nu sunt acceptate.',
      'PDF-urile foarte mari sau complexe depind de memoria dispozitivului tău.',
      'Se extrage doar textul real; paginile scanate necesită OCR.',
      'Ordinea de citire urmează PDF-ul și poate diferi de ordinea vizuală în aranjamentele complexe.',
    ],
  },
  'compress-pdf': {
    name: 'Comprimă PDF',
    description: 'Micșorează un PDF recomprimându-i imaginile, în timp ce textul rămâne selectabil.',
    metaDescription: 'Comprimă PDF online, gratuit. Recomprimă imaginile încorporate pentru a reduce dimensiunea, cu text selectabil, sau aplatizează paginile pentru cel mai mic fișier.',
    steps: [
      'Adaugă PDF-ul.',
      'Alege cum și cât de puternic să fie comprimat: modul implicit păstrează textul selectabil și recomprimă doar imaginile.',
      'Comprimă, verifică dimensiunea economisită și descarcă rezultatul.',
    ],
    faq: [
      { q: 'De ce nu s-a micșorat aproape deloc PDF-ul meu?', a: 'Modul standard recomprimă imaginile JPEG, deci ajută cel mai mult la PDF-urile pline de fotografii sau scanări. Un PDF care conține mai ales text sau ale cărui imagini sunt deja mici nu se poate micșora mult. Instrumentul îți spune când nu a putut economisi nimic, în loc să se prefacă.' },
      { q: 'Se va înrăutăți calitatea?', a: 'Imaginile pierd puțin din detalii în schimbul dimensiunii; Ușor le păstrează aproape neschimbate, iar Puternic le face vizibil mai moi. Textul și grafica vectorială nu sunt atinse în modul standard. Modul „Maxim” transformă fiecare pagină într-o imagine, deci textul nu mai poate fi selectat sau căutat.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Sunt recomprimate doar imaginile JPEG încorporate. Imaginile de tip PNG (Flate), fonturile și restul conținutului rămân neschimbate.',
      'Modul Maxim convertește fiecare pagină într-o imagine: textul, linkurile și câmpurile de formular nu mai funcționează, iar fișierul nu mai poate fi căutat.',
      'Culorile imaginilor recomprimate se pot schimba foarte ușor.',
      'Maximum 100 MB per PDF. PDF-urile protejate cu parolă trebuie deblocate mai întâi.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Recunoaște textul din PDF-urile scanate (în engleză) și obține un PDF în care se poate căuta.',
    metaDescription: 'OCR PDF online, gratuit. Recunoaște textul în limba engleză din PDF-uri scanate și descarcă un PDF cu text căutabil sau text simplu. Motorul OCR rulează local în browser.',
    steps: [
      'Adaugă un PDF scanat.',
      'Alege paginile și calitatea. Paginile care conțin deja text selectabil pot fi omise.',
      'Rulează OCR, verifică textul recunoscut și descarcă PDF-ul căutabil sau un fișier text.',
    ],
    faq: [
      { q: 'Ce limbi sunt acceptate?', a: 'Deocamdată doar engleza. Textul în alte limbi va fi citit greșit. Se pot adăuga mai multe limbi ulterior, fără a schimba modul de funcționare al instrumentului.' },
      { q: 'Documentul meu este trimis unui serviciu OCR?', a: 'Nu. Motorul de recunoaștere (Tesseract, compilat în WebAssembly) și datele lui pentru engleză sunt servite de acest site și rulează în browserul tău. Documentul nu este încărcat.' },
      { q: 'Cât de precis este?', a: 'Scanările curate și drepte ale textului tipărit, la 200–300 DPI, funcționează cel mai bine. Scrisul de mână, textul foarte mic, paginile cu contrast scăzut sau înclinate produc mai multe greșeli. Verifică întotdeauna numerele importante.' },
    ],
    limits: [
      'Doar engleză. Scrisul de mână nu este recunoscut în mod fiabil.',
      'Paginile originale sunt păstrate exact așa cum sunt; se adaugă un strat de text invizibil, astfel încât textul să poată fi căutat și copiat.',
      'OCR este lent la documentele mari (câteva secunde pe pagină). La prima rulare se încarcă și motorul (aproximativ 3 MB).',
      'Maximum 100 MB per PDF. Paginile foarte mari pot fi refuzate pentru a proteja browserul.',
    ],
  },
  'sign-pdf': {
    name: 'Semnează PDF',
    description: 'Desenează, scrie sau încarcă o semnătură și așaz-o pe paginile PDF-ului.',
    metaDescription: 'Semnează un PDF online, gratuit. Desenează, scrie sau încarcă semnătura, plasează-o pe orice pagini și descarcă PDF-ul semnat. Semnătură vizuală, în browser.',
    steps: [
      'Adaugă PDF-ul pe care trebuie să-l semnezi.',
      'Creează-ți semnătura desenând-o, scriindu-ți numele sau încărcând o imagine.',
      'Trage semnătura în locul potrivit de pe pagină, alege paginile pe care apare și descarcă PDF-ul semnat.',
    ],
    faq: [
      { q: 'Este o semnătură digitală cu valoare juridică?', a: 'Este o semnătură vizuală: o imagine a semnăturii tale plasată pe pagină. Nu este o semnătură digitală criptografică, nu are certificat și nu poate dovedi cine a semnat sau detecta modificări ulterioare. Acceptarea ei depinde de cel care o cere. Unele organizații cer servicii de semnătură electronică certificate.' },
      { q: 'Semnătura mea este stocată undeva?', a: 'Nu. Este creată în browser, folosită doar pentru acest fișier și uitată când părăsești sau reîncarci pagina.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Doar semnătură vizuală: fără certificat, fără marcă temporală, fără detectarea modificărilor.',
      'Semnătura este plasată ca imagine deasupra paginii; nu completează un câmp de semnătură din formular.',
      'Maximum 100 MB per PDF. PDF-urile protejate cu parolă trebuie deblocate mai întâi.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Completează formulare PDF',
    description: 'Completează casetele de text, casetele de selectare și meniurile unui formular PDF completabil.',
    metaDescription: 'Completează formulare PDF online, gratuit. Scrie în câmpuri, bifează casete și alege opțiuni într-un PDF completabil, apoi descarcă-l editabil sau aplatizat. În browser.',
    steps: [
      'Adaugă un formular PDF completabil.',
      'Completează câmpurile listate sub numele fișierului. Câmpurile sunt grupate pe pagini.',
      'Alege dacă formularul rămâne editabil sau este aplatizat, apoi descarcă PDF-ul completat.',
    ],
    faq: [
      { q: 'PDF-ul meu nu afișează câmpuri. De ce?', a: 'Aici pot fi completate doar PDF-urile cu câmpuri de formular reale. Un formular care este doar o imagine sau text simplu nu are câmpuri; folosește Semnează PDF pentru a plasa o semnătură sau instrumentul Filigran pentru a adăuga text. Formularele create cu XFA (unele formulare guvernamentale și bancare) nu sunt acceptate.' },
      { q: 'Ce face aplatizarea?', a: 'Aplatizarea înglobează răspunsurile în pagină și elimină câmpurile formularului, astfel încât răspunsurile nu mai pot fi editate. Folosește-o pentru copia pe care o trimiți; păstrează pentru tine o copie editabilă.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Textul poate conține litere latine, cifre și simboluri uzuale (fontul formularului nu are alte alfabete).',
      'Câmpurile de semnătură și butoanele sunt afișate, dar nu pot fi completate; folosește Semnează PDF pentru semnături.',
      'Formularele XFA (dinamice) nu sunt acceptate.',
      'Maximum 100 MB per PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Redactează PDF',
    description: 'Înnegrește definitiv text și zone: paginile redactate sunt reconstruite ca imagini.',
    metaDescription: 'Redactează un PDF online, gratuit. Înnegrește nume, numere și zone, astfel încât textul de dedesubt este eliminat cu adevărat, nu doar acoperit. Rulează în browser; nimic nu este încărcat.',
    steps: [
      'Adaugă PDF-ul și alege o pagină.',
      'Desenează casete peste ce trebuie să dispară sau caută cuvinte, e-mailuri și numere pentru a le marca automat.',
      'Aplică redactările și descarcă. Verifică întotdeauna rezultatul înainte de a-l trimite.',
    ],
    faq: [
      { q: 'Textul ascuns este eliminat cu adevărat?', a: 'Da. Fiecare pagină care are o redactare este reconstruită ca imagine, cu casetele negre pictate în ea, așa că textul și obiectele de dedesubt nu există în fișierul nou. Un dreptunghi negru desenat peste text, cum fac multe instrumente, ar lăsa textul selectabil. Paginile pe care nu le-ai redactat sunt copiate neschimbate.' },
      { q: 'De ce nu mai pot selecta text pe paginile redactate?', a: 'Pentru că acele pagini sunt acum imagini. Așa este distrus conținutul de dedesubt. Rulează OCR PDF după aceea dacă ai nevoie de text căutabil; cuvintele redactate rămân negre.' },
      { q: 'Găsește automat toate potrivirile?', a: 'Căutarea marchează potrivirile aflate pe un singur rând de text. O expresie pe care un PDF o împarte în bucăți sau textul care face parte dintr-o imagine pot fi ratate. Verifică fiecare pagină și desenează casete manual unde este nevoie.' },
    ],
    limits: [
      'Paginile redactate devin imagini: fără text selectabil, linkuri sau câmpuri de formular pe acele pagini.',
      'Căutarea automată funcționează doar pe text selectabil și doar într-o singură secvență de text; paginile scanate necesită casete desenate manual.',
      'Proprietățile documentului (titlu, autor…) sunt eliminate din rezultat, cu excepția cazului în care alegi să le păstrezi.',
      'Maximum 100 MB per PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Compară PDF',
    description: 'Vezi ce s-a schimbat între două PDF-uri: diferențe de text și pagini evidențiate.',
    metaDescription: 'Compară două fișiere PDF online, gratuit. Vezi cuvintele adăugate și eliminate pagină cu pagină și evidențiază diferențele vizuale dintre versiuni. Procesare în browser.',
    steps: [
      'Adaugă PDF-ul original și PDF-ul revizuit.',
      'Compară-le: paginile sunt listate cu numărul de cuvinte adăugate și eliminate.',
      'Deschide o pagină pentru a citi modificările de text sau treci la vizualizarea vizuală pentru a vedea zonele modificate în roșu.',
    ],
    faq: [
      { q: 'Ce arată compararea textului?', a: 'Pentru fiecare pagină, cuvintele adăugate (verde) și eliminate (roșu) între documentul original și cel revizuit, cu textul neschimbat restrâns. Paginile sunt asociate după număr.' },
      { q: 'Ce se întâmplă cu PDF-urile scanate?', a: 'Scanările nu au text selectabil, deci compararea textului nu găsește nimic. Folosește compararea vizuală sau rulează mai întâi OCR PDF pe ambele fișiere.' },
      { q: 'PDF-ul meu este încărcat undeva?', a: 'Nu. PDF-ul este citit și rescris de browserul tău. Instrumentul nu trimite fișierul către un server.' },
    ],
    limits: [
      'Paginile sunt comparate după număr: dacă a fost inserată o pagină, paginile următoare vor apărea ca modificate.',
      'Compararea vizuală randează fiecare pagină la rezoluția ecranului; diferențele minuscule sub acest nivel pot să nu apară.',
      'Se compară până la 100 de pagini per fișier. PDF-urile protejate cu parolă trebuie deblocate mai întâi.',
    ],
  },
  'word-counter': {
    name: 'Numărător de cuvinte',
    description: 'Numără cuvintele, caracterele și propozițiile și estimează timpul de citire pe măsură ce scrii.',
    metaDescription: 'Numărător de cuvinte online gratuit. Numără cuvinte, caractere, propoziții și paragrafe și estimează instant timpul de citire și de vorbire.',
    steps: [
      'Scrie sau lipește textul.',
      'Citește statisticile în timp real de deasupra editorului.',
      'Folosește Șterge pentru a o lua de la capăt.',
    ],
    faq: [
      { q: 'Cum sunt numărate cuvintele?', a: 'Un cuvânt este orice șir de caractere separat prin spații. Cuvintele cu cratimă contează ca unul, iar numerele contează ca cuvinte.' },
      { q: 'Cum se calculează timpul de citire?', a: 'Timpul de citire presupune 238 de cuvinte pe minut, iar timpul de vorbire 150 de cuvinte pe minut, medii tipice pentru adulți.' },
    ],
    limits: [
      'Numărătoarea se bazează pe spații, deci limbile scrise fără spații (cum ar fi chineza sau japoneza) vor afișa un cuvânt pentru fiecare șir de text.',
    ],
  },
  'character-counter': {
    name: 'Numărător de caractere',
    description: 'Numără caracterele cu și fără spații și verifică textul față de limitele de lungime uzuale.',
    metaDescription: 'Numărător de caractere online gratuit. Numără caracterele cu și fără spații, octeții și rândurile și verifică limitele pentru postări, metaetichete și SMS.',
    steps: [
      'Scrie sau lipește textul.',
      'Citește totalurile și barele de limită.',
      'Ajustează textul până se încadrează.',
    ],
    faq: [
      { q: 'Emoji-urile sunt numărate ca un singur caracter?', a: 'Da. Numărătorul numără caracterele vizibile (clustere de grafeme), deci un emoji contează ca unul, deși folosește mai mulți octeți.' },
      { q: 'De ce diferă limitele pentru SMS?', a: 'Lungimea unui SMS depinde de codificare. Mesajele cu caractere non-latine sau emoji au o limită mai mică decât referința de 160 de caractere afișată aici.' },
    ],
    limits: [
      'Limitele afișate sunt recomandări uzuale și se schimbă în timp; verifică regula actuală a fiecărei platforme.',
    ],
  },
  'case-converter': {
    name: 'Convertor de majuscule și minuscule',
    description: 'Convertește textul în majuscule, minuscule, titlu, propoziție, camel, snake, kebab și altele.',
    metaDescription: 'Convertor de majuscule și minuscule online gratuit. Schimbă textul în MAJUSCULE, minuscule, Title Case, Sentence case, camelCase, snake_case, kebab-case și altele.',
    steps: [
      'Lipește textul.',
      'Alege tipul de scriere dorit.',
      'Copiază rezultatul convertit.',
    ],
    faq: [
      { q: 'Title Case ține cont de cuvintele scurte?', a: 'Da. Cuvintele scurte, precum „a”, „of” și „the”, rămân cu litere mici, cu excepția cazului în care încep sau încheie textul.' },
    ],
    limits: [
      'Title case urmează regulile de stil uzuale din engleză și poate să nu se potrivească cu orice ghid de stil.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Elimină rândurile duplicate',
    description: 'Elimină rândurile repetate dintr-o listă, păstrând ordinea inițială.',
    metaDescription: 'Eliminator de rânduri duplicate online gratuit. Șterge rândurile repetate din liste, cu opțiuni pentru majuscule/minuscule, spații și rânduri goale.',
    steps: [
      'Lipește lista, câte un element pe rând.',
      'Alege dacă diferența dintre majuscule și minuscule și spațiile contează.',
      'Copiază rezultatul fără duplicate.',
    ],
    faq: [
      { q: 'Care exemplar al unui duplicat este păstrat?', a: 'Prima apariție este păstrată, iar cele următoare sunt eliminate, astfel încât ordinea inițială se păstrează.' },
    ],
    limits: [
      'Funcționează doar pe rânduri întregi.',
    ],
  },
  'text-sorter': {
    name: 'Sortare text',
    description: 'Sortează rândurile alfabetic, numeric, după lungime sau aleatoriu.',
    metaDescription: 'Sortator de text online gratuit. Sortează rândurile A–Z, Z–A, numeric, după lungime sau amestecă-le, cu ordonare fără distincție de majuscule și naturală.',
    steps: [
      'Lipește rândurile.',
      'Alege o metodă de sortare și opțiunile.',
      'Copiază lista sortată.',
    ],
    faq: [
      { q: 'Ce este sortarea naturală?', a: 'Sortarea naturală compară numerele din text după valoare, astfel încât „item2” apare înaintea lui „item10”.' },
    ],
    limits: [
      'Sortarea alfabetică folosește regulile de limbă ale browserului tău.',
    ],
  },
  'text-cleaner': {
    name: 'Curățare text',
    description: 'Elimină spațiile de la capete, comprimă spațiile, șterge rândurile goale și elimină caracterele invizibile.',
    metaDescription: 'Curățător de text online gratuit. Elimină spațiile în plus, rândurile goale, întreruperile de rând, caracterele invizibile și ghilimelele tipografice din textul lipit.',
    steps: [
      'Lipește textul.',
      'Bifează opțiunile de curățare de care ai nevoie.',
      'Copiază textul curățat.',
    ],
    faq: [
      { q: 'Ce sunt caracterele invizibile?', a: 'Spațiile de lățime zero, cratimele opționale și marcajele de ordine a octeților (BOM) apar adesea la copierea din pagini web și pot strica codul sau comparațiile.' },
    ],
    limits: [
      'Operațiile sunt aplicate într-o ordine fixă; rulează instrumentul de două ori dacă ai nevoie de o altă succesiune.',
    ],
  },
  'text-diff-checker': {
    name: 'Comparare texte',
    description: 'Compară două texte și vezi exact ce rânduri și cuvinte s-au schimbat.',
    metaDescription: 'Comparator de texte online gratuit. Compară două versiuni ale unui text una lângă alta și evidențiază rândurile sau cuvintele adăugate, eliminate și modificate.',
    steps: [
      'Lipește textul original în stânga și textul modificat în dreapta.',
      'Alege compararea pe rânduri sau pe cuvinte.',
      'Examinează modificările evidențiate.',
    ],
    faq: [
      { q: 'Care este diferența dintre modul pe rânduri și cel pe cuvinte?', a: 'Modul pe rânduri marchează rândurile întregi care s-au schimbat. Modul pe cuvinte evidențiază cuvintele exacte din text, ceea ce se potrivește pentru proză.' },
    ],
    limits: [
      'Textele foarte mari (peste aproximativ 200.000 de caractere) pot fi lente.',
    ],
  },
  'json-formatter': {
    name: 'Formatare JSON',
    description: 'Formatează și aranjează JSON, cu indentare și sortare a cheilor la alegere.',
    metaDescription: 'Formatator JSON online gratuit. Aranjează JSON cu 2 sau 4 spații ori tabulatori, sortează cheile și vezi locația exactă a erorilor.',
    steps: [
      'Lipește JSON-ul.',
      'Alege indentarea și sortarea.',
      'Copiază sau descarcă rezultatul formatat.',
    ],
    faq: [
      { q: 'JSON-ul meu este trimis unui server?', a: 'Nu. Analiza și formatarea se fac în browser, cu parserul JSON încorporat.' },
      { q: 'De ce îmi respinge JSON-ul?', a: 'JSON strict nu permite comentarii, virgule finale sau ghilimele simple. Mesajul de eroare arată rândul și coloana problemei.' },
    ],
    limits: [
      'Numerele mai mari decât 2^53 pierd precizie, deoarece browserul le interpretează ca numere în virgulă mobilă.',
    ],
  },
  'json-validator': {
    name: 'Validare JSON',
    description: 'Verifică dacă un JSON este valid și află rândul și coloana exactă a oricărei erori.',
    metaDescription: 'Validator JSON online gratuit. Verifică sintaxa JSON și găsește rândul și coloana exactă a erorilor, cu un rezumat al structurii.',
    steps: [
      'Lipește JSON-ul.',
      'Vezi instantaneu dacă este valid.',
      'Corectează eroarea raportată și verifică din nou.',
    ],
    faq: [
      { q: 'Validează și față de o schemă JSON Schema?', a: 'Nu. Verifică doar sintaxa: dacă textul este JSON bine format.' },
    ],
    limits: [
      'Doar validarea sintaxei; validarea JSON Schema nu este inclusă.',
    ],
  },
  'json-minifier': {
    name: 'Minimizare JSON',
    description: 'Elimină spațiile din JSON pentru a-l face cât mai compact.',
    metaDescription: 'Minimizator JSON online gratuit. Elimină spațiile din JSON pentru a micșora volumul de date și vezi câți octeți ai economisit.',
    steps: [
      'Lipește JSON-ul.',
      'Rezultatul minimizat apare împreună cu spațiul economisit.',
      'Copiază-l sau descarcă-l.',
    ],
    faq: [
      { q: 'Minimizarea schimbă datele?', a: 'Nu. Sunt eliminate doar spațiile fără semnificație; cheile, valorile și ordinea rămân neschimbate.' },
    ],
    limits: [
      'Numerele mai mari decât 2^53 pierd precizie, deoarece browserul le interpretează ca numere în virgulă mobilă.',
    ],
  },
  'xml-formatter': {
    name: 'Formatare XML',
    description: 'Aranjează sau minimizează XML și depistează etichetele nepotrivite sau neînchise.',
    metaDescription: 'Formatator XML online gratuit. Aranjează sau minimizează XML cu indentare reglabilă și depistează etichetele nepotrivite sau neînchise.',
    steps: [
      'Lipește XML-ul.',
      'Alege Formatează sau Minimizează și indentarea.',
      'Copiază rezultatul.',
    ],
    faq: [
      { q: 'Cât de amănunțit este validat XML-ul?', a: 'Instrumentul verifică imbricarea etichetelor, etichetele neînchise și comentariile sau secțiunile CDATA neterminate. Nu validează față de o schemă DTD sau XSD.' },
    ],
    limits: [
      'Doar verificări structurale; fără validare DTD sau XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Codificare / decodificare URL',
    description: 'Codifică procentual sau decodifică URL-uri și valori din șirul de interogare.',
    metaDescription: 'Codificator și decodificator URL online gratuit. Codifică procentual textul pentru URL-uri sau decodifică șiruri codificate, pentru URL-uri întregi sau componente.',
    steps: [
      'Alege Codifică sau Decodifică.',
      'Lipește textul sau URL-ul.',
      'Copiază rezultatul.',
    ],
    faq: [
      { q: 'Componentă sau URL complet?', a: 'Folosește Componentă pentru o singură valoare, cum ar fi un parametru de interogare; aceasta codifică caractere precum / ? & =. Folosește URL complet pentru a lăsa structura URL-ului intactă.' },
    ],
    limits: [
      'Decodificarea eșuează la secvențe procentuale malformate, cum ar fi un % izolat.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Codificare / decodificare HTML',
    description: 'Transformă caracterele speciale în entități HTML sau decodifică entitățile înapoi în text.',
    metaDescription: 'Codificator și decodificator HTML online gratuit. Transformă <, >, & și ghilimelele în entități HTML sau decodifică entități cu nume și numerice.',
    steps: [
      'Alege Codifică sau Decodifică.',
      'Lipește textul.',
      'Copiază rezultatul.',
    ],
    faq: [
      { q: 'Codificarea face datele introduse de utilizatori sigure pentru HTML?', a: 'Transformarea celor cinci caractere speciale face textul sigur în conținutul elementelor HTML și în atributele între ghilimele. Nu înlocuiește o bibliotecă de șabloane sau un sanitizator adecvat în alte contexte.' },
    ],
    limits: [
      'Decodificarea acceptă entitățile cu nume uzuale și toate entitățile numerice.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Codificare / decodificare Base64',
    description: 'Codifică text în Base64 sau decodifică Base64 înapoi în text, cu suport complet UTF-8.',
    metaDescription: 'Codificator și decodificator Base64 online gratuit. Convertește text în Base64 și invers, cu suport UTF-8 și alfabet opțional sigur pentru URL.',
    steps: [
      'Alege Codifică sau Decodifică.',
      'Lipește textul.',
      'Copiază rezultatul.',
    ],
    faq: [
      { q: 'Base64 este criptare?', a: 'Nu. Base64 este o codificare, nu o criptare. Oricine o poate decodifica, așa că nu o folosi niciodată pentru a proteja secrete.' },
      { q: 'Ce este Base64 sigur pentru URL?', a: 'Înlocuiește + și / cu - și _ și elimină completarea cu =, astfel încât valoarea să poată sta în siguranță în URL-uri și în nume de fișiere.' },
    ],
    limits: [
      'Pentru date de imagine folosește Imagine în Base64 și Base64 în imagine.',
    ],
  },
  'regex-tester': {
    name: 'Testare expresii regulate',
    description: 'Testează expresii regulate JavaScript, cu evidențierea potrivirilor în timp real și grupuri de captură.',
    metaDescription: 'Tester de expresii regulate online gratuit pentru JavaScript. Vezi potrivirile în timp real, grupurile de captură și grupurile cu nume și previzualizează înlocuirile.',
    steps: [
      'Introdu un tipar și alege indicatorii.',
      'Lipește textul de testat.',
      'Examinează potrivirile, grupurile și previzualizarea înlocuirii.',
    ],
    faq: [
      { q: 'Ce variantă de expresii regulate este folosită?', a: 'Expresii regulate JavaScript (ECMAScript), așa cum sunt implementate de browserul tău. PCRE, Python și alte variante diferă în unele funcții.' },
      { q: 'De ce îmi îngheață pagina la unele tipare?', a: 'Tiparele cu repetări imbricate pot face backtracking catastrofal. Potrivirea rulează într-un worker în fundal și este oprită după 1,5 secunde, deci un tipar scăpat de sub control nu poate îngheța pagina, dar tot ar trebui să eviți tipare precum (a+)+.' },
    ],
    limits: [
      'Doar sintaxa de expresii regulate JavaScript.',
      'Potrivirea se oprește după 5.000 de potriviri sau 1,5 secunde.',
    ],
  },
  'markdown-previewer': {
    name: 'Previzualizare Markdown',
    description: 'Scrie Markdown și vezi alături o previzualizare în timp real, sigură și sanitizată.',
    metaDescription: 'Previzualizator Markdown online gratuit. Scrie Markdown în stil GitHub și vezi o previzualizare HTML sanitizată în timp real, apoi copiază HTML-ul.',
    steps: [
      'Scrie sau lipește Markdown în stânga.',
      'Vezi rezultatul randat în dreapta.',
      'Copiază Markdown-ul sau HTML-ul generat.',
    ],
    faq: [
      { q: 'Previzualizarea este sigură?', a: 'Da. HTML-ul generat este sanitizat cu DOMPurify înainte de afișare, deci scripturile și gestionarii de evenimente sunt eliminați.' },
    ],
    limits: [
      'Markdown în stil GitHub prin biblioteca marked; fără extensii pentru formule matematice sau diagrame.',
    ],
  },
  'password-generator': {
    name: 'Generator de parole',
    description: 'Creează parole puternice: complet aleatorii sau memorabile, construite pe nume și cuvinte.',
    metaDescription: 'Generator de parole gratuit: parole complet aleatorii sau bazate pe nume, precum Nvidia132@Star, cu numere, majuscule și simboluri aleatorii. Rulează în browser.',
    steps: [
      'Alege un stil: Nume + cuvânt pentru ceva memorabil sau Complet aleatoriu pentru securitate maximă.',
      'Setează lungimea, câte parole ai nevoie și ce tipuri de caractere să fie incluse.',
      'Copiază o parolă și păstreaz-o într-un manager de parole.',
    ],
    faq: [
      { q: 'Parolele generate sunt stocate sau trimise undeva?', a: 'Nu. Parolele sunt generate în browser cu crypto.getRandomValues și nu sunt transmise sau salvate niciodată.' },
      { q: 'Este sigură o parolă precum Tesla2026#Tech?', a: 'Este mai bună decât un cuvânt simplu, dar mai slabă decât un text aleatoriu. Cine încearcă să o ghicească poate porni de la liste de nume cunoscute, așa că puterea reală vine din numărul de posibilități, afișat în biți. Folosește parole bazate pe nume pentru conturi cu risc scăzut și parole complet aleatorii pentru e-mail, servicii bancare și manageri de parole.' },
      { q: 'De ce doar câteva simboluri?', a: 'Parolele generate folosesc doar cele patru simboluri @ # $ *, pentru că sunt acceptate de aproape orice site și se tastează ușor pe orice tastatură.' },
      { q: 'Cât de lungă ar trebui să fie o parolă?', a: 'Cel puțin 16 caractere pentru conturile importante. Lungimea contează mai mult decât complexitatea.' },
    ],
    limits: [
      'Parolele bazate pe nume sunt mai ușor de ținut minte, dar mai slabe decât cele complet aleatorii. Puterea afișată presupune un atacator care știe cum sunt construite.',
      'Baza de date de cuvinte este o listă selectată de nume cu litere latine; nu este o listă a celor mai folosite parole.',
      'Estimarea puterii se bazează pe combinațiile posibile, nu pe baze de date cu parole compromise.',
    ],
  },
  'uuid-generator': {
    name: 'Generator de UUID',
    description: 'Generează UUID-uri aleatorii de versiunea 4 în masă, cu opțiuni de format.',
    metaDescription: 'Generator de UUID online gratuit. Creează UUID-uri v4 aleatorii în masă, cu majuscule, fără cratime sau cu acolade, folosind aleatoriu criptografic.',
    steps: [
      'Alege câte UUID-uri vrei și formatul.',
      'Generează.',
      'Copiază lista.',
    ],
    faq: [
      { q: 'Se pot ciocni două UUID-uri?', a: 'UUID-urile de versiunea 4 au 122 de biți aleatorii, deci șansa unei coliziuni este neglijabilă în practică.' },
    ],
    limits: [
      'Sunt generate doar UUID-uri de versiunea 4 (aleatorii).',
    ],
  },
  'timestamp-converter': {
    name: 'Convertor de marcaje temporale',
    description: 'Convertește marcaje temporale Unix în date lizibile și invers, în orice fus orar.',
    metaDescription: 'Convertor online gratuit de marcaje temporale Unix. Convertește secunde sau milisecunde epoch în date UTC și locale, și datele înapoi în marcaje temporale.',
    steps: [
      'Introdu un marcaj temporal Unix sau alege o dată.',
      'Citește rezultatul în UTC, în fusul tău orar local și în ISO 8601.',
      'Copiază orice valoare.',
    ],
    faq: [
      { q: 'Secunde sau milisecunde?', a: 'Marcajele temporale cu 13 sau mai multe cifre sunt tratate ca milisecunde, cele mai scurte ca secunde. Poți schimba asta manual.' },
    ],
    limits: [
      'Intervalul acceptat este cel al datelor JavaScript: aproximativ anii -271821 până la 275760.',
    ],
  },
  'color-converter': {
    name: 'Convertor de culori',
    description: 'Convertește culorile între HEX, RGB, HSL și HSV, cu previzualizare în timp real și verificarea contrastului.',
    metaDescription: 'Convertor de culori online gratuit. Convertește valori HEX, RGB, HSL și HSV, previzualizează culoarea și verifică rapoartele de contrast WCAG.',
    steps: [
      'Introdu o culoare în orice format sau folosește selectorul.',
      'Vezi cum se actualizează toate formatele.',
      'Copiază valoarea de care ai nevoie.',
    ],
    faq: [
      { q: 'Ce arată verificarea contrastului?', a: 'Arată raportul de contrast WCAG al culorii față de text alb și negru, ceea ce te ajută să alegi combinații lizibile.' },
    ],
    limits: [
      'Doar sRGB; spațiile CSS Color 4, precum LAB, LCH și Display-P3, nu sunt acceptate.',
      'Valorile de transparență (alfa) sunt acceptate, dar ignorate.',
    ],
  },
  'qr-code-generator': {
    name: 'Generator de coduri QR',
    description: 'Creează coduri QR pentru linkuri, text, Wi-Fi, e-mail sau numere de telefon, ca PNG sau SVG.',
    metaDescription: 'Generator de coduri QR gratuit. Creează coduri QR pentru URL-uri, text, Wi-Fi, e-mail și numere de telefon și descarcă-le ca PNG sau SVG. Create în browser.',
    steps: [
      'Alege ce să conțină codul și completează detaliile.',
      'Ajustează dimensiunea, culorile și corecția erorilor, dacă dorești.',
      'Descarcă PNG-ul sau SVG-ul și testează-l cu telefonul înainte de tipărire.',
    ],
    faq: [
      { q: 'Codurile expiră?', a: 'Nu. Acestea sunt coduri statice: datele sunt stocate chiar în cod, deci funcționează pentru totdeauna și nimic nu este urmărit.' },
      { q: 'Ce nivel de corecție a erorilor să aleg?', a: 'Mediu se potrivește în majoritatea cazurilor. Alege Quartile sau Ridicat dacă codul se poate murdări sau deteriora, dar nivelurile mai mari fac codul mai dens și mai greu de scanat la dimensiuni mici.' },
      { q: 'Pot folosi codurile în scop comercial?', a: 'Da. Standardul codurilor QR este deschis, iar codurile create aici nu au taxe, filigrane sau urmărire din partea noastră.' },
      { q: 'Datele mele sunt trimise undeva?', a: 'Nu. Codul este generat în browser, iar parolele Wi-Fi pe care le introduci rămân pe dispozitivul tău.' },
    ],
    limits: [
      'Doar coduri statice: fără urmărirea scanărilor și fără coduri editabile.',
      'Un text foarte lung produce un cod dens, greu de scanat, așa că păstrează-l scurt.',
      'Culorile închise pe fundal deschis, cu contrast puternic, se scanează cel mai bine.',
    ],
  },
  "scan-to-pdf": {
    name: "Scanare în PDF",
    description: "Transformați fotografii sau scanări ale unor pagini de hârtie într-un singur PDF, cu curățare opțională pentru o lizibilitate mai bună.",
    metaDescription: "Scanare în PDF online: combinați fotografii sau scanări ale unor pagini de hârtie într-un singur PDF, stabiliți ordinea paginilor și uniformizați umbrele cu modul document alb-negru.",
    steps: [
      "Adăugați fotografii sau scanări ale paginilor ori faceți o fotografie, dacă telefonul sau tableta dumneavoastră permite acest lucru.",
      "Puneți paginile în ordine și alegeți dimensiunea paginii și un stil de curățare.",
      "Creați PDF-ul și descărcați-l.",
    ],
    faq: [
      { q: "Recunoaște instrumentul textul de pe pagină?", a: "Nu. Scanare în PDF transformă imaginile în pagini PDF și le poate curăța, dar textul rămâne parte din imagine. Pentru a-l face căutabil, treceți rezultatul prin OCR PDF." },
      { q: "Pot folosi camera telefonului?", a: "Pe telefoanele și tabletele al căror browser permite acest lucru, butonul „Fă o fotografie” deschide camera. În caz contrar, alegeți fotografii deja salvate pe dispozitiv." },
      { q: "Ce fac stilurile de curățare?", a: "„Original” păstrează culorile. „Tonuri de gri” elimină culoarea. „Document alb-negru” transformă pagina în text negru pur pe hârtie albă și uniformizează umbrele și iluminarea neuniformă, ceea ce se potrivește paginilor tipărite și notițelor, dar nu fotografiilor." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Maximum 25 MB pe imagine și 100 de imagini pe PDF.",
      "Fotografiile mari sunt reduse la aproximativ dimensiunea A4 la 300 dpi, pentru ca PDF-ul să rămână mic.",
      "Unele formate ale telefoanelor, precum HEIC, nu pot fi citite de browsere; salvați-le mai întâi ca JPG.",
    ],
  },
  "html-to-pdf": {
    name: "HTML în PDF",
    description: "Convertiți un fișier HTML sau HTML lipit într-un PDF cu text selectabil.",
    metaDescription: "HTML în PDF online: convertiți un fișier HTML sau cod HTML lipit într-un PDF cu text real, selectabil, titluri, liste, tabele și imagini încorporate.",
    steps: [
      "Alegeți un fișier HTML sau lipiți HTML-ul dumneavoastră.",
      "Alegeți dimensiunea paginii.",
      "Convertiți și descărcați PDF-ul.",
    ],
    faq: [
      { q: "Pot introduce adresa unei pagini web?", a: "Nu. Preluarea altor site-uri ar necesita trimiterea adresei către un server, iar o pagină se convertește rareori bine fără stilurile ei. Salvați pagina ca fișier HTML în browser și folosiți acel fișier sau lipiți HTML-ul ei." },
      { q: "Va arăta PDF-ul ca pagina web?", a: "Nu, nu exact. Instrumentul citește structura documentului (titluri, paragrafe, liste, tabele, linkuri, text aldin și cursiv și imagini încorporate) și o aranjează ca un document simplu. Stilurile CSS, scripturile, fonturile web, coloanele și elementele poziționate nu sunt aplicate." },
      { q: "Este sigur să convertesc HTML în care nu am încredere?", a: "HTML-ul este citit ca text inert: scripturile nu rulează și nimic nu este încărcat de pe internet. Sunt folosite doar imaginile încorporate chiar în HTML." },
      { q: "Ce limbi și fonturi sunt acceptate în PDF?", a: "PDF-ul este scris cu Noto Sans, care acoperă textul latin (inclusiv literele poloneze, cehe, românești și turcești), chirilic, grecesc, vietnamez și devanagari. Textul arab, ebraic, thailandez, chinez, japonez și coreean nu este încă acceptat: acele caractere apar ca semne de întrebare, iar instrumentul vă spune câte au fost afectate. Fonturile originale ale documentului nu sunt păstrate." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Maximum 10 MB de HTML.",
      "Sunt incluse doar imaginile încorporate în HTML (adrese data:); imaginile și stilurile încărcate de pe alte site-uri sunt omise, nu preluate.",
      "Scripturile, formularele, cadrele, canvas, videoul și graficele SVG nu sunt convertite.",
    ],
  },
  "word-to-pdf": {
    name: "Word în PDF",
    description: "Convertiți un document Word (DOCX) în PDF, păstrând titlurile, listele, tabelele și imaginile.",
    metaDescription: "Word în PDF online: convertiți un document DOCX într-un PDF cu text selectabil, titluri, liste, tabele, linkuri și imagini. Fișierul este convertit în browserul dumneavoastră.",
    steps: [
      "Alegeți un fișier DOCX.",
      "Alegeți dimensiunea paginii sau păstrați-o pe cea din document.",
      "Convertiți și descărcați PDF-ul.",
    ],
    faq: [
      { q: "Va arăta PDF-ul exact ca documentul din Word?", a: "Nu. Kitwell nu folosește Microsoft Word sau LibreOffice. Citește conținutul și structura documentului și le aranjează singur, așa că fonturile, spațierea și sfârșiturile de pagină diferă de cele din Word. Verificați rezultatul înainte de a-l trimite." },
      { q: "Ce se convertește și ce nu?", a: "Se convertesc: textul cu aldin, cursiv, subliniat și linkuri, titluri, liste cu buline și numerotate, tabele, imagini JPEG și PNG, întreruperi de rând și de pagină, aliniere și orientarea paginii. Nu se convertesc: anteturile și subsolurile, notele de subsol, casetele de text, ecuațiile, diagramele, formele și imaginile în alte formate." },
      { q: "Pot converti un fișier .doc vechi?", a: "Nu. Deschideți-l în Word și salvați-l mai întâi ca fișier DOCX." },
      { q: "Ce limbi și fonturi sunt acceptate în PDF?", a: "PDF-ul este scris cu Noto Sans, care acoperă textul latin (inclusiv literele poloneze, cehe, românești și turcești), chirilic, grecesc, vietnamez și devanagari. Textul arab, ebraic, thailandez, chinez, japonez și coreean nu este încă acceptat: acele caractere apar ca semne de întrebare, iar instrumentul vă spune câte au fost afectate. Fonturile originale ale documentului nu sunt păstrate." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Doar fișiere DOCX, maximum 50 MB. Fișierele .doc vechi și documentele protejate cu parolă nu sunt acceptate.",
      "Aspectul este aproximativ: coloanele, înconjurarea imaginilor cu text, anteturile, subsolurile și notele de subsol nu sunt reproduse.",
      "Fonturile originalului sunt înlocuite cu Noto Sans.",
    ],
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint în PDF",
    description: "Convertiți o prezentare PowerPoint (PPTX) în PDF, cu o pagină pe diapozitiv.",
    metaDescription: "PowerPoint în PDF online: convertiți o prezentare PPTX într-un PDF cu o pagină pe diapozitiv, păstrând dimensiunea diapozitivului, textul, imaginile și formele simple. Direct în browserul dumneavoastră.",
    steps: [
      "Alegeți un fișier PPTX.",
      "Convertiți-l.",
      "Verificați paginile și descărcați PDF-ul.",
    ],
    faq: [
      { q: "Vor arăta diapozitivele exact ca în PowerPoint?", a: "Nu exact. Kitwell desenează fiecare diapozitiv din casetele sale de text, imagini, forme simple și tabele. Fonturile, gradientele, umbrele, efectele și potrivirea exactă a textului diferă. Parcurgeți întotdeauna PDF-ul înainte să-l folosiți." },
      { q: "Ce nu se convertește?", a: "Diagramele, SmartArt, videoul și audio, animațiile și tranzițiile, notele vorbitorului, gradientele, liniile și conectorii, precum și imaginile în alte formate decât JPEG și PNG. Instrumentul vă spune câte elemente au fost omise." },
      { q: "Pot converti un fișier .ppt vechi?", a: "Nu. Deschideți-l în PowerPoint și salvați-l mai întâi ca fișier PPTX." },
      { q: "Ce limbi și fonturi sunt acceptate în PDF?", a: "PDF-ul este scris cu Noto Sans, care acoperă textul latin (inclusiv literele poloneze, cehe, românești și turcești), chirilic, grecesc, vietnamez și devanagari. Textul arab, ebraic, thailandez, chinez, japonez și coreean nu este încă acceptat: acele caractere apar ca semne de întrebare, iar instrumentul vă spune câte au fost afectate. Fonturile originale ale documentului nu sunt păstrate." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Doar fișiere PPTX, maximum 100 MB și 300 de diapozitive. Fișierele .ppt vechi și prezentările protejate cu parolă nu sunt acceptate.",
      "Fiecare diapozitiv devine o pagină cu dimensiunea și orientarea proprii ale diapozitivului.",
      "Textul care nu încape în caseta sa este micșorat, până la jumătate din dimensiune.",
    ],
  },
  "excel-to-pdf": {
    name: "Excel în PDF",
    description: "Convertiți un registru Excel (XLSX) în PDF, cu fiecare foaie vizibilă sub formă de tabel.",
    metaDescription: "Excel în PDF online: convertiți un registru XLSX într-un PDF în care fiecare foaie vizibilă este un tabel cu valorile, numerele și datele salvate. Direct în browserul dumneavoastră.",
    steps: [
      "Alegeți un fișier XLSX.",
      "Convertiți-l.",
      "Verificați tabelele și descărcați PDF-ul.",
    ],
    faq: [
      { q: "Se calculează formulele?", a: "Nu. PDF-ul arată valorile pe care Excel le-a salvat în fișier. Dacă o celulă cu formulă nu are o valoare salvată, rămâne goală, iar instrumentul vă anunță; deschideți fișierul în Excel, lăsați-l să calculeze, salvați-l și convertiți-l din nou." },
      { q: "Va arăta ca aspectul de tipărire din Excel?", a: "Nu. Fiecare foaie vizibilă devine un tabel simplu, potrivit la lățimea paginii. Culorile celulelor, celulele îmbinate, lățimile coloanelor, diagramele, imaginile, zonele de tipărire și sfârșiturile de pagină nu sunt păstrate." },
      { q: "Pot converti un fișier .xls vechi?", a: "Nu. Deschideți-l în Excel și salvați-l mai întâi ca fișier XLSX." },
      { q: "Ce limbi și fonturi sunt acceptate în PDF?", a: "PDF-ul este scris cu Noto Sans, care acoperă textul latin (inclusiv literele poloneze, cehe, românești și turcești), chirilic, grecesc, vietnamez și devanagari. Textul arab, ebraic, thailandez, chinez, japonez și coreean nu este încă acceptat: acele caractere apar ca semne de întrebare, iar instrumentul vă spune câte au fost afectate. Fonturile originale ale documentului nu sunt păstrate." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Doar fișiere XLSX, maximum 50 MB. Fișierele .xls vechi și registrele protejate cu parolă nu sunt acceptate.",
      "Până la 5.000 de rânduri și 60 de coloane pe foaie; ce depășește este omis, iar instrumentul vă anunță.",
      "Foile ascunse sunt omise.",
    ],
  },
  "pdf-to-markdown": {
    name: "PDF în Markdown",
    description: "Transformați textul unui PDF într-un fișier Markdown cu titluri, paragrafe și liste.",
    metaDescription: "PDF în Markdown online: extrageți textul unui PDF și descărcați-l ca fișier Markdown (.md) cu titluri, paragrafe și liste. Funcționează în browserul dumneavoastră.",
    steps: [
      "Alegeți un PDF.",
      "Alegeți dacă se elimină anteturile, subsolurile și numerele de pagină care se repetă.",
      "Convertiți, verificați rezultatul și descărcați fișierul .md.",
    ],
    faq: [
      { q: "Cum sunt găsite titlurile și listele?", a: "Titlurile sunt rânduri scrise cu un font mai mare decât textul de bază, listele sunt rânduri care încep cu o bulină sau un număr, iar paragrafele sunt separate de spațiul dintre rânduri. Este o estimare bună, nu o garanție, așa că verificați rezultatul." },
      { q: "De ce este gol rezultatul pentru PDF-ul meu scanat?", a: "O scanare este o imagine a unei pagini și nu are text de extras. Rulați mai întâi OCR PDF pentru a adăuga un strat de text, apoi convertiți rezultatul." },
      { q: "Ce se întâmplă cu tabelele, coloanele și imaginile?", a: "Tabelele și coloanele nu sunt reconstruite: textul lor apare ca rânduri obișnuite, în ordinea de citire, atunci când este posibil. Imaginile, linkurile, textul aldin și cursiv, notele de subsol și ecuațiile nu sunt preluate." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Maximum 100 MB pe PDF. PDF-urile protejate cu parolă trebuie deblocate mai întâi.",
      "Se convertește doar textul care este text real în PDF; paginile scanate au nevoie mai întâi de OCR PDF.",
      "Structura este estimată din dimensiunile fonturilor și spațiere și poate fi greșită la aspecte complexe.",
    ],
  },
  "repair-pdf": {
    name: "Reparare PDF",
    description: "Încercați să reparați un PDF care nu se deschide, reconstruindu-i structura internă.",
    metaDescription: "Reparare PDF online: reconstruiți structura unui PDF deteriorat care nu se deschide, de exemplu cu un tabel de referințe încrucișate stricat sau un sfârșit tăiat. Funcționează în browserul dumneavoastră.",
    steps: [
      "Alegeți PDF-ul deteriorat.",
      "Porniți repararea.",
      "Dacă instrumentul a produs un fișier, verificați-l și descărcați-l.",
    ],
    faq: [
      { q: "Ce tipuri de deteriorări pot fi reparate?", a: "Deteriorările structurii fișierului: un index de obiecte (tabel de referințe încrucișate) lipsă sau greșit, un trailer lipsă, date inutile înainte de început sau o listă de pagini stricată. Dacă fișierul a fost tăiat, paginile salvate înainte de tăiere pot fi recuperate." },
      { q: "Ce nu se poate recupera?", a: "Conținutul care nu mai este în fișier. Paginile, imaginile sau fonturile lipsă ori deteriorate nu pot fi readuse, iar unele fișiere nu mai pot fi salvate. Instrumentul vă spune câte pagini a păstrat și anunță când nu poate produce un fișier utilizabil; nu oferă niciodată o descărcare pe care nu a creat-o." },
      { q: "Ce se întâmplă dacă PDF-ul meu se deschide normal?", a: "Atunci nu e nimic de reparat. Instrumentul vă spune acest lucru și oferă o copie curățată a fișierului." },
      { q: "Este fișierul meu încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dumneavoastră. Acest instrument nu îl trimite către un server." },
    ],
    limits: [
      "Maximum 100 MB pe PDF. PDF-urile protejate cu parolă trebuie deblocate mai întâi.",
      "Deteriorările din interiorul fluxurilor de obiecte comprimate nu pot fi reconstruite de acest instrument.",
      "Un fișier reparat poate avea mai puține pagini decât originalul, iar ordinea paginilor se poate schimba după o reparare amplă.",
    ],
  },
  "pdf-to-pdfa": {
    name: "PDF în PDF/A",
    description: "Pregătiți un PDF ca PDF/A-2b pentru arhivare pe termen lung, păstrând textul sau transformând paginile în imagini.",
    metaDescription: "PDF în PDF/A online: pregătiți un PDF ca PDF/A-2b pentru arhivare, cu identificare PDF/A, metadate și profil de culoare. Păstrează textul când este posibil. Funcționează în browserul dvs.",
    steps: [
      "Alegeți un PDF. Un fișier protejat cu parolă trebuie mai întâi deblocat.",
      "Alegeți cum să convertiți: păstrați textul și fonturile sau transformați paginile în imagini.",
      "Convertiți-l, citiți ce s-a făcut și descărcați fișierul PDF/A.",
    ],
    faq: [
      { q: "Rezultatul este un fișier PDF/A certificat?", a: "Nu. Kitwell pregătește PDF-ul dvs. ca PDF/A-2b, nivelul de bază pentru arhivare, și își verifică munca după regulile pe care le aplică. Nu include un validator PDF/A complet. Dacă trebuie să dovediți conformitatea, verificați fișierul cu un validator precum veraPDF." },
      { q: "Care este diferența dintre cele două moduri de conversie?", a: "„Păstrează textul și fonturile” modifică doar structura și metadatele fișierului, deci textul rămâne selectabil. Funcționează numai dacă toate fonturile sunt încorporate și fișierul nu folosește culori CMYK. „Transformă paginile în imagini” randează fiecare pagină ca imagine și construiește din ele un nou PDF/A. Funcționează întotdeauna, dar textul nu mai poate fi selectat, iar fișierul este mai mare." },
      { q: "De ce a fost refuzat PDF-ul meu când am ales să păstrez textul?", a: "PDF/A cere ca toate fonturile să fie încorporate în fișier și nu permite culori CMYK fără profil CMYK, comprimarea LZW sau adnotări fără aspect. Acestea nu pot fi corectate fără a modifica paginile, așa că instrumentul listează ce a găsit în loc să simuleze un rezultat. Puteți folosi în continuare modul cu imagini." },
      { q: "Ce modifică instrumentul în fișier?", a: "Adaugă identificarea PDF/A și metadatele XMP, un profil de culoare sRGB ca condiție de ieșire și un identificator de fișier. Elimină JavaScript, acțiunile interzise, atașamentele, informațiile suplimentare ale documentului și setările de adnotări pe care PDF/A nu le permite." },
      { q: "Fișierul meu este încărcat undeva?", a: "Nu. Fișierul este citit și convertit de browserul dvs. Acest instrument nu îl trimite către niciun server." },
    ],
    limits: [
      "Maximum 100 MB per PDF. PDF-urile protejate cu parolă trebuie mai întâi deblocate, deoarece un fișier PDF/A nu poate fi criptat.",
      "„Păstrează textul și fonturile” funcționează numai dacă toate fonturile sunt încorporate și fișierul nu are culori CMYK sau comprimare LZW.",
      "Transformarea paginilor în imagini este limitată la 200 de pagini. Textul nu mai poate fi selectat, iar fișierul devine mai mare.",
      "Rezultatul este PDF/A-2b pregătit de Kitwell și verificat după regulile pe care le aplică; nu este validat de un validator PDF/A complet.",
    ],
  },
};
export default tools;
