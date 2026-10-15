import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Nie mogliśmy znaleźć tej strony. Mogła zostać przeniesiona albo adres zawiera literówkę.',
  'notFound.home': 'Wróć na stronę główną',
  'notFound.popular': 'Popularne narzędzia',
  'category.count': 'Liczba narzędzi: {count}.',
  'category.sections': 'Sekcje w kategorii {name}',
  'category.more': 'Więcej kategorii narzędzi',
  'tools.title': 'Wszystkie narzędzia',
  'tools.jump': 'Przejdź do kategorii',

  // About

  // Help chrome
  'help.title': 'Pomoc i FAQ',

  // Legal pages
  'legal.privacy.title': 'Polityka prywatności',
  'legal.terms.title': 'Regulamin',
  'legal.cookies.title': 'Informacje o plikach cookie i pamięci przeglądarki',

  // Contact
  'contact.title': 'Skontaktuj się z nami',
  'contact.lead': 'Pytania, zgłoszenia błędów i propozycje narzędzi są mile widziane.',
  'contact.form.h': 'Wyślij wiadomość',
  'contact.form.name': 'Twoje imię',
  'contact.form.email': 'Twój adres e-mail',
  'contact.form.emailHint': 'Używany wyłącznie do odpowiedzi.',
  'contact.form.page': 'Narzędzie lub strona (opcjonalnie)',
  'contact.form.pagePlaceholder': 'Na przykład: Scal PDF',
  'contact.form.message': 'Wiadomość',
  'contact.form.messageHint': 'Co najmniej {min} znaków. Nie podawaj haseł ani poufnych dokumentów.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Wyślij wiadomość',
  'contact.form.sending': 'Wysyłanie…',
  'contact.form.honeypot': 'Pozostaw to pole puste',
  'contact.err.name': 'Wpisz swoje imię.',
  'contact.err.email': 'Wpisz prawidłowy adres e-mail.',
  'contact.err.message': 'Napisz wiadomość o długości co najmniej {min} znaków (najwyżej {max}).',
  'contact.err.summary': 'Popraw zaznaczone pola.',
  'contact.sent.h': 'Wiadomość wysłana',
  'contact.sent.p': 'Dziękujemy. Twoja wiadomość została dostarczona. Czytamy każdą wiadomość, ale nie możemy obiecać terminu odpowiedzi.',
  'contact.sent.another': 'Wyślij kolejną wiadomość',
  'contact.fail.notConfigured': 'Formularz kontaktowy nie jest jeszcze połączony ze skrzynką pocztową w tej witrynie, więc Twoja wiadomość nie została wysłana. Nic nie zostało zapisane.',
  'contact.fail.rate': 'Zbyt wiele wiadomości z Twojego połączenia. Odczekaj kilka minut i spróbuj ponownie.',
  'contact.fail.delivery': 'Nie możemy teraz dostarczyć Twojej wiadomości. Nie została wysłana. Spróbuj ponownie później.',
  'contact.fail.network': 'Nie udało się wysłać wiadomości, ponieważ połączenie zostało przerwane. Sprawdź połączenie z internetem i spróbuj ponownie.',
  'contact.unavailable.h': 'Formularz kontaktowy jest jeszcze niedostępny',
  'contact.unavailable.p': 'Ta witryna nie została połączona ze skrzynką pocztową, więc z tej strony nie można wysyłać wiadomości.',
  'contact.report.h': 'Zgłaszanie problemu',
  'contact.report.intro': 'Aby ułatwić nam odtworzenie problemu, podaj:',
  'contact.report.1': 'Nazwę narzędzia i adres strony.',
  'contact.report.2': 'Swoją przeglądarkę i urządzenie (na przykład „Chrome 130 w systemie Windows 11”).',
  'contact.report.3': 'Czego oczekiwałeś i co się wydarzyło, wraz z ewentualnym komunikatem o błędzie.',
  'contact.report.4': 'Typ pliku i przybliżony rozmiar. Nie wysyłaj poufnych dokumentów.',
  'contact.privacy': 'Wiadomość napisana tutaj jest wysyłana do nas i używana wyłącznie do udzielenia Ci odpowiedzi. Pliki i tekst używane w narzędziach nigdy jej nie dotyczą. Zobacz <privacy>Politykę prywatności</privacy>.',
} as PartialMessages;
