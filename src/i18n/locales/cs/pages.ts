import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Tuto stránku se nám nepodařilo najít. Možná byla přesunuta nebo je adresa chybně napsána.',
  'notFound.home': 'Zpět na úvodní stránku',
  'notFound.popular': 'Oblíbené nástroje',
  'category.count': 'Počet nástrojů: {count}.',
  'category.sections': 'Sekce v kategorii {name}',
  'category.more': 'Další kategorie nástrojů',
  'tools.title': 'Všechny nástroje',
  'tools.jump': 'Přejít na kategorii',

  // About

  // Help chrome
  'help.title': 'Nápověda a FAQ',

  // Legal pages
  'legal.privacy.title': 'Zásady ochrany osobních údajů',
  'legal.terms.title': 'Obchodní podmínky',
  'legal.cookies.title': 'Informace o cookies a úložišti prohlížeče',

  // Contact
  'contact.title': 'Kontaktujte nás',
  'contact.lead': 'Dotazy, hlášení chyb i návrhy nástrojů jsou vítány.',
  'contact.form.h': 'Odeslat zprávu',
  'contact.form.name': 'Vaše jméno',
  'contact.form.email': 'Vaše e-mailová adresa',
  'contact.form.emailHint': 'Použije se pouze k odpovědi vám.',
  'contact.form.page': 'Nástroj nebo stránka (volitelné)',
  'contact.form.pagePlaceholder': 'Například: Sloučit PDF',
  'contact.form.message': 'Zpráva',
  'contact.form.messageHint': 'Alespoň {min} znaků. Nevkládejte prosím hesla ani citlivé dokumenty.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Odeslat zprávu',
  'contact.form.sending': 'Odesílám…',
  'contact.form.honeypot': 'Toto pole nechte prázdné',
  'contact.err.name': 'Zadejte své jméno.',
  'contact.err.email': 'Zadejte platnou e-mailovou adresu.',
  'contact.err.message': 'Napište zprávu o délce alespoň {min} znaků (nejvýše {max}).',
  'contact.err.summary': 'Opravte prosím zvýrazněná pole.',
  'contact.sent.h': 'Zpráva odeslána',
  'contact.sent.p': 'Děkujeme. Vaše zpráva byla doručena. Čteme každou zprávu, ale nemůžeme slíbit dobu odpovědi.',
  'contact.sent.another': 'Odeslat další zprávu',
  'contact.fail.notConfigured': 'Kontaktní formulář zatím není na tomto webu propojen s e-mailovou schránkou, proto vaše zpráva nebyla odeslána. Nic nebylo uloženo.',
  'contact.fail.rate': 'Z vašeho připojení přišlo příliš mnoho zpráv. Počkejte prosím několik minut a zkuste to znovu.',
  'contact.fail.delivery': 'Vaši zprávu se nám teď nepodařilo doručit. Nebyla odeslána. Zkuste to prosím později.',
  'contact.fail.network': 'Zprávu se nepodařilo odeslat, protože selhalo připojení. Zkontrolujte připojení k internetu a zkuste to znovu.',
  'contact.unavailable.h': 'Kontaktní formulář zatím není k dispozici',
  'contact.unavailable.p': 'Tento web zatím není propojen s e-mailovou schránkou, proto z této stránky nelze zprávy odesílat.',
  'contact.report.h': 'Nahlášení problému',
  'contact.report.intro': 'Abychom mohli problém zopakovat, uveďte prosím:',
  'contact.report.1': 'Název nástroje a adresu stránky.',
  'contact.report.2': 'Váš prohlížeč a zařízení (například „Chrome 130 ve Windows 11“).',
  'contact.report.3': 'Co jste očekávali a co se místo toho stalo, včetně případné chybové zprávy.',
  'contact.report.4': 'Typ a přibližnou velikost souboru. Neposílejte prosím citlivé dokumenty.',
  'contact.privacy': 'Zpráva, kterou zde napíšete, je odeslána nám a použije se pouze k odpovědi vám. Soubory a text, které používáte v nástrojích, její součástí nikdy nejsou. Viz <privacy>Zásady ochrany osobních údajů</privacy>.',
} as PartialMessages;
