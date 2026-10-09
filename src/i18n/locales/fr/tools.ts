import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG vers PNG',
    description: 'Convertissez vos photos JPG et JPEG en images PNG sans perte en un clic.',
    metaDescription: 'Convertissez gratuitement du JPG en PNG en ligne. Conversion par lot de photos JPEG directement dans votre navigateur, sans envoi ni inscription.',
    steps: [
      'Déposez un ou plusieurs fichiers JPG sur l\'outil, ou choisissez-les depuis votre appareil.',
      'Vérifiez les aperçus, puis appuyez sur Convertir.',
      'Téléchargez chaque PNG, ou tout d\'un coup dans un ZIP.',
    ],
    faq: [
      { q: 'Convertir du JPG en PNG améliore-t-il la qualité ?', a: 'Non. Le JPG est un format avec perte : les détails supprimés lors de son enregistrement ne peuvent pas être récupérés. Le PNG se contente de conserver les pixels actuels sans nouvelle perte, ce qui est utile pour la retouche ou la gestion de la transparence.' },
      { q: 'Pourquoi le PNG est-il plus lourd que le JPG ?', a: 'Le PNG est sans perte et stocke généralement les photographies moins efficacement que le JPG. Utilisez le JPG ou le WebP lorsque la taille du fichier compte plus que l\'exactitude des pixels.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG vers JPG',
    description: 'Transformez vos images PNG en fichiers JPG plus légers, avec une qualité réglable.',
    metaDescription: 'Convertissez gratuitement du PNG en JPG en ligne. Choisissez la qualité et la couleur de fond des images transparentes. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers PNG.',
      'Réglez la qualité du JPG et la couleur de fond qui remplira les zones transparentes.',
      'Appuyez sur Convertir et téléchargez les résultats.',
    ],
    faq: [
      { q: 'Que deviennent les zones transparentes ?', a: 'Le JPG ne gère pas la transparence : les pixels transparents sont remplis avec la couleur de fond que vous choisissez (blanc par défaut).' },
      { q: 'Quel réglage de qualité utiliser ?', a: 'Entre 80 et 90, c\'est un bon compromis pour la plupart des images. En dessous d\'environ 60, les artefacts de compression deviennent visibles sur le texte et les contours nets.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'La transparence est aplatie sur une couleur unie, car le JPG ne peut pas la stocker.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG vers WebP',
    description: 'Convertissez vos photos JPG en WebP moderne pour des fichiers plus légers et des pages plus rapides.',
    metaDescription: 'Convertissez gratuitement du JPG en WebP en ligne. Allégez vos photos pour le web avec une qualité réglable, traitées localement dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers JPG.',
      'Choisissez une qualité WebP (80 est une valeur par défaut raisonnable).',
      'Convertissez et téléchargez.',
    ],
    faq: [
      { q: 'Le WebP est-il plus léger que le JPG ?', a: 'En général de 20 à 35 % plus léger pour une qualité visuelle similaire, mais le résultat dépend de l\'image.' },
      { q: 'Tous les navigateurs prennent-ils en charge le WebP ?', a: 'Tous les principaux navigateurs actuels peuvent afficher le WebP. L\'encodage WebP dans le navigateur est pris en charge par Chrome, Edge, Firefox et les versions récentes de Safari ; si le vôtre ne le peut pas, l\'outil vous en informe au lieu de produire un fichier erroné.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'Votre navigateur doit prendre en charge l\'encodage WebP ; sinon, une erreur s\'affiche.',
    ],
  },
  'png-to-webp': {
    name: 'PNG vers WebP',
    description: 'Convertissez vos images PNG en WebP en conservant la transparence, pour une fraction du poids.',
    metaDescription: 'Convertissez gratuitement du PNG en WebP en ligne. Conserve la transparence, réduit le poids des fichiers et fonctionne entièrement dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers PNG.',
      'Choisissez la qualité WebP.',
      'Convertissez et téléchargez.',
    ],
    faq: [
      { q: 'La transparence est-elle conservée ?', a: 'Oui. Le WebP gère le canal alpha : les PNG transparents restent transparents.' },
      { q: 'Puis-je obtenir un résultat sans perte ?', a: 'Réglez la qualité sur 100 pour une fidélité maximale. Les navigateurs encodent le WebP avec perte ; utilisez donc le PNG si vous avez besoin d\'une copie mathématiquement exacte.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'Votre navigateur doit prendre en charge l\'encodage WebP ; sinon, une erreur s\'affiche.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP vers JPG',
    description: 'Convertissez vos images WebP en fichiers JPG compatibles partout.',
    metaDescription: 'Convertissez gratuitement du WebP en JPG en ligne. Rendez vos images WebP utilisables partout, converties localement dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers WebP.',
      'Réglez la qualité et la couleur de fond des zones transparentes.',
      'Convertissez et téléchargez.',
    ],
    faq: [
      { q: 'Pourquoi convertir du WebP en JPG ?', a: 'Certains logiciels anciens, clients de messagerie et formulaires d\'envoi refusent encore le WebP. Le JPG est accepté presque partout.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'La transparence est aplatie sur une couleur unie, car le JPG ne peut pas la stocker.',
    ],
  },
  'webp-to-png': {
    name: 'WebP vers PNG',
    description: 'Convertissez vos images WebP en PNG sans perte, en conservant la transparence.',
    metaDescription: 'Convertissez gratuitement du WebP en PNG en ligne. Conserve la transparence et fonctionne entièrement dans votre navigateur, sans envoi de fichier.',
    steps: [
      'Ajoutez vos fichiers WebP.',
      'Appuyez sur Convertir.',
      'Téléchargez les fichiers PNG.',
    ],
    faq: [
      { q: 'La transparence est-elle conservée ?', a: 'Oui. Le PNG gère la transparence : le canal alpha du WebP est donc repris tel quel.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
    ],
  },
  'image-compressor': {
    name: 'Compresseur d\'images',
    description: 'Réduisez le poids de vos images avec une qualité réglable et voyez l\'économie exacte réalisée.',
    metaDescription: 'Compressez gratuitement vos images JPG, PNG et WebP en ligne. Réglez la qualité, limitez les dimensions si besoin et comparez les poids. Dans votre navigateur.',
    steps: [
      'Ajoutez vos images.',
      'Choisissez un format de sortie et une qualité, et éventuellement une largeur ou une hauteur maximale.',
      'Compressez, comparez les poids avant et après, puis téléchargez.',
    ],
    faq: [
      { q: 'Comment le compresseur réduit-il le poids ?', a: 'Il réencode l\'image à la qualité choisie et peut aussi la réduire. La sortie PNG étant sans perte, elle ne s\'allège que si vous réduisez aussi les dimensions.' },
      { q: 'Et si le résultat est plus lourd que l\'original ?', a: 'Cela peut arriver avec des fichiers déjà optimisés. L\'outil vous le signale pour que vous puissiez conserver l\'original.' },
      { q: 'Les données EXIF ou de localisation sont-elles conservées ?', a: 'Non. Le réencodage via un canevas supprime les métadonnées EXIF, comme le modèle d\'appareil photo et la position GPS, ce qui est souvent souhaitable avant de partager une photo. Les profils colorimétriques ne sont pas conservés non plus.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'Les meilleurs résultats s\'obtiennent avec une sortie JPG ou WebP ; la sortie PNG est sans perte et peut ne pas s\'alléger.',
    ],
  },
  'image-resizer': {
    name: 'Redimensionneur d\'images',
    description: 'Redimensionnez vos images en pixels exacts ou en pourcentage, en conservant les proportions.',
    metaDescription: 'Redimensionnez gratuitement vos images en ligne. Définissez largeur et hauteur exactes ou un pourcentage, gardez les proportions et téléchargez en JPG, PNG ou WebP.',
    steps: [
      'Ajoutez une ou plusieurs images.',
      'Choisissez les pixels ou le pourcentage et saisissez la nouvelle taille. Laissez le verrouillage des proportions activé pour éviter toute déformation.',
      'Redimensionnez et téléchargez.',
    ],
    faq: [
      { q: 'Puis-je agrandir une image ?', a: 'Oui, mais un agrandissement ne peut pas ajouter de détails : le résultat paraîtra plus flou. La réduction donne la meilleure qualité.' },
      { q: 'Quelle est la taille maximale en sortie ?', a: 'Les navigateurs limitent la taille du canevas. Cet outil plafonne la sortie à 16 000 px par côté et à environ 100 mégapixels.' },
      { q: 'Les données EXIF ou de localisation sont-elles conservées ?', a: 'Non. Le réencodage via un canevas supprime les métadonnées EXIF, comme le modèle d\'appareil photo et la position GPS, ce qui est souvent souhaitable avant de partager une photo. Les profils colorimétriques ne sont pas conservés non plus.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'La sortie est plafonnée à 16 000 px par côté.',
    ],
  },
  'image-cropper': {
    name: 'Rogneur d\'images',
    description: 'Rognez une image selon une zone précise ou un format fixe, avec aperçu en direct.',
    metaDescription: 'Rognez gratuitement vos images en ligne. Choisissez un format fixe ou saisissez des valeurs en pixels, avec aperçu en direct. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez une image.',
      'Choisissez un format ou faites glisser le cadre de rognage, puis affinez la position et la taille avec les champs numériques.',
      'Appuyez sur Rogner et téléchargez.',
    ],
    faq: [
      { q: 'Le rognage réduit-il la qualité ?', a: 'Le rognage conserve les pixels d\'origine. La qualité ne change que si vous enregistrez en JPG ou en WebP avec un réglage de qualité plus bas.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Une seule image à la fois.',
      '25 MB maximum par fichier.',
      'Les images animées utilisent la première image.',
    ],
  },
  'image-rotator': {
    name: 'Rotation d\'images',
    description: 'Faites pivoter vos images de 90°, 180°, 270° ou selon l\'angle de votre choix.',
    metaDescription: 'Faites pivoter gratuitement vos images en ligne. Tournez vos photos de 90, 180 ou 270 degrés, ou selon un angle personnalisé, directement dans votre navigateur.',
    steps: [
      'Ajoutez vos images.',
      'Choisissez une rotation ou saisissez un angle personnalisé.',
      'Appliquez et téléchargez.',
    ],
    faq: [
      { q: 'Que se passe-t-il pour les rotations qui ne sont pas à angle droit ?', a: 'Le canevas s\'agrandit pour contenir l\'image pivotée. En sortie JPG, les coins vides sont remplis avec le fond que vous avez choisi ; le PNG et le WebP les laissent transparents.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
    ],
  },
  'image-flipper': {
    name: 'Retournement d\'images',
    description: 'Retournez vos images en miroir, horizontalement ou verticalement.',
    metaDescription: 'Retournez gratuitement vos images horizontalement ou verticalement en ligne. Appliquez un effet miroir à vos photos dans votre navigateur, sans envoi.',
    steps: [
      'Ajoutez vos images.',
      'Choisissez l\'horizontal, le vertical ou les deux.',
      'Appliquez et téléchargez.',
    ],
    faq: [
      { q: 'Quelle différence entre le retournement horizontal et vertical ?', a: 'Un retournement horizontal inverse la gauche et la droite, comme dans un miroir. Un retournement vertical met l\'image à l\'envers selon son axe horizontal.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
    ],
  },
  'image-format-converter': {
    name: 'Convertisseur de format d\'image',
    description: 'Convertissez entre JPG, PNG et WebP avec un seul outil souple.',
    metaDescription: 'Convertissez gratuitement vos images entre JPG, PNG et WebP en ligne. Choisissez le format de sortie et la qualité, traitement local dans votre navigateur.',
    steps: [
      'Ajoutez des images dans n\'importe quel format pris en charge.',
      'Choisissez le format de sortie et la qualité.',
      'Convertissez et téléchargez.',
    ],
    faq: [
      { q: 'Quels formats puis-je utiliser ?', a: 'En entrée : JPG, PNG, WebP, GIF, BMP et AVIF si votre navigateur sait les décoder. En sortie : JPG, PNG et WebP.' },
      { q: 'Et pour le HEIC ou le TIFF ?', a: 'Les navigateurs ne savent pas décoder nativement le HEIC ni le TIFF : ces formats ne sont donc pas encore pris en charge.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'Les fichiers HEIC/HEIF, TIFF et RAW ne sont pas pris en charge.',
    ],
  },
  'image-to-base64': {
    name: 'Image vers Base64',
    description: 'Encodez une image en URI de données Base64 pour le CSS, le HTML ou le JSON.',
    metaDescription: 'Convertissez gratuitement une image en chaîne Base64 ou en URI de données en ligne. Copiez des extraits HTML et CSS prêts à l\'emploi. Dans votre navigateur.',
    steps: [
      'Ajoutez une image.',
      'Choisissez le style de sortie : URI de données, Base64 brut, balise HTML <img> ou CSS.',
      'Copiez le résultat.',
    ],
    faq: [
      { q: 'Quand utiliser des images en Base64 ?', a: 'Pour de minuscules icônes dans du CSS ou des e-mails, quand une requête supplémentaire coûte plus cher qu\'une hausse de poids d\'environ 33 %. Évitez-le pour les grandes photos.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      '5 MB maximum par image, car le texte Base64 devient très volumineux.',
      'Une seule image à la fois.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 vers image',
    description: 'Décodez une chaîne Base64 ou une URI de données en une image téléchargeable.',
    metaDescription: 'Convertissez gratuitement une chaîne Base64 ou une URI de données en image en ligne. Prévisualisez et téléchargez le PNG, JPG, WebP ou GIF décodé.',
    steps: [
      'Collez une chaîne Base64 ou une URI de données complète.',
      'L\'image est décodée et prévisualisée instantanément.',
      'Téléchargez l\'image.',
    ],
    faq: [
      { q: 'Ai-je besoin du préfixe « data:image/png;base64, » ?', a: 'Non. Sans préfixe, l\'outil détecte le format grâce à la signature du fichier (PNG, JPG, GIF, WebP).' },
      { q: 'Pourquoi une erreur s\'affiche-t-elle ?', a: 'La chaîne est probablement tronquée, contient des caractères en trop ou n\'est pas une image. Les données SVG sont aussi refusées ici par mesure de sécurité.' },
    ],
    limits: [
      'Prend en charge PNG, JPG, GIF et WebP. Le SVG n\'est volontairement pas affiché.',
      '10 MB maximum de données décodées.',
    ],
  },
  'image-color-picker': {
    name: 'Pipette à couleurs',
    description: 'Prélevez des couleurs exactes dans n\'importe quelle image et extrayez sa palette dominante.',
    metaDescription: 'Prélevez gratuitement des couleurs dans une image en ligne. Cliquez sur un pixel pour obtenir ses valeurs HEX, RGB et HSL et extrayez une palette dominante.',
    steps: [
      'Ajoutez une image.',
      'Cliquez ou touchez n\'importe où (ou utilisez les touches fléchées) pour prélever un pixel.',
      'Copiez la valeur HEX, RGB ou HSL, ou une couleur de la palette extraite.',
    ],
    faq: [
      { q: 'Comment la palette est-elle calculée ?', a: 'L\'image est sous-échantillonnée et ses couleurs sont regroupées en catégories ; les plus fréquentes sont affichées. C\'est une approximation des couleurs dominantes, pas une liste exhaustive.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Une seule image à la fois.',
      'Les couleurs sont prélevées sur les pixels sRGB affichés ; les profils colorimétriques sont ignorés.',
    ],
  },
  'image-watermark': {
    name: 'Filigrane d\'image',
    description: 'Ajoutez un filigrane de texte ou de logo à de nombreuses images à la fois, unique ou en mosaïque.',
    metaDescription: 'Ajoutez gratuitement un filigrane à vos images en ligne. Apposez un texte ou un logo sur vos photos JPG, PNG et WebP par lot, avec opacité et position. Dans votre navigateur.',
    steps: [
      'Ajoutez vos images.',
      'Choisissez du texte ou un logo, puis réglez sa taille, son opacité, sa position et sa disposition.',
      'Appliquez-le et téléchargez les résultats ou un ZIP.',
    ],
    faq: [
      { q: 'Puis-je utiliser l\'ourdou ou d\'autres alphabets ?', a: 'Oui. Les filigranes d\'image utilisent les polices de votre appareil : toute écriture que votre système sait afficher fonctionnera.' },
      { q: 'Mes originaux sont-ils modifiés ?', a: 'Non. Les copies filigranées sont enregistrées comme de nouveaux fichiers.' },
      { q: 'Les données EXIF ou de localisation sont-elles conservées ?', a: 'Non. Le réencodage via un canevas supprime les métadonnées EXIF, comme le modèle d\'appareil photo et la position GPS, ce qui est souvent souhaitable avant de partager une photo. Les profils colorimétriques ne sont pas conservés non plus.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'Fichiers de logo : PNG, JPG ou WebP, jusqu\'à 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG vers PNG / JPG',
    description: 'Transformez vos graphiques vectoriels SVG en images PNG, JPG ou WebP à la taille de votre choix.',
    metaDescription: 'Convertissez gratuitement du SVG en PNG ou JPG en ligne. Choisissez une échelle ou une largeur exacte pour un rendu net ; le PNG conserve la transparence. Dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers SVG.',
      'Choisissez PNG, JPG ou WebP et la taille de sortie.',
      'Convertissez et téléchargez.',
    ],
    faq: [
      { q: 'L\'image restera-t-elle nette en grande taille ?', a: 'Oui. Le SVG est dessiné à la taille que vous choisissez : un export en 4× est aussi net qu\'un export en 1×.' },
      { q: 'Pourquoi mon SVG s\'affiche-t-il différemment ?', a: 'Les navigateurs ne prennent pas en charge toutes les fonctionnalités SVG, et les SVG qui dépendent de polices ou d\'images externes retombent sur des valeurs par défaut. Intégrez les polices et les images dans le SVG pour un résultat optimal.' },
      { q: 'Est-il sûr d\'ouvrir des fichiers SVG ici ?', a: 'Oui. Le SVG est dessiné comme une image : les scripts qu\'il contient ne sont pas exécutés.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      '25 MB maximum par fichier et 20 fichiers par lot.',
      'Les polices, images et styles liés depuis l\'extérieur du SVG ne sont pas chargés.',
      'Un SVG sans taille utilise sa viewBox, ou 300 × 150 px si aucune n\'est définie.',
    ],
  },
  'enlarge-image': {
    name: 'Agrandir une image',
    description: 'Agrandissez vos images avec un rééchantillonnage lisse et net, de 2× à 4× ou jusqu\'à une largeur donnée.',
    metaDescription: 'Agrandissez gratuitement vos images en ligne. Passez vos JPG, PNG et WebP en 2×, 3×, 4× ou à une largeur exacte avec un rééchantillonnage Lanczos et une netteté optionnelle.',
    steps: [
      'Ajoutez vos images.',
      'Choisissez un facteur ou une largeur cible, et indiquez si vous voulez accentuer la netteté.',
      'Agrandissez et téléchargez.',
    ],
    faq: [
      { q: 'S\'agit-il d\'un agrandissement par IA ?', a: 'Non. L\'outil utilise un rééchantillonnage de haute qualité, qui rend les images agrandies lisses et propres mais ne peut pas inventer les détails manquants. Les photos très petites ou floues resteront douces.' },
      { q: 'Quelle taille peut atteindre le résultat ?', a: 'Jusqu\'à 16 000 px par côté et environ 100 mégapixels, selon ce que votre navigateur peut gérer.' },
      { q: 'Les données EXIF ou de localisation sont-elles conservées ?', a: 'Non. Le réencodage via un canevas supprime les métadonnées EXIF, comme le modèle d\'appareil photo et la position GPS, ce qui est souvent souhaitable avant de partager une photo. Les profils colorimétriques ne sont pas conservés non plus.' },
    ],
    limits: [
      'Les fichiers GIF ou WebP animés sont convertis à partir de leur première image uniquement.',
      '25 MB maximum par fichier et 20 fichiers par lot, pour que votre navigateur reste réactif.',
      'Les métadonnées EXIF et les profils colorimétriques intégrés ne sont pas conservés.',
      'L\'outil n\'ajoute aucun détail : ce n\'est pas un agrandissement par IA.',
      'La sortie est plafonnée à 16 000 px par côté.',
    ],
  },
  'blur-image-area': {
    name: 'Flouter ou pixelliser une zone',
    description: 'Masquez des visages, des plaques ou des détails privés en floutant, pixellisant ou recouvrant des zones.',
    metaDescription: 'Floutez ou pixellisez gratuitement une partie d\'une image en ligne. Dessinez des cadres sur des visages, plaques d\'immatriculation ou textes pour les masquer, dans votre navigateur.',
    steps: [
      'Ajoutez une image.',
      'Faites glisser sur l\'image pour dessiner des cadres sur ce que vous voulez masquer.',
      'Choisissez flou, pixellisation ou rectangle noir, appliquez, puis téléchargez.',
    ],
    faq: [
      { q: 'Le flou est-il fiable pour des informations sensibles ?', a: 'Pour tout ce qui doit rester privé, comme des numéros d\'identité ou des plaques d\'immatriculation, utilisez le rectangle noir. Le flou et la pixellisation peuvent parfois être partiellement inversés.' },
      { q: 'Les visages sont-ils détectés automatiquement ?', a: 'Non. Vous dessinez les cadres vous-même. La détection automatique nécessite un gros modèle d\'IA qui n\'est pas inclus.' },
      { q: 'Puis-je changer d\'avis ?', a: 'Oui. Supprimez ou redessinez les cadres avant d\'appliquer. Votre fichier d\'origine n\'est jamais modifié.' },
      { q: 'Les données EXIF ou de localisation sont-elles conservées ?', a: 'Non. Le réencodage via un canevas supprime les métadonnées EXIF, comme le modèle d\'appareil photo et la position GPS, ce qui est souvent souhaitable avant de partager une photo. Les profils colorimétriques ne sont pas conservés non plus.' },
    ],
    limits: [
      'Une seule image à la fois, jusqu\'à 25 MB.',
      'Les zones sont choisies à la main ; il n\'y a pas de détection de visages.',
      'Les images animées utilisent la première image.',
    ],
  },
  'qr-code-scanner': {
    name: 'Lecteur de code QR',
    description: 'Lisez les codes QR de vos photos et captures d\'écran et voyez exactement ce qu\'ils contiennent.',
    metaDescription: 'Lisez gratuitement un code QR depuis une image en ligne. Importez une photo ou une capture d\'écran pour obtenir son lien, son texte ou ses infos Wi-Fi. Dans votre navigateur.',
    steps: [
      'Ajoutez une ou plusieurs images contenant un code QR.',
      'Le code est lu automatiquement.',
      'Copiez le résultat, ou ouvrez un lien après l\'avoir vérifié.',
    ],
    faq: [
      { q: 'Peut-il scanner avec mon appareil photo ?', a: 'Pas encore. Cet outil lit les codes QR à partir de fichiers image. Sur un téléphone, prenez le code en photo et choisissez-la ici, ou utilisez votre application Appareil photo.' },
      { q: 'Est-il sûr d\'ouvrir les liens scannés ?', a: 'Vérifiez d\'abord l\'adresse. Le lien complet est affiché, et seuls les liens web (http ou https) peuvent être ouverts d\'ici. Les liens de script et de données ne sont jamais ouverts.' },
      { q: 'Pourquoi aucun code n\'a-t-il été trouvé ?', a: 'Le code est peut-être flou, rogné, trop petit ou peu contrasté. Essayez une image plus nette et plus proche, montrant tout le code avec une marge claire autour.' },
      { q: 'Mes images sont-elles envoyées ?', a: 'Non. L\'image est lue dans votre navigateur et cet outil ne l\'envoie nulle part.' },
    ],
    limits: [
      'Jusqu\'à 10 images, de 25 MB chacune.',
      'Un seul code est lu par image.',
      'Codes QR standard uniquement ; les autres codes-barres ne sont pas pris en charge.',
    ],
  },
  'gif-maker': {
    name: 'Créateur de GIF',
    description: 'Transformez vos images en GIF animé avec durée, taille et boucle personnalisables.',
    metaDescription: 'Créez gratuitement un GIF animé à partir d\'images en ligne. Réorganisez les images, réglez le délai, la taille et la boucle, puis téléchargez le GIF. Créé dans votre navigateur.',
    steps: [
      'Ajoutez au moins deux images (ou une seule pour un GIF fixe).',
      'Faites-les glisser dans l\'ordre voulu, réglez la durée d\'affichage de chaque image, puis choisissez la taille, la boucle et les couleurs.',
      'Créez le GIF, prévisualisez-le et téléchargez-le.',
    ],
    faq: [
      { q: 'Pourquoi mon GIF est-il si lourd ?', a: 'Un GIF stocke chaque image comme une image limitée à 256 couleurs. Moins d\'images, une largeur plus petite et moins de couleurs allègent tous le fichier. L\'outil affiche la taille dès que le GIF est créé.' },
      { q: 'Puis-je conserver les zones transparentes ?', a: 'Oui, activez « Conserver les zones transparentes » pour les images PNG ou WebP avec transparence. La transparence du GIF est tout ou rien pour chaque pixel : les contours doux deviennent donc nets.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Jusqu\'à 100 images ; plus elles sont grandes, plus votre navigateur a besoin de mémoire.',
      'Les GIF sont limités à 256 couleurs par image, les photos peuvent donc paraître granuleuses.',
      'Les fichiers animés en entrée (GIF, WebP) ne fournissent que leur première image.',
    ],
  },
  'photo-editor': {
    name: 'Éditeur de photos',
    description: 'Ajustez, filtrez, faites pivoter, rognez et ajoutez du texte à une photo, avec aperçu en direct.',
    metaDescription: 'Éditeur de photos en ligne gratuit. Réglez les couleurs, appliquez des filtres, pivotez, redressez, rognez et ajoutez du texte, puis téléchargez en PNG, JPG ou WebP. Privé, dans votre navigateur.',
    steps: [
      'Ajoutez une photo.',
      'Utilisez les onglets pour ajuster les couleurs, appliquer un filtre, pivoter ou rogner, et ajouter du texte. L\'aperçu se met à jour au fur et à mesure.',
      'Choisissez le format et téléchargez votre photo retouchée.',
    ],
    faq: [
      { q: 'Le fichier d\'origine est-il modifié ?', a: 'Non. Votre fichier n\'est jamais modifié ; l\'image retouchée est créée comme un nouveau téléchargement.' },
      { q: 'L\'export fait-il perdre de la qualité ?', a: 'Le PNG conserve chaque pixel. Le JPG et le WebP sont avec perte ; utilisez une qualité de 90 ou plus pour que les photos gardent le même aspect. Les retouches sont appliquées à la taille réelle de votre image, pas à celle de l\'aperçu.' },
      { q: 'Mes images sont-elles envoyées vers un serveur ?', a: 'Non. L\'image est décodée et réencodée par votre navigateur grâce à l\'API Canvas. Cet outil n\'envoie le fichier nulle part.' },
    ],
    limits: [
      'Une seule photo à la fois, jusqu\'à 25 MB et environ 50 mégapixels.',
      'Les retouches sont appliquées dans un ordre fixe : rotation et rognage, réglages des couleurs, flou et netteté, vignettage, puis texte.',
      'Les détails EXIF, comme la localisation, ne sont pas copiés dans l\'image retouchée.',
      'Pas de calques, de pinceaux ni de fonctions d\'IA.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG vers PDF',
    description: 'Transformez vos photos JPG en PDF, une image par page.',
    metaDescription: 'Convertissez gratuitement du JPG en PDF en ligne. Choisissez le format de page, l\'orientation et les marges. Les données JPEG sont intégrées sans recompression.',
    steps: [
      'Ajoutez vos fichiers JPG et définissez leur ordre par glisser-déposer ou avec les flèches.',
      'Choisissez le format de page, l\'orientation et la marge.',
      'Créez le PDF et téléchargez-le.',
    ],
    faq: [
      { q: 'La qualité de l\'image baisse-t-elle ?', a: 'Non. Les fichiers JPG sont intégrés au PDF tels quels, sans recompression.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n\'envoie pas le fichier vers un serveur.' },
    ],
    limits: [
      '25 MB maximum par image et 100 images par PDF.',
      'Seules les images JPG sont acceptées ici ; utilisez Images vers PDF pour des formats mixtes.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG vers PDF',
    description: 'Transformez vos images PNG en PDF en conservant la transparence.',
    metaDescription: 'Convertissez gratuitement du PNG en PDF en ligne. Choisissez le format de page et les marges ; la transparence est conservée. Fonctionne dans votre navigateur.',
    steps: [
      'Ajoutez vos fichiers PNG et définissez leur ordre.',
      'Choisissez le format de page, l\'orientation et la marge.',
      'Créez le PDF et téléchargez-le.',
    ],
    faq: [
      { q: 'La transparence est-elle conservée ?', a: 'Oui. Les images PNG sont intégrées avec leur canal alpha : les zones transparentes laissent apparaître la page blanche en dessous.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n\'envoie pas le fichier vers un serveur.' },
    ],
    limits: [
      '25 MB maximum par image et 100 images par PDF.',
      'Seules les images PNG sont acceptées ici ; utilisez Images vers PDF pour des formats mixtes.',
    ],
  },
  'images-to-pdf': {
    name: 'Images vers PDF',
    description: 'Réunissez des images JPG et PNG dans un seul PDF, dans l\'ordre de votre choix.',
    metaDescription: 'Réunissez gratuitement plusieurs images dans un seul PDF en ligne. Réorganisez les pages, choisissez le format de page et les marges. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez des images JPG et PNG (déposez-en plusieurs à la fois).',
      'Réorganisez-les, puis choisissez le format de page, l\'orientation et la marge.',
      'Créez le PDF et téléchargez-le.',
    ],
    faq: [
      { q: 'Quels formats d\'image fonctionnent ?', a: 'Les JPG et PNG sont intégrés directement. Les WebP, GIF et BMP sont d\'abord convertis en PNG si votre navigateur sait les décoder.' },
      { q: 'À quoi sert « Ajuster à l\'image » ?', a: 'Chaque page prend la taille de son image : rien n\'est redimensionné ni entouré de marges. Choisissez A4 ou Letter pour des pages de document standard.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n\'envoie pas le fichier vers un serveur.' },
    ],
    limits: [
      '25 MB maximum par image et 100 images par PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Fusionner des PDF',
    description: 'Fusionnez plusieurs fichiers PDF en un seul document, dans l\'ordre de votre choix.',
    metaDescription: 'Fusionnez gratuitement des fichiers PDF en ligne. Regroupez plusieurs PDF en un seul, réorganisez-les et téléchargez instantanément. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez au moins deux fichiers PDF.',
      'Placez-les dans l\'ordre voulu avec les flèches.',
      'Fusionnez et téléchargez le PDF combiné.',
    ],
    faq: [
      { q: 'Les signets et les champs de formulaire sont-ils conservés ?', a: 'Les pages sont copiées avec leur contenu visible et leurs liens. Les signets du document et les données de formulaire interactives ne sont pas repris.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n\'envoie pas le fichier vers un serveur.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Les signets/plans et les champs de formulaire des fichiers source ne sont pas fusionnés.',
    ],
  },
  'split-pdf': {
    name: 'Diviser un PDF',
    description: 'Divisez un PDF par plages de pages, en pages uniques ou en blocs de taille fixe.',
    metaDescription: 'Divisez gratuitement un PDF en ligne. Séparez-le par plages de pages, page par page ou toutes les N pages, et téléchargez un ZIP. Fonctionne dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez comment le diviser : plages personnalisées comme 1-3, 4-6, chaque page, ou toutes les N pages.',
      'Divisez, puis téléchargez les parties séparément ou dans un ZIP.',
    ],
    faq: [
      { q: 'Comment écrire les plages ?', a: 'Séparez les fichiers de sortie par des virgules. Chaque fichier peut être une plage (1-3), une page unique (5), ou un mélange séparé par un plus (1-2+7). Exemple : 1-3, 4-6, 7+9.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
    ],
  },
  'rotate-pdf': {
    name: 'Pivoter un PDF',
    description: 'Faites pivoter des pages individuelles ou tout le PDF, avec aperçu en miniatures.',
    metaDescription: 'Faites pivoter gratuitement des pages PDF en ligne. Tournez une page ou toutes les pages de 90, 180 ou 270 degrés et enregistrez un nouveau PDF. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF ; ses pages apparaissent sous forme de miniatures.',
      'Faites pivoter des pages individuelles, ou toutes à la fois.',
      'Enregistrez le PDF pivoté.',
    ],
    faq: [
      { q: 'La rotation est-elle définitive ?', a: 'Elle est enregistrée dans le nouveau PDF sous forme d\'attribut de rotation de page. Le contenu de la page n\'est pas redessiné : rien n\'est perdu.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Extraire des pages d\'un PDF',
    description: 'Choisissez les pages dont vous avez besoin dans un PDF et enregistrez-les dans un nouveau document.',
    metaDescription: 'Extrayez gratuitement des pages d\'un PDF en ligne. Sélectionnez les pages visuellement ou par plage et enregistrez un nouveau PDF. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Cliquez sur les miniatures des pages pour les sélectionner, ou saisissez une plage comme 1-3, 8.',
      'Extrayez et téléchargez le nouveau PDF.',
    ],
    faq: [
      { q: 'Puis-je m\'en servir pour supprimer des pages ?', a: 'Oui. Sélectionnez les pages à conserver et extrayez-les ; les autres sont exclues du nouveau fichier.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Réorganiser les pages d\'un PDF',
    description: 'Réorganisez, supprimez et faites pivoter les pages visuellement, puis enregistrez le résultat.',
    metaDescription: 'Réorganisez gratuitement les pages d\'un PDF en ligne. Faites glisser ou déplacez les pages, supprimez celles qui sont inutiles et enregistrez un nouveau PDF. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF ; ses pages apparaissent sous forme de miniatures.',
      'Faites glisser les pages, ou utilisez les boutons fléchés, pour changer leur ordre. Supprimez les pages inutiles.',
      'Enregistrez le PDF réorganisé.',
    ],
    faq: [
      { q: 'Puis-je réorganiser au clavier ?', a: 'Oui. Utilisez les boutons « déplacer avant » et « déplacer après » de chaque page.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF vers JPG',
    description: 'Convertissez les pages d\'un PDF en images JPG à la résolution de votre choix.',
    metaDescription: 'Convertissez gratuitement un PDF en JPG en ligne. Convertissez toutes les pages ou une sélection jusqu\'à 300 DPI et téléchargez un ZIP. Fonctionne dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez la résolution et, si besoin, les pages à convertir.',
      'Convertissez et téléchargez les images une à une ou dans un ZIP.',
    ],
    faq: [
      { q: 'Quelle résolution choisir ?', a: '150 DPI conviennent pour les écrans ; 300 DPI pour l\'impression. Des valeurs plus élevées produisent des images plus lourdes et demandent plus de mémoire.' },
      { q: 'Les pages sont-elles restituées fidèlement ?', a: 'Le rendu utilise PDF.js de Mozilla, qui gère bien la plupart des PDF. Des polices inhabituelles ou des graphiques avancés peuvent différer légèrement d\'autres visionneuses.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Chaque page est plafonnée à environ 50 mégapixels.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF vers PNG',
    description: 'Convertissez les pages d\'un PDF en images PNG nettes et sans perte.',
    metaDescription: 'Convertissez gratuitement un PDF en PNG en ligne. Restituez les pages jusqu\'à 300 DPI en images sans perte et téléchargez un ZIP. Fonctionne dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez la résolution et les pages.',
      'Convertissez et téléchargez les images une à une ou dans un ZIP.',
    ],
    faq: [
      { q: 'Pourquoi choisir le PNG plutôt que le JPG ?', a: 'Le PNG reste net sur le texte et les dessins au trait, et gère la transparence. Les fichiers sont plus lourds que le JPG.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Chaque page est plafonnée à environ 50 mégapixels.',
    ],
  },
  'pdf-viewer': {
    name: 'Visionneuse PDF',
    description: 'Ouvrez et lisez un PDF en toute confidentialité dans votre navigateur, avec zoom et navigation par page.',
    metaDescription: 'Consultez gratuitement des fichiers PDF en ligne. Zoomez, accédez à une page et lisez vos documents dans votre navigateur sans les envoyer nulle part.',
    steps: [
      'Ajoutez un PDF.',
      'Faites défiler ou utilisez les commandes de page pour naviguer.',
      'Zoomez ou dézoomez selon vos besoins.',
    ],
    faq: [
      { q: 'Puis-je modifier ou annoter le PDF ici ?', a: 'Non. C\'est une visionneuse en lecture seule. Utilisez les outils de pages pour pivoter, réorganiser ou extraire des pages.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Lecture seule : ni annotation, ni remplissage de formulaire, ni recherche de texte.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Visionneuse de métadonnées PDF',
    description: 'Consultez le titre, l\'auteur, les dates de création, le nombre de pages, les formats de page et la version d\'un PDF.',
    metaDescription: 'Consultez gratuitement les métadonnées d\'un PDF en ligne. Titre, auteur, producteur, dates, nombre de pages et formats de page, sans envoyer le fichier.',
    steps: [
      'Ajoutez un PDF.',
      'Passez en revue les propriétés du document.',
      'Copiez les détails au format JSON si besoin.',
    ],
    faq: [
      { q: 'Pourquoi certaines métadonnées sont-elles absentes ?', a: 'De nombreux PDF ne renseignent pas tous les champs. Seuls les champs réellement stockés dans le fichier sont affichés.' },
      { q: 'Puis-je supprimer les métadonnées ?', a: 'Cet outil se contente de lire les métadonnées. Il ne modifie pas le fichier.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Lecture seule : les métadonnées ne peuvent être ni modifiées ni supprimées ici.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Supprimer des pages d\'un PDF',
    description: 'Supprimez les pages inutiles et enregistrez le reste dans un nouveau PDF.',
    metaDescription: 'Supprimez gratuitement des pages d\'un PDF en ligne. Sélectionnez les pages visuellement ou par plage, supprimez-les et téléchargez le reste. Traitement dans votre navigateur.',
    steps: [
      'Ajoutez un PDF ; ses pages apparaissent sous forme de miniatures.',
      'Cliquez sur les pages à supprimer, ou saisissez une plage comme 2, 5-7.',
      'Supprimez-les et téléchargez le nouveau PDF.',
    ],
    faq: [
      { q: 'Mon fichier d\'origine est-il modifié ?', a: 'Non. Vous obtenez un nouveau PDF sans les pages sélectionnées. Votre original reste tel quel.' },
      { q: 'Puis-je supprimer toutes les pages ?', a: 'Non. Au moins une page doit rester.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
    ],
  },
  'add-page-numbers': {
    name: 'Numéroter les pages d\'un PDF',
    description: 'Numérotez les pages d\'un PDF avec la position, le format et le style de votre choix.',
    metaDescription: 'Ajoutez gratuitement des numéros de page à un PDF en ligne. Choisissez la position, un format comme « Page 1 sur 10 », le numéro de départ et la taille de police. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez l\'emplacement des numéros, leur format et les pages à numéroter.',
      'Ajoutez les numéros et téléchargez le PDF.',
    ],
    faq: [
      { q: 'Puis-je ignorer la page de couverture ?', a: 'Oui. Réglez « Première page à numéroter » sur 2, puis choisissez le numéro qu\'elle doit afficher.' },
      { q: 'Cela fonctionne-t-il sur les pages pivotées ?', a: 'Oui. Les numéros sont placés par rapport à ce que vous voyez à l\'écran, y compris sur les pages pivotées.' },
      { q: 'Quelle police est utilisée ?', a: 'Helvetica, qui couvre les chiffres et les lettres latines.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Les numéros sont dessinés par-dessus chaque page, jamais derrière le contenu existant.',
      'Utilise la police Helvetica intégrée.',
    ],
  },
  'watermark-pdf': {
    name: 'Filigrane PDF',
    description: 'Apposez un texte ou une image sur les pages de votre PDF, avec opacité et angle réglables.',
    metaDescription: 'Ajoutez gratuitement un filigrane à un PDF en ligne. Apposez un texte ou une image, centré ou en mosaïque, avec opacité et rotation personnalisées. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez un filigrane texte ou image, puis réglez sa taille, son opacité, son angle et sa disposition.',
      'Appliquez-le à toutes les pages ou à une sélection, puis téléchargez.',
    ],
    faq: [
      { q: 'Le filigrane peut-il être supprimé ?', a: 'Il est dessiné par-dessus la page et n\'est pas une fonction de sécurité. Toute personne disposant d\'un éditeur de PDF peut le supprimer. Pour une protection plus solide, combinez-le avec Protéger un PDF.' },
      { q: 'Puis-je utiliser l\'ourdou, l\'arabe ou d\'autres alphabets ?', a: 'Pas en texte saisi, car les polices intégrées au PDF ne couvrent que les lettres latines. Créez un PNG transparent de votre texte et utilisez plutôt l\'option image.' },
      { q: 'Le filigrane est-il devant ou derrière le texte de la page ?', a: 'Devant. Baissez l\'opacité pour que la page reste lisible.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Les filigranes texte ne gèrent que les lettres latines, les chiffres et les symboles courants.',
      'Images de filigrane : PNG ou JPG, jusqu\'à 5 MB.',
      'Le filigrane est dessiné par-dessus le contenu existant de la page.',
    ],
  },
  'crop-pdf': {
    name: 'Rogner un PDF',
    description: 'Supprimez les marges ou conservez une zone choisie sur chaque page, avec aperçu de page en direct.',
    metaDescription: 'Rognez gratuitement des pages PDF en ligne. Faites glisser un cadre sur l\'aperçu ou saisissez les marges, puis appliquez-le à toutes les pages ou à une sélection. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF et choisissez une page à prévisualiser.',
      'Faites glisser le cadre ou saisissez les marges pour sélectionner la zone à conserver.',
      'Choisissez les pages à rogner, puis téléchargez.',
    ],
    faq: [
      { q: 'Le contenu rogné est-il supprimé ?', a: 'Non. Le rognage modifie la zone visible de chaque page, mais le contenu situé en dehors reste dans le fichier. Ne comptez pas sur le rognage pour masquer des informations sensibles.' },
      { q: 'Et si mes pages ont des formats différents ?', a: 'Les mêmes proportions sont appliquées à chaque page choisie : les pages de formats différents sont donc rognées du même pourcentage.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Le rognage masque le contenu ; il ne le supprime pas.',
      'La zone de rognage est une proportion de chaque page, pas une taille fixe en millimètres.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Modifier les métadonnées d\'un PDF',
    description: 'Modifiez le titre, l\'auteur, le sujet et les mots-clés d\'un PDF, ou supprimez toutes les métadonnées.',
    metaDescription: 'Modifiez gratuitement les métadonnées d\'un PDF en ligne. Changez le titre, l\'auteur, le sujet et les mots-clés, ou supprimez toutes les propriétés du document. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF ; ses propriétés actuelles sont préremplies.',
      'Modifiez les champs, ou choisissez Supprimer toutes les métadonnées.',
      'Enregistrez et téléchargez le PDF mis à jour.',
    ],
    faq: [
      { q: 'Que supprime « Supprimer toutes les métadonnées » ?', a: 'Les informations du document (titre, auteur, sujet, mots-clés, créateur, producteur et dates) ainsi que les métadonnées XMP intégrées. Le texte des pages, les images et les commentaires ne sont pas touchés.' },
      { q: 'Pourquoi modifier les métadonnées ?', a: 'Pour corriger un titre erroné affiché dans les onglets du navigateur et les résultats de recherche, attribuer le bon auteur, ou retirer des informations personnelles avant de partager un fichier.' },
      { q: 'Les textes non latins sont-ils pris en charge ?', a: 'Oui. Les titres et auteurs en ourdou, arabe, chinois et autres écritures sont enregistrés correctement.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Seules les propriétés au niveau du document sont modifiées. Les commentaires, les données de formulaire et le contenu des pages restent inchangés.',
    ],
  },
  'protect-pdf': {
    name: 'Protéger un PDF',
    description: 'Verrouillez un PDF avec un mot de passe grâce au chiffrement AES-256.',
    metaDescription: 'Protégez gratuitement un PDF par mot de passe en ligne. Le chiffrement AES-256 s\'effectue dans votre navigateur ; ni votre fichier ni votre mot de passe ne sont envoyés.',
    steps: [
      'Ajoutez un PDF.',
      'Saisissez un mot de passe deux fois et choisissez ce que les lecteurs peuvent faire (imprimer, copier, modifier).',
      'Protégez-le et téléchargez la copie chiffrée.',
    ],
    faq: [
      { q: 'Quelle est la solidité de la protection ?', a: 'Les fichiers sont chiffrés en AES-256, le chiffrement PDF standard le plus robuste. En pratique, la sécurité dépend de votre mot de passe : choisissez-en un long, que vous n\'utilisez nulle part ailleurs.' },
      { q: 'Que se passe-t-il si j\'oublie le mot de passe ?', a: 'Il ne peut pas être récupéré. Rien n\'est stocké ni envoyé quelque part, et il n\'existe aucune réinitialisation. Conservez votre fichier d\'origine et le mot de passe en lieu sûr.' },
      { q: 'Les options d\'impression, de copie et de modification sont-elles appliquées ?', a: 'Ce sont des demandes que la plupart des programmes PDF respectent, mais elles ne sont pas infaillibles. C\'est le mot de passe qui protège réellement le fichier.' },
      { q: 'Mon mot de passe est-il envoyé ?', a: 'Non. Le chiffrement s\'effectue dans votre navigateur.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Mots de passe : jusqu\'à 127 caractères standard (lettres, chiffres et symboles).',
      'Un PDF déjà protégé par mot de passe doit d\'abord être déverrouillé.',
      'Les très anciens lecteurs PDF (antérieurs à 2008 environ) peuvent ne pas ouvrir les fichiers AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Déverrouiller un PDF',
    description: 'Retirez le mot de passe d\'un PDF auquel vous avez accès, pour qu\'il s\'ouvre librement.',
    metaDescription: 'Déverrouillez gratuitement un PDF protégé par mot de passe en ligne. Saisissez le mot de passe pour enregistrer une copie non protégée, traitée dans votre navigateur, sans envoi.',
    steps: [
      'Ajoutez le PDF protégé.',
      'Saisissez son mot de passe si on vous le demande. Les PDF qui restreignent seulement l\'impression ou la copie n\'en demandent pas.',
      'Téléchargez la copie déverrouillée.',
    ],
    faq: [
      { q: 'Peut-il déverrouiller un PDF si j\'ai oublié le mot de passe ?', a: 'Non. Cet outil ne devine ni ne casse jamais les mots de passe. Il retire la protection uniquement si vous fournissez le bon mot de passe, ou si le fichier se contente de restreindre des actions comme l\'impression.' },
      { q: 'Est-ce autorisé ?', a: 'Utilisez-le uniquement sur des fichiers qui vous appartiennent ou que vous avez le droit d\'ouvrir. Vous êtes responsable de l\'usage que vous faites du résultat.' },
      { q: 'Mon mot de passe est-il envoyé ?', a: 'Non. Tout se passe dans votre navigateur.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Prend en charge la protection par mot de passe PDF standard (RC4 et AES).',
      'Une signature numérique devient invalide dès que le fichier est réenregistré.',
      'Les fichiers protégés par certificat ou par DRM ne sont pas pris en charge.',
    ],
  },
  'extract-pdf-text': {
    name: 'Extraire le texte d\'un PDF',
    description: 'Copiez tout le texte sélectionnable d\'un PDF, page par page.',
    metaDescription: 'Extrayez gratuitement le texte d\'un PDF en ligne. Obtenez le texte sélectionnable de toutes les pages ou d\'une plage, puis copiez-le ou enregistrez-le en .txt. Dans votre navigateur.',
    steps: [
      'Ajoutez un PDF.',
      'Choisissez toutes les pages ou une plage, et indiquez si les sauts de page doivent être marqués.',
      'Copiez le texte ou téléchargez-le au format .txt.',
    ],
    faq: [
      { q: 'Pourquoi le résultat est-il vide ?', a: 'Le PDF est probablement un scan, c\'est-à-dire une image de texte et non du vrai texte. Pour le lire, il faut de l\'OCR (reconnaissance de texte), que cet outil ne fait pas.' },
      { q: 'La mise en page est-elle conservée ?', a: 'Les lignes et les paragraphes sont reconstitués du mieux possible, mais les colonnes, tableaux et notes de bas de page peuvent apparaître dans un autre ordre.' },
      { q: 'Peut-il ouvrir des PDF protégés par mot de passe ?', a: 'Non. Les PDF chiffrés sont détectés et refusés avec un message clair. Supprimez d\'abord le mot de passe avec notre outil Déverrouiller un PDF.' },
    ],
    limits: [
      '100 MB maximum par PDF.',
      'Les PDF protégés par mot de passe (chiffrés) ne sont pas pris en charge.',
      'Les PDF très volumineux ou complexes dépendent de la mémoire de votre appareil.',
      'Seul le vrai texte est extrait ; les pages numérisées nécessitent de l\'OCR.',
      'L\'ordre de lecture suit le PDF et peut différer de l\'ordre visuel dans les mises en page complexes.',
    ],
  },
  'compress-pdf': {
    name: 'Compresser un PDF',
    description: 'Allégez un PDF en recompressant ses images tout en gardant le texte sélectionnable.',
    metaDescription: 'Compressez gratuitement un PDF en ligne. Recompressez les images intégrées pour réduire le poids tout en gardant le texte sélectionnable, ou aplatissez les pages pour un fichier minimal. Dans votre navigateur.',
    steps: [
      'Ajoutez votre PDF.',
      'Choisissez le mode et l\'intensité de compression : par défaut, le texte reste sélectionnable et seules les images sont recompressées.',
      'Compressez, vérifiez la taille économisée et téléchargez le résultat.',
    ],
    faq: [
      { q: 'Pourquoi mon PDF a-t-il à peine diminué ?', a: 'Le mode standard recompresse les images JPEG : il est donc surtout efficace pour les PDF remplis de photos ou de scans. Un PDF composé surtout de texte, ou dont les images sont déjà petites, ne peut pas beaucoup s\'alléger. L\'outil vous indique quand il n\'a rien pu économiser, sans faire semblant.' },
      { q: 'La qualité va-t-elle se dégrader ?', a: 'Les images perdent un peu de détail en échange de la taille ; Léger les garde presque inchangées et Fort les adoucit nettement. Le texte et les graphiques vectoriels ne sont pas touchés en mode standard. Le mode « Maximum » transforme chaque page en image : le texte ne peut alors plus être sélectionné ni recherché.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n\'envoie pas le fichier vers un serveur.' },
    ],
    limits: [
      'Seules les images JPEG intégrées sont recompressées. Les images de type PNG (Flate), les polices et le reste du contenu sont conservés tels quels.',
      'Le mode Maximum convertit chaque page en image : le texte, les liens et les champs de formulaire ne fonctionnent plus et le fichier ne peut plus être recherché.',
      'Les couleurs des images recompressées peuvent légèrement varier.',
      '100 MB maximum par PDF. Les PDF protégés par mot de passe doivent d\'abord être déverrouillés.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Reconnaissez le texte des PDF numérisés (en anglais) et obtenez un PDF dans lequel on peut rechercher.',
    metaDescription: 'OCR PDF en ligne et gratuit. Reconnaissez le texte anglais de vos PDF numérisés et téléchargez un PDF consultable ou du texte brut. Le moteur OCR s’exécute dans votre navigateur.',
    steps: [
      'Ajoutez un PDF numérisé.',
      'Choisissez les pages et la qualité. Les pages qui contiennent déjà du texte sélectionnable peuvent être ignorées.',
      'Lancez l’OCR, relisez le texte reconnu, puis téléchargez le PDF consultable ou un fichier texte.',
    ],
    faq: [
      { q: 'Quelles langues sont prises en charge ?', a: 'L’anglais uniquement pour le moment. Un texte dans une autre langue sera mal lu. D’autres langues pourront être ajoutées plus tard sans changer le fonctionnement de l’outil.' },
      { q: 'Mon document est-il envoyé à un service d’OCR ?', a: 'Non. Le moteur de reconnaissance (Tesseract, compilé en WebAssembly) et ses données anglaises sont fournis par ce site et s’exécutent dans votre navigateur. Le document n’est pas envoyé.' },
      { q: 'Quelle est la précision ?', a: 'Les numérisations nettes et bien droites de textes imprimés, à 200 ou 300 DPI, donnent les meilleurs résultats. L’écriture manuscrite, les très petits caractères, les pages peu contrastées ou de travers produisent plus d’erreurs. Vérifiez toujours les chiffres importants.' },
    ],
    limits: [
      'Anglais uniquement. L’écriture manuscrite n’est pas reconnue de façon fiable.',
      'Les pages d’origine sont conservées telles quelles ; une couche de texte invisible est ajoutée pour permettre de rechercher et de copier le texte.',
      'L’OCR est lent sur les gros documents (plusieurs secondes par page). Le premier lancement charge aussi le moteur (environ 3 MB).',
      '100 MB maximum par PDF. Les pages très grandes peuvent être refusées pour protéger votre navigateur.',
    ],
  },
  'sign-pdf': {
    name: 'Signer un PDF',
    description: 'Dessinez, saisissez ou importez une signature et placez-la sur les pages de votre PDF.',
    metaDescription: 'Signez un PDF en ligne gratuitement. Dessinez, saisissez ou importez votre signature, placez-la sur les pages de votre choix et téléchargez le PDF signé, dans votre navigateur.',
    steps: [
      'Ajoutez le PDF à signer.',
      'Créez votre signature en la dessinant, en saisissant votre nom ou en important une image.',
      'Faites glisser la signature au bon endroit de la page, choisissez les pages concernées, puis téléchargez le PDF signé.',
    ],
    faq: [
      { q: 'S’agit-il d’une signature numérique juridiquement contraignante ?', a: 'C’est une signature visuelle : une image de votre signature placée sur la page. Ce n’est pas une signature numérique cryptographique, elle n’est accompagnée d’aucun certificat et ne permet ni de prouver l’identité du signataire ni de détecter des modifications ultérieures. Son acceptation dépend de la personne qui la demande. Certaines organisations exigent des services de signature électronique certifiés.' },
      { q: 'Ma signature est-elle conservée quelque part ?', a: 'Non. Elle est créée dans votre navigateur, utilisée uniquement pour ce fichier, puis oubliée dès que vous quittez ou rechargez la page.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n’envoie pas le fichier à un serveur.' },
    ],
    limits: [
      'Signature visuelle uniquement : pas de certificat, pas d’horodatage, pas de détection de modification.',
      'La signature est placée comme une image au-dessus de la page ; elle ne remplit pas un champ de signature de formulaire.',
      '100 MB maximum par PDF. Les PDF protégés par mot de passe doivent d’abord être déverrouillés.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Remplir un formulaire PDF',
    description: 'Remplissez les zones de texte, les cases à cocher et les menus d’un formulaire PDF remplissable.',
    metaDescription: 'Remplissez un formulaire PDF en ligne gratuitement. Saisissez du texte, cochez des cases et choisissez des options, puis téléchargez le PDF modifiable ou aplati, dans votre navigateur.',
    steps: [
      'Ajoutez un formulaire PDF remplissable.',
      'Remplissez les champs listés sous le nom du fichier. Ils sont regroupés par page.',
      'Choisissez de laisser le formulaire modifiable ou de l’aplatir, puis téléchargez le PDF rempli.',
    ],
    faq: [
      { q: 'Mon PDF n’affiche aucun champ. Pourquoi ?', a: 'Seuls les PDF dotés de véritables champs de formulaire peuvent être remplis ici. Un formulaire qui n’est qu’une image ou du texte simple n’a pas de champs ; utilisez Signer un PDF pour placer une signature, ou l’outil Filigrane pour ajouter du texte. Les formulaires XFA (certains formulaires administratifs et bancaires) ne sont pas pris en charge.' },
      { q: 'Que fait l’aplatissement ?', a: 'L’aplatissement intègre vos réponses à la page et supprime les champs du formulaire : les réponses ne peuvent plus être modifiées. Utilisez-le pour la copie que vous envoyez et gardez une copie modifiable pour vous.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n’envoie pas le fichier à un serveur.' },
    ],
    limits: [
      'Le texte peut contenir des lettres latines, des chiffres et des symboles courants (la police du formulaire ne gère pas d’autres alphabets).',
      'Les champs de signature et les boutons sont affichés mais ne peuvent pas être remplis ; utilisez Signer un PDF pour les signatures.',
      'Les formulaires XFA (dynamiques) ne sont pas pris en charge.',
      '100 MB maximum par PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Caviarder un PDF',
    description: 'Masquez définitivement du texte et des zones en noir : les pages caviardées sont reconstruites sous forme d’images.',
    metaDescription: 'Caviardez un PDF en ligne gratuitement. Masquez noms, numéros et zones pour que le texte dessous soit réellement supprimé, pas seulement recouvert. Rien n’est envoyé.',
    steps: [
      'Ajoutez votre PDF et choisissez une page.',
      'Tracez des rectangles sur ce qui doit disparaître, ou recherchez des mots, des e-mails et des numéros pour les marquer automatiquement.',
      'Appliquez les caviardages et téléchargez le fichier. Vérifiez toujours le résultat avant de le partager.',
    ],
    faq: [
      { q: 'Le texte masqué est-il vraiment supprimé ?', a: 'Oui. Chaque page comportant un caviardage est reconstruite sous forme d’image avec les rectangles noirs intégrés : le texte et les objets situés dessous n’existent plus dans le nouveau fichier. Un rectangle noir dessiné par-dessus le texte, comme le font beaucoup d’outils, laisserait le texte sélectionnable. Les pages que vous n’avez pas caviardées sont copiées telles quelles.' },
      { q: 'Pourquoi ne puis-je plus sélectionner le texte des pages caviardées ?', a: 'Parce que ces pages sont désormais des images. C’est ainsi que le contenu sous-jacent est détruit. Lancez ensuite OCR PDF si vous avez besoin d’un texte consultable ; les mots caviardés restent noirs.' },
      { q: 'Toutes les occurrences sont-elles trouvées automatiquement ?', a: 'La recherche marque les occurrences situées dans une seule ligne de texte. Une expression que le PDF découpe en morceaux, ou un texte qui fait partie d’une image, peut échapper à la recherche. Relisez chaque page et tracez des rectangles à la main si nécessaire.' },
    ],
    limits: [
      'Les pages caviardées deviennent des images : plus de texte sélectionnable, de liens ni de champs de formulaire sur ces pages.',
      'La recherche automatique ne fonctionne que sur le texte sélectionnable et dans un seul bloc de texte ; les pages numérisées nécessitent de tracer les rectangles à la main.',
      'Les propriétés du document (titre, auteur…) sont supprimées du résultat, sauf si vous choisissez de les conserver.',
      '100 MB maximum par PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Comparer des PDF',
    description: 'Voyez ce qui a changé entre deux PDF : différences de texte et pages mises en évidence.',
    metaDescription: 'Comparez deux fichiers PDF en ligne gratuitement. Voyez les mots ajoutés et supprimés page par page et mettez en évidence les différences visuelles entre deux versions, dans votre navigateur.',
    steps: [
      'Ajoutez le PDF d’origine et le PDF révisé.',
      'Lancez la comparaison : les pages sont listées avec le nombre de mots ajoutés et supprimés.',
      'Ouvrez une page pour lire les modifications du texte, ou passez à la vue visuelle pour voir les zones modifiées en rouge.',
    ],
    faq: [
      { q: 'Que montre la comparaison du texte ?', a: 'Pour chaque page, les mots ajoutés (en vert) et supprimés (en rouge) entre le document d’origine et le document révisé, le texte inchangé étant replié. Les pages sont appariées par numéro.' },
      { q: 'Et pour les PDF numérisés ?', a: 'Les numérisations n’ont pas de texte sélectionnable : la comparaison du texte ne trouve donc rien. Utilisez la comparaison visuelle, ou lancez d’abord OCR PDF sur les deux fichiers.' },
      { q: 'Mon PDF est-il envoyé quelque part ?', a: 'Non. Le PDF est lu et réécrit par votre navigateur. Cet outil n’envoie pas le fichier à un serveur.' },
    ],
    limits: [
      'Les pages sont comparées par numéro : si une page a été insérée, les pages suivantes apparaîtront comme modifiées.',
      'La comparaison visuelle affiche chaque page à la résolution de l’écran ; les différences minimes en deçà peuvent ne pas apparaître.',
      'Jusqu’à 100 pages par fichier sont comparées. Les PDF protégés par mot de passe doivent d’abord être déverrouillés.',
    ],
  },
  'word-counter': {
    name: 'Compteur de mots',
    description: 'Comptez les mots, les caractères et les phrases, et estimez le temps de lecture pendant que vous écrivez.',
    metaDescription: 'Compteur de mots en ligne gratuit. Comptez instantanément les mots, caractères, phrases et paragraphes, et estimez le temps de lecture et de parole.',
    steps: [
      'Saisissez ou collez votre texte.',
      'Lisez les statistiques en direct au-dessus de l’éditeur.',
      'Utilisez Effacer pour recommencer.',
    ],
    faq: [
      { q: 'Comment les mots sont-ils comptés ?', a: 'Un mot est toute suite de caractères séparée par des espaces. Les mots composés avec un trait d’union comptent pour un seul et les nombres comptent comme des mots.' },
      { q: 'Comment le temps de lecture est-il calculé ?', a: 'Le temps de lecture repose sur 238 mots par minute et le temps de parole sur 150 mots par minute, des moyennes courantes chez les adultes.' },
    ],
    limits: [
      'Le décompte repose sur les espaces : les langues écrites sans espaces (comme le chinois ou le japonais) afficheront un mot par suite de texte.',
    ],
  },
  'character-counter': {
    name: 'Compteur de caractères',
    description: 'Comptez les caractères avec et sans espaces et comparez votre texte aux limites de longueur courantes.',
    metaDescription: 'Compteur de caractères en ligne gratuit. Comptez les caractères avec et sans espaces, les octets et les lignes, et vérifiez les limites des publications, balises meta et SMS.',
    steps: [
      'Saisissez ou collez votre texte.',
      'Lisez les totaux et les barres de limite.',
      'Ajustez votre texte jusqu’à ce qu’il tienne.',
    ],
    faq: [
      { q: 'Un emoji compte-t-il pour un seul caractère ?', a: 'Oui. Le compteur compte les caractères visibles (clusters de graphèmes) : un emoji compte pour un, même s’il utilise plusieurs octets.' },
      { q: 'Pourquoi les limites de SMS diffèrent-elles ?', a: 'La longueur d’un SMS dépend de l’encodage. Les messages contenant des caractères non latins ou des emoji ont une limite plus courte que la référence de 160 caractères affichée ici.' },
    ],
    limits: [
      'Les limites affichées sont des repères courants qui évoluent avec le temps ; consultez la règle en vigueur de chaque plateforme.',
    ],
  },
  'case-converter': {
    name: 'Convertisseur de casse',
    description: 'Convertissez un texte en majuscules, minuscules, casse de titre, de phrase, camel, snake, kebab et plus encore.',
    metaDescription: 'Convertisseur de casse en ligne gratuit. Passez un texte en MAJUSCULES, minuscules, Casse De Titre, casse de phrase, camelCase, snake_case, kebab-case et plus.',
    steps: [
      'Collez votre texte.',
      'Choisissez la casse souhaitée.',
      'Copiez le résultat converti.',
    ],
    faq: [
      { q: 'La casse de titre gère-t-elle les petits mots ?', a: 'Oui. Les mots courts comme « a », « of » et « the » restent en minuscules, sauf s’ils commencent ou terminent le texte.' },
    ],
    limits: [
      'La casse de titre suit les règles courantes de l’anglais et peut ne pas convenir à tous les guides de style.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Supprimer les lignes en double',
    description: 'Supprimez les lignes répétées d’une liste en conservant l’ordre d’origine.',
    metaDescription: 'Suppression de lignes en double en ligne gratuite. Retirez les lignes répétées de vos listes, avec des options pour la casse, les espaces et les lignes vides.',
    steps: [
      'Collez votre liste, un élément par ligne.',
      'Choisissez si la casse et les espaces comptent.',
      'Copiez le résultat sans doublons.',
    ],
    faq: [
      { q: 'Quelle occurrence d’un doublon est conservée ?', a: 'La première occurrence est conservée et les suivantes sont supprimées : l’ordre d’origine est donc préservé.' },
    ],
    limits: [
      'Ne fonctionne que sur des lignes entières.',
    ],
  },
  'text-sorter': {
    name: 'Trieur de texte',
    description: 'Triez des lignes par ordre alphabétique, numérique, par longueur ou au hasard.',
    metaDescription: 'Trieur de texte en ligne gratuit. Triez des lignes de A à Z, de Z à A, par ordre numérique, par longueur ou mélangez-les, avec tri naturel et sans distinction de casse.',
    steps: [
      'Collez vos lignes.',
      'Choisissez une méthode de tri et des options.',
      'Copiez la liste triée.',
    ],
    faq: [
      { q: 'Qu’est-ce que le tri naturel ?', a: 'Le tri naturel compare les nombres contenus dans le texte selon leur valeur : « item2 » passe donc avant « item10 ».' },
    ],
    limits: [
      'Le tri alphabétique suit les règles de la langue de votre navigateur.',
    ],
  },
  'text-cleaner': {
    name: 'Nettoyeur de texte',
    description: 'Supprimez les espaces superflus, regroupez les espaces, retirez les lignes vides et les caractères invisibles.',
    metaDescription: 'Nettoyeur de texte en ligne gratuit. Supprimez les espaces en trop, lignes vides, retours à la ligne, caractères invisibles et guillemets typographiques d’un texte collé.',
    steps: [
      'Collez votre texte.',
      'Cochez les options de nettoyage dont vous avez besoin.',
      'Copiez le texte nettoyé.',
    ],
    faq: [
      { q: 'Que sont les caractères invisibles ?', a: 'Les espaces de largeur nulle, les traits d’union conditionnels et les marques d’ordre des octets s’invitent souvent lors d’une copie depuis une page web et peuvent perturber le code ou les comparaisons.' },
    ],
    limits: [
      'Les opérations sont appliquées dans un ordre fixe ; lancez l’outil deux fois si vous avez besoin d’une autre séquence.',
    ],
  },
  'text-diff-checker': {
    name: 'Comparateur de textes',
    description: 'Comparez deux textes et voyez précisément quelles lignes et quels mots ont changé.',
    metaDescription: 'Comparateur de textes en ligne gratuit. Comparez deux versions d’un texte côte à côte et repérez les lignes ou les mots ajoutés, supprimés et modifiés.',
    steps: [
      'Collez le texte d’origine à gauche et le texte modifié à droite.',
      'Choisissez la comparaison par ligne ou par mot.',
      'Examinez les modifications mises en évidence.',
    ],
    faq: [
      { q: 'Quelle est la différence entre le mode ligne et le mode mot ?', a: 'Le mode ligne marque les lignes entières qui ont changé. Le mode mot met en évidence les mots exacts au sein du texte, ce qui convient mieux à la prose.' },
    ],
    limits: [
      'Les très grands textes (au-delà d’environ 200 000 caractères) peuvent être lents.',
    ],
  },
  'json-formatter': {
    name: 'Formateur JSON',
    description: 'Formatez et mettez en page du JSON avec l’indentation de votre choix et le tri des clés.',
    metaDescription: 'Formateur JSON en ligne gratuit. Mettez en forme du JSON avec 2 ou 4 espaces ou des tabulations, triez les clés et obtenez l’emplacement précis des erreurs.',
    steps: [
      'Collez votre JSON.',
      'Choisissez l’indentation et le tri.',
      'Copiez ou téléchargez le résultat formaté.',
    ],
    faq: [
      { q: 'Mon JSON est-il envoyé à un serveur ?', a: 'Non. L’analyse et la mise en forme se font dans votre navigateur avec l’analyseur JSON intégré.' },
      { q: 'Pourquoi mon JSON est-il rejeté ?', a: 'Le JSON strict n’autorise ni commentaires, ni virgules finales, ni apostrophes. Le message d’erreur indique la ligne et la colonne du problème.' },
    ],
    limits: [
      'Les nombres supérieurs à 2^53 perdent en précision, car le navigateur les analyse comme des nombres à virgule flottante.',
    ],
  },
  'json-validator': {
    name: 'Validateur JSON',
    description: 'Vérifiez si un JSON est valide et obtenez la ligne et la colonne exactes de chaque erreur.',
    metaDescription: 'Validateur JSON en ligne gratuit. Vérifiez la syntaxe d’un JSON et trouvez la ligne et la colonne exactes des erreurs, avec un résumé de la structure.',
    steps: [
      'Collez votre JSON.',
      'Voyez immédiatement s’il est valide.',
      'Corrigez l’erreur signalée, puis vérifiez à nouveau.',
    ],
    faq: [
      { q: 'La validation se fait-elle par rapport à un schéma JSON ?', a: 'Non. L’outil ne vérifie que la syntaxe : si le texte est un JSON bien formé.' },
    ],
    limits: [
      'Validation de la syntaxe uniquement ; la validation par schéma JSON n’est pas incluse.',
    ],
  },
  'json-minifier': {
    name: 'Minifieur JSON',
    description: 'Supprimez les espaces d’un JSON pour le rendre aussi compact que possible.',
    metaDescription: 'Minifieur JSON en ligne gratuit. Supprimez les espaces d’un JSON pour alléger vos données et voyez combien d’octets vous avez économisés.',
    steps: [
      'Collez votre JSON.',
      'Le résultat minifié s’affiche avec la taille économisée.',
      'Copiez-le ou téléchargez-le.',
    ],
    faq: [
      { q: 'La minification modifie-t-elle les données ?', a: 'Non. Seuls les espaces non significatifs sont supprimés ; les clés, les valeurs et leur ordre restent inchangés.' },
    ],
    limits: [
      'Les nombres supérieurs à 2^53 perdent en précision, car le navigateur les analyse comme des nombres à virgule flottante.',
    ],
  },
  'xml-formatter': {
    name: 'Formateur XML',
    description: 'Mettez en forme ou minifiez du XML et repérez les balises non concordantes ou non fermées.',
    metaDescription: 'Formateur XML en ligne gratuit. Embellissez ou minifiez du XML avec une indentation réglable et détectez les balises non concordantes ou non fermées.',
    steps: [
      'Collez votre XML.',
      'Choisissez Formater ou Minifier, ainsi que l’indentation.',
      'Copiez le résultat.',
    ],
    faq: [
      { q: 'Dans quelle mesure le XML est-il validé ?', a: 'L’outil vérifie l’imbrication des balises, les balises non fermées et les commentaires ou sections CDATA non terminés. Il ne valide pas le XML par rapport à une DTD ou à un schéma XSD.' },
    ],
    limits: [
      'Vérifications structurelles uniquement ; pas de validation DTD ni XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Encodeur / décodeur d’URL',
    description: 'Encodez ou décodez en pourcentage des URL et des valeurs de chaîne de requête.',
    metaDescription: 'Encodeur et décodeur d’URL en ligne gratuit. Encodez un texte en pourcentage pour une URL ou décodez une chaîne encodée, pour une URL entière ou un seul composant.',
    steps: [
      'Choisissez Encoder ou Décoder.',
      'Collez votre texte ou votre URL.',
      'Copiez le résultat.',
    ],
    faq: [
      { q: 'Composant ou URL complète ?', a: 'Utilisez Composant pour une valeur isolée, comme un paramètre de requête : les caractères tels que /, ?, & et = sont encodés. Utilisez URL complète pour laisser intacte la structure de l’URL.' },
    ],
    limits: [
      'Le décodage échoue sur les séquences de pourcentage mal formées, comme un % isolé.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Encodeur / décodeur HTML',
    description: 'Échappez les caractères spéciaux en entités HTML ou décodez des entités en texte.',
    metaDescription: 'Encodeur et décodeur HTML en ligne gratuit. Échappez <, >, & et les guillemets en entités HTML, ou décodez les entités nommées et numériques.',
    steps: [
      'Choisissez Encoder ou Décoder.',
      'Collez votre texte.',
      'Copiez le résultat.',
    ],
    faq: [
      { q: 'L’encodage rend-il sûre la saisie d’un utilisateur en HTML ?', a: 'Échapper les cinq caractères spéciaux rend le texte sûr à l’intérieur du contenu d’un élément HTML et des attributs entre guillemets. Ce n’est pas un substitut à une bibliothèque de gabarits ou à un nettoyeur adaptés dans d’autres contextes.' },
    ],
    limits: [
      'Le décodage prend en charge les entités nommées courantes ainsi que toutes les entités numériques.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Encodeur / décodeur Base64',
    description: 'Encodez du texte en Base64 ou décodez du Base64 en texte, avec prise en charge complète d’UTF-8.',
    metaDescription: 'Encodeur et décodeur Base64 en ligne gratuit. Convertissez du texte en Base64 et inversement, avec prise en charge d’UTF-8 et alphabet compatible URL en option.',
    steps: [
      'Choisissez Encoder ou Décoder.',
      'Collez votre texte.',
      'Copiez le résultat.',
    ],
    faq: [
      { q: 'Le Base64 est-il un chiffrement ?', a: 'Non. Le Base64 est un encodage, pas un chiffrement. N’importe qui peut le décoder : ne l’utilisez jamais pour protéger des secrets.' },
      { q: 'Qu’est-ce que le Base64 compatible URL ?', a: 'Il remplace + et / par - et _ et supprime le remplissage =, afin que la valeur puisse figurer sans risque dans des URL et des noms de fichier.' },
    ],
    limits: [
      'Pour les données d’image, utilisez Image vers Base64 et Base64 vers image.',
    ],
  },
  'regex-tester': {
    name: 'Testeur de regex',
    description: 'Testez des expressions régulières JavaScript avec mise en évidence des correspondances et groupes de capture en direct.',
    metaDescription: 'Testeur de regex JavaScript en ligne gratuit. Voyez en direct les correspondances, les groupes de capture et les groupes nommés, et prévisualisez les remplacements.',
    steps: [
      'Saisissez un motif et choisissez les indicateurs.',
      'Collez le texte à tester.',
      'Examinez les correspondances, les groupes et l’aperçu du remplacement.',
    ],
    faq: [
      { q: 'Quelle variante de regex est utilisée ?', a: 'Les expressions régulières JavaScript (ECMAScript), telles que votre navigateur les implémente. PCRE, Python et les autres variantes diffèrent sur certaines fonctionnalités.' },
      { q: 'Pourquoi ma page se fige-t-elle avec certains motifs ?', a: 'Les motifs avec répétitions imbriquées peuvent provoquer un retour arrière catastrophique. La recherche s’exécute dans un worker en arrière-plan et s’arrête après 1,5 seconde : un motif qui s’emballe ne peut donc pas figer la page, mais il vaut mieux éviter des motifs comme (a+)+.' },
    ],
    limits: [
      'Syntaxe des regex JavaScript uniquement.',
      'La recherche s’arrête après 5 000 correspondances ou 1,5 seconde.',
    ],
  },
  'markdown-previewer': {
    name: 'Aperçu Markdown',
    description: 'Écrivez du Markdown et voyez à côté un aperçu en direct, sûr et nettoyé.',
    metaDescription: 'Aperçu Markdown en ligne gratuit. Écrivez du Markdown (variante GitHub), voyez un aperçu HTML nettoyé en direct, puis copiez le HTML.',
    steps: [
      'Écrivez ou collez du Markdown à gauche.',
      'Voyez le rendu à droite.',
      'Copiez le Markdown ou le HTML généré.',
    ],
    faq: [
      { q: 'L’aperçu est-il sûr ?', a: 'Oui. Le HTML généré est nettoyé avec DOMPurify avant l’affichage : les scripts et les gestionnaires d’événements sont supprimés.' },
    ],
    limits: [
      'Markdown de type GitHub via la bibliothèque marked ; pas d’extensions pour les formules mathématiques ou les diagrammes.',
    ],
  },
  'password-generator': {
    name: 'Générateur de mots de passe',
    description: 'Créez des mots de passe robustes : entièrement aléatoires, ou faciles à retenir à partir de noms et de mots.',
    metaDescription: 'Générateur de mots de passe gratuit : mots de passe entièrement aléatoires, ou basés sur un nom comme Nvidia132@Star avec chiffres, majuscules et symboles aléatoires. Dans votre navigateur.',
    steps: [
      'Choisissez un style : Nom + mot pour un mot de passe mémorisable, ou Entièrement aléatoire pour une sécurité maximale.',
      'Réglez la longueur, le nombre de mots de passe voulus et les types de caractères à inclure.',
      'Copiez un mot de passe et conservez-le dans un gestionnaire de mots de passe.',
    ],
    faq: [
      { q: 'Les mots de passe générés sont-ils enregistrés ou envoyés quelque part ?', a: 'Non. Ils sont générés dans votre navigateur avec crypto.getRandomValues et ne sont jamais transmis ni enregistrés.' },
      { q: 'Un mot de passe comme Tesla2026#Tech est-il sûr ?', a: 'Il vaut mieux qu’un simple mot, mais il est moins robuste qu’un texte aléatoire. Quelqu’un qui cherche à le deviner peut partir de listes de noms connus ; la vraie robustesse vient donc du nombre de possibilités, indiqué en bits. Utilisez les mots de passe basés sur un nom pour les comptes peu sensibles, et des mots de passe entièrement aléatoires pour la messagerie, la banque et les gestionnaires de mots de passe.' },
      { q: 'Pourquoi seulement quelques symboles ?', a: 'Les mots de passe générés n’utilisent que les quatre symboles @ # $ *, car presque tous les sites les acceptent et ils sont faciles à saisir sur n’importe quel clavier.' },
      { q: 'Quelle longueur choisir pour un mot de passe ?', a: 'Au moins 16 caractères pour les comptes importants. La longueur compte plus que la complexité.' },
    ],
    limits: [
      'Les mots de passe basés sur un nom sont plus faciles à retenir, mais moins robustes que les mots de passe entièrement aléatoires. La robustesse affichée suppose un attaquant qui sait comment ils sont construits.',
      'La base de mots est une liste soigneusement choisie de noms en lettres latines ; ce n’est pas une liste des mots de passe les plus utilisés.',
      'L’estimation de la robustesse repose sur le nombre de combinaisons possibles, et non sur des bases de données de fuites.',
    ],
  },
  'uuid-generator': {
    name: 'Générateur d’UUID',
    description: 'Générez en masse des UUID aléatoires de version 4, avec des options de format.',
    metaDescription: 'Générateur d’UUID en ligne gratuit. Créez des UUID v4 aléatoires en masse, en majuscules, sans tirets ou avec accolades, grâce à un aléa cryptographique.',
    steps: [
      'Choisissez le nombre d’UUID et le format.',
      'Générez.',
      'Copiez la liste.',
    ],
    faq: [
      { q: 'Deux UUID peuvent-ils entrer en collision ?', a: 'Les UUID de version 4 comptent 122 bits aléatoires : le risque de collision est négligeable en pratique.' },
    ],
    limits: [
      'Seuls les UUID de version 4 (aléatoires) sont générés.',
    ],
  },
  'timestamp-converter': {
    name: 'Convertisseur d’horodatage',
    description: 'Convertissez des horodatages Unix en dates lisibles et inversement, dans n’importe quel fuseau horaire.',
    metaDescription: 'Convertisseur d’horodatage Unix en ligne gratuit. Convertissez des secondes ou millisecondes epoch en dates UTC et locales, et des dates en horodatages.',
    steps: [
      'Saisissez un horodatage Unix ou choisissez une date.',
      'Lisez le résultat en UTC, dans votre fuseau local et en ISO 8601.',
      'Copiez la valeur de votre choix.',
    ],
    faq: [
      { q: 'Secondes ou millisecondes ?', a: 'Les horodatages de 13 chiffres ou plus sont traités comme des millisecondes, les plus courts comme des secondes. Vous pouvez le modifier manuellement.' },
    ],
    limits: [
      'La plage prise en charge est celle des dates JavaScript : environ de l’an -271821 à l’an 275760.',
    ],
  },
  'color-converter': {
    name: 'Convertisseur de couleurs',
    description: 'Convertissez des couleurs entre HEX, RGB, HSL et HSV, avec aperçu en direct et vérification du contraste.',
    metaDescription: 'Convertisseur de couleurs en ligne gratuit. Convertissez des valeurs HEX, RGB, HSL et HSV, prévisualisez la couleur et vérifiez les rapports de contraste WCAG.',
    steps: [
      'Saisissez une couleur dans un format quelconque ou utilisez le sélecteur.',
      'Voyez tous les formats se mettre à jour.',
      'Copiez la valeur dont vous avez besoin.',
    ],
    faq: [
      { q: 'Que montre la vérification du contraste ?', a: 'Elle affiche le rapport de contraste WCAG de la couleur avec un texte blanc et un texte noir, ce qui aide à choisir des combinaisons lisibles.' },
    ],
    limits: [
      'sRGB uniquement ; les espaces CSS Color 4 tels que LAB, LCH et Display-P3 ne sont pas pris en charge.',
      'Les valeurs de transparence (alpha) sont acceptées mais ignorées.',
    ],
  },
  'qr-code-generator': {
    name: 'Générateur de code QR',
    description: 'Créez des codes QR pour des liens, du texte, un Wi-Fi, un e-mail ou un numéro de téléphone, en PNG ou SVG.',
    metaDescription: 'Générateur de code QR gratuit. Créez des codes QR pour des URL, du texte, un Wi-Fi, un e-mail ou un numéro de téléphone et téléchargez-les en PNG ou SVG. Créés dans votre navigateur.',
    steps: [
      'Choisissez ce que le code doit contenir et renseignez les détails.',
      'Ajustez si vous le souhaitez la taille, les couleurs et la correction d’erreurs.',
      'Téléchargez le PNG ou le SVG, et testez-le avec votre téléphone avant d’imprimer.',
    ],
    faq: [
      { q: 'Les codes expirent-ils ?', a: 'Non. Ce sont des codes statiques : les données sont stockées dans le code lui-même, il fonctionne donc indéfiniment et rien n’est suivi.' },
      { q: 'Quel niveau de correction d’erreurs choisir ?', a: 'Moyen convient à la plupart des usages. Choisissez Quartile ou Élevé si le code risque d’être sali ou endommagé, mais les niveaux supérieurs rendent le code plus dense et plus difficile à scanner en petite taille.' },
      { q: 'Puis-je utiliser les codes à des fins commerciales ?', a: 'Oui. La norme du code QR est ouverte, et les codes créés ici n’impliquent ni frais, ni filigrane, ni suivi de notre part.' },
      { q: 'Mes données sont-elles envoyées quelque part ?', a: 'Non. Le code est généré dans votre navigateur, et les mots de passe Wi-Fi que vous saisissez restent sur votre appareil.' },
    ],
    limits: [
      'Codes statiques uniquement : pas de suivi des scans ni de codes modifiables.',
      'Un texte très long produit un code dense, difficile à scanner ; gardez-le court.',
      'Les couleurs sombres sur fond clair, bien contrastées, se scannent le mieux.',
    ],
  },
};
export default tools;
