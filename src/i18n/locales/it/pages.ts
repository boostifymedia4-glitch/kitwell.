import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Non abbiamo trovato quella pagina. Potrebbe essere stata spostata oppure l’indirizzo potrebbe contenere un errore.',
  'notFound.home': 'Torna alla home',
  'notFound.popular': 'Strumenti più usati',
  'category.count': '{count} strumenti.',
  'category.sections': 'Sezioni di {name}',
  'category.more': 'Altre categorie di strumenti',
  'tools.title': 'Tutti gli strumenti',
  'tools.jump': 'Vai a una categoria',

  // About

  // Help chrome
  'help.title': 'Aiuto e FAQ',

  // Legal pages
  'legal.privacy.title': 'Informativa sulla privacy',
  'legal.terms.title': 'Termini e condizioni',
  'legal.cookies.title': 'Informazioni su cookie e archiviazione del browser',

  // Contact
  'contact.title': 'Contattaci',
  'contact.lead': 'Domande, segnalazioni di errori e suggerimenti per nuovi strumenti sono benvenuti.',
  'contact.form.h': 'Invia un messaggio',
  'contact.form.name': 'Il tuo nome',
  'contact.form.email': 'Il tuo indirizzo email',
  'contact.form.emailHint': 'Usato solo per risponderti.',
  'contact.form.page': 'Strumento o pagina (facoltativo)',
  'contact.form.pagePlaceholder': 'Ad esempio: Unisci PDF',
  'contact.form.message': 'Messaggio',
  'contact.form.messageHint': 'Almeno {min} caratteri. Non includere password o documenti sensibili.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Invia il messaggio',
  'contact.form.sending': 'Invio in corso…',
  'contact.form.honeypot': 'Lascia vuoto questo campo',
  'contact.err.name': 'Inserisci il tuo nome.',
  'contact.err.email': 'Inserisci un indirizzo email valido.',
  'contact.err.message': 'Scrivi un messaggio di almeno {min} caratteri (al massimo {max}).',
  'contact.err.summary': 'Correggi i campi evidenziati.',
  'contact.sent.h': 'Messaggio inviato',
  'contact.sent.p': 'Grazie. Il tuo messaggio è stato consegnato. Leggiamo ogni messaggio, ma non possiamo promettere tempi di risposta.',
  'contact.sent.another': 'Invia un altro messaggio',
  'contact.fail.notConfigured': 'Il modulo di contatto non è ancora collegato a una casella di posta su questo sito, quindi il tuo messaggio non è stato inviato. Non è stato memorizzato nulla.',
  'contact.fail.rate': 'Troppi messaggi dalla tua connessione. Attendi qualche minuto e riprova.',
  'contact.fail.delivery': 'Al momento non è stato possibile consegnare il tuo messaggio. Non è stato inviato. Riprova più tardi.',
  'contact.fail.network': 'Non è stato possibile inviare il messaggio perché la connessione è caduta. Controlla la connessione a Internet e riprova.',
  'contact.unavailable.h': 'Il modulo di contatto non è ancora disponibile',
  'contact.unavailable.p': 'Questo sito non è stato ancora collegato a una casella di posta, quindi da questa pagina non è possibile inviare messaggi.',
  'contact.report.h': 'Segnalare un problema',
  'contact.report.intro': 'Per aiutarci a riprodurre un problema, includi:',
  'contact.report.1': 'Il nome dello strumento e l’indirizzo della pagina.',
  'contact.report.2': 'Il tuo browser e dispositivo (ad esempio «Chrome 130 su Windows 11»).',
  'contact.report.3': 'Cosa ti aspettavi e cosa è successo invece, compreso l’eventuale messaggio di errore.',
  'contact.report.4': 'Il tipo di file e le dimensioni approssimative. Non inviare documenti sensibili.',
  'contact.privacy': 'Il messaggio che scrivi qui viene inviato a noi e usato solo per risponderti. I file e il testo che usi negli strumenti non ne fanno mai parte. Consulta l’<privacy>Informativa sulla privacy</privacy>.',
} as PartialMessages;
