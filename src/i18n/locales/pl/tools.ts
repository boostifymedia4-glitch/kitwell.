import type { ToolTextMap } from '../../toolText';

const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG na PNG',
    description: 'Konwertuj zdjęcia JPG i JPEG na bezstratne obrazy PNG jednym kliknięciem.',
    metaDescription: 'Konwertuj JPG na PNG online za darmo. Zamieniaj zdjęcia JPEG na PNG hurtowo, bezpośrednio w przeglądarce, bez przesyłania plików i rejestracji.',
    steps: [
      'Upuść jeden lub kilka plików JPG na narzędzie albo wybierz je z dysku urządzenia.',
      'Sprawdź podglądy, a następnie kliknij Konwertuj.',
      'Pobierz każdy plik PNG osobno albo wszystko jako archiwum ZIP.',
    ],
    faq: [
      { q: 'Czy konwersja JPG na PNG poprawi jakość?', a: 'Nie. JPG to format stratny, więc szczegółów utraconych przy zapisie pliku JPG nie można odzyskać. PNG po prostu zapisuje aktualne piksele bez dalszych strat, co przydaje się przy edycji lub pracy z przezroczystością.' },
      { q: 'Dlaczego plik PNG jest większy niż JPG?', a: 'PNG jest bezstratny i zwykle zapisuje fotografie mniej wydajnie niż JPG. Gdy rozmiar pliku jest ważniejszy niż dokładność co do piksela, wybierz JPG lub WebP.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
    ],
  },
  "png-to-jpg": {
    name: "PNG na JPG",
    description: "Zamień obrazy PNG na mniejsze pliki JPG jednym kliknięciem.",
    metaDescription: "Konwertuj PNG na JPG online za darmo. Przezroczyste obszary są wypełniane bielą. Przetwarzanie w przeglądarce.",
    steps: [
      "Dodaj pliki PNG.",
      "Przezroczyste obszary są wypełniane bielą, ponieważ JPG nie przechowuje przezroczystości.",
      "Kliknij Konwertuj i pobierz wyniki.",
    ],
    faq: [
      { q: "Co dzieje się z przezroczystymi obszarami?", a: "JPG nie obsługuje przezroczystości, więc przezroczyste piksele są wypełniane bielą." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Przezroczyste obszary są wypełniane bielą, ponieważ JPG nie przechowuje przezroczystości.",
    ],
  },
  "jpg-to-webp": {
    name: "JPG na WebP",
    description: "Konwertuj zdjęcia JPG na nowoczesny WebP, by uzyskać mniejsze pliki i szybsze strony.",
    metaDescription: "Konwertuj JPG na WebP online za darmo. Zmniejszaj zdjęcia do sieci przy zrównoważonej, stałej jakości, przetwarzane w przeglądarce.",
    steps: [
      "Dodaj pliki JPG.",
      "Nie ma nic do ustawiania: narzędzie używa zrównoważonej jakości dla pliku WebP.",
      "Konwertuj i pobierz.",
    ],
    faq: [
      { q: "Czy WebP jest mniejszy niż JPG?", a: "Zwykle o 20–35% mniejszy przy podobnej jakości obrazu, choć wynik zależy od obrazu." },
      { q: "Czy każda przeglądarka obsługuje WebP?", a: "Wszystkie obecne główne przeglądarki potrafią wyświetlać WebP. Kodowanie WebP w przeglądarce działa w Chrome, Edge i Firefoksie; Safari nie potrafi tworzyć plików WebP, a narzędzie poinformuje o tym zamiast tworzyć błędny plik." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Przeglądarka musi obsługiwać kodowanie WebP; nieobsługujące ją przeglądarki pokazują błąd.",
    ],
  },
  "png-to-webp": {
    name: "PNG na WebP",
    description: "Konwertuj obrazy PNG na WebP i zachowaj przezroczystość przy ułamku rozmiaru.",
    metaDescription: "Konwertuj PNG na WebP online za darmo. Zachowuje przezroczystość, zmniejsza rozmiar pliku i działa w całości w przeglądarce.",
    steps: [
      "Dodaj pliki PNG.",
      "Nie ma nic do ustawiania: narzędzie używa zrównoważonej jakości dla pliku WebP.",
      "Konwertuj i pobierz.",
    ],
    faq: [
      { q: "Czy przezroczystość jest zachowana?", a: "Tak. WebP obsługuje kanał alfa, więc przezroczyste PNG pozostają przezroczyste." },
      { q: "Czy mogę uzyskać wynik bezstratny?", a: "Narzędzie koduje WebP z wysoką, zrównoważoną jakością. Przeglądarki kodują WebP stratnie, więc użyj PNG, jeśli potrzebujesz matematycznie dokładnej kopii." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Przeglądarka musi obsługiwać kodowanie WebP; nieobsługujące ją przeglądarki pokazują błąd.",
    ],
  },
  "webp-to-jpg": {
    name: "WebP na JPG",
    description: "Konwertuj obrazy WebP na szeroko kompatybilne pliki JPG.",
    metaDescription: "Konwertuj WebP na JPG online za darmo. Spraw, by obrazy WebP działały wszędzie, konwertowane lokalnie w przeglądarce.",
    steps: [
      "Dodaj pliki WebP.",
      "Przezroczyste obszary są wypełniane bielą, ponieważ JPG nie przechowuje przezroczystości.",
      "Konwertuj i pobierz.",
    ],
    faq: [
      { q: "Po co konwertować WebP na JPG?", a: "Część starszego oprogramowania, klientów poczty i formularzy przesyłania nadal odrzuca WebP. JPG jest akceptowany niemal wszędzie." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Przezroczyste obszary są wypełniane bielą, ponieważ JPG nie przechowuje przezroczystości.",
    ],
  },
  'webp-to-png': {
    name: 'WebP na PNG',
    description: 'Konwertuj obrazy WebP na bezstratny PNG, zachowując przezroczystość.',
    metaDescription: 'Konwertuj WebP na PNG online za darmo. Zachowuje przezroczystość i działa w całości w przeglądarce, bez przesyłania plików.',
    steps: [
      'Dodaj pliki WebP.',
      'Kliknij Konwertuj.',
      'Pobierz pliki PNG.',
    ],
    faq: [
      { q: 'Czy przezroczystość zostaje zachowana?', a: 'Tak. PNG obsługuje przezroczystość, więc kanał alfa z pliku WebP jest przenoszony do wyniku.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
    ],
  },
  "image-compressor": {
    name: "Kompresuj obraz",
    description: "Zmniejsz rozmiar pliku obrazu i zobacz dokładną oszczędność.",
    metaDescription: "Kompresuj obrazy JPG, PNG i WebP online za darmo. Opcjonalnie ogranicz wymiary i porównaj rozmiary plików. Działa w przeglądarce.",
    steps: [
      "Dodaj obrazy.",
      "Wybierz format wyjściowy i opcjonalnie maksymalną szerokość lub wysokość.",
      "Kompresuj, porównaj rozmiary przed i po, a następnie pobierz.",
    ],
    faq: [
      { q: "Jak kompresor zmniejsza rozmiar?", a: "Koduje obraz ponownie ze stałą, zrównoważoną jakością i może go też pomniejszyć. Wyjście PNG jest bezstratne, więc zmniejsza się tylko wtedy, gdy zmniejszysz także wymiary." },
      { q: "Co jeśli wynik jest większy niż oryginał?", a: "Może się to zdarzyć przy plikach już zoptymalizowanych. Narzędzie zachowuje wtedy oryginalny plik bez zmian i informuje o tym." },
      { q: "Czy dane EXIF lub lokalizacji są zachowywane?", a: "Nie. Ponowne kodowanie przez canvas usuwa metadane EXIF, takie jak model aparatu i lokalizacja GPS, co często jest pożądane przed udostępnieniem zdjęcia. Profile kolorów również nie są zachowywane." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Najlepsze wyniki daje wyjście JPG lub WebP; wyjście PNG jest bezstratne i może się nie zmniejszyć.",
    ],
  },
  'image-resizer': {
    name: 'Zmiana rozmiaru obrazu',
    description: 'Zmieniaj rozmiar obrazów w dokładnych pikselach lub procentach, zachowując proporcje.',
    metaDescription: 'Zmień rozmiar obrazów online za darmo. Ustaw dokładną szerokość i wysokość albo procent, zachowaj proporcje i pobierz JPG, PNG lub WebP.',
    steps: [
      'Dodaj jeden lub kilka obrazów.',
      'Wybierz piksele lub procenty i wpisz nowy rozmiar. Pozostaw włączoną blokadę proporcji, aby uniknąć zniekształceń.',
      'Zmień rozmiar i pobierz.',
    ],
    faq: [
      { q: 'Czy mogę powiększyć obraz?', a: 'Tak, ale powiększenie nie doda szczegółów, więc wynik będzie wyglądał miękko. Najlepszą jakość daje zmniejszanie.' },
      { q: 'Jaki jest maksymalny rozmiar wyniku?', a: 'Przeglądarki ograniczają rozmiar canvasu. To narzędzie ogranicza wynik do 16 000 px na bok i około 100 megapikseli.' },
      { q: 'Czy dane EXIF lub lokalizacji są zachowywane?', a: 'Nie. Ponowne kodowanie przez canvas usuwa metadane EXIF, takie jak model aparatu i lokalizacja GPS, co często jest pożądane przed udostępnieniem zdjęcia. Profile kolorów również nie są zachowywane.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
      'Wynik jest ograniczony do 16 000 px na bok.',
    ],
  },
  "image-cropper": {
    name: "Przytnij obraz",
    description: "Przytnij obraz do dokładnego obszaru lub stałych proporcji z podglądem na żywo.",
    metaDescription: "Przycinaj obrazy online za darmo. Wybierz stałe proporcje lub ustaw dokładne wartości w pikselach z podglądem na żywo. Przetwarzanie w przeglądarce.",
    steps: [
      "Dodaj obraz.",
      "Wybierz proporcje lub przeciągnij ramkę przycinania, a potem dopracuj położenie i rozmiar w polach liczbowych.",
      "Kliknij Przytnij i pobierz.",
    ],
    faq: [
      { q: "Czy przycinanie obniża jakość?", a: "Przycinanie zachowuje oryginalne piksele. Wyniki JPG i WebP są zapisywane z wysoką stałą jakością, więc przy normalnym użyciu nie widać straty." },
    ],
    limits: [
      "Jeden obraz naraz.",
      "Maksymalnie 25 MB na plik.",
      "Animowane obrazy używają pierwszej klatki.",
    ],
  },
  'image-rotator': {
    name: 'Obracanie obrazu',
    description: 'Obracaj obrazy o 90°, 180°, 270° lub dowolny własny kąt.',
    metaDescription: 'Obracaj obrazy online za darmo. Obróć zdjęcia o 90, 180 lub 270 stopni albo o dowolny kąt, bezpośrednio w przeglądarce.',
    steps: [
      'Dodaj obrazy.',
      'Wybierz obrót lub wpisz własny kąt.',
      'Zastosuj i pobierz.',
    ],
    faq: [
      { q: 'Co się dzieje przy obrotach o kąt inny niż prosty?', a: 'Canvas powiększa się, aby pomieścić obrócony obraz. W przypadku wyniku JPG puste rogi są wypełniane wybranym tłem; PNG i WebP pozostawiają je przezroczyste.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
    ],
  },
  'image-flipper': {
    name: 'Odbijanie obrazu',
    description: 'Odbijaj obrazy lustrzanie w poziomie lub w pionie.',
    metaDescription: 'Odbijaj obrazy w poziomie lub w pionie online za darmo. Lustrzane odbicie zdjęć w przeglądarce, bez przesyłania plików.',
    steps: [
      'Dodaj obrazy.',
      'Wybierz odbicie poziome, pionowe lub oba.',
      'Zastosuj i pobierz.',
    ],
    faq: [
      { q: 'Jaka jest różnica między odbiciem poziomym a pionowym?', a: 'Odbicie poziome zamienia lewą i prawą stronę, jak w lustrze. Odbicie pionowe przewraca obraz do góry nogami wzdłuż osi poziomej.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
    ],
  },
  "image-format-converter": {
    name: "Zmień format obrazu",
    description: "Konwertuj między JPG, PNG i WebP jednym elastycznym narzędziem.",
    metaDescription: "Konwertuj obrazy między JPG, PNG i WebP online za darmo. Wybierz format wyjściowy, przetwarzanie w przeglądarce.",
    steps: [
      "Dodaj obrazy w dowolnym obsługiwanym formacie.",
      "Wybierz format wyjściowy.",
      "Konwertuj i pobierz.",
    ],
    faq: [
      { q: "Jakich formatów mogę używać?", a: "Wejście: JPG, PNG, WebP, GIF, BMP i AVIF, jeśli przeglądarka potrafi je zdekodować. Wyjście: JPG, PNG i WebP." },
      { q: "A HEIC lub TIFF?", a: "Przeglądarki nie potrafią natywnie dekodować HEIC ani TIFF, więc nie są jeszcze obsługiwane." },
    ],
    limits: [
      "Animowane pliki GIF lub WebP są konwertowane wyłącznie na podstawie pierwszej klatki.",
      "Maksymalnie 25 MB na plik i 20 plików na partię, aby przeglądarka pozostała responsywna.",
      "Metadane EXIF i osadzone profile kolorów nie są zachowywane.",
      "Pliki HEIC/HEIF, TIFF i RAW nie są obsługiwane.",
    ],
  },
  'image-to-base64': {
    name: 'Obraz na Base64',
    description: 'Zakoduj obraz jako identyfikator data URI w Base64 do użycia w CSS, HTML lub JSON.',
    metaDescription: 'Konwertuj obraz na ciąg Base64 lub data URI online za darmo. Kopiuj gotowe fragmenty HTML i CSS. Działa w przeglądarce.',
    steps: [
      'Dodaj obraz.',
      'Wybierz styl wyniku: data URI, czysty Base64, HTML <img> lub CSS.',
      'Skopiuj wynik.',
    ],
    faq: [
      { q: 'Kiedy warto używać obrazów Base64?', a: 'Do drobnych ikon w CSS lub e-mailach, gdzie dodatkowe żądanie kosztuje więcej niż około 33% wzrost rozmiaru. Unikaj tego przy dużych zdjęciach.' },
    ],
    limits: [
      'Maksymalnie 5 MB na obraz, ponieważ tekst Base64 staje się bardzo duży.',
      'Jeden obraz naraz.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 na obraz',
    description: 'Zdekoduj ciąg Base64 lub data URI z powrotem do obrazu gotowego do pobrania.',
    metaDescription: 'Konwertuj ciąg Base64 lub data URI na obraz online za darmo. Obejrzyj podgląd i pobierz zdekodowany plik PNG, JPG, WebP lub GIF.',
    steps: [
      'Wklej ciąg Base64 lub pełny data URI.',
      'Obraz jest dekodowany i od razu wyświetlany w podglądzie.',
      'Pobierz obraz.',
    ],
    faq: [
      { q: 'Czy potrzebuję prefiksu „data:image/png;base64,”?', a: 'Nie. Bez prefiksu narzędzie rozpoznaje format po sygnaturze pliku (PNG, JPG, GIF, WebP).' },
      { q: 'Dlaczego pojawia się błąd?', a: 'Ciąg jest prawdopodobnie obcięty, zawiera dodatkowe znaki lub nie jest obrazem. Dane SVG są tu również odrzucane ze względów bezpieczeństwa.' },
    ],
    limits: [
      'Obsługiwane formaty: PNG, JPG, GIF i WebP. SVG celowo nie jest wyświetlany.',
      'Maksymalnie 10 MB zdekodowanych danych.',
    ],
  },
  'image-color-picker': {
    name: 'Próbnik kolorów z obrazu',
    description: 'Pobieraj dokładne kolory z dowolnego obrazu i wyodrębniaj jego dominującą paletę.',
    metaDescription: 'Pobieraj kolory z obrazu online za darmo. Kliknij dowolny piksel, aby poznać wartości HEX, RGB i HSL, i wyodrębnij paletę dominujących kolorów.',
    steps: [
      'Dodaj obraz.',
      'Kliknij lub dotknij dowolnego miejsca (albo użyj klawiszy strzałek), aby pobrać próbkę piksela.',
      'Skopiuj wartość HEX, RGB lub HSL albo skopiuj kolor z wyodrębnionej palety.',
    ],
    faq: [
      { q: 'Jak obliczana jest paleta?', a: 'Obraz jest pomniejszany, a jego kolory są grupowane w przedziały; wyświetlane są najczęstsze z nich. To przybliżenie kolorów dominujących, a nie pełna lista.' },
    ],
    limits: [
      'Jeden obraz naraz.',
      'Kolory są pobierane z wyświetlanych pikseli sRGB; profile kolorów są ignorowane.',
    ],
  },
  'image-watermark': {
    name: 'Znak wodny na obrazie',
    description: 'Dodaj tekstowy lub graficzny znak wodny do wielu obrazów naraz, pojedynczy lub powtarzany.',
    metaDescription: 'Dodaj znak wodny do obrazów online za darmo. Nanieś tekst lub logo na zdjęcia JPG, PNG i WebP hurtowo, z ustawieniem krycia i położenia. Działa w przeglądarce.',
    steps: [
      'Dodaj obrazy.',
      'Wybierz tekst lub logo, a następnie ustaw jego rozmiar, krycie, położenie i układ.',
      'Zastosuj i pobierz wyniki lub archiwum ZIP.',
    ],
    faq: [
      { q: 'Czy mogę używać urdu lub innych alfabetów?', a: 'Tak. Znaki wodne na obrazach używają czcionek Twojego urządzenia, więc działa każde pismo, które potrafi wyświetlić system.' },
      { q: 'Czy zmienia moje oryginały?', a: 'Nie. Kopie ze znakiem wodnym są zapisywane jako nowe pliki.' },
      { q: 'Czy dane EXIF lub lokalizacji są zachowywane?', a: 'Nie. Ponowne kodowanie przez canvas usuwa metadane EXIF, takie jak model aparatu i lokalizacja GPS, co często jest pożądane przed udostępnieniem zdjęcia. Profile kolorów również nie są zachowywane.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
      'Pliki logo: PNG, JPG lub WebP, do 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG na PNG / JPG',
    description: 'Zamieniaj grafiki wektorowe SVG na obrazy PNG, JPG lub WebP w dowolnym rozmiarze.',
    metaDescription: 'Konwertuj SVG na PNG lub JPG online za darmo. Wybierz skalę lub dokładną szerokość, aby uzyskać ostry wynik; PNG zachowuje przezroczystość. Działa w przeglądarce.',
    steps: [
      'Dodaj pliki SVG.',
      'Wybierz PNG, JPG lub WebP oraz rozmiar wyjściowy.',
      'Konwertuj i pobierz.',
    ],
    faq: [
      { q: 'Czy obraz pozostanie ostry w dużych rozmiarach?', a: 'Tak. SVG jest rysowany w wybranym rozmiarze, więc eksport 4× jest tak samo wyraźny jak 1×.' },
      { q: 'Dlaczego mój SVG wygląda inaczej?', a: 'Przeglądarki nie obsługują wszystkich funkcji SVG, a pliki SVG korzystające z zewnętrznych czcionek lub obrazów wracają do ustawień domyślnych. Aby uzyskać najlepszy wynik, osadź czcionki i obrazy wewnątrz pliku SVG.' },
      { q: 'Czy bezpiecznie jest otwierać tutaj pliki SVG?', a: 'Tak. SVG jest rysowany jako obraz, więc skrypty w nim zawarte nie są uruchamiane.' },
    ],
    limits: [
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii.',
      'Czcionki, obrazy i style podłączone spoza pliku SVG nie są wczytywane.',
      'SVG bez podanego rozmiaru używa swojego viewBox, a jeśli go nie ma, rozmiaru 300 × 150 px.',
    ],
  },
  'enlarge-image': {
    name: 'Powiększanie obrazu',
    description: 'Powiększaj obrazy z płynnym, ostrym próbkowaniem: od 2× do 4× lub do zadanej szerokości.',
    metaDescription: 'Powiększaj obrazy online za darmo. Skaluj JPG, PNG i WebP 2×, 3×, 4× lub do dokładnej szerokości z próbkowaniem Lanczos i opcjonalnym wyostrzaniem.',
    steps: [
      'Dodaj obrazy.',
      'Wybierz współczynnik lub docelową szerokość oraz to, czy wyostrzać.',
      'Powiększ i pobierz.',
    ],
    faq: [
      { q: 'Czy to jest skalowanie z użyciem AI?', a: 'Nie. Narzędzie używa wysokiej jakości próbkowania, dzięki któremu powiększone obrazy są gładkie i czyste, ale nie potrafi dorysować brakujących szczegółów. Bardzo małe lub nieostre zdjęcia nadal będą wyglądać miękko.' },
      { q: 'Jak duży może być wynik?', a: 'Do 16 000 px na bok i około 100 megapikseli, w zależności od możliwości przeglądarki.' },
      { q: 'Czy dane EXIF lub lokalizacji są zachowywane?', a: 'Nie. Ponowne kodowanie przez canvas usuwa metadane EXIF, takie jak model aparatu i lokalizacja GPS, co często jest pożądane przed udostępnieniem zdjęcia. Profile kolorów również nie są zachowywane.' },
    ],
    limits: [
      'Animowane pliki GIF lub WebP są konwertowane tylko na podstawie pierwszej klatki.',
      'Maksymalnie 25 MB na plik i 20 plików w jednej partii, aby przeglądarka działała płynnie.',
      'Metadane EXIF i osadzone profile kolorów nie są zachowywane.',
      'Narzędzie nie dodaje szczegółów, więc nie jest skalowaniem z użyciem AI.',
      'Wynik jest ograniczony do 16 000 px na bok.',
    ],
  },
  'blur-image-area': {
    name: 'Rozmycie lub pikselizacja obszaru',
    description: 'Ukryj twarze, tablice rejestracyjne lub prywatne szczegóły, rozmywając, pikselizując lub zasłaniając obszary.',
    metaDescription: 'Rozmyj lub spikseluj fragment obrazu online za darmo. Narysuj ramki na twarzach, tablicach rejestracyjnych lub tekście i ukryj je w przeglądarce.',
    steps: [
      'Dodaj obraz.',
      'Przeciągnij po obrazie, aby narysować ramki nad tym, co chcesz ukryć.',
      'Wybierz rozmycie, pikselizację lub czarny prostokąt, zastosuj i pobierz.',
    ],
    faq: [
      { q: 'Czy rozmycie jest bezpieczne dla poufnych szczegółów?', a: 'W przypadku wszystkiego, co musi pozostać prywatne, takiego jak numery dokumentów czy tablice rejestracyjne, użyj czarnego prostokąta. Rozmycie i pikselizację można czasem częściowo odwrócić.' },
      { q: 'Czy narzędzie samo wykrywa twarze?', a: 'Nie. Ramki rysujesz samodzielnie. Automatyczne wykrywanie wymaga dużego modelu AI, którego tu nie ma.' },
      { q: 'Czy mogę zmienić zdanie?', a: 'Tak. Przed zastosowaniem możesz usunąć lub narysować ramki od nowa. Twój oryginalny plik nigdy nie jest zmieniany.' },
      { q: 'Czy dane EXIF lub lokalizacji są zachowywane?', a: 'Nie. Ponowne kodowanie przez canvas usuwa metadane EXIF, takie jak model aparatu i lokalizacja GPS, co często jest pożądane przed udostępnieniem zdjęcia. Profile kolorów również nie są zachowywane.' },
    ],
    limits: [
      'Jeden obraz naraz, do 25 MB.',
      'Obszary wybiera się ręcznie; nie ma wykrywania twarzy.',
      'W przypadku obrazów animowanych używana jest pierwsza klatka.',
    ],
  },
  'qr-code-scanner': {
    name: 'Skaner kodów QR',
    description: 'Odczytuj kody QR ze zdjęć i zrzutów ekranu i zobacz dokładnie, co zawierają.',
    metaDescription: 'Zeskanuj kod QR z obrazu online za darmo. Dodaj zdjęcie lub zrzut ekranu, aby odczytać link, tekst lub dane sieci Wi-Fi. Działa w przeglądarce.',
    steps: [
      'Dodaj jeden lub kilka obrazów zawierających kod QR.',
      'Kod jest odczytywany automatycznie.',
      'Skopiuj wynik albo otwórz link po jego sprawdzeniu.',
    ],
    faq: [
      { q: 'Czy mogę skanować aparatem?', a: 'Jeszcze nie. To narzędzie odczytuje kody QR z plików obrazów. Na telefonie zrób zdjęcie kodu i wybierz je tutaj albo użyj aplikacji aparatu.' },
      { q: 'Czy bezpiecznie jest otwierać zeskanowane linki?', a: 'Najpierw sprawdź adres. Wyświetlany jest pełny link, a stąd można otworzyć tylko linki internetowe (http lub https). Linków skryptowych i data nigdy się nie otwiera.' },
      { q: 'Dlaczego nie znaleziono kodu?', a: 'Kod może być nieostry, przycięty, zbyt mały lub mieć niski kontrast. Spróbuj użyć ostrzejszego, bliższego obrazu, na którym widać cały kod z wyraźnym marginesem wokół niego.' },
    ],
    limits: [
      'Do 10 obrazów, po 25 MB każdy.',
      'Z jednego obrazu odczytywany jest jeden kod.',
      'Tylko standardowe kody QR; inne kody kreskowe nie są obsługiwane.',
    ],
  },
  'gif-maker': {
    name: 'Kreator GIF',
    description: 'Zamień swoje obrazy w animowany GIF z własnym czasem, rozmiarem i zapętleniem.',
    metaDescription: 'Utwórz animowany GIF z obrazów online za darmo. Zmieniaj kolejność klatek, ustaw opóźnienie, rozmiar i zapętlenie, a następnie pobierz GIF. Tworzony w przeglądarce.',
    steps: [
      'Dodaj co najmniej dwa obrazy (lub jeden, aby uzyskać nieruchomy GIF).',
      'Przeciągnij je w odpowiedniej kolejności, ustaw czas wyświetlania każdej klatki oraz wybierz rozmiar, zapętlenie i kolory.',
      'Utwórz GIF, obejrzyj podgląd i pobierz.',
    ],
    faq: [
      { q: 'Dlaczego mój GIF jest tak duży?', a: 'GIF zapisuje każdą klatkę jako obraz ograniczony do 256 kolorów. Mniej klatek, mniejsza szerokość i mniej kolorów zmniejszają plik. Narzędzie pokazuje rozmiar zaraz po utworzeniu GIF-a.' },
      { q: 'Czy mogę zachować przezroczyste obszary?', a: 'Tak, włącz opcję „Zachowaj przezroczyste obszary” dla obrazów PNG lub WebP z przezroczystością. Przezroczystość w GIF jest włączona lub wyłączona dla każdego piksela, więc miękkie krawędzie stają się ostre.' },
    ],
    limits: [
      'Do 100 klatek; im większe klatki, tym więcej pamięci potrzebuje przeglądarka.',
      'GIF-y są ograniczone do 256 kolorów na klatkę, więc zdjęcia mogą wyglądać ziarnisto.',
      'Z animowanych plików wejściowych (GIF, WebP) brana jest tylko pierwsza klatka.',
    ],
  },
  'photo-editor': {
    name: 'Edytor zdjęć',
    description: 'Koryguj, filtruj, obracaj, przycinaj zdjęcia i dodawaj do nich tekst z podglądem na żywo.',
    metaDescription: 'Darmowy edytor zdjęć online. Koryguj kolory, stosuj filtry, obracaj, prostuj, przycinaj i dodawaj tekst, a następnie pobierz PNG, JPG lub WebP. Prywatnie, w przeglądarce.',
    steps: [
      'Dodaj zdjęcie.',
      'Za pomocą kart koryguj kolory, zastosuj filtr, obróć lub przytnij zdjęcie i dodaj tekst. Podgląd aktualizuje się na bieżąco.',
      'Wybierz format i pobierz edytowane zdjęcie.',
    ],
    faq: [
      { q: 'Czy oryginalny plik jest zmieniany?', a: 'Nie. Twój plik nigdy nie jest modyfikowany; edytowany obraz powstaje jako nowy plik do pobrania.' },
      { q: 'Czy eksport obniża jakość?', a: 'PNG zachowuje każdy piksel. JPG i WebP są stratne; użyj jakości 90 lub wyższej, aby zdjęcia wyglądały tak samo. Zmiany są stosowane w pełnym rozmiarze zdjęcia, a nie w rozmiarze podglądu.' },
    ],
    limits: [
      'Jedno zdjęcie naraz, do 25 MB i około 50 megapikseli.',
      'Zmiany są stosowane w stałej kolejności: obrót i przycięcie, korekta kolorów, rozmycie i wyostrzenie, winieta, a na końcu tekst.',
      'Szczegóły EXIF, takie jak lokalizacja, nie są kopiowane do edytowanego zdjęcia.',
      'Brak warstw, pędzli i funkcji AI.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG na PDF',
    description: 'Zamień zdjęcia JPG na PDF, jeden obraz na stronę.',
    metaDescription: 'Konwertuj JPG na PDF online za darmo. Wybierz rozmiar strony, orientację i marginesy. Dane JPEG są osadzane bez ponownej kompresji.',
    steps: [
      'Dodaj pliki JPG i ustaw ich kolejność, przeciągając je lub używając strzałek.',
      'Wybierz rozmiar strony, orientację i margines.',
      'Utwórz plik PDF i pobierz go.',
    ],
    faq: [
      { q: 'Czy jakość obrazu się pogarsza?', a: 'Nie. Pliki JPG są osadzane w pliku PDF w niezmienionej postaci, bez ponownej kompresji.' },
    ],
    limits: [
      'Maksymalnie 25 MB na obraz i 100 obrazów w jednym pliku PDF.',
      'Tutaj akceptowane są tylko obrazy JPG; w przypadku różnych formatów użyj narzędzia Obrazy na PDF.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG na PDF',
    description: 'Zamień obrazy PNG na PDF, zachowując przezroczystość.',
    metaDescription: 'Konwertuj PNG na PDF online za darmo. Wybierz rozmiar strony i marginesy; przezroczystość zostaje zachowana. Działa w przeglądarce.',
    steps: [
      'Dodaj pliki PNG i ustaw ich kolejność.',
      'Wybierz rozmiar strony, orientację i margines.',
      'Utwórz plik PDF i pobierz go.',
    ],
    faq: [
      { q: 'Czy przezroczystość zostaje zachowana?', a: 'Tak. Obrazy PNG są osadzane wraz z kanałem alfa, więc przezroczyste obszary pokazują białą stronę znajdującą się pod nimi.' },
    ],
    limits: [
      'Maksymalnie 25 MB na obraz i 100 obrazów w jednym pliku PDF.',
      'Tutaj akceptowane są tylko obrazy PNG; w przypadku różnych formatów użyj narzędzia Obrazy na PDF.',
    ],
  },
  'images-to-pdf': {
    name: 'Obrazy na PDF',
    description: 'Połącz obrazy JPG i PNG w jeden plik PDF w wybranej kolejności.',
    metaDescription: 'Połącz wiele obrazów w jeden plik PDF online za darmo. Zmieniaj kolejność stron, wybierz rozmiar strony i marginesy. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj obrazy JPG i PNG (możesz upuścić kilka naraz).',
      'Ustaw ich kolejność oraz wybierz rozmiar strony, orientację i margines.',
      'Utwórz plik PDF i pobierz go.',
    ],
    faq: [
      { q: 'Jakie formaty obrazów są obsługiwane?', a: 'JPG i PNG są osadzane bezpośrednio. WebP, GIF i BMP są najpierw konwertowane na PNG, jeśli Twoja przeglądarka potrafi je zdekodować.' },
      { q: 'Co robi opcja „Dopasuj do obrazu”?', a: 'Każda strona otrzymuje rozmiar swojego obrazu, więc nic nie jest skalowane ani dopełniane. Wybierz A4 lub Letter, aby uzyskać standardowe strony dokumentu.' },
    ],
    limits: [
      'Maksymalnie 25 MB na obraz i 100 obrazów w jednym pliku PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Scal PDF',
    description: 'Połącz kilka plików PDF w jeden dokument w wybranej kolejności.',
    metaDescription: 'Scalaj pliki PDF online za darmo. Połącz wiele plików PDF w jeden, zmień ich kolejność i od razu pobierz. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj co najmniej dwa pliki PDF.',
      'Ustaw je w żądanej kolejności za pomocą strzałek.',
      'Scal i pobierz połączony plik PDF.',
    ],
    faq: [
      { q: 'Czy zakładki i pola formularzy są zachowywane?', a: 'Strony są kopiowane wraz z widoczną zawartością i linkami. Zakładki na poziomie dokumentu oraz interaktywne dane formularzy nie są przenoszone.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Zakładki/spisy treści i pola formularzy z plików źródłowych nie są scalane.',
    ],
  },
  'split-pdf': {
    name: 'Podziel PDF',
    description: 'Podziel plik PDF według zakresów stron, na pojedyncze strony lub na części o stałym rozmiarze.',
    metaDescription: 'Podziel plik PDF online za darmo. Rozdziel go według zakresów stron, na każdą stronę lub co N stron i pobierz jako ZIP. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz sposób podziału: własne zakresy, np. 1-3, 4-6, każda strona lub co N stron.',
      'Podziel i pobierz części osobno albo jako archiwum ZIP.',
    ],
    faq: [
      { q: 'Jak zapisywać zakresy?', a: 'Pliki wynikowe oddzielaj przecinkami. Każdy plik może być zakresem (1-3), pojedynczą stroną (5) lub połączeniem rozdzielonym znakiem plus (1-2+7). Przykład: 1-3, 4-6, 7+9.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
    ],
  },
  'rotate-pdf': {
    name: 'Obróć PDF',
    description: 'Obracaj pojedyncze strony lub cały plik PDF, z podglądem miniatur.',
    metaDescription: 'Obracaj strony PDF online za darmo. Obróć pojedyncze lub wszystkie strony o 90, 180 lub 270 stopni i zapisz nowy plik PDF. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF; jego strony pojawią się jako miniatury.',
      'Obróć pojedyncze strony albo wszystkie naraz.',
      'Zapisz obrócony plik PDF.',
    ],
    faq: [
      { q: 'Czy obrót jest trwały?', a: 'Jest zapisywany w nowym pliku PDF jako atrybut obrotu strony. Zawartość strony nie jest rysowana na nowo, więc nic nie zostaje utracone.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Wyodrębnianie stron PDF',
    description: 'Wybierz potrzebne strony z pliku PDF i zapisz je jako nowy dokument.',
    metaDescription: 'Wyodrębnij strony z pliku PDF online za darmo. Zaznacz strony na podglądzie lub podaj zakres i zapisz nowy plik PDF. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Kliknij miniatury stron, aby je zaznaczyć, lub wpisz zakres, np. 1-3, 8.',
      'Wyodrębnij i pobierz nowy plik PDF.',
    ],
    faq: [
      { q: 'Czy mogę użyć tego do usuwania stron?', a: 'Tak. Zaznacz strony, które chcesz zachować, i wyodrębnij je; pozostałe zostaną pominięte w nowym pliku.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Zmiana kolejności stron PDF',
    description: 'Zmieniaj kolejność, usuwaj i obracaj strony na podglądzie, a następnie zapisz wynik.',
    metaDescription: 'Zmień kolejność stron PDF online za darmo. Przeciągaj lub przesuwaj strony, usuń zbędne i zapisz nowy plik PDF. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF; jego strony pojawią się jako miniatury.',
      'Przeciągaj strony lub użyj przycisków ze strzałkami, aby zmienić ich kolejność. Usuń strony, których nie potrzebujesz.',
      'Zapisz plik PDF ze zmienioną kolejnością.',
    ],
    faq: [
      { q: 'Czy mogę zmieniać kolejność za pomocą klawiatury?', a: 'Tak. Użyj przycisków przesunięcia wcześniej i później przy każdej stronie.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF na JPG',
    description: 'Renderuj strony PDF jako obrazy JPG w wybranej rozdzielczości.',
    metaDescription: 'Konwertuj PDF na JPG online za darmo. Renderuj wszystkie strony lub wybrane w rozdzielczości do 300 DPI i pobierz archiwum ZIP. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz rozdzielczość oraz, opcjonalnie, strony do konwersji.',
      'Konwertuj i pobierz obrazy osobno albo jako archiwum ZIP.',
    ],
    faq: [
      { q: 'Jaką rozdzielczość wybrać?', a: '150 DPI nadaje się na ekran, 300 DPI do druku. Wyższe wartości dają większe obrazy i wymagają więcej pamięci.' },
      { q: 'Czy strony są renderowane dokładnie?', a: 'Renderowanie korzysta z PDF.js firmy Mozilla, które dobrze radzi sobie z większością plików PDF. Nietypowe czcionki lub zaawansowana grafika mogą wyglądać nieco inaczej niż w innych przeglądarkach plików PDF.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Każda strona jest ograniczona do około 50 megapikseli.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF na PNG',
    description: 'Renderuj strony PDF jako ostre, bezstratne obrazy PNG.',
    metaDescription: 'Konwertuj PDF na PNG online za darmo. Renderuj strony w rozdzielczości do 300 DPI jako bezstratne obrazy i pobierz archiwum ZIP. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz rozdzielczość i strony.',
      'Konwertuj i pobierz obrazy osobno albo jako archiwum ZIP.',
    ],
    faq: [
      { q: 'Dlaczego wybrać PNG zamiast JPG?', a: 'PNG zachowuje ostrość tekstu i grafiki liniowej oraz obsługuje przezroczystość. Pliki są większe niż JPG.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Każda strona jest ograniczona do około 50 megapikseli.',
    ],
  },
  'pdf-viewer': {
    name: 'Przeglądarka PDF',
    description: 'Otwieraj i czytaj pliki PDF prywatnie w przeglądarce, z powiększaniem i nawigacją po stronach.',
    metaDescription: 'Przeglądaj pliki PDF online za darmo. Powiększaj, przechodź do wybranej strony i czytaj dokumenty w przeglądarce bez przesyłania ich gdziekolwiek.',
    steps: [
      'Dodaj plik PDF.',
      'Przewijaj lub używaj elementów sterowania stronami, aby się poruszać.',
      'Powiększaj lub pomniejszaj według potrzeb.',
    ],
    faq: [
      { q: 'Czy mogę tutaj edytować lub adnotować plik PDF?', a: 'Nie. To przeglądarka tylko do odczytu. Do obracania, zmiany kolejności lub wyodrębniania stron użyj narzędzi do stron.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Tylko do odczytu: bez adnotacji, wypełniania formularzy i wyszukiwania tekstu.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Podgląd metadanych PDF',
    description: 'Sprawdź tytuł, autora, daty utworzenia, liczbę stron, rozmiary stron i wersję pliku PDF.',
    metaDescription: 'Wyświetl metadane PDF online za darmo. Zobacz tytuł, autora, program tworzący, daty, liczbę stron i ich rozmiary bez przesyłania pliku.',
    steps: [
      'Dodaj plik PDF.',
      'Przejrzyj właściwości dokumentu.',
      'W razie potrzeby skopiuj szczegóły jako JSON.',
    ],
    faq: [
      { q: 'Dlaczego brakuje niektórych metadanych?', a: 'Wiele plików PDF nie ustawia wszystkich pól. Wyświetlane są tylko pola faktycznie zapisane w pliku.' },
      { q: 'Czy mogę usunąć metadane?', a: 'To narzędzie tylko odczytuje metadane. Nie modyfikuje pliku.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Tylko do odczytu: metadanych nie można tu edytować ani usuwać.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Usuń strony PDF',
    description: 'Usuń zbędne strony i zapisz pozostałe jako nowy plik PDF.',
    metaDescription: 'Usuń strony z pliku PDF online za darmo. Zaznacz strony na podglądzie lub podaj zakres, usuń je i pobierz resztę. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj plik PDF; jego strony pojawią się jako miniatury.',
      'Kliknij strony, które chcesz usunąć, lub wpisz zakres, np. 2, 5-7.',
      'Usuń je i pobierz nowy plik PDF.',
    ],
    faq: [
      { q: 'Czy zmienia mój oryginalny plik?', a: 'Nie. Otrzymujesz nowy plik PDF bez zaznaczonych stron. Oryginał pozostaje bez zmian.' },
      { q: 'Czy mogę usunąć wszystkie strony?', a: 'Nie. Przynajmniej jedna strona musi zostać.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
    ],
  },
  'add-page-numbers': {
    name: 'Dodaj numery stron',
    description: 'Ponumeruj strony pliku PDF, wybierając położenie, format i styl.',
    metaDescription: 'Dodaj numery stron do pliku PDF online za darmo. Wybierz położenie, format, np. „Strona 1 z 10”, numer początkowy i rozmiar czcionki. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz miejsce numerów, ich format oraz strony do ponumerowania.',
      'Dodaj numery i pobierz plik PDF.',
    ],
    faq: [
      { q: 'Czy mogę pominąć stronę tytułową?', a: 'Tak. Ustaw „Pierwsza strona do numerowania” na 2, a następnie wybierz, jaki numer ma na niej być wyświetlony.' },
      { q: 'Czy działa na obróconych stronach?', a: 'Tak. Numery są umieszczane względem tego, co widzisz na ekranie, także na stronach, które są obrócone.' },
      { q: 'Jakiej czcionki używa?', a: 'Helvetica, która obejmuje cyfry i litery łacińskie.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Numery są rysowane na wierzchu każdej strony, nigdy za istniejącą zawartością.',
      'Używa wbudowanej czcionki Helvetica.',
    ],
  },
  'watermark-pdf': {
    name: 'Znak wodny w PDF',
    description: 'Nanieś tekst lub obraz na strony PDF z regulowanym kryciem i kątem.',
    metaDescription: 'Dodaj znak wodny do pliku PDF online za darmo. Nanieś tekst lub obraz, pojedynczo lub kafelkowo, z własnym kryciem i obrotem. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz tekstowy lub graficzny znak wodny, a następnie ustaw jego rozmiar, krycie, kąt i układ.',
      'Zastosuj go na wszystkich stronach lub wybranych, a następnie pobierz.',
    ],
    faq: [
      { q: 'Czy znak wodny można usunąć?', a: 'Jest rysowany na wierzchu strony i nie stanowi zabezpieczenia. Każdy, kto ma edytor PDF, może go usunąć. Aby uzyskać silniejszą ochronę, połącz go z narzędziem Zabezpiecz PDF.' },
      { q: 'Czy mogę używać urdu, arabskiego lub innych alfabetów?', a: 'Nie jako wpisanego tekstu, ponieważ wbudowane czcionki PDF obejmują tylko litery łacińskie. Przygotuj przezroczysty obraz PNG ze swoim tekstem i skorzystaj z opcji obrazu.' },
      { q: 'Czy znak wodny jest przed tekstem strony, czy za nim?', a: 'Przed nim. Zmniejsz krycie, aby strona pozostała czytelna.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Tekstowe znaki wodne obsługują tylko litery łacińskie, cyfry i popularne symbole.',
      'Obrazy znaku wodnego: PNG lub JPG, do 5 MB.',
      'Znak jest rysowany na wierzchu istniejącej zawartości strony.',
    ],
  },
  'crop-pdf': {
    name: 'Przytnij PDF',
    description: 'Przytnij marginesy lub zachowaj wybrany obszar na każdej stronie, z podglądem strony na żywo.',
    metaDescription: 'Przycinaj strony PDF online za darmo. Przeciągnij ramkę na podglądzie strony lub wpisz marginesy, a następnie zastosuj do wszystkich lub wybranych stron. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF i wybierz stronę do podglądu.',
      'Przeciągnij ramkę lub wpisz marginesy, aby zaznaczyć obszar do zachowania.',
      'Wybierz strony do przycięcia, a następnie pobierz.',
    ],
    faq: [
      { q: 'Czy odcięta zawartość jest usuwana?', a: 'Nie. Przycinanie zmienia widoczny obszar każdej strony, ale zawartość poza nim nadal znajduje się w pliku. Nie polegaj na przycinaniu, aby ukryć poufne informacje.' },
      { q: 'Co, jeśli moje strony mają różne rozmiary?', a: 'Te same proporcje są stosowane do każdej wybranej strony, więc strony o różnych rozmiarach są przycinane o ten sam procent.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Przycinanie ukrywa zawartość, ale jej nie usuwa.',
      'Obszar przycięcia jest częścią każdej strony, a nie stałym rozmiarem w milimetrach.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Edytuj metadane PDF',
    description: 'Zmień tytuł, autora, temat i słowa kluczowe pliku PDF lub usuń wszystkie metadane.',
    metaDescription: 'Edytuj metadane PDF online za darmo. Zmień tytuł, autora, temat i słowa kluczowe albo usuń wszystkie właściwości dokumentu. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj plik PDF; jego bieżące właściwości zostaną wypełnione.',
      'Edytuj pola albo wybierz Usuń wszystkie metadane.',
      'Zapisz i pobierz zaktualizowany plik PDF.',
    ],
    faq: [
      { q: 'Co usuwa opcja „Usuń wszystkie metadane”?', a: 'Informacje o dokumencie (tytuł, autora, temat, słowa kluczowe, twórcę, program tworzący i daty) oraz osadzone metadane XMP. Nie dotyka tekstu stron, obrazów ani komentarzy.' },
      { q: 'Po co edytować metadane?', a: 'Aby poprawić błędny tytuł wyświetlany na kartach przeglądarki i w wynikach wyszukiwania, wskazać właściwego autora lub usunąć dane osobowe przed udostępnieniem pliku.' },
      { q: 'Czy obsługuje tekst w alfabetach innych niż łaciński?', a: 'Tak. Tytuły i autorzy w urdu, arabskim, chińskim i innych pismach są zapisywane poprawnie.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Zmieniane są tylko właściwości na poziomie dokumentu. Komentarze, dane formularzy i zawartość stron pozostają bez zmian.',
    ],
  },
  "protect-pdf": {
    name: "Zabezpiecz PDF",
    description: "Zablokuj plik PDF hasłem z szyfrowaniem AES-256.",
    metaDescription: "Zabezpiecz PDF hasłem online za darmo. Szyfrowanie AES-256 odbywa się w przeglądarce; Twój plik i hasło nigdy nie są przesyłane.",
    steps: [
      "Dodaj plik PDF.",
      "Wpisz hasło dwa razy i wybierz, co mogą robić czytelnicy (drukować, kopiować, edytować).",
      "Zabezpiecz go i pobierz zaszyfrowaną kopię.",
    ],
    faq: [
      { q: "Jak silna jest ochrona?", a: "Pliki są szyfrowane AES-256, najsilniejszym standardowym szyfrowaniem PDF. W praktyce bezpieczeństwo zależy od hasła: użyj długiego, którego nie używasz nigdzie indziej." },
      { q: "Co jeśli zapomnę hasła?", a: "Nie da się go odzyskać i nie ma resetowania hasła. Przechowuj oryginalny plik i hasło w bezpiecznym miejscu." },
      { q: "Czy opcje drukowania, kopiowania i edycji są egzekwowane?", a: "To prośby, które respektuje większość programów PDF, ale nie są nie do obejścia. To hasło naprawdę chroni plik." },
    ],
    limits: [
      "Maksymalnie 100 MB na plik PDF.",
      "Hasła: do 127 standardowych znaków (litery, cyfry i symbole).",
      "PDF, który ma już hasło, trzeba najpierw odblokować.",
      "Bardzo stare czytniki PDF (sprzed około 2008 r.) mogą nie otworzyć plików AES-256.",
    ],
  },
  'unlock-pdf': {
    name: 'Odblokuj PDF',
    description: 'Usuń hasło z pliku PDF, do którego masz dostęp, aby otwierał się bez ograniczeń.',
    metaDescription: 'Odblokuj plik PDF chroniony hasłem online za darmo. Wpisz hasło, aby zapisać kopię bez zabezpieczeń; przetwarzanie w przeglądarce, bez przesyłania.',
    steps: [
      'Dodaj chroniony plik PDF.',
      'Wpisz jego hasło, jeśli zostaniesz o nie poproszony. Pliki PDF, które jedynie ograniczają drukowanie lub kopiowanie, go nie wymagają.',
      'Pobierz odblokowaną kopię.',
    ],
    faq: [
      { q: 'Czy może odblokować plik PDF, jeśli zapomniałem hasła?', a: 'Nie. To narzędzie nigdy nie zgaduje ani nie łamie haseł. Usuwa zabezpieczenie tylko wtedy, gdy podasz prawidłowe hasło lub gdy plik jedynie ogranicza działania, takie jak drukowanie.' },
      { q: 'Czy to jest dozwolone?', a: 'Używaj go tylko na plikach, których jesteś właścicielem lub do których masz pozwolenie na otwarcie. Odpowiadasz za sposób wykorzystania wyniku.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Obsługuje standardowe zabezpieczenie hasłem plików PDF (RC4 i AES).',
      'Podpis cyfrowy traci ważność po ponownym zapisaniu pliku.',
      'Pliki zabezpieczone certyfikatem lub DRM nie są obsługiwane.',
    ],
  },
  'extract-pdf-text': {
    name: 'Wyodrębnij tekst z PDF',
    description: 'Skopiuj cały zaznaczalny tekst z pliku PDF, strona po stronie.',
    metaDescription: 'Wyodrębnij tekst z pliku PDF online za darmo. Pobierz zaznaczalny tekst wszystkich stron lub wybranego zakresu, skopiuj go lub zapisz jako .txt. Działa w przeglądarce.',
    steps: [
      'Dodaj plik PDF.',
      'Wybierz wszystkie strony lub zakres oraz to, czy oznaczać podziały stron.',
      'Skopiuj tekst lub pobierz go jako plik .txt.',
    ],
    faq: [
      { q: 'Dlaczego wynik jest pusty?', a: 'Plik PDF to prawdopodobnie skan, czyli obraz tekstu, a nie prawdziwy tekst. Jego odczytanie wymaga OCR (rozpoznawania tekstu), którego to narzędzie nie wykonuje.' },
      { q: 'Czy układ jest zachowany?', a: 'Wiersze i akapity są odtwarzane najlepiej, jak się da, ale kolumny, tabele i przypisy mogą pojawić się w innej kolejności.' },
      { q: 'Czy narzędzie otworzy pliki PDF chronione hasłem?', a: 'Nie. Zaszyfrowane pliki PDF są wykrywane i odrzucane z czytelnym komunikatem. Najpierw usuń hasło za pomocą naszego narzędzia Odblokuj PDF.' },
    ],
    limits: [
      'Maksymalnie 100 MB na plik PDF.',
      'Pliki PDF chronione hasłem (zaszyfrowane) nie są obsługiwane.',
      'Bardzo duże lub złożone pliki PDF zależą od pamięci Twojego urządzenia.',
      'Wyodrębniany jest tylko prawdziwy tekst; zeskanowane strony wymagają OCR.',
      'Kolejność odczytu wynika z pliku PDF i w złożonych układach może różnić się od kolejności widocznej.',
    ],
  },
  "compress-pdf": {
    name: "Kompresuj PDF",
    description: "Zmniejsz PDF, kompresując ponownie jego obrazy, przy zachowaniu możliwości zaznaczania tekstu.",
    metaDescription: "Kompresuj PDF online za darmo. Wybierz ekstremalną, zalecaną lub lekką kompresję, aby zmniejszyć rozmiar, zachowując możliwość zaznaczania tekstu. Działa w przeglądarce.",
    steps: [
      "Dodaj plik PDF.",
      "Wybierz ekstremalną, zalecaną lub lekką kompresję. Tekst pozostaje zaznaczalny; ponownie kompresowane są tylko obrazy.",
      "Kompresuj, sprawdź zaoszczędzony rozmiar i pobierz wynik.",
    ],
    faq: [
      { q: "Dlaczego mój PDF prawie się nie zmniejszył?", a: "Narzędzie kompresuje ponownie obrazy JPEG, więc najbardziej pomaga przy plikach PDF pełnych zdjęć lub skanów. PDF złożony głównie z tekstu albo z małymi już obrazami nie może się wiele zmniejszyć. Gdy nic nie da się zaoszczędzić, narzędzie mówi o tym i oddaje oryginalny plik zamiast większego." },
      { q: "Czy jakość się pogorszy?", a: "Obrazy tracą trochę szczegółów w zamian za rozmiar; lekka kompresja zostawia je prawie bez zmian, a ekstremalna wyraźnie je zmiękcza. Tekst i grafika wektorowa nie są ruszane, więc tekst pozostaje zaznaczalny i przeszukiwalny." },
    ],
    limits: [
      "Ponownie kompresowane są tylko osadzone obrazy JPEG. Obrazy typu PNG (Flate), czcionki i inna zawartość pozostają bez zmian.",
      "Kolory ponownie skompresowanych obrazów mogą nieznacznie się przesunąć.",
      "Maksymalnie 100 MB na plik PDF. Pliki PDF chronione hasłem trzeba najpierw odblokować.",
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Rozpoznaj tekst w zeskanowanych plikach PDF (angielski) i uzyskaj przeszukiwalny plik PDF.',
    metaDescription: 'OCR PDF online za darmo. Rozpoznaj angielski tekst w zeskanowanych plikach PDF i pobierz przeszukiwalny PDF lub zwykły tekst. Silnik OCR działa lokalnie w przeglądarce.',
    steps: [
      'Dodaj zeskanowany plik PDF.',
      'Wybierz strony i jakość. Strony, które już zawierają zaznaczalny tekst, można pominąć.',
      'Uruchom OCR, sprawdź rozpoznany tekst i pobierz przeszukiwalny plik PDF lub plik tekstowy.',
    ],
    faq: [
      { q: 'Jakie języki są obsługiwane?', a: 'Na razie tylko angielski. Tekst w innych językach zostanie odczytany błędnie. Kolejne języki można dodać później bez zmiany sposobu działania narzędzia.' },
      { q: 'Jak dokładne jest rozpoznawanie?', a: 'Najlepiej sprawdzają się czyste, proste skany tekstu drukowanego w rozdzielczości 200–300 DPI. Pismo odręczne, bardzo drobny druk oraz strony o niskim kontraście lub przekrzywione dają więcej błędów. Zawsze sprawdzaj ważne liczby.' },
    ],
    limits: [
      'Tylko angielski. Pismo odręczne nie jest rozpoznawane wiarygodnie.',
      'Oryginalne strony pozostają dokładnie takie, jakie są; dodawana jest niewidoczna warstwa tekstowa, dzięki której tekst można przeszukiwać i kopiować.',
      'OCR działa wolno w dużych dokumentach (kilka sekund na stronę). Przy pierwszym uruchomieniu wczytywany jest też silnik (około 3 MB).',
      'Maksymalnie 100 MB na plik PDF. Bardzo duże strony mogą zostać odrzucone, aby chronić przeglądarkę.',
    ],
  },
  'sign-pdf': {
    name: 'Podpisz PDF',
    description: 'Narysuj, wpisz lub dodaj podpis i umieść go na stronach PDF.',
    metaDescription: 'Podpisz plik PDF online za darmo. Narysuj, wpisz lub dodaj swój podpis, umieść go na dowolnych stronach i pobierz podpisany PDF. Podpis wizualny, w przeglądarce.',
    steps: [
      'Dodaj plik PDF, który chcesz podpisać.',
      'Utwórz podpis: narysuj go, wpisz swoje imię i nazwisko lub dodaj obraz.',
      'Przeciągnij podpis w odpowiednie miejsce na stronie, wybierz strony, na których ma się znaleźć, i pobierz podpisany plik PDF.',
    ],
    faq: [
      { q: 'Czy to prawnie wiążący podpis cyfrowy?', a: 'To podpis wizualny: obraz Twojego podpisu umieszczony na stronie. Nie jest kryptograficznym podpisem cyfrowym, nie zawiera certyfikatu i nie potrafi udowodnić, kto się podpisał, ani wykryć późniejszych zmian. To, czy zostanie zaakceptowany, zależy od podmiotu, który go wymaga. Niektóre organizacje wymagają certyfikowanych usług podpisu elektronicznego.' },
    ],
    limits: [
      'Tylko podpis wizualny: bez certyfikatu, znacznika czasu i wykrywania zmian.',
      'Podpis jest umieszczany jako obraz na wierzchu strony; nie wypełnia pola podpisu w formularzu.',
      'Maksymalnie 100 MB na plik PDF. Pliki PDF chronione hasłem trzeba najpierw odblokować.',
    ],
  },
  "fill-pdf-forms": {
    name: "Wypełnij formularze PDF",
    description: "Wypełnij pola tekstowe, pola wyboru i menu formularza PDF albo pisz po dowolnym PDF.",
    metaDescription: "Wypełniaj formularze PDF online za darmo. Wpisuj w pola, zaznaczaj pola wyboru i wybieraj opcje w wypełnialnym PDF, a potem pobierz go jako edytowalny lub spłaszczony. W przeglądarce.",
    steps: [
      "Dodaj formularz PDF. Po PDF bez pól możesz pisać, klikając stronę.",
      "Wypełnij pola wymienione pod nazwą pliku. Pola są pogrupowane według stron.",
      "Wybierz, czy formularz ma pozostać edytowalny, czy zostać spłaszczony, i pobierz wypełniony PDF.",
    ],
    faq: [
      { q: "Mój PDF nie pokazuje pól. Dlaczego?", a: "PDF nie ma prawdziwych pól formularza, na przykład to skan lub formularz będący tylko obrazem. Nadal możesz kliknąć stronę tam, gdzie ma być tekst, wpisać go i zapisać kopię z naniesionym tekstem. W formularzach XFA (niektóre formularze urzędowe i bankowe) pól nie da się wypełnić." },
      { q: "Co robi spłaszczanie?", a: "Spłaszczanie wtapia Twoje odpowiedzi w stronę i usuwa pola formularza, więc odpowiedzi nie można już edytować. Użyj go dla kopii, którą wysyłasz; dla siebie zachowaj kopię edytowalną." },
    ],
    limits: [
      "Tekst może zawierać litery łacińskie, cyfry i popularne symbole (czcionka formularza nie ma innych alfabetów).",
      "Pola podpisu i przyciski są wyświetlane, ale nie można ich wypełnić; do podpisów użyj narzędzia Podpisz PDF.",
      "Formularze XFA (dynamiczne): pól nie da się wypełnić, ale możesz pisać po stronach.",
      "Tekst wpisany na PDF bez pól jest zapisywany w stronie i nie można go później edytować.",
      "Maksymalnie 100 MB na plik PDF.",
    ],
  },
  'redact-pdf': {
    name: 'Zaczernij PDF',
    description: 'Zaczerniaj tekst i obszary na stałe: zaczernione strony są odtwarzane jako obrazy.',
    metaDescription: 'Zaczernij dane w pliku PDF online za darmo. Zakryj imiona, numery i obszary tak, aby tekst pod spodem został naprawdę usunięty, a nie tylko zasłonięty. Nic nie jest przesyłane.',
    steps: [
      'Dodaj plik PDF i wybierz stronę.',
      'Narysuj ramki nad tym, co ma zniknąć, albo wyszukaj słowa, adresy e-mail i liczby, aby oznaczyć je automatycznie.',
      'Zastosuj zaczernienia i pobierz plik. Zawsze sprawdź wynik przed udostępnieniem.',
    ],
    faq: [
      { q: 'Czy ukryty tekst jest naprawdę usuwany?', a: 'Tak. Każda strona z zaczernieniem jest odtwarzana jako obraz z namalowanymi czarnymi prostokątami, więc tekst i obiekty pod spodem nie istnieją w nowym pliku. Czarny prostokąt narysowany na tekście, jak robi wiele narzędzi, pozostawiłby tekst zaznaczalnym. Strony, których nie zaczerniałeś, są kopiowane bez zmian.' },
      { q: 'Dlaczego nie mogę już zaznaczać tekstu na zaczernionych stronach?', a: 'Ponieważ te strony są teraz obrazami. W ten sposób zawartość pod spodem zostaje zniszczona. Jeśli potrzebujesz przeszukiwalnego tekstu, uruchom potem OCR PDF; zaczernione słowa pozostaną czarne.' },
      { q: 'Czy znajduje automatycznie każde dopasowanie?', a: 'Wyszukiwanie oznacza dopasowania znajdujące się w jednym wierszu tekstu. Fraza, którą plik PDF dzieli na fragmenty, lub tekst będący częścią obrazu mogą zostać pominięte. Przejrzyj każdą stronę i w razie potrzeby narysuj ramki ręcznie.' },
    ],
    limits: [
      'Zaczernione strony stają się obrazami: bez zaznaczalnego tekstu, linków i pól formularzy na tych stronach.',
      'Automatyczne wyszukiwanie działa tylko na zaznaczalnym tekście i tylko w obrębie jednego fragmentu tekstu; w zeskanowanych stronach ramki trzeba narysować ręcznie.',
      'Właściwości dokumentu (tytuł, autor…) są usuwane z wyniku, chyba że zdecydujesz się je zachować.',
      'Maksymalnie 100 MB na plik PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Porównaj PDF',
    description: 'Zobacz, co zmieniło się między dwoma plikami PDF: różnice w tekście i wyróżnione strony.',
    metaDescription: 'Porównaj dwa pliki PDF online za darmo. Zobacz dodane i usunięte słowa strona po stronie oraz wyróżnione różnice wizualne między wersjami. Przetwarzanie w przeglądarce.',
    steps: [
      'Dodaj oryginalny plik PDF i poprawioną wersję.',
      'Porównaj je: strony są wymienione wraz z liczbą dodanych i usuniętych słów.',
      'Otwórz stronę, aby przeczytać zmiany w tekście, lub przełącz na widok wizualny, aby zobaczyć zmienione obszary na czerwono.',
    ],
    faq: [
      { q: 'Co pokazuje porównanie tekstu?', a: 'Dla każdej strony słowa dodane (na zielono) i usunięte (na czerwono) między dokumentem oryginalnym a poprawionym, z zwiniętym niezmienionym tekstem. Strony są dopasowywane według numeru.' },
      { q: 'A zeskanowane pliki PDF?', a: 'Skany nie mają zaznaczalnego tekstu, więc porównanie tekstu nic nie znajdzie. Użyj porównania wizualnego albo najpierw uruchom OCR PDF na obu plikach.' },
    ],
    limits: [
      'Strony są porównywane według numeru: jeśli wstawiono stronę, kolejne strony zostaną pokazane jako zmienione.',
      'Porównanie wizualne renderuje każdą stronę w rozdzielczości ekranu; drobne różnice poniżej tego poziomu mogą nie być widoczne.',
      'Porównywanych jest do 100 stron na plik. Pliki PDF chronione hasłem trzeba najpierw odblokować.',
    ],
  },
  'word-counter': {
    name: 'Licznik słów',
    description: 'Policz słowa, znaki i zdania oraz oszacuj czas czytania podczas pisania.',
    metaDescription: 'Darmowy licznik słów online. Policz słowa, znaki, zdania i akapity oraz od razu oszacuj czas czytania i mówienia.',
    steps: [
      'Wpisz lub wklej tekst.',
      'Odczytaj statystyki na żywo nad edytorem.',
      'Użyj przycisku Wyczyść, aby zacząć od nowa.',
    ],
    faq: [
      { q: 'Jak liczone są słowa?', a: 'Słowo to dowolny ciąg znaków oddzielony białymi znakami. Wyrazy z łącznikiem liczą się jako jedno, a liczby jako słowa.' },
      { q: 'Jak obliczany jest czas czytania?', a: 'Czas czytania zakłada 238 słów na minutę, a czas mówienia 150 słów na minutę, co są typowymi średnimi dla dorosłych.' },
    ],
    limits: [
      'Liczby opierają się na białych znakach, więc w językach pisanych bez spacji (np. chińskim lub japońskim) każdy ciąg tekstu będzie liczony jako jedno słowo.',
    ],
  },
  'character-counter': {
    name: 'Licznik znaków',
    description: 'Policz znaki ze spacjami i bez nich oraz sprawdź tekst pod kątem typowych limitów długości.',
    metaDescription: 'Darmowy licznik znaków online. Policz znaki ze spacjami i bez, bajty i wiersze oraz sprawdź limity dla postów, metatagów i SMS-ów.',
    steps: [
      'Wpisz lub wklej tekst.',
      'Odczytaj sumy i paski limitów.',
      'Poprawiaj tekst, aż się zmieści.',
    ],
    faq: [
      { q: 'Czy emoji są liczone jako jeden znak?', a: 'Tak. Licznik zlicza widoczne znaki (klastry grafemów), więc emoji liczy się jako jeden, mimo że zajmuje kilka bajtów.' },
      { q: 'Dlaczego limity SMS-ów są różne?', a: 'Długość SMS-a zależy od kodowania. Wiadomości ze znakami spoza alfabetu łacińskiego lub z emoji mają krótszy limit niż pokazywane tu 160 znaków.' },
    ],
    limits: [
      'Pokazane limity to powszechne wytyczne, które zmieniają się z czasem; aktualne zasady sprawdź w każdej platformie.',
    ],
  },
  'case-converter': {
    name: 'Zmiana wielkości liter',
    description: 'Zamień tekst na wielkie, małe litery, wielkie litery w tytule, styl zdania, camel, snake, kebab i inne.',
    metaDescription: 'Darmowy konwerter wielkości liter online. Zmień tekst na WIELKIE, małe, Wielkie Litery W Tytule, jak w zdaniu, camelCase, snake_case, kebab-case i inne.',
    steps: [
      'Wklej tekst.',
      'Wybierz żądaną wielkość liter.',
      'Skopiuj przekonwertowany wynik.',
    ],
    faq: [
      { q: 'Czy zapis tytułowy radzi sobie z krótkimi słowami?', a: 'Tak. Krótkie słowa, takie jak „a”, „of” i „the”, pozostają pisane małą literą, chyba że zaczynają lub kończą tekst.' },
    ],
    limits: [
      'Zapis tytułowy opiera się na popularnych angielskich zasadach stylu i może nie pasować do każdego przewodnika stylistycznego.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Usuń zduplikowane wiersze',
    description: 'Usuń powtarzające się wiersze z listy, zachowując pierwotną kolejność.',
    metaDescription: 'Darmowe narzędzie online do usuwania zduplikowanych wierszy. Usuń powtarzające się wiersze z list, z opcjami dla wielkości liter, białych znaków i pustych wierszy.',
    steps: [
      'Wklej listę, jeden element w wierszu.',
      'Wybierz, czy wielkość liter i białe znaki mają znaczenie.',
      'Skopiuj wynik bez duplikatów.',
    ],
    faq: [
      { q: 'Która kopia duplikatu jest zachowywana?', a: 'Zachowywane jest pierwsze wystąpienie, a późniejsze są usuwane, dzięki czemu pierwotna kolejność zostaje zachowana.' },
    ],
    limits: [
      'Działa tylko na całych wierszach.',
    ],
  },
  'text-sorter': {
    name: 'Sortowanie tekstu',
    description: 'Sortuj wiersze alfabetycznie, numerycznie, według długości lub losowo.',
    metaDescription: 'Darmowe narzędzie online do sortowania tekstu. Sortuj wiersze A–Z, Z–A, numerycznie, według długości lub losowo, z pomijaniem wielkości liter i porządkiem naturalnym.',
    steps: [
      'Wklej wiersze.',
      'Wybierz metodę sortowania i opcje.',
      'Skopiuj posortowaną listę.',
    ],
    faq: [
      { q: 'Czym jest sortowanie naturalne?', a: 'Sortowanie naturalne porównuje liczby wewnątrz tekstu według wartości, więc „item2” występuje przed „item10”.' },
    ],
    limits: [
      'Sortowanie alfabetyczne korzysta z reguł ustawień regionalnych Twojej przeglądarki.',
    ],
  },
  'text-cleaner': {
    name: 'Czyszczenie tekstu',
    description: 'Przytnij białe znaki, zredukuj spacje, usuń puste wiersze i niewidoczne znaki.',
    metaDescription: 'Darmowe narzędzie online do czyszczenia tekstu. Usuń zbędne spacje, puste wiersze, podziały wierszy, niewidoczne znaki i typograficzne cudzysłowy z wklejonego tekstu.',
    steps: [
      'Wklej tekst.',
      'Zaznacz potrzebne opcje czyszczenia.',
      'Skopiuj oczyszczony tekst.',
    ],
    faq: [
      { q: 'Czym są niewidoczne znaki?', a: 'Spacje o zerowej szerokości, miękkie łączniki i znaczniki kolejności bajtów często pojawiają się podczas kopiowania ze stron internetowych i mogą psuć kod lub porównania.' },
    ],
    limits: [
      'Operacje są stosowane w stałej kolejności; jeśli potrzebujesz innej sekwencji, uruchom narzędzie dwa razy.',
    ],
  },
  'text-diff-checker': {
    name: 'Porównywanie tekstów',
    description: 'Porównaj dwa teksty i zobacz dokładnie, które wiersze i słowa się zmieniły.',
    metaDescription: 'Darmowe narzędzie online do porównywania tekstów. Porównaj dwie wersje tekstu obok siebie i wyróżnij dodane, usunięte i zmienione wiersze lub słowa.',
    steps: [
      'Wklej tekst oryginalny po lewej, a zmieniony po prawej.',
      'Wybierz porównanie wierszy lub słów.',
      'Przejrzyj wyróżnione zmiany.',
    ],
    faq: [
      { q: 'Jaka jest różnica między trybem wierszy a słów?', a: 'Tryb wierszy oznacza całe zmienione wiersze. Tryb słów wyróżnia dokładne słowa w tekście, co dobrze sprawdza się w prozie.' },
    ],
    limits: [
      'Bardzo duże dane wejściowe (powyżej około 200 000 znaków) mogą działać wolno.',
    ],
  },
  'json-formatter': {
    name: 'Formatowanie JSON',
    description: 'Formatuj i upiększaj JSON, wybierając wcięcia i sortowanie kluczy.',
    metaDescription: 'Darmowy formater i upiększacz JSON online. Formatuj JSON z 2 lub 4 spacjami albo tabulatorami, sortuj klucze i zobacz dokładne miejsce błędu.',
    steps: [
      'Wklej JSON.',
      'Wybierz wcięcia i sortowanie.',
      'Skopiuj lub pobierz sformatowany wynik.',
    ],
    faq: [
      { q: 'Dlaczego odrzuca mój JSON?', a: 'Ścisły JSON nie dopuszcza komentarzy, końcowych przecinków ani pojedynczych cudzysłowów. Komunikat o błędzie pokazuje wiersz i kolumnę problemu.' },
    ],
    limits: [
      'Liczby większe niż 2^53 tracą precyzję, ponieważ przeglądarka parsuje je jako liczby zmiennoprzecinkowe.',
    ],
  },
  'json-validator': {
    name: 'Walidator JSON',
    description: 'Sprawdź, czy JSON jest poprawny, i poznaj dokładny wiersz oraz kolumnę każdego błędu.',
    metaDescription: 'Darmowy walidator JSON online. Sprawdź składnię JSON i znajdź dokładny wiersz oraz kolumnę błędów, wraz z podsumowaniem struktury.',
    steps: [
      'Wklej JSON.',
      'Od razu zobacz, czy jest poprawny.',
      'Popraw zgłoszony błąd i sprawdź ponownie.',
    ],
    faq: [
      { q: 'Czy waliduje względem schematu JSON Schema?', a: 'Nie. Sprawdza tylko składnię: czy tekst jest poprawnie zbudowanym JSON-em.' },
    ],
    limits: [
      'Tylko walidacja składni; walidacja JSON Schema nie jest dostępna.',
    ],
  },
  'json-minifier': {
    name: 'Minifikator JSON',
    description: 'Usuń białe znaki z JSON, aby uzyskać jak najbardziej zwartą postać.',
    metaDescription: 'Darmowy minifikator JSON online. Usuń białe znaki z JSON, aby zmniejszyć rozmiar danych, i zobacz, ile bajtów zaoszczędzono.',
    steps: [
      'Wklej JSON.',
      'Zminifikowany wynik pojawi się wraz z informacją o zaoszczędzonym rozmiarze.',
      'Skopiuj lub pobierz go.',
    ],
    faq: [
      { q: 'Czy minifikacja zmienia dane?', a: 'Nie. Usuwane są tylko nieistotne białe znaki; klucze, wartości i kolejność pozostają bez zmian.' },
    ],
    limits: [
      'Liczby większe niż 2^53 tracą precyzję, ponieważ przeglądarka parsuje je jako liczby zmiennoprzecinkowe.',
    ],
  },
  'xml-formatter': {
    name: 'Formatowanie XML',
    description: 'Formatuj lub minifikuj XML i wykrywaj niedopasowane lub niezamknięte znaczniki.',
    metaDescription: 'Darmowy formater XML online. Upiększ lub zminifikuj XML z regulowanym wcięciem i wykryj niedopasowane lub niezamknięte znaczniki.',
    steps: [
      'Wklej XML.',
      'Wybierz Formatuj lub Minifikuj oraz wcięcie.',
      'Skopiuj wynik.',
    ],
    faq: [
      { q: 'Jak dokładnie walidowany jest XML?', a: 'Narzędzie sprawdza zagnieżdżenie znaczników, niezamknięte znaczniki oraz niezakończone komentarze lub sekcje CDATA. Nie waliduje względem schematu DTD ani XSD.' },
    ],
    limits: [
      'Tylko kontrole strukturalne; bez walidacji DTD i XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Kodowanie / dekodowanie URL',
    description: 'Koduj procentowo lub dekoduj adresy URL i wartości ciągów zapytania.',
    metaDescription: 'Darmowy koder i dekoder URL online. Zakoduj tekst procentowo do użycia w adresach URL lub zdekoduj zakodowane ciągi, dla pełnych adresów lub pojedynczych składników.',
    steps: [
      'Wybierz Koduj lub Dekoduj.',
      'Wklej tekst lub adres URL.',
      'Skopiuj wynik.',
    ],
    faq: [
      { q: 'Składnik czy pełny adres URL?', a: 'Użyj opcji Składnik dla pojedynczej wartości, takiej jak parametr zapytania; koduje ona znaki takie jak / ? & =. Użyj opcji Pełny adres URL, aby pozostawić strukturę adresu nienaruszoną.' },
    ],
    limits: [
      'Dekodowanie kończy się niepowodzeniem w przypadku nieprawidłowych sekwencji procentowych, takich jak samotny znak %.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Kodowanie / dekodowanie HTML',
    description: 'Zamieniaj znaki specjalne na encje HTML lub dekoduj encje z powrotem na tekst.',
    metaDescription: 'Darmowy koder i dekoder HTML online. Zamień <, >, & i cudzysłowy na encje HTML albo zdekoduj encje nazwane i numeryczne.',
    steps: [
      'Wybierz Koduj lub Dekoduj.',
      'Wklej tekst.',
      'Skopiuj wynik.',
    ],
    faq: [
      { q: 'Czy kodowanie sprawia, że dane wpisane przez użytkownika są bezpieczne dla HTML?', a: 'Zastąpienie pięciu znaków specjalnych sprawia, że tekst jest bezpieczny wewnątrz zawartości elementów HTML i atrybutów w cudzysłowach. Nie zastępuje to właściwej biblioteki szablonów ani sanitizera w innych kontekstach.' },
    ],
    limits: [
      'Dekodowanie obsługuje popularne encje nazwane oraz wszystkie encje numeryczne.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Kodowanie / dekodowanie Base64',
    description: 'Zakoduj tekst do Base64 lub zdekoduj Base64 z powrotem do tekstu, z pełną obsługą UTF-8.',
    metaDescription: 'Darmowy koder i dekoder Base64 online. Konwertuj tekst na Base64 i z powrotem, z obsługą UTF-8 i opcjonalnym alfabetem bezpiecznym dla adresów URL.',
    steps: [
      'Wybierz Koduj lub Dekoduj.',
      'Wklej tekst.',
      'Skopiuj wynik.',
    ],
    faq: [
      { q: 'Czy Base64 to szyfrowanie?', a: 'Nie. Base64 to kodowanie, a nie szyfrowanie. Każdy może je zdekodować, więc nigdy nie używaj go do ochrony tajnych danych.' },
      { q: 'Czym jest Base64 bezpieczne dla adresów URL?', a: 'Zastępuje + i / znakami - i _ oraz pomija dopełnienie =, dzięki czemu wartość można bezpiecznie umieszczać w adresach URL i nazwach plików.' },
    ],
    limits: [
      'Dla danych obrazów użyj narzędzi Obraz na Base64 i Base64 na obraz.',
    ],
  },
  'regex-tester': {
    name: 'Tester wyrażeń regularnych',
    description: 'Testuj wyrażenia regularne JavaScript z wyróżnianiem dopasowań na żywo i grupami przechwytującymi.',
    metaDescription: 'Darmowy tester wyrażeń regularnych dla JavaScript. Zobacz dopasowania na żywo, grupy przechwytujące i nazwane oraz podgląd zamian.',
    steps: [
      'Wpisz wzorzec i wybierz flagi.',
      'Wklej tekst do przetestowania.',
      'Przejrzyj dopasowania, grupy i podgląd zamiany.',
    ],
    faq: [
      { q: 'Jaka odmiana wyrażeń regularnych jest używana?', a: 'Wyrażenia regularne JavaScript (ECMAScript), w implementacji Twojej przeglądarki. PCRE, Python i inne odmiany różnią się w niektórych funkcjach.' },
      { q: 'Dlaczego strona zawiesza się przy niektórych wzorcach?', a: 'Wzorce z zagnieżdżonymi powtórzeniami mogą powodować katastrofalne cofanie. Dopasowywanie działa w wątku w tle i jest zatrzymywane po 1,5 sekundy, więc wzorzec wymykający się spod kontroli nie może zawiesić strony, ale nadal powinieneś unikać wzorców takich jak (a+)+.' },
    ],
    limits: [
      'Tylko składnia wyrażeń regularnych JavaScript.',
      'Dopasowywanie zatrzymuje się po 5000 dopasowań lub 1,5 sekundy.',
    ],
  },
  'markdown-previewer': {
    name: 'Podgląd Markdown',
    description: 'Pisz w Markdown i obserwuj obok bezpieczny, oczyszczony podgląd na żywo.',
    metaDescription: 'Darmowy podgląd Markdown online. Pisz w Markdown w stylu GitHub i oglądaj oczyszczony podgląd HTML na żywo, a następnie skopiuj kod HTML.',
    steps: [
      'Napisz lub wklej Markdown po lewej stronie.',
      'Zobacz wyrenderowany wynik po prawej.',
      'Skopiuj Markdown lub wygenerowany kod HTML.',
    ],
    faq: [
      { q: 'Czy podgląd jest bezpieczny?', a: 'Tak. Wygenerowany kod HTML jest oczyszczany biblioteką DOMPurify przed wyświetleniem, więc skrypty i procedury obsługi zdarzeń są usuwane.' },
    ],
    limits: [
      'Markdown w stylu GitHub za pomocą biblioteki marked; bez rozszerzeń dla wzorów matematycznych i diagramów.',
    ],
  },
  'password-generator': {
    name: 'Generator haseł',
    description: 'Twórz silne hasła: w pełni losowe lub łatwe do zapamiętania, zbudowane z imion i słów.',
    metaDescription: 'Darmowy generator haseł: w pełni losowe hasła lub oparte na imionach, jak Nvidia132@Star, z losowymi liczbami, wielkimi literami i symbolami. Działa w przeglądarce.',
    steps: [
      'Wybierz styl: Imię + słowo dla czegoś łatwego do zapamiętania lub W pełni losowe dla maksymalnego bezpieczeństwa.',
      'Ustaw długość, liczbę potrzebnych haseł i rodzaje znaków do uwzględnienia.',
      'Skopiuj hasło i zachowaj je w menedżerze haseł.',
    ],
    faq: [
      { q: 'Czy hasło takie jak Tesla2026#Tech jest bezpieczne?', a: 'Jest lepsze niż zwykłe słowo, ale słabsze niż losowy tekst. Osoba zgadująca może zacząć od list znanych imion i nazw, więc prawdziwa siła wynika z liczby możliwości, podanej w bitach. Używaj haseł opartych na imionach do kont o niskim ryzyku, a w pełni losowych do poczty, bankowości i menedżerów haseł.' },
      { q: 'Dlaczego tylko kilka symboli?', a: 'Generowane hasła używają tylko czterech symboli @ # $ *, ponieważ są akceptowane przez prawie każdą witrynę i łatwo je wpisać na każdej klawiaturze.' },
      { q: 'Jak długie powinno być hasło?', a: 'Co najmniej 16 znaków dla ważnych kont. Długość liczy się bardziej niż złożoność.' },
    ],
    limits: [
      'Hasła oparte na imionach łatwiej zapamiętać, ale są słabsze niż w pełni losowe. Pokazana siła zakłada atakującego, który wie, jak są zbudowane.',
      'Baza słów to wyselekcjonowana lista imion zapisanych literami łacińskimi; nie jest listą najczęściej używanych haseł.',
      'Oszacowanie siły opiera się na liczbie możliwych kombinacji, a nie na bazach wycieków.',
    ],
  },
  'uuid-generator': {
    name: 'Generator UUID',
    description: 'Generuj losowe identyfikatory UUID w wersji 4 hurtowo, z opcjami formatu.',
    metaDescription: 'Darmowy generator UUID online. Twórz losowe UUID v4 hurtowo, wielkimi literami, bez łączników lub w nawiasach klamrowych, z użyciem kryptograficznej losowości.',
    steps: [
      'Wybierz liczbę UUID i format.',
      'Generuj.',
      'Skopiuj listę.',
    ],
    faq: [
      { q: 'Czy dwa UUID mogą się zderzyć?', a: 'UUID w wersji 4 mają 122 losowe bity, więc prawdopodobieństwo kolizji jest w praktyce pomijalne.' },
    ],
    limits: [
      'Generowane są tylko UUID w wersji 4 (losowe).',
    ],
  },
  'timestamp-converter': {
    name: 'Konwerter znaczników czasu',
    description: 'Zamieniaj znaczniki czasu Unix na czytelne daty i z powrotem, w dowolnej strefie czasowej.',
    metaDescription: 'Darmowy konwerter znaczników czasu Unix online. Zamień sekundy lub milisekundy epoki na daty w UTC i czasie lokalnym oraz daty z powrotem na znaczniki czasu.',
    steps: [
      'Wpisz znacznik czasu Unix lub wybierz datę.',
      'Odczytaj wynik w UTC, w swojej strefie lokalnej i w ISO 8601.',
      'Skopiuj dowolną wartość.',
    ],
    faq: [
      { q: 'Sekundy czy milisekundy?', a: 'Znaczniki czasu mające 13 lub więcej cyfr są traktowane jako milisekundy, krótsze jako sekundy. Możesz to zmienić ręcznie.' },
    ],
    limits: [
      'Obsługiwany zakres to zakres dat JavaScript: mniej więcej od roku -271821 do 275760.',
    ],
  },
  'color-converter': {
    name: 'Konwerter kolorów',
    description: 'Konwertuj kolory między HEX, RGB, HSL i HSV, z podglądem na żywo i sprawdzaniem kontrastu.',
    metaDescription: 'Darmowy konwerter kolorów online. Konwertuj wartości HEX, RGB, HSL i HSV, obejrzyj podgląd koloru i sprawdź współczynniki kontrastu WCAG.',
    steps: [
      'Wpisz kolor w dowolnym formacie lub użyj próbnika.',
      'Zobacz aktualizację każdego formatu.',
      'Skopiuj potrzebną wartość.',
    ],
    faq: [
      { q: 'Co pokazuje sprawdzanie kontrastu?', a: 'Pokazuje współczynnik kontrastu WCAG koloru względem białego i czarnego tekstu, co pomaga wybierać czytelne kombinacje.' },
    ],
    limits: [
      'Tylko sRGB; przestrzenie CSS Color 4, takie jak LAB, LCH i Display-P3, nie są obsługiwane.',
      'Wartości przezroczystości (alfa) są akceptowane, ale ignorowane.',
    ],
  },
  'qr-code-generator': {
    name: 'Generator kodów QR',
    description: 'Twórz kody QR dla linków, tekstu, sieci Wi-Fi, e-maila lub numerów telefonu, jako PNG lub SVG.',
    metaDescription: 'Darmowy generator kodów QR. Twórz kody QR dla adresów URL, tekstu, sieci Wi-Fi, e-maila i numerów telefonu i pobieraj je jako PNG lub SVG. Tworzone w przeglądarce.',
    steps: [
      'Wybierz, co ma zawierać kod, i uzupełnij szczegóły.',
      'W razie potrzeby dostosuj rozmiar, kolory i korekcję błędów.',
      'Pobierz PNG lub SVG i przetestuj kod telefonem przed drukiem.',
    ],
    faq: [
      { q: 'Czy kody wygasają?', a: 'Nie. To kody statyczne: dane są zapisane w samym kodzie, więc działają zawsze i nic nie jest śledzone.' },
      { q: 'Jaki poziom korekcji błędów wybrać?', a: 'Średni odpowiada większości zastosowań. Wybierz Kwartylowy lub Wysoki, jeśli kod może się zabrudzić lub uszkodzić, ale wyższe poziomy czynią kod gęstszym i trudniejszym do zeskanowania w małych rozmiarach.' },
      { q: 'Czy mogę używać kodów komercyjnie?', a: 'Tak. Standard kodów QR jest otwarty, a kody tworzone tutaj nie wiążą się z opłatami, znakami wodnymi ani śledzeniem z naszej strony.' },
    ],
    limits: [
      'Tylko kody statyczne: bez śledzenia skanów i bez edytowalnych kodów.',
      'Bardzo długi tekst daje gęsty kod, który trudno zeskanować, więc staraj się, by był krótki.',
      'Najlepiej skanują się ciemne kolory na jasnym tle o silnym kontraście.',
    ],
  },
  "scan-to-pdf": {
    name: "Skan do PDF",
    description: "Zamień zdjęcia lub skany papierowych stron w jeden plik PDF, z opcjonalnym czyszczeniem poprawiającym czytelność.",
    metaDescription: "Skan do PDF online: połącz zdjęcia lub skany papierowych stron w jeden plik PDF, ustaw kolejność stron i wyrównaj cienie w trybie czarno-białego dokumentu.",
    steps: [
      "Dodaj zdjęcia lub skany swoich stron albo zrób zdjęcie, jeśli Twój telefon lub tablet to obsługuje.",
      "Ułóż strony w odpowiedniej kolejności i wybierz rozmiar strony oraz styl czyszczenia.",
      "Utwórz plik PDF i pobierz go.",
    ],
    faq: [
      { q: "Czy narzędzie rozpoznaje tekst na stronie?", a: "Nie. Skan do PDF zamienia obrazy w strony PDF i może je czyścić, ale tekst pozostaje częścią obrazu. Aby można go było przeszukiwać, przepuść wynik przez OCR PDF." },
      { q: "Czy mogę użyć aparatu w telefonie?", a: "Na telefonach i tabletach, których przeglądarka to obsługuje, przycisk „Zrób zdjęcie” otwiera aparat. W przeciwnym razie wybierz zdjęcia już zapisane na urządzeniu." },
      { q: "Co robią style czyszczenia?", a: "„Oryginał” zachowuje kolory. „Skala szarości” usuwa kolor. „Dokument czarno-biały” zamienia stronę w czysto czarny tekst na białym papierze i wyrównuje cienie oraz nierówne oświetlenie, co nadaje się do wydrukowanych stron i notatek, ale nie do fotografii." },
    ],
    limits: [
      "Maksymalnie 25 MB na obraz i 100 obrazów na plik PDF.",
      "Duże zdjęcia są zmniejszane do około rozmiaru A4 przy 300 dpi, aby plik PDF pozostał mały.",
      "Niektórych formatów telefonów, takich jak HEIC, przeglądarki nie potrafią odczytać; najpierw zapisz je jako JPG.",
    ],
  },
  "html-to-pdf": {
    name: "HTML do PDF",
    description: "Zamień plik HTML lub wklejony kod HTML w plik PDF z zaznaczalnym tekstem.",
    metaDescription: "HTML do PDF online: zamień plik HTML lub wklejony kod HTML w plik PDF z prawdziwym, zaznaczalnym tekstem, nagłówkami, listami, tabelami i osadzonymi obrazami.",
    steps: [
      "Wybierz plik HTML lub wklej swój kod HTML.",
      "Wybierz rozmiar strony.",
      "Skonwertuj i pobierz plik PDF.",
    ],
    faq: [
      { q: "Czy mogę wpisać adres strony internetowej?", a: "Nie. Pobieranie innych witryn wymagałoby wysłania adresu na serwer, a strona rzadko konwertuje się dobrze bez swoich stylów. Zapisz stronę jako plik HTML w przeglądarce i użyj tego pliku albo wklej jej kod HTML." },
      { q: "Czy plik PDF będzie wyglądał jak strona internetowa?", a: "Nie, nie dokładnie. Narzędzie odczytuje strukturę dokumentu (nagłówki, akapity, listy, tabele, łącza, tekst pogrubiony i pochylony oraz osadzone obrazy) i składa ją jako prosty dokument. Style CSS, skrypty, czcionki internetowe, kolumny i elementy pozycjonowane nie są stosowane." },
      { q: "Czy konwertowanie HTML, któremu nie ufam, jest bezpieczne?", a: "HTML jest odczytywany jako nieaktywny tekst: skrypty się nie uruchamiają, a z internetu nic nie jest wczytywane. Używane są tylko obrazy osadzone w samym HTML." },
      { q: "Jakie języki i czcionki są obsługiwane w pliku PDF?", a: "Plik PDF jest tworzony z czcionką Noto Sans, która obejmuje tekst łaciński (w tym polskie, czeskie, rumuńskie i tureckie litery), cyrylicę, grekę, wietnamski i dewanagari. Tekst arabski, hebrajski, tajski, chiński, japoński i koreański nie jest jeszcze obsługiwany: takie znaki pojawiają się jako znaki zapytania, a narzędzie informuje, ile ich dotyczyło. Oryginalne czcionki dokumentu nie są zachowywane." },
    ],
    limits: [
      "Maksymalnie 10 MB HTML.",
      "Uwzględniane są tylko obrazy osadzone w HTML (adresy data:); obrazy i style ładowane z innych witryn są pomijane, a nie pobierane.",
      "Skrypty, formularze, ramki, canvas, wideo i grafika SVG nie są konwertowane.",
    ],
  },
  "word-to-pdf": {
    name: "Word do PDF",
    description: "Skonwertuj dokument Word (DOCX) do PDF, zachowując nagłówki, listy, tabele i obrazy.",
    metaDescription: "Word do PDF online: skonwertuj dokument DOCX do pliku PDF z zaznaczalnym tekstem, nagłówkami, listami, tabelami, łączami i obrazami. Plik jest konwertowany w Twojej przeglądarce.",
    steps: [
      "Wybierz plik DOCX.",
      "Wybierz rozmiar strony lub zachowaj rozmiar z dokumentu.",
      "Skonwertuj i pobierz plik PDF.",
    ],
    faq: [
      { q: "Czy plik PDF będzie wyglądał dokładnie tak jak dokument w Wordzie?", a: "Nie. Kitwell nie korzysta z Microsoft Word ani LibreOffice. Odczytuje treść i strukturę dokumentu i sam ją składa, więc czcionki, odstępy i podziały stron różnią się od tych w Wordzie. Sprawdź wynik, zanim go wyślesz." },
      { q: "Co jest konwertowane, a co nie?", a: "Konwertowane: tekst z pogrubieniem, pochyleniem, podkreśleniem i łączami, nagłówki, listy punktowane i numerowane, tabele, obrazy JPEG i PNG, podziały wierszy i stron, wyrównanie oraz orientacja strony. Niekonwertowane: nagłówki i stopki, przypisy, pola tekstowe, równania, wykresy, kształty i obrazy w innych formatach." },
      { q: "Czy mogę skonwertować stary plik .doc?", a: "Nie. Otwórz go w Wordzie i najpierw zapisz jako plik DOCX." },
      { q: "Jakie języki i czcionki są obsługiwane w pliku PDF?", a: "Plik PDF jest tworzony z czcionką Noto Sans, która obejmuje tekst łaciński (w tym polskie, czeskie, rumuńskie i tureckie litery), cyrylicę, grekę, wietnamski i dewanagari. Tekst arabski, hebrajski, tajski, chiński, japoński i koreański nie jest jeszcze obsługiwany: takie znaki pojawiają się jako znaki zapytania, a narzędzie informuje, ile ich dotyczyło. Oryginalne czcionki dokumentu nie są zachowywane." },
    ],
    limits: [
      "Tylko pliki DOCX, maksymalnie 50 MB. Stare pliki .doc i dokumenty zabezpieczone hasłem nie są obsługiwane.",
      "Układ jest przybliżony: kolumny, opływanie obrazów tekstem, nagłówki, stopki i przypisy nie są odtwarzane.",
      "Czcionki oryginału są zastępowane czcionką Noto Sans.",
    ],
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint do PDF",
    description: "Skonwertuj prezentację PowerPoint (PPTX) do PDF z jedną stroną na slajd.",
    metaDescription: "PowerPoint do PDF online: skonwertuj prezentację PPTX do pliku PDF z jedną stroną na slajd, zachowując rozmiar slajdu, tekst, obrazy i proste kształty. Bezpośrednio w Twojej przeglądarce.",
    steps: [
      "Wybierz plik PPTX.",
      "Skonwertuj go.",
      "Sprawdź strony i pobierz plik PDF.",
    ],
    faq: [
      { q: "Czy slajdy będą wyglądały dokładnie tak jak w PowerPoincie?", a: "Nie dokładnie. Kitwell rysuje każdy slajd na podstawie jego pól tekstowych, obrazów, prostych kształtów i tabel. Czcionki, gradienty, cienie, efekty i dokładne dopasowanie tekstu się różnią. Zawsze przejrzyj plik PDF, zanim go użyjesz." },
      { q: "Co nie jest konwertowane?", a: "Wykresy, SmartArt, wideo i dźwięk, animacje i przejścia, notatki prelegenta, gradienty, linie i łączniki oraz obrazy w formatach innych niż JPEG i PNG. Narzędzie informuje, ile elementów pominięto." },
      { q: "Czy mogę skonwertować stary plik .ppt?", a: "Nie. Otwórz go w PowerPoincie i najpierw zapisz jako plik PPTX." },
      { q: "Jakie języki i czcionki są obsługiwane w pliku PDF?", a: "Plik PDF jest tworzony z czcionką Noto Sans, która obejmuje tekst łaciński (w tym polskie, czeskie, rumuńskie i tureckie litery), cyrylicę, grekę, wietnamski i dewanagari. Tekst arabski, hebrajski, tajski, chiński, japoński i koreański nie jest jeszcze obsługiwany: takie znaki pojawiają się jako znaki zapytania, a narzędzie informuje, ile ich dotyczyło. Oryginalne czcionki dokumentu nie są zachowywane." },
    ],
    limits: [
      "Tylko pliki PPTX, maksymalnie 100 MB i 300 slajdów. Stare pliki .ppt i prezentacje zabezpieczone hasłem nie są obsługiwane.",
      "Każdy slajd staje się stroną o własnym rozmiarze i orientacji slajdu.",
      "Tekst, który nie mieści się w polu, jest zmniejszany – najwyżej do połowy rozmiaru.",
    ],
  },
  "excel-to-pdf": {
    name: "Excel do PDF",
    description: "Skonwertuj skoroszyt Excel (XLSX) do PDF, w którym każdy widoczny arkusz staje się tabelą.",
    metaDescription: "Excel do PDF online: skonwertuj skoroszyt XLSX do pliku PDF, w którym każdy widoczny arkusz jest tabelą zapisanych wartości, liczb i dat. Bezpośrednio w Twojej przeglądarce.",
    steps: [
      "Wybierz plik XLSX.",
      "Skonwertuj go.",
      "Sprawdź tabele i pobierz plik PDF.",
    ],
    faq: [
      { q: "Czy formuły są obliczane?", a: "Nie. Plik PDF pokazuje wartości, które Excel zapisał w pliku. Jeśli komórka z formułą nie ma zapisanej wartości, pozostaje pusta, a narzędzie o tym informuje; otwórz plik w Excelu, pozwól mu obliczyć, zapisz go i skonwertuj ponownie." },
      { q: "Czy będzie wyglądał jak układ wydruku w Excelu?", a: "Nie. Każdy widoczny arkusz staje się prostą tabelą dopasowaną do szerokości strony. Kolory komórek, scalone komórki, szerokości kolumn, wykresy, obrazy, obszary wydruku i podziały stron nie są zachowywane." },
      { q: "Czy mogę skonwertować stary plik .xls?", a: "Nie. Otwórz go w Excelu i najpierw zapisz jako plik XLSX." },
      { q: "Jakie języki i czcionki są obsługiwane w pliku PDF?", a: "Plik PDF jest tworzony z czcionką Noto Sans, która obejmuje tekst łaciński (w tym polskie, czeskie, rumuńskie i tureckie litery), cyrylicę, grekę, wietnamski i dewanagari. Tekst arabski, hebrajski, tajski, chiński, japoński i koreański nie jest jeszcze obsługiwany: takie znaki pojawiają się jako znaki zapytania, a narzędzie informuje, ile ich dotyczyło. Oryginalne czcionki dokumentu nie są zachowywane." },
    ],
    limits: [
      "Tylko pliki XLSX, maksymalnie 50 MB. Stare pliki .xls i skoroszyty zabezpieczone hasłem nie są obsługiwane.",
      "Do 5000 wierszy i 60 kolumn na arkusz; wszystko ponad to jest pomijane, a narzędzie o tym informuje.",
      "Ukryte arkusze są pomijane.",
    ],
  },
  "pdf-to-markdown": {
    name: "PDF do Markdown",
    description: "Zamień tekst z pliku PDF w plik Markdown z nagłówkami, akapitami i listami.",
    metaDescription: "PDF do Markdown online: wyodrębnij tekst z pliku PDF i pobierz go jako plik Markdown (.md) z nagłówkami, akapitami i listami. Działa w Twojej przeglądarce.",
    steps: [
      "Wybierz plik PDF.",
      "Wybierz, czy usuwać powtarzające się nagłówki, stopki i numery stron.",
      "Skonwertuj, sprawdź wynik i pobierz plik .md.",
    ],
    faq: [
      { q: "Jak rozpoznawane są nagłówki i listy?", a: "Nagłówki to wiersze zapisane większą czcionką niż tekst zasadniczy, listy to wiersze zaczynające się od punktora lub liczby, a akapity są rozdzielane odstępami między wierszami. To dobre oszacowanie, ale nie gwarancja, dlatego sprawdź wynik." },
      { q: "Dlaczego wynik jest pusty dla mojego zeskanowanego pliku PDF?", a: "Skan to obraz strony i nie zawiera tekstu do wyodrębnienia. Najpierw uruchom OCR PDF, aby dodać warstwę tekstową, a następnie skonwertuj wynik." },
      { q: "Co z tabelami, kolumnami i obrazami?", a: "Tabele i kolumny nie są odtwarzane: ich tekst pojawia się jako zwykłe wiersze, w miarę możliwości w kolejności czytania. Obrazy, łącza, tekst pogrubiony i pochylony, przypisy i równania nie są przenoszone." },
    ],
    limits: [
      "Maksymalnie 100 MB na plik PDF. Pliki PDF zabezpieczone hasłem trzeba najpierw odblokować.",
      "Konwertowany jest tylko tekst, który w pliku PDF jest prawdziwym tekstem; zeskanowane strony wymagają wcześniej OCR PDF.",
      "Struktura jest szacowana na podstawie rozmiarów czcionek i odstępów i może być błędna przy złożonych układach.",
    ],
  },
  "repair-pdf": {
    name: "Naprawa PDF",
    description: "Spróbuj naprawić plik PDF, który się nie otwiera, odbudowując jego wewnętrzną strukturę.",
    metaDescription: "Naprawa PDF online: odbuduj strukturę uszkodzonego pliku PDF, który się nie otwiera, na przykład z uszkodzoną tabelą odsyłaczy lub uciętym końcem. Działa w Twojej przeglądarce.",
    steps: [
      "Wybierz uszkodzony plik PDF.",
      "Rozpocznij naprawę.",
      "Jeśli narzędzie utworzyło plik, sprawdź go i pobierz.",
    ],
    faq: [
      { q: "Jakie rodzaje uszkodzeń można naprawić?", a: "Uszkodzenia struktury pliku: brakujący lub błędny indeks obiektów (tabela odsyłaczy), brakujący trailer, śmieci przed początkiem lub zepsuta lista stron. Jeśli plik został ucięty, strony zapisane przed ucięciem można odzyskać." },
      { q: "Czego nie da się odzyskać?", a: "Treści, której nie ma już w pliku. Brakujących lub uszkodzonych stron, obrazów i czcionek nie da się przywrócić, a niektórych plików nie można uratować. Narzędzie informuje, ile stron zachowało, i mówi o tym, gdy nie potrafi utworzyć użytecznego pliku; nigdy nie oferuje pobrania pliku, którego nie utworzyło." },
      { q: "A jeśli mój plik PDF otwiera się normalnie?", a: "Wtedy nie ma czego naprawiać. Narzędzie poinformuje o tym i zaoferuje oczyszczoną kopię pliku." },
    ],
    limits: [
      "Maksymalnie 100 MB na plik PDF. Pliki PDF zabezpieczone hasłem trzeba najpierw odblokować.",
      "Uszkodzeń wewnątrz skompresowanych strumieni obiektów to narzędzie nie potrafi odbudować.",
      "Naprawiony plik może mieć mniej stron niż oryginał, a po gruntownej naprawie kolejność stron może się zmienić.",
    ],
  },
  "pdf-to-pdfa": {
    name: "PDF na PDF/A",
    description: "Przygotuj PDF jako PDF/A (1b, 2b, 2u, 3b, 3u lub 4) do archiwizacji, zachowując tekst lub używając obrazów stron.",
    metaDescription: "PDF na PDF/A online: przygotuj PDF jako PDF/A-1b, 2b, 2u, 3b, 3u lub 4 do archiwizacji, z oznaczeniem PDF/A, metadanymi i profilem kolorów. W miarę możliwości zachowuje tekst. Działa w przeglądarce.",
    steps: [
      "Wybierz plik PDF. Plik chroniony hasłem trzeba najpierw odblokować.",
      "Wybierz wersję PDF/A, a potem sposób konwersji: zachowanie tekstu i czcionek lub zamiana stron na obrazy.",
      "Konwertuj, przeczytaj, co zrobiono, i pobierz plik PDF/A.",
    ],
    faq: [
      { q: "Czy wynik jest certyfikowanym plikiem PDF/A?", a: "Nie. Kitwell przygotowuje Twój PDF w wybranej wersji PDF/A i sprawdza własną pracę według stosowanych reguł. Pliki testowe skonwertowane w ten sposób przeszły walidator veraPDF, ale samo narzędzie w przeglądarce nie zawiera pełnego walidatora PDF/A. Jeśli musisz udowodnić zgodność, sprawdź plik walidatorem takim jak veraPDF." },
      { q: "Którą wersję PDF/A wybrać?", a: "PDF/A-2b jest najszerzej akceptowany i jest domyślny. PDF/A-1b jest najstarszy i najbardziej rygorystyczny: nie dopuszcza przezroczystości ani warstw. Wersje „u” (2u, 3u) dodatkowo gwarantują, że tekst można niezawodnie kopiować, więc każda czcionka musi mieć mapowanie tekstu. PDF/A-3b ma te same reguły co 2b, a PDF/A-4 jest najnowszy, oparty na PDF 2.0. Poziomy „a” (1a, 2a, 3a) wymagają otagowanej struktury dokumentu, której nie da się utworzyć automatycznie, a 4e i 4f są przeznaczone dla 3D i załączonych plików, więc nie są oferowane." },
      { q: "Czym różnią się dwa sposoby konwersji?", a: "„Zachowaj tekst i czcionki” zmienia tylko strukturę i metadane pliku, więc tekst pozostaje zaznaczalny. Działa tylko wtedy, gdy wszystkie czcionki są osadzone, a plik nie używa kolorów CMYK. „Zamień strony na obrazy” renderuje każdą stronę jako obraz i buduje z nich nowy PDF/A. To zawsze działa, ale tekstu nie da się już zaznaczać, a plik jest większy." },
      { q: "Dlaczego mój PDF został odrzucony, gdy wybrałem zachowanie tekstu?", a: "PDF/A wymaga, aby każda czcionka była osadzona w pliku, i nie dopuszcza kolorów CMYK bez profilu CMYK, kompresji LZW ani adnotacji bez wyglądu. PDF/A-1b odrzuca też przezroczystość, warstwy i obrazy JPEG 2000, a wersje „u” i PDF/A-4 wymagają mapowania tekstu dla każdej czcionki. Nie da się tego naprawić bez zmiany stron, więc narzędzie wypisuje, co znalazło, zamiast udawać wynik. Nadal możesz użyć trybu obrazów." },
      { q: "Co narzędzie zmienia w pliku?", a: "Dodaje oznaczenie PDF/A i metadane XMP, profil kolorów sRGB jako warunek wyjściowy oraz identyfikator pliku. Usuwa JavaScript, zabronione akcje, załączniki, dodatkowe informacje o dokumencie i ustawienia adnotacji, których PDF/A nie dopuszcza." },
    ],
    limits: [
      "Maksymalnie 100 MB na plik PDF. Pliki PDF chronione hasłem trzeba najpierw odblokować, ponieważ plik PDF/A nie może być zaszyfrowany.",
      "„Zachowaj tekst i czcionki” działa tylko wtedy, gdy wszystkie czcionki są osadzone, a plik nie ma kolorów CMYK ani kompresji LZW.",
      "Zamiana stron na obrazy jest ograniczona do 200 stron. Tekst nie jest już zaznaczalny, a plik robi się większy.",
      "Wynik jest przygotowywany przez Kitwell i sprawdzany według stosowanych reguł; nie jest weryfikowany przez pełny walidator PDF/A w przeglądarce.",
      "Dostępne wersje: PDF/A-1b, 2b, 2u, 3b, 3u i 4. Poziomy „a” (otagowany PDF) oraz 4e/4f nie są oferowane.",
    ],
  },
};
export default tools;
