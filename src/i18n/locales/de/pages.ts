import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Wir konnten diese Seite nicht finden. Sie wurde möglicherweise verschoben, oder die Adresse enthält einen Tippfehler.',
  'notFound.home': 'Zurück zur Startseite',
  'notFound.popular': 'Beliebte Tools',
  'category.count': '{count} Tools.',
  'category.sections': 'Bereiche in {name}',
  'category.more': 'Weitere Tool-Kategorien',
  'tools.title': 'Alle Tools',
  'tools.jump': 'Zu einer Kategorie springen',

  // About

  // Help chrome
  'help.title': 'Hilfe & FAQ',

  // Legal pages
  'legal.privacy.title': 'Datenschutzerklärung',
  'legal.terms.title': 'Nutzungsbedingungen',
  'legal.cookies.title': 'Informationen zu Cookies & Browserspeicher',

  // Contact
  'contact.title': 'Kontakt',
  'contact.lead': 'Fragen, Fehlermeldungen und Tool-Vorschläge sind willkommen.',
  'contact.form.h': 'Nachricht senden',
  'contact.form.name': 'Ihr Name',
  'contact.form.email': 'Ihre E-Mail-Adresse',
  'contact.form.emailHint': 'Wird nur verwendet, um Ihnen zu antworten.',
  'contact.form.page': 'Tool oder Seite (optional)',
  'contact.form.pagePlaceholder': 'Zum Beispiel: PDF zusammenfügen',
  'contact.form.message': 'Nachricht',
  'contact.form.messageHint': 'Mindestens {min} Zeichen. Bitte geben Sie keine Passwörter oder sensiblen Dokumente an.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Nachricht senden',
  'contact.form.sending': 'Wird gesendet…',
  'contact.form.honeypot': 'Dieses Feld leer lassen',
  'contact.err.name': 'Geben Sie Ihren Namen ein.',
  'contact.err.email': 'Geben Sie eine gültige E-Mail-Adresse ein.',
  'contact.err.message': 'Schreiben Sie eine Nachricht mit mindestens {min} und höchstens {max} Zeichen.',
  'contact.err.summary': 'Bitte korrigieren Sie die markierten Felder.',
  'contact.sent.h': 'Nachricht gesendet',
  'contact.sent.p': 'Vielen Dank. Ihre Nachricht wurde zugestellt. Wir lesen jede Nachricht, können aber keine Antwortzeit zusagen.',
  'contact.sent.another': 'Weitere Nachricht senden',
  'contact.fail.notConfigured': 'Das Kontaktformular ist auf dieser Website noch nicht mit einem Postfach verbunden, daher wurde Ihre Nachricht nicht gesendet. Es wurde nichts gespeichert.',
  'contact.fail.rate': 'Zu viele Nachrichten von Ihrer Verbindung. Bitte warten Sie einige Minuten und versuchen Sie es erneut.',
  'contact.fail.delivery': 'Wir konnten Ihre Nachricht gerade nicht zustellen. Sie wurde nicht gesendet. Bitte versuchen Sie es später erneut.',
  'contact.fail.network': 'Die Nachricht konnte nicht gesendet werden, da die Verbindung fehlgeschlagen ist. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
  'contact.unavailable.h': 'Das Kontaktformular ist noch nicht verfügbar',
  'contact.unavailable.p': 'Diese Website ist noch nicht mit einem Postfach verbunden, daher können von dieser Seite keine Nachrichten gesendet werden.',
  'contact.report.h': 'Ein Problem melden',
  'contact.report.intro': 'Damit wir ein Problem nachvollziehen können, geben Sie bitte Folgendes an:',
  'contact.report.1': 'Den Namen des Tools und die Seitenadresse.',
  'contact.report.2': 'Ihren Browser und Ihr Gerät (zum Beispiel „Chrome 130 unter Windows 11“).',
  'contact.report.3': 'Was Sie erwartet haben und was stattdessen passiert ist, einschließlich einer Fehlermeldung.',
  'contact.report.4': 'Den Dateityp und die ungefähre Größe. Bitte senden Sie keine sensiblen Dokumente.',
  'contact.privacy': 'Die Nachricht, die Sie hier schreiben, wird an uns gesendet und nur verwendet, um Ihnen zu antworten. Dateien und Text, die Sie in den Tools verwenden, sind nie Teil davon. Siehe <privacy>Datenschutzerklärung</privacy>.',
} as PartialMessages;
