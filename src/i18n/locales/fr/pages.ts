import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Nous n’avons pas trouvé cette page. Elle a peut-être été déplacée, ou l’adresse comporte une faute de frappe.',
  'notFound.home': 'Retour à l’accueil',
  'notFound.popular': 'Outils populaires',
  'category.count': '{count} outils.',
  'category.sections': 'Sections de {name}',
  'category.more': 'Autres catégories d’outils',
  'tools.title': 'Tous les outils',
  'tools.jump': 'Aller à une catégorie',

  // About

  // Help chrome
  'help.title': 'Aide et FAQ',

  // Legal pages
  'legal.privacy.title': 'Politique de confidentialité',
  'legal.terms.title': 'Conditions générales',
  'legal.cookies.title': 'Informations sur les cookies et le stockage du navigateur',

  // Contact
  'contact.title': 'Nous contacter',
  'contact.lead': 'Vos questions, signalements de bugs et suggestions d’outils sont les bienvenus.',
  'contact.form.h': 'Envoyer un message',
  'contact.form.name': 'Votre nom',
  'contact.form.email': 'Votre adresse e-mail',
  'contact.form.emailHint': 'Utilisée uniquement pour vous répondre.',
  'contact.form.page': 'Outil ou page (facultatif)',
  'contact.form.pagePlaceholder': 'Par exemple : Fusionner des PDF',
  'contact.form.message': 'Message',
  'contact.form.messageHint': '{min} caractères minimum. N’incluez pas de mots de passe ni de documents sensibles.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Envoyer le message',
  'contact.form.sending': 'Envoi en cours…',
  'contact.form.honeypot': 'Laissez ce champ vide',
  'contact.err.name': 'Saisissez votre nom.',
  'contact.err.email': 'Saisissez une adresse e-mail valide.',
  'contact.err.message': 'Rédigez un message d’au moins {min} caractères (au plus {max}).',
  'contact.err.summary': 'Veuillez corriger les champs signalés.',
  'contact.sent.h': 'Message envoyé',
  'contact.sent.p': 'Merci. Votre message a bien été remis. Nous lisons chaque message mais ne pouvons pas promettre de délai de réponse.',
  'contact.sent.another': 'Envoyer un autre message',
  'contact.fail.notConfigured': 'Le formulaire de contact n’est pas encore relié à une boîte e-mail sur ce site, votre message n’a donc pas été envoyé. Rien n’a été enregistré.',
  'contact.fail.rate': 'Trop de messages depuis votre connexion. Patientez quelques minutes et réessayez.',
  'contact.fail.delivery': 'Nous n’avons pas pu remettre votre message pour le moment. Il n’a pas été envoyé. Veuillez réessayer plus tard.',
  'contact.fail.network': 'Le message n’a pas pu être envoyé car la connexion a échoué. Vérifiez votre connexion internet et réessayez.',
  'contact.unavailable.h': 'Le formulaire de contact n’est pas encore disponible',
  'contact.unavailable.p': 'Ce site n’est pas encore relié à une boîte e-mail, les messages ne peuvent donc pas être envoyés depuis cette page.',
  'contact.report.h': 'Signaler un problème',
  'contact.report.intro': 'Pour nous aider à reproduire un problème, merci d’indiquer :',
  'contact.report.1': 'Le nom de l’outil et l’adresse de la page.',
  'contact.report.2': 'Votre navigateur et votre appareil (par exemple « Chrome 130 sous Windows 11 »).',
  'contact.report.3': 'Ce que vous attendiez et ce qui s’est passé à la place, y compris tout message d’erreur.',
  'contact.report.4': 'Le type de fichier et sa taille approximative. N’envoyez pas de documents sensibles.',
  'contact.privacy': 'Le message que vous écrivez ici nous est envoyé et sert uniquement à vous répondre. Les fichiers et textes que vous utilisez dans les outils n’en font jamais partie. Consultez la <privacy>politique de confidentialité</privacy>.',
} as PartialMessages;
