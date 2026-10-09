import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Une erreur s’est produite. Veuillez réessayer.',
  'err.unknown': 'erreur inconnue',

  // File validation
  'err.files.limit': 'Limite de {max} fichiers atteinte.',
  'err.files.unsupportedType': 'Type de fichier non pris en charge. Types acceptés : {types}.',
  'err.files.empty': 'Le fichier est vide.',
  'err.files.tooLarge': 'Trop volumineux ({size}). Maximum : {max}.',
  'err.files.onlyOne': 'Un seul fichier peut être utilisé à la fois.',

  // JSON
  'err.json.badUnicode': 'Séquence d’échappement Unicode non valide',
  'err.json.badEscape': 'Séquence d’échappement non valide dans la chaîne',
  'err.json.controlChar': 'Caractère de contrôle non échappé dans la chaîne (utilisez \\n pour les sauts de ligne)',
  'err.json.unterminatedString': 'Chaîne non terminée',
  'err.json.invalidNumber': 'Nombre non valide',
  'err.json.unexpectedEnd': 'Fin inattendue du JSON',
  'err.json.trailingComma': 'La virgule finale n’est pas autorisée en JSON',
  'err.json.propertyName': 'Nom de propriété attendu entre guillemets doubles',
  'err.json.doubleQuotes': 'Les chaînes doivent utiliser des guillemets doubles',
  'err.json.unexpectedChar': 'Caractère inattendu « {char} »',
  'err.json.trailingContent': 'Contenu inattendu après la fin de la valeur JSON',
  'err.json.empty': 'Saisissez du JSON pour continuer.',
  'err.json.invalid': 'JSON non valide',

  // XML
  'err.xml.empty': 'Saisissez du XML pour continuer.',
  'err.xml.unterminatedComment': 'Commentaire non terminé',
  'err.xml.unterminatedPi': 'Instruction de traitement non terminée',
  'err.xml.unterminatedDeclaration': 'Déclaration non terminée',
  'err.xml.unterminatedAttribute': 'Valeur d’attribut non terminée',
  'err.xml.unterminatedTag': 'Balise non terminée',
  'err.xml.unexpectedClosing': 'Balise fermante inattendue </{name}>',
  'err.xml.mismatched': 'Balise fermante incorrecte : </{expected}> attendue, mais </{found}> trouvée',
  'err.xml.invalidTagName': 'Nom de balise non valide « {name} »',
  'err.xml.unclosedTag': 'Balise <{name}> non fermée',
  'err.xml.noElement': 'Aucun élément XML trouvé',
  'err.xml.singleRoot': 'Un document XML doit avoir un seul élément racine',
  'err.xml.strayText': 'Le texte n’est pas autorisé en dehors de l’élément racine',

  // Developer tools
  'err.dev.malformedPercent': 'Le texte contient une séquence de pourcentage mal formée (par exemple un « % » qui n’est pas suivi de deux chiffres hexadécimaux).',
  'err.dev.badBase64': 'Ce n’est pas du Base64 valide. Recherchez des caractères manquants, en trop ou non pris en charge.',
  'err.dev.notUtf8': 'Les données décodées ne sont pas du texte UTF-8 valide. Il peut s’agir de données binaires, comme une image.',
  'err.dev.noCharType': 'Sélectionnez au moins un type de caractère.',
  'err.dev.timestampFormat': 'Saisissez un nombre de secondes ou de millisecondes depuis le 1970-01-01 UTC.',
  'err.dev.timestampRange': 'Cet horodatage est en dehors de la plage de dates prise en charge.',
  'err.regex.invalid': 'Expression régulière non valide',
  'err.regex.timeout': 'Ce motif a pris trop de temps à s’exécuter et a été arrêté. Il peut provoquer un retour arrière catastrophique (par exemple une répétition imbriquée comme (a+)+).',

  // GIF
  'err.gif.noImages': 'Ajoutez au moins une image.',
  'err.gif.tooManyFrames': 'Un GIF peut avoir au maximum {max} images.',
  'err.gif.sizeNotInteger': 'La taille du GIF doit être un nombre entier de pixels.',
  'err.gif.tooLarge': 'Le GIF est trop grand.',
  'err.gif.tooLargeToBuild': 'Ce GIF serait trop grand pour être créé par votre navigateur. Utilisez une taille plus petite ou moins d’images.',
  'err.gif.colours': 'Choisissez 16, 32, 64, 128 ou 256 couleurs.',
  'err.gif.frameMismatch': 'Une image ne correspond pas à la taille du GIF.',
  'err.gif.notGif': 'Ce n’est pas un fichier GIF.',
  'err.gif.damaged': 'Les données du GIF sont endommagées.',
  'err.gif.incomplete': 'Les données du GIF sont incomplètes.',

  // Images
  'err.image.processingFailed': 'Échec du traitement.',
  'err.image.noCanvas': 'Impossible de créer une surface de dessin. L’image est peut-être trop grande pour cet appareil.',
  'err.image.resultTooBig': 'Le résultat ferait {width} × {height} px, ce qui dépasse ce que cet outil de navigateur peut créer en toute sécurité (maximum {max} px par côté).',
  'err.image.watermarkTooSmall': 'Le filigrane est trop petit pour être répété en mosaïque. Utilisez une taille plus grande ou un filigrane unique.',
  'err.image.notLarger': 'Choisissez une taille supérieure à l’original. Utilisez Redimensionner une image pour réduire des images.',
  'err.image.notSvg': 'Ce fichier ne ressemble pas à une image SVG.',
  'err.image.svgFailed': 'Ce SVG n’a pas pu être dessiné. Il est peut-être non valide ou utilise des fonctions que les navigateurs ne prennent pas en charge.',
  'err.image.encodeFailed': 'Le navigateur n’a pas pu encoder cette image.',
  'err.image.formatUnsupported': 'Votre navigateur ne peut pas enregistrer d’images {format}. Essayez un autre format de sortie ou une version récente de Chrome, Edge ou Firefox.',
  'err.image.unreadable': 'Ce fichier n’a pas pu être lu comme une image. Il est peut-être corrompu ou dans un format non pris en charge.',

  // OCR
  'err.ocr.engineStart': 'Le moteur OCR n’a pas pu démarrer. Rechargez la page et réessayez ; si le problème persiste, votre navigateur ne prend peut-être pas en charge WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Choisissez les majuscules, les minuscules, ou les deux.',
  'err.passwords.length': 'Choisissez une longueur comprise entre {min} et {max}.',
  'err.passwords.chooseCategory': 'Choisissez au moins une catégorie de mots.',
  'err.passwords.cannotBuild': 'Impossible de créer un mot de passe basé sur un nom avec ces réglages. Essayez une autre longueur ou activez les chiffres ou les symboles.',

  // QR codes
  'err.qr.noText': 'Saisissez d’abord un texte ou un lien.',
  'err.qr.tooMuchData': 'Il y a trop de données pour un code QR à ce niveau de correction d’erreurs. Raccourcissez le texte ou choisissez un niveau plus bas.',
  'err.qr.badColours': 'Choisissez des couleurs valides.',
  'err.qr.wifiName': 'Saisissez le nom du réseau.',
  'err.qr.wifiPassword': 'Saisissez le mot de passe Wi-Fi, ou choisissez « Aucun mot de passe ».',
  'err.qr.email': 'Saisissez une adresse e-mail valide.',
  'err.qr.phone': 'Saisissez un numéro de téléphone en chiffres, avec un + initial facultatif.',
  'err.qr.unreadableImage': 'Impossible de lire cette image. Elle est peut-être trop grande pour cet appareil.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Un seul PDF peut être utilisé à la fois.',
  'err.pdf.unreadable': 'Ce fichier n’a pas pu être lu comme un PDF. Il est peut-être corrompu ou ce n’est pas un PDF.',
  'err.pdf.passwordProtected': 'Ce PDF est protégé par un mot de passe. Retirez d’abord le mot de passe avec notre outil Déverrouiller un PDF, puis réessayez.',
  'err.pdf.pageMissing': 'La page {page} n’existe pas dans ce document.',
  'err.pdf.noCanvas': 'Votre navigateur n’a pas pu créer de surface de dessin pour cette page.',
  'err.pdf.encodePage': 'Le navigateur n’a pas pu encoder cette page en image.',
  'err.pdf.encodePageImage': 'Le navigateur n’a pas pu encoder l’image d’une page.',
  'err.pdf.renderTooLarge': 'Cette page est trop grande pour être affichée à la résolution choisie. Essayez un DPI plus bas.',
  'err.pdf.previewTooLarge': 'Cette page est trop grande pour être prévisualisée.',
  'err.pdf.flattenTooLarge': 'Une page est trop grande pour être traitée à cette qualité. Choisissez une qualité plus basse.',
  'err.pdf.compareSize': 'Les deux images doivent avoir la même taille.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Ajoutez au moins deux fichiers PDF à fusionner.',
  'err.pdf.mergeFile': '{name} : {message}',
  'err.pdf.fileN': 'Fichier {n}',
  'err.pdf.selectPage': 'Sélectionnez au moins une page.',
  'err.pdf.selectedPageMissing': 'Une page sélectionnée n’existe pas dans ce PDF.',
  'err.pdf.enterPages': 'Saisissez les pages souhaitées, par exemple 1-3, 5.',
  'err.pdf.enterRanges': 'Saisissez les plages de chaque fichier de sortie, par exemple 1-3, 4-6.',
  'err.pdf.badRange': '« {token} » n’est pas une page ou une plage valide.',
  'err.pdf.rangeOutside.one': '« {token} » est en dehors de ce document, qui compte {count} page.',
  'err.pdf.rangeOutside.many': '« {token} » est en dehors de ce document, qui compte {count} pages.',
  'err.pdf.rangeOutside.other': '« {token} » est en dehors de ce document, qui compte {count} pages.',
  'err.pdf.rangeBackwards': '« {token} » est à l’envers. Écrivez les plages du plus petit au plus grand, comme {example}.',
  'err.pdf.noImages': 'Ajoutez au moins une image.',
  'err.pdf.imageEmbed': 'Une des images n’a pas pu être intégrée. Elle est peut-être corrompue ou d’une variante non prise en charge.',

  // PDF: editing
  'err.pdf.latinOnly': 'Seuls les lettres latines, les chiffres et les symboles courants peuvent être utilisés ici, car les polices intégrées du PDF n’incluent pas d’autres alphabets.',
  'err.pdf.badColour': 'Choisissez une couleur valide.',
  'err.pdf.badPages': 'Choisissez des pages valides.',
  'err.pdf.numberFirst': 'La première page à numéroter doit être comprise entre 1 et {count}.',
  'err.pdf.numberLast': 'La dernière page à numéroter doit être comprise entre {from} et {count}.',
  'err.pdf.numberStart': 'Commencez la numérotation à un nombre entier compris entre 0 et 99 999.',
  'err.pdf.fontSize72': 'La taille de police doit être comprise entre 6 et 72.',
  'err.pdf.fontSize300': 'La taille de police doit être comprise entre 6 et 300.',
  'err.pdf.margin': 'La marge doit être comprise entre 0 et 200.',
  'err.pdf.opacity': 'L’opacité doit être comprise entre 5 % et 100 %.',
  'err.pdf.angle': 'L’angle doit être compris entre -180 et 180 degrés.',
  'err.pdf.watermarkText': 'Saisissez le texte du filigrane.',
  'err.pdf.watermarkLength': 'Le texte du filigrane ne peut pas dépasser 100 caractères.',
  'err.pdf.imageScale': 'La taille de l’image doit représenter entre 5 % et 100 % de la largeur de la page.',
  'err.pdf.watermarkImage': 'L’image du filigrane n’a pas pu être lue. Utilisez un fichier PNG ou JPG valide.',
  'err.pdf.watermarkTile': 'Le filigrane est trop petit pour être répété en mosaïque. Utilisez une taille plus grande ou la disposition centrée.',
  'err.pdf.cropOutside': 'Choisissez une zone de recadrage à l’intérieur de la page.',
  'err.pdf.cropSmall': 'La zone de recadrage est trop petite sur la page {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Saisissez un mot de passe.',
  'err.pdf.passwordLength': 'Le mot de passe ne peut pas dépasser 127 caractères.',
  'err.pdf.passwordChars': 'Utilisez uniquement des lettres, chiffres et symboles standard dans le mot de passe afin que tous les lecteurs PDF puissent ouvrir le fichier.',
  'err.pdf.alreadyPassword': 'Ce PDF est déjà protégé par un mot de passe. Déverrouillez-le d’abord avec l’outil Déverrouiller un PDF.',
  'err.pdf.alreadyProtected': 'Ce PDF est déjà protégé. Déverrouillez-le d’abord avec l’outil Déverrouiller un PDF.',
  'err.pdf.unlockUnsupported': 'Ce PDF n’a pas pu être déverrouillé. Il utilise peut-être un type de protection non pris en charge.',
  'err.pdf.wrongPassword': 'Ce mot de passe n’est pas correct.',
  'err.pdf.unlockDamaged': 'Ce PDF n’a pas pu être déverrouillé. Il est peut-être endommagé.',

  // PDF: forms
  'err.pdf.formRead': 'Les champs de formulaire de ce PDF n’ont pas pu être lus. Le fichier utilise peut-être une structure de formulaire inhabituelle.',
  'err.pdf.formFieldChar': 'La valeur de « {name} » contient un caractère que la police du formulaire ne peut pas afficher. Utilisez des lettres latines simples, des chiffres et des symboles courants dans ce champ.',
  'err.pdf.formNoField': 'Le champ « {name} » n’existe pas dans ce PDF.',
  'err.pdf.formMaxLength': '« {name} » accepte au maximum {max} caractères.',
  'err.pdf.formFillFailed': '« {name} » n’a pas pu être rempli : {message}.',
  'err.pdf.formChar': 'Un champ contient un caractère que la police du formulaire ne peut pas afficher. Utilisez des lettres latines simples, des chiffres et des symboles courants.',
  'err.pdf.formSaveFailed': 'Le formulaire rempli n’a pas pu être enregistré : {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Marquez au moins une zone ou un terme de recherche à caviarder.',
  'err.pdf.signNoPlacement': 'Choisissez où placer la signature.',
  'err.pdf.signImageUnreadable': 'L’image de la signature n’a pas pu être lue. Dessinez, saisissez ou importez une signature PNG ou JPG.',
  'err.pdf.signOutside': 'La signature doit tenir à l’intérieur de la page.',
} as PartialMessages;
