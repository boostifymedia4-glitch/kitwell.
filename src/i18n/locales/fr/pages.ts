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
  'about.title': 'À propos de {site}',
  'about.lead': 'Des outils simples et fiables pour les tâches courantes sur les fichiers, les PDF, le texte et le développement.',
  'about.what.h': 'Ce que nous faisons',
  'about.what.p': '{site} est une collection de petits utilitaires : conversion et compression d’images, fusion et division de PDF, nettoyage de texte, formatage ou encodage de données. Chaque outil a sa propre page, fait une seule chose, et indique clairement ce qu’il prend en charge et ce qu’il ne fait pas.',
  'about.how.h': 'Comment fonctionnent les outils',
  'about.how.p': 'Les outils s’exécutent dans votre navigateur web. Lorsque vous ajoutez une image ou un PDF, votre navigateur le lit depuis votre appareil, effectue le travail localement, puis vous remet le résultat à télécharger. Nos outils n’envoient ni vos fichiers ni le texte que vous collez à nos serveurs. Comme le travail se fait sur votre appareil, la vitesse et la taille maximale des fichiers dépendent de votre ordinateur ou de votre téléphone.',
  'about.not.h': 'Ce que nous ne faisons pas',
  'about.not.1': 'Nous n’exigeons pas de compte et n’ajoutons pas de filigrane à vos résultats.',
  'about.not.2': 'Nous ne réécrivons pas le texte existant des PDF. Les outils PDF fusionnent, divisent, compressent, signent, remplissent, caviardent, comparent et reconnaissent le texte des documents, mais ils ne modifient pas les mots déjà présents.',
  'about.not.3': 'Nous ne proposons pas d’outils qui nécessitent de grands modèles d’IA ou des services payants, comme la suppression d’arrière-plan, tant qu’ils ne peuvent pas être réalisés de façon fiable et privée. Le seul moteur que nous intégrons, pour l’OCR, est open source et s’exécute dans votre navigateur.',
  'about.who.h': 'Qui est derrière {site}',
  'about.who.placeholder': 'Ajoutez une courte description sincère de la personne ou de l’entreprise qui exploite ce site : nom, pays et ce qui a motivé le projet.',
  'about.touch.h': 'Nous contacter',
  'about.touch.p': 'Vous avez trouvé un bug ou souhaitez qu’on ajoute un outil ? Consultez la <contact>page de contact</contact>. Pour savoir comment nous traitons les données, lisez la <privacy>politique de confidentialité</privacy>.',

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
